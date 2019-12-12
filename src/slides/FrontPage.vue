<template lang="pug">
  .center.full-height-with-margin.full-width.flex-container.flex-column
    QRCodeSVG(id="QRcode")
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
#QRcode {
  width: 50%;
}
a {
  margin-top: 100px;
  color: whitesmoke;
}
.flex-container > * {
  margin: auto;
}
</style>
