<template lang="pug">
    .full-width
        introPapersSVG
</template>

<script>
import introPapersSVG from "../assets/images_src/introPapers.svg";
import { gsap } from "gsap";

export default {
  name: "IntroPapers",
  components: {
    introPapersSVG
  },
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
          this.$options.timeline.pause();
          gsap.set(this.$options.timeline, { timeScale: 1 });
          this.$options.timeline.tweenFromTo("step" + (val - 1), "step" + val);
          break;
        case "prev":
          this.$options.timeline.pause();
          gsap.set(this.$options.timeline, { timeScale: 2.5 });
          this.$options.timeline.tweenFromTo(
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
    function getPathY(el) {
      var d = el.getAttribute("d").split(/\s|h/);
      return d[1];
    }

    function getGroupTimeline(groupID) {
      var tl = gsap.timeline();
      tl.from(groupID + "> .header > *", {
        duration: 0.5,
        ease: "back.out(1.7)",
        y: "-=100",
        autoAlpha: 0,
        stagger: 0.2
      });
      tl.from(groupID + "> .content > *", {
        duration: 0.5,
        ease: "back.out(1.7)",
        scale: 0,
        autoAlpha: 0,
        stagger: 0.2,
        transformOrigin: "center"
      });
      return tl;
    }

    function hideArrows() {
      gsap.set(".arrow", { opacity: 0 });
      var els = document.getElementsByClassName("arrow");
      for (let index = 0; index < els.length; index++) {
        gsap.set(els[index], {
          attr: { d: "M-90.871 " + getPathY(els[index]) + "h0" }
        });
      }
    }
    function getArrowAnimation(x0, dx) {
      var duration = 0.5;
      var stagger = 0.1;
      var tl = gsap.timeline();
      var els = document.getElementsByClassName("arrow");
      for (let index = 0; index < els.length; index++) {
        if (index !== 0) {
          tl.to(
            els[index],
            {
              attr: { d: "M" + x0 + " " + getPathY(els[index]) + "h" + dx },
              duration: duration,
              autoAlpha: 1
            },
            "<+" + stagger
          );
        } else {
          tl.to(els[index], {
            attr: { d: "M" + x0 + " " + getPathY(els[index]) + "h" + dx },
            duration: duration,
            autoAlpha: 1
          });
        }
      }
      return tl;
    }
    hideArrows();

    this.$options.timeline = gsap.timeline({ paused: true });

    this.$options.timeline.addLabel("step1").from("#paperList > *", {
      duration: 0.5,
      stagger: 0.1,
      x: "-=100"
    });
    this.$options.timeline
      .addLabel("step2")
      .add(getArrowAnimation(0, -354.95))
      .add(getGroupTimeline("#trafficScenarioGroup"))
      .addLabel("step3")
      .add(getArrowAnimation(40, -354.95))
      .add(getGroupTimeline("#euroNCAPScenarioGroup"))
      .addLabel("step4")
      .add(getArrowAnimation(130, -354.95))
      .add(getGroupTimeline("#dataSourceGroup"))
      .addLabel("step5")
      .add(getArrowAnimation(263.592, -354.95))
      .add(getGroupTimeline("#objectivesGroup"))
      .from("#analysesModelling", { autoAlpha: 0, duration: 0.5 })
      .addLabel("step6");
  }
};
</script>

<style>
.slide-IntroPapers > .eg-slide-content {
  max-width: 95%;
}
</style>
