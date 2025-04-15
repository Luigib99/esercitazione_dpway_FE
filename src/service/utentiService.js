import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = 'http://localhost:3000/users';
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
var globalcontUpdate = 0;

//GET ALL
export const getUtenti = async () => {
  try {
    const response = await axiosInstance.get('/readAll');
    console.log('Risposta getUtenti:', response.data);
    return response.data;
  } catch (error) {
    console.error('Errore durante il recupero degli utenti:', error);
    throw error;
  }
};


//POST
export const createUtente = async (user) => {
  try {
    const response = await axiosInstance.post('/create', user);
    return response.data;
  } catch (error) {
    console.error('Errore durante la creazione dell\'utente:', error);
    throw error;
  }
};

//PUT
export const updateUtente = async (id, user) => {
  try {
    let success = true;

    if (user.username) {
      await axiosInstance.put(`/updateUsername/${id}`, { username: user.username }).catch(() => success = false);
    }

    if (user.email) {
      await axiosInstance.put(`/updateEmail/${id}`, { email: user.email }).catch(() => success = false);
    }

    if (user.password && user.password.trim() !== '') {
      await axiosInstance.post(`/updatePassword/${id}`, { password: user.password }).catch(() => success = false);
    }

    if (!success) {
      throw new Error("Alcuni aggiornamenti non sono riusciti.");
    }

    return { message: 'Aggiornamenti eseguiti con successo' };

  } catch (error) {
    throw error;
  }
};




// DELETE
export const deleteUtente = async (id) => {
  try {
    return await axiosInstance.delete(`/delete/${id}`);
  } catch (error) {
    console.error('Errore durante l\'eliminazione dell\'utente:', error);
    throw error;
  }
};
