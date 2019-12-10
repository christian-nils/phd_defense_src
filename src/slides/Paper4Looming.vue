<template lang="pug">
   div.full-width.full-height
        h3  Car-following scenario: #[strong Looming]
        div.flex-container.flex-row
            loomingSVG.flex-item-row
            brakeSVG.flex-item-row
</template>

<script>
import loomingSVG from "@/assets/images_src/looming.svg";
import brakeSVG from "@/assets/images_src/brake.svg";
import { gsap } from "gsap";

export default {
  components: {
    loomingSVG,
    brakeSVG
  },
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  watch: {
    step: function(val) {
      this.controlTimeline(val);
    }
  },
  mounted: function() {
    this.svg_target = [
      document.getElementById("intersection_anim"),
      document.getElementById("brake")
    ];
    var t2 = gsap.timeline();
    const firstBrakingDur = 3,
      secondBrakingDur = 2;

    /* Initial states */
    // Brake
    t2.set("#brake_pedal", {
      rotation: "37deg_ccw",
      svgOrigin: "75.229073 35.830265",
      immediateRender: true
    });
    t2.set("#brake_arm", {
      rotation: -70,
      transformOrigin: ".8px 1px",
      immediateRender: true
    });
    t2.set("#shoe", {
      transformOrigin: "left bottom",
      x: 5,
      y: -5,
      rotation: -45,
      immediateRender: true
    });
    t2.set("#leg", {
      transformOrigin: "middle bottom",
      rotation: -5,
      immediateRender: true
    });
    var tl_brake = this.getBrakeTimeline();

    // Car
    t2.set("#car", {
      transformOrigin: "50% bottom",
      scaleX: 0.7,
      scaleY: 0.7,
      y: "-=20",
      immediateRender: true
    });
    t2.set("#gauge_value", {
      y: "100",
      transformOrigin: "center",
      immediateRender: true
    });

    // Animation car
    t2.fromTo(
      "#car",

      { x: "-=3" },
      { duration: 1, x: "+=5", repeat: 2, yoyo: true },
      "start"
    );

    // First braking
    t2.set(".red_light", { fill: "red" });
    t2.to(
      "#car",

      {
        duration: firstBrakingDur,
        scaleX: 1,
        scaleY: 1,
        y: -40,
        ease: "expo.in"
      },
      "first_adj"
    );
    t2.to(
      "#gauge_bg",

      { duration: firstBrakingDur, ease: "expo.in" },
      "first_adj"
    );
    t2.to(
      "#gauge_value",
      { duration: firstBrakingDur, y: "0", ease: "expo.in" },
      "first_adj"
    );
    t2.to(
      tl_brake,

      { duration: 0.3, progress: 0.5 },
      "+=.2"
    );
    // second braking
    t2.set("#gauge_value", { y: "100" });
    t2.to(
      "#car",

      {
        duration: secondBrakingDur,
        scaleX: 1.5,
        scaleY: 1.5,
        y: -10,
        ease: "expo.in"
      },
      "second_adj"
    );
    t2.to(
      "#gauge_bg",

      { duration: secondBrakingDur, ease: "expo.in" },
      "second_adj"
    );
    t2.to(
      "#gauge_value",

      { duration: secondBrakingDur, y: "0", ease: "expo.in" },
      "second_adj"
    );
    t2.set("#gauge_value", { y: "100" });
    t2.to(
      tl_brake,

      { duration: 0.3, progress: 1 },
      "+=.2"
    );

    t2.add("end", "+=0");
    t2.pause("start");
    //t2.tweenFromTo("start", "first_adj"); // the timeline will be controlled by the steps
    this.$options.timeline = t2;
  },
  methods: {
    getBrakeTimeline: function(brake_duration, bp) {
      var tl_brake = gsap.timeline();
      const delay_pedal = 0.3;
      var response_color = "#c1275c";
      tl_brake.add("start", 0);
      tl_brake
        .to("#shoe", { duration: 1, rotation: -35, x: 13, y: 5 }, "start")
        .to("#leg", { duration: 1, rotation: -15 }, "start")
        .to(
          "#brake_pedal",
          {
            duration: 1 - delay_pedal,
            rotation: "15deg_ccw",
            delay: delay_pedal
          },
          "start"
        )
        .to(
          "#brake_arm",
          { duration: 1 - delay_pedal, rotation: -50, delay: delay_pedal },
          "start"
        )
        .to(
          "#brake .bg",
          {
            duration: 1 - delay_pedal,
            fill: response_color,
            delay: delay_pedal
          },
          "start"
        );
      tl_brake.pause();
      return tl_brake;
    },
    controlTimeline: function(step) {
      const keyframes = ["start", "first_adj", "second_adj", "end"];
      if (step === 1) {
        this.$options.timeline.pause("start");
      } else {
        this.$options.timeline.tweenFromTo(
          keyframes[step - 2],
          keyframes[step - 1]
        );
      }
    }
  }
};
</script>
<style scoped>
svg {
  padding-top: 5%;
}
#looming {
  width: 45%;
}
#brake {
  width: 40%;
  margin: auto 5%;
}
</style>
