<template lang="pug">

    div.flex-container.flex-centered.full-height.full-width
        ISSDriverModelSVG.flex-item-row
        
</template>

<script>
import ISSDriverModelSVG from "../assets/images_src/ISS_driverModel.svg";
import { gsap } from "gsap";

export default {
  components: {
    ISSDriverModelSVG
  },
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  watch: {
    step: function(val) {
      switch (val) {
        case 2:
          this.$options.timeline.play();
          break;
        default:
          this.$options.timeline.reverse();
          break;
      }
    }
  },
  mounted() {
    var connectorLength = [];
    var connectorPaths = document.getElementsByClassName("connector");
    this.hideSVG();
    function activateConnector(tl, id, position) {
      tl.to(
        "#connector" + id,
        { duration: 0.5, strokeDashoffset: 0, autoRound: false },
        position === undefined ? ">" : position
      );
    }
    function getAnimationTimeline() {
      var tl = gsap.timeline({ paused: true });
      /* Set initial state of elements */
      /* Groups */
      tl.set("#ISSDriverModel", { opacity: 1 });
      tl.set(".cog", { scaleX: 0, scaleY: 0, transformOrigin: "center" });
      /* Connectors */
      for (let index = 0; index < connectorPaths.length; index++) {
        connectorLength[index] = connectorPaths[index].getTotalLength();
        tl.set(connectorPaths[index], {
          strokeDasharray: connectorLength[index],
          strokeDashoffset: connectorLength[index],
          autoRound: false
        });
      }
      tl.set(".connector", { opacity: 1 });
      /* Set animations */

      tl.to("#euroNCAP", { duration: 0.5, scaleX: 1, scaleY: 1 });
      activateConnector(tl, 1, null);
      tl.to("#driverAnalyses", { duration: 0.5, scaleX: 1, scaleY: 1 });
      activateConnector(tl, 2, null);
      tl.to("#driverModel", {
        duration: 0.5,
        scaleX: 1,
        scaleY: 1,
        ease: "back.out(1.7)"
      });
      tl.set("#fullDriver", { opacity: 0 });
      tl.to("#driverRight", {
        duration: 0.5,
        rotation: 15,
        transformOrigin: "center bottom",
        ease: "back.out(1.7)"
      });
      tl.fromTo(
        ".cog",
        { y: 5 },
        {
          duration: 0.25,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      );
      tl.to(".cog", {
        duration: 1,
        rotation: (index, target) => {
          if (index % 2) {
            return 360;
          } else {
            return -360;
          }
        }
      });
      activateConnector(tl, 3, "-=1");
      tl.to(
        "#ISS",
        { duration: 0.5, scaleX: 1, scaleY: 1, ease: "back.out(1.7)" },
        "-=.5"
      );
      activateConnector(tl, 4, null);

      tl.to(
        "#counterfactual",
        { duration: 0.5, scaleX: 1, scaleY: 1, ease: "back.out(1.7)" },
        "-=.5"
      );
      activateConnector(tl, 5, "<");
      activateConnector(tl, 6, null);
      activateConnector(tl, 7, null);
      tl.to("#brain", {
        opacity: 1,
        duration: 1,
        scale: 1,
        ease: "back.out(1.7)"
      });
      return tl;
    }
    this.$options.timeline = getAnimationTimeline();
    this.$options.timeline.eventCallback("onReverseComplete", this.hideSVG);
  },
  methods: {
    hideSVG: function() {
      gsap.set(
        [
          "#euroNCAP",
          "#counterfactual",
          "#driverAnalyses",
          "#driverModel",
          "#ISS",
          "#brain"
        ],
        {
          scaleX: 0,
          scaleY: 0,
          transformOrigin: "center"
        }
      );
      gsap.set(["#ISSDriverModel", ".connector", "#brain"], { opacity: 0 });
    }
  }
};
</script>

<style scoped></style>
