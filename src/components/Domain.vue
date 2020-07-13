<template>
  <div class="submit-form">
    <div>
      <div class="form-group">
        <label for="host">Domain</label>
        <input
          type="text"
          class="form-control"
          required
          placeholder="Search Domain"
          v-model="domain"
        />
      </div>

      <button @click="saveDomain" v-b-modal.modal-1 class="btn btn-success" :disabled='loading'>Browse</button>
    </div>

    <b-modal id="domainInformation" ref="domainInformation" title="BootstrapVue">
      <p class="my-4">Here is the domain information</p>
    </b-modal>

  </div>
</template>

<script>
import { bus } from '../main'
import DomainService from "../services/DomainService";


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
              this.$bvToast.toast('Invalid Domain', {
                title: "Message",
                toaster: "b-toaster-top-center",
                variant: "danger",
                solid: true,
              })
            }

          })
          .catch(e => {  
            console.log(e);
            this.loading = false;
            bus.$emit('loading', this.loading);

            this.$bvToast.toast('Error Browsing Domain', {
              title: "Message",
              toaster: "b-toaster-top-center",
              variant: "danger",
              solid: true,
            })
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