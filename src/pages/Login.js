import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useLocalStorage from '../utils/useLocalStorage';
import weddingLogo from '../assets/weddingLogo.svg';
import backendInvitations from '../clients/backendInvitations';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [jwt, setJwt] = useLocalStorage('jwt', '')

  const fetchData = useCallback(async () => {
    if (!password) {
      setShowMessage(true);
    }

    if (user && password) {
      const response = await backendInvitations('post', `/admin/login`, {user, password})
      setJwt(response.data.token)
    }
  }, [user, password, setJwt])

  useEffect(() => {
    if (jwt) {
      navigate("/admin", { replace: true })
    }
  }, [jwt, navigate])

  return ( 
    <div className="h-[100vh] bg-purple-400 flex flex-row justify-center items-center">
      <div className="h-[80vh] md:h-[70vh] w-[70vw] bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 text-center items-center">
        <div className='flex justify-center md:border-r-2 md:border-gray-300'>
          <img className="w-40 md:w-80 object-cover" src={weddingLogo} alt="Wedding logo"/>
        </div>
        <div className='h-[50vh] grid grid-rows-4 auto-rows-min md:auto-rows-max justify-center content-between'>
          <p className='text-md font-bold'>Login</p>
          <div className="mb-6 text-start">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(ev) => {
                setUser(ev.target.value);
              }}
            />
          </div>
          <div className="mb-6 text-start">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
            />
            {showMessage ? <p className="text-red-500 text-xs italic">Please choose a password.</p> : <></>}
          </div>
          <div className='self-end'>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={fetchData}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;