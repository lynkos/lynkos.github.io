var app = new Vue({
    el: "#mount",
    data() {
      return {
        wdo: {},
        title: "Arrow Glaze",
        aero: {
          basic: false,
          transparency: CSS.supports('color', 'rgba(0,0,0,0.5)'),
          blur: CSS.supports('backdrop-filter', 'blur(1px)'),
          css: {
            boxShadow: true,
            overflowHidden: true,
            dropShadowFilter: false
          }
        },
        showSidebar: false
      };
    },
    mounted() {
      this.wdo = new Draggabilly(this.$refs.window, {
        containment: "#mount",
        handle: ".titlebar"
      });
  
      this.wdo.on("dragStart", event => {});
    },
    beforeDestroy() {
      this.wdo.destroy();
    }
  });  