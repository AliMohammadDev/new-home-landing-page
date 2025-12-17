import website from '../assets/images/website.svg';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const isLightFooter =
    location.pathname.includes('/about') ||
    location.pathname.includes('/product-info');

  return (
    <footer className="text-white font-[Expo-book]">
      <div className="w-full h-0.5 bg-white"></div>
      <div className="bg-[#024538] py-1 px-6 md:px-20 border-b border-[#EDEAE2]/30">
        {/* section 1 */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left text-sm md:text-base font-[Qanduchia] tracking-wide space-y-4 md:space-y-0 w-full">
          <div className="flex items-center justify-center md:justify-between w-full md:w-auto">
            <span className="text-left mr-2 md:text-[15px] lg:text-[25px]">
              /https://almanzel-alhadith.com
            </span>
            <img
              src={website}
              alt="website"
              className="w-7 h-7 md:w-[30px] md:h-[30px]"
            />
          </div>

          <div className="hidden md:block w-px h-10 bg-[#EDEAE2] mx-6"></div>

          <div className="flex items-center justify-center md:justify-between w-full md:w-auto flex-row-reverse md:flex-row">
            <img
              src="https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765366635/home-logo-white_c2et5l.svg"
              alt="circle"
              className="w-[35px] h-[34px] md:w-[38px] md:h-[38px]"
            />
            <span className="mr-2 md:ml-2 md:text-[15px] lg:text-[25px]">
              Almanzil-Alhadith
            </span>
          </div>

          <div className="hidden md:block w-px h-10 bg-[#EDEAE2] mx-6"></div>

          <span className="md:text-[15px] lg:text-[25px]">
            Kitchenware
          </span>
        </div>
      </div>
      <div className="w-full h-0.5 bg-white"></div>
      {/* section 2 */}
      <div
        className={`${isLightFooter ? 'bg-white text-black' : 'bg-black text-white'} py-12 px-6 md:px-20`}
      >
        <div className="grid grid-cols-1 md:grid-cols-6 text-center md:text-left">
          <div className="hidden md:block col-span-3"></div>

          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide">
              FOLLOW US
            </h3>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide">PAGES</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className={`${isLightFooter ? 'hover:text-gray-500' : 'hover:text-[#EDEAE2]'}`}

                >
                  HOME
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${isLightFooter ? 'hover:text-gray-500' : 'hover:text-[#EDEAE2]'}`}

                >
                  FEATURED
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${isLightFooter ? 'hover:text-gray-500' : 'hover:text-[#EDEAE2]'}`}

                >
                  ABOUT US
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${isLightFooter ? 'hover:text-gray-500' : 'hover:text-[#EDEAE2]'}`}

                >
                  CONTACTS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${isLightFooter ? 'hover:text-gray-500' : 'hover:text-[#EDEAE2]'}`}

                >
                  NEW COLLECTION
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide">
              CONTACT US
            </h3>
            <ul className="text-sm space-y-2">
              {/* <li>Email: info@almanzel-alhadith.com</li>
            <li>Phone: +963 xxx xxx xxx</li>
            <li>Location: Aleppo, Syria</li> */}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mt-20">
          <div
            className={`text-left text-xs ${isLightFooter ? 'text-gray-600' : 'text-gray-300'}`}
          >
            2025 Almanzel-Alhadith company. All Rights Reserved.
          </div>

          <h2
            className={`mt-4 md:mt-0 text-2xl md:text-4xl lg:text-3xl xl:text-5xl font-[Expo-arabic] sm:text-center md:text-right ${isLightFooter ? 'text-black' : 'text-white'
              }`}
          >
            AL-MANZEL AL-HADITH
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
