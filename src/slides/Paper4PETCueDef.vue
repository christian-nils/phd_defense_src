<template>
  <div class="full-width full-height flex-column flex-container">
    <h3 style="font-size: larger;">
      Projected post-encroachment time (<span v-katex:auto>\(PET_{proj}\)</span
      >)
    </h3>
    <h4 class="center">
      <strong class="green">No</strong> need of
      <strong class="green">braking</strong>
    </h4>
    <Paper4PETCueDefSVG class="center" />
  </div>
</template>

<script>
import Paper4PETCueDefSVG from "@/assets/images_src/paper4PETCueDefinition.svg";
import { gsap } from "gsap";
export default {
  name: "PETCueDef",
  components: {
    Paper4PETCueDefSVG
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
