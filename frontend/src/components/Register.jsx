import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";


const Register = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/auth/register", {username, email, password})
        .then(res => {
            console.log(res);
            navigate("/login");
        })
        .catch(err => console.log(err))
    };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
    <div>
      <h2 className="text-2xl font-semibold mb-4">Kayit Ol</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block">Kullanici Adiniz:</label>
          <input
            type="text"
            placeholder="Kullanici Adiniz"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <label htmlFor="email" className="block">Email:</label>
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Sifre:</label>
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
          Kayit Ol
        </button>
      </form>
      <p className="mt-4 mb-2">Zaten Hesabınız Var Mı?</p>
      <Link to={"/login"} className="block text-center">
        <button className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-200">
          Giris Yap
        </button>
      </Link>
    </div>
  </div>
</div>

  )
}

export default Register