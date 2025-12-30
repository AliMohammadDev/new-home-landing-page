import { useState } from 'react';
import Slider from 'react-slick';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.jsx';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIcon.jsx';
import Group from '../../assets/images/group.png';
import { Link } from 'react-router-dom';
import { useGetProfile } from '../../api/auth.jsx';
import { useAddToCartItem } from '../../api/cart.jsx';
import { addToast } from '@heroui/react';
import RatingStars from '../RatingStars.jsx';
import { useTranslation } from 'react-i18next';

function ProductSlider2({ products = [] }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: user } = useGetProfile();
  const { mutate: addToCart, isLoading } = useAddToCartItem();

  const handleAddCartItem = (variant) => {
    if (!user) {
      addToast({
        title: 'Cart',
        description: t('cart.login_required'),
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
            description: `${variant.product.name} added successfully!`,
            color: 'success',
            duration: 4000,
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
        className="absolute -top-14 bg-[#D9D9D9] cursor-pointer text-black hover:bg-gray-300 rounded-full w-8 h-8 md:w-12 md:h-12 transition flex items-center justify-center z-10"
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
    rtl: isRTL,
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
      <span className={`font-[Qanduchia] text-black text-[40px] md:text-[64px] block mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
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
            className=" object-contain w-full md:w-[90%] lg:w-full h-auto transform lg:scale-110 origin-center"
          />
        </div>

        <div className="relative w-full max-w-full lg:max-w-[650px] xl:max-w-[800px]">
          <Slider {...settings}>
            {products.map((variant) => {
              const product = variant.product;
              return (
                <div key={variant.id} className="px-2">
                  <div className="bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD] flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 sm:h-56 md:h-60 object-cover"
                    />

                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-[#025043] text-[16px] font-bold mb-2 h-12 overflow-hidden">
                        {product.name}
                      </h3>
                      <div className="border-b border-[#025043]/20 mb-3"></div>

                      <p className="text-[#025043] text-[18px] font-bold mb-4">
                        {product.final_price} $
                      </p>

                      <div className="flex flex-col mt-auto">
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          <RatingStars rating={Number(variant.reviews_avg) || 0} />
                          <span className="text-xs text-gray-500">({variant.reviews_count || 0})</span>
                          <Link
                            to={'/products'}
                            className={`text-sm hover:underline font-medium ${isRTL ? 'mr-auto' : 'ml-auto'}`}
                          >
                            {t('essential_to_prep.view_more')}
                          </Link>
                        </div>

                        <button
                          onClick={() => handleAddCartItem(variant)}
                          disabled={isLoading}
                          className="bg-[#025043] text-white cursor-pointer text-sm font-bold px-4 py-3 rounded-full hover:bg-[#01382f] transition-all disabled:opacity-50 w-full active:scale-95"
                        >
                          {isLoading ? t('essential_to_prep.adding') : t('essential_to_prep.add_to_cart')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>

          {/* Progress Bar */}
          <div className="mt-8 px-2 md:px-0">
            <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#025043] rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  float: isRTL ? 'right' : 'left'
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