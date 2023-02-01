'use client'
import { useState, FormEvent } from 'react'
import {v4 as uuid} from 'uuid'
import { Message } from '../typings'
import useSWR from 'swr'
import fetcher from '../utils/fetchMessages'
import { getServerSession } from 'next-auth/next'

type Props={
  session: any
  // Awaited<ReturnType<typeof getServerSession>>
}

function Chatinput({session}:Props) {
  console.log(session)
  const {data:messages,error,mutate}=useSWR('api/getMessage',fetcher)
  const id=uuid()
  const [input,setinput]=useState("")
    const addMessage=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!input || !session) return
        const MessagetoSend=input
        setinput("")
        document.querySelector('form')?.reset()
        const message:Message={
          id,
          message:MessagetoSend,
          createdAt:Date.now(),
          usernmae:session?.user?.name!,
          profilePic:session?.user?.image!,
          email:session?.user?.email!,
        }
        const uploadMessageToUpstash= async()=>{
          const data=await fetch('/api/addMessage',{
            method:'POST',
            headers:{
              'Content-Type':"application/json"
},
            body:JSON.stringify({message})
          }).then((res)=>res.json())
         
          return [data.message,...messages!]
        }
        await mutate(uploadMessageToUpstash,{
          optimisticData:[message,...messages!],
          rollbackOnError:true
        })
    }


  return (
    <form className='fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-5 bg-white' onSubmit={addMessage}>
        <input type="text"  className='disabled:opacity-50 disabled:cursor-not-allowed border-blue-400 py-2 flex-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border:transparent px-4' placeholder='Enter message here' onChange={e=>setinput(e.target.value)} disabled={!session} />
        <button className='bg-blue-500 hover:bg-blue-700 px-3 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded font-bold' disabled={!session} type="submit">Send</button>
    </form>
  )
}

export default Chatinput