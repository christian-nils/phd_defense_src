<template lang="pug">
 .full-width.full-height-with-margin.flex-container.flex-centered
    Paper2Results1SVG
    .absolute
      eg-transition(enter="bounceInLeft" leave=null)
        div(v-if=' step>6 ').flex-container.flex-column
          p.center CBNA-#[span.yellow 50]
          Paper2CBNAFactorsSVG.center
          p.center #[span.yellow AEB] activation before 0.7 to 0.95s
</template>

<script>
import CyclistLogoSVG from "../assets/images_src/cyclistLogo.svg";
import Paper2Results1SVG from "../assets/images_src/paper2Results1.svg";
import Paper2CBNAFactorsSVG from "../assets/images_src/paper2CBNAFactors.svg";
import { gsap } from "gsap";

export default {
  components: { CyclistLogoSVG, Paper2Results1SVG, Paper2CBNAFactorsSVG },
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
    var curvePaths = document.getElementById("model").childNodes;

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

    function getPointsTimeline(id) {
      var tl = gsap.timeline({ paused: true });
      tl.addLabel("start");
      tl.from("#" + id + ">*", {
        duration: 0.5,
        autoAlpha: 0,
        scale: 0,
        transformOrigin: "center",
        stagger: 0.005,
        ease: "back.out(1.7)"
      });
      tl.addLabel("end");
      return tl;
    }

    function getEuroNCAPLabelTimeline() {
      var tl = gsap.timeline();
      tl.from("#euroNCAP", {
        duration: 0.5,
        autoAlpha: 0,
        scale: 0,
        transformOrigin: "center",
        ease: "back.out(1.7)"
      });
      tl.from("#arrow1", {
        duration: 0.5,
        autoAlpha: 0,
        scaleY: 0,
        transformOrigin: "center bottom"
      });
      tl.from("#arrow2", {
        duration: 0.5,
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "right middle"
      });
      tl.from("#euroNCAPTxt", {
        duration: 0.5,
        autoAlpha: 0,
        scale: 0,
        transformOrigin: "center",
        ease: "back.out(1.7)"
      });
      return tl;
    }
    function getMoveSVGTimeline() {
      var tl = gsap.timeline();
      tl.to("#paper2Results1", {
        transformOrigin: "center",
        scale: 0.8,
        duration: 0.5,
        x: "+=300"
      });
      return tl;
    }
    var modelTL = activateCurve("#model");
    var testTrackPts = getPointsTimeline("testTrack");
    var simulatorPts = getPointsTimeline("simulator");
    var extraSimulatorPts = getPointsTimeline("extraSimulator");

    this.$options.timeline = gsap.timeline({ paused: true });
    this.$options.timeline
      .addLabel("step1")
      .add(simulatorPts.tweenFromTo("start", "end").timeScale(1.5))
      .addLabel("step2")
      .add(testTrackPts.tweenFromTo("start", "end").timeScale(1.5))
      .addLabel("step3")
      .add(extraSimulatorPts.tweenFromTo("start", "end"))
      .addLabel("step4")
      .add(modelTL.tweenFromTo("start", "end"))
      .addLabel("step5")
      .add(getEuroNCAPLabelTimeline())
      .addLabel("step6")
      .add(getMoveSVGTimeline())
      .addLabel("step7");
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
.absolute {
  color: white;
  position: absolute;
  top: 50px;
  left: 100px;
  width: 40%;
  font-size: larger;
}

#paper2CBNAFactors {
  width: 400px;
  margin: auto;
}
</style>
