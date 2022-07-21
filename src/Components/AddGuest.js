import { useState, useEffect, useCallback } from 'react';
import backendInvitations from '../clients/backendInvitations';

function AddGuest(props) {
  const { token } = props;
  const [name, setName] = useState('');
  const [table, setTable] = useState(0);
  const [persons, setPersons] = useState(0);
  const [save, setSave] = useState(false);

  const fetchData = useCallback(async () => {
    if (name && table && persons) {
      const response = await backendInvitations('post', `/guest`, {name, table, persons}, token);
      console.log(response);
      if (response.data._id) {
        setSave(true);
      }
    }
  }, [name, table, persons, token]);

  useEffect(() => {
    if (save) {
      setName('');
      setTable(0);
      setPersons(0);
      setSave(false);
    }
  }, [save]);

  return (
    <div className='h-[50vh] grid grid-rows-4 auto-rows-min md:auto-rows-max justify-center content-between'>
      <p className='text-md font-bold justify-self-center'>Invitar</p>
      <div className="mb-4 text-start">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
          Nombre / Apellido
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Nombre / Apellido"
          onChange={(ev) => {
            setName(ev.target.value);
          }}
          value={name}
        />
      </div>
      <div className="mb-6 text-start">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
          Mesa
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="table"
          type="number"
          placeholder="0"
          onChange={(ev) => {
            setTable(Number(ev.target.value));
          }}
          min="0"
          value={table}
        />
      </div>
      <div className="mb-6 text-start">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
          Personas
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="persons"
          type="number"
          placeholder="0"
          onChange={(ev) => {
            setPersons(Number(ev.target.value));
          }}
          min="0"
          value={persons}
        />
      </div>
      <div className='self-end justify-self-center'>
        <button className="bg-purple-500 disabled:bg-purple-200 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={fetchData} disabled={!name || table <= 0 || persons <= 0}>
          Invitar
        </button>
      </div>
    </div>
  );
}

export default AddGuest;