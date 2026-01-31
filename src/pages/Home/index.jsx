import CategoryCard from '../../components/CategoryCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductSlider1 from '../../components/Products/ProductSlider1';
import ProductSlider2 from '../../components/Products/ProductSlider2';
import MostProduct from '../../components/Products/MostProduct';
import Header from '../../components/Header';
import { useGetCategories } from '../../api/categories';
import AboutSection from '../../components/AboutSection';
import { useGetSlidersProductsVariants } from '../../api/products';
import AnimateOnScroll from '../../components/AnimateOnScroll';
import { useTranslation } from 'react-i18next';
import homeLogoWhite from "../../assets/images/home-logo-white.svg";
import footer1 from "../../assets/images/footer1.png";
import footer2 from "../../assets/images/footer2.png";
import clsx from 'clsx';


const Home = () => {
  const { t, i18n } = useTranslation();
  const { data: categories = [] } = useGetCategories();
  const { data: sliderProducts = [] } = useGetSlidersProductsVariants();
  // const { data: variantsByLimit = [] } = useGetProductsVariantsByLimit();
  const isRTL = i18n.language === 'ar';


  // const productsByLimit = (variantsByLimit || []).map(v => ({
  //   ...v.product,
  //   variantId: v.id,
  //   image: v.image,
  //   color: v.color,
  //   size: v.size,
  //   material: v.material,
  //   stock_quantity: v.stock_quantity,
  // }));

  return (
    <>
      <Header />
      {/* HomePage */}
      <div className="bg-[#025043] py-10">


        {/* Hero / Welcome Section */}
        <AnimateOnScroll direction="up" delay={0.1}>
          {/* Title */}
          <h1 className={clsx(
            "text-center text-white text-5xl sm:text-2xl md:text-8xl lg:text-8xl",
            isRTL ? "font-[Expo-arabic] text-7xl" : "font-[Qanduchia]"
          )}>

            {t('hero.welcome')}
          </h1>

          {/* Divider */}
          <div className="w-24 h-0.5 bg-white mx-auto mt-4 mb-6"></div>

          {/* Description */}
          <p className="font-[Expo-arabic] text-2xl p-4 text-white text-center">
            {t('hero.description')}
          </p>

          {/* Logo */}
          <div className="flex justify-center mt-20">
            <img
              src={homeLogoWhite}
              alt={t('hero.logo_alt')}
              className="w-full max-w-[400px]  md:w-[570px] h-auto object-contain"
            />
          </div>
        </AnimateOnScroll>



        {/* All Categories */}
        <AnimateOnScroll direction="up" delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-10 p-2 sm:p-2 md:p-4">
            <div className="text-center text-white transition-shadow duration-300">
              {i18n.language === 'ar' ? (
                <span className="text-[75px] sm:text-[100px] md:text-[100px] lg:text-[75px] font-[Expo-arabic] block">
                  {t('navbar.our_products')}
                </span>
              ) : (
                <>
                  {t('navbar.our_products').split(' ').map((word, idx) => (
                    idx === 0 ? (
                      <span key={idx} className="text-[100px] sm:text-[100px] md:text-[150px] lg:text-[100px] font-[Qanduchia] block">
                        {word}
                      </span>
                    ) : (
                      <p key={idx} className="transform -translate-y-12 translate-x-5 md:-translate-y-14 md:translate-x-9 font-[Asteroid] text-[75px] md:text-[100px] lg:text-[100px] block">
                        {word}
                      </p>
                    )
                  ))}
                </>
              )}
            </div>
            {categories.slice(0, 7).map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                title={category.name}
                image={category.image}
                description={category.description}
              />
            ))}
          </div>
        </AnimateOnScroll>



        {/* Sliders & Products */}
        {/* Sliders & Products Section */}
        <AnimateOnScroll direction="up" delay={0.3}>
          <ProductSlider1 products={sliderProducts.new || []} />
        </AnimateOnScroll>

        <AnimateOnScroll direction="up" delay={0.3}>
          <ProductSlider2 products={sliderProducts.discounted || []} />
        </AnimateOnScroll>

        <AnimateOnScroll direction="up" delay={0.3}>
          <MostProduct products={sliderProducts.featured || []} />
        </AnimateOnScroll>


        {/* About Us Section */}
        <AnimateOnScroll direction="left" delay={0.5}>
          <AboutSection />
        </AnimateOnScroll>


        {/* <AnimateOnScroll direction="zoom" delay={0.3}>
          <AllProductSlider3 products={productsByLimit} />
        </AnimateOnScroll> */}

        {/* Footer / Before Footer Section */}
        <AnimateOnScroll direction="up" delay={1}>
          <div className="flex flex-col md:flex-row items-center justify-around py-5 px-1 md:px-0">
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={footer2}
                alt="final"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 flex justify-center-safe">
              <img
                src={footer1}
                alt="final"
                className="w-full max-w-[700px]"
              />
            </div>
          </div>
        </AnimateOnScroll>
      </div >
    </>
  );
};

export default Home;
