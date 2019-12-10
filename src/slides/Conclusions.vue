<template lang="pug">
  div.full-width.flex-container.flex-column.full-height
    h3 Conclusions
    .conclusions
      eg-transition(enter='slideInRight' leave='slideOutLeft')
        div(v-if='step <= 4')
          DriverAnalysesSVG.itemLogo
          p.itemText Investigate and describe driver behaviour
          ul
            eg-transition(enter='fadeIn' leave='fadeOut')
              li(v-if='step >= 2') The moment when the pedestrian or cyclist appears was shown to be crucial (Papers 1-4)
            eg-transition(enter='fadeIn' leave='fadeOut')
              li(v-if='step >= 3') Similar brake onset behaviour in simulator and test-track environments (Papers 1-2)
            eg-transition(enter='fadeIn' leave='fadeOut')
              li(v-if='step >= 4') Similar self-reported discomfort in simulator and test-track environments (Paper 3)
      eg-transition(enter='slideInRight' leave='slideOutLeft')
        div(v-if='step >= 5 && step <=8')
          DriverModelSVG.itemLogo
          p.itemText Devise driver models
          ul
            eg-transition(enter='fadeIn' leave='fadeOut')
              li(v-if='step >= 6') Models for key points of the driver response (Papers 1 and 2)
            eg-transition(enter='fadeIn' leave='fadeOut')
              li(v-if='step >= 7') Model for discomfort model (Paper 3)
            eg-transition(enter='fadeIn' leave='fadeOut')
              li(v-if='step >= 8') Model predicting driver brake pedal deflection (Paper 4)
      eg-transition(enter='slideInRight' leave='slideOutLeft')
        div(v-if='step >= 9 && step <=11')
          euroNCAPKnowledgeSVG.itemLogo
          p.itemText Provide new knowledge that can be used by assessment programmes
          ul
            eg-transition(enter='fadeIn' leave='fadeOut')
              li(v-if='step >= 10') Results in line with Euro NCAP test protocols (Papers 1-3)
            eg-transition(enter='fadeIn' leave='fadeOut')
              li(v-if='step >= 11') FCW systems should be considered by the assessment programmes (Papers 1-3)
      eg-transition(enter='slideInRight' leave='slideOutLeft')
        div(v-if='step >= 12')
          counterfactualSVG.itemLogo
          p.itemText Analyse the impact of driver models in counterfactual simulations
          ul
            eg-transition(enter='fadeIn' leave='fadeOut')
              li(v-if='step >= 13') Safety benefit evaluation highly-depends on the driver model
</template>
<script>
import DriverAnalysesSVG from "../assets/images_src/driverAnalysesLogo.svg";
import DriverModelSVG from "../assets/images_src/driverModelLogo.svg";
import euroNCAPKnowledgeSVG from "../assets/images_src/euroNCAPKnowledgeLogo.svg";
import counterfactualSVG from "../assets/images_src/counterfactualLogo.svg";

export default {
  components: {
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
  }
};
</script>
<style scoped>
.conclusions {
  color: whitesmoke;
}
.conclusions li {
  margin-bottom: 10px;
  margin-left: 100px;
  position: relative;
}

.conclusions > div {
  margin-bottom: 0.5em;
}

.itemLogo {
  display: inline-block;
  vertical-align: middle;
  height: 100px;
  margin-right: 10px;
}
.itemText {
  display: inline-block;
  vertical-align: middle;
  margin: 0;
  font-variant: small-caps;
  font-size: larger;
  color: rgb(185, 228, 198);
}
.conclusions div {
  position: absolute;
  width: 100%;
}
</style>
