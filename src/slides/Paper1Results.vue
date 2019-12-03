<template lang="pug">
    .full-width.full-height-with-margin
        Paper1ResultsMainEffectsSVG
</template>

<script>
import Paper1ResultsMainEffectsSVG from "../assets/images_src/paper1ResultsMainEffectss.svg";
import { gsap } from "gsap";
export default {
  components: { Paper1ResultsMainEffectsSVG },
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
    function createAllConnectors() {
      for (let i = 1; i < 5; i++) {
        createConnectors("subplot" + i, "gasRelease");
        createConnectors("subplot" + i, "braking");
        if (i == 1) {
          createConnectors("subplot" + i, "mTTA");
        }
      }
    }
    function createConnectors(subplotID, markerType) {
      var subplot = document.getElementById(subplotID);
      var centreLine = getChildrenByClassName(subplot, "centerLine");
      var markers = getChildrenByClassName(subplot, "markers");
      var brakingMarkers = getChildrenByClassName(markers[0], markerType);
      var centreLineX =
        centreLine[0].getBBox().x + centreLine[0].getBBox().width / 2;
      for (
        let index = 0;
        index < brakingMarkers[0].childNodes.length;
        index++
      ) {
        const marker = brakingMarkers[0].childNodes[index];
        const bbox = marker.getBBox();
        createSVGLine(
          markers[0],
          "id",
          "connector-" + markerType,
          bbox.x + bbox.width / 2,
          bbox.y + bbox.height / 2,
          centreLineX,
          bbox.y + bbox.height / 2
        );
      }
    }
    createAllConnectors();

    function getChildrenByClassName(el, className) {
      var children = [];
      for (var i = 0; i < el.childNodes.length; i++) {
        if (el.childNodes[i].className.baseVal == className) {
          children.push(el.childNodes[i]);
        }
      }
      return children;
    }

    function createSVGLine(el, id, Class, x1, y1, x2, y2) {
      var newLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      newLine.setAttributeNS(null, "class", Class);
      newLine.setAttributeNS(null, "x1", x1);
      newLine.setAttributeNS(null, "y1", y1);
      newLine.setAttributeNS(null, "x2", x2);
      newLine.setAttributeNS(null, "y2", y2);
      newLine.setAttributeNS(null, "stroke", "#ffffff"); //change connector color here
      newLine.setAttributeNS(null, "stroke-width", ".1px");
      el.appendChild(newLine);
    }

    function getAnimateMarkersTimeline(subplotID, markerType) {
      var tl = gsap.timeline();
      var subplot = document.getElementById(subplotID);
      var centreLine = getChildrenByClassName(subplot, "centerLine");
      var markers = getChildrenByClassName(subplot, "markers");
      var brakingMarkers = getChildrenByClassName(markers[0], markerType);
      var connectors = getChildrenByClassName(
        markers[0],
        "connector-" + markerType
      );
      tl.from(brakingMarkers[0].childNodes, {
        duration: 0.5,
        stagger: 0.1,
        autoAlpha: 0,
        transformOrigin: "center",
        x: function(ind, target, targets) {
          return "+=" + (centreLine[0].getBBox().x - target.getBBox().x);
        }
      });
      tl.from(
        connectors,
        {
          duration: 0.5,
          stagger: 0.1,
          autoAlpha: 0,
          transformOrigin: "center",
          attr: {
            x1: function(ind, target, targets) {
              return target.getAttribute("x2");
            }
          }
        },
        "<"
      );
      return tl;
    }

    function getSubplotTimeline(markerType) {
      var tl = gsap.timeline({ paused: true });
      tl.add(getAnimateMarkersTimeline("subplot1", markerType), "start")
        .add(getAnimateMarkersTimeline("subplot2", markerType), "<")
        .add(getAnimateMarkersTimeline("subplot3", markerType), "<")
        .add(getAnimateMarkersTimeline("subplot4", markerType), "<")
        .addLabel("end");
      return tl;
    }
    this.$options.timeline = gsap.timeline({ paused: true });
    var gasReleaseTimeline = getSubplotTimeline("gasRelease");
    var brakingTimeline = getSubplotTimeline("braking");
    this.$options.timeline
      .addLabel("step1")
      .add(gasReleaseTimeline.tweenFromTo("start", "end"))
      .addLabel("step2")
      .add(gasReleaseTimeline.tweenFromTo("end", "start").timeScale(1.5))
      .add(brakingTimeline.tweenFromTo("start", "end"))
      .addLabel("step3")
      .add(brakingTimeline.tweenFromTo("end", "start").timeScale(1.5))
      .add(getAnimateMarkersTimeline("subplot1", "mTTA"))
      .addLabel("step4")
      .add(gasReleaseTimeline.tweenFromTo("start", "end").timeScale(1.5))
      .add(brakingTimeline.tweenFromTo("start", "end").timeScale(1.5))
      .addLabel("step5");
  }
};
</script>
<style scoped>
div {
  color: whitesmoke;
}
.strong {
  font-weight: bold;
}
</style>
