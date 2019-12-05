<template lang="pug">
    .full-width.full-height.flex-container.center
        Paper5ResultsSVG      
</template>

<script>
import Paper5ResultsSVG from "../assets/images_src/paper5Results.svg";
import RearEndLogoSVG from "../assets/images_src/rearEndLogo.svg";

import { gsap } from "gsap";

export default {
  name: "Paper1",
  components: { Paper5ResultsSVG, RearEndLogoSVG },
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  watch: {
    step: function(val) {
      if (this.$options.tweenFromTo !== undefined) {
        this.$options.tweenFromTo.kill();
      }
      switch (this.$root.direction) {
        case "next":
          gsap.set(this.$options.timeline, { timeScale: 1 });
          this.$options.tweenFromTo = this.$options.timeline.tweenFromTo(
            "step" + (val - 1),
            "step" + val
          );
          break;
        case "prev":
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
    var curvePaths = document.getElementById("curves").childNodes;

    for (let index = 0; index < curvePaths.length; index++) {
      curveLength[index] = curvePaths[index].getTotalLength();
      gsap.set(curvePaths[index], {
        strokeDasharray: curveLength[index],
        strokeDashoffset: curveLength[index],
        autoRound: false
      });
    }

    function activateCurve(id, ind) {
      var tl = gsap.timeline();
      tl.addLabel("start");
      tl.to(curvePaths[ind], {
        duration: 1,
        strokeDashoffset: 0,
        autoRound: false
      });
      tl.addLabel("end");
      return tl;
    }

    this.$options.timeline = gsap.timeline({ paused: true });
    this.$options.timeline
      .addLabel("step1")
      .to("svg", {
        transformOrigin: "center",
        scale: 3.5,
        duration: 1,
        x: "-=600",
        y: "+=1000",
        ease: "power2.inOut"
      })
      .addLabel("step2")
      .from("#impactSpeeds", { autoAlpha: 0, x: "+=100", duration: 1 })
      .from("#legend>*", {
        stagger: 0.1,
        duration: 0.5,
        x: "+=100",
        autoAlpha: 0
      })
      .addLabel("step3")
      .add(activateCurve("#curves", 5))
      .addLabel("step4")
      .add(activateCurve("#curves", 0))
      .addLabel("step5")
      .add(activateCurve("#curves", 1))
      .addLabel("step6")
      .add(activateCurve("#curves", 2))
      .addLabel("step7")
      .add(activateCurve("#curves", 3))
      .addLabel("step8")
      .add(activateCurve("#curves", 4))
      .addLabel("step9");
    /*this.$options.timeline
      .addLabel("step1")
      .add(getISSTimeline())
      .addLabel("step2")
      .add(getDriverModelTimeline())
      .addLabel("step3");*/
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
.title {
  margin-top: 50px;
  margin-bottom: 50px;
}

#counterfactualFramework {
  height: 600px;
}
</style>
