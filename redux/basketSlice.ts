import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { IProduct } from '@/types';
import { RootState } from './store';

export interface BasketState {
   products: IProduct[],
}

const initialState: BasketState = {
   products: [],
}

export const basketSlice = createSlice({
   name: "basket",
   initialState,
   reducers: {
      addToBasket: (state: BasketState, action: PayloadAction<IProduct>) => {
         state.products = [...state.products, action.payload]
      },
      clearBasket: (state: BasketState) => {
         state.products = [];
      },
      removeFromBasket: (state: BasketState, action: PayloadAction<{ id: string }>) => {
         let index = state.products.findIndex((item: IProduct) => item._id === action.payload.id)
         let newBasket = [...state.products]

         if (index >= 0) {
            newBasket.splice(index, 1)
         } else {
            console.log(
               `Cant remove product (id: ${action.payload.id}) as its not in basket!`
            );
         }

         state.products = newBasket
         console.log(newBasket)
      }

   },
});


export const { addToBasket, clearBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = (state: RootState) => state.products;
export const selectBasketTotal = (state: RootState) => state.products.reduce(
   (total: number, product: IProduct) => (total += product.price), 0
)

export default basketSlice.reducer