import { useCallback, useState, useEffect } from 'react';

import backendInvitations from '../clients/backendInvitations';
import useLocalStorage from '../utils/useLocalStorage';
import classNames from '../utils/classNames';

function Guests() {
  const [jwt] = useLocalStorage('jwt', '');
  const [guests, setGuests] = useState([]);
  const [showSpan, setShowSpan] = useState(false);

  const fetchData = useCallback(async () => {
    const response = await backendInvitations('get', `/guest`, undefined, jwt)
    setGuests(response.data)
  }, [jwt])

  const deleteData = useCallback(async (id) => {
    const response = await backendInvitations('delete', `/guest/${id}`, undefined, jwt)
    if (response.status === 200) {
      fetchData()
        .catch(console.error)
    }
    // setGuests(response.data)
  }, [jwt, fetchData])

  const copyTextToClipboard = async (text) => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(text);
      setShowSpan(true)
      setTimeout(() => {
        setShowSpan(false)
      }, 1000);
    } else {
      document.execCommand('copy', true, text);
    }
  }

  useEffect(() => {
    fetchData()
      .catch(console.error)
  }, [fetchData]);

  return (
    <div className='h-[60vh] grid justify-center content-between overflow-y-auto'>
      <table className="table-auto h-[40vh] w-[60vw] bg-purple-300 rounded-lg text-white overflow-scroll">
        <thead className='bg-purple-400 rounded-t-xl'>
          <tr>
            <th>Invitado</th>
            <th>Mesa</th>
            <th>Personas</th>
            <th>Acepto</th>
            <th>Cuando</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="">
          {
            guests.length > 0 ? guests.map((guest) => (
              <tr className='text-center divide-x-2' key={guest._id}>
                <td>{guest.name}</td>
                <td>{guest.table}</td>
                <td>{guest.persons}</td>
                <td>
                  <span
                    className={classNames(
                      "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
                      guest.accepted ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}
                  >
                    {String(guest.accepted)}
                  </span>
                </td>
                <td>{guest.acceptedDate ? new Date(guest.acceptedDate).toLocaleDateString() : '-----'}</td>
                <td><div className='hover:cursor-pointer bg-white my-2 rounded-xl' onClick={() => deleteData(guest._id)}>🗑️</div></td>
                <td>
                  <div 
                    className='hover:cursor-pointer bg-white my-2 rounded-xl'
                    onClick={(e) => {
                      e.preventDefault()
                      copyTextToClipboard(`${process.env.REACT_APP_URL}/${guest._id}`)
                    }}
                  >🔗</div>
                </td>
              </tr>
            )) : 
            <tr className='text-center'>
              sin invitados
            </tr>
          }
        </tbody>
      </table>
      {
      showSpan ? 
        <div class="p-4 mb-4 w-[20vw] text-sm text-white bg-purple-200 rounded-lg animate-ping" role="alert">
          <span class="font-medium">Copiado!</span>
        </div> :
        null
      }
    </div>
  );
}

export default Guests;