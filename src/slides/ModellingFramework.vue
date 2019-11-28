<template lang="pug">
    div.full-height.full-width
        h3 Modelling framework
        center.full-height
          eg-transition(enter='bounceInUp' leave='bounceOutDown')
            p(v-if="step >= 2") Based on the concept of neuronal #[strong evidence accumulation]
          eg-transition(enter='bounceInUp' leave='bounceOutDown')
            p(v-if="step >= 3") Predicts an #[strong intermittent driver control]
</template>

<script>
export default {
  name: "ModellingFramework",
  props: {
    step: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style scoped>
p {
  font-size: 2em;
}
</style>
