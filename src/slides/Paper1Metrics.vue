<template lang="pug">
    .full-width.full-height
        Paper1MethodsSVG
        .full-width
            eg-transition(enter="fadeIn" leave="fadeOut")
                h4(v-if='step>4') Analysed metrics
            ul
                eg-transition(enter="fadeIn" leave="fadeOut")
                    li(v-if='step>5') Response times: #[span.strong gRT], #[span.strong rRT], and #[span.strong bRT]
                eg-transition(enter="fadeIn" leave="fadeOut")
                    li(v-if='step>6') Times: car's time-to-arrival (#[span.strong TTA]), pedestrian's time-to-arrival (#[span.strong pTTA]), and minimum TTA (#[span.strong mTTA])
                eg-transition(enter="fadeIn" leave="fadeOut")
                    li(v-if='step>7') Distances: #[span.strong lateral] and #[span.strong longitudinal]
</template>

<script>
import Paper1MethodsSVG from "../assets/images_src/paper1Methods.svg";
import { gsap } from "gsap";
export default {
  components: { Paper1MethodsSVG },
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
          console.log("pause");
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
    function getAnimationTimeline() {
      var tl = gsap.timeline({ pause: true });
      tl.addLabel("step1");
      tl.from(["#timeline", "#responsePhases"], {
        duration: 0.5,
        scaleX: 0,
        transformOrigin: "0 center",
        x: "-100",
        autoAlpha: 0
      });
      tl.addLabel("step2");
      tl.from(["#pedestrian", "#pedestrianLegend"], {
        duration: 1,
        x: "-=100",
        autoAlpha: 0
      });
      tl.addLabel("step3");
      tl.from("#keypoints", {
        duration: 0.5,
        autoAlpha: 0
      });
      tl.addLabel("step4");
      tl.addLabel("step5");
      tl.from("#reactionTimes", {
        duration: 0.5,
        autoAlpha: 0
      });
      tl.addLabel("step6");
      return tl;
    }
    this.$options.timeline = getAnimationTimeline();
    this.$options.timeline.pause();
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
