import Image from 'next/image'
import { Message } from '../typings'
import {  useSession } from 'next-auth/react'
import TimeAgo from 'react-timeago'
type Props={
    message:Message
}
function MessageComponent({message}:Props) {
  const {data:session}= useSession()
  const isUser=session?.user?.email===message.email
  return (
    <div className={`flex w-fit ${isUser && 'ml-auto'} `}>
        <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
        <Image src={message.profilePic} alt='profile picture' className='rounded-full mx-2' height={10} width={50}/>
        </div>
        <div>
            <p className={`text-[1rem] px-[2px] pb-[2px] ${isUser?'text-blue-400 text-right':'text-red-400 text-left'}`}>{message.usernmae} </p>
        <div className='flex items-end'>
            <div className={`bg-red-400 px-3 py-2 text-white w-fit rounded-lg ${isUser?'bg-blue-400 ml-auto order-2':'bg-red-400'}`}>
            <p >{message.message}</p>
            </div>
            <p className={`text-[0.75rem] px-2 italic text-gray-400 ${isUser && 'text-right'}`}>
              <TimeAgo date={new Date(message.createdAt)}/>
              {/* {new Date(message.createdAt).toLocaleString()} */}
            </p>
            </div>
        </div>
    </div>
  )
}

export default MessageComponent