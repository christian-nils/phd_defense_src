<template lang="pug">
 .full-width.full-height-with-margin.center
        Paper3Results1SVG 
</template>

<script>
import CyclistLogoSVG from "../assets/images_src/cyclistLogo.svg";
import Paper3Results1SVG from "../assets/images_src/paper3Results1.svg";
import { gsap } from "gsap";

export default {
  components: { CyclistLogoSVG, Paper3Results1SVG },
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
    function getPointsTimeline(id) {
      var tl = gsap.timeline({ paused: true });
      tl.addLabel("start");
      tl.from("#" + id + ">*", {
        duration: 0.5,
        autoAlpha: 0,
        scale: 0,
        transformOrigin: "center",
        stagger: 0.005,
        ease: "back.out(4)"
      });
      tl.addLabel("end");
      return tl;
    }
    var SIMPtsTimeline = getPointsTimeline("SIMPts");
    var TTPtsTimeline = getPointsTimeline("TTPts");
    var SIMSTPtsTimeline = getPointsTimeline("SIMSTPts");

    this.$options.timeline = gsap.timeline({ paused: true });
    this.$options.timeline
      .addLabel("step1")
      .from("#collectedData", { duration: 0.5, x: "-=100", autoAlpha: 0 })
      .from("#legend", { duration: 0.5, x: "+=100", autoAlpha: 0 }, "<")
      .addLabel("step2")
      .add(SIMPtsTimeline.tweenFromTo("start", "end").timeScale(2))
      .addLabel("step3")
      .add(TTPtsTimeline.tweenFromTo("start", "end").timeScale(2))
      .addLabel("step4")
      .add(SIMSTPtsTimeline.tweenFromTo("start", "end"))
      .addLabel("step5")
      .from("#modelledData>*", {
        duration: 0.5,
        transformOrigin: "center",
        y: "+=100",
        autoAlpha: 0,
        stagger: 0.05
      })
      .addLabel("step6");
  }
};
</script>

<style scoped>
.itemLogo {
  vertical-align: middle;
  height: 100px;
  margin-right: 10px;
}
.itemText {
  vertical-align: middle;
  margin: 0;
}
.factors {
  max-height: 1000px;
}
.title {
  margin-top: 50px;
  margin-bottom: 50px;
}
.ex-protocol {
  position: absolute;
  top: 200px;
  left: 800px;
  width: 60%;
  font-size: larger;
}

span.red {
  color: red;
}

span.blue {
  color: #4284b7ff;
}

span.bold {
  font-weight: bold;
}
</style>
