import './modal.css';
import React from 'react';

function deleteModal({ user, onClose, onDelete }) {

  const handleDelete = async () => {
    await onDelete(user.id);
    onClose();
  };
  
  return(
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
              <button onClick={handleDelete} type="submit" className="btn btn-primary">SI</button>
            </div>
          </div>
        </div>
      </div>
  )
}
export default deleteModal;