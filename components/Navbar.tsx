'use client'

import React, { SetStateAction, Dispatch, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from './Container'

import { HiBars3 } from 'react-icons/hi2'
import { FaTimes, FaSignInAlt } from 'react-icons/fa'
import { AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai'
import { selectBasketItems } from './../redux/basketSlice'
import { useSelector } from 'react-redux'
import { useSession, signIn, signOut } from "next-auth/react"


const Navbar = () => {
   const { data: session } = useSession()
   const count = useSelector(selectBasketItems)

   const handleLogin = (e: any) => {
      e.preventDefault()
      signIn('google')
   }

   return (
      <div className='sticky top-0 z-30 w-full bg-gray-200'>

         <Container style='flex py-4 items-center justify-between'>
            <Link href='/'>
               <div className='logo font-semibold text-2xl lg:text-3xl xl:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500'>
                  Shoppy<span className='text-3xl text-blue-700'>.</span>
               </div>
            </Link>


            {/* user component */}
            <div className='flex items-center justify-center gap-x-4'>
               <Link href={'/cart'}
                  className='relative flex items-center justify-center h-8 w-8 md:block'
               >
                  <AiOutlineShoppingCart className='text-3xl text-blue-500 ' />
                  <span className='absolute flex justify-center items-center text-gray-200 -top-1 -right-1 bg-blue-500 h-4 w-4 rounded-full text-xs'>{count.length}</span>
               </Link>
               {!session?.user ? (
                  <>
                     <div className='md:block' onClick={handleLogin}>
                        <FaSignInAlt className='text-2xl text-blue-500 font-semibold' />
                     </div>
                  </>
               ) : (
                  <>
                     <div className='text-xl'>
                        <Image
                           src={(session?.user?.image) as string}
                           alt='photo'
                           width={30}
                           height={30}
                           className='rounded-full'
                        />
                     </div>
                     <div className=' md:block items-center justify-center' onClick={() => signOut()}>
                        <AiOutlineLogout className='text-2xl text-red-600 font-semibold' />
                     </div>
                  </>
               )}
            </div>
         </Container>
      </div>
   )
}

export default Navbar
