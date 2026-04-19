import { useState } from 'react';
import Group from '../../assets/images/group.png';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProfile } from '../../api/auth.jsx';
import { useAddToCartItem } from '../../api/cart.jsx';
import { addToast } from '@heroui/react';
import RatingStars from '../RatingStars.jsx';
import { useTranslation } from 'react-i18next';
import { useSubmitReview } from '../../api/reviews.jsx';
import clsx from 'clsx';
import { ProductSkeleton } from '../Products/ProductSkeleton.jsx';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

function ProductSliderDiscounted({ products = [], isLoadingProducts = false }) {
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
        },
      }
    );
  };

  const progress =
    products.length > 0 ? ((currentSlide + 1) / products.length) * 100 : 0;

  return (
    <section
      className="bg-[#EDEAE2] text-[#025043] px-6 md:px-20 py-10 md:py-5"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Title & Description */}
      <span
        className={` text-black text-[40px] md:text-[64px] block mb-4 ${isRTL ? 'font-[Expo-arabic] text-right' : 'font-[Qanduchia] text-left'}`}
      >
        {t('essential_to_prep.offers.title')}
        <p className="text-black text-[14px] font-[Expo-book] md:text-[18px] max-w-8xl mt-2">
          {t('essential_to_prep.offers.description')}
        </p>
      </span>

      {/* Grid Container */}
      <div className="grid grid-cols-1 xl:grid-cols-2 items-center gap-10 md:gap-16 mt-8 justify-items-center">
        <div className="w-full flex justify-center ml-50 lg:justify-start">
          <img
            src={Group}
            alt="Promotion"
            loading="lazy"
            className=" object-contain  mr-30 -mt-24 md:mr-1 xl:-ml-30 md:w-full h-auto transform md:scale-110 lg:scale-110 xl:scale-100 origin-center"
          />
        </div>

        {/* Slider  */}
        <div
          className={clsx(
            'relative w-full max-w-full lg:max-w-full xl:max-w-[1000px] transition-all duration-500 -mt-20 md:-mt-40 lg:-mt-50 xl:-mt-0',
            isRTL
              ? 'lg:-ml-3 xl:-ml-35 2xl:-mr-45'
              : 'lg:-mr-3 xl:-mr-35 2xl:-ml-45'
          )}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
          ) : products.length > 0 ? (
            <>
              <Swiper
                modules={[Pagination]}
                onSlideChange={(swiper) => {
                  setCurrentSlide(swiper.activeIndex);
                  console.log('Slide changed to:', swiper.activeIndex);
                }}
                onClick={(swiper, event) => {
                  // swiper.clickedIndex is the index of the clicked slide
                  if (swiper.clickedIndex !== undefined) {
                    setCurrentSlide(swiper.clickedIndex);
                    console.log('Slide clicked:', swiper.clickedIndex);
                  }
                }}
                spaceBetween={5}
                slidesPerView={3}
                breakpoints={{
                  150: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 1,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                  1280: {
                    slidesPerView: 2,
                  },
                }}
                pagination={{
                  el: '.swiper-pagination',
                  type: 'progressbar',
                  clickable: true,
                }}
              >
                {products.map((variant) => {
                  const product = variant.product;

                  const sizes = [
                    ...new Set(
                      product.available_options?.flatMap((color) =>
                        color.available_sizes?.map((size) => size.name)
                      )
                    ),
                  ].slice(0, 4);

                  const materials = [
                    ...new Set(
                      product.available_options?.flatMap((color) =>
                        color.available_sizes?.flatMap((size) =>
                          size.available_materials?.map((mat) => mat.name)
                        )
                      )
                    ),
                  ].slice(0, 3);

                  return (
                    <SwiperSlide key={variant.id} className="px-2 h-full">
                      <div className="bg-[#EDEAE2]  rounded-xl overflow-hidden border border-[#D8D5CD] flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                        {/* Image Section */}
                        <div className="relative group overflow-hidden">
                          {variant.discount > 0 && (
                            <div
                              className={clsx(
                                'absolute top-3 z-20 px-3 py-1 text-xs font-bold text-white bg-red-600 shadow-lg',
                                isRTL
                                  ? 'right-0 rounded-l-full font-[Expo-arabic]'
                                  : 'left-0 rounded-r-full font-bold'
                              )}
                            >
                              {isRTL ? (
                                <>
                                  {t('essential_to_prep.off')}{' '}
                                  {Number(variant.discount)}%
                                </>
                              ) : (
                                <>
                                  {Number(variant.discount)}%{' '}
                                  {t('essential_to_prep.off')}
                                </>
                              )}
                            </div>
                          )}

                          <Link
                            to={`/products/${product.category.id}/product-info/${variant.id}`}
                          >
                            <img
                              src={variant.image}
                              alt={product.name}
                              className="w-full h-48 sm:h-56 md:h-64 object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
                            />
                          </Link>
                        </div>

                        {/* Content Section */}
                        <div className="p-4 flex flex-col gap-3 flex-1">
                          <h3
                            className={clsx(
                              'text-[#025043] text-[16px] -mb-6 font-bold h-12 overflow-hidden',
                              isRTL
                                ? 'font-[Expo-arabic] text-right'
                                : 'font-bold text-left'
                            )}
                          >
                            {product.name}
                          </h3>

                          <p
                            className={clsx(
                              'text-sm text-black',
                              isRTL ? 'text-right' : 'text-left'
                            )}
                          >
                            SKU:{' '}
                            <span className="text-gray-500 font-[Expo-arabic]">
                              {variant?.sku}
                            </span>
                          </p>

                          <div className="border-b border-[#025043]/20"></div>

                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[#025043] text-[18px] font-bold">
                              {variant.final_price} $
                            </span>
                            {product.discount > 0 && (
                              <span className="text-gray-400 text-sm line-through decoration-red-500/50">
                                {variant.price} $
                              </span>
                            )}
                          </div>

                          {/* Options Container */}
                          <div className="flex flex-col gap-2 mb-4">
                            {/* Colors  */}
                            <div className="flex gap-1.5 flex-wrap">
                              <span className="text-[13px] text-gray-400 min-w-10">
                                {' '}
                                {t('filter.color')}{' '}
                              </span>
                              {product.available_options
                                ?.slice(0, 8)
                                .map((option) => (
                                  <div
                                    key={option.id}
                                    title={option.name}
                                    className="w-6 h-6 rounded-full border border-gray-400 transition-all duration-200 cursor-default hover:scale-110 hover:shadow-md"
                                    style={{ backgroundColor: option.hex }}
                                  />
                                ))}
                            </div>

                            {/* Sizes  */}
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-[13px] text-gray-400 min-w-10">
                                {t('filter.size')}
                              </span>
                              <div className="flex gap-1 flex-wrap">
                                {sizes.map((size, i) => (
                                  <span
                                    key={i}
                                    className="px-1.5 py-px text-[13px] rounded-full bg-white border border-[#025043]/20 text-[#025043]"
                                  >
                                    {size}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Materials  */}
                            <div className="flex items-center gap-1">
                              <span className="text-[13px] text-gray-400 min-w-10">
                                {t('filter.material')}
                              </span>
                              <div className="flex gap-1 flex-wrap">
                                {materials.map((mat, i) => (
                                  <span
                                    key={i}
                                    className="px-1.5 py-px text-[13px] rounded-full bg-[#025043]/5 border border-[#025043]/20 text-[#025043]"
                                  >
                                    {mat}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Rating and View More */}
                          <div
                            className={clsx(
                              'flex items-center justify-between w-full mt-2'
                            )}
                          >
                            {/* Stars + Review Count */}
                            <div className="flex items-center gap-1 min-w-0">
                              <RatingStars
                                onRate={(star) =>
                                  handleRateProduct(variant.id, star)
                                }
                                rating={Number(variant.reviews_avg) || 0}
                              />
                              <span className="text-xs text-gray-400 truncate">
                                ({variant.reviews_count || 0})
                              </span>
                            </div>

                            {/* View More */}
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/products');
                              }}
                              className="text-xs font-medium hover:underline cursor-pointer whitespace-nowrap"
                            >
                              {t('essential_to_prep.view_more')}
                            </span>
                          </div>

                          {/* Add to Cart Button */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddCartItem(variant);
                            }}
                            disabled={isLoading}
                            className="w-full bg-[#025043] text-white cursor-pointer text-sm font-bold px-4 py-3 rounded-full hover:bg-[#01382f] transition-all disabled:opacity-50 active:scale-95"
                          >
                            {isLoading
                              ? t('essential_to_prep.adding')
                              : t('essential_to_prep.add_to_cart')}
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              <div className="mt-8 px-2 md:px-0">
                <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#025043] rounded-full transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                      float: isRTL ? 'right' : 'left',
                    }}
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default ProductSliderDiscounted;
