<template lang="pug">
div
  .center
    h3 THANK YOU
    div.full-width.flex-container
      ToyotaLogoSVG(class="logo")
      VeoneerLogoSVG(class="logo")
</template>

<script>
import DIVLogoSVG from "../assets/images_src/DIVLogo.svg";
import ToyotaLogoSVG from "../assets/images_src/toyotaLogo.svg";
import VeoneerLogoSVG from "../assets/images_src/veoneerLogo.svg";

export default { components: { DIVLogoSVG, ToyotaLogoSVG, VeoneerLogoSVG } };
</script>
<style scoped>
.logo {
  height: 60px;
  width: 100%;
  margin: auto;
  margin-top: 100px;
}
</style>
