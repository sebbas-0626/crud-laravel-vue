<template>
  <div class="container-fluid d-flex justify-content-center align-items-center vh-100">
    <div class="row">
      <div class="col-md-100 mx-auto">
        <div class="card mt-4 p-4">
          <div class="alert alert-danger" v-if="errors.length">
            <ul class="mb-0">
              <li v-for="(error, index) in errors" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>
          <form @submit.prevent="updateContact" novalidate>
            <div class="form-group">
              <label class="form-label mt-4">Name</label>
              <input type="text" class="form-control" v-model="contact.name" placeholder="Enter name" />
            </div>
            <div class="form-group">
              <label class="form-label mt-4">Email</label>
              <input type="email" class="form-control" v-model="contact.email" placeholder="Enter email" />
            </div>
            <div class="form-group">
              <label class="form-label mt-4">Enter Designation</label>
              <input type="text" class="form-control" v-model="contact.designation" placeholder="Enter designation" />
            </div>
            <div class="form-group">
              <label class="form-label mt-4">Enter contact_no</label>
              <input type="text" class="form-control" v-model="contact.contact_no" placeholder="Enter phone" />
            </div>
            <button class="btn btn-primary mt-4">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/services/api";
export default {
  data() {
    return {
      contact: {
        name: "",
        email: "",
        designation: "",
        contact_no: "",
      },
      errors: [],
    };
  },
  created() {
    this.getContactById();
  },
  methods: {
    async getContactById() {
      try {
        const contactId = this.$route.params.id;
        const contact = await service.getContactById(contactId);
        this.contact = contact;
      } catch (error) {
        console.error("Error al obtener el contacto:", error);
      }
    },

    updateContact() {
      this.errors = [];

      const requiredProperties = ['name', 'email', 'designation', 'contact_no'];

      requiredProperties.forEach(property => {
        if (!this.contact[property]) {
          this.errors.push(`${property.replace('_', ' ')} is required`);
        }
      });

      if (!this.errors.length) {
        let formData = new FormData();
        formData.append("name", this.contact.name);
        formData.append("email", this.contact.email);
        formData.append("designation", this.contact.designation);
        formData.append("contact_no", this.contact.contact_no);

        // Llama a la función actualizarDatos para realizar la solicitud
        this.actualizarDatos(formData);
      }
    },


    // updateContact() {
    //   this.errors = [];
    //   if (!this.contact.name) {
    //     this.errors.push("Name is required");
    //   }
    //   if (!this.contact.email) {
    //     this.errors.push("Email is required");
    //   }
    //   if (!this.contact.designation) {
    //     this.errors.push("Designation is required");
    //   }
    //   if (!this.contact.contact_no) {
    //     this.errors.push("Contact number is required");
    //   }

    //   if (!this.errors.length) {
    //     let formData = new FormData();
    //     formData.append("name", this.contact.name);
    //     formData.append("email", this.contact.email);
    //     formData.append("designation", this.contact.designation);
    //     formData.append("contact_no", this.contact.contact_no);

    //     // Llama a la función actualizarDatos para realizar la solicitud
    //     this.actualizarDatos(formData);
    //   }
    // },
    async actualizarDatos(formData) {
      try {
        const response = await service.updateContact(formData, this.$route.params.id);
        alert(response.message);
      } catch (error) {
        console.error("Error al actualizar el contacto:", error);
        alert("Hubo un error al actualizar el contacto");
      }
    },

  },
};
</script>
