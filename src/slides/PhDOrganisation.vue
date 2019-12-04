<template lang="pug">

    div.flex-container.flex-centered.full-height.full-width
        ISSDriverModelSVG.flex-item-row
        .objectives.flex-container.flex-row
          h3 Objectives
          eg-transition(enter='bounceInRight' leave='bounceOutRight')
            div(v-if='step >= 7')
              DriverAnalysesSVG.itemLogo 
              p.itemText <span>Investigate</span> and <span>describe</span> driver behaviour
          eg-transition(enter='bounceInRight' leave='bounceOutRight')
            div(v-if='step >= 8')
              DriverModelSVG.itemLogo
              p.itemText Devise <span>driver models</span>
          eg-transition(enter='bounceInRight' leave='bounceOutRight')
            div(v-if='step >= 9')
              euroNCAPKnowledgeSVG.itemLogo
              p.itemText Provide <span>new knowledge</span> that can be used by <span>assessment programmes</span>
          eg-transition(enter='bounceInRight' leave='bounceOutRight')
            div(v-if='step >= 10')
              counterfactualSVG.itemLogo
              p.itemText Analyse the <span>impact of driver models</span> in <span>counterfactual</span> simulations
</template>

<script>
import ISSDriverModelSVG from "../assets/images_src/ISS_driverModel.svg";
import DriverAnalysesSVG from "../assets/images_src/driverAnalysesLogo.svg";
import DriverModelSVG from "../assets/images_src/driverModelLogo.svg";
import euroNCAPKnowledgeSVG from "../assets/images_src/euroNCAPKnowledgeLogo.svg";
import counterfactualSVG from "../assets/images_src/counterfactualLogo.svg";

import { gsap } from "gsap";

export default {
  components: {
    ISSDriverModelSVG,
    DriverAnalysesSVG,
    DriverModelSVG,
    euroNCAPKnowledgeSVG,
    counterfactualSVG
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
          gsap.set(this.$options.timeline, { timeScale: 1 });
          this.$options.timeline.pause();
          this.$options.timeline.tweenFromTo("step" + (val - 1), "step" + val);
          break;
        case "prev":
          gsap.set(this.$options.timeline, { timeScale: 2.5 });
          this.$options.timeline.pause();
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
    var connectorLength = [];
    var connectorPaths = document.getElementsByClassName("connector");
    this.hideSVG();

    gsap.set("#PhDOrganisation", {
      transformOrigin: "0 0"
    });

    function activateConnector(tl, id, position) {
      tl.to(
        "#connector" + id,
        { duration: 0.5, strokeDashoffset: 0, autoRound: false },
        position === undefined ? ">" : position
      );
    }
    function getAssessmentTimeline() {
      var tl = gsap.timeline();
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

      tl.to("#ISS", {
        duration: 0.5,
        scaleX: 1,
        scaleY: 1,
        ease: "back.out(1.7)"
      });
      activateConnector(tl, 7, null);
      tl.to("#euroNCAP", { duration: 0.5, scaleX: 1, scaleY: 1 });
      activateConnector(tl, 4, null);
      tl.to("#counterfactual", {
        duration: 0.5,
        scaleX: 1,
        scaleY: 1,
        ease: "back.out(1.7)"
      });
      return tl;
    }
    function getDriverAnalysesTimeline() {
      var tl = gsap.timeline();
      tl.to("#driverAnalyses", { duration: 0.5, scaleX: 1, scaleY: 1 });
      activateConnector(tl, 1, null);
      activateConnector(tl, 2, "<");

      tl.to("#driverModel", {
        duration: 0.5,
        scaleX: 1,
        scaleY: 1,
        ease: "back.out(1.7)"
      });

      return tl;
    }
    function getDriverModelTimeline() {
      var tl = gsap.timeline();

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

      return tl;
    }

    function getCounterfactualTimeline() {
      var tl = gsap.timeline();
      activateConnector(tl, 5, "<");
      activateConnector(tl, 6, null);
      return tl;
    }

    function getDisplayObjectivesTimeline() {
      var tl = gsap.timeline();
      tl.to("#brain", {
        opacity: 1,
        duration: 1,
        scale: 1,
        ease: "back.out(1.4)"
      });
      tl.to("#PhDOrganisation", {
        x: 0,
        y: 0,
        scale: 0.55,
        duration: 1
      });
      tl.from(".objectives", { duration: 1, x: "+=1000", autoAlpha: 0 }, "<");
      return tl;
    }
    function getShakyTimeline(el) {
      var tl = gsap.timeline();
      tl.to(el, { duration: 0.05, x: "+=1" });
      tl.to(el, { duration: 0.05, x: "-=2", yoyo: true, repeat: 5 });
      return tl;
    }
    this.$options.timeline = gsap.timeline({ paused: true });
    this.$options.timeline
      .addLabel("step1")
      .add(getAssessmentTimeline())
      .addLabel("step2")
      .add(getDriverAnalysesTimeline())
      .addLabel("step3")
      .add(getDriverModelTimeline())
      .addLabel("step4")
      .add(getCounterfactualTimeline())
      .addLabel("step5")
      .add(getDisplayObjectivesTimeline())
      .addLabel("step6")
      .add(getShakyTimeline(["#driverAnalyses"]))
      .addLabel("step7")
      .add(getShakyTimeline(["#driverModel"]))
      .addLabel("step8")
      .add(getShakyTimeline(["#driverAnalyses", "#ISS", "#euroNCAP"]))
      .addLabel("step9")
      .add(getShakyTimeline(["#driverModel", "#counterfactual", "#ISS"]))
      .addLabel("step10");

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

<style scoped>
.objectives {
  display: block;
  position: absolute;
  color: rgb(185, 228, 198);
  top: 30%;
  left: 35%;
  width: 63%;
}

.objectives li {
  font-weight: bold;
  font-variant: small-caps;
  font-size: larger;
  margin-bottom: 10px;
}

.objectives > h3 {
  text-align: left;
  margin-left: 400px;
  color: rgb(97, 170, 119);
}

.objectives span {
  color: whitesmoke;
}

.objectives > div {
  margin-bottom: 0.5em;
}
.itemLogo {
  display: inline-block;
  vertical-align: middle;
  height: 100px;
  width: 200px;
}
.itemText {
  display: inline-block;
  margin: 0;
}
</style>