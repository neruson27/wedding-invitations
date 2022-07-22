/* eslint-disable jsx-a11y/iframe-has-title */
import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import backendInvitations from '../clients/backendInvitations';
import '../App.css';

function GoogleMap({id, confirm}) {
  const oneWayJwt = process.env.REACT_APP_JWT;
  const navigate = useNavigate()

  const fetchData = useCallback(async () => {
    const response = await backendInvitations('put', `/guest/${id}`, {accepted: true}, oneWayJwt)

    if (response.data._id) {
      navigate(0)
    }
  }, [navigate, id, oneWayJwt])

  return (
    <div className="p-2 bg-purple-800 grid justify-center">
      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe className="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=floristeria la chinita&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
        </div>
      </div>
      <p className="text-white text-center">
        Av. La limpia diagonal a tostadas el reloj, salon Mi Chinita encima de la floristeria.
      </p>
      {!confirm ? <button className="md:w-[10vw] m-1 justify-self-center bg-slate-100 hover:bg-slate-200 border-2 border-purple-300 rounded-xl text-purple-600" onClick={fetchData}>Confirmar asistencia</button>:<></>}
    </div>
  )
}

export default GoogleMap;