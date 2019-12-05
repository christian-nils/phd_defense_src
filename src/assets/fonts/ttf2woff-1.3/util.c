/*
 *	Copyright (C) 2013-2017 Jan Bobrowski <jb@wizard.ae.krakow.pl>
 *
 *	This program is free software; you can redistribute it and/or
 *	modify it under the terms of the GNU General Public License
 *	version 2 as published by the Free Software Foundation.
 */

#include <stdlib.h>
#include <stdio.h>
#include <stdarg.h>
#include <assert.h>
#include "ttf2woff.h"

void echo(char *f, ...)
{
	FILE *o = g.stdout_used ? stderr : stdout;
	va_list va;
	va_start(va, f);
	vfprintf(o, f, va);
	va_end(va);
	fputc('\n',o);
}

void *my_alloc(size_t sz)
{
	void *p = malloc(sz);
	if(!p) errx(1,"Out of memory");
	return p;
}

void *my_free(void *p)
{
	free(p);
	return 0;
}

void *my_realloc(void *p, size_t sz)
{
	p = realloc(p, sz);
	if(!p) errx(1,"Out of memory");
	return p;
}

static unsigned log2i(unsigned a)
{
	unsigned v = 0;
	if(a>0xFFFF) a>>=16, v+=16;
	if(a>0xFF) a>>=8, v+=8;
	if(a>15) a>>=4, v+=4;
	if(a>3) a>>=2, v+=2;
	return v + (a>>1);
}

u8 *put_srch(u8 *p, unsigned a, unsigned b, unsigned s)
{
	unsigned i = log2i(b);
	p=p16(p,a), p=p16(p,s<<i), p=p16(p,i), p=p16(p,s*b-(s<<i));
	return p;
}
