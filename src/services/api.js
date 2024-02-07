import axios from "axios";

const getContacts = async (page = null) => {
  try {
    let url = "http://127.0.0.1:7500/api/contacts";
    if (page) {
      url = url + "?page=" + page;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    throw error;
  }
};


export default {
  getContacts,
};
