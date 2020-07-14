import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/domain",
      name: "domain",
      component: () => import("./components/Domain"),
    },
    {
      path: "/connections",
      name: "connections",
      component: () => import("./components/Connections"),
    },
  ],
});
