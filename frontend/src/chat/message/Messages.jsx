import React, { useEffect } from 'react'
import useConversation from '../zustand/useConversation';
import Message from './Message';
import axios from 'axios';

const Messages = () => {
  const {selectedConversation, messages, setMessages} = useConversation();


  useEffect(() => {
    axios.get(`http://localhost:3000/messages/${selectedConversation._id}`)
    .then(res => { 
      setMessages(res.data)
      console.log(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  },[selectedConversation?._id, setMessages])
  
  return (
    <div className='px-4 w-auto'>
      { messages && messages.length === 0 ? (
      <p className='text-center'>Send a message to start the conversation</p>
      ) : (
      messages.map((message) => (
        <div key={message._id}>
          <Message message={message} />
        </div>
      ))
      )}
    </div>
  )
}

export default Messages