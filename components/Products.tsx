'use client'

import { useEffect, useState } from "react"
import axios from 'axios'
import Container from "./Container"
import Product from "./Product"

export interface IProduct {
   _id: string;
   title: string;
   price: number;
}

const Products = async () => {
   // const [visibleResult, setVisibleResult] = useState<IProps[]>(products.slice(0, ITEM_PER_PAGE))

   // const ITEM_PER_PAGE = 6;
   // const pagination = usePagination({
   //    total: Math.ceil(products.length / ITEM_PER_PAGE),
   //    initialPage: 1,
   //    onChange(page) {
   //       const start = (page - 1) * ITEM_PER_PAGE
   //       const end = start + ITEM_PER_PAGE
   //       setVisibleResult(products.slice(start, end))
   //    }
   // });

   return (
      <div>
         <Container style="py-10">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4 gap-y-10">
               {visibleResult.map((product) => (
                  <Product key={product.id} product={product} />
               ))}
            </div>

            <div className="flex items-center justify-end p-3 gap-10 mt-10 mr-10 md:ml-0">
               <button className={`px-4 py-2 bg-blue-400 rounded-md`} onClick={pagination.next}>
                  Next
               </button>
               <button className="px-4 py-2 bg-blue-400 rounded-md" onClick={pagination.previous}>
                  Prev
               </button>
            </div> */}
            {/* <>{
               products?.map((product) => (
                  <div key={product._id} >{product.desc.children.text}</div>
               ))
            }
            </> */}
         </Container >
      </div >
   )
}

export default Products