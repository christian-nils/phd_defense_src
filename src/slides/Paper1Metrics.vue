<template>
  <div class="full-width full-height-with-margin">
    <Paper1MethodsSVG />
    <div class="full-width">
      <eg-transition enter="fadeIn" leave="fadeOut">
        <h4 v-if="step > 2">Analysed metrics</h4>
      </eg-transition>
      <ul>
        <eg-transition enter="fadeIn" leave="fadeOut">
          <li v-if="step > 3">
            Brake onset response time (
            <strong>bRT</strong>)
          </li>
        </eg-transition>
        <eg-transition enter="fadeIn" leave="fadeOut">
          <li v-if="step > 4">
            Car's time-to-arrival (
            <span v-katex:auto>\(TTA_{bo}\)</span>
            ) and pedestrian's time-to-arrival (
            <span v-katex:auto>\(pTTA_{bo}\)</span>
            ) at brake onset
          </li>
        </eg-transition>
      </ul>
    </div>
  </div>
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
      .from("#pedestrian", { duration: 0.5, autoAlpha: 0, x: "-=10" })
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
#paper1Methods {
  height: 600px;
}
div {
  color: whitesmoke;
}
.strong {
  font-weight: bold;
}

h4 {
  margin: 0.5em 0;
}
</style>
