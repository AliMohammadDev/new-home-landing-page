import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import ChevronDoubleUp from '../assets/icons/ChevronDoubleUp';
import { useTranslation } from 'react-i18next';

const Layout = () => {
  const [showButton, setShowButton] = useState(false);
  const { i18n } = useTranslation();
  const location = useLocation();

  // Effect to set page direction (LTR/RTL) based on selected language
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);


  useEffect(() => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang && i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, []);


  // Effect to track scroll position and toggle scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll smoothly to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Determine if current page is About or Product Info (to hide Navbar if needed)
  const isAboutPage = location.pathname.includes('/about');
  const isProductInfoPage = location.pathname.includes('/product-info');

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Show Navbar only if not About or Product Info page */}
      {!isAboutPage && !isProductInfoPage && <Navbar />}

      {/* Main content rendered from Outlet (child routes) */}
      <div className="grow mx-auto w-full">
        <Outlet />
      </div>

      {/* Footer always visible */}
      <Footer />

      {/* Scroll-to-top button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-white cursor-pointer text-white p-3 rounded-full shadow-md transition-all duration-300"
        >
          <ChevronDoubleUp color="#025043" size={24} />
        </button>
      )}
    </div>
  );
};

export default Layout;
