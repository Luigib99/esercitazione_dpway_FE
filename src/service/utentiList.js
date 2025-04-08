// src/components/UtentiList.js
import React, { useState, useEffect } from 'react';
import { getUtenti, createUtente, deleteUtente } from '../services/utentiService';  // Importa il servizio

function UtentiList() {
  const [utenti, setUtenti] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '' });
  
  // Carica gli utenti al primo caricamento del componente
  useEffect(() => {
    const fetchUtenti = async () => {
      try {
        const data = await getUtenti();
        setUtenti(data);
      } catch (error) {
        console.error('Errore durante il caricamento degli utenti:', error);
      }
    };

    fetchUtenti();
  }, []); // Esegui solo al primo rendering del componente

  // Funzione per aggiungere un nuovo utente
  const handleAddUser = async () => {
    try {
      const createdUser = await createUtente(newUser);
      setUtenti([...utenti, createdUser]);  // Aggiungi il nuovo utente alla lista
      setNewUser({ username: '', email: '' });  // Resetta il form
    } catch (error) {
      console.error('Errore durante l\'aggiunta di un nuovo utente:', error);
    }
  };

  // Funzione per eliminare un utente
  const handleDeleteUser = async (id) => {
    try {
      await deleteUtente(id);
      setUtenti(utenti.filter((utente) => utente.id !== id));  // Rimuovi l'utente dalla lista
    } catch (error) {
      console.error('Errore durante l\'eliminazione dell\'utente:', error);
    }
  };

  return (
    <div>
      <h1>Lista degli utenti</h1>
      
      {/* Visualizza la lista degli utenti */}
      <ul>
        {utenti.map((utente) => (
          <li key={utente.id}>
            {utente.username} - {utente.email}
            <button onClick={() => handleDeleteUser(utente.id)} className="btn btn-danger ms-2">
              Elimina
            </button>
          </li>
        ))}
      </ul>

      {/* Form per aggiungere un nuovo utente */}
      <h3>Aggiungi un nuovo utente</h3>
      <input
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button onClick={handleAddUser} className="btn btn-primary ms-2">Aggiungi</button>
    </div>
  );
}

export default UtentiList;