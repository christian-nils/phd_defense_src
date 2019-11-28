<template lang="pug">
    div.full-width.full-height.flex-container.flex-centered
        sleepingDriver.flex-item-row
        diskBrake.flex-item-row
</template>

<script>
import sleepingDriver from "@/assets/images_src/sleepingDriver.svg";
import diskBrake from "@/assets/images_src/diskBrake.svg";

import { gsap } from "gsap";

export default {
  components: { sleepingDriver, diskBrake },
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  watch: {
    step: function(val) {
      if (this.$options.timelines !== []) {
        switch (val) {
          case 2:
            this.displaySVGs();
            break;
          default:
            this.hideSVGs();
            break;
        }
      }
    }
  },
  mounted: function() {
    this.svg_target = [
      document.getElementById("driver"),
      document.getElementById("diskBrake")
    ];
    gsap.set(this.svg_target, { alpha: 0 });
    const ZZZ = document.getElementById("zzz");
    const greenColor = "#619a66";
    const warningColor = "#ff0000";
    const tl_driver = gsap.timeline();
    const tl_brake = gsap.timeline();

    tl_driver.set(".eye", { transformOrigin: "center", scaleY: 0 });

    tl_driver.add("start", 0);
    tl_driver.add("warning", 4);

    tl_driver.from(ZZZ.childNodes, {
      duration: 1,
      scaleX: 0,
      scaleY: 0,
      alpha: 0,
      transformOrigin: "left bottom",
      repeat: 3,
      yoyo: true,
      stagger: 0.33
    });
    tl_driver.from(
      "#mouth",

      {
        duration: 2,
        transformOrigin: "center",
        scaleX: 0.75,
        scaleY: 0.5,
        repeat: 1,
        yoyo: true,
        repeatDelay: 1
      },
      "start"
    );
    tl_driver.to(".eye", { duration: 0.1, scaleY: 1 });
    tl_driver.to("#mouth", { duration: 0.1, scaleY: 0.9, scaleX: 0.9 });
    tl_driver.to(
      "#sleepingDriver_bg",
      { duration: 0.2, alpha: 0, repeat: 5 },
      "warning"
    );
    tl_driver.to("#sleepingDriver_bg", {
      duration: 0.5,
      alpha: 1,
      fill: greenColor
    });

    tl_brake.add("brake", 3);

    tl_brake.to("#disk", {
      duration: 1,
      rotation: "360_cw",
      transformOrigin: "center",
      repeat: 2,
      ease: "none",
      delay: 1
    });

    tl_brake.to("#diskBrake_bg", { duration: 1, fill: greenColor }, "brake");
    tl_brake.to(
      "#disk",
      { duration: 1, rotation: 180, ease: "power2" },
      "brake"
    );
    this.$options.timelines = {
      driver: tl_driver,
      diskBrake: tl_brake
    };
  },
  methods: {
    displaySVGs: function() {
      const tl_forward = gsap.timeline();
      tl_forward.fromTo(
        this.svg_target,
        {
          transformOrigin: "center",
          rotation: 180,
          scaleX: 0,
          scaleY: 0,
          opacity: 0
        },
        {
          duration: 0.5,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          opacity: 1,
          ease: "back.out(1.7)",
          stagger: 0.1
        }
      );
      tl_forward
        .add(this.$options.timelines["driver"].play())
        .add(this.$options.timelines["diskBrake"].play());
    },
    hideSVGs: function() {
      gsap.to(this.svg_target, {
        duration: 1,
        transformOrigin: "center",
        rotation: -180,
        scaleX: 0,
        scaleY: 0,
        alpha: 0,
        ease: "back.out(5)",
        stagger: 0.25
      });
    }
  }
};
</script>

<style scoped>
svg {
  width: 30%;
}
</style>
