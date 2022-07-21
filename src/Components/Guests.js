import { useCallback, useState, useEffect } from 'react';

import backendInvitations from '../clients/backendInvitations';
import useLocalStorage from '../utils/useLocalStorage';
import classNames from '../utils/classNames';

function Guests() {
  const [jwt] = useLocalStorage('jwt', '');
  const [guests, setGuests] = useState([]);

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
    } else {
      document.execCommand('copy', true, text);
    }
  }

  useEffect(() => {
    fetchData()
      .catch(console.error)
  }, [fetchData]);

  return (
    <div className='h-[50vh] grid grid-rows-4 auto-rows-min md:auto-rows-max justify-center content-between'>
      <table className="table-auto w-[60vw]">
        <thead>
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
        <tbody>
          {
            guests.map((guest) => (
              <tr className='text-center' key={guest._id}>
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
                <td><div className='hover:cursor-pointer' onClick={() => deleteData(guest._id)}>🗑️</div></td>
                <td>
                  <div 
                    className='hover:cursor-pointer'
                    onClick={(e) => {
                      e.preventDefault()
                      copyTextToClipboard(`${process.env.REACT_APP_URL}/${guest._id}`)
                    }}
                  >🔗</div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Guests;