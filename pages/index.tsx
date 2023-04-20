import Image from 'next/image'
import { usePagination } from '@mantine/hooks'
import { SetStateAction, useState } from 'react'
import { IProduct } from '@/types'

import Product from '@/components/Product'
import Container from '@/components/Container'
import Footer from '@/components/Footer'
import { useDispatch } from 'react-redux'
import { clearBasket } from '@/redux/basketSlice'
import { Dispatch } from 'react'

interface Props {
  products: IProduct[]
}

export default function Home({ products }: Props) {
  // console.log(products)
  const dispatch = useDispatch();
  const ITEM_PER_PAGE = 6;
  const [visibleResult, setVisibleResult] = useState<IProduct[]>(products.slice(0, ITEM_PER_PAGE))

  const pagination = usePagination({
    total: Math.ceil(products.length / ITEM_PER_PAGE),
    initialPage: 1,
    onChange(page) {
      const start = (page - 1) * ITEM_PER_PAGE
      const end = start + ITEM_PER_PAGE
      setVisibleResult(products.slice(start, end))
    }
  });

  const handleClear = () => {
    dispatch(clearBasket())
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between pt-16">
      <Container>
        {/* <button className='bg-red-300 px-5 py-1' onClick={handleClear}>Clear</button> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4">
          {
            visibleResult?.map((product) => (
              <Product key={product._id} product={product} />
            ))
          }
        </div>

        <div className="flex items-center justify-end p-3 gap-10 mt-10 mr-10 md:ml-0">
          <button
            onClick={pagination.next}
            className={`px-4 py-2 bg-blue-400 rounded-md`}
          >
            Next
          </button>
          <button
            onClick={pagination.previous}
            className="px-4 py-2 bg-blue-400 rounded-md"
          >
            Prev
          </button>
        </div>
      </Container >
      <Footer />
    </main >
  )
}



export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/product');
  const products = await res.json()

  return {
    props: {
      products
    },
  }
}