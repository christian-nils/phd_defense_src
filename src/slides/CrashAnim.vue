<template lang="pug">
    div
      testSVG
</template>

<script>
import testSVG from "@/assets/images_src/anim.svg";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default {
  name: "FirstPage",
  components: {
    testSVG
  },
  mounted() {
    var brakeOnsetTime = 5;
    var crossingDuration = 0.8;
    var brakingTime = 2;
    /* SVG operations */
    /* Automatically generate objects */
    var elRoad = document.getElementById("road");
    var elSides = document.getElementById("sides");

    /* Get the elements to duplicate */
    var elRoadDash = document.getElementById("road_dash_container");
    var elPublicLight = document.getElementById("public_light_container");
    var elHouseLeft = document.getElementById("house_left_container");
    var elHouseRight = document.getElementById("house_right_container");

    /* Number of elements to duplicate */
    var nrDashes = 20;
    var nrPublicLights = 5;
    var nrHouses = 10;

    /* Duplicate the elements */
    cloneEl(elSides, elHouseLeft, nrHouses);
    cloneEl(elSides, elHouseRight, nrHouses);
    cloneEl(elRoad, elRoadDash, nrDashes);
    cloneEl(elSides, elPublicLight, nrPublicLights);

    /* Remove the duplicated elements */
    elRoadDash.remove();
    elPublicLight.remove();
    elHouseLeft.remove();
    elHouseRight.remove();

    gsap.registerPlugin(MotionPathPlugin);
    gsap.set("#guides", { opacity: 0 });
    gsap.set("#star", {
      opacity: 0,
      scaleX: 0.3,
      scaleY: 0.3,
      transformOrigin: "37% 50%"
    });
    gsap.set(".house_left", {
      scaleX: 0,
      scaleY: 0,
      transformOrigin: "0 bottom"
    });
    gsap.set(".road_dash", {
      scaleX: 0,
      scaleY: 0,
      transformOrigin: "50% 50%"
    });
    gsap.set(".house_right", {
      scaleX: 0,
      scaleY: 0,
      transformOrigin: "100% bottom"
    });
    gsap.set(".public_light", {
      scaleX: 0,
      scaleY: 0,
      transformOrigin: "-10% bottom"
    });

    gsap.set("#zebra", {
      scaleX: 0,
      scaleY: 0,
      transformOrigin: "48% bottom"
    });
    gsap.set("#cyclist", {
      scaleX: 0,
      scaleY: 0,
      transformOrigin: "50% bottom"
    });

    function getDrivingTimeline() {
      var tl = gsap.timeline({ defaults: { ease: "expo.in" } });

      addTween(
        tl,
        "house_left",
        nrHouses,
        "#house_left_path",
        3.35,
        3.35,
        1,
        true
      );
      addTween(tl, "road_dash", nrDashes, "#road_dash_path", 2, 2.2, -1, false);
      addTween(
        tl,
        "house_right",
        nrHouses,
        "#house_right_path",
        2.8,
        2.8,
        1,
        true
      );
      addTween(
        tl,
        "public_light",
        nrPublicLights,
        "#public_light_path",
        2.5,
        2.5,
        1,
        false
      );

      tl.to(
        "#interaction",
        {
          duration: brakeOnsetTime,
          motionPath: {
            type: "thru",
            curviness: 0,
            path: "#interaction_path",
            align: "self"
          }
        },
        brakeOnsetTime * 2.1
      );
      tl.to(
        "#zebra",
        { duration: brakeOnsetTime, scaleX: 5.1, scaleY: 5.1 },
        "<"
      );
      tl.to(
        "#cyclist",
        { duration: brakeOnsetTime, scaleX: 5.1, scaleY: 5.1 },
        "<"
      );

      return tl;
    }

    function getCyclistMotionTimeline() {
      var duration = 0.5;
      var tl_motion_cyclist = gsap.timeline();
      animateWheels(tl_motion_cyclist, duration);
      animateLeg(tl_motion_cyclist, "left_leg", duration, 0);
      animateLeg(tl_motion_cyclist, "right_leg", duration, -1);
      animateBack(tl_motion_cyclist, duration);
      animateHead(tl_motion_cyclist, duration);
      animateArm(tl_motion_cyclist, duration);
      return tl_motion_cyclist;
    }

    function getCrashTimeline() {
      var crash_tl = gsap.timeline();

      crash_tl.fromTo(
        "#cyclist",
        { x: "+=100" },
        {
          duration: crossingDuration,
          x: "-=270",
          ease: "none"
        }
      );

      crash_tl.to(
        "#cyclist",
        {
          duration: 3,
          transformOrigin: "center",
          x: "-=15",
          y: "-=120",
          scaleX: 0,
          scaleY: 0,
          opacity: 0,
          rotation: -720,
          ease: "expo"
        },
        ">"
      );

      crash_tl.to(
        "#star",
        {
          duration: 3,
          scaleX: 0.5,
          scaleY: 0.5,
          alpha: 1,
          rotation: 180,
          ease: "expo"
        },
        ">-2"
      );
      crash_tl.to(
        "#star",
        {
          duration: 3,
          scaleX: 0,
          scaleY: 0,
          alpha: 1,
          rotation: 90,
          ease: "expo"
        },
        ">"
      );

      return crash_tl;
    }

    function pauseTL() {
      this._targets[0].pause();
    }

    var main_tl = gsap.timeline();
    var driving_tl = getDrivingTimeline();
    main_tl
      .add(driving_tl, 0)
      .add(getCyclistMotionTimeline(), 0)
      .to(
        driving_tl,
        {
          duration: brakingTime,
          timeScale: 0.01,
          onComplete: pauseTL
        },
        brakeOnsetTime * 3 - brakingTime + 1.1
      )
      .add(getCrashTimeline(), brakeOnsetTime * 3 - brakingTime + 1.1);

    function animateWheels(tl, duration) {
      tl.fromTo(
        ".wheel",
        duration / 5,
        { transformOrigin: "center", rotation: 0 },
        { rotation: -10, ease: "none", repeat: -1 },
        0
      );
    }
    function animateArm(tl, duration) {
      gsap.set("#arm", {
        transformOrigin: "10% 90%",
        rotation: 0
      });
      tl.to(
        "#arm",
        duration / 2,
        {
          rotation: "+=5",
          repeat: -1,
          delay: (duration / 2) * 0.1,
          yoyo: true,
          ease: "sine.inOut"
        },
        0
      );
    }

    function animateHead(tl, duration) {
      gsap.set("#head", {
        transformOrigin: "60% 85%",
        rotation: 0
      });
      tl.to(
        "#head",
        duration / 2,
        {
          rotation: "-=5",
          repeat: -1,
          delay: (duration / 2) * 0.1,
          yoyo: true,
          ease: "sine.inOut"
        },
        0
      );
    }

    function animateBack(tl, duration) {
      gsap.set("#back", {
        transformOrigin: "60% 85%",
        rotation: 0
      });
      tl.to(
        "#back",
        duration / 2,
        {
          rotation: "+=3",
          repeat: -1,
          delay: (duration / 2) * 0.1,
          yoyo: true,
          ease: "sine.inOut"
        },
        0
      );
    }

    function animateLeg(tl, id, duration, delay) {
      gsap.set("#" + id, {
        transformOrigin: "80% 10%",
        rotation: -20
      });
      gsap.set("#" + id + ">.calf", {
        transformOrigin: "7% 18%",
        rotation: -10
      });

      tl.to(
        "#" + id,
        {
          duration: duration,
          rotation: "+=40",
          repeat: -1,
          delay: delay * duration,
          yoyo: true,
          ease: "sine.inOut"
        },
        0
      );

      tl.to(
        "#" + id,
        {
          duration: duration,
          y: 0.1,
          repeat: -1,
          delay: (0.25 + delay) * duration,
          yoyo: true,
          ease: "sine.inOut"
        },
        0
      );

      tl.to(
        "#" + id + ">.calf",
        {
          duration: duration,
          rotation: "+=50",
          repeat: -1,
          delay: (0.75 + delay) * duration,
          yoyo: true,
          ease: "sine.inOut"
        },
        0
      );
    }

    // Functions
    function cloneEl(parent, el, nr) {
      for (let index = 1; index <= nr; index++) {
        var clonedEl = el.cloneNode(true);
        clonedEl.classList.add(clonedEl.id);
        clonedEl.removeAttribute("id");
        parent.appendChild(clonedEl);
      }
    }

    function addTween(
      timeline,
      elName,
      elNr,
      path,
      scaleX,
      scaleY,
      repetitionNr,
      reoderEl
    ) {
      var el = document.getElementsByClassName(elName + "_container");
      for (let index = 0; index < el.length; index++) {
        timeline.to(
          el[index],
          {
            duration: brakeOnsetTime,
            motionPath: { path: path, immediateRender: true, align: "self" },
            repeat: repetitionNr,
            onRepeat: onRepeatFcn,
            onRepeatParams: [reoderEl],
            onComplete: onComplete,
            delay:
              el.length === 1
                ? 0
                : (1 / (elNr - 1)) * brakeOnsetTime * (elNr - 1 - index)
          },
          0
        );
        timeline.fromTo(
          el[index].firstChild,
          { scale: 0 },
          {
            duration: brakeOnsetTime,
            repeat: repetitionNr,
            scaleX: scaleX,
            scaleY: scaleY
          },
          "<"
        );
      }
    }
    function onRepeatFcn(reoderEl) {
      if (reoderEl) {
        this._targets[0].parentNode.insertBefore(
          this._targets[0],
          this._targets[0].parentNode.firstChild
        );
      }
    }
    function onComplete() {
      /*if (NodeList.prototype.isPrototypeOf(this._targets)) {
        this._targets[0].remove();
      } else {*/
      this._targets[0].remove();
      //}
    }
  }
};
</script>

<style>
.slide-FirstPage {
  background-color: black;
}
div {
  width: 100%;
}
</style>
