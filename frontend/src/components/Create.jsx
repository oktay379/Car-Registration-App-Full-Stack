import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';


const Create = () => {
  const {user} = useContext(userContext);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [plate, setPlate] = useState("");
  const [file, setFile] = useState(null);
  const maxChars = 30; 

  const navigate = useNavigate();


  const handleChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= maxChars) {
      setDesc(inputText);
    }
  };


  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('file', file);
    formData.append("plate", plate)

    axios.post("http://localhost:3000/car/create", formData)
    .then(res => {
      if(res.data.added) {
        console.log(res.data)
        navigate("/");
      }
    })
    .catch(err => console.log(err))
  }

  return (
  <div className="flex items-center justify-center h-screen">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold">Arac Bilgilerinizi Giriniz:</h3>
        <p>Baslik</p>
        <input
          type="text"
          placeholder="Arac Baslik Giriniz"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <p>Plaka</p>
        <input
          type="text"
          placeholder="Ornek Plaka Girisi: 34AUG744"
          onChange={(e) => setPlate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <p>Aciklama</p>
        <textarea
          value={desc}
          name="desc"
          id="desc"
          cols="5"
          rows="5"
          onChange={handleChange}
          maxLength={maxChars}
          placeholder="Arac Aciklamasi Giriniz"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        ></textarea>
        <p>Arac Resim</p>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          type="file"
          placeholder="Dosya Giriniz"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-400 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Yayinla
        </button>
      </form>
    </div>
  </div>
  )
}

export default Create