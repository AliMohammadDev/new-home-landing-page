import Lottie from 'lottie-react';
import loading from '../assets/animations/loading.json';
import homeLogoWhite from "../assets/images/home-logo-white.svg";
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

function Loading({ fullScreen }) {

  const { t } = useTranslation();
  return (
    <div className={clsx(
      "flex flex-col items-center justify-center gap-12 bg-[#025043] ",
      fullScreen ? "fixed inset-0 z-50 h-screen w-screen" : "mt-20 w-full"
    )}>

      <div className="w-full max-w-[800px] md:max-w-[600px] mt-20 ">
        <Lottie
          animationData={loading}
          loop={true}
          autoplay={true}
          style={
            {
              transform: 'rotate(180deg)'
            }
          }
        />
      </div>
      {/* Logo */}
      <div className="flex justify-center w-full">
        <img
          src={homeLogoWhite}
          className="h-30 w-auto"
          alt="Loading Logo"
        />
      </div>

      {/* Lottie Animation */}
      <div className="w-full max-w-[800px] md:max-w-[600px]">
        <Lottie
          animationData={loading}
          loop={true}
          autoplay={true}
        />
      </div>

      <span className="text-white font-[Expo-book] text-xl md:text-2xl tracking-widest animate-bounce">
        {t('loading.text', 'Loading...')}
      </span>
    </div>
  );
}

export default Loading;
