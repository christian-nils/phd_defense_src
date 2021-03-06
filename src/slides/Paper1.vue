<template lang="pug">
      .full-width.full-height.flex-container.flex-column
          .flex-centered.flex-container.flex-row.title
              PedestrianLogoSVG.itemLogo
              h3.itemText Paper 1
          div.factors.center
              Paper1FactorsSVG
          div.ex-protocol
              eg-transition(enter="fadeIn" leave="fadeOut")
                  p(v-if='step>4') Fractional factorial design: #[span.red.bold 128] trials to #[span.blue.bold 32] trials
              Paper1TrialOrderSVG
</template>

<script>
import test from "../components/test";
import Paper1FactorsSVG from "../assets/images_src/paper1Factors.svg";
import PedestrianLogoSVG from "../assets/images_src/pedestrianLogo.svg";
import Paper1TrialOrderSVG from "../assets/images_src/paper1TrialOrder.svg";
import { gsap } from "gsap";

export default {
  name: "Paper1",
  components: {
    Paper1FactorsSVG,
    PedestrianLogoSVG,
    Paper1TrialOrderSVG,
    test
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
    gsap.set(["#literatureFactors > *", "#euroNCAPFactors > * ", ".factor"], {
      autoAlpha: 0
    });
    var connectorLength = [];
    var connectorPaths = document.getElementsByClassName("connector");
    for (let index = 0; index < connectorPaths.length; index++) {
      connectorLength[index] = connectorPaths[index].getTotalLength();
      gsap.set(connectorPaths[index], {
        strokeDasharray: connectorLength[index],
        strokeDashoffset: connectorLength[index],
        autoRound: false
      });
    }

    function activateConnector(id, position) {
      var tl = gsap.timeline();
      tl.set("#connector" + id, { autoAlpha: 1 }, ">");
      tl.to(
        "#connector" + id,
        { duration: 0.5, strokeDashoffset: 0, autoRound: false },
        position === undefined ? ">" : position
      );
      return tl;
    }

    function getEuroNCAPFactors() {
      var tl = gsap.timeline();
      tl.to("#euroNCAP", { duration: 0.5, autoAlpha: 1 }).add(
        activateConnector(1, "<")
      );
      /* tl.set("#euroNCAPScenarios > .content > *", { autoAlpha: 0 });
      tl.to("#euroNCAPScenarios", { duration: 0.5, autoAlpha: 1 });
      tl.fromTo(
        "#euroNCAPScenarios > .content > *",
        { y: -100 },
        {
          duration: 0.5,
          y: 0,
          autoAlpha: 1,
          stagger: 0.25
        }
      );
      tl.add(activateConnector(2, "<"));*/
      tl.to("#euroNCAPFactors > .bracket", { duration: 0.25, autoAlpha: 1 });
      tl.fromTo(
        "#euroNCAPFactors >  .factor",
        { y: -100 },
        {
          duration: 0.5,
          y: 0,
          autoAlpha: 1,
          stagger: 0.25
        }
      );

      return tl;
    }

    function getLiteratureFactors() {
      var tl = gsap.timeline();
      tl.to("#literature", { duration: 0.5, autoAlpha: 1 }).add(
        activateConnector(3, "<")
      );
      tl.to("#literatureFactors > .bracket", {
        duration: 0.25,
        autoAlpha: 1
      }).fromTo(
        "#literatureFactors > .factor",
        { y: -100 },
        {
          duration: 0.5,
          y: 0,
          autoAlpha: 1,
          stagger: 0.25
        }
      );
      return tl;
    }

    function moveSVGTimeline() {
      var tl = gsap.timeline();
      tl.set(["#euroNCAPFactors", "#literatureFactors"], {
        transformOrigin: "center"
      });
      tl.to(["#euroNCAPFactors", "#literatureFactors"], {
        x: "-=600",
        duration: 1
      });
      tl.set([".bracket", ".connector"], { autoAlpha: 0 });
      return tl;
    }
    /*
    function getExpTableTimeline() {
      var tl = gsap.timeline();
      tl.set(["#euroNCAPFactors", "#literatureFactors"], {
        transformOrigin: "center"
      });
      tl.to(["#euroNCAPFactors", "#literatureFactors"], {
        x: "-=600",
        duration: 1
      });
      tl.set([".bracket", ".connector"], { autoAlpha: 0 });
      tl.set("#trials", { x: "-=600" });
      tl.from("#trials > *", {
        transformOrigin: "center",
        duration: 0.5,
        stagger: 0.02,
        scale: 0,
        y: "+=100",
        autoAlpha: 0
      });
      var el = document.getElementById("trials");
      var arr = getRandomArray(32, 128);
      var trials = el.children;
      var X0 = trials[0].getBBox().x;
      var dY = "+=50";
      for (let index = 0; index < arr.length; index++) {
        const trial = trials[arr[index]];
        if (index !== 0) {
          tl.to(trial, {
            duration: 0.1,
            fill: "green",
            scaleX: 3,
            y: dY,
            x: function(ind, target, targets) {
              var X = target.getBBox().x;
              return index * 15 - X + X0;
            }
          });
        } else {
          tl.to(
            trial,
            {
              duration: 0.1,
              fill: "green",
              scaleX: 3,
              y: dY,
              x: function(ind, target, targets) {
                var X = target.getBBox().x;
                return index * 15 - X + X0;
              }
            },
            ">-.01"
          );
        }
      }

      return tl;
    }

    function getRandomArray(nr, max) {
      var arr = [];
      while (arr.length < nr) {
        var r = Math.floor(Math.random() * max);
        if (arr.indexOf(r) === -1) arr.push(r);
      }
      return arr;
    }
*/
    function getTrialOrderAnimation() {
      var tl = gsap.timeline();
      tl.from("#trialOrder", {
        duration: 0.5,
        autoAlpha: 0
      });
      tl.from(
        "#trialLegend>*",
        {
          duration: 0.5,
          y: "+=100",
          autoAlpha: 0,
          stagger: 0.1
        },
        "<"
      );
      return tl;
    }

    this.$options.timeline = gsap.timeline({ paused: true });

    this.$options.timeline
      .addLabel("step1")
      .add(getEuroNCAPFactors())
      .addLabel("step2")
      .add(getLiteratureFactors())
      .addLabel("step3")
      .add(moveSVGTimeline())
      .addLabel("step4")
      .addLabel("step5")
      .add(getTrialOrderAnimation())
      .addLabel("step6");
  }
};
</script>

<style>
.slide-Paper1 {
  background-color: whitesmoke;
}
.slide-Paper1 h1,
.slide-Paper1 h2,
.slide-Paper1 h3,
.slide-Paper1 h4 {
  color: black;
}
</style>

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
  max-height: 750px;
}
.title {
  margin-top: 50px;
  margin-bottom: 50px;
}
.ex-protocol {
  position: absolute;
  top: 200px;
  left: 700px;
  width: 60%;
  font-size: larger;
}

span.blue {
  background-color: #a6dff3ff;
  padding-left: 4px;
  padding-right: 4px;
}
</style>
