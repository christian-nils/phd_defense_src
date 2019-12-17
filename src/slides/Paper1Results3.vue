<template lang="pug">
    .full-width.full-height-with-margin.flex-centered.flex-container
        Paper1ResultsEuroNCAPSVG
</template>

<script>
import Paper1ResultsEuroNCAPSVG from "../assets/images_src/paper1ResultsEuroNCAP.svg";
import { gsap } from "gsap";
export default {
  components: { Paper1ResultsEuroNCAPSVG },
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
    function getBarTimeline(id) {
      var tl = gsap.timeline();
      tl.from("#" + id + ">*", {
        transformOrigin: "center bottom",
        scaleY: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });
      return tl;
    }
    this.$options.timeline = gsap.timeline({ paused: true });
    this.$options.timeline
      .addLabel("step1")
      .add(getBarTimeline("seiniger"))
      .addLabel("step2")
      .add(getBarTimeline("lubbe"))
      .addLabel("step3")
      .add(getBarTimeline("ourStudy"))
      .addLabel("step4");
  }
};
</script>
<style scoped>
div {
  color: whitesmoke;
}
.strong {
  font-weight: bold;
}
</style>
