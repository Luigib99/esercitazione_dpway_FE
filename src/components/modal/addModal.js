import './modal.css';
import React, { useState, useEffect } from 'react';
import { getUtenti  } from '../../service/utentiService';

function Addmodal({ onClose, onAdd }) {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    ruolo: ''
  });
  
  const [errors, setErrors] = useState({});
  const [utenti, setUtenti] = useState([]);


  //INIZIALIZZA GLI UTENTI
  useEffect(() => {
    const fetchUtenti = async () => {
      try {
        const data = await getUtenti();
        console.log('Utenti ricevuti:', data);
        setUtenti(data.users);
      } catch (error) {
        console.error('Errore durante il caricamento degli utenti:', error);
      }
    };
    fetchUtenti();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [id]: value
    }));
  };

  //SALVA
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    //ERRORI
    try {
      const newErrors = {};
      
      if (!newUser.username) {
        newErrors.username = 'Username è richiesto';
      }
      if (!newUser.email) {
        newErrors.email = 'Email è richiesta';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
        newErrors.email = 'Email non valida';
      }
      if (!newUser.password) {
        newErrors.password = 'Password è richiesta';
      } else if (newUser.password.length < 6) {
        newErrors.password = 'Password troppo corta';
      }

      if (utenti.find(u => u.username === newUser.username)) {
        newErrors.username = 'Username già esistente';
      }
      
      if (utenti.find(u => u.email === newUser.email)) {
        newErrors.email = 'Email già esistente';
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      await onAdd(newUser);
      onClose();
    } catch (err) {
      setErrors({ general: err.message });
    }
  };

  //CORPO DELLA MODALE
  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">AGGIUNGI UTENTE</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* USERNAME */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  id="username"
                  placeholder="username"
                  onChange={handleChange}
                  value={newUser.username}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
              {/* EMAIL */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  placeholder="example@mail.com"
                  onChange={handleChange}
                  value={newUser.email}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              {/* PASSWORD */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  placeholder="password"
                  onChange={handleChange}
                  value={newUser.password}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              {/* RUOLO */}
              <div className="mb-3">
                <label htmlFor="ruolo" className="form-label">Ruolo</label>
                <input
                  type="text"
                  className="form-control"
                  id="ruolo"
                  placeholder="ruolo"
                  onChange={handleChange}
                  value={newUser.ruolo}
                />
              </div>
              {errors.general && <div className="alert alert-danger">{errors.general}</div>}
            </div>
            <div className="modal-footer">
              {/* ANNULLA */}
              <button onClick={onClose} type="button" className="btn btn-danger">Annulla</button>
              {/* SALVA */}
              <button type="submit" className="btn btn-primary">Salva</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addmodal;
