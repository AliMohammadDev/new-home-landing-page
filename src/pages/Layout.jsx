import ChevronDoubleUp from '../assets/icons/ChevronDoubleUp';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

const Layout = () => {
  const [showButton, setShowButton] = useState(false);
  const { i18n,t } = useTranslation();
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
          className={clsx(
            "fixed bottom-6 z-50 rounded-full shadow-lg transition-all duration-300 bg-white cursor-pointer group flex flex-col items-center justify-center overflow-hidden border border-[#025043]/10",
            i18n.language === 'ar' ? 'left-6' : 'right-6',
            "w-12 h-12 hover:h-20"
          )}
        >
          <div className="shrink-0 pt-1 transition-transform duration-300 group-hover:-translate-y-1">
            <ChevronDoubleUp color="#025043" size={24} />
          </div>

          <span
            className={clsx(
              "opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-10 transition-all duration-500 ease-in-out text-[#025043] font-bold text-[10px] uppercase tracking-tighter",
              i18n.language === 'ar' ? 'font-[Expo-arabic] mb-2' : 'font-sans mb-1'
            )}
          >
            {t('common.top')}
          </span>
        </button>
      )}
    </div>
  );
};

export default Layout;