import React, { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from "../App";
import { Link, useNavigate } from "react-router-dom";

const Notification = () => {
    
  const {car, user} = useContext(userContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
    <h1 className="m-5 mt-5 mb-5 flex items-center justify-center"><strong>Araclarim:</strong></h1>
    {
      user.message === "No Token" ? <div className="flex items-center justify-center">
      <span className='text-gray-700 font-semibold mt-1'>Arac Bilgilerini Gormek Için:</span>
      <button
        className="ml-3 bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded-full shadow-md"
        onClick={() => navigate("/login")}
      >
        Giriş Yapınız
      </button>
      </div>
      :
      <div className="m-5 mt-5 mb-5">
      {car.filter((c) => c.email === user.email).map((c, i) => (
        <Link key={i} to={`/car/${c._id}`}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex item-center mt-5">
            <img className="w-48 h-48 object-cover object-center" src={`http://localhost:3000/Images/${c.file}`} alt={c.title} />
            <div className="flex flex-col justify-between h-10">
              <div className="ml-5">
                <h3 className="text-xl font-semibold">Arac Baslik: {c.title}</h3>
                <div>
                  <p className="mt-2 text-sm font-semibold">Plaka: {c.plate}</p>
                  <p className="mt-2 text-sm font-semibold">Arac Aciklamasi: {c.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
      </div>
    }   
    </div>

  )
}

export default Notification