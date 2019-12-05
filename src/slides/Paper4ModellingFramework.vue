<template lang="pug">
    div.full-height.full-width
        h3 Modelling framework
        center.full-height
          eg-transition(enter='bounceInUp' leave='bounceOutDown')
            p(v-if="step >= 2") Based on the concept of neuronal #[span.blue evidence accumulation]
          eg-transition(enter='bounceInUp' leave='bounceOutDown')
            p(v-if="step >= 3") Predicts an #[span.blue intermittent driver control]
          Paper4ModellingFrameworkSVG
</template>

<script>
import Paper4ModellingFrameworkSVG from "../assets/images_src/paper4ModellingFramework.svg";
import { gsap } from "gsap";

export default {
  name: "ModellingFramework",
  components: { Paper4ModellingFrameworkSVG },
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  watch: {
    step: function(val) {
      if (val >= 3) {
        switch (this.$root.direction) {
          case "next":
            if (val > 3) {
              if (this.$options.tweenFromTo !== undefined) {
                this.$options.tweenFromTo.kill();
              }
              gsap.set(this.$options.timeline, { timeScale: 1 });
              this.$options.tweenFromTo = this.$options.timeline.tweenFromTo(
                "step" + (val - 1),
                "step" + val
              );
            }
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
    }
  },
  mounted() {
    this.$options.timeline = gsap.timeline({ paused: true });
    this.$options.timeline
      .addLabel("step1")
      .addLabel("step3")
      .from("svg", { duration: 0.5, autoAlpha: 0, y: "+=100" })
      .addLabel("step4")
      .from("#perceptualBlock>rect", { duration: 0.5, fill: "#393939" })
      .addLabel("step5")
      .from("#controlMotorBlock>rect", { duration: 0.5, fill: "#393939" })
      .addLabel("step6")
      .from("#evidenceAccumulationBlock>rect", {
        duration: 0.5,
        fill: "#393939"
      })
      .addLabel("step7")
      .from("#motorPrimitivesBlock>rect", { duration: 0.5, fill: "#393939" })
      .addLabel("step8")
      .from("#predictionPrimitivesBlock>rect", {
        duration: 0.5,
        fill: "#393939"
      })
      .addLabel("step9");
  }
};
</script>
<style>
.slide-Paper4ModellingFramework {
  color: whitesmoke;
}
</style>
<style scoped>
p {
  font-size: 2em;
}
svg {
  height: 400px;
}
</style>
