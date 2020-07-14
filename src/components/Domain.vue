<template>
  <div class="col-sm-12 col-md-12">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search by Domain"
        v-model="hostname" @keyup.enter="saveDomain"/>
      <div class="input-group-append">
        <button class="btn btn-outline-success" type="button"
          @click="saveDomain" :disabled='loading'
        >
          Search
          
        </button>
      </div>
    </div>

    <div>
      <b-card v-if="domain.address" :title="domain.address" class="text-center" bg-variant="sucess">
        <b-card-text>
          <div v-if="domain.title"> <strong>Title: </strong> {{domain.title}} <br> </div>
          <div v-if="domain.logo"> <strong>Logo: </strong> {{domain.logo}} <br> </div>
          <div v-if="domain.previous_ssl_grade"> <strong>Previous SSL Grade: </strong> {{domain.previous_ssl_grade}} <br> </div>
          <div v-if="domain.ssl_grade"> <strong>SSL Grade: </strong> {{domain.ssl_grade}} <br> </div>
          <strong>Servers Changed: </strong> {{domain.servers_changed}} <br>
          <strong>Is Down: </strong> {{domain.is_down}}

        </b-card-text>
 
      </b-card>

      <br><br>
      <div class="mt-3">
        <b-card-group columns>
          <b-card bg-variant="info" text-variant="white" :header="server.address" class="text-center" v-for="(server, index) in domain.servers" :key="index">
            <b-card-text>
              <div v-if="server.ssl_grade"> <strong>SSL Grade: </strong> {{server.ssl_grade}} <br> </div>
              <div v-if="server.country"> <strong>Country: </strong> {{server.country}} <br> </div>
              <div v-if="server.owner"> <strong>Owner: </strong> {{server.owner}} <br> </div>
            </b-card-text>
          </b-card>
        </b-card-group>
      </div>

    </div>

    <!-- <b-modal id="domainInformation" ref="domainInformation" title="BootstrapVue">
      <p class="my-4">Here is the domain information</p>
    </b-modal> -->
  </div> 


</template>

<script>
import { bus } from '../main'
import DomainService from "../services/DomainService";
import ToastService from "../services/ToastService";


export default {
  name: "domain",
  data() {
    return {
      hostname: "",
      loading:false,
      domain: {}
    };
  },
  methods: {


    saveDomain() {
      if(this.hostname && this.hostname.length > 0){
        this.loading = true;
        bus.$emit('loading', this.loading);

        DomainService.getDomain(this.hostname)
          .then(response => {
            console.log(response.data);

            this.loading = false;
            this.hostname = ""
            bus.$emit('loading', this.loading);

            if(response.data.valid){
              // this.$refs['domainInformation'].show()
              this.domain = response.data.content;
              console.log(this.domain)
            }else{
              ToastService.displayErrorMessage(this.$bvToast, "Message", "Invalid Domain");
              this.domain = null;
            }
          })
          .catch(e => {  
            console.log(e);
            this.domain = null;
            this.loading = false;
            bus.$emit('loading', this.loading);
            ToastService.displayErrorMessage(this.$bvToast, "Message", "Error Browsing Domain");
          });
      }
    }
  }
};
</script>
