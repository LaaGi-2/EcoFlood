'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState, useEffect } from 'react';
import { store } from '@/store';
import { Provider } from 'react-redux';

function makeQueryClient() {
     return new QueryClient({
          defaultOptions: {
               queries: {
                    staleTime: 5 * 60 * 1000, // 5 minutes
                    gcTime: 10 * 60 * 1000, // 10 minutes
                    refetchOnWindowFocus: false,
                    retry: 1,
               },
               mutations: {
                    retry: 1,
               },
          },
     })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
     if (typeof window === 'undefined') {
          return makeQueryClient()
     } else {
          if (!browserQueryClient) browserQueryClient = makeQueryClient()
          return browserQueryClient
     }
}

export default function Providers({ children }: { children: ReactNode }) {
     const [queryClient] = useState(() => getQueryClient())
     const [mounted, setMounted] = useState(false)

     useEffect(() => {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setMounted(true)
     }, [])

     if (!mounted) {
          return null
     }

     return (
          <Provider store={store}>
               <QueryClientProvider client={queryClient}>
                    {children}
                    {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
               </QueryClientProvider>
          </Provider>
     )
}