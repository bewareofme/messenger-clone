
import React from 'react'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import { Message } from '../typings'
import { Providers } from './providers'
import { getServerSession } from 'next-auth/next'


 async function Homepage() {
  const data=await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/getMessages`).then((res)=>res.json())
  const messages:Message[]=data.messages
  const session=await getServerSession()
  return (
     <Providers session={session}>
      <main>
        <MessageList initialMessages={messages}/>
        <ChatInput session={session}/>
      </main>
    </Providers>
  )
}

export default Homepage