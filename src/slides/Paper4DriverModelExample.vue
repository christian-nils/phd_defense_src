<template lang="pug">
  div.full-width.full-height.flex-container.flex-column.flex-centered(v-if='step > 1')
    video.flex-item-row(width="100%" autoplay muted)
      source(src="@/assets/mp4/DriverModel.mp4" type="video/mp4")
    router-link(to="/appendix-paper-4-driver-model-app" style="text-align:center;margin-top: 20px; color: whitesmoke; font-size: smaller") Click here for more information
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
