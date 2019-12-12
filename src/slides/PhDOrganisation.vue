<template lang="pug">

    div.flex-container.flex-centered.full-height.full-width
        ISSDriverModelSVG.flex-item-row
        .objectives.flex-container.flex-row
          h3 Objectives
          eg-transition(enter='bounceInRight' leave='bounceOutRight')
            div(v-if='step >= 7')
              DriverAnalysesSVG.itemLogo
              p.itemText Investigate and describe driver behaviour
          eg-transition(enter='bounceInRight' leave='bounceOutRight')
            div(v-if='step >= 8')
              DriverModelSVG.itemLogo
              p.itemText Devise driver models
          eg-transition(enter='bounceInRight' leave='bounceOutRight')
            div(v-if='step >= 9')
              euroNCAPKnowledgeSVG.itemLogo
              p.itemText Provide new knowledge that can be used by assessment programmes
          eg-transition(enter='bounceInRight' leave='bounceOutRight')
            div(v-if='step >= 10')
              counterfactualSVG.itemLogo
              p.itemText Analyse the impact of driver models in counterfactual simulations
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
      var tl = gsap.timeline({ paused: true });
      /* Set initial state of elements */
      /* Groups */
      tl.addLabel("start");
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
      tl.addLabel("end");
      return tl;
    }
    function getDriverAnalysesTimeline() {
      var tl = gsap.timeline({ paused: true });
      tl.addLabel("start");
      tl.to("#driverAnalyses", { duration: 0.5, scaleX: 1, scaleY: 1 });
      activateConnector(tl, 1, null);
      activateConnector(tl, 2, "<");

      tl.to("#driverModel", {
        duration: 0.5,
        scaleX: 1,
        scaleY: 1,
        ease: "back.out(1.7)"
      });
      tl.addLabel("end");
      return tl;
    }
    function getDriverModelTimeline() {
      var tl = gsap.timeline({ paused: true });
      tl.addLabel("start");
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
      tl.addLabel("end");
      return tl;
    }

    function getCounterfactualTimeline() {
      var tl = gsap.timeline({ paused: true });
      tl.addLabel("start");
      activateConnector(tl, 5, "<");
      activateConnector(tl, 6, null);
      tl.addLabel("end");
      return tl;
    }

    function getDisplayObjectivesTimeline() {
      var tl = gsap.timeline({ paused: true });
      tl.addLabel("start");
      tl.to("#brain", {
        opacity: 1,
        duration: 1,
        scale: 1,
        ease: "back.out(1.4)"
      });
      tl.to("#PhDOrganisation", {
        x: 0,
        y: 0,
        scale: 0.45,
        duration: 1
      });
      tl.from(".objectives", { duration: 1, x: "+=1000", autoAlpha: 0 }, "<");
      tl.addLabel("end");
      return tl;
    }
    function getShakyTimeline(el) {
      var tl = gsap.timeline({ paused: true });
      tl.addLabel("start");
      tl.to(el, { duration: 0.05, x: "+=1" });
      tl.to(el, { duration: 0.05, x: "-=2", yoyo: true, repeat: 5 });
      tl.addLabel("end");
      return tl;
    }
    this.$options.timeline = gsap.timeline({ paused: true });
    this.$options.timeline
      .addLabel("step1")
      .add(getAssessmentTimeline().tweenFromTo("start", "end"))
      .addLabel("step2")
      .add(getDriverAnalysesTimeline().tweenFromTo("start", "end"))
      .addLabel("step3")
      .add(getDriverModelTimeline().tweenFromTo("start", "end"))
      .addLabel("step4")
      .add(getCounterfactualTimeline().tweenFromTo("start", "end"))
      .addLabel("step5")
      .add(getDisplayObjectivesTimeline().tweenFromTo("start", "end"))
      .addLabel("step6")
      .add(getShakyTimeline(["#driverAnalyses"]).tweenFromTo("start", "end"))
      .addLabel("step7")
      .add(getShakyTimeline(["#driverModel"]).tweenFromTo("start", "end"))
      .addLabel("step8")
      .add(
        getShakyTimeline(["#driverAnalyses", "#ISS", "#euroNCAP"]).tweenFromTo(
          "start",
          "end"
        )
      )
      .addLabel("step9")
      .add(
        getShakyTimeline([
          "#driverModel",
          "#counterfactual",
          "#ISS"
        ]).tweenFromTo("start", "end")
      )
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
  left: 10%;
  width: 90%;
}

.objectives li {
  font-weight: bold;
  font-variant: small-caps;
  font-size: larger;
  margin-bottom: 10px;
}

.objectives > h3 {
  text-align: left;
  margin-left: 40%;
  color: rgb(97, 170, 119);
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
  color: whitesmoke;
  font-size: 1.5em;
}
</style>
