<template lang="pug">
div(style={width: "60%"})
  .center
    QRCodeSVG.full-height
    a(href="https://research.chalmers.se/publication/514013/file/514013_Fulltext.pdf") shorturl.at/gILY3
</template>
<script>
import QRCodeSVG from "../assets/images_src/qr-code.svg";
import { gsap } from "gsap";

export default {
  components: {
    QRCodeSVG
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

a {
  color: rgb(165, 165, 165);
}
</style>
