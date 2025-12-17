import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Providers from './provider.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './utils/router.js';
import './index.css';
import axios from "axios";
import Cookie from "cookie-universal";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


axios.defaults.baseURL =
  import.meta.env.VITE_API;
axios.defaults.headers.common.Authorization = "Bearer " + Cookie().get("token");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Providers>
  </StrictMode >
);
