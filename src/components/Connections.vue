<template>
   <div class="overflow-auto">
    <div class="col-sm-12 col-md-12">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Filter by Domain"
          v-model="domain" @keyup.enter="searchDomain"/>
        <div class="input-group-append">
          <button class="btn btn-outline-success" type="button"
            @click="searchDomain" :disabled='loading'
          >
            Search
            
          </button>
        </div>
      </div>
    </div>

    <b-table
      v-if="pagination.connections && pagination.connections.length >0"
      id="ConnectionsTable"
      :items="pagination.connections"
      :per-page="pagination.perPage"
      :fields="pagination.fields"
      :current-page="pagination.currentPage"
      :sort-by.sync="pagination.sortBy"
      :sort-desc.sync="pagination.sortDesc"
      small
      sort-icon-left
      responsive="sm"
    ></b-table>
    <b-pagination
      v-if="pagination.connections && pagination.connections.length >0"
      v-model="pagination.currentPage"
      :total-rows="rows"
      :per-page="pagination.perPage"
      aria-controls="ConnectionsTable"
    ></b-pagination>

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
      pagination:{
        currentPage: 1,
        perPage: 5,
        sortBy: 'Visited',
        fields: [
          { key: 'address', sortable: true },
          { key: 'isDown', sortable: true },
          { key: 'logo', sortable: true },
          { key: 'title', sortable: true },
          { key: 'sslGrade', sortable: true },
          { key: 'visited', sortable: true }
        ],
        sortDesc: false,
        connections:[]
      },
      currentConnection: null,
      currentIndex: -1,
      domain: "",
      loading: false
    };
  },
  computed: {
    rows() {
      return this.pagination.connections.length
    }
  },
  methods: {
    retrieveConnections() {
      this.pagination.connections = []
      this.loading = true;
      bus.$emit('loading', this.loading);

      DomainService.getAll()
        .then(response => {
          console.log(response);
          const items = response.data.content.items;
          if(items && items.length > 0){
            items.map(element => {
              const connection = {address: element.domain.address, isDown: element.domain.is_down, 
                                  logo: element.domain.logo, sslGrade: element.domain.ssl_grade, title: element.domain.title,
                                  visited: moment(String(element.last_update )).format('MM/DD/YYYY hh:mm:ss')}
              this.pagination.connections.push(connection)

            });
          }
          console.log(this.pagination.connections)
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
        this.pagination.connections = []
        this.loading = true
        bus.$emit('loading', this.loading);

        DomainService.findByConnection(this.domain.toUpperCase())
        .then(response => {
          console.log(response);

          this.loading = false
          bus.$emit('loading', this.loading);

          const items = response.data.content.items;
          if(!items || (items && items.length === 0 )){
            ToastService.displayErrorMessage(this.$bvToast, "Message", "Domain Was Not Found");
          }
          else if(items && items.length > 0){
            items.map(element => {
              const connection = {address: element.domain.address, isDown: element.domain.is_down, 
                                  logo: element.domain.logo, sslGrade: element.domain.ssl_grade, title: element.domain.title,
                                  visited: moment(String(element.last_update )).format('MM/DD/YYYY hh:mm:ss')}
              this.pagination.connections.push(connection)

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
  .pagination{
    justify-content: center;
  }
</style>