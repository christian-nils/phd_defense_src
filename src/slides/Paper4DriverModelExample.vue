<template lang="pug">
    div.full-width.full-height.flex-container.flex-row(v-if='step > 1')
            video.flex-item-row(width="100%" autoplay muted)
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
