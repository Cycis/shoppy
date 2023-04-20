import ClientOnly from '@/components/ClientOnly'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './../redux/store'
import { useState } from 'react'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <SessionProvider session={session}>
      <MantineProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ClientOnly>
              <Navbar />
              <Component {...pageProps} />
              <Toaster />
            </ClientOnly>
          </PersistGate>
        </Provider>
      </MantineProvider>
    </SessionProvider>
  )
}
