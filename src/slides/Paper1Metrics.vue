<template lang="pug">
    .full-width.full-height
        Paper1MethodsSVG
        .full-width
            eg-transition(enter="bounceInUp" leave="bounceOutDown")
                h4(v-if='step>5') Analysed metrics
            ul 
                eg-transition(enter="bounceInUp" leave="bounceOutDown")
                    li(v-if='step>6') Response times: #[span.strong gRT], #[span.strong rRT], and #[span.strong bRT]
                eg-transition(enter="bounceInUp" leave="bounceOutDown")
                    li(v-if='step>7') Times: car's time-to-arrival (#[span.strong TTA]), pedestrian's time-to-arrival (#[span.strong pTTA]), and minimum TTA (#[span.strong mTTA])
                eg-transition(enter="bounceInUp" leave="bounceOutDown")
                    li(v-if='step>8') Distances: #[span.strong lateral] and #[span.strong longitudinal]            
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
      tl.from("#timeLine", {
        duration: 0.5,
        scaleX: 0,
        transformOrigin: "0 center",
        x: "-100",
        autoAlpha: 0
      });
      tl.from("#responsePhases", {
        duration: 0.5,
        scaleY: 0,
        transformOrigin: "middle 0",
        autoAlpha: 0
      });
      tl.addLabel("step2");
      tl.from("#pedestrian", {
        duration: 1,
        x: "-=100",
        autoAlpha: 0
      });
      tl.from("#pedestrianLegend > *", {
        duration: 0.5,
        y: "-=100",
        autoAlpha: 0,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });
      tl.addLabel("step3");
      tl.from("#keypoints > path", {
        duration: 0.5,
        stagger: 0.1,
        y: "+=100",
        autoAlpha: 0,
        ease: "none"
      });
      tl.from("#keypoints > text", {
        duration: 0.5,
        stagger: 0.1,
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "0 center",
        ease: "back.out(1.7)"
      });
      tl.addLabel("step4");
      tl.from("#reactionTimes > *", {
        duration: 0.5,
        stagger: 0.1,
        y: "-=100",
        autoAlpha: 0
      });
      tl.addLabel("step5");
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
