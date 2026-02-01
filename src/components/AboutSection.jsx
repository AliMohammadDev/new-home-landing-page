import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import LetSomeLight from '../assets/animations/LetSomeLight.json';

function AboutSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section
      className="bg-[#EDEAE2] py-24 px-6 md:px-20 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT SIDE - TEXT */}
        <div className="flex-1">
          <h2 className="font-[Expo-arabic] text-black text-[40px] md:text-[64px] mb-8 leading-tight">
            {t('about_section.title')}
          </h2>

          <div className="text-black text-[16px] md:text-[24px] font-[Expo-arabic] mb-8 max-w-5xl leading-relaxed">
            <p className="mb-4">{t('about_section.description')}</p>
            <span className="font-bold block">
              {t('about_section.core_products')}
            </span>
          </div>

          <ul className="list-none text-black space-y-4 ps-6 md:ps-16 mb-16">
            {t('about_section.product_list', { returnObjects: true }).map(
              (item, index) => (
                <li
                  key={index}
                  className="relative flex font-[Expo-book] items-center gap-3 before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:bg-black before:rounded-full"
                >
                  {item}
                </li>
              )
            )}
          </ul>

          <div className="flex flex-col md:flex-row items-center gap-6 mt-20">
            <span
              className={clsx(
                'text-6xl md:text-8xl text-black leading-none',
                isRTL ? 'font-[Expo-arabic]' : 'font-[Asteroid]'
              )}
            >
              {t('about_section.we')}
            </span>

            <p
              className={clsx(
                'font-[Expo-book] text-sm md:text-xl text-black max-w-2xl leading-relaxed border-t md:border-t-0 pt-4 md:pt-0',
                isRTL ? 'md:pr-4 border-black/10' : 'md:pl-4 border-black/10'
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
    </section>
  );
}

export default AboutSection;
