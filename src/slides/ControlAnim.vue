<template lang="pug">
    div.flex-container.flex-centered.full-width
        brakeSVG.flex-item-row
        steerSVG.flex-item-row
        
</template>

<script>
import brakeSVG from "../assets/images_src/brake.svg";
import steerSVG from "../assets/images_src/steer.svg";
import { gsap } from "gsap";

export default {
  components: {
    brakeSVG,
    steerSVG
  },
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  watch: {
    step: function(val) {
      if (this.$options.main_tl !== []) {
        switch (val) {
          case 2:
            gsap.set(this.$options.main_tl, { timeScale: 1 });
            this.$options.main_tl.play();
            break;
          default:
            gsap.set(this.$options.main_tl, { timeScale: 5 });
            this.$options.main_tl.reverse();
            break;
        }
      }
    }
  },
  mounted() {
    var svg_target = [
      document.getElementById("brake"),
      document.getElementById("steer")
    ];
    var brake_duration = 1;
    var delay_pedal = 0.3;
    var steer_duration = 2;
    var steer_magnitude = 30;
    var response_color = "#ea8050";
    /* Initial states */
    // Brake
    gsap.set(svg_target, {
      transformOrigin: "center",
      rotation: 180,
      scaleX: 0,
      scaleY: 0,
      opacity: 0
    });
    gsap.set("#brake_pedal", {
      rotation: "37deg_ccw",
      svgOrigin: "75.229073 35.830265"
    });
    gsap.set("#brake_arm", { rotation: -70, transformOrigin: ".8px 1px" });
    gsap.set("#shoe", {
      transformOrigin: "left bottom",
      x: 5,
      y: -5,
      rotation: -45
    });
    gsap.set("#leg", { transformOrigin: "middle bottom", rotation: -5 });
    // Steer
    gsap.set("#steering_wheel", { transformOrigin: "center" });

    /* Timeline */
    function getBrakeTimeline() {
      // Brake
      var tl_brake = gsap.timeline({ repeat: 1, yoyo: true });
      tl_brake.add("start", 0);
      tl_brake
        .to(
          "#shoe",
          { duration: brake_duration, rotation: -35, x: 13, y: 5 },
          "start"
        )
        .to("#leg", { duration: brake_duration, rotation: -15 }, "start")
        .to(
          "#brake_pedal",
          {
            duration: brake_duration - delay_pedal,
            rotation: "15deg_ccw",
            delay: delay_pedal,
            repeatDelay: delay_pedal
          },
          "start"
        )
        .to(
          "#brake_arm",
          brake_duration - delay_pedal,
          { rotation: -50, delay: delay_pedal, repeatDelay: delay_pedal },
          "start"
        )
        .to(
          "#brake .bg",
          {
            duration: brake_duration - delay_pedal,
            fill: response_color,
            delay: delay_pedal,
            repeatDelay: delay_pedal,
            ease: "expo"
          },
          "start"
        );
      return tl_brake;
    }

    function getSteerTimeline() {
      // Steer
      var tl_steer = gsap.timeline({ yoyo: true });
      tl_steer.add("start", 0);
      tl_steer.add("anchor1", steer_duration / 4);
      tl_steer.add("anchor2", (steer_duration * 3) / 8);
      tl_steer.add("anchor3", (steer_duration * 5) / 8);
      tl_steer
        .to(
          "#steering_wheel",
          {
            duration: steer_duration / 4,
            rotation: -steer_magnitude,
            ease: "sine.inOut"
          },
          "start"
        )
        .to("#steering_wheel", {
          duration: steer_duration / 4,
          rotation: steer_magnitude,
          ease: "sine.inOut"
        })
        .to("#steering_wheel", {
          duration: steer_duration / 4,
          rotation: 0,
          ease: "sine.inOut"
        })
        .to("#steering_wheel", {
          duration: steer_duration / 4,
          rotation: 0,
          ease: "sine.inOut"
        });
      tl_steer
        .to(
          "#steer .bg",
          {
            duration: steer_duration / 4,
            fill: response_color,
            ease: "sine.inOut"
          },
          "start"
        )
        .to(
          "#steer .bg",
          { duration: steer_duration / 8, fill: "#619a66", ease: "sine.inOut" },
          "anchor1"
        )
        .to(
          "#steer .bg",
          {
            duration: steer_duration / 8,
            fill: response_color,
            ease: "sine.inOut"
          },
          "anchor2"
        )
        .to(
          "#steer .bg",
          { duration: steer_duration / 4, fill: "#619a66", ease: "sine.inOut" },
          "anchor3"
        );
      return tl_steer;
    }
    function getAppearanceTimeline() {
      var tl_forward = gsap.timeline();
      tl_forward.to(svg_target, {
        duration: 0.5,
        stagger: 0.1,
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        ease: "back.out(1.7)"
      });
      return tl_forward;
    }
    this.$options.main_tl = gsap.timeline({ paused: true });

    this.$options.main_tl
      .add(getAppearanceTimeline())
      .add(getBrakeTimeline())
      .add(getSteerTimeline());
  },

  methods: {}
};
</script>

<style scoped>
svg {
  width: 30%;
}
</style>
