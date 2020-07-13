<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Domain"
          v-model="domain"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchDomain"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Connections List</h4>
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
    <div class="col-md-6">
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
import moment from 'moment';
import DomainService from "../services/DomainService";

export default {
  name: "connections-list",
  data() {
    return {
      connections: [],
      currentConnection: null,
      currentIndex: -1,
      domain: ""
    };
  },
  methods: {
    retrieveConnections() {
      DomainService.getAll()
        .then(response => {
          this.connections = response.data.items;

          if(this.connections && this.connections.length > 0){
            this.connections.map(element => {
              element.last_update =  moment(String(element.last_update )).format('MM/DD/YYYY hh:mm:ss')
            });
          }

          console.log(response);
        })
        .catch(e => {
          console.log(e);
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
        DomainService.findByConnection(this.domain.toUpperCase())
        .then(response => {
          this.connections = response.data.items;

         if(this.connections && this.connections.length > 0){
            this.connections.map(element => {
              element.last_update =  moment(String(element.last_update )).format('MM/DD/YYYY hh:mm:ss')
            });
          }
          console.log(response);
        })
        .catch(e => {
          console.log(e);
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