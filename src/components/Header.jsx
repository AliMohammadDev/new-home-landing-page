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
      dir="ltr"
      className="w-full h-screen xl:h-[1500px] 2xl:h-[1800px] bg-cover bg-no-repeat bg-center md:bg-right relative overflow-hidden"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765358692/HomePage_xvczts.png)`,
      }}
    >
      {/* TEXT CONTAINER */}
      <div
        className="absolute z-10 top-20 sm:top-16 md:top-8 lg:top-24 xl:top-[400px] left-6 sm:left-10 md:left-16 lg:left-1 xl:left-5 2xl:left-30 p-4 sm:p-6 md:p-10 text-white"
      >
        {/* Header small text */}
        <div className="flex items-center gap-2 md:gap-3 mb-6 sm:mb-10 md:mb-4">
          <div className="w-6 h-px bg-[#E2995E]" />
          <span className={clsx(
            "text-[#E2995E] text-sm sm:text-lg md:text-2xl lg:text-3xl",
            isRTL ? "font-[Expo-arabic]" : "font-[Qanduchia]"
          )}>
            Cook, serve, impress
          </span>
        </div>

        {/* Main title */}
        <div className={clsx(
          "pl-6 sm:pl-8 md:pl-14",
          isRTL ? "font-[Expo-arabic]" : "font-[Qanduchia]"
        )}>
          <p className="text-sm sm:text-xl md:text-2xl lg:text-5xl mb-2 text-left">
            {t('header.main_title_line1')}
          </p>

          <p className="pl-6 sm:pl-2 text-sm sm:text-xl md:text-2xl lg:text-5xl text-left">
            {t('header.main_title_line2')}
          </p>
        </div>

        {/* Social Icons */}
        <div className="mt-12 md:mt-12">
          <div className="flex flex-col gap-6 items-start">
            <span className="cursor-pointer hover:text-gray-300"><FacebookIcon /></span>
            <span className="cursor-pointer hover:text-gray-300"><InstagramIcon /></span>
            <span className="cursor-pointer hover:text-gray-300"><WhatsappIcon /></span>
            <span className="cursor-pointer hover:text-gray-300"><TelegramIcon /></span>
          </div>
        </div>

        {/* Bottom Main Text */}
        <div className="mt-25 sm:mt-16 md:mt-20 lg:mt-10 xl:mt-30 2xl:mt-60 ml-6 sm:ml-16 md:ml-24 lg:ml-40 xl:ml-60">
          <p className="flex flex-wrap items-baseline gap-2 justify-start">
            <span className="font-[Asteroid] text-4xl sm:text-5xl md:text-7xl">
              Upgrade
            </span>
            <span className={clsx(
              "text-4xl font-[Expo-light]",
            )}>
              your Kitchen,
            </span>
          </p>
          <p className={clsx(
            "ml-10 md:ml-20 text-sm font-[Expo-light] sm:text-base md:text-4xl text-left",
          )}>
            elevate your cooking
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;