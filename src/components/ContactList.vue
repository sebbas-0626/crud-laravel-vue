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

          <th scope="row">
            <router-link :to="{ name: 'EditContact', params: { id: contact.id } }"
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
    // obtener contacto api
    async getContacts(page = null) {
      const { contacts, message } = await servicio.getContacts(page);
      this.contacts = contacts.data;
      this.currentPage.page = contacts.current_page;
      this.lastPage = contacts.last_page;
    },
    changePage(page) {
      this.getContacts(page);
    },
    // Delete contact api
    async deleteContact(id) {
      try {
        const response = await servicio.deleteContact(id);
        const message = response.message;
        alert(message);
        this.getContacts();
      } catch (error) {
        console.log(error);
        alert("Hubo un error al eliminar el contacto");
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
