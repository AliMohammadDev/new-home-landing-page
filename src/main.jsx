import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Providers from './provider.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './utils/router.jsx';
import './index.css';
import axios from "axios";
import Cookie from "cookie-universal";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18n/i18n.js';
import i18n from './i18n/i18n.js';
import { Suspense } from 'react';
import Loading from './components/Loading.jsx';

const cookies = Cookie();
axios.defaults.baseURL =
  import.meta.env.VITE_API;
// axios.defaults.headers.common.Authorization = "Bearer " + Cookie().get("token");

axios.interceptors.request.use((config) => {
  const token = cookies.get("token");
  const lang = i18n.language || localStorage.getItem('lang') || 'en';

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers['Accept-Language'] = lang;

  return config;
}, (error) => {
  return Promise.reject(error);
});

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
        {/* for loading */}
        <Suspense fallback={<Loading fullScreen />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </Providers>
  </StrictMode >
);
