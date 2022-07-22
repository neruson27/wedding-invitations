import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useLocalStorage from "../utils/useLocalStorage";
import AddGuest from "../Components/AddGuest";
import Guests from "../Components/Guests";

function Admin() {
  const navigate = useNavigate();
  const [jwt] = useLocalStorage("jwt", '');
  const [ selectedTab, setSelectedTab ] = useState("guests");

  useEffect(() => {
    if (!jwt) {
      navigate('/admin/login', {replace: true})
    }
  }, [jwt, navigate])

  const data = [
    {
      label: "Invitados",
      value: "guests",
      content: <Guests />
    },
    {
      label: "Agregar invitados",
      value: "add-guest",
      content: <AddGuest token={jwt}/>
    }
  ]

  return ( 
    <div className="h-[100vh] bg-purple-400 flex flex-row justify-center items-center">
      <div className="h-[80vh] md:h-[70vh] w-[70vw] bg-white rounded-lg border-purple-200 border-2 shadow-lg flex justify-center">
        <div className="w-[65vw] mt-2" value="guests">
          <div className="bg-blue-50 rounded-lg py-1 flex justify-between mb-2">
            {data.map(({ label, value }) => (
              <div className={(value === selectedTab ? 'bg-purple-300 text-white border-2 border-purple-400' : 'text-blue-900' ) + ' rounded-xl hover:cursor-pointer text-center w-[50%] mx-2'} key={value} value={value} onClick={() => {setSelectedTab(value)}}>
                {label}
              </div>
            ))}
          </div>
          <div>
            {data.map(({ value, content }) => (
              <div key={value} value={value}>
                {value === selectedTab ? content : <></>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;