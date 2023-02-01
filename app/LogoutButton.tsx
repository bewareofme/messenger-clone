'use client'
import { signOut } from "next-auth/react"
function LogoutButton() {
  return (
    <button className='bg-blue-500 hover:bg-blue-700 p-2 text-white' onClick={()=>signOut()}>
        Sign out
    </button>
  )
}

export default LogoutButton