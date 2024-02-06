<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Designation</th>
          <th scope="col">Contact_to</th>
        </tr>
      </thead>

      <tbody v-for="contact in contacts" :key="contact.id">
        <tr class="table-secudary">
          <th scope="row">{{ contact.id }}</th>
          <th scope="row">{{ contact.name }}</th>
          <th scope="row">{{ contact.email }}</th>
          <th scope="row">{{ contact.designation }}</th>
          <th scope="row">{{ contact.contact_no }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ContactList",
  data() {
    return {
      contacts: Array,
    };
  },
  created() {
    this.getContacts();
  },
  methods: {
    async getContacts() {
      let url = "http://127.0.0.1:7500/api/contacts";
      await axios
        .get(url)
        .then((Response) => {
          this.contacts = Response.data;
          console.log(this.contacts);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.log("contact list component mounted");
  },
};
</script>

<style>
.title {
  color: aliceblue;
}
/* tbody{
  background: red;
} */

/* .container{
  color:blue ;
} */
</style>
