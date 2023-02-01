import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoutButton from './LogoutButton'

async function Header() {
    const session=await getServerSession()
    if(session){
        return(
            <header className='flex justify-between items-center sticky top-0 z-50 p-10 bg-white'>
                <div className='flex'>
                    <Image className='rounded-full object-contain mx-2' src={session.user?.image!} height={10} width={50} alt='Profile Pic'/>
                    <div>
                        <p>You are Logged in as :</p>
                        <p>{session.user?.name}</p>
                    </div>
                </div>
                <LogoutButton/>
            </header>
        )
    }
  return (
    <header className='flex justify-center items-center sticky top-0 z-50 bg-white'>
        <div className='flex items-center flex-col space-y-2'>
            <div className='flex space-x-2'>
                <Image src='https://links.papareact.com/jne' height={10} width={50} alt='logo'/>
                <p className='text-blue-300 text-sm'>Welcome to meta messenger</p>
            </div>
            <Link className='bg-blue-500 hover:bg-blue-700 p-2 text-white' href='auth/signin'>Sign in</Link>
        </div>
    </header>
  )
}

export default Header