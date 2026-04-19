import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import clsx from 'clsx';

import HomeSlider from './HomeSlider';

const Header = () => {
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
      ></Swiper>
      <HomeSlider />
    </>
  );
};

export default Header;
