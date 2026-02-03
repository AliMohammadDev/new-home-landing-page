import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const Header = () => {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const slides = [
    {
      image: "https://souvy.nl/cdn/shop/collections/keukengerei.jpg?v=1710320853&width=2048",
      tag: t('slides.slide1.tag'),
      title1: t('slides.slide1.title1'),
      title2: t('slides.slide1.title2'),
      bottom1: t('slides.slide1.bottom1'),
      bottom2: t('slides.slide1.bottom2'),
      bottomSmall: t('slides.slide1.bottomSmall')
    },
    {
      image: "https://tokyo-design-studio.com/images/categories/og/kitchenware3.jpg",
      tag: t('slides.slide2.tag'),
      title1: t('slides.slide2.title1'),
      title2: t('slides.slide2.title2'),
      bottom1: t('slides.slide2.bottom1'),
      bottom2: t('slides.slide2.bottom2'),
      bottomSmall: t('slides.slide2.bottomSmall')
    },
    {
      image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=2070",
      tag: t('slides.slide3.tag'),
      title1: t('slides.slide3.title1'),
      title2: t('slides.slide3.title2'),
      bottom1: t('slides.slide3.bottom1'),
      bottom2: t('slides.slide3.bottom2'),
      bottomSmall: t('slides.slide3.bottomSmall')
    },
    {
      image: "https://sunnexproducts.com/wp-content/uploads/2022/07/what-is-kitchenware-articles.jpg",
      tag: t('slides.slide4.tag'),
      title1: t('slides.slide4.title1'),
      title2: t('slides.slide4.title2'),
      bottom1: t('slides.slide4.bottom1'),
      bottom2: t('slides.slide4.bottom2'),
      bottomSmall: t('slides.slide4.bottomSmall')
    },
    {
      image: "https://officeforproductdesign.com/img/KitchenwareCollection/Kitchenware_Collection_by_OfficeforProductDesign_W01.jpg",
      tag: t('slides.slide5.tag'),
      title1: t('slides.slide5.title1'),
      title2: t('slides.slide5.title2'),
      bottom1: t('slides.slide5.bottom1'),
      bottom2: t('slides.slide5.bottom2'),
      bottomSmall: t('slides.slide5.bottomSmall')
    },
    {
      image: "https://www.buyandship.com.my/contents/uploads/2024/07/stainless-steel-kitchenware-table.jpg",
      tag: t('slides.slide6.tag'),
      title1: t('slides.slide6.title1'),
      title2: t('slides.slide6.title2'),
      bottom1: t('slides.slide6.bottom1'),
      bottom2: t('slides.slide6.bottom2'),
      bottomSmall: t('slides.slide6.bottomSmall')
    }
  ];

  return (
    <div className="w-full h-[110vh] md:h-screen relative overflow-hidden bg-black">
      <Swiper
        key={i18n.language}
        dir={isRTL ? 'rtl' : 'ltr'}
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className="w-full h-full bg-cover bg-no-repeat bg-center relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/40" />

                {/* TEXT CONTAINER  */}
                <div className={clsx(
                  "absolute z-10 top-46 sm:top-26 md:top-28 lg:top-44 xl:top-[250px] p-4 sm:p-6 md:p-10 text-white w-full md:w-auto",
                  isRTL
                    ? "right-6 sm:right-10 md:right-16 lg:right-1 xl:right-10 2xl:right-30 text-right"
                    : "left-6 sm:left-10 md:left-16 lg:left-1 xl:left-10 2xl:left-30 text-left"
                )}>

                  {/* Tagline Animation */}
                  <div className={clsx(
                    "flex items-center gap-2 md:gap-3 mb-6 sm:mb-10 md:mb-4 transition-all duration-1000 transform",
                    isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                    "flex-row"
                  )}>
                    <div className="w-10 h-px bg-[#E2995E] shrink-0" />

                    <span className={clsx(
                      "text-[#E2995E] text-sm sm:text-lg md:text-2xl tracking-[4px] uppercase whitespace-nowrap",
                      isRTL ? "font-[Expo-arabic]" : ""
                    )}>
                      {slide.tag}
                    </span>
                  </div>

                  {/* Main Title Animation */}
                  <div className={clsx(
                    "transition-all duration-1000 delay-300 transform",
                    isActive ? "translate-x-0 opacity-100" : (isRTL ? "translate-x-10 opacity-0" : "-translate-x-10 opacity-0"),
                    isRTL ? "pr-11 sm:pr-8 md:pr-12 font-[Expo-arabic]" : "pl-11 sm:pl-8 md:pl-12 font-[Qanduchia]"
                  )}>
                    <h1 className={clsx(
                      "text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 leading-tight",
                      isRTL ? "text-right" : "text-left"
                    )}>
                      {slide.title1} <br />
                      <span className="text-[#E2995E]">{slide.title2}</span>
                    </h1>
                  </div>

                  {/* Bottom Text Animation */}
                  <div className={clsx(
                    "mt-20 sm:mt-16 md:mt-20 lg:mt-10 xl:mt-24 transition-all duration-1000 delay-500 transform",
                    isActive ? "scale-100 opacity-100" : "scale-95 opacity-0",
                    "ms-6 sm:ms-16 md:ms-24 lg:ms-40"
                  )}>
                    <div className={clsx("flex flex-wrap items-baseline gap-3 justify-start")}>
                      <span className="font-[Asteroid] text-4xl sm:text-5xl md:text-7xl">
                        {slide.bottom1}
                      </span>
                      <span className="text-3xl font-[Expo-light] opacity-90">
                        {slide.bottom2}
                      </span>
                    </div>

                    <p className={clsx(
                      "text-sm font-[Expo-light] sm:text-base md:text-4xl tracking-widest opacity-80",
                      "ms-10 md:ms-20",
                      isRTL ? "text-right" : "text-left"
                    )}>
                      {slide.bottomSmall}
                    </p>
                  </div>

                  {/* SHOP NOW BUTTON */}
                  <div className={clsx(
                    "mt-8 transition-all duration-1000 delay-700 transform",
                    isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                    isRTL ? "mr-6 sm:mr-16 md:mr-40" : "ml-6 sm:ml-16 md:ml-40"
                  )}>
                    <a
                      href="products"
                      className="inline-block bg-[#E2995E] text-white px-8 py-3 md:px-10 md:py-4 text-sm md:text-lg font-[Expo-arabic] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-sm shadow-lg"
                    >
                      {t('shop_now')}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.4;
          width: 12px;
          height: 12px;
          transition: all 0.4s ease;
        }
        .swiper-pagination-bullet-active {
          background: #E2995E !important;
          opacity: 1;
          width: 50px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default Header;