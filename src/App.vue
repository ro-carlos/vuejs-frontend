<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/domain" class="navbar-brand">Vuejs App</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/connections" class="nav-link">Connections</a>
        </li>
      </div>
    </nav>

    <b-overlay :show="loading" rounded="sm" style="width: 100%" 
      :style="{
            'height': `${height}`
     }">      
      <div class="container mt-3">
        <router-view />
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { bus } from './main';

export default {
  name: 'app',
  data(){
    return {
      loading: false,
      height: "200px"
    }
  },
  created(){
    bus.$on('loading', (data) => {
      this.loading = data;
    });
    this.height = (screen.height-190)+"px"
    console.log(this.height)
  }
}
</script>