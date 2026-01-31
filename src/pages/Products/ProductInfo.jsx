import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import LeftIcon from '../../assets/icons/LeftIcon';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon';
import { useGetProductVariant } from '../../api/products';
import { useGetCategories } from '../../api/categories';
import { addToast } from '@heroui/react';
import { useAddToCartItem, useGetAllCartItems } from '../../api/cart';
import { useAddWishlist, useGetAllWishlist } from '../../api/wishlist';
import { useGetProfile } from '../../api/auth';
import RatingStars from '../../components/RatingStars';
import { useSubmitReview } from '../../api/reviews';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useEffect } from 'react';
import WishListIcon from '../../assets/icons/WishListIcon';
import RelatedProductSlider from '../../components/Products/RelatedProductSlider';
import CartIcon2 from '../../assets/icons/CartIcon2';
import homeLogoGreen from "../../assets/images/home-logo-green.png";
import HamburgerIcon from '../../assets/icons/HamburgerIcon';
import ChevronDownIcon from '../../assets/icons/ChevronDownIcon';
import clsx from 'clsx';


const ProductInfo = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  const { variantId } = useParams();
  const { data } = useGetProductVariant(variantId);
  const { data: categories = [] } = useGetCategories();
  const { data: wishlistData } = useGetAllWishlist();
  const { data: user } = useGetProfile();
  const { mutate: addToCart, isLoading } = useAddToCartItem();
  const { mutate: addWishlist } = useAddWishlist();
  const product = data?.product;
  const variant = data;
  const [activeImage, setActiveImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [oldPrice, setOldPrice] = useState(null);
  const [currentSku, setCurrentSku] = useState(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [currentReviewsCount, setCurrentReviewsCount] = useState(0);
  const { data: cartData } = useGetAllCartItems();
  const { data: profile } = useGetProfile();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const [displayImages, setDisplayImages] = useState([]);
  // change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  useEffect(() => {
    if (selectedMaterial) {
      setCurrentRating(selectedMaterial.reviews_avg || 0);
      setCurrentReviewsCount(selectedMaterial.reviews_count || 0);
      setCurrentPrice(selectedMaterial.final_price);
      setOldPrice(selectedMaterial.price);
      setCurrentSku(selectedMaterial.sku);
      setSelectedVariantId(selectedMaterial.variant_id);

      const variantImages = selectedMaterial.images || [];

      if (variantImages.length > 0) {
        setDisplayImages(variantImages);
        setActiveImage(variantImages[0]);
      } else {
        const productImages = data?.product_all_images || [];
        setDisplayImages(productImages);
        if (productImages.length > 0) setActiveImage(productImages[0]);
      }
    }
  }, [selectedMaterial, data]);

  useEffect(() => {
    if (product?.available_options?.length > 0) {
      const firstColor = product.available_options[0];
      const firstSize = firstColor.available_sizes[0];
      const firstMaterial = firstSize.available_materials[0];

      setSelectedColor(firstColor);
      setSelectedSize(firstSize);
      setSelectedMaterial(firstMaterial);
      setSelectedVariantId(firstMaterial.variant_id);
      setCurrentPrice(firstMaterial.final_price);
      setOldPrice(firstMaterial.price);
      setCurrentSku(firstMaterial.sku);
    }
  }, [product]);

  useEffect(() => {
    if (data?.product_all_images?.length > 0) {
      setActiveImage(data.product_all_images[0]);
    } else if (data?.image) {
      setActiveImage(data.image);
    }
  }, [data]);

  const activeCategoryId = product?.category?.id;

  // Add to cart 
  const handleAddCartItem = (variant, packageId = null) => {
    if (!user) {
      addToast({
        title: t('cart.button'),
        description: t('wishlist.loginRequired'),
        color: 'warning',
        duration: 4000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }

    addToCart(
      {
        product_variant_id: variant.id,
        product_variant_package_id: packageId,
        quantity: 1,
      },
      {
        onSuccess: () => {
          addToast({
            title: t('cart.button'),
            description: t('essential_to_prep.cart_success', {
              product: variant.name,
            }),
            color: 'success',
            duration: 4000,
            isClosable: true,
          });
        },
        onError: () => {
          addToast({
            title: t('cart.button'),
            description: t('essential_to_prep.cart_error', {
              product: variant.name,
            }),
            color: 'error',
            duration: 4000,
            isClosable: true,
          });
        },
      }
    );
  };

  const wishlistProductIds =
    wishlistData?.data?.map(item => item.product_variant?.id) || [];

  const isProductInWishlist = (variantId) => {
    return wishlistProductIds.includes(variantId);
  };

  const handleAddWishlist = () => {
    if (!user) {
      addToast({
        title: t('wishlist.title'),
        description: t('wishlist.loginRequired'),
        color: 'warning',
      });
      navigate('/login');
      return;
    }
    addWishlist(
      selectedVariantId,
      {
        onSuccess: (res) => {
          const isRemoved = res.status === 'removed';
          addToast({
            title: t('wishlist.title'),
            description: isRemoved
              ? t('wishlist.removedSuccess')
              : t('wishlist.addedSuccess'),
            color: isRemoved ? "warning" : "success",
            duration: 2000,
          });
        },
        onError: (error) => {
          addToast({
            title: t('wishlist.title'),
            description: error.message,
            color: 'error',
          });
        },
      }
    );
  };
  const { mutate: submitReview } = useSubmitReview();
  const handleRateProduct = (variantId, rating) => {
    if (!user) {
      addToast({
        title: t('rating.title'),
        description: t('rating.loginRequired'),
        color: 'warning',
        duration: 4000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }
    submitReview(
      {
        product_variant_id: variantId,
        rating,
      },
      {
        onSuccess: (data) => {
          addToast({
            title: t('rating.successTitle'),
            description: `${t('rating.successMessage')} : ${data.rating}`,
            color: 'success',
          });
        },
        onError: (error) => {
          console.error(error);
          addToast({
            title: t('rating.title'),
            description: error.response?.data?.message || t('rating.error'),
            color: 'error',
          });
        }
      }
    );
  };

  if (!data || !product || !variant) {
    return <p className="text-center mt-20">Loading product...</p>;
  }


  // related products
  const relatedVariants =
    categories
      ?.find(cat => cat.id === activeCategoryId)
      ?.products
      ?.filter(p => p.id !== product.id)
      .flatMap(p =>
        p.variants.map(v => ({
          ...v,
          product: {
            ...v.product,
            name: p.name,
            id: p.id
          }
        }))
      )
      ?.slice(0, 10) || [];


  const calculateDiscountPercentage = (original, final) => {
    if (!original || !final || original <= final) return null;
    const discount = ((original - final) / original) * 100;
    return Math.round(discount);
  };

  const discountPercentage = calculateDiscountPercentage(oldPrice || variant?.price, currentPrice || variant?.final_price);

  return (
    <div className="w-full text-black px-4 md:px-10 lg:px-20 py-10 bg-white min-h-screen relative" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Navbar Section */}
      <div className={`absolute top-0 left-0 right-0 px-4 md:px-10 lg:px-20 h-20 z-20 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>

        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 cursor-pointer transition-all active:scale-90"
          >
            <LeftIcon />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-0 md:gap-0 lg:gap-0">
          <button
            onClick={() => navigate('/carts')}
            className="p-2 cursor-pointer  transition-all active:scale-90 relative"
          >
            <CartIcon2 />
            {cartData?.data?.length > 0 && (
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>

          <button
            onClick={() => {
              navigate('/')
            }}
            className="p-2  cursor-pointer  transition-all active:scale-90">
            <img src={homeLogoGreen} alt="Logo" className="h-14 w-auto" />
          </button>
        </div>


        <div className="lg:hidden relative z-50">
          <button
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cursor-pointer p-2 relative z-50"
          >
            <HamburgerIcon color="black" />
          </button>
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
                          to={`/products/${cat.id}`}
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

      {/* Title */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl text-center font-bold">
        {t('productInfo.description_title')}
      </h1>
      <hr className="mt-5 border-[#025043]" />

      {/* Category Menu */}
      <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 mt-4 text-sm md:text-base">
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;
          return (
            <Link to={`/products/${category.id}`}
              key={category.id}
              className={`px-5 py-1.5 rounded-full text-sm md:text-base transition-all duration-300 shadow-sm ${isActive ? 'bg-[#025043] text-white font-bold scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>

      <hr className="mt-4 border-[#025043]" />

      {/* Main Section */}
      <div className="w-full flex flex-col md:flex-row gap-4 items-start relative mt-2">

        {/* Left Image Section */}
        <div className="w-full md:w-5/12">

          {/* Image */}
          <div className="w-full flex justify-start">
            <img
              src={activeImage}
              alt={product?.name}
              className="w-full max-h-[420px] object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="w-full mt-4 flex justify-center">
            <div className="flex gap-2 overflow-x-auto py-2 scroll-smooth hide-scrollbar max-w-xs md:max-w-md">
              {displayImages.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`
          shrink-0 
          w-12 h-12 md:w-14 md:h-14 
          rounded-lg border-[1.5px] transition-all cursor-pointer duration-300
          ${activeImage === imgUrl
                      ? 'border-[#025043] scale-110 shadow-sm ring-1 ring-[#025043]/30'
                      : 'border-gray-100 opacity-60 hover:opacity-100'}
        `}
                >
                  <img
                    src={imgUrl}
                    className="w-full h-full object-cover rounded-md"
                    alt={`thumbnail-${index}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full flex flex-col md:flex-row gap-4 relative">
          {/* Left Subsection (Details) */}
          <div className={`md:w-1/2 space-y-4 ${isRTL ? 'pe-4 text-right' : 'ps-4 text-left'}`}>
            <h2 className="text-2xl md:text-3xl font-semibold font-[Expo-arabic]">
              {product?.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {t('productInfo.product_code')} : <span className="text-black font-medium">{currentSku || variant?.sku}</span>
            </p>

            {/* Price */}

            {/* Price Section */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="font-bold text-black text-3xl">
                  {currentPrice || variant?.final_price} $
                </span>

                {discountPercentage > 0 && (
                  <span className="bg-yellow-400 text-black text-[10px] md:text-xs font-[Expo-arabic] px-2 py-1 rounded-md shadow-sm animate-pulse">
                    {discountPercentage}% OFF PRP
                  </span>
                )}
              </div>

              {Number(selectedMaterial?.discount || variant?.discount) > 0 && (
                <span className="line-through text-gray-400 text-sm">
                  {oldPrice || variant?.price} $
                </span>
              )}
            </div>

            {/* Colors */}
            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('productInfo.color')}</span>
              <div className="flex gap-3 mt-3">
                {product.available_options.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => {
                      setSelectedColor(color);
                      const firstSize = color.available_sizes[0];
                      const firstMaterial = firstSize.available_materials[0];
                      setSelectedSize(firstSize);
                      setSelectedMaterial(firstMaterial);
                      setSelectedVariantId(firstMaterial.variant_id);

                      setCurrentPrice(firstMaterial.final_price);
                      setOldPrice(firstMaterial.price);
                      setCurrentSku(firstMaterial.sku);
                    }}
                    className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all shadow-sm ${selectedColor?.id === color.id ? 'border-gray-200 scale-125 ring-2 ring-gray-100' : 'border-transparent'
                      }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('productInfo.size')}</span>
              <div className="flex gap-2 mt-3 flex-wrap">
                {selectedColor?.available_sizes.map((size) => {
                  const isActive = selectedSize?.id === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => {
                        setSelectedSize(size);
                        const firstMaterial = size.available_materials[0];
                        setSelectedMaterial(firstMaterial);
                        setSelectedVariantId(firstMaterial.variant_id);
                        setCurrentPrice(firstMaterial.final_price);
                        setOldPrice(firstMaterial.price);
                        setCurrentSku(firstMaterial.sku);
                      }}
                      className={`px-4 py-2 border rounded-lg cursor-pointer text-xs font-bold transition-all ${isActive ? 'bg-[#025043] text-white border-[#025043]' : 'bg-white border-gray-200 text-gray-600 hover:border-[#025043]'
                        }`}
                    >
                      {size.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Material Selection */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {t('productInfo.material')}
              </h4>
              <div className="flex gap-2 flex-wrap">
                {selectedSize?.available_materials.map((material) => {
                  const isActive = selectedMaterial?.id === material.id;
                  const materialName =
                    material?.name?.[i18n.language] ??
                    material?.name ??
                    'N/A';

                  return (
                    <button
                      key={material.id}
                      onClick={() => {
                        setSelectedMaterial(material);
                        setSelectedVariantId(material.variant_id);
                        setCurrentSku(material.sku);
                        setCurrentPrice(material.final_price);
                        setOldPrice(material.price);
                      }}
                      className={`px-4 py-2 border rounded-lg text-xs cursor-pointer font-bold transition-all ${isActive ? 'bg-[#025043] text-white border-[#025043]' : 'bg-white border-gray-200 text-gray-600 hover:border-[#025043]'
                        }`}
                    >
                      {materialName || 'N/A'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rating */}
            <div className="font-bold font-[Expo-arabic]">
              {t('productInfo.rate')}
              <div className="flex items-center gap-2 text-sm mt-1">
                <RatingStars
                  rating={Number(currentRating)}
                  onRate={(star) => handleRateProduct(selectedVariantId, star)}
                />
                <span>({currentReviewsCount})</span>
              </div>
            </div>

            {/* Add to Cart + Add to Favorites in same line */}
            {/* Container for Buttons */}
            <div className="flex items-center gap-3 mt-8 w-full">

              {/* Add to Cart Button Group */}
              <button
                onClick={() => handleAddCartItem({ id: selectedVariantId })}
                disabled={isLoading}
                className="relative flex-1 h-14 bg-black text-white rounded-xl cursor-pointer 
             flex items-center justify-between px-6 transition-all 
             group disabled:bg-gray-400 overflow-hidden active:scale-95"
              >
                <span className="font-[Expo-arabic]  text-sm lg:text-lg z-10">
                  {isLoading ? t('productInfo.adding') : t('productInfo.add_to_cart')}
                </span>

                {/* Arrow */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/carts');
                  }}
                  className={`
      w-9 h-9 
      bg-white/20 
      flex items-center justify-center 
      rounded-full 
      transition-all duration-300
      group-hover:bg-white/30
      group-hover:scale-110
      ${isRTL
                      ? 'group-hover:-translate-x-1 rotate-180'
                      : 'group-hover:translate-x-1'}
    `}
                >
                  <ChevronRightIcon color="white" />
                </div>
              </button>


              {/* Add to Favorites (Icon Button) */}
              <button
                onClick={() => handleAddWishlist()}
                className={`w-14 h-14 rounded-xl flex items-center cursor-pointer justify-center transition-all group ${isProductInWishlist(selectedVariantId)
                  ? 'border-[#025043] '
                  : 'text-gray-400'
                  }`}
                title={t('productInfo.add_to_favorites')}
              >
                <WishListIcon isFavorite={isProductInWishlist(selectedVariantId)} />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 border-l-2 border-[#025043] transform -translate-x-1/2"></div>

          {/* Right Subsection (Description) */}
          <div className={`md:w-1/2 flex-1 space-y-3 ${isRTL ? 'ps-4 text-right' : 'pe-4 text-left'}`}>

            <p className="mt-5 text-black leading-relaxed font-[Expo-arabic]">
              {product?.description || product?.body || t('productInfo.no_description_available')}
            </p>

            <hr className="mt-6 border-[#025043]" />
            {selectedMaterial?.available_packages?.length > 0 && (
              <p className="text-black text-sm mt-1 mb-5 font-[Expo-arabic] leading-relaxed">
                {t('productInfo.packages_description')}
              </p>
            )}

            {selectedMaterial?.available_packages?.map((pkg) => {
              const unitPrice = (pkg.price / pkg.quantity).toFixed(2);
              const saving = Math.round(((currentPrice - unitPrice) / currentPrice) * 100);

              return (
                <div
                  key={pkg.id}
                  onClick={() => handleAddCartItem({ id: selectedVariantId }, pkg.id)}
                  className="relative group border-2 border-gray-100 hover:border-[#025043] rounded-2xl p-4 transition-all duration-300 bg-white hover:shadow-md cursor-pointer overflow-hidden active:scale-95"
                >
                  {saving > 0 && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold z-10">
                      {t('productInfo.save')} {saving}%
                    </div>
                  )}

                  <div className="flex flex-col items-center text-center space-y-1">
                    <span className="text-xs text-gray-500 font-[Expo-arabic] uppercase tracking-tighter">
                      {t('productInfo.pack_of', { count: pkg.quantity })}
                    </span>
                    <div className="text-xl font-bold text-[#025043]">
                      {pkg.price} $
                    </div>
                    <div className="text-[10px] text-gray-400">
                      ({unitPrice} $ / {t('productInfo.piece')})
                    </div>
                  </div>

                  <div className="mt-3 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-0 group-hover:w-full h-full bg-[#025043] transition-all duration-500"></div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0  bg-[#025043] text-white text-[10px] py-1 text-center translate-y-full group-hover:translate-y-0 transition-transform font-[Expo-arabic]">
                    {t('productInfo.add_to_cart')}
                  </div>
                </div>
              );
            })}

            <div className="mt-6 p-4 bg-gray-50 rounded-xl border-s-4 border-[#025043] shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-[Expo-arabic] text-[#025043] text-sm font-bold">
                  {product?.category?.name}
                </h4>
              </div>
              <p className="text-gray-600 text-xs font-[Expo-arabic] leading-relaxed">
                {product?.category?.description || t('productInfo.no_category_description')}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* related Products */}
      <RelatedProductSlider variants={relatedVariants} />
    </div >
  );
};


export default ProductInfo;
