<template lang="pug">
    div.full-width.full-height
        h3 Crossing scenario: #[strong Post-encroachment time]
        h4.center #[strong.green No] need of #[strong.green braking]
        PETCueDefSVG.center
</template>

<script>
import PETCueDefSVG from "@/assets/images_src/PETCueDefinition.svg";
import { gsap } from "gsap";
export default {
  name: "PETCueDef",
  components: {
    PETCueDefSVG
  },
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  watch: {
    step: function(val) {
      if (this.$options.timeline !== undefined) {
        this.controlTimeline(val);
      }
    }
  },
  mounted: function() {
    this.svg_target = [document.getElementById("PETCueDefinition")];
    const XrelPos = 260,
      YrelPos = 160; // longitudinal distance travelled
    const duration = 3;
    const tl = gsap.timeline();
    tl.from("#conflictZone", 0.5, { alpha: 0 });
    tl.fromTo(
      "#topview .car",

      { x: "+=" + XrelPos },
      {
        duration: duration * 1.5,
        x: "-=" + 2 * XrelPos,
        ease: "none"
      },
      "start"
    )
      .to(
        "#topview .bike",

        { duration: duration, y: "+=" + YrelPos, ease: "none" },
        "start"
      )
      .from("#bikeLeaves", { duration: 0.5, alpha: 0 }, "start+=1.8")
      .from("#carEnters", { duration: 0.5, alpha: 0 }, "start+=3.4");
    tl.pause();
    this.$options.timeline = tl;
  },
  methods: {
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
.green {
  color: rgb(74, 223, 119);
}
svg {
  width: 100%;
  height: 65%;
}
h4 {
  margin: 0;
  margin-bottom: 25px;
}
</style>
