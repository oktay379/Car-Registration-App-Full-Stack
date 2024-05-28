import React from 'react'
import { Link } from 'react-router-dom'
import { FaCar } from "react-icons/fa";
import { IoInformation } from "react-icons/io5";
import { TbFileDescription } from "react-icons/tb";

const Cars = ({cars}) => {
  return (
    <>
        {cars.map((car, i) => (
        <div key={i} className="rounded-md mt-5 mr-5" style={{width: "300px"}}>
          <div className="shadow-md">
            <Link to={`/car/${car._id}`} className="block">
              <img className="w-full rounded-t-md" src={`http://localhost:3000/Images/${car.file}`} alt={car.title} 
              style={{height: "200px", objectFit: "cover"}} 
              />
              <div className="p-5">
                <div className="flex">
                  <span className="text-indigo-500"> <IoInformation size={20}/></span>
                  <span className="ml-5">{car.title}</span>
                </div>
                <hr />
                <div className="flex">
                  <span className="text-indigo-500"> <FaCar size={20}/></span>
                  <span className="ml-5">{car.plate}</span>
                </div>
                <hr />
                <div className="flex">
                  <span className="text-indigo-500"> <strong><TbFileDescription size={20}/></strong></span>
                  <span className="ml-5">{car.desc}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}

export default Cars