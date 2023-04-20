import { IProduct } from '@/types';
import { urlFor } from '@/utils/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
   apiVersion: "2022-11-15"
})


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      const products: IProduct[] = req.body.products;

      const transformedData = products.map((product) => ({
         price_data: {
            currency: "usd",
            product_data: {
               name: product?.title,
               images: [urlFor(product.image.asset._ref).url()],
            },
            unit_amount: product.price * 100,
         },
         quantity: 1,
      }));
      try {
         const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
            line_items: transformedData,
            mode: 'payment',
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel`,
         });

         res.status(200).json(session)
         console.log(session)

      } catch (error) {
         const errorMessage =
            error instanceof Error ? error.message : "Internal server error";
         res.status(500).json({ statusCode: 500, message: errorMessage });
      }
   }
}
