<template lang="pug">
 .full-width.full-height.flex-container.flex-column
        .flex-centered.flex-container.flex-row.title
            CyclistLogoSVG.itemLogo   
            h3.itemText Paper #[span.blue 2]     
        Paper2ResponseProcessSVG 
</template>

<script>
import CyclistLogoSVG from "../assets/images_src/cyclistLogo.svg";
import Paper2ResponseProcessSVG from "../assets/images_src/paper2ResponseProcess.svg";
import { gsap } from "gsap";

export default {
  components: { CyclistLogoSVG, Paper2ResponseProcessSVG },
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
    var curvePaths = document.getElementById("curves").childNodes;

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
    var curvesTl = activateCurve("#curves");

    this.$options.timeline = gsap.timeline({ paused: true });
    this.$options.timeline
      .addLabel("step1")
      .add(curvesTl.tweenFromTo("start", "end"))
      .from("#curveLegend", { duration: 0.5, autoAlpha: 0 })
      .addLabel("step2")
      .from("#cyclist", { duration: 0.5, autoAlpha: 0, x: "-=10" })
      .addLabel("step3")
      .from("#labels>*", {
        duration: 0.5,
        y: "+=100",
        stagger: 0.1,
        autoAlpha: 0
      })
      .addLabel("step4")
      .from("#metrics>*", {
        duration: 0.5,
        y: "-=100",
        stagger: 0.1,
        autoAlpha: 0
      })
      .addLabel("step5");
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
