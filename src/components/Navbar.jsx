import { Link, NavLink, useLocation } from 'react-router-dom';
import ChevronDownIcon from '../assets/icons/ChevronDownIcon.jsx';
import ChevronRightIcon from '../assets/icons/ChevronRightIcon.jsx';
import CartIcon from '../assets/icons/CartIcon.jsx';
import FavoriteIcon from '../assets/icons/FavoriteIcon.jsx';
import HamburgerIcon from '../assets/icons/HamburgerIcon.jsx';
import PlusIcon from '../assets/icons/PlusIcon.jsx';
import MinusIcon from '../assets/icons/MinusIcon.jsx';
import { useState } from 'react';
import clsx from 'clsx';
import { useEffect } from 'react';
import cartImage from '../assets/images/addToCart.svg';
import { useGetProfile } from '../api/auth.jsx';
import { useGetCategories } from '../api/categories.jsx';
import { useDecreaseItem, useGetAllCartItems, useIncreaseItem, useRemoveFromCartItem } from '../api/cart.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import ProfileSwitcher from './ProfileSwitcher.jsx';
import { useTranslation } from 'react-i18next';


const Navbar = () => {
  const { i18n, t } = useTranslation();
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
    setIsCartOpen(false);
    setIsProductMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsCategoryMenuOpen(false);
  }, [location.pathname]);


  const { mutate: increaseItem } = useIncreaseItem();
  const { mutate: decreaseItem } = useDecreaseItem();
  const { mutate: removeItem } = useRemoveFromCartItem();



  return (
    /* Navbar */
    <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4 lg:px-8 py-2 lg:py-4 md:py-1 z-50">
      {/* Logo */}
      <Link to={'/'}>
        <img
          src="https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765366635/home-logo-white_c2et5l.svg"
          alt="Logo"
          className="h-14 w-auto"
        />
      </Link>

      {/* Desktop Nav */}
      <nav
        className="hidden lg:flex gap-8 font-[Expo-arabic] items-center"
        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            clsx(
              isActive ? 'text-[#E2995E]' : 'text-gray-300 hover:text-white'
            )
          }
        >
          {t('navbar.home')}
        </NavLink>

        {/* Contact */}
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            clsx(
              isActive ? 'text-[#E2995E]' : 'text-gray-300 hover:text-white'
            )
          }
        >
          {t('navbar.contact')}
        </NavLink>

        {/* About */}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            clsx(
              isActive ? 'text-[#E2995E]' : 'text-gray-300 hover:text-white'
            )
          }
        >
          {t('navbar.about_us')}
        </NavLink>

        {/* Products Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
            className={clsx(
              'flex items-center gap-2 cursor-pointer transition',
              isProductsActive ? 'text-[#E2995E]' : 'text-gray-300 hover:text-white'
            )}
          >
            {t('navbar.all_products')}
            <ChevronDownIcon className="scale-75 text-primary duration-150 sm:scale-100" />
          </button>

          {/* Dropdown Menu */}
          <div
            className={clsx(
              'absolute top-full font-[Expo-arabic] mt-2 rounded-3xl w-70 py-6 z-50 border border-white/20 backdrop-blur-xl shadow-lg transition-all duration-300 ease-in-out origin-top',
              isProductMenuOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-90 invisible',
              i18n.language === 'ar' ? 'right-0' : 'left-0' // تأكد من تموضع القائمة المنسدلة
            )}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          >
            {categories.map((category) => (
              <NavLink
                key={category.id}
                to={`/products/${category.name.toLowerCase()}`}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-2 px-4 py-3 rounded-xl transition hover:underline underline-offset-4',
                    isActive ? 'text-[#E2995E]' : 'text-white',
                    // لا تضع flex-row-reverse هنا، dir="rtl" سيهتم بالأمر
                    'justify-between'
                  )
                }
                onClick={() => setIsProductMenuOpen(false)}
              >
                {category.name}
                <ChevronRightIcon
                  color="white"
                  className={clsx('text-primary duration-150 sm:scale-100', i18n.language === 'ar' && 'rotate-180')}
                />
              </NavLink>
            ))}
          </div>
        </div>
      </nav>



      {/* Mobile Menu Button */}
      <div className="lg:hidden top-4 right-4 z-50">
        <button
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="cursor-pointer"
        >
          <HamburgerIcon />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className={clsx(
              'absolute top-2 w-2/3 max-w-xs lg:hidden z-40 h-auto max-h-[90vh] overflow-y-auto',
              'font-[Expo-arabic]',
              'bg-white/10 backdrop-blur-xl shadow-lg border border-white/20 rounded-2xl',
              'flex flex-col items-stretch justify-start py-8 px-6 text-white',
              'transition-all duration-300 ease-in-out',
              i18n.language === 'ar' ? 'right-auto left-1 text-right' : 'right-1 left-auto text-left'
            )}
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }}
          >
            <div className={clsx(
              "flex flex-col gap-2 font-[Expo-bold] w-full text-sm",
              i18n.language === 'ar' ? 'items-start' : 'items-start'
            )}>
              <NavLink
                to="/"
                className="block px-4 py-2 hover:bg-[#9f9f9f9f] hover:rounded transition-colors"
              >
                {t('navbar.home')}
              </NavLink>

              <NavLink
                to="/contact"
                className="block px-4 py-2 hover:bg-[#9f9f9f9f] hover:rounded transition-colors"
              >
                {t('navbar.contact')}
              </NavLink>

              <NavLink
                to="/about"
                className="block px-4 py-2 hover:bg-[#9f9f9f9f] hover:rounded transition-colors"
              >
                {t('navbar.about_us')}
              </NavLink>

              {/* Categories dropdown */}
              <div className="flex flex-col">
                <button
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                  className="px-4 py-2 hover:bg-[#9f9f9f9f] hover:rounded transition-colors flex items-center justify-between gap-2"
                >
                  <span>{t('navbar.all_products')}</span>
                  <ChevronDownIcon
                    className={clsx(
                      'transition-transform duration-300',
                      isCategoryMenuOpen && 'rotate-180'
                    )}
                  />
                </button>

                <div
                  className={clsx(
                    'overflow-hidden transition-all duration-300 flex flex-col',
                    isCategoryMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  {categories.map((category) => (
                    <NavLink
                      key={category.id}
                      to={`/products/${category.name.toLowerCase()}`}
                      className="py-2 px-6 text-sm text-gray-200 font-[Expo-light] hover:underline underline-offset-4"
                    >
                      {category.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Profile / Auth Links */}
              {profile ? (
                <>
                  <NavLink to="/profile" className="block px-4 py-2 hover:bg-[#9f9f9f9f] hover:rounded transition-colors">
                    {t('navbar.my_profile')}
                  </NavLink>
                  <NavLink to="/carts" className="block px-4 py-2 hover:bg-[#9f9f9f9f] hover:rounded transition-colors">
                    {t('navbar.my_cart')}
                  </NavLink>
                  <NavLink to="/wishlists" className="block px-4 py-2 hover:bg-[#9f9f9f9f] hover:rounded transition-colors">
                    {t('navbar.my_wishlist')}
                  </NavLink>
                  <NavLink to="/my-orders" className="block px-4 py-2 hover:bg-[#9f9f9f9f] hover:rounded transition-colors">
                    {t('navbar.my_orders')}
                  </NavLink>
                  <NavLink to="/logout" className="block px-4 py-2 hover:bg-[#9f9f9f9f] hover:rounded transition-colors">
                    {t('navbar.logout')}
                  </NavLink>
                </>
              ) : (
                <NavLink to="/login" className="block px-4 py-2 hover:bg-[#9f9f9f9f] hover:rounded transition-colors">
                  {t('navbar.login')}
                </NavLink>
              )}

              {/* Language dropdown */}
              <div className="flex flex-col">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="px-4 py-2 hover:bg-[#9f9f9f9f] hover:rounded transition-colors flex items-center justify-between gap-2"
                >
                  <span>{t('navbar.Language')}</span>
                  <ChevronDownIcon
                    className={clsx(
                      'transition-transform duration-300',
                      isLangOpen && 'rotate-180'
                    )}
                  />
                </button>

                <div
                  className={clsx(
                    'overflow-hidden transition-all duration-300 flex flex-col',
                    isLangOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <button
                    onClick={() => changeLanguage('en')}
                    className={clsx(
                      "py-2 px-6 text-sm text-gray-200 font-[Expo-light] hover:bg-[#9f9f9f9f] transition-colors",
                      i18n.language === 'ar' ? 'text-right' : 'text-left'
                    )}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => changeLanguage('ar')}
                    className={clsx(
                      "py-2 px-6 text-sm text-gray-200 font-[Expo-light] hover:bg-[#9f9f9f9f] transition-colors",
                      i18n.language === 'ar' ? 'text-right' : 'text-left'
                    )}
                  >
                    AR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}


      {/* Cart & Profile & Language */}
      {profile ? (
        <div className="hidden lg:flex relative items-center gap-4">

          {/* Cart Button */}
          <div className="relative">
            <button
              aria-expanded={isCartOpen}
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="bg-[#EDEAE2] text-[#025043] px-4 py-2 rounded-3xl font-[Expo-arabic] 
                   hover:bg-[#EDEAE2] flex items-center gap-2 cursor-pointer"
            >
              Cart
              <CartIcon />
            </button>

            {/* Cart Dropdown */}
            <div
              className={clsx(
                'absolute top-full right-0 font-[Expo-arabic] z-50 shadow-lg w-90 py-6 rounded-2xl transition-all duration-300 ease-in-out origin-top',
                isCartOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-90 invisible'
              )}
              style={{
                backgroundImage: `url(${cartImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="text-white text-sm w-full px-4 pt-15 pb-4">
                <div className="inline-block text-left w-full max-w-xs h-[300px] overflow-y-auto">
                  {/* Header */}
                  <div className="grid grid-cols-3 gap-2 font-semibold border-b border-white/30 pb-2 mb-3">
                    <span>Product</span>
                    <span>Price</span>
                    <span>QTY</span>
                  </div>

                  {cartData.data.length === 0 ? (
                    <div className="text-center py-8 font-medium">Your cart is empty.</div>
                  ) : (
                    <>
                      {cartData.data.map((item) => (
                        <div key={item.id} className="grid grid-cols-3 gap-4 mb-3 items-center">
                          <img
                            src={item.product_variant.image}
                            alt={item.product_variant.name}
                            className="object-cover rounded w-16 h-16"
                          />
                          <span className="font-medium">{item.total_price} $</span>
                          <div className="relative flex items-center border rounded-2xl bg-white text-[#025043] px-2 py-1">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="absolute -top-6 left-0 text-white text-xs underline hover:text-red-400"
                            >
                              Remove
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                increaseItem(item.id);
                              }}
                              className="p-1 bg-[#025043] text-white rounded-xl cursor-pointer"
                            >
                              <PlusIcon />
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                decreaseItem(item.id);
                              }}
                              className="p-1 bg-[#025043] text-white rounded-xl cursor-pointer"
                            >
                              <MinusIcon />
                            </button>
                          </div>
                        </div>
                      ))}

                      <div className="border-b border-white/30 my-4"></div>

                      <div className="flex flex-col items-center">
                        <span className="font-semibold">TOTAL</span>
                        <span className="font-bold text-lg">{cartData.cart_total} $</span>
                      </div>

                      <Link to="/checkouts">
                        <button
                          onClick={() => setIsCartOpen(false)}
                          className="text-[#025043] border rounded-2xl bg-white font-[Expo-arabic] py-2 mt-4 w-full flex justify-center"
                        >
                          CHECKOUT NOW
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Wishlist */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#025043] p-2 rounded-full hover:bg-[#507771] transition-all duration-200"
          >
            <Link to="/wishlists">
              <FavoriteIcon />
            </Link>
          </div>

          {/* Profile Dropdown */}
          <ProfileSwitcher setIsCartOpen={setIsCartOpen} />

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      ) : (
        <div className="hidden lg:flex gap-2">
          <Link
            to="/login"
            className="bg-[#EDEAE2] text-[#025043] px-4 py-2 rounded-3xl font-[Expo-arabic] hover:bg-[#025043] hover:text-[#EDEAE2] transition"
          >
            {t('navbar.login')}
          </Link>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      )}

    </div >
  );
};

export default Navbar;
