<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="host">Host</label>
        <input
          type="text"
          class="form-control"
          id="address"
          required
          v-model="domain.address"
          name="address"
        />
      </div>

      <button @click="saveDomain" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newDomain">Add</button>
    </div>
  </div>
</template>

<script>
import DomainService from "../services/DomainService";

export default {
  name: "add-domain",
  data() {
    return {
      domain: {
        address:""
      },
      submitted: false
    };
  },
  methods: {
    saveDomain() {
      var data = {
        address: this.domain.address,
      };

      DomainService.getDomain(data.address)
        .then(response => {
          this.domain.address= response.address;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newDomain() {
      this.submitted = false;
      this.domain = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>