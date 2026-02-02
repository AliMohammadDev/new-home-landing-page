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
      tag: "Professional Cookware",
      title1: "Master the Art",
      title2: "of Fine Cooking",
      bottom1: "Upgrade",
      bottom2: "your Kitchen,",
      bottomSmall: "elevate your cooking"
    },
    {
      image: "https://tokyo-design-studio.com/images/categories/og/kitchenware3.jpg",
      tag: "Elegant Glassware",
      title1: "Pure Clarity",
      title2: "In Every Sip",
      bottom1: "Refresh",
      bottom2: "your Style,",
      bottomSmall: "with premium glasses"
    },
    {
      image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=2070",
      tag: "Durable Bakeware",
      title1: "Quality Tools",
      title2: "For Every Baker",
      bottom1: "Perfect",
      bottom2: "your Baking,",
      bottomSmall: "crispy results every time"
    },
    {
      image: "https://sunnexproducts.com/wp-content/uploads/2022/07/what-is-kitchenware-articles.jpg",
      tag: "Luxury Dinnerware",
      title1: "Set Your Table",
      title2: "With Elegance",
      bottom1: "Impress",
      bottom2: "your Guests,",
      bottomSmall: "with modern plates"
    },
    {
      image: "https://officeforproductdesign.com/img/KitchenwareCollection/Kitchenware_Collection_by_OfficeforProductDesign_W01.jpg",
      tag: "Premium Sets",
      title1: "The Heart of",
      title2: "Your Kitchen",
      bottom1: "Minimal",
      bottom2: "Design,",
      bottomSmall: "maximum performance"
    },
    {
      image: "https://www.buyandship.com.my/contents/uploads/2024/07/stainless-steel-kitchenware-table.jpg",
      tag: "Modern Kitchenware",
      title1: "Modern Style",
      title2: "Modern Living",
      bottom1: "Refine",
      bottom2: "your Space,",
      bottomSmall: "where quality meets art"
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
                dir="ltr"
                className="w-full h-full bg-cover bg-no-repeat bg-center relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/40" />

                {/* TEXT CONTAINER */}
                <div className="absolute z-10 top-20 sm:top-16 md:top-8 lg:top-24 xl:top-[250px] left-6 sm:left-10 md:left-16 lg:left-1 xl:left-10 2xl:left-30 p-4 sm:p-6 md:p-10 text-white">

                  {/* Tagline Animation */}
                  <div className={clsx(
                    "flex items-center gap-2 md:gap-3 mb-6 sm:mb-10 md:mb-4 transition-all duration-1000 transform",
                    isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  )}>
                    <div className="w-10 h-px bg-[#E2995E]" />
                    <span className={clsx(
                      "text-[#E2995E] text-sm sm:text-lg md:text-2xl tracking-[4px] uppercase",
                    )}>
                      {slide.tag}
                    </span>
                  </div>

                  {/* Main Title Animation */}
                  <div className={clsx(
                    "pl-6 sm:pl-8 md:pl-11 transition-all duration-1000 delay-300 transform",
                    isActive ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0",
                    isRTL ? "font-[Expo-Qanduchia]" : "font-[Qanduchia]"
                  )}>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 text-left leading-tight">
                      {slide.title1} <br />
                      <span className="text-[#E2995E]">{slide.title2}</span>
                    </h1>
                  </div>

                  <div className={clsx(
                    "mt-20 sm:mt-16 md:mt-20 lg:mt-10 xl:mt-24 ml-6 sm:ml-16 md:ml-24 lg:ml-40 transition-all duration-1000 delay-500 transform",
                    isActive ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  )}>
                    <p className="flex flex-wrap items-baseline gap-3 justify-start">
                      <span className="font-[Asteroid] text-4xl sm:text-5xl md:text-7xl">
                        {slide.bottom1}
                      </span>
                      <span className="text-3xl font-[Expo-light] italic opacity-90">
                        {slide.bottom2}
                      </span>
                    </p>
                    <p className="ml-10 md:ml-20 text-sm font-[Expo-light] italic sm:text-base md:text-4xl text-left tracking-widest opacity-80">
                      {slide.bottomSmall}
                    </p>
                  </div>

                  {/* SHOP NOW BUTTON */}
                  <div className={clsx(
                    "mt-8 ml-6 sm:ml-16 md:ml-40 transition-all duration-1000 delay-700 transform",
                    isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
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