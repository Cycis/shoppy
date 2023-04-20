import { IProduct } from '@/types'
import { loadStripe } from '@stripe/stripe-js'
import session from 'redux-persist/lib/storage/session'
import Stripe from 'stripe'
import { urlFor } from './client'
import getStripe from './get-stripejs'

// const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)

export const checkout = async (products: IProduct[]) => {
   const stripe = getStripe()
   try {
      const lineProduct = await products.map(product => { urlFor(product.image.asset._ref).url(), product.title, product.price, product._id });
      // console.log(lineProduct)
      const { session } = await fetch('/api/check_session', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ lineProduct })
      }).then(function (res) {
         return res.json();
      })

      const stripe = await getStripe();
      return await stripe?.redirectToCheckout({ sessionId: session.id })

   } catch (err) {
      console.log(err)
   }
}