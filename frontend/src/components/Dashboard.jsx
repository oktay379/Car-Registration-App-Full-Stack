import React, { useEffect, useState } from 'react';
import axios from "axios";


const Dashboard = () => {

  const [car, setCar] = useState(0);
  const [user, setUser] = useState(0);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:3000/auth/dashboard")
    .then(res => {
      if(res.data.status) {
        setCar(res.data.car)
        setUser(res.data.user)
      }
    })
    .catch(err => console.log(err))
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <p className="text-gray-700 mt-2">USER & CAR Counter</p>
        </div>
        <div className="text-center mt-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Toplam Kullanici: {user}</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Kayitli Arac: {car}</span>
        </div>
      </div>
    </div>

  )
}

export default Dashboard