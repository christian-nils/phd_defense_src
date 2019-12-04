import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentIndex: 0,
    slides: [
      {
        name: "FrontPage",
        menuName: "Front Page",
        path: "/",
        enter: "fadeIn",
        leave: "fadeOut"
      },
      {
        name: "CrashAnim",
        menuName: "Animation crash",
        path: "/crash-animation",
        enterNext: "fadeIn",
        enterPrev: "fadeIn",
        leaveNext: "rotateOutDownLeft",
        leavePrev: "fadeOut"
      },
      {
        name: "Title",
        menuName: "Title",
        path: "/title",
        enterNext: "rotateInDownRight",
        enterPrev: "fadeIn",
        leaveNext: "fadeOut",
        leavePrev: "fadeOut"
      },
      {
        name: "SafetySystems",
        menuName: "Safety systems",
        path: "/safety-systems",
        steps: 2
      },
      {
        name: "PhDOrganisation",
        menuName: "Ph.D. organisation",
        path: "/phd-organisation",
        enterNext: "fadeInRight",
        enterPrev: "fadeInLeft",
        leaveNext: "fadeOutLeft",
        leavePrev: "fadeOut",
        steps: 10
      },
      {
        name: "IntroPapers",
        menuName: "Introduction Papers",
        path: "/papers",
        enter: null,
        leave: null,
        steps: 6
      },
      {
        name: "Paper1",
        menuName: "Paper 1",
        path: "/paper-1",
        enter: "bounceInUp",
        leave: "fadeOut",
        steps: 6
      },
      {
        name: "Paper1Video",
        menuName: "Paper 1 video",
        path: "/paper-1-video",
        enter: "fadeIn",
        leave: "bounceOutUp"
      },
      {
        name: "Paper1Metrics",
        menuName: "Paper 1 metrics",
        path: "/paper-1-metrics",
        enter: "bounceInUp",
        leave: "bounceOutUp",
        steps: 9
      },
      {
        name: "Paper1Results1",
        menuName: "Paper 1 results part 1",
        path: "/paper-1-results-1",
        enter: "bounceInUp",
        leave: "bounceOutUp",
        steps: 5
      },
      {
        name: "Paper1Results2",
        menuName: "Paper 1 results part 2",
        path: "/paper-1-results-2",
        enter: "bounceInUp",
        leave: "bounceOutUp",
        steps: 5
      },
      {
        name: "Paper1Results3",
        menuName: "Paper 1 results Euro NCAP",
        path: "/paper-1-results-euro-ncap",
        enter: "bounceInUp",
        leave: "bounceOutLeft",
        steps: 2
      },
      {
        name: "Paper2-4",
        menuName: "Paper 2-4",
        path: "/paper-2-4",
        enter: "bounceInRight",
        leave: "fadeOutUp",
        steps: 5
      },
      {
        name: "Paper2-4DataCollection1",
        menuName: "Data collection 1",
        path: "/data-collection-1",
        enter: "fadeInDown",
        leave: "fadeOutUp",
        steps: 2
      },
      {
        name: "Paper2-4DataCollection2",
        menuName: "Data collection 2",
        path: "/data-collection-2",
        enter: "fadeInDown",
        leave: "fadeOutUp",
        steps: 2
      },
      {
        name: "Paper2Methods",
        menuName: "Paper 2 Methods",
        path: "/paper-2-methods",
        enter: "bounceInUp",
        leave: "bounceOutUp",
        steps: 5
      },
      {
        name: "Paper2Results",
        menuName: "Paper 2 Results",
        path: "/paper-2-results",
        enter: "bounceInUp",
        leave: "bounceOutLeft",
        steps: 7
      },
      {
        name: "Paper3Methods",
        menuName: "Paper 3 Methods",
        path: "/paper-3-methods",
        enter: "bounceInUp",
        leave: "bounceOutLeft",
        steps: 7
      },
      {
        name: "ModellingFramework",
        menuName: "Modelling Framework",
        path: "/modelling-framework",
        steps: 3
      },
      {
        name: "Looming",
        menuName: "Looming",
        path: "/looming",
        steps: 4,
        enter: "fadeIn",
        leave: "fadeOut"
      },
      {
        name: "LoomingCueDef",
        menuName: "Longitudinal looming cue definition",
        path: "/looming-cue-def",
        steps: 2,
        enter: "fadeIn",
        leave: "fadeOut"
      },
      {
        name: "PETCueDef",
        menuName: "PET cue definition",
        path: "/PET-cue-def",
        steps: 2,
        enter: "fadeIn",
        leave: "fadeOut"
      },
      {
        name: "DriverModel",
        menuName: "Driver model",
        path: "/driver-model",
        steps: 2
      },
      {
        name: "ThankYou",
        menuName: "Thanks",
        path: "/thanks",
        enter: "bounceInUp",
        leave: "fadeOut"
      }
    ]
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setCurrent(state, index) {
      state.currentIndex = index;
    }
  }
  /* eslint-enable no-param-reassign */
});
