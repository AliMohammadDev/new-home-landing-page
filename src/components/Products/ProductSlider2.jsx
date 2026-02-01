import { useState } from 'react';
import Slider from 'react-slick';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.jsx';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIcon.jsx';
import Group from '../../assets/images/group.png';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProfile } from '../../api/auth.jsx';
import { useAddToCartItem } from '../../api/cart.jsx';
import { addToast } from '@heroui/react';
import RatingStars from '../RatingStars.jsx';
import { useTranslation } from 'react-i18next';
import { useSubmitReview } from '../../api/reviews.jsx';
import clsx from 'clsx';

function ProductSlider2({ products = [] }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: user } = useGetProfile();
  const { mutate: addToCart, isLoading } = useAddToCartItem();

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
            }), color: 'success',
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


  const CustomArrow = ({ onClick, direction }) => {
    const isNext = direction === 'next';
    return (
      <button
        onClick={onClick}
        className="absolute -top-14 bg-[#D9D9D9] cursor-pointer  text-black hover:bg-gray-300 rounded-full w-9 h-9 md:w-12 md:h-12 transition flex items-center justify-center z-10"
        style={{
          [isRTL ? 'left' : 'right']: isNext ? 0 : 56,
        }}
      >
        {isNext ? (
          isRTL ? <ChevronLeftIcon color="black" /> : <ChevronRightIcon color="black" />
        ) : (
          isRTL ? <ChevronRightIcon color="black" /> : <ChevronLeftIcon color="black" />
        )}
      </button>
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    autoplay: true,
    // rtl: isRTL,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const progress = products.length > 0 ? ((currentSlide + 1) / products.length) * 100 : 0;

  return (
    <section
      className="bg-[#EDEAE2] text-[#025043] px-6 md:px-20 py-10 md:py-5"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Title & Description */}
      <span className={` text-black text-[40px] md:text-[64px] block mb-4 ${isRTL ? 'font-[Expo-arabic] text-right' : 'font-[Qanduchia] text-left'}`}>
        {t('essential_to_prep.title')}
        <p className="text-black text-[14px] font-[Expo-book] md:text-[15px] mt-2">
          {t('essential_to_prep.description')}
        </p>
      </span>

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 md:gap-16 mt-8 justify-items-center">

        <div className="w-full flex justify-center ml-50 lg:justify-start">
          <img
            src={Group}
            alt="Promotion"
            className=" object-contain  mr-30 -mt-20 md:mr-1 lg:-ml-20 xl:-ml-30 md:w-[90%] lg:w-full h-auto transform md:scale-110 lg:scale-140 xl:scale-100 origin-center"
          />
        </div>

        {/* Slider  */}
        <div className="relative w-full max-w-full lg:max-w-[650px] xl:max-w-[800px]   md:-mt-30 lg:-mt-1" dir={isRTL ? 'rtl' : 'ltr'}>
          <Slider {...settings}>
            {products.map((variant) => {
              const product = variant.product;

              const sizes = [
                ...new Set(
                  product.available_options?.flatMap(color =>
                    color.available_sizes?.map(size => size.name)
                  )
                )
              ].slice(0, 4);

              const materials = [
                ...new Set(
                  product.available_options?.flatMap(color =>
                    color.available_sizes?.flatMap(size =>
                      size.available_materials?.map(mat => mat.name)
                    )
                  )
                )
              ].slice(0, 3);

              return (
                <div key={variant.id} className="px-2 h-full">
                  <div className="bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD] flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">

                    <Link to={`/products/${product.category.id}/product-info/${variant.id}`}>
                      <div className="relative group overflow-hidden">
                        {variant.discount > 0 && (
                          <div className={clsx(
                            "absolute top-3 z-20 px-3 py-1 text-xs font-bold text-white bg-red-600 shadow-lg",
                            isRTL ? "right-0 rounded-l-full font-[Expo-arabic]" : "left-0 rounded-r-full"
                          )}>
                            {isRTL ? (
                              <>{t('essential_to_prep.off')} {Number(variant.discount)}%</>
                            ) : (
                              <>{Number(variant.discount)}% {t('essential_to_prep.off')}</>
                            )}
                          </div>
                        )}
                        <img
                          src={variant.image}
                          alt={product.name}
                          className="w-full h-48 sm:h-56 md:h-60 object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                        />
                      </div>
                    </Link>

                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className={clsx(
                        "text-[#025043] text-[16px] font-bold -mb-4 h-12 overflow-hidden",
                        isRTL ? "font-[Expo-arabic] text-right" : "font-[Expo-book] text-left"
                      )}>
                        {product.name}
                      </h3>

                      <p className={clsx("text-sm text-black mb-1", isRTL ? "text-right" : "text-left")}>
                        SKU: <span className="text-gray-500 font-[Expo-arabic]">{variant?.sku}</span>
                      </p>

                      <div className="border-b border-[#025043]/20 mb-3"></div>

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

                      <div className="flex flex-col gap-2 mb-4">
                        {/* colors */}
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
                                className="w-6 h-6 rounded-full border border-gray-400 hover:scale-110 transition shadow-sm"
                                style={{ backgroundColor: option.hex }}
                              />
                            ))}
                          </div>
                        </div>
                        {/* sizes */}
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
                        {/* materials */}
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

                      <div className="mt-auto flex flex-col">
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


                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddCartItem(variant);
                          }}
                          disabled={isLoading}
                          className="w-full bg-[#025043] text-white cursor-pointer text-sm font-bold px-4 py-2 mt-1 rounded-full hover:bg-[#01382f] transition-all disabled:opacity-50 active:scale-95"
                        >
                          {isLoading ? t('essential_to_prep.adding') : t('essential_to_prep.add_to_cart')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>

          {/* Progress Bar */}
          <div className="mt-8 px-2 md:px-0">
            <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#025043] rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  float: 'left'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSlider2;