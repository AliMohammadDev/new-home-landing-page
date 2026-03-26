import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.jsx';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIcon.jsx';
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon.jsx';
import ArrowLeftIcon from '../../assets/icons/ArrowLeftIcon.jsx';
import { ProductSkeleton } from '../Products/ProductSkeleton.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import clsx from 'clsx';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function MostProduct({ products = [], isLoadingProducts = false }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const progress =
    products.length > 0 ? (currentSlide / products.length) * 100 : 0;

  return (
    <section className="bg-[#EDEAE2] md:px-20 py-10 md:py-5 -mt-35 md:mt-0">
      <div className="grid grid-cols-1 xl:grid-cols-2 items-start">
        {/* Text */}
        <div className="flex flex-col">
          <div
            className={clsx(
              'flex mt-40 md:mt-10 gap-4 md:gap-6',
              isRTL
                ? 'flex-col items-center lg:items-start lg:flex-row xl:items-baseline'
                : 'flex-col md:flex-row md:items-baseline items-center'
            )}
          >
            <span className="font-[Expo-arabic] text-4xl md:text-6xl xl:text-5xl 2xl:text-7xl text-black whitespace-nowrap">
              {t('most_product.title_main')}
            </span>

            <span
              className={clsx(
                'mb-20 md:mb-0 text-[#E2995E] text-7xl sm:text-4xl xl:text-5xl 2xl:text-7xl whitespace-nowrap',
                isRTL ? 'font-[Expo-arabic] lg:mb-6 xl:mt-0' : 'font-[Asteroid]'
              )}
            >
              {t('most_product.title_sub')}
            </span>
          </div>

          <div className="md:text-xl lg:text-xl mt-4 md:mt-8 ml-5 md:ml-0 font-[Expo-arabic] mr-2 md:mr-0">
            <p>{t('most_product.description_line1')}</p>
            <p className="mt-2">{t('most_product.description_line2')}</p>
          </div>

          <Link to={'/products'}>
            <div className="ml-4 md:ml-0 text-sm font-[Expo-arabic] cursor-pointer flex items-center gap-1 mr-2 md:mr-0">
              {t('most_product.show_products')}
              {i18n.language === 'ar' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            </div>
          </Link>
        </div>

        {/* Slider Section */}
        <div
          className="relative w-full mt-10 md:mt-0"
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
                grabCursor={true}
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
                pagination={{
                  el: '.swiper-pagination',
                  type: 'progressbar',
                  clickable: true,
                }}
                breakpoints={{
                  150: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                  1280: {
                    slidesPerView: 3,
                  },
                }}
              >
                {products.map((variant, i) => {
                  return (
                    <SwiperSlide key={variant.id ?? i} className="px-2 md:px-1">
                      <div className="bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD] h-full flex flex-col pb-4 shadow-sm hover:shadow-md transition-shadow">
                        <Link
                          to={`/products/${variant.product.category.id}/product-info/${variant.id}`}
                        >
                          <img
                            src={variant.image}
                            alt={variant.name}
                            className="w-full h-48 sm:h-56 md:h-60 lg:h-64 object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                          />
                        </Link>
                        <div
                          className={`mt-5 px-4 flex-1 flex flex-col ${
                            isRTL
                              ? 'font-[Expo-arabic] text-right'
                              : 'font-[Qanduchia] text-left'
                          }`}
                        >
                          <h3 className="text-black text-[18px] mb-2 line-clamp-2">
                            {variant.name}
                          </h3>

                          <span
                            onClick={() => navigate('/products')}
                            className={clsx(
                              'text-sm hover:underline font-medium cursor-pointer mb-2',
                              isRTL
                                ? 'font-[Expo-arabic] text-right'
                                : 'font-[Expo-arabic] text-left'
                            )}
                          >
                            {t(
                              'slider.Think_about_a_gift?_see_our_colllection'
                            )}
                          </span>

                          <p className="text-black text-sm mb-4 font-[Expo-arabic] line-clamp-3 leading-relaxed">
                            {variant.body}
                          </p>
                          <span className="text-[#025043] font-[Expo-arabic] text-lg font-bold mt-auto">
                            {variant?.final_price} $
                          </span>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              <div className=" w-full mt-5 bg-gray-300 px-2 md:px-0">
                <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-500 ease-out"
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
      <div className="flex justify-center items-center text-center mt-20 text-black font-[Expo-arabic] mx-auto max-w-2xl">
        {t('most_product.footer_description')}
      </div>
    </section>
  );
}

export default MostProduct;
