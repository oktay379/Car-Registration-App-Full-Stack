import React, { useContext } from 'react'
import useConversation from '../zustand/useConversation';
import { userContext } from '../../App';
import { TiMessages } from "react-icons/ti";
import Messages from './Messages';
import MessageInput from './MessageInput';


const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversation();
  // console.log(selectedConversation);
  return (
    <div>
      <div className='py-2 flex flex-col mt-4'>
        {
        !selectedConversation ? 
        <NoChatSelected /> : 
        <>
          <div className='bg-indigo-500 px-4 py-2 mb-2 rounded-lg'>
            <span className='label-text'>To:</span>
            <span className='text-gray-900 ml-3 font-bold'>{selectedConversation.username}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
        }
        </div>
    </div>
  )
}

const NoChatSelected = () => {
  const { user } = useContext(userContext); 
  return (
    <div className='flex items-center w-full h-full'>
        <div className='px-4 text-center sm:text-lg md:text-xl font-semibold flex flex-col items-center gap-2'>
            <p>Hoşgeldin 👋 {user?.name}</p>
            <p>Mesajlasmak Icin Kullanici Secin</p>
            <TiMessages className='text-3xl md:text-6xl text-center' />
        </div>
    </div>
  )
}

export default MessageContainer