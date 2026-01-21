import { useState } from 'react';
import Slider from 'react-slick';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.jsx';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIcon.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowLeftIcon from '../../assets/icons/ArrowLeftIcon.jsx';
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon.jsx';
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
      {direction === 'next' ? <ChevronRightIcon color="white" /> : <ChevronLeftIcon color="black" />}
    </button>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
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
    <section className="bg-[#EDEAE2] md:px-20 py-10 md:py-5 -mt-35 md:mt-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
        {/* Text */}
        <div className="flex flex-col">
          <div className="flex flex-col mt-40 md:mt-10 md:flex-row items-center gap-10">
            <span className="font-[Expo-arabic] text-7xl md:text-6xl xl:text-8xl text-black">
              {t('most_product.title_main')}
            </span>
            <span className={
              clsx(" mb-20 md:mb-0 text-8xl sm:text-6xl  xl:text-8xl",
                isRTL ? "font-[Expo-arabic] lg:text-6xl md:text-6xl md:-mr-4  lg:-mr-8" : "font-[Asteroid] lg:text-8xl md:text-7xl"
              )
            }>
              {t('most_product.title_sub')}
            </span>
          </div>
          <div className="md:text-xl lg:text-xl mt-4 md:mt-8 ml-5 md:ml-0 font-[Expo-arabic]">
            <p>{t('most_product.description_line1')}</p>
            <p className="mt-2">{t('most_product.description_line2')}</p>
          </div>

          <Link to={'/products'}>
            <div className="ml-4 md:ml-0 text-sm font-[Expo-arabic] cursor-pointer flex items-center gap-1">
              {t('most_product.show_products')}
              {i18n.language === 'ar' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            </div>
          </Link>
        </div>

        {/* Slider */}
        <div className="relative w-full mt-10 md:mt-0" dir={isRTL ? 'rtl' : 'ltr'}>
          <Slider {...settings}>
            {products.map((variant, i) => {
              // const product = variant.product;

              return (
                <Link to={`/products/${variant.product.category.id}/product-info/${variant.id}`}>
                  <div key={variant.id ?? i} className="px-2 md:px-1">
                    <div className="bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD] h-full flex flex-col pb-4 shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={variant.image}
                        alt={variant.name}
                        className="w-full h-48 sm:h-56 md:h-60 lg:h-64 object-cover"
                      />
                      <div
                        className={`mt-5 px-4 flex-1 flex flex-col ${isRTL ? 'font-[Expo-arabic] text-right' : 'font-[Qanduchia] text-left'
                          }`}
                      >
                        <h3 className="text-black text-[18px] mb-2 line-clamp-2">
                          {variant.name}
                        </h3>

                        <span
                          onClick={() => navigate('/products')}
                          className="text-sm hover:underline font-medium font-[Expo-arabic] ms-auto cursor-pointer"
                        >
                          {t('slider.Think_about_a_gift?_see_our_colllection')}
                        </span>


                        <p className="text-black text-sm mb-4 font-[Expo-arabic] line-clamp-3 leading-relaxed">
                          {variant.body}
                        </p>
                        <span className="text-[#025043] font-[Expo-arabic] text-lg font-bold mt-auto">
                          {variant?.final_price} $
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

              );
            })}
          </Slider>


          {/* Progress Bar */}
          <div className="mt-8 px-2 md:px-0">
            <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  float: 'left'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center text-center mt-20 text-black font-[Expo-arabic] mx-auto max-w-2xl">
        {t('most_product.footer_description')}
      </div>
    </section>
  );
}

export default MostProduct;
