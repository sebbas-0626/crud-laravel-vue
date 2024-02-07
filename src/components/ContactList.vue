<template>
  <div class="container">
    <table class="table table-hover table-spacing">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Designation</th>
          <th scope="col">Contact_to</th>
          <th scope="col">Actition</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="contact in contacts" :key="contact.id" class="table-secudary">
          <th scope="row">{{ contact.id }}</th>
          <th scope="row">{{ contact.name }}</th>
          <th scope="row">{{ contact.email }}</th>
          <th scope="row">{{ contact.designation }}</th>
          <th scope="row">{{ contact.contact_no }}</th>
          
          <th scope="row"><router-link :to ="{name: 'EditContact', params:{id: contact.id}}"
            class="btn btn-primary btn-sm">Edit</router-link>
          </th>
          <th scope="row">
            <button class="btn btn-danger btn-sm" @click.prevent="deleteContact(contact.id)">
              Delete
            </button>
          </th>
        </tr>
      </tbody>
    </table>
    <!-- paginacion -->
    <Pagination :currentPage="currentPage" :lastPage="lastPage" @change_page="changePage" />
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import servicio from "@/services/api";
import axios from "axios";

export default {
  components: {
    Pagination,
  },
  created() {
    this.getContacts();
  },
  data() {
    return {
      contacts: [],
      currentPage: {
        page: 1,
      },
      lastPage: 1,
    };
  },
  methods: {
    async getContacts(page = null) {
      const { contacts, message } = await servicio.getContacts(page);
      this.contacts = contacts.data;
      this.currentPage.page = contacts.current_page;
      this.lastPage = contacts.last_page;
    },
    changePage(page) {
      this.getContacts(page);
    },

    async deleteContact(id) {
      let url = `http://127.0.0.1:7500/api/delete_contact/${id}`;
      try {
        const response = await axios.delete(url);
        if (response.data.code === 200) {
          alert(response.data.message);
          this.getContacts(); // Actualiza la lista de contactos después de eliminar uno
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style>
.table-spacing {
  margin-top: 100px;
}
</style>
