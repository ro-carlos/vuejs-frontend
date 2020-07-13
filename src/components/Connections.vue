<template>
  <div class="list row">
    <div class="col-sm-12 col-md-12">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Domain"
          v-model="domain"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchDomain" :disabled='loading'
          >
            Search
            
          </button>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-6">
      <h4>Connections</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(connection, index) in connections"
          :key="index"
          @click="setActiveTutorial(connection, index)"
        >
          {{ connection.domain.address }}
        </li>
      </ul>

    </div>
    <div class="col-sm-6 col-md-6">
      <div v-if="currentConnection">
        <h4>Connection</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentConnection.domain.title }}
        </div>
        <div>
          <label><strong>Logo:</strong></label> {{ currentConnection.domain.logo }}
        </div>
        <div>
          <label><strong>SSLGrade:</strong></label> {{ currentConnection.domain.ssl_grade }}
        </div>
        <div>
          <label><strong>IsDown:</strong></label> {{ currentConnection.domain.is_down }}
        </div>
        <div>
          <label><strong>Visited:</strong></label> {{ currentConnection.last_update }}
        </div>

       
      </div>
      <div v-else>
        <br />
        <p>Please click on a Connection...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from '../main'
import moment from 'moment';
import DomainService from "../services/DomainService";
import ToastService from "../services/ToastService";

export default {
  name: "connections",
  data() {
    return {
      connections: [],
      currentConnection: null,
      currentIndex: -1,
      domain: "",
      loading: false
    };
  },
  methods: {
    retrieveConnections() {
      this.loading = true;
      bus.$emit('loading', this.loading);

      DomainService.getAll()
        .then(response => {
          console.log(response);
          this.connections = response.data.content.items;

          if(this.connections && this.connections.length > 0){
            this.connections.map(element => {
              element.last_update =  moment(String(element.last_update )).format('MM/DD/YYYY hh:mm:ss')
            });
          }

          this.loading = false;
          bus.$emit('loading', this.loading);
        })
        .catch(e => {
          console.log(e);
          this.loading = false;
          bus.$emit('loading', this.loading);

          ToastService.displayErrorMessage(this.$bvToast, "Message", "Error Retrieving Connections");
        });
    },

    refreshList() {
      this.retrieveConnections();
      this.currentConnection = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(connection, index) {
      this.currentConnection = connection;
      this.currentIndex = index;
    },
    
    searchDomain() {
      if(!this.domain || this.domain.length === 0){
        this.retrieveConnections();
      }else{
        this.loading = true
        bus.$emit('loading', this.loading);

        DomainService.findByConnection(this.domain.toUpperCase())
        .then(response => {
          console.log(response);
          this.connections = response.data.content.items;

          this.loading = false
          bus.$emit('loading', this.loading);


          if(!response.data.content.items || (response.data.content.items && response.data.content.items.length === 0 )){
            ToastService.displayErrorMessage(this.$bvToast, "Message", "Domain Was Not Found");
          }
         else if(this.connections && this.connections.length > 0){
            this.connections.map(element => {
              element.last_update =  moment(String(element.last_update )).format('MM/DD/YYYY hh:mm:ss')
            });
          }
        })
        .catch(e => {
          console.log(e);
          this.loading = false;
          bus.$emit('loading', this.loading);
          ToastService.displayErrorMessage(this.$bvToast, "Message", "Error Searching Domain");
        });
        }
    }
  },
  mounted() {
    this.retrieveConnections();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>