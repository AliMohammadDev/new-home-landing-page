import { useState } from 'react';
import Slider from 'react-slick';
import { Link, useParams } from 'react-router-dom';
import { addToast } from '@heroui/react';
import RatingStars from '../RatingStars.jsx';
import { useTranslation } from 'react-i18next';
import { useGetProfile } from '../../api/auth.jsx';
import { useAddToCartItem } from '../../api/cart.jsx';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIcon.jsx';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import clsx from 'clsx';

function RelatedProductSlider({ variants = [] }) {
  const { categoryId } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: user } = useGetProfile();
  const { mutate: addToCart, isLoading } = useAddToCartItem();

  // Add to cart
  const handleAddCartItem = (variant) => {
    if (!user) {
      addToast({
        title: 'Cart',
        description: t('essential_to_prep.cart_login_warning'),
        color: 'warning',
        duration: 4000,
      });
      return;
    }

    addToCart(
      { product_variant_id: variant.id, quantity: 1 },
      {
        onSuccess: () => {
          addToast({
            title: 'Cart',
            description: t('essential_to_prep.cart_success', {
              product: variant.product?.name,
            }),
            color: 'success',
            duration: 4000,
          });
        },
        onError: () => {
          addToast({
            title: 'Cart',
            description: t('essential_to_prep.cart_error'),
            color: 'danger',
            duration: 4000,
          });
        },
      }
    );
  };

  // Custom Arrows
  const CustomArrow = ({ onClick, direction, currentSlide, slideCount }) => {
    const isDisabled =
      (direction === 'prev' && currentSlide === 0) ||
      (direction === 'next' && currentSlide === slideCount - 1);

    const isNext = direction === 'next';

    return (
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`absolute -top-10 md:-top-14 rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center transition z-10
        ${isDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-[#D9D9D9] text-[#025043] hover:bg-gray-300'
          }`}
        style={{
          [isRTL ? 'left' : 'right']: isNext ? 0 : 56,
        }}
      >
        {isNext ? (
          isRTL ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )
        ) : isRTL ? (
          <ChevronRightIcon />
        ) : (
          <ChevronLeftIcon />
        )}
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: variants.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    // rtl: isRTL,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const progress =
    variants.length > 0 ? ((currentSlide + 1) / variants.length) * 100 : 0;

  if (!variants.length) return null;

  return (
    <section
      className=" text-[#025043] px-6 md:px-20 py-12 mt-20"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ===== Related Products ===== */}
      <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2
          className={clsx(
            'text-black text-[36px] md:text-[56px] mb-3',
            isRTL ? 'font-[Expo-arabic]' : 'font-[Qanduchia]'
          )}
        >
          {t('productInfo.related_products')}
        </h2>
        <p className="text-black text-[14px] font-[Expo-book] max-w-3xl">
          {t('productInfo.related_products_desc')}
        </p>
      </div>

      {/* Slider */}
      <div className="relative">
        <Slider {...settings}>
          {variants.map((variant) => (
            <div key={variant.id} className="px-2">
              <div className="bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD] flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                <Link to={`/products/${categoryId}/product-info/${variant.id}`}>
                  <img
                    src={variant.image}
                    alt={variant.sku}
                    className="w-full h-48 md:h-60 object-cover"
                  />
                </Link>

                <div className="p-4 flex flex-col gap-3 flex-1">
                  <h3
                    className={`text-[#025043] text-[16px] font-bold h-12 overflow-hidden ${isRTL ? 'font-[Expo-arabic] text-right' : 'font-[Expo-book] text-left'}`}
                  >
                    {variant.product?.name}
                  </h3>

                  <p className="text-sm text-black">
                    Product Code:{' '}
                    <span className="text-gray-500">{variant.sku}</span>
                  </p>

                  <div className="border-b border-[#025043]/20"></div>

                  <p className="text-[#025043] text-[18px] font-bold">
                    {variant.final_price} $
                  </p>

                  <div className="flex items-center gap-2 text-sm">
                    <RatingStars rating={Number(variant.reviews_avg) || 0} />
                    <span className="text-xs text-gray-400">
                      ({variant.reviews_count || 0})
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddCartItem(variant)}
                    disabled={isLoading}
                    className="w-full bg-[#025043] text-white text-sm font-bold px-4 py-3 rounded-full hover:bg-[#01382f] transition-all disabled:opacity-50"
                  >
                    {isLoading
                      ? t('essential_to_prep.adding')
                      : t('essential_to_prep.add_to_cart')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Progress Bar */}
        {variants.length > 4 && (
          <div className="mt-8">
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#025043] transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  float: 'left',
                }}
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default RelatedProductSlider;
