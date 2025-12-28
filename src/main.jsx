import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Providers from './provider.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './utils/router.js';
import './index.css';
import axios from "axios";
import Cookie from "cookie-universal";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18n/i18n.js';
import i18n from './i18n/i18n.js';


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


const savedLang = localStorage.getItem('lang') || 'en';
i18n.changeLanguage(savedLang);
document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Providers>
  </StrictMode >
);
