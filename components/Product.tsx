import { IProduct } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../utils/client'
import { MdAddShoppingCart } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { addToBasket } from '@/redux/basketSlice'
import toast from 'react-hot-toast'


interface IProps {
   product: IProduct
}

const Product = ({ product }: IProps) => {
   const dispatch = useDispatch();

   const addItemToBasket = () => {
      dispatch(addToBasket(product))
      toast.success(`${product.title} added successfully`, {
         duration: 4000,
         position: 'top-center',
      })
   }

   return (
      <Link href={'/'}>
         <div className='relative w-[350px] h-[260px] rounded-md shadow-md bg-white '>
            <div>
               <Image
                  src={urlFor(product.image.asset._ref).url().toString()}
                  alt='product image'
                  layout='fill'
                  objectFit='contain'
                  className='w-full h-[260px] rounded-md'
               />
            </div>
            <span className='absolute flex items-center  gap-4 bottom-2 left-1 bg-gray-200 shadow-md p-2 rounded-lg'>
               <p className='font-bold tracking-wide'>{product.title}</p>
               <p className='text-md'>$ {product.price}</p>
            </span>
            <button
               onClick={addItemToBasket}
               className='absolute flex items-center justify-center bottom-2 right-1 rounded-full shadow-lg bg-blue-300 capitalize h-10 w-10 hover:bg-blue-400'
            >
               <MdAddShoppingCart className='font-semibold text-xl' />
            </button>
         </div>
      </Link>
   )
}

export default Product
