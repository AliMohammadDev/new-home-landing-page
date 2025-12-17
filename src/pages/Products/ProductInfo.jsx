import { Link } from 'react-router-dom';
import LeftIcon from '../../assets/icons/LeftIcon';
import PlusIcon from '../../assets/icons/PlusIcon';
import MinusIcon from '../../assets/icons/MinusIcon';
import CloseIcon from '../../assets/icons/CloseIcon';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon';

const ProductInfo = () => {
  return (
    <div className="w-full text-black px-4 md:px-10 lg:px-20 py-10 bg-white min-h-screen relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <Link to={-1} className="hover:opacity-80 transition">
          <LeftIcon />
        </Link>
      </div>
      {/* Title */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl text-center font-bold">
        DESCRIPTION OF PRODUCTS
      </h1>
      <hr className="mt-5 border-[#025043]" />
      {/* Category Menu */}
      <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:space-x-15 mt-4 text-sm md:text-base">
        <span className="font-bold">Cookware</span>
        <span>Bowl</span>
        <span>Mugs</span>
        <span>Utensil</span>
        <span>Tableware</span>
        <span>Cups</span>
      </div>
      <hr className="mt-4 border-[#025043]" />
      {/* Main Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mt-1">
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765364809/productInfo_d9c0pg.png"
            alt="product-info"
            className="w-full h-auto object-cover shadow-md rounded-2xl"
          />
          <p className="mt-10 text-center text-black leading-relaxed">
            Almanzel-Alhadith is a company specializing in providing
            high-quality kitchen tools and hospitality equipment for homes,
            restaurants, and hotels.
          </p>
        </div>
        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col md:flex-row justify-between gap-8 items-stretch relative">
          {/* Left Subsection */}
          <div className="md:w-1/2 pr-4 flex-1 space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold font-[Expo-arabic]">
              CHASSEUR ROUND FRENCH OVEN
            </h2>
            {/* Price */}
            <div className="text-lg">
              <span className="line-through text-gray-400">1,000,000 sp</span>
              <br />
              <span className="font-bold text-black">500,000 sp</span>{' '}
              <span className="bg-yellow-300 px-2 py-0.5 rounded-full text-sm font-medium">
                50% OFF PRP
              </span>
            </div>
            {/* Colors */}
            <div className="space-x-2">
              <span className="font-bold font-[Expo-arabic] ">COLORS</span>
              <br />
              <span className="inline-block w-4 h-4 bg-gray-400 rounded-full border-white"></span>
              <span className="inline-block w-4 h-4 bg-yellow-400 rounded-full border-white"></span>
              <span className="inline-block w-4 h-4 bg-green-500 rounded-full border-white"></span>
              <span className="inline-block w-4 h-4 bg-red-500 rounded-full border-white"></span>
            </div>
            {/* Size */}
            <div className="text-sm">
              <span className="font-bold font-[Expo-arabic]">
                Size
                <br />
              </span>{' '}
              Large one size available
            </div>
            {/* Rating */}
            <div className="font-bold font-[Expo-arabic]">
              Rate
              <br />
              <span className="text-[#025043]">☆ ☆ ☆ ☆ ☆</span>
              <span className="ml-2 font-bold">out of 5 stars</span>
            </div>
            {/* Quantity + Add to cart */}
            <div className="flex flex-col mt-6 w-full">
              <div className="flex items-center justify-between w-full">
                {/* Quantity Controls */}
                <div className="relative flex items-center border-white rounded-md bg-gray-200 px-2 py-1">
                  <button className="p-2 ml-1 rounded-full bg-black text-white hover:opacity-80 cursor-pointer">
                    <PlusIcon color="black" />
                  </button>

                  <span className="px-4 text-black p-1 font-bold text-center">
                    0
                  </span>

                  <button className="p-2 -ml-1 rounded-full bg-black text-white hover:opacity-80 cursor-pointer">
                    <MinusIcon color="black" />
                  </button>
                </div>

                {/* Add to Cart + Chevron Icon */}
                <div className="flex items-center gap-2">
                  <button className="px-6 py-1 bg-black  text-white rounded-md hover:opacity-80 transition whitespace-nowrap">
                    Add to Cart
                  </button>

                  {/* Circle Chevron Icon */}
                  <div className="w-8 h-8 bg-black flex items-center justify-center border border-black rounded-full hover:opacity-80 transition">
                    <ChevronRightIcon color="white" />
                  </div>
                </div>
              </div>
              {/* Add to favorites */}
              <a
                href="#"
                className="text-xs text-gray-600 mt-1 mr-12 text-right hover:underline-offset-2"
              >
                Add to favorites+
              </a>
            </div>
            <hr className="mt-6 border-[#025043]" />
            <p className="font-[Expo-arabic] text-black">
              Elegant glassware, cups, mugs, jars, and all tabletop essentials.
            </p>
            <p className="font-[Expo-arabic] text-black">
              Decorative homeware, gifts, crystal items, and ornaments.
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 border-l-2 border-[#025043] mx-auto"></div>

          {/* Right Subsection */}
          <div className="md:w-1/2 pl-4 flex-1 space-y-3">
            <div className="flex items-center gap-2 text-sm  text-gray-500">
              <span className='hover:opacity-80'>
                <CloseIcon />
              </span>
              <span>Remove</span>
            </div>

            <h3 className="text-xl md:text-2xl font-semibold font-[Expo-arabic]">
              PRODUCT DESCRIPTION
            </h3>
            <p className="mt-2 text-black leading-relaxed font-[Expo-arabic]">
              Stainless steel cooking pot with transparent cover for easy
              monitoring during cooking.
            </p>

            <div className="mt-4">
              <h4 className="font-semibold text-lg font-[Expo-arabic]">
                MATERIAL
              </h4>
              <p className="text-black mt-1 leading-relaxed font-[Expo-arabic]">
                Made of lasting enamel cast iron for even heat distribution,
                better heat retention, and prevention of hot spots.
              </p>
            </div>
            <hr className="mt-6 border-[#025043]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
