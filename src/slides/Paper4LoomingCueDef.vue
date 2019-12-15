<template>
  <div class="full-width full-height">
    <h3>
      Longitudinal looming (<span v-katex:auto>
        \(\tau^{-1} = \frac{\dot{\gamma}}{\gamma}\) </span
      >)
    </h3>
    <h4 class="center">Need of <strong class="red">braking</strong></h4>
    <loomingCueDefSVG />
  </div>
</template>

<script>
import loomingCueDefSVG from "@/assets/images_src/loomingCueDefinition.svg";
import { gsap } from "gsap";

export default {
  name: "LoomingCueDef",
  components: {
    loomingCueDefSVG
  },
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  watch: {
    step: function(val) {
      this.controlTimeline(val);
    }
  },
  mounted: function() {
    const XrelPos = 120; // longitudinal distance travelled
    const duration = 3;
    var tl = gsap.timeline();
    tl.to(
      "#intPointLine",
      {
        duration: duration,
        attr: {
          d: "M177.509 8.686L" + (-18.896 + 1.32 * XrelPos) + " 23.164"
        },
        ease: "none"
      },
      "start"
    );
    tl.to(
      "#sideview .car",
      { duration: duration, x: "-=" + XrelPos, ease: "none" },
      "start"
    );
    tl.to(
      "#angleArea",
      {
        duration: duration,
        attr: {
          d: this.getAngleArcD(0.35, 25)
        },
        ease: "sine.in"
      },
      "start"
    );
    tl.to(
      "#gamma",
      { duration: duration, x: "+=27px", ease: "sine.in" },
      "start"
    );
    tl.pause();
    this.$options.timeline = tl;
  },
  methods: {
    getAngleArcD: function(angle, r) {
      //const r = 153.373;
      const cx = r,
        cy = -0.112;
      const endPointX = 178 - r,
        endPointY = 8.738;
      var startPointX = -r * Math.cos(angle) + (cx + endPointX);
      var startPointY = r * Math.sin(angle) + (cy + endPointY);
      var d =
        "M" +
        startPointX +
        " " +
        startPointY +
        "a " +
        r +
        " " +
        r +
        " 0 01 " +
        (endPointX - startPointX) +
        " " +
        (endPointY - startPointY) +
        "l" +
        cx +
        " " +
        cy +
        "z";
      return d;
    },
    controlTimeline: function(step) {
      if (step == 2) {
        this.$options.timeline.play();
      } else {
        this.$options.timeline.reverse();
      }
    }
  }
};
</script>

<style scoped>
.red {
  color: rgb(255, 77, 77);
}
</style>
