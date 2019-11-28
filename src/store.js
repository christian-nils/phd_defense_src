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
        name: "Blank",
        menuName: "Blank",
        path: "/blank"
      },
      {
        name: "ControlAnim",
        menuName: "Driver control",
        path: "/driver-control",
        steps: 2,
        enterNext: "rotateInDownRight",
        enterPrev: "fadeInLeft",
        leaveNext: "fadeOutLeft",
        leavePrev: "fadeOut"
      },
      {
        name: "SafetySystems",
        menuName: "Safety systems",
        path: "/safety-systems",
        steps: 2
      },
      {
        name: "ISSDriverModel",
        menuName: "ISS & driver model",
        path: "/ISS-driver-model",
        enterNext: "fadeInRight",
        enterPrev: "fadeInLeft",
        leaveNext: "fadeOutLeft",
        leavePrev: "fadeOut",
        steps: 2
      },
      {
        name: "DataCollection",
        menuName: "Data collection",
        path: "/data-collection",
        steps: 2
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
