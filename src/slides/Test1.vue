<template lang="pug">
    div
      testSVG
</template>

<script>
import testSVG from "@/assets/images_src/test.svg";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
export default {
  name: "SecondPage",
  components: {
    testSVG
  },
  mounted() {
    gsap.registerPlugin(MotionPathPlugin);
    function pauseTL() {
      this._targets[0].pause();
    }
    function getTl() {
      var tl = gsap.timeline();
      tl.to("#disk", {
        duration: 3,
        motionPath: { path: motionPath, align: "self" }
      });
      return tl;
    }
    var TL = getTl();
    var main_tl = gsap.timeline();
    main_tl.add(TL).to(
      TL,
      {
        timeScale: 0.01,
        duration: 1,
        onComplete: pauseTL
      },
      1
    );
  }
};
</script>

<style>
.slide-SecondPage {
  background-color: white;
  color: lightslategray;
}
</style>
