<template lang="pug">
  .full-width.full-height.flex-container
    Paper4Methods1SVG
</template>

<script>
import Paper4Methods1SVG from "../assets/images_src/paper4DriverModelDetailed.svg";
import { gsap } from "gsap";

export default {
  components: { Paper4Methods1SVG },
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  watch: {
    step: function(val) {
      switch (this.$root.direction) {
        case "next":
          if (this.$options.tweenFromTo !== undefined) {
            this.$options.tweenFromTo.kill();
          }
          gsap.set(this.$options.timeline, { timeScale: 1 });
          this.$options.tweenFromTo = this.$options.timeline.tweenFromTo(
            "step" + (val - 1),
            "step" + val
          );
          break;
        case "prev":
          this.$options.tweenFromTo.kill();
          gsap.set(this.$options.timeline, { timeScale: 2.5 });
          this.$options.tweenFromTo = this.$options.timeline.tweenFromTo(
            this.$options.timeline.time(),
            "step" + val
          );
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.$options.timeline = gsap.timeline({ paused: true });
    this.$options.timeline
      .addLabel("step1")
      .from("#mainBlock", { duration: 0.5, fill: "#393939" })
      .addLabel("step2")
      .from("#exBranchBlock", { duration: 0.5, fill: "#393939" })
      .from("#inBranchBlock", { duration: 0.5, fill: "#393939" }, "<")
      .addLabel("step3")
      .from("#linkBlock", { duration: 0.5, fill: "#393939" })
      .addLabel("step4")
      .from("#controlBlock", { duration: 0.5, fill: "#393939" })
      .addLabel("step5");
  }
};
</script>

<style></style>
