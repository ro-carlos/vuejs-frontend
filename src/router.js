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
      component: () => import("./components/ConnectionsList"),
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddDomain"),
    },
  ],
});
