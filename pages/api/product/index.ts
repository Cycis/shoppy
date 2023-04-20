import { IProduct } from '@/types';
import { client } from '@/utils/client'
import { productQuery } from '@/utils/queries';
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   try {
      const products: IProduct[] = await client.fetch(productQuery());
      res.status(200).json(products)
   } catch (error) {
      console.log(error)
   }
}