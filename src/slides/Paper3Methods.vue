<template lang="pug">
 .full-width.full-height.flex-container.flex-column
        .flex-centered.flex-container.flex-row.title
            CyclistLogoSVG.itemLogo
            h3.itemText Paper #[span.blue 3]
        Paper3MethodsSVG
</template>

<script>
import CyclistLogoSVG from "../assets/images_src/cyclistLogo.svg";
import Paper3MethodsSVG from "../assets/images_src/paper3Methods.svg";
import { gsap } from "gsap";

export default {
  components: { CyclistLogoSVG, Paper3MethodsSVG },
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
      .from("#paper3Methods", { duration: 0.5, autoAlpha: 0 })
      .addLabel("step2");
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

#paper3Methods {
  margin: auto;
  width: 800px;
}
</style>
