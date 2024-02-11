import axios from "axios";

let urlApi = "http://127.0.0.1:7500/api";

const getContacts = async (page = null) => {
  try {
    const response = await axios.get(
      `${urlApi}/contacts${page ? "?page=" + page : ""}`
    );
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
    console.error("Error al actualizar contactos:", error);
    throw error;
  }
};

//deleteContact
const deleteContact = async (id) => {
  try {
    const response = await axios.delete(`${urlApi}/delete_contact/${id}`);
    console.log(response)
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al eliminar contacto js", error);
  }
};

//getcontacts del componen editcontact

async function getContactById(id) {
  try {
    const response = await axios.get(`${urlApi}/get_contact/${id}`);
    console.log(response);
    // Desestructuración de la respuesta para obtener directamente los datos
    const { data } = response;
    return data;
  } catch (error) {
    console.error("Error al obtener el contacto:", error);
  }
}

//saveContact api
async function enviarDatos(formData) {
  try {
    const response = await axios.post(`${urlApi}/save_contact`, formData);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}

export default {
  getContacts,
  updateContact,
  deleteContact,
  getContactById,
  enviarDatos,
};
