import { Link, NavLink, useLocation } from 'react-router-dom';
import ChevronDownIcon from '../assets/icons/ChevronDownIcon.jsx';
import ChevronRightIcon from '../assets/icons/ChevronRightIcon.jsx';
import CartIcon from '../assets/icons/CartIcon.jsx';
import FavoriteIcon from '../assets/icons/FavoriteIcon.jsx';
import HamburgerIcon from '../assets/icons/HamburgerIcon.jsx';
import PlusIcon from '../assets/icons/PlusIcon.jsx';
import MinusIcon from '../assets/icons/MinusIcon.jsx';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import cartImage from '../assets/images/addToCart.svg';
import { useGetProfile } from '../api/auth.jsx';
import { useGetCategories } from '../api/categories.jsx';
import { useDecreaseItem, useGetAllCartItems, useIncreaseItem, useRemoveFromCartItem } from '../api/cart.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import ProfileSwitcher from './ProfileSwitcher.jsx';
import { useTranslation } from 'react-i18next';
import ChevronLeftIcon from '../assets/icons/ChevronLeftIcon.jsx';
import homeLogoWhite from "../assets/images/home-logo-white.svg";
import homeLogoGreen from "../assets/images/home-logo-green.png";

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [isLangOpen, setIsLangOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  const { data: categories = [] } = useGetCategories();
  const { data: profile } = useGetProfile();
  const { data: cartData = { data: [], cart_total: 0 } } = useGetAllCartItems();
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const location = useLocation();
  const isProductsActive = location.pathname.startsWith('/products');

  useEffect(() => {
    const closeAllMenus = () => {
      setIsCartOpen(false);
      setIsProductMenuOpen(false);
      setIsMobileMenuOpen(false);
      setIsCategoryMenuOpen(false);
    };
    closeAllMenus();
    const handleOutsideClick = () => setIsCartOpen(false);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [location.pathname]);

  const { mutate: increaseItem } = useIncreaseItem();
  const { mutate: decreaseItem } = useDecreaseItem();
  const { mutate: removeItem } = useRemoveFromCartItem();

  return (
    <div
      className="absolute top-0 left-0 w-full flex justify-between items-center px-4 lg:px-8 py-2 lg:py-4 md:py-1 z-50"
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* 1. Logo Section */}
      <div className="shrink-0">
        <Link to={'/'}>
          {
            isRTL ? (
              <img
                src={homeLogoGreen}
                alt="Logo"
                className="h-14 w-auto"
              />
            ) : (
              <img
                src={homeLogoWhite}
                alt="Logo"
                className="h-14 w-auto"
              />
            )
          }
        </Link>
      </div>

      {/* 2. Desktop Navigation (Hidden on Mobile) */}
      <nav
        className="hidden lg:flex gap-8 mr-10 font-[Expo-arabic] items-center"
      >
        <NavLink to="/" className={({ isActive }) => clsx(isActive ? 'text-[#E2995E]' : 'text-gray-300 hover:text-white')}>{t('navbar.home')}</NavLink>
        <NavLink to="/contact" className={({ isActive }) => clsx(isActive ? 'text-[#E2995E]' : 'text-gray-300 hover:text-white')}>{t('navbar.contact')}</NavLink>
        <NavLink to="/about" className={({ isActive }) => clsx(isActive ? 'text-[#E2995E]' : 'text-gray-300 hover:text-white')}>{t('navbar.about_us')}</NavLink>

        <div className="relative">
          <button
            onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
            className={clsx('flex items-center gap-2 cursor-pointer transition', isProductsActive ? 'text-[#E2995E]' : 'text-gray-300 hover:text-white')}
          >
            {t('navbar.all_products')}
            <ChevronDownIcon className="scale-75 text-primary duration-150 sm:scale-100" />
          </button>

          <div
            className={clsx(
              'absolute top-full font-[Expo-arabic] mt-2 rounded-3xl w-70 py-6 z-50 border border-white/20 backdrop-blur-xl shadow-lg transition-all duration-300 ease-in-out origin-top',
              isProductMenuOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-90 invisible',
              i18n.language === 'ar' ? 'right-0' : 'left-0'
            )}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          >
            {categories.map((category) => (
              <NavLink
                key={category.id}
                to={`/products/${category.name}`}
                className={({ isActive }) => clsx('flex items-center gap-2 px-4 py-3 rounded-xl transition hover:underline underline-offset-4', isActive ? 'text-[#E2995E]' : 'text-white', 'justify-between')}
                onClick={() => setIsProductMenuOpen(false)}
              >
                {category.name}
                {i18n.language === 'ar' ? (
                  <ChevronLeftIcon color="white" className="text-primary duration-150 sm:scale-100" />
                ) : (
                  <ChevronRightIcon color="white" className="text-primary duration-150 sm:scale-100" />
                )}              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* 3. Mobile Hamburger & Desktop Actions (Always at the end) */}
      <div className="flex items-center gap-2">
        {/* Mobile Hamburger - Hidden on LG */}
        <div className="lg:hidden relative z-50">
          <button
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cursor-pointer p-2 relative z-50"
          >
            <HamburgerIcon />
          </button>
        </div>


        {/* Desktop Actions (Cart, Profile, Lang) - Hidden on Mobile */}
        <div className="hidden lg:flex items-center">
          {profile ? (
            <div className="flex items-center gap-1">
              {/* Cart Button */}
              <div className="relative">
                <button
                  type='button'
                  onClick={(e) => { e.stopPropagation(); setIsCartOpen((prev) => !prev); }}
                  className="bg-[#EDEAE2] text-[#025043] px-4 py-2 rounded-3xl font-[Expo-arabic] hover:bg-white flex items-center gap-2 cursor-pointer transition-all"
                >
                  {t('cart.button')}
                  <CartIcon />
                </button>

                <div className={clsx(
                  'absolute top-full font-[Expo-arabic] z-50 shadow-lg w-90 py-6 rounded-2xl transition-all duration-300 ease-in-out origin-top',
                  i18n.language === 'ar' ? 'left-0 -mt-10' : 'right-1 -mr-3 -mt-10',
                  isCartOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-90 invisible'
                )}>
                  <div className={clsx("absolute inset-0 z-[-1] rounded-2xl", i18n.language === 'ar' && "scale-x-[-1]")}
                    style={{ backgroundImage: `url(${cartImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />

                  <div className="text-white text-sm w-full px-4 pt-15 pb-4">

                    <div
                      className="w-full max-w-xs h-[300px] overflow-y-auto px-2"
                      style={{ direction: 'ltr' }}
                    >

                      <div
                        className="w-full"
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                        style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
                      >
                        {/* Header */}
                        <div className="grid grid-cols-3 gap-2 font-semibold border-b border-white/30 pb-2 mb-3">
                          <span>{t('cart.product')}</span>
                          <span>{t('cart.price')}</span>
                          <span>{t('cart.qty')}</span>
                        </div>

                        {cartData.data.length === 0 ? (
                          <div className="text-center py-8 font-medium">{t('cart.empty')}</div>
                        ) : (
                          <>
                            {cartData.data.map((item) => (
                              <div key={item.id} className="grid grid-cols-3 gap-4 mb-3 items-center">
                                <img src={item.product_variant.image} alt={item.product_variant.name} className="object-cover rounded w-16 h-16" />
                                <span className="font-medium text-center">{item.total_price} $</span>
                                <div className="relative flex items-center border rounded-2xl bg-white text-[#025043] px-1 py-1">
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className={clsx(
                                      "absolute -top-6 text-white text-[10px] underline cursor-pointer hover:text-red-400",
                                      i18n.language === 'ar' ? "right-0" : "left-0"
                                    )}
                                  >
                                    {t('cart.remove')}
                                  </button>
                                  <button onClick={(e) => { e.stopPropagation(); increaseItem(item.id); }} className="p-1 bg-[#025043] text-white rounded-lg cursor-pointer scale-75"><PlusIcon /></button>
                                  <span className="px-4 font-bold">{item.quantity}</span>
                                  <button onClick={(e) => { e.stopPropagation(); decreaseItem(item.id); }} className="p-1 bg-[#025043] text-white rounded-lg cursor-pointer scale-75"><MinusIcon /></button>
                                </div>
                              </div>
                            ))}

                            <div className="border-b border-white/30 my-4"></div>

                            <div className="flex flex-col items-center">
                              <span className="font-semibold">{t('cart.total')}</span>
                              <span className="font-bold text-lg">{cartData.cart_total} $</span>
                            </div>

                            <Link to="/checkouts">
                              <button onClick={() => setIsCartOpen(false)} className="text-[#025043] border rounded-2xl cursor-pointer bg-white font-[Expo-arabic] py-2 mt-4 w-full flex justify-center hover:bg-gray-100 transition-colors">
                                {t('cart.checkout')}
                              </button>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div onClick={(e) => e.stopPropagation()} className="bg-[#025043] p-2 rounded-full hover:bg-[#507771] transition-all duration-200">
                <Link to="/wishlists"><FavoriteIcon /></Link>
              </div>
              <ProfileSwitcher setIsCartOpen={setIsCartOpen} />
              <LanguageSwitcher />
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="bg-[#EDEAE2] text-[#025043] px-4 py-2 rounded-3xl font-[Expo-arabic] hover:bg-[#025043] hover:text-[#EDEAE2] transition">{t('navbar.login')}</Link>
              <LanguageSwitcher />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={clsx(
              'absolute top-2 w-2/3 max-w-xs h-auto max-h-[90vh] overflow-y-auto font-[Expo-arabic]',
              'bg-white/10 backdrop-blur-xl shadow-lg border border-white/20 rounded-2xl py-8 px-6 text-white transition-all duration-300',
              i18n.language === 'ar' ? 'left-1' : 'right-1'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2 font-[Expo-bold] w-full text-sm items-start">
              <NavLink to="/" className="block px-4 py-2 hover:bg-white/10 rounded">{t('navbar.home')}</NavLink>
              <NavLink to="/contact" className="block px-4 py-2 hover:bg-white/10 rounded">{t('navbar.contact')}</NavLink>
              <NavLink to="/about" className="block px-4 py-2 hover:bg-white/10 rounded">{t('navbar.about_us')}</NavLink>

              <div className="w-full">
                <button
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                  className="w-full px-4 py-2 flex items-center justify-between hover:bg-white/10 rounded"
                >
                  <span>{t('navbar.all_products')}</span>
                  <ChevronDownIcon className={clsx('transition-transform', isCategoryMenuOpen && 'rotate-180')} />
                </button>

                {isCategoryMenuOpen && (
                  <div className="flex flex-col pl-4 pr-4 mt-1 border-l border-white/10">
                    {categories.map((cat) => (
                      <NavLink
                        key={cat.id}
                        to={`/products/${cat.name.toLowerCase()}`}
                        className="py-2 text-xs text-gray-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {cat.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              {profile ? (
                <>
                  <NavLink to="/profile" className="px-4 py-2">{t('navbar.my_profile')}</NavLink>
                  <NavLink to="/carts" className="px-4 py-2">{t('navbar.my_cart')}</NavLink>
                  <NavLink to="/logout" className="px-4 py-2">{t('navbar.logout')}</NavLink>
                </>
              ) : (
                <NavLink to="/login" className="px-4 py-2">{t('navbar.login')}</NavLink>
              )}

              <div className="w-full border-t border-white/10 mt-4 pt-4 flex items-center justify-around gap-2">
                <button
                  onClick={() => changeLanguage('en')}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-[Expo-bold] transition-all duration-200 border",
                    i18n.language === 'en'
                      ? "bg-white text-[#025043] border-white shadow-lg"
                      : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                  )}
                >
                  <img
                    src="https://flagcdn.com/w40/gb.png"
                    alt="English"
                    className="w-4 h-3 object-cover rounded-sm"
                  />
                  ENGLISH
                </button>

                <button
                  onClick={() => changeLanguage('ar')}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-[Expo-bold] transition-all duration-200 border",
                    i18n.language === 'ar'
                      ? "bg-white text-[#025043] border-white shadow-lg"
                      : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                  )}
                >
                  <img
                    src="https://flagcdn.com/w40/sy.png"
                    alt="Arabic"
                    className="w-4 h-3 object-cover rounded-sm"
                  />
                  العربية
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;