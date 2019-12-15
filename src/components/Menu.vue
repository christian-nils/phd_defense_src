<template lang="pug">
  SidebarMenu(:menu="menu", :collapsed="true", :disableHover="true", :showOneChild="true")
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Menu",
  components: {
    SidebarMenu
  },
  props: {},
  data() {
    return {
      menu: []
    };
  },
  computed: {
    ...mapState({
      availableSlides: "slides"
    }),
    currentMenu: function() {
      return this.$props.type;
    }
  },
  watch: {
    currentSlideIndex: "updateUrl",
    $route: "updateSlides"
  },
  created: function() {
    const slides = this.availableSlides;
    var menuCategories = [];
    var menuTemplate = "";

    // Create a list of the menu categories (the collapsible items)
    for (let index = 0; index < slides.length; index++) {
      const element = slides[index];
      var ind;
      if (element.menuCategory === undefined) {
        menuCategories.push(element.menuName);
        this.$data.menu.push({
          href: { path: element.path },
          title: element.menuName
        });
      } else {
        if (menuCategories.indexOf(element.menuCategory) === -1) {
          menuCategories.push(element.menuCategory);
          this.$data.menu.push({
            href: "",
            title: element.menuCategory,
            child: []
          });
        }
        ind = menuCategories.indexOf(element.menuCategory);
        this.$data.menu[ind].child.push({
          href: { path: element.path },
          title: element.menuName + " (s." + (index + 1) + ")"
        });
      }
    }
  },
  methods: {
    ...mapMutations({
      setCurrentIndex: "setCurrent"
    }),

    updateUrl(step) {
      const { name } = this.availableSlides[step - 1];

      if (name) {
        this.$router.push({
          name
        });
      }
    },

    updateSlides(route) {
      const index =
        this.availableSlides.findIndex(slide => slide.name === route.name) + 1;

      this.setCurrentIndex(index);
      this.currentSlideIndex = index;
    }
  }
};
</script>

<style lang="scss">
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";
</style>
