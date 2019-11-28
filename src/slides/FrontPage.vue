<template lang="pug">
div
  .center
    ChalmersSVG.full-width
</template>
<script>
import ChalmersSVG from "../assets/images_src/chalmers_logo.svg";
import { gsap } from "gsap";

export default {
  components: {
    ChalmersSVG
  },
  mounted: function() {
    const logo = document.getElementById("chalmers_logo");
    gsap.from(logo.childNodes, {
      duration: 1,
      y: "-=100",
      delay: 1,
      stagger: 0.25
    });
  }
};
</script>
<style scoped>
h4.title {
  font-size: 1.8em;
  margin-bottom: 0em;
}

h4.sub-title {
  margin-top: 0;
  color: rgb(165, 165, 165);
}
</style>
