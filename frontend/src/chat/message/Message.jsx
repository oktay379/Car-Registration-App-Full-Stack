import React, { useContext } from 'react'
import { userContext } from '../../App'
import useConversation from '../zustand/useConversation';

const Message = ({message}) => {
  const { user } = useContext(userContext);
  
  const fromMe = message.senderId === user.id // true
	const chatClassName = fromMe ? "text-right" : "text-left";
	const bubbleBgColor = fromMe ? "bg-indigo-400" : "";


  return (
    <div className={`${chatClassName}`}>
      <div className={`bg-gray-200 text-gray-800 rounded-lg py-2 px-4 mt-2 ${bubbleBgColor}`}>
        {message.message}
      </div>
	  </div>
  )
}

export default Message