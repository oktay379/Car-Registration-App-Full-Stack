import React from 'react'
import useConversation from '../zustand/useConversation'

const Conversation = ({user}) => {
  const {selectedConversation, setSelectedConversation} = useConversation();
  const isSelected = selectedConversation?._id === user._id

  return (
    <div className={`flex gap-2 items-center hover:bg-indigo-500 rounded p-2 py-1 cursor-pointer mt-4
			${isSelected ? "bg-indigo-500" : ""}`}
			onClick={() => setSelectedConversation(user)}
    >

      <div className='avatar'>
          <div className='w-12 rounded-full'>
            {
              user.file ? 
              <img src={`http://localhost:3000/Images/${user.file}`} />
              : 
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEquqKx_4BB68GJN8C8aUfZu6wBaBeQeqMQ&usqp=CAU' />
            }
          </div>
      </div>

      <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold'>{user.username}</p>
          </div>
      </div>
      
		</div>
  )
}

export default Conversation