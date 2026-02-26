import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { router } from './router';
import { ThemeProvider } from './provider/ThemeProvider';
import { useAuthStore } from './store/auth-store';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
})

useAuthStore.getState().checkAuth()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)