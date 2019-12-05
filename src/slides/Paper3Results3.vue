<template lang="pug">
 .full-width.full-height.center.flex-container
    Paper3Results3SVG
</template>

<script>
import Paper3Results3SVG from "../assets/images_src/paper3Results3.svg";
import { gsap } from "gsap";

export default {
  components: { Paper3Results3SVG },
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
    this.$options.timeline = gsap.timeline({ paused: true });
    this.$options.timeline
      .addLabel("step1")
      .from("#paper2", {
        duration: 0.5,
        autoAlpha: 0,
        y: "-=100"
      })
      .from("#arrow1", {
        duration: 0.5,
        autoAlpha: 0,
        scaleY: 0,
        transformOrigin: "center top"
      })
      .from("#arrow2", {
        duration: 0.5,
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "right middle"
      })
      .addLabel("step2");
  }
};
</script>
<style>
.slide-Paper3Results3 {
  color: whitesmoke;
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
.factors {
  max-height: 1000px;
}
.title {
  margin-top: 50px;
  margin-bottom: 50px;
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

svg {
  margin: 0 100px;
}
</style>
