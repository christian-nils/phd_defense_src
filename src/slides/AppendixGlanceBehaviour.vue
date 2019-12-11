<template lang="pug">
  .full-height.full-width.flex-container.flex-centered.flex-column
    <iframe class="flex-item-column" width="560" height="315" src="https://www.youtube.com/embed/Nbb_Ig8MsXw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    ul.flex-item-column
      li PupilLabs eye tracker used
      li 3D model of the Volvo 60s used
      li 3D models segmented in zones of interest
      li Using the Aruco markers (and OpenCV) to determine head pose
</template>

<script>
export default {};
</script>

<style scoped>
ul {
  text-align: left;
  color: whitesmoke;
}

.flex-item-column {
  margin: auto;
}
</style>
