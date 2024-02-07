import axios from "axios";

let urlApi = 'http://127.0.0.1:7500/api';

const getContacts = async (page = null) => {
  try {
    const response = await axios.get(`${urlApi}/contacts${page ? '?page='+page : ''}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    throw error;
  }
};

const updateContact = async (data, id) => {
  try {
    const response = await axios.post(`${urlApi}/update_contact/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    throw error;
  }
};


export default {
  getContacts,
  updateContact
};
