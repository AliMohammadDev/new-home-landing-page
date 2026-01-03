import React from 'react';
import { useTranslation } from 'react-i18next';
import FacebookIcon from '../assets/icons/FacebookIcon';
import InstagramIcon from '../assets/icons/InstagramIcon';
import WhatsappIcon from '../assets/icons/WhatsappIcon';
import TelegramIcon from '../assets/icons/TelegramIcon';
import clsx from 'clsx';

const Header = () => {
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === 'ar';

  return (
    <div
      className="
        w-full 
        h-screen 
        xl:h-[1500px] 
        2xl:h-[1800px]
        bg-cover bg-no-repeat bg-center md:bg-right 
        relative
      "
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765358692/HomePage_xvczts.png)`,
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* TEXT CONTAINER */}
      <div
        className={`
          absolute z-10
          top-20 sm:top-16 md:top-8 lg:top-24 xl:top-[400px] 
          ${isRTL ? 'right-6 sm:right-10 md:right-16 lg:right-1 xl:right-5 2xl:right-30' : 'left-6 sm:left-10 md:left-16 lg:left-1 xl:left-5 2xl:left-30'}
          p-4 sm:p-6 md:p-10 
          text-white font-[Expo-arabic]
          ${isRTL ? 'text-right' : 'text-left'}
        `}
      >
        {/* Header small text */}
        <div className={
          clsx("flex items-center gap-2 md:gap-3 mb-6 sm:mb-10 md:mb-4",
            isRTL ? "font-[Expo-arabic]" : "font-[Qanduchia]"
          )
        }>
          <div className="w-6 h-px bg-[#E2995E]" />
          <span className="text-[#E2995E] text-sm sm:text-lg md:text-2xl lg:text-3xl">
            {t('header.small_text')}
          </span>
        </div>

        {/* Main title */}
        <div className={
          clsx("ms-6 sm:ms-8 md:ms-14",
            isRTL ? "font-[Expo-arabic]" : "font-[Qanduchia]"
          )
        }>
          <p className="text-sm sm:text-xl md:text-2xl lg:text-5xl mb-2">
            {t('header.main_title_line1')}
          </p>
          <p className="ms-6 sm:ms-2 text-sm sm:text-xl md:text-2xl lg:text-5xl">
            {t('header.main_title_line2')}
          </p>
        </div>

        {/* Social Icons */}
        <div className="mt-12 md:mt-12">
          <div className="flex flex-col items-start gap-6">
            <span className="cursor-pointer hover:text-gray-300"><FacebookIcon /></span>
            <span className="cursor-pointer hover:text-gray-300"><InstagramIcon /></span>
            <span className="cursor-pointer hover:text-gray-300"><WhatsappIcon /></span>
            <span className="cursor-pointer hover:text-gray-300"><TelegramIcon /></span>
          </div>
        </div>

        {/* Bottom Main Text */}
        <div className="mt-25 sm:mt-16 md:mt-20 lg:mt-10 xl:mt-30 2xl:mt-60 ms-6 sm:ms-16 md:ms-24 lg:ms-40 xl:ms-60">
          <p>
            <span className={
              clsx("font-[Asteroid] text-4xl sm:text-5xl md:text-7xl",
                isRTL ? "font-[Expo-arabic]" : "font-[Asteroid]"
              )
            }>
              {t('header.bottom_text_bold')}
            </span>
            <span className={
              clsx("font-[Expo-light] space-x-2 rtl:space-x-reverse text-4xl",
                isRTL ? "font-[Expo-arabic]" : "font-[Expo-light]"
              )
            }>{t('header.bottom_text_light')}</span>
          </p>
          <p className={
            clsx("font-[Expo-light] ms-10 md:ms-20 text-sm sm:text-base md:text-4xl",
              isRTL ? "font-[Expo-arabic]" : "font-[Expo-light]"
            )
          }>
            {t('header.bottom_subtext')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;