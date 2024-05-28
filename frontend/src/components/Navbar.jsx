import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../App";
import axios from "axios";
import Search from "./Search";
import { FaCar } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { TbRotate360 } from "react-icons/tb";

const Navbar = () => {

  const {user} = useContext(userContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);

  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout")
    .then(res => {
      if(res.data === "Success") {
        navigate(0);
      }
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="bg-gray-100 shadow-lg h-20 px-5 flex items-center justify-between">
      
      <h3 className="flex items-center">
        <Link className="text-4xl font-extrabold text-gray-800" to={"/"}>
          VinVin
        </Link>
        <TbRotate360
          style={{ color: 'red', fontSize: '40px', marginLeft: '0.5rem', verticalAlign: 'middle' }}
        />
      </h3>

      <Search/>

      <div className="flex gap-5"> 
        <div>
          <Link className="flex text-gray-700 hover:text-gray-900 font-semibold" to={"/notifications"}>
            <FaCar  size={22}/>
            <span className="ml-2">Araclarim</span>
          </Link>
        </div>
        {
          user.username ? 
          <div className="text-gray-700 hover:text-gray-900 font-semibold" onClick={() => setProfile(!profile)}>
            {profile ?
            <div className="relative" style={{ zIndex: 999 }}>
              <div className="absolute top-8 text-black right-5 w-[150px] bg-white shadow-md shadow-gray-300">
                <div className="hover:bg-gray-100 px-5 py-2 cursor-pointer text-gray-700 hover:text-gray-900 font-semibold"><Link to={`/profile/${user.id}`}>Profil</Link></div>
                <div className="hover:bg-gray-100 px-5 py-2 cursor-pointer">
                  <Link className="text-gray-700 hover:text-gray-900 font-semibold" to={"/create"}>Create</Link>
                </div>
                {
                  user.role === "admin" ? 
                  <div className="hover:bg-gray-100 px-5 py-2 cursor-pointer">
                    <Link className="text-gray-700 hover:text-gray-900 font-semibold" to={"/dashboard"}>Dashboard</Link>
                  </div>  : <></>
                }
                <div className="hover:bg-gray-100 px-5 py-2 cursor-pointer text-gray-700 hover:text-gray-900 font-semibold" onClick={handleLogout}>Cikis</div>
              </div>
            </div> : <></>
            }
            <div className="cursor-pointer">{user.email}</div>
          </div>  
          : 
          <div className="flex gap-1 text-gray-700 hover:text-gray-900 font-semibold">
            <IoMdLogIn className="" size={22} /> 
            <Link to="/login" className="text-3md">Giris Yap</Link>
          </div>
        }
      </div>

    </div>
  )
}

export default Navbar