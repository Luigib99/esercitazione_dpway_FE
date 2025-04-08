import './utenti.css';
import { useState } from 'react';
import Modal from '../modal/modal';

function Utenti() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [chose, changeChose] = useState(Number)

  const user = [
    { username: 'luigib99', email: 'luigib99@gmail.com', dataCreazione: '25/02/2025', dataUltimaModifica:'25/02/2025', ruolo: 'User' },
    { username: 'gptocchi92', email: 'gianpaoloTocchi92@gmail.com', dataCreazione: '26/02/2025', dataUltimaModifica:'25/02/2025', ruolo: 'User' },
    { username: 'fedefanfoni', email: 'federicaFanfoni@gmail.com', dataCreazione: '28/02/2025', dataUltimaModifica:'25/02/2025', ruolo: 'User' },
    { username: 'andreaCesa', email: 'andreacesarini@gmail.com', dataCreazione: '01/03/2025', dataUltimaModifica:'03/03/2025', ruolo: 'User' },
  ];

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

  return (
    <div>
      <h1 className='mt-5'>UTENTI REGISTRATI</h1>
      <div className='sinistra'>
      <button 
      onClick={() => { openAddModal(user); }} 
      type="button" 
      className="btn btn-primary"
      style={{width:'200px'}}>Nuovo utente</button>
      </div>
      <table className="table table-bordered table-secondary">
        <thead className="table table-bordered table-danger">
          <tr>
            <th style={{width:'20%'}} scope="col">Username</th>
            <th cstyle={{width:'20%'}} scope="col">Email</th>
            <th style={{width:'10%'}} scope="col">Data creazione</th>
            <th style={{width:'10%'}} scope="col">Data ultima modifica</th>
            <th style={{width:'15%'}} scope="col">Ruolo</th>
            <th style={{width:'15%'}} scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user.username} onClick={() => handleRowClick(user.username)} style={{ cursor: 'pointer' }}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.dataCreazione}</td>
              <td>{user.dataUltimaModifica}</td>
              <td>{user.ruolo}</td>
              <td>
                {selectedRow === user.username && (
                  <div style={{display:'block'}}>
                    <button onClick={() => { openModifyModal(user); }} className="btn btn-primary mr-2">MODIFICA</button>
                    <button onClick={() => { openDeleteModal(user); }} className="btn btn-danger">ELIMINA</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && <Modal chose={chose} user={selectedData} onClose={closeModal} />}
    </div>
  );
}

export default Utenti;
