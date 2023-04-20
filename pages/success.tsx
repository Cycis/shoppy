import React from 'react'
import Container from './../components/Container';
import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa'

const success = () => {
   return (
      <div className='min-h-screen w-full'>
         <Container>
            <div className='flex flex-col items-center justify-center mt-40 '>
               <p className='text-green-700 text-6xl font-bold '>
                  Success
               </p>
               <Link href="/" className='text-blue-500 mt-2 inline-flex items-center justify-center gap-1'>
                  <FaChevronLeft />continue shopping
               </Link>
            </div>
         </Container>
      </div>
   )
}

export default success
