<template lang="pug">
 .full-width.full-height.center
    h3 Cross validation (to move to appendix FIXME)
    eg-transition(enter="bounceInUp" leave="bounceOutDown")
      div(v-if='step>=2')        
        ol(:style="{textAlign:'left', paddingLeft:'300px'}")          
          li Draw randomly #[span.blue 11] trials/participant (#[span.blue 12] for SIMST)
          li Predict the remaining trial/participant
          li Repeat above (1-2), #[span.blue 200] times
          li Calculate #[span.blue confusion matrices]
    eg-transition(enter="bounceInUp" leave="bounceOutDown")
      Paper3Results2SVG(v-if='step>=3')
</template>

<script>
import Paper3Results2SVG from "../assets/images_src/paper3Results2.svg";
import { gsap } from "gsap";

export default {
  components: { Paper3Results2SVG },
  props: {
    step: {
      type: Number,
      default: 1
    }
  }
};
</script>
<style>
.slide-Paper3Results2 {
  color: whitesmoke;
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
  max-height: 1000px;
}
.title {
  margin-top: 50px;
  margin-bottom: 50px;
}
span.red {
  color: red;
}

span.blue {
  color: #4284b7ff;
}

span.bold {
  font-weight: bold;
}
</style>
