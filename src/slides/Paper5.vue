<template lang="pug">
    .full-width.full-height.flex-container.flex-column
        .flex-centered.flex-container.flex-row.title
            RearEndLogoSVG.itemLogo   
            h3.itemText Paper 5          
        div.center
            Paper5FrameworkSVG      
</template>

<script>
import Paper5FrameworkSVG from "../assets/images_src/paper5Framework.svg";
import RearEndLogoSVG from "../assets/images_src/rearEndLogo.svg";

import { gsap } from "gsap";

export default {
  name: "Paper1",
  components: { Paper5FrameworkSVG, RearEndLogoSVG },
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
    function getDriverModelTimeline() {
      var tl = gsap.timeline();
      tl.from(["#driverModel", "#driverModels>.arrow"], {
        duration: 0.5,
        y: "-=100",
        autoAlpha: 0,
        stagger: 0.1
      })
        .from("#driverModels>.pole", {
          transformOrigin: "left middle",
          scaleX: 0,
          duration: 0.5
        })
        .from("#driverModels>text", {
          duration: 0.5,
          y: "-=100",
          autoAlpha: 0,
          stagger: 0.25
        });
      return tl;
    }
    function getISSTimeline() {
      var tl = gsap.timeline();
      tl.from(
        ["#ISS", "#system>.arrow"],
        {
          duration: 0.5,
          y: "+=100",
          autoAlpha: 0,
          stagger: 0.1
        },
        "<"
      )
        .from("#system>.pole", {
          transformOrigin: "center bottom",
          scaleY: 0,
          duration: 0.5
        })
        .from("#system>text", {
          duration: 0.5,
          x: "+=100",
          autoAlpha: 0
        });
      return tl;
    }
    this.$options.timeline = gsap.timeline({ paused: true });
    this.$options.timeline
      .addLabel("step1")
      .add(getISSTimeline())
      .addLabel("step2")
      .add(getDriverModelTimeline())
      .addLabel("step3");
  }
};
</script>

<style>
.slide-Paper5 {
  background-color: whitesmoke;
}
.slide-Paper5 h1,
.slide-Paper5 h2,
.slide-Paper5 h3,
.slide-Paper5 h4 {
  color: black;
}
</style>

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
