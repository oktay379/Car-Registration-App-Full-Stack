import React, { useState } from 'react'
import useConversation from '../zustand/useConversation';
import axios from "axios";
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  const {messages, setMessages, selectedConversation} = useConversation();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3000/messages/send/${selectedConversation._id}`, {message})
    .then(res => {
      console.log(res)
      setMessage("");
      window.location.reload();
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5  bg-gray-100 border-gray-600 text-gray-800'
          placeholder='Send a message'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
          <BsSend />
        </button>
      </div>
    </form>
  )
}

export default MessageInput