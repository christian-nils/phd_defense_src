import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentIndex: 0,
    slides: [
      {
        name: "FrontPage",
        menuCategory: "Introduction",
        menuName: "Front Page",
        path: "/",
        enter: "fadeIn",
        leave: "fadeOut",
        slideNumber: false
      },
      {
        name: "CrashAnim",
        menuCategory: "Introduction",
        menuName: "Animation crash",
        path: "/crash-animation",
        enter: "fadeIn",
        leave: "fadeOut",
        slideNumber: false
      },
      {
        name: "CrashStatistics",
        menuCategory: "Introduction",
        menuName: "Crash statistics",
        path: "/crash-statistics",
        enter: "fadeIn",
        leave: "fadeOut",
        slideNumber: false,
        steps: 4
      },
      {
        name: "Title",
        menuCategory: "Introduction",
        menuName: "Title",
        path: "/title",
        enter: "fadeIn",
        leave: "fadeOut",
        slideNumber: false
      },
      {
        name: "SafetySystems",
        menuCategory: "Introduction",
        menuName: "Safety systems",
        path: "/safety-systems",
        enter: "fadeIn",
        leave: "fadeOut",
        steps: 2
      },
      {
        name: "PhDOrganisation",
        menuCategory: "Introduction",
        menuName: "Ph.D. organisation",
        path: "/phd-organisation",
        enter: "fadeIn",
        leave: "fadeOut",
        steps: 10
      },
      {
        name: "IntroPapers",
        menuCategory: "Introduction",
        menuName: "Papers",
        path: "/papers",
        enterNext: "fadeIn",
        enterPrev: "slideInLeft",
        leaveNext: "fadeOut",
        leavePrev: "fadeOut",
        steps: 6
      },
      {
        name: "Paper1",
        menuCategory: "Paper 1",
        menuName: "Experimental protocol",
        path: "/paper-1-experimental-protocol",
        enterNext: "slideInRight",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutRight",
        steps: 6
      },
      {
        name: "Paper1Video",
        menuCategory: "Paper 1",
        menuName: "Data collection",
        path: "/paper-1-data-collection",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown"
      },
      {
        name: "Paper1Metrics",
        menuCategory: "Paper 1",
        menuName: "Analyses",
        path: "/paper-1-analyses",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 5
      },
      {
        name: "Paper1Results1",
        menuCategory: "Paper 1",
        menuName: "Results I",
        path: "/paper-1-results-1",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 2
      },
      {
        name: "Paper1Results2",
        menuCategory: "Paper 1",
        menuName: "Results II",
        path: "/paper-1-results-2",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 2
      },
      {
        name: "Paper1Results3",
        menuCategory: "Paper 1",
        menuName: "Results Euro NCAP",
        path: "/paper-1-results-euro-ncap",
        enterNext: "slideInUp",
        leaveNext: "slideOutLeft",
        enterPrev: "slideInLeft",
        leavePrev: "slideOutDown",
        steps: 2
      },
      {
        name: "Paper2-4",
        menuCategory: "Paper 2-4",
        menuName: "Experimental protocol",
        path: "/paper-2-4-experimental-protocol",
        enterNext: "slideInRight",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutRight",
        steps: 5
      },
      {
        name: "Paper2-4DataCollection1",
        menuCategory: "Paper 2-4",
        menuName: "Data collection I",
        path: "/paper-2-4-data-collection-1",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 2
      },
      {
        name: "Paper2-4DataCollection2",
        menuCategory: "Paper 2-4",
        menuName: "Data collection II",
        path: "/paper-2-4-data-collection-2",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 2
      },
      {
        name: "Paper2Methods",
        menuCategory: "Paper 2",
        menuName: "Analyses",
        path: "/paper-2-analyses",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 5
      },
      {
        name: "Paper2Results",
        menuCategory: "Paper 2",
        menuName: "Results",
        path: "/paper-2-results",
        enterNext: "slideInUp",
        leaveNext: "slideOutLeft",
        enterPrev: "slideInLeft",
        leavePrev: "slideOutDown",
        steps: 7
      },
      {
        name: "Paper3Methods",
        menuCategory: "Paper 3",
        menuName: "Analyses",
        path: "/paper-3-analyses",
        enterNext: "slideInRight",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutRight",
        steps: 2
      },
      {
        name: "Paper3Results1",
        menuCategory: "Paper 3",
        menuName: "Results I",
        path: "/paper-3-results-1",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 4
      },
      {
        name: "Paper3Results3",
        menuCategory: "Paper 3",
        menuName: "Results II",
        path: "/paper-3-results-2",
        enterNext: "slideInUp",
        leaveNext: "slideOutLeft",
        enterPrev: "slideInLeft",
        leavePrev: "slideOutDown",
        steps: 2
      },
      {
        name: "Paper4Methods",
        menuCategory: "Paper 4",
        menuName: "Analyses",
        path: "/paper-4-analyses",
        enterNext: "slideInRight",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutRight",
        steps: 4
      },
      {
        name: "Paper4ModellingFramework",
        menuCategory: "Paper 4",
        menuName: "Modelling framework",
        path: "/paper-4-modelling-framework",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 9
      },
      {
        name: "Paper4Looming",
        menuCategory: "Paper 4",
        menuName: "Traditional looming definition",
        path: "/paper-4-traditional-looming",
        steps: 4,
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown"
      },
      {
        name: "Paper4LoomingCueDef",
        menuCategory: "Paper 4",
        menuName: "Longitudinal looming definition",
        path: "/paper-4-looming-def",
        steps: 2,
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown"
      },
      {
        name: "Paper4PETCueDef",
        menuCategory: "Paper 4",
        menuName: "PETproj definition",
        path: "/Paper-4-PET-def",
        steps: 2,
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown"
      },
      {
        name: "Paper4DriverModel",
        menuCategory: "Paper 4",
        menuName: "Driver model",
        path: "/paper-4-driver-model",
        steps: 5,
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown"
      },
      {
        name: "Paper4DriverModelExample",
        menuCategory: "Paper 4",
        menuName: "Driver model example",
        path: "/paper-4-driver-model-example",
        steps: 2,
        enterNext: "slideInUp",
        leaveNext: "slideOutLeft",
        enterPrev: "slideInLeft",
        leavePrev: "slideOutDown"
      },
      {
        name: "Paper5",
        menuCategory: "Paper 5",
        menuName: "Analyses",
        path: "/paper-5-analyses",
        steps: 3,
        enterNext: "slideInRight",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutRight"
      },
      {
        name: "Paper5Results",
        menuCategory: "Paper 5",
        menuName: "Results",
        path: "/paper-5-results",
        steps: 6,
        enterNext: "slideInUp",
        leaveNext: "slideOutLeft",
        enterPrev: "slideInLeft",
        leavePrev: "slideOutDown"
      },
      {
        name: "Conclusions",
        menuName: "Conclusions",
        path: "/conclusions",
        enterNext: "slideInRight",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutRight",
        steps: 13
      },
      {
        name: "ThankYou",
        menuName: "Thanks",
        path: "/thanks",
        enter: "slideInUp",
        leave: "fadeOut",
        slideNumber: false
      },
      {
        name: "AppendixPaper1Results1Full",
        menuCategory: "Appendices",
        menuName: "Paper 1 full results 1",
        path: "/appendix-paper-1-results-1",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 5
      },
      {
        name: "AppendixPaper1Results2",
        menuCategory: "Appendices",
        menuName: "Paper 1 results 2",
        path: "/appendix-paper-1-results-2",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 5
      },
      {
        name: "AppendixPaper2BrakingProfiles",
        menuCategory: "Appendices",
        menuName: "Paper 2 braking profiles",
        path: "/appendix-paper-2-braking-profiles",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 1
      },
      {
        name: "AppendixPaper3Results2",
        menuCategory: "Appendices",
        menuName: "Paper 3 results 2",
        path: "/appendix-paper-3-results-2",
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown",
        steps: 3
      },
      {
        name: "AppendixPaper4DriverModelApp",
        menuCategory: "Appendices",
        menuName: "Paper 4 driver model app",
        path: "/appendix-paper-4-driver-model-app",
        steps: 1,
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown"
      },
      {
        name: "AppendixPaper5DriverModels",
        menuCategory: "Appendices",
        menuName: "Paper 5 driver models",
        path: "/appendix-paper-5-driver-models",
        steps: 1,
        enterNext: "slideInUp",
        leaveNext: "slideOutUp",
        enterPrev: "slideInDown",
        leavePrev: "slideOutDown"
      },
      {
        name: "AppendixPaper5Results",
        menuCategory: "Appendices",
        menuName: "Paper 5 results",
        path: "/appendix-paper-5-results",
        steps: 9,
        enterNext: "slideInUp",
        leaveNext: "slideOutLeft",
        enterPrev: "slideInLeft",
        leavePrev: "slideOutDown"
      },
      {
        name: "AppendixGlanceBehaviour",
        menuCategory: "Appendices",
        menuName: "Other work: glance behaviour",
        path: "/appendix-glance-behaviour",
        enterNext: "slideInUp",
        leaveNext: "slideOutLeft",
        enterPrev: "slideInLeft",
        leavePrev: "slideOutDown"
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
