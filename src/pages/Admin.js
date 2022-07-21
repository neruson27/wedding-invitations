import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import useLocalStorage from "../utils/useLocalStorage";
import AddGuest from "../Components/AddGuest";
import Guests from "../Components/Guests";

function Admin() {
  const navigate = useNavigate();
  const [jwt] = useLocalStorage("jwt", '');

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
      <div className="h-[80vh] md:h-[70vh] w-[70vw] bg-white rounded-lg shadow-lg grid justify-center">
      <Tabs className="w-[65vw] mt-2" value="guests">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, content }) => (
            <TabPanel key={value} value={value}>
              {content}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      </div>
    </div>
  );
}

export default Admin;