import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import { useState } from 'react';

function AllProductSlider3({ products = [] }) {
  const { t } = useTranslation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const CustomNextArrow = () => {
    if (!isHovering) return null;

    return (
      <div
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          pointerEvents: 'none',
          position: 'fixed',
          zIndex: 9999,
        }}
        className="font-[Expo-arabic] transform -translate-x-1/2 -translate-y-1/2 
                 bg-black text-white text-sm font-bold w-20 h-20 sm:w-24 sm:h-24 
                 flex items-center justify-center rounded-full shadow-lg transition-transform duration-100 ease-out"
      >
        {t('slider.drag')}
      </div>
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      className="bg-[#EDEAE2] text-[#025043] py-10 relative overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CustomNextArrow />

      <div className="grid grid-cols-1 gap-10">
        <Slider {...settings}>
          {products.map((variant, i) => (
            <div key={variant.id ?? i} className="px-2">
              <div className="bg-[#EDEAE2] overflow-hidden border border-[#D8D5CD] h-112 sm:h-128 md:h-144">
                <img
                  src={variant.image}
                  alt={variant.product?.name}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default AllProductSlider3;