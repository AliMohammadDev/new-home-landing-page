import { useState } from 'react';
import Slider from 'react-slick';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.jsx';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIcon.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { addToast } from '@heroui/react';
import { useGetProfile } from '../../api/auth.jsx';
import RatingStars from '../RatingStars.jsx';
import { useAddToCartItem } from '../../api/cart.jsx';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useSubmitReview } from '../../api/reviews.jsx';
import { ProductSkeleton } from './ProductSkeleton.jsx';

function ProductSliderTopAvg({ products = [], isLoadingProducts = false }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: user } = useGetProfile();
  const { mutate: addToCart, isLoading } = useAddToCartItem();


  const [isExpanded, setIsExpanded] = useState(false);
  const fullText = t('essential_to_prep.top_rated.description');
  const shortText = fullText.slice(0, 250) + "...";

  const handleAddCartItem = (variant) => {
    if (!user) {
      addToast({
        title: 'Cart',
        description: t('essential_to_prep.cart_login_warning'),
        color: 'warning',
        duration: 4000,
      });
      navigate('/login');
      return;
    }

    addToCart(
      { product_variant_id: variant.id, quantity: 1 },
      {
        onSuccess: () => {
          addToast({
            title: 'Cart',
            description: t('essential_to_prep.cart_success', {
              product: variant.product.name,
            }),
            color: 'success',
            duration: 4000,
          });
        },
        onError: () => {
          addToast({
            title: 'Cart',
            description: t('essential_to_prep.cart_error', {
              product: variant.product.name,
            }),
            color: 'danger',
            duration: 4000,
          });
        },

      }
    );
  };
  // Add review
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

  const CustomArrow = ({ onClick, direction, currentSlide, slideCount }) => {
    const isDisabled =
      (direction === 'prev' && currentSlide === 0) ||
      (direction === 'next' && currentSlide === slideCount - 1);

    const isNext = direction === 'next';

    return (
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`absolute -top-10 md:-top-14 cursor-pointer rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center transition z-10
        ${isDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#D9D9D9] text-[#025043] hover:bg-gray-300'}
      `}
        style={{
          [isRTL ? 'left' : 'right']: isNext ? 0 : 56,
        }}
      >
        {isNext ? (
          isRTL ? <ChevronLeftIcon /> : <ChevronRightIcon />
        ) : (
          isRTL ? <ChevronRightIcon /> : <ChevronLeftIcon />
        )}
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    rows: 1,
    slidesPerRow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4, rows: 2 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, rows: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, rows: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, rows: 2 }
      },
    ],
  };

  const progress = products.length > 0 ? ((currentSlide + 1) / products.length) * 100 : 0;

  return (
    <section
      className="bg-[#EDEAE2] text-[#025043] px-6 md:px-20 py-10"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Title + Description */}
      <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className={
          clsx(" text-black text-[40px] md:text-[64px] mb-4",
            isRTL ? "font-[Expo-arabic]" : "font-[Qanduchia]"
          )
        }>
          {t('essential_to_prep.top_rated.title')}
        </h2>
        <p className="text-black text-[14px] md:text-[18px] font-[Expo-book] max-w-8xl mb-15">
          {isExpanded ? fullText : shortText}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#025043] hover:text-black-800 font-[Expo-arabic] ml-2 mr-2 cursor-pointer transition-colors"
          >
            {isExpanded ? t('read_less') : t('read_more')}
          </button>
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative" dir={isRTL ? 'rtl' : 'ltr'}>


        {isLoadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        ) : products.length > 0 ? (
          <Slider {...settings}>
            {products.map((variant) => {
              const product = variant.product;

              const sizes = [...new Set(product.available_options?.flatMap(color => color.available_sizes?.map(size => size.name)))].slice(0, 4);
              const materials = [...new Set(product.available_options?.flatMap(color => color.available_sizes?.flatMap(size => size.available_materials?.map(mat => mat.name))))].slice(0, 4);

              return (
                <div key={variant.id} className="px-2">
                  <div className="bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD] flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">

                    {/* Image Section */}
                    <div className="relative group overflow-hidden">
                      {variant.discount > 0 && (
                        <div className={clsx(
                          "absolute top-3 z-20 px-3 py-1 text-xs font-bold text-white bg-red-600 shadow-lg",
                          isRTL ? "right-0 rounded-l-full font-[Expo-arabic]" : "left-0 rounded-r-full font-bold"
                        )}>
                          {isRTL ? (
                            <>{t('essential_to_prep.off')} {Number(variant.discount)}%</>
                          ) : (
                            <>{Number(variant.discount)}% {t('essential_to_prep.off')}</>
                          )}
                        </div>
                      )}

                      <Link to={`/products/${product.category.id}/product-info/${variant.id}`}>
                        <img
                          src={variant.image}
                          alt={product.name}
                          className="w-full h-48 sm:h-56 md:h-64 object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
                        />
                      </Link>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex flex-col gap-3 flex-1">
                      <h3 className={clsx(
                        "text-[#025043] text-[16px] -mb-6 font-bold h-12 overflow-hidden",
                        isRTL ? "font-[Expo-arabic] text-right" : "font-bold text-left"
                      )}>
                        {product.name}
                      </h3>

                      <p className={clsx("text-sm text-black", isRTL ? "text-right" : "text-left")}>
                        SKU: <span className="text-gray-500 font-[Expo-arabic]">{variant?.sku}</span>
                      </p>

                      <div className="border-b border-[#025043]/20"></div>

                      {/* Price Section */}
                      <div className={clsx(
                        "flex items-baseline gap-2",
                        isRTL ? "flex-row-reverse justify-start" : "flex-row justify-start"
                      )}>
                        <p className="text-[#025043] text-[20px] font-bold font-[Expo-arabic]">
                          {variant.final_price} $
                        </p>
                        {variant.discount > 0 && (
                          <p className="text-gray-400 text-sm line-through decoration-red-500/50">
                            {variant.price} $
                          </p>
                        )}
                      </div>

                      {/* Options Container */}
                      <div className="flex flex-col gap-2 mb-4">
                        <div className={clsx("flex items-center w-full", isRTL ? "flex-row-reverse" : "flex-row")}>
                          <span className={clsx(
                            "text-[13px] text-gray-400 min-w-10 shrink-0",
                            isRTL ? "ml-1 text-right" : "mr-4 text-left"
                          )}>
                            {t('filter.color')}
                          </span>
                          <div className="flex gap-1.5 flex-wrap">
                            {product.available_options?.slice(0, 8).map((option) => (
                              <div
                                key={option.id}
                                title={option.name}
                                className="w-6 h-6  rounded-full border border-gray-400 hover:scale-110 transition shadow-sm"
                                style={{ backgroundColor: option.hex }}
                              />
                            ))}
                          </div>
                        </div>

                        <div className={clsx("flex items-center w-full", isRTL ? "flex-row-reverse" : "flex-row")}>
                          <span className={clsx(
                            "text-[13px] text-gray-400 min-w-10 shrink-0",
                            isRTL ? "ml-1 text-right" : "mr-4 text-left"
                          )}>
                            {t('filter.size')}
                          </span>
                          <div className="flex gap-1.5 flex-wrap">
                            {sizes.map((size, i) => (
                              <span key={i} className="px-1.5 py-px text-[12px] rounded-full bg-white border border-[#025043]/20 text-[#025043]">
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className={clsx("flex items-center w-full", isRTL ? "flex-row-reverse" : "flex-row")}>
                          <span className={clsx(
                            "text-[13px] text-gray-400 min-w-10 shrink-0",
                            isRTL ? "ml-1 text-right" : "mr-4 text-left"
                          )}>
                            {t('filter.material')}
                          </span>
                          <div className="flex gap-1.5 flex-wrap">
                            {materials.map((mat, i) => (
                              <span key={i} className="px-1.5 py-px text-[12px] rounded-full bg-[#025043]/5 border border-[#025043]/20 text-[#025043]">
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Rating and View More */}
                      <div className={clsx(
                        "flex items-center justify-between w-full mt-2",
                      )}>
                        {/* Stars + Review Count */}
                        <div className="flex items-center gap-1 min-w-0">
                          <RatingStars
                            onRate={(star) => handleRateProduct(variant.id, star)}
                            rating={Number(variant.reviews_avg) || 0}
                          />
                          <span className="text-xs text-gray-400 truncate">
                            ({variant.reviews_count || 0})
                          </span>
                        </div>

                        {/* View More */}
                        <span
                          onClick={(e) => { e.stopPropagation(); navigate('/products'); }}
                          className="text-xs font-medium hover:underline cursor-pointer whitespace-nowrap"
                        >
                          {t('essential_to_prep.view_more')}
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddCartItem(variant); }}
                        disabled={isLoading}
                        className="w-full bg-[#025043] text-white cursor-pointer text-sm font-bold px-4 py-3 rounded-full hover:bg-[#01382f] transition-all disabled:opacity-50 active:scale-95"
                      >
                        {isLoading ? t('essential_to_prep.adding') : t('essential_to_prep.add_to_cart')}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        ) : null}


        {/* Progress Bar Container */}


        {!isLoadingProducts && products.length > 0 && (
          <div className="mt-8 px-2 md:px-0">
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-[#025043] rounded-full transition-all duration-500 ease-out absolute"
                style={{
                  width: `${progress}%`,
                  [isRTL ? 'right' : 'left']: 0
                }}
              />
            </div>
          </div>
        )}
      </div>

    </section >
  );
}

export default ProductSliderTopAvg;