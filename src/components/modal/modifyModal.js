import './modal.css';
import React, { useState, useEffect } from 'react';
import { getUtenti } from '../../service/utentiService';

function ModifyModal({ user, onClose, onModify }) {
  const [email, setEmail] = useState(user.email || '');
  const [username, setUsername] = useState(user.username || '');
  const [password, setPassword] = useState('');
  const [ruolo, setRuolo] = useState(user.roleName || '');
  const [errors, setErrors] = useState({});
  const [utenti, setUtenti] = useState([]);

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

  // ERRORI
  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email non valida';
    }

    if (!username) {
      newErrors.username = 'Lo username è obbligatorio';
    }

    if (password && password.length < 6) {
      newErrors.password = 'La password deve essere lunga almeno 6 caratteri';
    }

    if (utenti.find(u => u.username === username && u.id !== user.id)) {
      newErrors.username = 'Username già esistente';
    }

    if (utenti.find(u => u.email === email && u.id !== user.id)) {
      newErrors.email = 'Email già esistente';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SALVA
  const handleSubmit = () => {
    if (!validateForm()) return;
  
    const updatedFields = {};
  
    if (username !== user.username) updatedFields.username = username;
    if (email !== user.email) updatedFields.email = email;
    if (password !== '') updatedFields.password = password;
  
    if (Object.keys(updatedFields).length > 0) {
      onModify(user.id, updatedFields);
    }
  
    onClose();
  };
  

  // APERTURA MODAL
  useEffect(() => {
    setEmail(user.email || '');
    setUsername(user.username || '');
    setRuolo(user.Roles?.map(ruolo => ruolo.name).join(', ') || '');
    setPassword('');
  }, [user]);

  //CORPO MODAL
  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">MODIFICA UTENTE</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {/* USERNAME */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>
            {/* EMAIL */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            {/* PASSWORD */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            {/* RUOLO */}
            <div className="mb-3">
              <label htmlFor="ruolo" className="form-label">Ruolo</label>
              <input
                type="text"
                id="ruolo"
                className="form-control"
                value={ruolo}
                disabled
              />
            </div>

            {/* ERRORE GENERALE */}
            {errors.general && <div className="alert alert-danger">{errors.general}</div>}
          </div>

          <div className="modal-footer">
            <button onClick={onClose} type="button" className="btn btn-danger">Annulla</button>
            <button onClick={handleSubmit} type="button" className="btn btn-primary">Salva</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifyModal;
