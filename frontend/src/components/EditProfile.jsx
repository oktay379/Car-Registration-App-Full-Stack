import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const EditProfile = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/getSingle/" + id)
    .then(res => {
      if(res.data.status) {
        setEmail(res.data.user.email);
        setUsername(res.data.user.username);
      }
    })
    .catch(err => console.log(err))
  }, [])

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append('username', username);
    formData.append('file', file);

    axios.put(`http://localhost:3000/auth/updateUser/${id}`, formData)
    .then(res => {
      if(res.data.update) {
        console.log(res.data)
        navigate("/profile/" + id);
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Giris Yapiniz</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="flex flex-col">
        <label htmlFor="username">Avatar:</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          type="file"
          placeholder="Dosya Giriniz"
          onChange={(e) => setFile(e.target.files[0])}
        />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-400 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Kaydet
        </button>
      </form>
    </div>
    </div>
  )
}

export default EditProfile