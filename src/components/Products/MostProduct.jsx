import { useState } from 'react';
import Slider from 'react-slick';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.jsx';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIcon.jsx';
import ArrowRightLong from '../../assets/icons/ArrowRightLong.jsx';
import { Link } from 'react-router-dom';

function MostProduct({ products = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);


  const CustomArrow = ({ onClick, direction }) => (
    <button
      onClick={onClick}
      className="absolute bg-white/30 backdrop-blur-md cursor-pointer text-black rounded-full w-12 h-12 transition flex items-center justify-center"
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        left: direction === 'prev' ? 10 : 'auto',
        right: direction === 'next' ? 10 : 'auto',
        zIndex: 10,
      }}
    >
      {direction === 'next' ? (
        <ChevronRightIcon color="white" />
      ) : (
        <ChevronLeftIcon color="black" />
      )}
    </button>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  // const progress = ((currentSlide + 1) / 4) * 100;
  const progress = products.length > 0 ? ((currentSlide + 1) / products.length) * 100 : 0;


  return (
    <section className="bg-[#EDEAE2] md:px-20 py-10 md:py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 items-start">
        {/* text */}
        <div className="flex flex-col">
          <div className="flex flex-col mt-40 md:mt-10 md:flex-row items-center gap-10">
            <span className="font-[Expo-arabic] text-7xl md:text-6xl xl:text-8xl text-black">
              Most
            </span>
            <span className="font-[Asteroid] mb-20 md:mb-0 text-8xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl">
              Popular
            </span>
          </div>
          <div className=" md:text-xl lg:text-xl mt-4 md:mt-8 ml-5 md:ml-0">
            <p>We preserve every moment with gifts that speak from the heart</p>
            <p className="mt-2">
              timeless pieces crafted to celebrate love, warmth, and meaningful
              occasions.
            </p>
          </div>

          <Link to={'/products'} >
            <div className="ml-4 md:ml-0 text-sm font-[Expo-arabic] cursor-pointer flex items-center gap-1">
              click to show products <ArrowRightLong />
            </div>
          </Link>
        </div>

        <div className="relative w-full">
          <Slider {...settings}>
            {products.map((product, i) => (
              <div key={i} className="md:px-1">
                <div
                  key={i}
                  className="bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD]"
                >
                  <img
                    src={product.image}
                    alt="stainless steel cookware"
                    className="w-full h-48 sm:h-56 md:h-60 lg:h-64 object-cover"
                  />

                  <div className="mt-5 ml-3 md:ml-3">
                    <h3 className="text-black text-[16px] font-[Qanduchia] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-black text-sm mb-4 font-[Expo-arabic] line-clamp-3">
                      {product.body}
                    </p>
                    <span> {product.final_price} $</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          <div className="mt-6 px-2 md:px-0">
            <div className="w-full h-1 md:h-1 bg-gray-500 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-center mt-20 text-black font-[Expo-arabic] mx-auto max-w-2xl">
        specialized in many different home tools and kitchenware in addition to
        other restaurant and hotels equipment and stuffs.
      </div>
    </section>
  );
}

export default MostProduct;
