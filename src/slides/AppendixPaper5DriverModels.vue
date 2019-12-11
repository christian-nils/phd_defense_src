<template lang="pug">
    .full-width.full-height.flex-container.center.flex-column
        h3.title Driver models
        table.driver-models
          tr
            th Driver model
            th A
            th B
            th C
            th D
            th E
          tr.row-section
            td Last-glance off-road (LGOR)
          tr
            td Glance anchor
            td NoGlance
            td Original start of LGOR
            td theta-dot=0.01 rad
            td theta-dot=0.01 rad
            td theta-dot=0.01 rad
          tr
            td Glance distribution
            td NoGlance
            td Baseline EOFF
            td Crash glances
            td Baseline EOFF
            td Overshoot baseline EOFF
          tr.row-section
            td Brake onset
          tr
            td Reaction anchor
            td Precipitating event
            td first EON after theta-dot=0.01rad/s
            td first EON after theta-dot=0.01rad/s
            td first EON after theta-dot=0.01rad/s
            td first EON after theta-dot=0.01rad/s
          tr
            td Reaction time
            td Distribution from Brunson et al.
            td 0.5 s
            td 0.5 s
            td 0.5 s
            td 0.5 s
          tr.row-section
            td Brake control
          tr
            td Jerk
            td 50m/s^3
            td Jerk(tau-1)
            td Jerk(tau-1)
            td Jerk(tau-1)
            td Jerk(tau-1)
          tr
            td Max decel.
            td Distribution
            td Distribution
            td Distribution
            td Distribution
            td Distribution
</template>

<script>
export default {
  name: "AppendixPaper5DriverModels",
  props: {
    step: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style scoped>
.driver-models {
  color: whitesmoke;
  font-size: 0.75em;
}

.driver-models {
  border-collapse: collapse;
  border-bottom: solid;
}

.driver-models th {
  border-top: solid;
  border-bottom: solid;
}

.driver-models .row-section {
  text-align: left;
  font-weight: bold;
}
</style>
