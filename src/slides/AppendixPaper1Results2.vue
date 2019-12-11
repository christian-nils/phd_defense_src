<template lang="pug">
    .full-width.full-height-with-margin.flex-centered.flex-container
        Paper1ResultsReactionTimesSVG
</template>

<script>
import Paper1ResultsReactionTimesSVG from "../assets/images_src/paper1ResultsReactionTimes.svg";
import { gsap } from "gsap";
export default {
  components: { Paper1ResultsReactionTimesSVG },
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
    // Initialize curves
    var curveLength = [];
    var curveIDs = ["gRTCurves", "rRTCurves", "bRTCurves"];
    var curvePaths = [];
    for (let index = 0; index < curveIDs.length; index++) {
      const curves = document.getElementById(curveIDs[index]).childNodes;
      curvePaths.push(...curves); // "..." syntax is to "slice" the array
    }

    for (let index = 0; index < curvePaths.length; index++) {
      curveLength[index] = curvePaths[index].getTotalLength();
      gsap.set(curvePaths[index], {
        strokeDasharray: curveLength[index],
        strokeDashoffset: curveLength[index],
        autoRound: false
      });
    }

    function activateCurve(id) {
      var tl = gsap.timeline({ paused: true });
      tl.addLabel("start");
      tl.to(id + ">*", {
        duration: 0.5,
        strokeDashoffset: 0,
        autoRound: false
      });
      tl.addLabel("end");
      return tl;
    }
    var gRTTimeline = activateCurve("#gRTCurves");
    var rRTTimeline = activateCurve("#rRTCurves");
    var bRTTimeline = activateCurve("#bRTCurves");
    this.$options.timeline = gsap.timeline({ paused: true });
    this.$options.timeline
      .addLabel("step1")
      .add(gRTTimeline.tweenFromTo("start", "end"))
      .addLabel("step2")
      .add(gRTTimeline.tweenFromTo("end", "start"))
      .add(rRTTimeline.tweenFromTo("start", "end"))
      .addLabel("step3")
      .add(rRTTimeline.tweenFromTo("end", "start"))
      .add(bRTTimeline.tweenFromTo("start", "end"))
      .addLabel("step4")
      .add(rRTTimeline.tweenFromTo("start", "end"))
      .add(gRTTimeline.tweenFromTo("start", "end"))
      .addLabel("step5");
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
