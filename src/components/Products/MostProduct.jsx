import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.jsx';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIcon.jsx';
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon.jsx';
import ArrowLeftIcon from '../../assets/icons/ArrowLeftIcon.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Slider from 'react-slick';
import clsx from 'clsx';

function MostProduct({ products = [] }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const CustomArrow = ({ onClick, direction }) => (
    <button
      onClick={onClick}
      className="absolute bg-white/30 backdrop-blur-md cursor-pointer text-black rounded-full w-12 h-12 transition flex items-center justify-center"
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        left: direction === 'prev' ? 10 : 'auto',
        right: direction === 'next' ? 10 : 'auto',
        zIndex: 10,
      }}
    >
      {direction === 'next' ? <ChevronRightIcon color="white" /> : <ChevronLeftIcon color="white" />}
    </button>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const progress = products.length > 0 ? ((currentSlide + 1) / products.length) * 100 : 0;

  return (
    <section className="bg-[#EDEAE2] md:px-20 py-10 md:py-5 -mt-35 md:mt-0 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 mt-8">
        <div className="lg:col-span-4 flex flex-col z-20">
          <div className="flex flex-row flex-wrap items-baseline gap-3 mt-10">
            <span className="font-[Expo-arabic] text-5xl md:text-6xl xl:text-7xl text-black whitespace-nowrap">
              {t('most_product.title_main')}
            </span>
            <span className={clsx(
              "text-[#E2995E] text-5xl md:text-6xl xl:text-7xl whitespace-nowrap",
              isRTL ? "font-[Expo-arabic]" : "font-[Asteroid]"
            )}>
              {t('most_product.title_sub')}
            </span>
          </div>

          <div className="md:text-lg lg:text-xl mt-6 font-[Expo-arabic] text-gray-700">
            <p>{t('most_product.description_line1')}</p>
            <p className="mt-1">{t('most_product.description_line2')}</p>
          </div>

          <Link to={'/products'} className="mt-6 w-fit">
            <div className="text-sm font-[Expo-arabic] cursor-pointer flex items-center gap-2 hover:translate-x-1 transition-transform">
              {t('most_product.show_products')}
              {isRTL ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            </div>
          </Link>
        </div>
        <div
          className="lg:col-span-8 relative w-full min-w-0"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <Slider {...settings}>
            {products.map((variant, i) => (
              <div key={variant.id ?? i} className="px-2">
                <div className="bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD] h-full flex flex-col pb-4 shadow-sm hover:shadow-md transition-shadow">
                  <Link to={`/products/${variant.product?.category?.id}/product-info/${variant.id}`}>
                    <img
                      src={variant.image}
                      alt={variant.name}
                      className="w-full h-48 sm:h-56 md:h-60 lg:h-64 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className={clsx(
                    "mt-5 px-4 flex-1 flex flex-col",
                    isRTL ? 'font-[Expo-arabic] text-right' : 'font-[Qanduchia] text-left'
                  )}>
                    <h3 className="text-black text-[18px] mb-2 line-clamp-1 font-bold">
                      {variant.name}
                    </h3>
                    <span
                      onClick={() => navigate('/products')}
                      className="text-sm hover:underline font-medium cursor-pointer mb-2 text-gray-600"
                    >
                      {t('slider.Think_about_a_gift?_see_our_colllection')}
                    </span>
                    <p className="text-black text-sm mb-4 font-[Expo-arabic] line-clamp-2 leading-relaxed opacity-80">
                      {variant.body}
                    </p>
                    <span className="text-[#025043] font-[Expo-arabic] text-lg font-bold mt-auto">
                      {variant?.final_price} $
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          <div className="mt-8 px-2">
            <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  float: isRTL ? 'right' : 'left'
                }}
              />
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-center items-center text-center mt-20 text-black font-[Expo-arabic] mx-auto max-w-2xl px-4 opacity-70">
        {t('most_product.footer_description')}
      </div>
    </section>
  );
}

export default MostProduct;
