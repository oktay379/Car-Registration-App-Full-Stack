import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

const PostComment = () => {

  const { id } = useParams();
  const [ text, setText ] = useState("");

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3000/car/comment/${ id }`, {text})
    .then(res => {
      setText('');
      console.log(res);
      window.location.reload();
    })
    .catch(err => console.log(err))
    
    console.log(text);
};


  return (
    <form className='rounded-lg flex mt-9' onSubmit={handleSubmit}>
      <div className="flex">
        <textarea
            rows="4"
            className="w-60 shadow border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="  Yorum Yapiniz...  "
            value={text}
            onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white rounded-md ml-3 h-10 flex items-center px-4 transition-colors duration-300">
        <span className="mr-2">Gönder</span>
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 10a1 1 0 0 1 1-1h10.586l-3.293-3.293a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L15.586 11H5a1 1 0 0 1-1-1z" clip-rule="evenodd" />
        </svg>
      </button>

    </form>
  )
}

export default PostComment