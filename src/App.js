import { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import HTMLFlipBook from 'react-pageflip';
import Popup from 'reactjs-popup';

import './App.css';
import 'reactjs-popup/dist/index.css';
import weddingLogo from './assets/weddingLogo.svg';
import weddingLogoW from './assets/weddingLogoW.svg';
import GoogleMap from './Components/GoogleMap';
import backendInvitations from './clients/backendInvitations';

function App() {
  const { id } = useParams();
  const [invitate, setInvitate] = useState({});

  const fetchData = useCallback(async () => {
    const response = await backendInvitations('get', `/guest/get/${id}`)
    setInvitate(response.data)
  }, [id])

  useEffect(() => {
    fetchData()
      .catch(console.error)
  }, [fetchData]);

  return (
    <div className='w-full h-[100vh] bg-purple-400 grid justify-items-center content-center'>
      <HTMLFlipBook width={400} height={660}>
        <div className="bg-purple-800">
          <div className='h-full grid justify-items-center content-center'>
            <img className="h-60 w-70 object-cover text-white" src={weddingLogoW} alt="Wedding logo" />
          </div>
        </div>
        <div className="py-3 px-4 bg-purple-800">
          {id ? (
            <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
              <div className="border-4 border-purple-300">
                <div className="shrink-0 mt-1 grid justify-items-center">
                  <img className="h-50 w-40 object-cover" src={weddingLogo} alt="Wedding logo" />
                </div>
                <div className="text-center grid justify-items-center">
                  <p className="text-sm text-slate-600 font-bold">
                    Cordialmente estas invitado a la boda de:
                  </p>
                  <p className="text-[1.8em] font-bold font-['PinyonScript']">
                    Luisana y Nelson
                  </p>
                  <div className="border-y-2 w-[300px] border-slate-600">
                    <p className='italic'>
                      29 DE JULIO DEL 2022
                    </p>
                  </div>
                  <p className='italic'>
                    2:00 PM
                  </p>
                </div>
                <div className="p-3">
                  <div className="capitalize tracking-wide text-sm text-purple-600 font-bold">Saludos {invitate.name}</div>
                  <p className="block mt-1 text-center text-md leading-tight font-medium text-slate-400 hover:underline">"El amor nunca se da por vencido, jamas pierde la fe, siempre tiene esperanzas y se mantiene firme en toda circunstancia".</p>
                  <p className="mt-2 mb-2 text-center text-slate-600 font-bold">Queremos compartir contigo este dia tan importante, nuestro matrimonio civil, celebra junto a nosotros, Esperamos tu confirmacion.</p>
                  <div className="grid bg-slate-50 rounded-md text-center grid-cols-1">
                    <div className='text-slate-400'>Lugar</div>
                    <div className='p-1'>
                      <Popup trigger={<button className='not-print rounded-full bg-purple-600 hover:bg-purple-400 p-2 text-slate-200'>Presioname</button>} position="top">
                        <GoogleMap id={id} confirm={invitate.accepted}/>
                      </Popup>
                      <p className="printable text-center">
                        Av. La limpia diagonal a tostadas el reloj, salon Mi Chinita encima de la floristeria.
                      </p>
                    </div>
                  </div>
                  <div className='text-center'>
                    <p className='mt-1 font-medium text-slate-400'>Tu mesa es la #{invitate.table}</p>
                    <p className='font-medium text-slate-400'>Pase valido para {invitate.persons} personas</p>
                  </div>
                </div>
              </div>
            </div>
          ) :
            (<>
              <div className='bg-white grid justify-items-center content-center py-4 h-full w-50'>
                <img className="h-60 w-70 object-cover" src={weddingLogo} alt="Wedding logo" />
              </div>
            </>)}
        </div>
      </HTMLFlipBook>
    </div>
  );
}

export default App;
