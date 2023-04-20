import Container from '@/components/Container'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal, clearBasket } from '@/redux/basketSlice'
import currencyFormatter from 'currency-formatter'
import ProductItem from '@/components/ProductItem'
import Stripe from 'stripe'
import { fetchPostJSON } from '@/utils/api-helpers'
import getStripe from '@/utils/get-stripejs'


interface IProduct {
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

}

const Cart = () => {
   const dispatch = useDispatch()
   const products = useSelector(selectBasketItems);
   const totalPrice = useSelector(selectBasketTotal)
   const shippingFee = Math.floor((totalPrice * 1.68) / 100);
   const [groupedItemsBasket, setGroupedItemsBasket] = useState({} as { [key: string]: IProduct[] });
   const [loading, setLoading] = useState(false)

   let parseProducts = JSON.stringify(products)

   useEffect(() => {
      const groupedItems = products.reduce((results, item) => {
         (results[item._id] = results[item._id] || []).push(item);
         return results
      }, {} as { [key: string]: IProduct[] });

      setGroupedItemsBasket(groupedItems)
   }, [products])

   const createCheckoutSession = async () => {
      setLoading(true)

      const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON("/api/create_session", {
         products: products
      });

      // Internal server error
      if ((checkoutSession as any).statusCode === 500) {
         console.error((checkoutSession as any).message);
         return;
      }

      // Redirect to checkout
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
         sessionId: checkoutSession.id
      });

      console.log(error.message);
      setLoading(false)
   }

   return (
      <div className='min-h-screen w-full'>
         <Container>
            <div className='py-6 flex flex-col md:flex-row gap-10'>
               <div className='flex-1 h-fit p-4 rounded shadow-sm bg-gray-100'>
                  <div className='flex items-center justify-between'>
                     <h2 className='text-xl font-semibold text-gray-800'>Cart Items</h2>
                     {products.length !== 0 && (
                        <button className='px-6 py-1 bg-blue-300 text-gray-900 rounded-md capitalize font-medium tracking-wide'
                           onClick={() => dispatch(clearBasket())}
                        >clear</button>
                     )}
                  </div>
                  {
                     products.length === 0 ? (
                        <div className='flex item-center justify-center'>
                           <p className='my-12 text-2xl text-gray-500 font-semibold tracking-wide'>No Item in Cart</p>
                        </div>
                     ) : (
                        <table className="table-fixed  sm:w-full mt-10  rounded-md shadow-md bg-gray-200">
                           <thead className='w-full'>
                              <tr className='text-[18px]'>
                                 <th className='w-[250px] p-2'>Product</th>
                                 <th className='w-[100px]'>Price</th>
                                 <th className='w-[100px]'>Quantity</th>
                                 <th className='w-[100px]'>Actions</th>
                              </tr>
                           </thead>
                           <tbody className='ml-10'>
                              {products.length > 0 && (
                                 <>
                                    {Object.entries(groupedItemsBasket).map(([key, products]) => (
                                       <ProductItem key={key} products={products} id={key} />
                                    ))}
                                 </>
                              )}
                           </tbody>
                        </table>
                     )
                  }
               </div>
               {products.length > 0 && (
                  <div className='flex flex-col gap-4 w-full h-fit md:w-[300px] xl:w-[400px] bg-white p-4 rounded shadow-sm'>
                     <h2 className='text-xl font-semibold tracking-wide text-gray-900'>Summary</h2>
                     {/* no of items total amount shipping pay button */}
                     <div className='flex items-center justify-between'>
                        <span>No of Items: </span>
                        <span>{products.length}</span>
                     </div>
                     <div className='flex items-center justify-between'>
                        <span>Shipping Fees:</span>
                        <span>{currencyFormatter.format(shippingFee, { code: 'USD' })}</span>
                     </div>
                     <div className='flex items-center justify-between'>
                        <span>Total Amount:</span>
                        <span>{currencyFormatter.format(totalPrice + shippingFee, { code: 'USD' })}</span>
                     </div>
                     <button className='mt-10 w-full bg-blue-300 py-3 rounded text-base text-gray-900'
                        onClick={createCheckoutSession}
                     >Pay with Stripe</button>
                  </div>
               )}

            </div>
         </Container >
      </div >
   )
}

export default Cart