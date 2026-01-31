import ChevronDoubleUp from '../assets/icons/ChevronDoubleUp';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

const Layout = () => {
  const [showButton, setShowButton] = useState(false);
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang && i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isAboutPage = location.pathname.includes('/about');
  const isProductInfoPage = location.pathname.includes('/product-info');

  return (
    <div className="flex flex-col min-h-screen relative">
      {!isAboutPage && !isProductInfoPage && <Navbar />}

      <div className="grow mx-auto w-full">
        <Outlet />
      </div>

      <Footer />

      {showButton && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 ${i18n.language === 'ar' ? 'left-6' : 'right-6'} bg-white cursor-pointer text-white p-3 rounded-full shadow-md transition-all duration-300 z-50`}
        >
          <ChevronDoubleUp color="#025043" size={24} />
        </button>
      )}
    </div>
  );
};

export default Layout;