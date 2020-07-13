<template>
  <div class="col-sm-12 col-md-12">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search by Domain"
        v-model="domain" @keyup.enter="saveDomain"/>
      <div class="input-group-append">
        <button class="btn btn-outline-success" type="button"
          @click="saveDomain" :disabled='loading'
        >
          Search
          
        </button>
      </div>
    </div>
    <b-modal id="domainInformation" ref="domainInformation" title="BootstrapVue">
      <p class="my-4">Here is the domain information</p>
    </b-modal>
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
      domain: "",
      loading:false
    };
  },
  methods: {


    saveDomain() {
      if(this.domain && this.domain.length > 0){
        this.loading = true;
        bus.$emit('loading', this.loading);

        DomainService.getDomain(this.domain)
          .then(response => {
            console.log(response.data);

            this.loading = false;
            this.domain = ""
            bus.$emit('loading', this.loading);

            // Add values to modal
            if(response.data.valid){
              this.$refs['domainInformation'].show()
            }else{
              ToastService.displayErrorMessage(this.$bvToast, "Message", "Invalid Domain");
            }

          })
          .catch(e => {  
            console.log(e);
            this.loading = false;
            bus.$emit('loading', this.loading);
            ToastService.displayErrorMessage(this.$bvToast, "Message", "Error Browsing Domain");
          });
      }
    }
  }
};
</script>

<style>
.submit-form {
  height: 100%;
  width: 100%;
  margin: auto;
}
</style>