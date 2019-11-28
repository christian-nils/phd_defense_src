<template lang="pug">
        anim.vertical-centered
</template>

<script>
import anim from "../assets/images_src/cyclist.svg";
import { gsap } from "gsap";

export default {
  components: {
    anim
  },
  mounted() {
    this.svg_target = document.getElementById("cyclist");
    var duration = 0.5;
    animateWheels(duration);
    animateLeg("left_leg", duration, 0);
    animateLeg("right_leg", duration, -1);
    animateBack(duration);
    animateHead(duration);
    animateArm(duration);

    function animateWheels(duration) {
      gsap.set(".wheel", { transformOrigin: "center" });
      gsap.to(".wheel", {
        duration: duration,
        rotation: "360_ccw",
        ease: "none",
        repeat: -1
      });
    }

    function animateArm(duration) {
      gsap.set("#arm", {
        transformOrigin: "10% 90%",
        rotation: 0
      });
      gsap.to("#arm", {
        duration: duration / 2,
        rotation: "+=5",
        repeat: -1,
        delay: (duration / 2) * 0.1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    function animateHead(duration) {
      gsap.set("#head", {
        transformOrigin: "60% 85%",
        rotation: 0
      });
      gsap.to("#head", {
        duration: duration / 2,
        rotation: "-=5",
        repeat: -1,
        delay: (duration / 2) * 0.1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    function animateBack(duration) {
      gsap.set("#back", {
        transformOrigin: "60% 85%",
        rotation: 0
      });
      gsap.to("#back", duration / 2, {
        rotation: "+=3",
        repeat: -1,
        delay: (duration / 2) * 0.1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    function animateLeg(id, duration, delay) {
      gsap.set("#" + id, {
        transformOrigin: "80% 10%",
        rotation: -20
      });
      gsap.set("#" + id + ">.calf", {
        transformOrigin: "7% 18%",
        rotation: -10
      });

      gsap.to("#" + id, {
        duration: duration,
        rotation: "+=40",
        repeat: -1,
        delay: delay * duration,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to("#" + id, {
        duration: duration,
        y: 0.1,
        repeat: -1,
        delay: (0.25 + delay) * duration,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to("#" + id + ">.calf", {
        duration: duration,
        rotation: "+=50",
        repeat: -1,
        delay: (0.75 + delay) * duration,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }
};
</script>

<style scoped></style>
