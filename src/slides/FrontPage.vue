<template lang="pug">
  .center.full-height-with-margin.full-width.flex-container.flex-row
    div.flex-container.flex-column
      h3 Link to the slides
      QRCodeSlidesSVG(class="QRcode")
      a(href="http://shorturl.at/ltuUX") shorturl.at/ltuUX
    div.flex-container.flex-column
      h3 Link to the thesis
      QRCodeThesisSVG(class="QRcode")
      a(href="https://research.chalmers.se/publication/514013/file/514013_Fulltext.pdf") shorturl.at/gILY3
</template>
<script>
import QRCodeThesisSVG from "../assets/images_src/qrcode_thesis.svg";
import QRCodeSlidesSVG from "../assets/images_src/qrcode_slides.svg";
import { gsap } from "gsap";

export default {
  components: {
    QRCodeThesisSVG,
    QRCodeSlidesSVG
  }
};
</script>
<style scoped>
h4.title {
  font-size: 1.8em;
  margin-bottom: 0em;
}
.QRcode {
  width: 100%;
}
a {
  margin-top: 50px !important;
  font-size: larger;
  color: whitesmoke;
}
.flex-container > * {
  margin: auto;
}
</style>
