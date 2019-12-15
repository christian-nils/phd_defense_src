<template lang="pug">

  video.flex-item-row(v-if='step > 1' min-height="100%" min-width="100%" autoplay muted)
    source(src="@/assets/mp4/DriverModel.mp4" type="video/mp4")

</template>

<script>
export default {
  name: "DriverModel",
  props: {
    step: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style scoped>
.flex-container > * {
  margin: auto;
}
</style>
