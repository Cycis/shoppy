import React from 'react'
import Image from 'next/image'
import { removeFromBasket, selectBasketItems } from '@/redux/basketSlice';
import { useSelector, useDispatch } from 'react-redux';
import { IProduct } from './Products';
import { urlFor } from '@/utils/client';
import { FaTrashRestoreAlt } from 'react-icons/fa';


interface Props {
   products: {
      _id: string;
      title: string;
      price: number;
      image: {
         _key: string;
         _type: "image";
         asset: {
            _ref: string;
         };
      };
      desc: {
         children: {
            _key: string;
            text: string;
         }
      }
   }[]
   id: string
}

const ProductItem = ({ products, id }: Props) => {
   const dispatch = useDispatch();

   const removeItemFromBasket = () => {
      dispatch(removeFromBasket({ id }));
   }

   return (
      <tr className=''>
         <td className='ml-10 mb-3'>
            <div className='flex gap-3 items-center'>
               <Image
                  src={urlFor(products[0]?.image?.asset?._ref).url()}
                  alt=''
                  width={60}
                  height={60}
               />
               <p>{products[0].title}</p>
            </div>
         </td>
         <td >
            <span className='ml-12'>{products[0].price}</span>
         </td>
         <td>
            <span className='ml-12'>{products.length}</span>
         </td>
         <td>
            <div className='flex gap-3 hover:bg-gray-200 rounded-lg cursor-pointer w-[100px] p-1 items-center'
               onClick={removeItemFromBasket}
            >
               <FaTrashRestoreAlt className='text-red-600' />
               remove
            </div>
         </td>
      </tr>
   )
}

export default ProductItem