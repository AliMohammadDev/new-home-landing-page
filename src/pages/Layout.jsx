import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import ChevronDoubleUp from '../assets/icons/ChevronDoubleUp';

const Layout = () => {
  const [showButton, setShowButton] = useState(false);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const location = useLocation();
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
          className="fixed bottom-6 right-6 bg-white cursor-pointer text-white p-3 rounded-full shadow-md transition-all duration-300"
        >
          <ChevronDoubleUp color="#025043" size={24} />
        </button>
      )}
    </div>
  );
};

export default Layout;
