import { createRouter, createWebHistory } from "vue-router";
import ContactList from "@/components/ContactList.vue";
import AddContact from "@/components/AddContact.vue";
import EditContact from "@/components/EditContact.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "ContactList",
      component: ContactList,
    },
    {
      path: "/add_contacts",
      name: "AddContact",
      component: AddContact,
    },
    {
      path: "/contact/edit/:id?",
      name: "EditContact",
      component:EditContact,
    },
  ],
});

export default router;
