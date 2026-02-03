import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import LetSomeLight from '../assets/animations/LetSomeLight.json';

function AboutSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section
      className="bg-[#025043] pt-24 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex flex-col lg:flex-row items-center gap-16 px-6 md:px-20 mb-20">
        {/* LEFT SIDE - TEXT */}
        <div className="flex-1">
          <h2 className="font-[Expo-arabic] text-white text-[40px] md:text-[64px] mb-8 leading-tight text-start">
            {t('about_section.title')}
          </h2>

          <div className="text-white text-[16px] md:text-[24px] font-[Expo-arabic] mb-8 max-w-5xl leading-relaxed text-start">
            <p className="mb-4">{t('about_section.description')}</p>
            <span className="font-bold block">
              {t('about_section.core_products')}
            </span>
          </div>

          <ul className="list-none text-white space-y-4 ps-6 md:ps-16 mb-16 text-start">
            {t('about_section.product_list', { returnObjects: true }).map(
              (item, index) => (
                <li
                  key={index}
                  className="relative flex font-[Expo-book] items-center gap-3 before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:bg-white before:rounded-full"
                >
                  {item}
                </li>
              )
            )}
          </ul>

          <div className="flex flex-col md:flex-row items-center gap-6 mt-20">
            <span
              className={clsx(
                'text-6xl md:text-8xl text-white leading-none',
                isRTL ? 'font-[Expo-arabic]' : 'font-[Asteroid]'
              )}
            >
              {t('about_section.we')}
            </span>
            <p
              className={clsx(
                'font-[Expo-book] text-sm md:text-xl text-white max-w-2xl leading-relaxed border-t md:border-t-0 pt-4 md:pt-0 text-start',
                isRTL ? 'md:pr-4 border-white/10' : 'md:pl-4 border-white/10'
              )}
            >
              {t('about_section.we_description')}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - LOTTIE */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-[550px] lg:max-w-[750px]">
            <Lottie
              animationData={LetSomeLight}
              loop
              autoplay
              initialSegment={[45, 380]}
            />
          </div>
        </div>
      </div>

      <div className="w-full h-[400px] md:h-[600px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.014105436104!2d-122.41941548468205!3d37.77492957975949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050c62!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1614123456789!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Company Location"
          className="filter grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
        ></iframe>
      </div>
    </section>
  );
}

export default AboutSection;
