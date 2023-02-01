import Pusher from 'pusher'
import ClientPusher from 'pusher-js'

export const serverPusher=new Pusher({
appId:"1543082",
key :"8bd72117bc5957e59ce0",
secret: "8d88e7e8cf2b0c99284d",
cluster: "mt1",
useTLS:true
})
export const clientPusher=new ClientPusher('8bd72117bc5957e59ce0', {
    cluster: 'mt1',
    forceTLS:true
  });