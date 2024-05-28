import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/login", {email, password})
    .then(res => {
      console.log(res);
      window.location.href = "/" // yoksa navbar giriş sonrası değişmiyor
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Giris Yapiniz</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-400 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Giris Yap
        </button>
      </form>
      <p className="mt-4 mb-2">Hesabınız Yok Mu?</p>
      <Link to="/register">
        <button className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-indigo-200">
          Hesap Olustur
        </button>
      </Link>
    </div>
    </div>
  )
}

export default Login