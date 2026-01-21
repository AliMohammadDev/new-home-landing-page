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

function ProductSlider1({ products = [] }) {
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
    slidesToScroll: 1,
    autoplay: true,
    // rtl: isRTL,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
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
          {t('essential_to_prep.title')}
        </h2>
        <p className="text-black text-[14px] md:text-[15px] font-[Expo-book] max-w-3xl mb-15">
          {t('essential_to_prep.description')}
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative" dir={isRTL ? 'rtl' : 'ltr'}>
        <Slider {...settings}>
          {products.map((variant) => {
            const product = variant.product;

            return (
              <Link to={`/products/${product.category.id}/product-info/${variant.id}`}>
                <div key={variant.id} className="px-2">
                  <div className="bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD] flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={variant.image}
                      alt={product.name}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover"
                    />

                    <div className="p-4 flex flex-col gap-3 flex-1">
                      <h3 className={`text-[#025043] text-[16px] font-bold h-12 overflow-hidden ${isRTL ? 'font-[Expo-arabic] text-right' : 'font-[Expo-book] text-left'}`}>
                        {product.name}
                      </h3>

                      <p className="text-sm text-black">
                        Product: <span className="text-gray-500 font-[Expo-arabic]">{variant?.sku}</span>
                      </p>
                      <div className="border-b border-[#025043]/20"></div>

                      <p className={`text-[#025043] text-[18px] font-bold ${isRTL ? 'font-[Expo-arabic] text-right' : 'font-[Expo-book] text-left'}`}>
                        {variant.final_price} $
                      </p>

                      <div className="flex items-center gap-2 text-sm flex-wrap">
                        <RatingStars rating={Number(variant.reviews_avg) || 0} />
                        <span className="text-xs text-gray-400">
                          ({variant.reviews_count || 0})
                        </span>
                        <span
                          onClick={() => navigate('/products')}
                          className="text-sm hover:underline font-medium font-[Expo-arabic] ms-auto cursor-pointer"
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
                        className="w-full bg-[#025043] text-white cursor-pointer text-sm font-[Expo-arabic] font-bold px-4 py-3 rounded-full hover:bg-[#01382f] transition-all disabled:opacity-50 active:scale-95"
                      >
                        {isLoading ? t('essential_to_prep.adding') : t('essential_to_prep.add_to_cart')}
                      </button>
                    </div>
                  </div>
                </div>

              </Link>
            );
          })}
        </Slider>

        {/* Progress Bar Container */}
        <div className="mt-8 px-2 md:px-0">
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#025043] rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                float: 'left'
              }}
            />
          </div>
        </div>
      </div>
    </section >
  );
}

export default ProductSlider1;