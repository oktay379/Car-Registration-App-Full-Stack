import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



const EditCar = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [plate, setPlate] = useState("");
  const [file, setFile] = useState(null);
  const maxChars = 50; 

  useEffect(() => {
    axios.get("http://localhost:3000/car/getCar/" + id)
    .then(result => {
      console.log(result);
      setTitle(result.data.title);
      setDesc(result.data.desc);
      setPlate(result.data.plate);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])


  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("plate", plate);
    formData.append("file", file);

    axios.put("http://localhost:3000/car/updateCar/" + id, formData)
    .then(res => {
      if(res.data.update) {
        console.log(res.data)
        navigate("/");
      }
    })
    .catch(err => console.log(err))
  }

  const handleChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= maxChars) {
      setDesc(inputText);
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold">Arac Bilgileri Duzeltme:</h3>
          <p>Baslik</p>
          <input
            value={title}
            type="text"
            placeholder="Arac Baslik Giriniz"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <p>Plaka</p>
          <input
            value={plate}
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
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            type="file"
            placeholder="Dosya Giriniz"
            onChange={(e) => setFile(e.target.files[0])}
            />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Duzelt
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditCar