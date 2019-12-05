/*
 *	Copyright (C) 2013-2019 Jan Bobrowski <jb@wizard.ae.krakow.pl>
 *
 *	This program is free software; you can redistribute it and/or
 *	modify it under the terms of the GNU General Public License
 *	version 2 as published by the Free Software Foundation.
 */

#include <stdlib.h>
#include <assert.h>
#include "ttf2woff.h"

struct table *find_table(struct ttf *ttf, char tag[4])
{
	u32 tg = g32((u8*)tag);
	int i;
	for(i=0; i<ttf->ntables; i++)
		if(ttf->tables[i].tag == tg)
			return &ttf->tables[i];
	return 0;
}

static void replace_table(struct table *t, u8 *p, int l)
{
	if(t->free_buf)
		t->buf.ptr = my_free(t->buf.ptr);
	t->free_buf = 1;
	t->modified = 1;
	t->buf.ptr = p;
	t->buf.len = l;
}

static void optimized(struct table *t, struct buf new)
{
	int eq = t->buf.len==new.len && memcmp(t->buf.ptr, new.ptr, new.len)==0;
	if(g.verbose && !eq) {
		if(t->buf.len==new.len)
			echo("Replaced %s table (%u)", t->name, t->buf.len);
		else
			echo("Optimized %s table: %u > %u (%+d bytes)", t->name, t->buf.len, new.len, new.len-t->buf.len);
	}
	replace_table(t, new.ptr, new.len);
}

static int overlap(struct buf a, struct buf b)
{
	int o = a.len<b.len ? a.len : b.len;
	while(o) {
		if(memcmp(a.len-o+a.ptr, b.ptr, o)==0)
			break;
		o--;
	}
	return o;
}

static u8 *bufbuf(struct buf a, struct buf b)
{
	u8 *p=a.ptr, *e=a.ptr+a.len-b.len;
	while(p<=e) {
		if(memcmp(p,b.ptr,b.len)==0)
			return p;
		p++;
	}
	return 0;
}

static int name_cmp_len(const void *va, const void *vb) {
	struct buf a = *(struct buf*)va;
	struct buf b = *(struct buf*)vb;
	int d = a.len - b.len;
	if(!d) d = memcmp(a.ptr, b.ptr, a.len);
	return d;
}

static void optimize_name(struct ttf *ttf)
{
	struct table *name = find_table(ttf, "name");
	struct buf str, new;
	struct buf *ent;
	u8 *p;
	int count,n,i;

	if(!name || name->buf.len<6+2*12+1 || g16(name->buf.ptr))
		return;

	n = g16(name->buf.ptr+4); // stringOffset
	if(name->buf.len < n)
		goto corrupted;

	str.ptr = name->buf.ptr+n;
	str.len = name->buf.len-n;

	count = g16(name->buf.ptr+2);
	if(name->buf.len < 6+12*count) {
corrupted:
		echo("Name table corrupted");
		return;
	}

	n = count;
	ent = my_alloc(n * sizeof *ent);

	p = name->buf.ptr+6;
	for(i=0; i<n; i++) {
		unsigned l = g16(p+8);
		unsigned o = l ? g16(p+10) : 0;
		if(o+l > str.len) {
			echo("Bad string location in name table");
			my_free(ent);
			return;
		}
		ent[i].ptr = str.ptr + o;
		ent[i].len = l;
		p += 12;
	}

	qsort(ent, n, sizeof *ent, name_cmp_len);

	for(;;) {
		int j,mo,mi,mj;
		struct buf a, b, c;

		mo = 0;
		for(j=0;j<n;j++) for(i=1;i<n;i++) if(i!=j) {
			int o;
			a = ent[i];
			b = ent[j];
			if(bufbuf(a,b))
				goto remove_b;
			o = overlap(a,b);
			if(o > mo) {
				mo = o;
				mi = i;
				mj = j;
			}
		}
		if(!mo)
			break;

		a = ent[mi];
		b = ent[mj];
		c.len = a.len + b.len - mo;
		c.ptr = my_alloc(c.len);
		p = append(c.ptr, a.ptr, a.len);
		append(p, b.ptr+mo, b.len-mo);
		if(a.ptr<str.ptr || a.ptr>=str.ptr+str.len)
			my_free(a.ptr);

		i = mi<mj ? mi : mj;
		j = mi<mj ? mj : mi;
		ent[i] = c;

remove_b:
		if(b.ptr<str.ptr || b.ptr>=str.ptr+str.len)
			my_free(b.ptr);
		n--;
		while(j < n) ent[j]=ent[j+1], j++;
	}

	{
		int sz = 6 + 12*count;
		for(i=0;i<n;i++)
			sz += ent[i].len;

		if(sz >= name->buf.len) {
			my_free(ent);
			return;
		}

		new.len = sz;
		new.ptr = my_alloc(sz);

		p = new.ptr + 6 + 12*count;
		for(i=0;i<n;i++) {
			struct buf a = ent[i];
			memcpy(p,a.ptr,a.len); p+=a.len;
			if(a.ptr<str.ptr || a.ptr>=str.ptr+str.len)
				my_free(a.ptr);
		}
		assert(p == new.ptr+new.len);
	}

	my_free(ent);

	memcpy(new.ptr, name->buf.ptr, 6+12*count);
	p16(new.ptr+4, 6+12*count);

	{
		struct buf newstr;

		newstr.ptr = new.ptr + 6+12*count;
		newstr.len = new.len - 6+12*count;

		p = new.ptr + 6 + 10;
		for(i=0;i<count;i++) {
			struct buf a = {str.ptr+g16(p), g16(p-2)};
			u8 *s = bufbuf(newstr, a);
			assert(s);
			p16(p, s-newstr.ptr);
			p += 12;
		}
	}

#ifndef NDEBUG
	for(i=0; i<count; i++) {
		u8 *p0 = name->buf.ptr;
		u8 *p1 = new.ptr;
		p0 += g16(p0+4) + g16(p0+6+12*i+10);
		p1 += g16(p1+4) + g16(p1+6+12*i+10);
		assert(!memcmp(p0,p1,g16(new.ptr+6+12*i+8)));
	}
#endif

	optimized(name, new);
}

static void optimize_hmtx(struct ttf *ttf)
{
	struct table *hhea, *hmtx;
	struct buf buf;
	u8 *p, *q;
	int nlhm,adv,n;

	hhea = find_table(ttf, "hhea");
	hmtx = find_table(ttf, "hmtx");

	if(!hhea || !hmtx || hhea->buf.len < 36 || g32(hhea->buf.ptr)!=0x10000)
		return;

	nlhm = g16(hhea->buf.ptr + 34);
	buf = hmtx->buf;

	if(!nlhm || buf.len&1 || buf.len < 4*nlhm) {
		return;
	}

	if(nlhm<2)
		return;

	p = buf.ptr + 4*(nlhm-1);
	adv = g16(p);

	for(n=nlhm; n>1; n--) {
		p -= 4;
		if(adv != g16(p))
			break;
	}
	if(n < nlhm) {
		struct buf new;
		int i, nent = (buf.len>>1) - nlhm;

		new.len = 2*nent + 2*n;
		new.ptr = my_alloc(new.len);
		p = append(new.ptr, buf.ptr, n<<2);
		q = buf.ptr + (n<<2);
		for(i=n; i<nlhm; i++) {
			p = p16(p, g16(q+2));
			q += 4;
		}
		p = append(p, q, buf.ptr+buf.len-q);
		assert(p == new.ptr+new.len);

		optimized(hmtx, new);

		p16(hhea->buf.ptr+34, n);
		hhea->modified = 1;
	}
}

#define FAILED do {echo("Optimization failed [%s:%d]",__FILE__,__LINE__); return;} while(0)

enum {
	o_ON=1, o_XSHORT=2, o_YSHORT=4, o_REPEAT=8, o_XSIGN=16, o_YSIGN=32, o_RESERVED=192
};

enum {
	c_WORDS=1, c_XY=2, c_ROUND=4, c_SCALE=8, c_MORE=32, c_2SCALE=64, c_MATRIX=128, c_INSTR=256, c_METRICS=512, c_OVERLAP=1024
};

#define COMP_ARG_SIZE(F) (((F)&c_WORDS ? 4 : 2) + ((F)&c_SCALE ? 2 : (F)&c_2SCALE ? 4 : (F)&c_MATRIX ? 8 : 0))

static u8 *decode_coord(int *dv, int f, u8 *p, u8 *e);

static void optimize_glyf(struct ttf *ttf)
{
	struct table *head, *glyf, *loca;
	struct buf *glyphs;
	u8 *flags;
	struct xbuf coords = {0};
	struct xbuf glyph = {0};
	int ng, loca_fmt;
	int olen[2];
	int i;

	head = find_table(ttf, "head");
	glyf = find_table(ttf, "glyf");
	loca = find_table(ttf, "loca");
	if(!head || !glyf || !loca)
		return;

	if(head->buf.len < 54 || g32(head->buf.ptr)!=0x10000 || g16(head->buf.ptr+52))
		FAILED;
	loca_fmt = g16(head->buf.ptr+50);
	if(loca_fmt > 1)
		FAILED;

	ng = (loca->buf.len >> 1+loca_fmt) - 1;

	glyphs = my_alloc(ng * sizeof *glyphs);
	flags = my_alloc(65536);
	olen[0] = olen[1] = 0;

	for(i=0; i<ng; i++) {
		u8 *p, *e;
		int nc;
		{
#define read_LOCA(I) (loca_fmt ? g32(loca->buf.ptr + 4*(I)) : g16(loca->buf.ptr + 2*(I)) << 1)
			unsigned o0 = read_LOCA(i);
			unsigned o1 = read_LOCA(i+1);
			if(o1 < o0)
				FAILED;
			if(glyf->buf.len < o1)
				FAILED;
			p = glyf->buf.ptr + o0;
			e = glyf->buf.ptr + o1;
		}

		glyphs[i].ptr = p;
		glyphs[i].len = e - p;
		if(p == e)
			continue;
		if(e - p < 12)
			FAILED;
		nc = g16(p);
		if(nc == 0) {
			glyphs[i].len = 0;
		} else if(nc == 0xFFFF) { // composite
			int ff = 0, f;
			p += 10;
			do {
				if(e - p < 6)
					FAILED;
				f = g16(p);
				p += 4 + COMP_ARG_SIZE(f);
				if(p > e)
					FAILED;
				ff |= f;
			} while(f & c_MORE);
			if(ff & c_INSTR) {
				if(p + 2 > e)
					FAILED;
				p += 2 + g16(p);
				if(p > e)
					FAILED;
			}
			glyphs[i].len = p - glyphs[i].ptr;
		} else { // simple
			int n, ni, np;
			u8 *fp;
			p += 10 + 2*nc;
			if(p + 2 >= e)
				FAILED;
			np = g16(p - 2) + 1;
			ni = g16(p); // instr
			if(p + ni >= e)
				FAILED;
			p += 2 + ni;
			fp = flags;
			for(n=np; n;) {
				int f, nf=1;
				if(p == e)
					FAILED;
				f = *p++;
				if(f & o_REPEAT) {
					if(p == e)
						FAILED;
					nf += *p++;
					f &= ~o_REPEAT;
				}
				n -= nf;
				if(n < 0)
					FAILED;
				memset(fp, f, nf); fp += nf;
			}
			XB_RESET(coords);
			for(n=0; n<np; n++) {
				int dx;
				p = decode_coord(&dx, flags[n], p, e);
				if(!p)
					FAILED;
				flags[n] = flags[n]&(o_ON|o_YSHORT|o_YSIGN|o_RESERVED) | ttf_encode_coord(&coords, dx);
			}
			for(n=0; n<np; n++) {
				int dy;
				p = decode_coord(&dy, flags[n]>>1, p, e);
				if(!p)
					FAILED;
				flags[n] = flags[n]&(o_ON|o_XSHORT|o_XSIGN|o_RESERVED) | ttf_encode_coord(&coords, dy) << 1;
			}
			glyphs[i].len = p - glyphs[i].ptr;

			XB_RESET(glyph);
			xbspace(&glyph, 10+2*nc+2+ni + np);
			glyph.p = append(glyph.p, glyphs[i].ptr, 10+2*nc+2+ni);
			{
				struct flag_enc fe;
				fe_init(&fe, glyph.p);
				for(n=0; n<np; n++)
					fe_flag(&fe, flags[n]);
				glyph.p = fe_end(&fe);
			}
			xbspace(&glyph, XB_LENGTH(coords));
			glyph.p = append(glyph.p, coords.buf.ptr, XB_LENGTH(coords));

			if(XB_LENGTH(glyph) < glyphs[i].len) {
				glyphs[i].ptr = glyph.buf.ptr;
				glyphs[i].len = XB_LENGTH(glyph);
				glyph.buf.ptr=0; glyph.buf.len=0;
			}
		}

		olen[1] += glyphs[i].len;
		olen[0] += glyphs[i].len+1 & ~1;
	}
	my_free(flags);
	my_free(glyph.buf.ptr);

	{
		int lf = olen[0] >= 1<<17;

		if(olen[lf] < glyf->buf.len || lf < loca_fmt) {
			struct buf new_glyf, new_loca;
			new_glyf.ptr = my_alloc(new_glyf.len = olen[lf]);
			new_loca.ptr = my_alloc(new_loca.len = (ng + 1) << (lf + 1));
			u8 *p = new_glyf.ptr;

			for(i=0;; i++) {
				struct buf *g;
				int o;

				o = p - new_glyf.ptr;
				if(lf)
					p32(new_loca.ptr + 4*i, o);
				else {
					assert(!(o&1));
					p16(new_loca.ptr + 2*i, o>>1);
				}

				if(i == ng)
					break;

				g = &glyphs[i];
				if(g->len) {
					assert(p+g->len <= new_glyf.ptr+new_glyf.len);
					p = append(p, g->ptr, g->len);
					if(lf==0 && g->len&1) *p++ = 0;
					if(g->ptr < glyf->buf.ptr || g->ptr >= glyf->buf.ptr + glyf->buf.len)
						my_free(g->ptr);
				}
			}
			assert(p - new_glyf.ptr == new_glyf.len);
			optimized(glyf, new_glyf);
			optimized(loca, new_loca);
			if(lf != loca_fmt) {
				p16(head->buf.ptr+50, lf);
				head->modified = 1;
			}
		}
	}
}

static u8 *decode_coord(int *dv, int f, u8 *p, u8 *e) {
	if((f & 0x12) == 0x10)
		*dv = 0;
	else if((f & 0x02) == 0x02) {
		if(p == e) return 0;
		*dv = f&0x10 ? *p++ : -*p++;
	} else {
		if(p+2 > e) return 0;
		*dv = (s16)g16(p); p += 2;
	}
	return p;
}

int ttf_encode_coord(struct xbuf *xb, int dv)
{
	int f = o_XSIGN;
	if(!dv)
		return f;
	xbspace(xb, 2);
	if(-256<dv && dv<256) {
		f = o_XSIGN|o_XSHORT;
		if(dv<0) dv=-dv, f=o_XSHORT;
		*xb->p++ = dv;
		return f;
	}
	xb16(xb, dv);
	return 0;
}

void fe_flag(struct flag_enc *fe, int f) {
	if(f != fe->f || fe->n==256) {
		u8 *p = fe->p;
		switch(fe->n) {
		case 2: *p++ = fe->f;
		case 1: *p++ = fe->f;
		case 0: break;
		default: *p++ = fe->f|o_REPEAT; *p++ = fe->n-1;
		}
		fe->p = p;
		fe->f = f;
		fe->n = 0;
	}
	fe->n++;
}

#ifdef OPT_CMAP4
static int read_cmap4(u16 map[1<<16], struct buf *buf)
{
	int step, n, c;
	u8 *p;

	if(buf->len < 22)
		return 0;
	step = g16(buf->ptr+6);
	if(step & 1)
		return 0;
	n = step >> 1;
	if(!n)
		return 0;
	if(buf->len < 16 + 8*n)
		return 0;

	p = buf->ptr+16;
	c = 0;
	do {
		int e = g16(p-2);
		int s = g16(p+step);
		int d = g16(p+2*step);
		int o = g16(p+3*step);
		if(e < s || s < c)
			return 0;
		while(c < s)
			map[c++] = 0;
		if(o && s<0xFFFF) {
			u8 *q;
			o += 3*step;
			if(o + 2*(e-s+1) >= buf->len)
				return 0;
			q = p + o;
			do {
				int v = g16(q);
				q += 2;
				if(v) v += d;
				map[c] = v;
			} while(++c <= e);
		} else {
			do
				map[c] = c + d;
			while(++c <= e);
		}
		p += 2;
	} while(--n);

	return 1;
}

struct cmap_seg {
	int start, end; // <end
	int delta;
	int cost;
	struct cmap_seg *next;
};

#define SEG_WITH_ARR(R) ((R)->cost>4)

struct cmap4_arr {
	int len;
	u16 *ptr;
	s16 ddelta;
	struct cmap4_arr *glue;
	struct cmap4_arr *next;
};

static void optimize_cmap4(struct buf *buf)
{
	u16 map[1<<16];
	struct cmap_seg *first, **nxptr, *r;
	int nseg;
	int start, end=-1, delta;
	u16 *array;
	int array_len, u;

	if(!read_cmap4(map, buf))
		return;
	nxptr = &first;
	r = 0;

	nseg = 0;
	for(u=0; ; u++) {
		int v = u<0xFFFF ? map[u] : 0;
		if(v && end == u && u + delta == v) {
			end++;
			continue;
		}
		if(end >= 0) {
//			if(r && r->cost + 4 > 4 + end - r->start) {
			if(r && r->cost + 4 >= 4 + end - r->start) {
				r->end = end;
				r->cost = 4 + end - r->start;
				r->delta = 0;
			} else {
				r = my_alloc(sizeof *r);
				r->start = start;
				r->end = end;
				r->cost = 4;
				r->delta = delta;
				r->next = 0;
				*nxptr = r;
				nxptr = &r->next;
				nseg++;
			}
			end = -1;
		}
		if(!v) {
			if(u<0xFFFF)
				continue;
			break;
		}
		start = u;
		end = u + 1;
		delta = v - u;
	}

	if(!first)
		return;

	{
		struct cmap_seg *a=0, *b=0, *c=first;
		for(;;) {
//			if(a && a->cost + b->cost + c->cost > 4 + c->end - a->start) {
			if(a && a->cost + b->cost + c->cost >= 4 + c->end - a->start) {
				a->end = c->end;
				a->cost = 4 + a->end - a->start;
				a->delta = 0;
				a->next = c->next;
				my_free(b); my_free(c);
				nseg -= 2;
				b = a, c = a->next;
			}
			a = b, b = c, c = c->next;
			if(!c) break;
		}
	}

	{
		struct cmap_seg *r;
		u16 *p, pvv;
		array_len = 0;
		for(r=first; r; r=r->next) if(SEG_WITH_ARR(r)) {
			u16 *s = map + r->start;
			u16 *e = map + r->end;
			u16 d = 0;
			if(array_len) {
				u16 *p = s++;
				d = *p++ - pvv;
				assert(p < e);
				if(d) do {
					if(*p && (u16)(*p - d) == 0) { // collision
						s--;
						d = 0;
						break;
					}
				} while(++p < e);
			}
			array_len += e - s;
			r->delta = d;
			pvv = e[-1] - d;
		}
		array = my_alloc(2 * array_len);
		p = array;
		for(r=first; r; r=r->next) if(SEG_WITH_ARR(r)) {
			u16 *s = map + r->start;
			u16 *e = map + r->end;
			u16 d = r->delta;
			if(p > array && p[-1] == (u16)(*s - d))
				s++;
			do {
				assert(!*s || *s - d);
				*p++ = *s ? *s - d : 0;
			} while(++s < e);
		}
		assert(p == array + array_len);
	}

	{
		struct buf new;
		int size, array_pos;
		u8 *p;

		size = 16 + 8*(nseg+1) + 2*array_len;

		if(size >= buf->len)
			goto free_ret;

		new.ptr = my_alloc(new.len = size);

		p = new.ptr;
		p = p16(p, 4);
		p = p16(p, size);
		p = p16(p, g16(buf->ptr+4)); // lang
		nseg++;
		p = put_srch(p, 2*nseg,nseg,2);
		p += 2*nseg;
		p = p16(p, 0); // reserved
		p += 4*nseg;
		array_pos = 16 + 8*nseg;
		for(r = first; r; r=r->next) {
			int offs = 0;
			s16 delta = r->delta;

			if(SEG_WITH_ARR(r)) {
				int rl = r->end - r->start;
				int lastoff = array_len - rl;
				do if(array[offs]) {
					u16 *ap = array + offs;
					u16 *rp = map + r->start;
					int k = rl - 1;
					assert(k > 0);
					assert(*rp);
					delta = *rp++ - *ap++;
					while((!*rp && !*ap) || (s16)(*rp - *ap) == delta) {
						assert(ap-array < array_len);
						if(!--k)
							goto found;
						rp++; ap++;
					}
				} while(++offs <= lastoff);
				FAILED;
found:
				offs += offs;
				offs += array_pos;
				offs = new.ptr + offs - p;
			}

			p16(p-6*nseg-2, r->end-1);
			p16(p-4*nseg, r->start);
			p16(p-2*nseg, delta);
			p = p16(p, offs);
		}
		p16(p-6*nseg-2, 0xFFFF);
		p16(p-4*nseg, 0xFFFF);
		p16(p-2*nseg, map[0xFFFF]-0xFFFF);
		p = p16(p, 0);
		assert(p - new.ptr == array_pos);
		if(array_len) {
			u16 *q = array;
			u16 *e = array + array_len;
			do p = p16(p, *q); while(++q < e);
		}
		assert(p - new.ptr == size);

		*buf = new;
	}

#ifndef NDEBUG
	{
		u16 map2[1<<16];
		if(!read_cmap4(map2, buf))
			FAILED;
		for(u=0; u<0x10000; u++)
			if(map[u] != map2[u])
				FAILED;
	}
#endif

free_ret:
	{
		struct cmap_seg *r;
		for(r = first; r;) {
			struct cmap_seg *next = r->next;
			my_free(r);
			r = next;
		}
	}
}

#endif

static void optimize_cmap(struct ttf *ttf)
{
	struct table *cmap;
	struct buf *maps;
	int nmaps;
	int *index;
	int size, nt, i;
	u8 *p;

	cmap = find_table(ttf, "cmap");
	if(!cmap)
		return;

	if(cmap->buf.len < 4+8)
		FAILED;

	p = cmap->buf.ptr;
	if(g16(p))
		return;
	nt = g16(p+2);
	if(!nt)
		return;
	if(cmap->buf.len <= 4 + (8 + 2)*nt)
		FAILED;

	index = my_alloc(nt * sizeof *index);
	maps = my_alloc(nt * sizeof *maps);
	nmaps = 0;

	for(i=0; i<nt; i++) {
		u32 o;
		int fmt, l, j;

		p = cmap->buf.ptr + 4 + 8*i;
		o = g32(p+4);

		if(OVERFLOWS(o,8) || o + 8 >= cmap->buf.len)
			FAILED;

		p = cmap->buf.ptr + o;
		fmt = g16(p);
		switch(fmt) {
		case 0:
		case 2:
		case 4:
		case 6:
			l = g16(p+2);
			break;
		case 8:
		case 10:
		case 12:
		case 13:
			if(g16(p+2))
				goto free_ret;
			l = g32(p+4);
			break;
		case 14:
			l = g32(p+2);
			break;
		default:
			goto free_ret;
		}

		if(OVERFLOWS(p, l) || p + l > cmap->buf.ptr+cmap->buf.len)
			goto free_ret;

		for(j=0;;j++)
			if(j == nmaps) {
				index[i] = nmaps;
				maps[nmaps].ptr = p;
				maps[nmaps].len = l;
				nmaps++;
				break;
			} else if(maps[j].len == l && memcmp(maps[j].ptr, p, l)==0) {
				index[i] = j;
				break;
			}
	}

#ifdef OPT_CMAP4
	for(i=0; i<nmaps; i++) {
		if(g16(maps[i].ptr) == 4)
			optimize_cmap4(&maps[i]);
	}
#endif

	size = 4 + 8*nt;
	for(i=0; i<nmaps; i++)
		size += maps[i].len;

	if(size < cmap->buf.len) {
		struct buf new;
		int *offsets;
		u8 *p;
		new.ptr = my_alloc(new.len = size);
		offsets = my_alloc(nmaps * sizeof *offsets);
		p = append(new.ptr, cmap->buf.ptr, 4 + 8*nt);
		for(i=0; i<nmaps; i++) {
			offsets[i] = p - new.ptr;
			p = append(p, maps[i].ptr, maps[i].len);
			if(maps[i].ptr < cmap->buf.ptr || maps[i].ptr > cmap->buf.ptr+cmap->buf.len)
				my_free(maps[i].ptr);
		}
		for(i=0; i<nt; i++) {
			u8 *q = new.ptr + 4 + 8*i;
			int o = offsets[index[i]];
			p32(q+4, o);
		}
		assert(p - new.ptr == size);
		my_free(offsets);
		optimized(cmap, new);
	}

free_ret:
	my_free(maps);
	my_free(index);
}

void optimize(struct ttf *ttf)
{
	optimize_hmtx(ttf);
	optimize_glyf(ttf);
	optimize_cmap(ttf);
	optimize_name(ttf);
}
