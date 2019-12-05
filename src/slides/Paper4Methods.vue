<template lang="pug">
 .full-width.full-height.flex-container.flex-column
        .flex-centered.flex-container.flex-row.title
            CyclistLogoSVG.itemLogo   
            h3.itemText Paper #[span.blue 4]   
        center.full-height
          eg-transition(enter="bounceInUp" leave="bounceOutDown")
            p(v-if='step>1') Extend the model from PAPER #[span.blue 2]
          eg-transition(enter="bounceInUp" leave="bounceOutDown")
            p(v-if='step>2') Modelling framework based on #[span.blue evidence accumulation]
          eg-transition(enter="bounceInUp" leave="bounceOutDown")
            p(v-if='step>3') #[span.red Note:] only #[span.blue test-track] data
       
</template>

<script>
import CyclistLogoSVG from "../assets/images_src/cyclistLogo.svg";
import { gsap } from "gsap";

export default {
  components: { CyclistLogoSVG },
  props: {
    step: {
      type: Number,
      default: 1
    }
  }
};
</script>
<style>
.slide-Paper4Methods {
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
.ex-protocol {
  position: absolute;
  top: 200px;
  left: 800px;
  width: 60%;
  font-size: larger;
}

span.bold {
  font-weight: bold;
}
p {
  font-size: 2em;
}
</style>
