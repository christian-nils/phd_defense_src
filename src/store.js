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
        enter: "slideInUp",
        leave: "fadeOut",
        steps: 5
      },
      {
        name: "Paper1Video",
        menuName: "Paper 1 video",
        path: "/paper-1-video",
        enter: "fadeIn",
        leave: "slideOutUp"
      },
      {
        name: "Paper1Metrics",
        menuName: "Paper 1 metrics",
        path: "/paper-1-metrics",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 9
      },
      {
        name: "Paper1Results1",
        menuName: "Paper 1 results part 1",
        path: "/paper-1-results-1",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 5
      },
      {
        name: "Paper1Results2",
        menuName: "Paper 1 results part 2",
        path: "/paper-1-results-2",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 5
      },
      {
        name: "Paper1Results3",
        menuName: "Paper 1 results Euro NCAP",
        path: "/paper-1-results-euro-ncap",
        enter: "slideInUp",
        leave: "slideOutLeft",
        steps: 2
      },
      {
        name: "Paper2-4",
        menuName: "Paper 2-4",
        path: "/paper-2-4",
        enter: "slideInRight",
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
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 5
      },
      {
        name: "Paper2Results",
        menuName: "Paper 2 Results",
        path: "/paper-2-results",
        enter: "slideInUp",
        leave: "slideOutLeft",
        steps: 7
      },
      {
        name: "Paper3Methods",
        menuName: "Paper 3 Methods",
        path: "/paper-3-methods",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 2
      },
      {
        name: "Paper3Results1",
        menuName: "Paper 3 Results 1",
        path: "/paper-3-results-1",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 5
      },
      {
        name: "Paper3Results2",
        menuName: "Paper 3 Results 2",
        path: "/paper-3-results-2",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 3
      },
      {
        name: "Paper3Results3",
        menuName: "Paper 3 Results 3",
        path: "/paper-3-results-3",
        enter: "slideInUp",
        leave: "slideOutLeft",
        steps: 2
      },
      {
        name: "Paper4Methods",
        menuName: "Paper 4 Methods",
        path: "/paper-4-methods",
        enter: "slideInRight",
        leave: "slideOutUp",
        steps: 4
      },
      {
        name: "Paper4ModellingFramework",
        menuName: "Paper 4 modelling framework",
        path: "/paper-4-modelling-framework",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 9
      },
      {
        name: "Paper4Looming",
        menuName: "Paper 4 traditional looming",
        path: "/paper-4-traditional-looming",
        steps: 4,
        enter: "slideInUp",
        leave: "slideOutUp"
      },
      {
        name: "Paper4LoomingCueDef",
        menuName: "Paper 4 longitudinal looming",
        path: "/paper-4-looming-def",
        steps: 2,
        enter: "slideInUp",
        leave: "slideOutUp"
      },
      {
        name: "Paper4PETCueDef",
        menuName: "Paper 4 PET definition",
        path: "/Paper-4-PET-def",
        steps: 2,
        enter: "slideInUp",
        leave: "slideOutUp"
      },
      {
        name: "Paper4DriverModel",
        menuName: "Paper 4 driver model",
        path: "/paper-4-driver-model",
        steps: 5,
        enter: "slideInUp",
        leave: "slideOutUp"
      },
      {
        name: "Paper4DriverModelExample",
        menuName: "Paper 4 driver model example",
        path: "/paper-4-driver-model-example",
        steps: 2,
        enter: "slideInUp",
        leave: "slideOutLeft"
      },
      {
        name: "Paper5",
        menuName: "Paper 5",
        path: "/paper-5",
        steps: 2
      },
      {
        name: "ThankYou",
        menuName: "Thanks",
        path: "/thanks",
        enter: "slideInUp",
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
