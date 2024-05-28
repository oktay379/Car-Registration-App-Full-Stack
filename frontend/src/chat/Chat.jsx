import React from 'react'
import Conversations from './sidebar/Conversations'
import MessageContainer from './message/MessageContainer'

const Chat = () => {
  return ( <>
    <div className="flex justify-center h-screen">
      <div className="flex flex-col w-1/3">
        <div className="h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <Conversations />
        </div>
      </div>
      <div className="flex flex-col w-2/3">
        <div className="h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <MessageContainer />
        </div>
      </div>
    </div>
  </>
  )
}

export default Chat