<template lang="pug">
  div.center.full-width.full-height-with-margin.content
      eg-transition(enter="fadeIn" leave="fadeOut")
        p(v-if="step>1") #[span.red.strong 1.35] millions road fatalities in 2016 (WHO)
      eg-transition(enter="fadeIn" leave="fadeOut")
        p(v-if="step>2") #[span.red.strong 54%] are vulnerable road users
      eg-transition(enter="fadeIn" leave="fadeOut")
        p(v-if="step>3") #[span.red.strong Crossing scenarios] are one of the most frequent types of crash
</template>

<script>
export default {
  props: { step: { type: Number, default: 1 } }
};
</script>

<style scoped>
.content {
  margin-top: 200px;
}
p {
  color: whitesmoke;
  font-size: 1.5em;
}
</style>
