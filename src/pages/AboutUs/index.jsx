import { Link } from 'react-router-dom';
import LeftIcon from '../../assets/icons/LeftIcon';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon';

const AboutUs = () => {

  return (
    <div className="flex flex-col md:flex-row justify-around items-start text-black px-4 sm:px-6 lg:px-20 py-10 gap-6 bg-white min-h-screen ">
      {/* Back Button */}
      <div className="absolute top-2 sm:top-4 md:top-6 left-4 sm:left-6 z-20">
        <Link to={-1} className="hover:opacity-80 transition">
          <LeftIcon />
        </Link>
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 space-y-6 text-left md:border-gray-300 wrap-break-word leading-relaxed">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-[Asteroid]">
          About
          <span className="font-[Asteroid] text-5xl sm:text-6xl md:text-7xl ml-2">
            Us
          </span>
        </h1>

        <div className="w-full h-0.5 bg-black"></div>

        <div className="space-y-4 text-sm sm:text-base md:text-lg">
          <p>
            Almanzil-Alhadith is a company specialized in many different home
            tools and kitchenware in addition to other restaurant and hotel
            equipment and supplies.
          </p>
        </div>

        <div className="w-full h-0.5 bg-black"></div>

        <section className="text-[#025043]">
          <span className="font-[Expo-book] text-black text-3xl sm:text-4xl md:text-5xl block mb-6 pl-2 sm:pl-4 md:pl-0">
            Intro to the company
          </span>

          <p className="text-black text-sm sm:text-base md:text-2xl mb-4 pl-2 sm:pl-4 md:pl-0">
            Almanzel-Alhadith is a company specializing in providing
            high-quality kitchen tools and hospitality equipment for homes,
            restaurants, and hotels.
            <span className="text-black text-sm sm:text-lg md:text-[24px] block mb-4">
              Our core product range includes:
            </span>
          </p>

          <ul className="list-none font-[Expo-light] text-black space-y-2 pl-6 sm:pl-10 md:pl-20 text-sm sm:text-base md:text-lg">
            <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:mr-3 before:align-middle">
              Elegant glassware, cups, mugs, jars, and all tabletop essentials.
            </li>
            <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:mr-3 before:align-middle">
              Decorative homeware, gifts, crystal items, and ornaments. Premium.
            </li>
            <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:mr-3 before:align-middle">
              White porcelain and gold-accented porcelain for fine dining.
            </li>
            <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:mr-3 before:align-middle">
              Durable stainless steel and high-grade metal kitchen tools.
            </li>
            <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:mr-3 before:align-middle">
              Specialized equipment for meat, dairy, and cold storage.
            </li>
            <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:mr-3 before:align-middle">
              Plastic kitchenware, including chopping boards and fridge
              containers.
            </li>
          </ul>

          <div className="flex flex-col md:flex-row items-center md:items-end text-center md:text-left mt-10">
            <span className="font-[Asteroid] text-5xl sm:text-4xl md:text-7xl text-black relative md:-left-6 mb-6 -bottom-2  sm:-top-2">
              We
            </span>
            <p className="font-[Expo-book] text-xs sm:text-sm md:text-lg text-black max-w-2xl mt-2 md:mt-0 md:-left-5 leading-snug text-balance">
              combine functionality with refined aesthetics to meet the needs of
              both domestic and professional kitchens.
            </p>
          </div>
        </section>
        <div className="flex items-center gap-1 justify-end">
          <Link to={'/products'}
            className="px-6 py-1 bg-black text-white rounded-md hover:opacity-80 transition whitespace-nowrap">
            click to show gallery
          </Link>

          {/* Circle Chevron Icon */}
          <div className="w-9 h-9 flex items-center bg-black justify-center border border-black rounded-full hover:opacity-80 transition">
            <ChevronRightIcon color="white" />
          </div>
        </div>
      </div>

      {/* Divider line */}
      <div className="hidden md:block w-px bg-black h-auto mx-8 self-stretch"></div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pl-10 flex flex-col items-center md:items-start">
        <div className="w-[80%] sm:w-[70%] md:w-[90%] mx-auto">
          <img
            src="https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765366635/home-logo-black_dicco2.svg"
            alt="Home Logo 1"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-full h-0.5 my-8 bg-black"></div>
        <div className="w-[80%] sm:w-[70%] md:w-[90%] mx-auto">
          <img
            src="https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765367108/Home-Log2_s17e8a.svg"
            alt="Home Logo 2"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
