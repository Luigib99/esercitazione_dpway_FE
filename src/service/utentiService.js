import axios from 'axios';

const apiUrl = 'http://api/utenti';
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

//GET ALL
export const getUtenti = async () => {
  try {
    const response = await axiosInstance.get('/getUtenti');
    return response.data;
  } catch (error) {
    console.error('Errore durante il recupero degli utenti:', error);
    throw error;
  }
};

//POST
export const createUtente = async (user) => {
  try {
    const response = await axiosInstance.post('/createUtente', user);
    return response.data;
  } catch (error) {
    console.error('Errore durante la creazione dell\'utente:', error);
    throw error;
  }
};

//PUT
export const updateUtente = async (id, user) => {
  try {
    const response = await axiosInstance.put(/updateUtente/`${id}`, user);
    return response.data;
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dell\'utente:', error);
    throw error;
  }
};

// DELETE
export const deleteUtente = async (id) => {
  try {
    await axiosInstance.delete(/deleteUtente/`${id}`);
  } catch (error) {
    console.error('Errore durante l\'eliminazione dell\'utente:', error);
    throw error;
  }
};