import React, { useContext, useEffect } from 'react'
import { userContext } from '../../App'
import Conversation from './Conversation';

const Conversations = () => {

  const { users } = useContext(userContext);
  // console.log(users);

  return (
    <div className='py-2 flex flex-col overflow-auto rounded-sm'>
       {users?.map((user) => (
            <Conversation
              user = {user}
              key = {user._id}
            />
       ))}
    </div>
  )
}

export default Conversations