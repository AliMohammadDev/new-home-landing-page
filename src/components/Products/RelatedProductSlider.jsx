import { useState } from 'react';
import Slider from 'react-slick';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { useSubmitReview } from '../../api/reviews.jsx';

function RelatedProductSlider({ variants = [] }) {
  const { categoryId } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: user } = useGetProfile();
  const { mutate: addToCart, isLoading } = useAddToCartItem();

  const handleAddCartItem = (variant) => {
    if (!user) {
      addToast({
        title: t('cart.title') || 'Cart',
        description: t('essential_to_prep.cart_login_warning'),
        color: 'warning',
        duration: 4000,
      });
      return;
    }
    addToCart({ product_variant_id: variant.id, quantity: 1 }, {
      onSuccess: () => {
        addToast({
          title: t('cart.title') || 'Cart',
          description: t('essential_to_prep.cart_success', { product: variant.product?.name }),
          color: 'success',
          duration: 4000,
        });
      },
    });
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
    const isDisabled = (direction === 'prev' && currentSlide === 0) ||
      (direction === 'next' && currentSlide === slideCount - 1);
    const isNext = direction === 'next';
    return (
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`absolute -top-10 md:-top-14 cursor-pointer rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center transition z-10
        ${isDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#D9D9D9] text-[#025043] hover:bg-gray-300'}
      `}
        style={{ [isRTL ? 'left' : 'right']: isNext ? 0 : 56 }}
      >
        {isNext ? (isRTL ? <ChevronLeftIcon /> : <ChevronRightIcon />)
          : (isRTL ? <ChevronRightIcon /> : <ChevronLeftIcon />)}
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
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const progress = variants.length > 0 ? ((currentSlide + 1) / variants.length) * 100 : 0;

  if (!variants.length) return null;

  return (
    <section className="text-[#025043] px-6 md:px-20 py-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className={clsx('text-black text-[36px] md:text-[56px] mb-3', isRTL ? 'font-[Expo-arabic]' : 'font-[Qanduchia]')}>
          {t('productInfo.related_products')}
        </h2>
        <p className="text-black text-[14px] font-[Expo-book] max-w-3xl">
          {t('productInfo.related_products_desc')}
        </p>
      </div>

      <div className="relative">
        <Slider {...settings}>
          {variants.map((variant) => {
            const colors = variant.product?.available_options?.slice(0, 8) || [];
            const sizes = [
              ...new Set(variant.product?.available_options?.flatMap(c => c.available_sizes?.map(s => s.name)) || [])
            ].slice(0, 4);
            const materials = [
              ...new Set(variant.product?.available_options?.flatMap(c => c.available_sizes?.flatMap(s => s.available_materials?.map(m => m.name)) || []))
            ].slice(0, 4);

            const discountVal = parseFloat(variant.discount) || 0;

            return (
              <div key={variant.id} className="px-2 h-full">
                <div className="bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD] flex flex-col h-[500px] shadow-sm hover:shadow-md transition-all group">

                  {/* Image & Discount */}
                  <div className="relative overflow-hidden">
                    {discountVal > 0 && (
                      <div className={clsx(
                        "absolute top-3 z-20 px-3 py-1 text-[10px] font-bold text-white bg-red-600 shadow-md",
                        isRTL ? "right-0 rounded-l-full font-[Expo-arabic]" : "left-0 rounded-r-full"
                      )}>
                        {isRTL ? `${t('essential_to_prep.off')} ${discountVal}%` : `${discountVal}% ${t('essential_to_prep.off')}`}
                      </div>
                    )}
                    <Link to={`/products/${categoryId}/product-info/${variant.id}`}>
                      <img
                        src={variant.image}
                        alt={variant.sku}
                        className="w-full h-48 md:h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>
                  </div>

                  <div className="p-4 flex flex-col gap-2 flex-1">

                    <h3 className={`text-[#025043] text-[16px] font-bold -mb-6 h-12 overflow-hidden ${isRTL ? 'font-[Expo-arabic] text-right' : 'font-[Expo-book] text-left'}`}>
                      {variant.product?.name}
                    </h3>

                    <p className="text-sm text-black">
                      SKU: <span className="text-gray-500 font-[Expo-arabic]">{variant?.sku}</span>
                    </p>

                    <div className="border-b border-[#025043]/10"></div>

                    <div className={clsx("flex items-baseline gap-2", isRTL ? "flex-row-reverse justify-end" : "flex-row justify-start")}>
                      <span className="text-[#025043] text-lg font-bold font-[Expo-arabic]">{variant.final_price} $</span>
                      {discountVal > 0 && (
                        <span className="text-gray-400 text-xs line-through decoration-red-500/40">{variant.price} $</span>
                      )}
                    </div>

                    {/* Colors */}
                    <div className="flex gap-1.5 flex-wrap min-h-5">
                      <span className="text-[13px] text-gray-400 min-w-10">{t('filter.color')}</span>
                      {colors.map((color) => (
                        <div
                          key={color.id}
                          title={color.name}
                          className="w-6 h-6 rounded-full border border-gray-400 shadow-sm hover:scale-125 transition-transform"
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>

                    {/* Sizes */}
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[13px] text-gray-400 min-w-10">{t('filter.size')}</span>
                      <div className="flex gap-1 flex-wrap">
                        {sizes.map((size, i) => (
                          <span key={i} className="px-1.5 py-px text-[13px] rounded-full bg-white border border-[#025043]/20 text-[#025043]">{size}</span>
                        ))}
                      </div>
                    </div>

                    {/* Materials */}
                    <div className="flex items-center gap-1">
                      <span className="text-[13px] text-gray-400 min-w-10">{t('filter.material')}</span>
                      <div className="flex gap-1 flex-wrap">
                        {materials.map((mat, i) => (
                          <span key={i} className="px-1.5 py-px text-[13px] rounded-full bg-[#025043]/5 border border-[#025043]/20 text-[#025043]">{mat}</span>
                        ))}
                      </div>
                    </div>

                    {/* Ratings & Add to Cart */}
                    <div className="mt-auto flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <RatingStars
                          rating={Number(variant.reviews_avg) || 0}
                          onRate={(star) => handleRateProduct(variant.id, star)}
                        />
                        <span className="text-[10px] text-gray-400">({variant.reviews_count || 0})</span>
                      </div>

                      <button
                        onClick={() => handleAddCartItem(variant)}
                        disabled={isLoading}
                        className="w-full bg-[#025043] text-white text-[11px] cursor-pointer font-[Expo-arabic] font-bold py-3 rounded-full hover:bg-black transition-all active:scale-95 disabled:opacity-50"
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
        {variants.length > 4 && (
          <div className="mt-8">
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#025043] transition-all duration-500"
                style={{ width: `${progress}%`, float: isRTL ? 'right' : 'left' }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RelatedProductSlider;
