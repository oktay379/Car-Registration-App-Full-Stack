import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Create from "./components/Create";
import Car from "./components/Car";
import EditCar from "./components/EditCar";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import EditProfile from "./components/EditProfile";
import NotFound from "./components/NotFound";
import Chat from "./chat/Chat";
import Notification from "./components/Notification";

import { Toaster } from "react-hot-toast";



export const userContext = createContext();

const App = () => {

  const [user, setUser] = useState({});
  const [car,setCar] = useState([]);
  const [users, setUsers] = useState([]);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:3000/auth/verify")
    .then(user => {
      setUser(user.data)
      // console.log(user.data);
    })
    .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/sidebar")
    .then((users) => {
      setUsers(users.data)
      // console.log(users.data)
    })
    .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/car/getCars")
    .then((car) => {
      setCar(car.data)
      // console.log(car.data)
    })
    .catch(err => console.log(err))
  }, []);


  
  return (
    <userContext.Provider value={{ user, car, users }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />}/>
          <Route path={"/register"} element={<Register />}/>
          <Route path={"/login"} element={<Login />}/>
          <Route path={"/create"} element={<Create />}/>
          <Route path={"/car/:id"} element={<Car />}/>
          <Route path={"/editCar/:id"} element={<EditCar />}/>
          <Route path={"/profile/:id"} element={<Profile />}/>
          <Route path={"/dashboard"} element={<Dashboard />}/>
          <Route path={"/editProfile/:id"} element={<EditProfile />}/>
          <Route path={"/chat"} element={<Chat />}/>
          <Route path="/notifications" element={<Notification />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
			  <Toaster />
      </BrowserRouter>
    </userContext.Provider>
  )
}

export default App