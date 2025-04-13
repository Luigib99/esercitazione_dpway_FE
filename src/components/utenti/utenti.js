import './utenti.css';
import { useState, useEffect } from 'react';
import Modal from '../modal/modal';
import { getUtenti, createUtente, deleteUtente } from '../../service/utentiService';


function Utenti() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [chose, changeChose] = useState(Number)
  const [utenti, setUtenti] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', dataCreazione:'', dataUltimaModifica:'',ruolo:''});

  const openModifyModal = (user) => {
    setSelectedData(user);
    setIsOpen(true);
    changeChose(1);
  };

  const openAddModal = (user) => {
    setSelectedData(user);
    setIsOpen(true);
    changeChose(2);
  };

  const openDeleteModal = (user) => {
    setSelectedData(user);
    setIsOpen(true);
    changeChose(3);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedData(null);
  };

  const handleRowClick = (username) => {
    setSelectedRow(username === selectedRow ? null : username);
  };
  
  //READ ALL
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
  

  //CREATE
  const handleAddUser = async () => {
    try {
      const createdUser = await createUtente(newUser);
      setUtenti([...utenti, createdUser]);
      setNewUser({ username: '', email: '', password:'', ruolo:'' });
    } catch (error) {
      console.error('Errore durante l\'aggiunta di un nuovo utente:', error);
    }
  };

  //DELETE
  const handleDeleteUser = async (id) => {
    try {
      await deleteUtente(id);
      setUtenti(utenti.filter((utente) => utente.id !== id));
    } catch (error) {
      console.error('Errore durante l\'eliminazione dell\'utente:', error);
    }
  };


  return (
    <div>
      <h1 className='mt-5'>UTENTI REGISTRATI</h1>
      <div className='sinistra'>
      <button 
      onClick={() => { openAddModal(newUser); }} 
      type="button" 
      className="btn btn-primary"
      style={{width:'200px'}}>Nuovo utente</button>
      </div>
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
                    <button onClick={() => { openModifyModal(utente); }} className="btn btn-primary mr-2">MODIFICA</button>
                    <button onClick={() => { openDeleteModal(utente); }} className="btn btn-danger">ELIMINA</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal chose={chose} utente={selectedData} onClose={closeModal} onDelete={handleDeleteUser} />
    </div>
  );
}

export default Utenti;