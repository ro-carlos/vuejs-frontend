import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/connections",
      name: "connections",
      component: () => import("./components/Connections"),
    },
    {
      path: "/domain",
      name: "domain",
      component: () => import("./components/Domain"),
    },
  ],
});
