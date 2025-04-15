import './utenti.css';
import { useState, useEffect } from 'react';
import Modifymodal from '../modal/modifyModal';
import Addmodal from '../modal/addModal';
import Deletemodal from '../modal/deleteModal';
import { getUtenti, createUtente, deleteUtente, updateUtente } from '../../service/utentiService';
import LoadingOverlay from '../loadingOverlay/loadingOverlay.js';
import '../loadingOverlay/loadingOverlay.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Utenti() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [chose, changeChose] = useState(Number)
  const [utenti, setUtenti] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', dataCreazione:'', dataUltimaModifica:'',ruolo:''});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const openModifyModal = (id) => {
    const user = utenti.find(u => u.id === id);
    setSelectedUser(user);
    changeChose(1);
    setIsOpen(true);
  };

  const openAddModal = (id) => {
    setIsOpen(true);
    changeChose(2);
  };

  const openDeleteModal = (id) => {
    const user = utenti.find(u => u.id === id);
    setSelectedUser(user);
    changeChose(3);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleRowClick = (username) => {
    setSelectedRow(username === selectedRow ? null : username);
  };

  //READ ALL
  useEffect(() => {
    const fetchUtenti = async () => {
      setLoading(true);
      try {
        const data = await getUtenti();
        setUtenti(data.users);
      } catch (error) {
        console.error('Errore durante il caricamento degli utenti:', error);
        setError('Errore durante il caricamento degli utenti');
        toast.error('Errore durante il caricamento degli utenti');
      } finally {
        setLoading(false);
      }
    };
    fetchUtenti();
  }, []);

  //CREATE
  const handleAddUser = async (userData) => {
    setLoading(true);
    try {
      const res = await createUtente(userData);
      const data = await getUtenti();
      setUtenti(data.users);
      toast.success(res.message || 'Utente aggiunto con successo!');
    } catch (error) {
      console.error('Errore durante l\'aggiunta di un nuovo utente:', error);
      setError(error.message || 'Errore durante l\'aggiunta dell\'utente');
      toast.error(error.message || 'Errore durante l\'aggiunta dell\'utente');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  //UPDATE
  const handleUpdateUser = async (id, updatedFields) => {
    setLoading(true);
    try {
      await updateUtente(id, updatedFields); // una sola chiamata ora
      setUtenti(prev =>
        prev.map(u => u.id === id ? { ...u, ...updatedFields } : u)
      );
      toast.success('Aggiornamento eseguito con successo');
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dell\'utente:', error);
      setError(error.message || 'Errore durante l\'aggiornamento');
      toast.error(error.message || 'Errore durante l\'aggiornamento');
    } finally {
      setLoading(false);
    }
  };
  

  // DELETE
  const handleDeleteUser = async (id) => {
    setLoading(true);
    try {
      const res = await deleteUtente(id);
      setUtenti(prev => prev.filter(u => u.id !== id));
      toast.success(res.data.message || 'Utente eliminato con successo!');
    } catch (error) {
      console.error('Errore durante l\'eliminazione dell\'utente:', error);
      setError(error.message || 'Errore durante l\'eliminazione');
      toast.error(error.message || 'Errore durante l\'eliminazione');
    } finally {
      setLoading(false);
    }
  };
  
  //BODY
  return (
    <div>
      <h1 className='mt-5'>UTENTI REGISTRATI</h1>
      {/* PULSANTE NUOVO UTENTE */}
      <div className='sinistra'>
        <button 
          onClick={() => { openAddModal(newUser); }} 
          type="button" 
          className="btn btn-primary"
          style={{width:'200px'}}>Nuovo utente</button>
      </div>
      {/* LEGENDE */}
      <table className="table table-bordered table-secondary">
        <thead className="table table-bordered table-danger">
          <tr>
            <th style={{width:'20%'}} scope="col">Username</th>
            <th style={{width:'20%'}} scope="col">Email</th>
            <th style={{width:'10%'}} scope="col">Data creazione</th>
            <th style={{width:'10%'}} scope="col">Data ultima modifica</th>
            <th style={{width:'15%'}} scope="col">Ruolo</th>
            <th style={{width:'15%'}} scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {/* DATI */}
          {utenti.map((utente) => (
            <tr key={utente.username} onClick={() => handleRowClick(utente.username)} style={{ cursor: 'pointer' }}>
              <td>{utente.username}</td>
              <td>{utente.email}</td>
              <td>{utente.createdDate ? new Date(utente.createdDate).toLocaleDateString('it-IT') : 'N/A'}</td>
              <td>{utente.updatedDate ? new Date(utente.updatedDate).toLocaleDateString('it-IT') : 'N/A'}</td>
              <td>
                {utente.Roles?.map(ruolo => ruolo.name).join(', ')}
              </td>
              <td>
                {selectedRow === utente.username && (
                  <div style={{display:'block'}}>
                    <button onClick={() => { openModifyModal(utente.id); }} className="btn btn-primary mr-2">MODIFICA</button>
                    <button onClick={() => { openDeleteModal(utente.id); }} className="btn btn-danger">ELIMINA</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* MODAL */}
      {(isOpen && chose === 1) && (<Modifymodal chose={chose} user={selectedUser} onClose={closeModal} onModify={handleUpdateUser}/>)}
      {(isOpen && chose === 2) && (<Addmodal chose={chose} user={selectedUser} onClose={closeModal} onAdd={handleAddUser}/>)}
      {(isOpen && chose === 3) && (<Deletemodal chose={chose} user={selectedUser} onClose={closeModal} onDelete={handleDeleteUser}/>)}
      {/* LOADING */}
      <LoadingOverlay loading={loading} />
      {/* TOAST */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Utenti;
