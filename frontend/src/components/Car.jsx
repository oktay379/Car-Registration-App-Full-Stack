import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../App';
import { PiWarningCircle } from "react-icons/pi";
import PostComment from './PostComment';

const Car = () => {
  const {user} = useContext(userContext);
  const [warn, setWarn] = useState(false);
    
  const [noti, setNoti] = useState([]);
  const [comments, setComments] = useState([]);

  const {id} = useParams();
  const [car, setCar] = useState({});
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:3000/car/getCar/" + id)
    .then(res => {
      setCar(res.data);
      console.log(res.data)
    })
    .catch(res => console.log(res))
  }, []);


  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/car/deleteCar/${id}`)
    .then(res => {
      navigate("/");
    })
    .catch(res => console.log(res))
  }

  const handleWarnClick = () => {
    axios.post(`http://localhost:3000/car/warnUser/${id}`)
    .then(res => {
      console.log(res.data)
      setWarn(false)
      window.location.reload();

    })
    .catch(res => console.log(res))
  }

  const cancelWarnClick = () => {
    axios.post(`http://localhost:3000/car/warnUser/${id}`)
    .then(res => {
      console.log(res.data)
      setWarn(true)
      window.location.reload();

    })
    .catch(res => console.log(res))
  }


  useEffect(() => {
    axios.get(`http://localhost:3000/car/getNoti/${id}`)
    .then(res => {
      setNoti(res.data)
    })
    .catch((err) => console.log(err))
  },[]);


  useEffect(() => {
    axios.get(`http://localhost:3000/car/getComments/${id}`)
    .then(res => {
      setComments(res.data)
    })
    .catch((err) => console.log(err))
  },[]);
  
  // console.log(comments);
  // console.log(comments[1].user);


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full bg-gray-100 shadow-lg rounded-lg flex mx-auto p-10">
        <img src={`http://localhost:3000/Images/${car.file}`} className="w-1/2 rounded-lg mr-4 h-80" alt="Car" />
        <div className="w-1/2">
          <h2 className="text-lg font-semibold mb-2">{car.title}</h2> <br />
          <span className="text-indigo-500 font-semibold">Plaka:</span> 
          <span className='ml-2'>{car.plate}</span>  <br /> 
          <span className="text-indigo-500 font-semibold">Arac Aciklamasi:</span> 
          <span className='ml-2'>{car.desc}</span>  <br /> 
          <span className="text-indigo-500 font-semibold">Kayit Eden Kullanici:</span>
          <span className='ml-2'>{car.email}</span>
          <div className="mt-7">
            <div className='flex gap-5'>
              {
                user.email ? 
                <button className='border border-gray-300 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-sm p-2 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1'>
                  <Link to={`/chat`} className="text-white font-semibold">
                    İletişime Geç
                  </Link>
                </button> : <>
                <span className='text-gray-700 font-semibold mt-2'>Arac Sahibine Ulasmak Icin:</span>
                <button
                  className="bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded-full shadow-md"
                  onClick={() => navigate("/login")}
                >
                  Giriş Yapınız
                </button>

                </>
              }
              { 
                user.email ?
                warn ?
                <span 
                  onClick={handleWarnClick} 
                  className='cursor-pointer p-2 bg-red-100 rounded-full shadow-md hover:bg-red-200 transition-transform transform hover:-translate-y-1'
                >
                  <PiWarningCircle size={25} color='red'/>
                </span>
                :
                <span 
                  onClick={handleWarnClick} 
                  className='cursor-pointer p-2 bg-red-100 rounded-full shadow-md hover:bg-red-200 transition-transform transform hover:-translate-y-1'
                >
                  <PiWarningCircle size={25} color='red'/>
                </span>
                : <></>
              }
              {
                user.role === "admin" || user.email === car.email ? (
                  <div className="flex space-x-4">
                  <Link
                    to={`/editCar/${car._id}`}
                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition-colors duration-300"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={e => handleDelete(car._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition-colors duration-300"
                  >
                    Araci Sil
                  </button>
                </div>
                ) : <></>
              }
            </div>
            {
              user.email && <PostComment />
            }
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 flex flex-col items-center">
          {noti?.length === 0 ? <div className='text-center p-4 font-bold'>Notifications Bulunmamakta...</div>
          : 
          <div className='text-center p-4 font-bold'>Aracı Uyaran Kullanıcılar</div>
          }
          {noti.map((item, index) => (
            <div key={index} className="p-1 mb-2 transform transition duration-500 hover:scale-105">
              <div className="mb-4 flex">
                <div className="rounded-full overflow-hidden w-12 h-12 border-2 border-gray-300">
                  <img className="w-full h-full object-cover" src={`http://localhost:3000/Images/${item.profileImage}`} alt={item.username} />
                </div>
                <div className="ml-3 mt-3 text-md font-bold text-gray-800">{item.username}</div>
              </div>
            </div>
          ))}
        </div>
        <div className='text-center p-4'>
          <div className='font-bold'>Yorumlar</div>
          <div>
          {
            comments ?
            comments.map((comment, index) => (
              <div key={index} className="p-1 w-80 bg-white rounded-lg shadow-lg mb-6 transform transition duration-500 hover:scale-105 hover:shadow-xl">
                <div className="flex items-center">
                  <div className="rounded-full overflow-hidden border-2 border-gray-300">
                    <img className="w-10 h-10 object-cover" src={`http://localhost:3000/Images/${comment.user.profileImage}`} alt="profile" />
                  </div>
                  <div className="text-gray-600 ml-5"><strong>{comment.user.username}:</strong>  {comment.text}</div>
                </div>
              </div>
            )) :
            <div className="text-gray-500 text-center py-4">Arac Hakkında Yorum Bulunmamaktadır...</div>
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Car