import './modal.css';
import React from 'react';
import Utenti from '../utenti/utenti';

function Modal({ chose, user, onClose, onDelete }) {

  const handleDelete = () => {
    onDelete(user.id);
    onClose();
  };
  

  return (
    <div>
      {/* MODIFY MODAL */}
      {chose===1 && 
      <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">MODIFICA UTENTE</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-control" placeholder='email' defaultValue={user.email}></input>
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" id="username" class="form-control" placeholder='username' defaultValue={user.username}></input>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" class="form-control" placeholder='password'></input>
              </div>
              <div class="mb-3">
                <label for="ruolo" class="form-label">Ruolo</label>
                <input type="text" id="ruolo" class="form-control" placeholder='ruolo' defaultValue={user.ruolo}></input>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={onClose} type="button" className="btn btn-danger">Annulla</button>
              <button type="submit" class="btn btn-primary">Salva</button>
            </div>
          </div>
        </div>
      </div>}
      {/* ADD MODAL */}
      {chose===2 &&
      <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">AGGIUNGI UTENTE</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
            <form>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" placeholder='username'></input>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" placeholder='example@mail.com' ></input>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" placeholder='password' ></input>
              </div>
              <div class="mb-3">
                <label for="ruolo" class="form-label">Ruolo</label>
                <input type="text" class="form-control" id="ruolo" placeholder='ruolo'></input>
              </div>
            </form>
            </div>
            <div className="modal-footer">
              <button onClick={onClose} type="button" className="btn btn-danger">Annulla</button>
              <button type="submit" class="btn btn-primary">Salva</button>
            </div>
          </div>
        </div>
      </div>}
      {/* DELETE MODAL */}
      {chose===3 &&
      <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">ELIMINA UTENTE</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p>Sei sicuro di voler eliminare {user.username}?</p>
            </div>
            <div className="modal-footer">
              <button onClick={onClose} type="button" className="btn btn-danger">NO</button>
              <button onClick={() => handleDelete()}type="submit" class="btn btn-primary">SI</button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default Modal;
