import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
// ...
import basketReducer from './basketSlice'
import thunk from 'redux-thunk'

const persistConfig = {
   key: 'root',
   storage
}

const persistedReducer = persistReducer(persistConfig, basketReducer)

export const store = configureStore({
   reducer: persistedReducer,
   devTools: process.env.NODE_ENV !== 'production',
   middleware: [thunk]
})

export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch