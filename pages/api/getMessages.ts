import type { NextApiRequest, NextApiResponse } from 'next'
import { Message } from '../../typings'
import redis from '../../redis'

type Data = {
  messages:Message[]
}
type ErrorData={
    body:string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data|ErrorData>
) {
    if(req.method!=='GET'){
        res.status(405).json({body:'method not allowerd'})
        return
    }
    const messagesRes=await redis.hvals('messages')
    const messages:Message[]=messagesRes.map((message)=>
        JSON.parse(message)
    ).sort((a,b)=>b.createdAt-a.createdAt)
  res.status(200).json({ messages })
}
