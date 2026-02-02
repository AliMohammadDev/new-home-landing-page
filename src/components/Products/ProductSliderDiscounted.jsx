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

function ProductSliderDiscounted({ products = [] }) {
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

  const { mutate: submitReview } = useSubmitReview();
  const handleRateProduct = (variantId, rating) => {
    if (!user) {
      addToast({
        title: t('rating.title'),
        description: t('rating.loginRequired'),
        color: 'warning',
        duration: 4000,
      });
      navigate('/login');
      return;
    }
    submitReview(
      { product_variant_id: variantId, rating },
      {
        onSuccess: (data) => {
          addToast({
            title: t('rating.successTitle'),
            description: `${t('rating.successMessage')} : ${data.rating}`,
            color: 'success',
          });
        },
        onError: (error) => {
          addToast({
            title: t('rating.title'),
            description: error.response?.data?.message || t('rating.error'),
            color: 'error',
          });
        },
      }
    );
  };

  const CustomArrow = ({ onClick, direction }) => {
    const isNext = direction === 'next';
    return (
      <button
        onClick={onClick}
        className="absolute -top-14 bg-[#D9D9D9] cursor-pointer text-black hover:bg-gray-300 rounded-full w-9 h-9 md:w-12 md:h-12 transition flex items-center justify-center z-10"
        style={{ [isRTL ? 'left' : 'right']: isNext ? 0 : 56 }}
      >
        {isNext ? (
          isRTL ? (
            <ChevronLeftIcon color="black" />
          ) : (
            <ChevronRightIcon color="black" />
          )
        ) : isRTL ? (
          <ChevronRightIcon color="black" />
        ) : (
          <ChevronLeftIcon color="black" />
        )}
      </button>
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const progress =
    products.length > 0 ? ((currentSlide + 1) / products.length) * 100 : 0;

  return (
    <section
      className="bg-[#EDEAE2] text-[#025043] px-6 md:px-10 py-10 md:py-5 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Title & Description */}
      <span
        className={`text-black text-[40px] md:text-[64px] block mb-4 ${isRTL ? 'font-[Expo-arabic] text-right' : 'font-[Qanduchia] text-left'}`}
      >
        {t('essential_to_prep.offers.title')}
        <p className="text-black text-[14px] font-[Expo-book] md:text-[18px] max-w-8xl mt-2">
          {t('essential_to_prep.offers.description')}
        </p>
      </span>

      {/* Grid Container - Modified to 12 columns for better control */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 mt-8">


        {/* Promotion Image Column */}
        <div
          className={clsx(
            'lg:col-span-4 w-full flex justify-center z-0',
            isRTL ? 'lg:-mr-16 xl:-mr-24' : 'lg:-ml-16 xl:-ml-24'
          )}
        >
          <img
            src={Group}
            alt="Promotion"
            className="object-contain w-[80%] md:w-[90%] lg:w-full h-auto transform lg:scale-125 origin-center"
          />
        </div>

        {/* Slider Column - Taking 8/12 of the width */}
        <div
          className="lg:col-span-8 relative w-full"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <Slider {...settings}>
            {products.map((variant) => {
              const product = variant.product;
              const sizes = [
                ...new Set(
                  product.available_options?.flatMap((c) =>
                    c.available_sizes?.map((s) => s.name)
                  )
                ),
              ].slice(0, 3);
              const materials = [
                ...new Set(
                  product.available_options?.flatMap((c) =>
                    c.available_sizes?.flatMap((s) =>
                      s.available_materials?.map((m) => m.name)
                    )
                  )
                ),
              ].slice(0, 2);

              return (
                <div key={variant.id} className="px-1.5 h-full">
                  <div className="bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD] flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                    <Link
                      to={`/products/${product.category.id}/product-info/${variant.id}`}
                    >
                      <div className="relative group overflow-hidden">
                        {variant.discount > 0 && (
                          <div
                            className={clsx(
                              'absolute top-3 z-20 px-2 py-1 text-[10px] font-bold text-white bg-red-600 shadow-lg',
                              isRTL
                                ? 'right-0 rounded-l-full font-[Expo-arabic]'
                                : 'left-0 rounded-r-full'
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
                        <img
                          src={variant.image}
                          alt={product.name}
                          className="w-full h-44 object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>

                    <div className="p-3 flex-1 flex flex-col">
                      <h3
                        className={clsx(
                          'text-[#025043] text-[14px] font-bold h-10 overflow-hidden line-clamp-2',
                          isRTL
                            ? 'font-[Expo-arabic] text-right'
                            : 'font-[Expo-book] text-left'
                        )}
                      >
                        {product.name}
                      </h3>
                      <p
                        className={clsx(
                          'text-[11px] text-gray-500 mb-1',
                          isRTL ? 'text-right' : 'text-left'
                        )}
                      >
                        SKU: {variant?.sku}
                      </p>
                      <div className="border-b border-[#025043]/10 mb-2"></div>

                      <div
                        className={clsx(
                          'flex items-baseline gap-2 mb-2',
                          isRTL ? 'flex-row-reverse' : 'flex-row'
                        )}
                      >
                        <p className="text-[#025043] text-[18px] font-bold">
                          {variant.final_price} $
                        </p>
                        {variant.discount > 0 && (
                          <p className="text-gray-400 text-xs line-through">
                            {variant.price} $
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5 mb-3 text-[11px]">
                        <div
                          className={clsx(
                            'flex items-center gap-2',
                            isRTL && 'flex-row-reverse'
                          )}
                        >
                          <span className="text-gray-400 min-w-10">
                            {t('filter.color')}
                          </span>
                          <div className="flex gap-1">
                            {product.available_options?.slice(0, 5).map((o) => (
                              <div
                                key={o.id}
                                className="w-6 h-6  rounded-full border border-gray-400 hover:scale-110 transition shadow-sm"
                                style={{ backgroundColor: o.hex }}
                              />
                            ))}
                          </div>
                        </div>
                        <div
                          className={clsx(
                            'flex items-center gap-2',
                            isRTL && 'flex-row-reverse'
                          )}
                        >
                          <span className="text-gray-400 min-w-10">
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

                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-2">
                          <RatingStars
                            rating={Number(variant.reviews_avg) || 0}
                            onRate={(s) => handleRateProduct(variant.id, s)}
                            size="small"
                          />
                          <span
                            onClick={(e) => { e.stopPropagation(); navigate('/products'); }}
                            className="text-xs font-medium hover:underline cursor-pointer whitespace-nowrap"
                          >
                            {t('essential_to_prep.view_more')}
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddCartItem(variant)}
                          disabled={isLoading}
                          className="w-full bg-[#025043] text-white py-2 rounded-full text-xs font-bold hover:bg-[#01382f] active:scale-95 transition-all"
                        >
                          {isLoading
                            ? t('essential_to_prep.adding')
                            : t('essential_to_prep.add_to_cart')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
              <div
                className={clsx(
                  'h-full bg-[#025043] transition-all duration-500',
                  isRTL ? 'float-right' : 'float-left'
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

        </div>


      </div>
    </section>
  );
}

export default ProductSliderDiscounted;
