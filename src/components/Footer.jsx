import website from '../assets/images/website.svg';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isLightFooter =
    location.pathname.includes('/about') ||
    location.pathname.includes('/product-info');

  const isRTL = i18n.language === 'ar';

  return (
    <footer className={`font-[Expo-book] ${isRTL ? 'direction-rtl' : ''}`}>
      {/* Top line */}
      <div className="w-full h-0.5 bg-white"></div>

      {/* Section 1 */}
      <div className="bg-[#024538] py-1 px-6 md:px-20 border-b border-[#EDEAE2]/30">
        <div className={`flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left text-sm md:text-base  tracking-wide space-y-4 md:space-y-0 w-full ${isRTL ? 'md:flex-row-reverse font-[Expo-arabic]' : 'font-[Qanduchia]'}`}>

          <div className="flex items-center justify-center md:justify-between w-full md:w-auto gap-2 md:gap-4">
            <span className="text-white md:text-[15px] lg:text-[25px]">{t('footer.website_url')}</span>
            <img src={website} alt="website" className="w-7 h-7 md:w-[30px] md:h-[30px]" />
          </div>

          <div className="hidden md:block w-px bg-[#EDEAE2] mx-6 self-stretch"></div>

          <div className="flex items-center justify-center md:justify-between w-full md:w-auto gap-2 md:gap-4">
            <img
              src="https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765366635/home-logo-white_c2et5l.svg"
              alt="circle"
              className="w-[60px] h-[60px] md:w-[90px] md:h-10 object-contain"
            />
            <span className="mr-2 md:ml-2 md:text-[15px] lg:text-[25px] text-white">{t('footer.brand_name')}</span>
          </div>

          <div className="hidden md:block w-px bg-[#EDEAE2] mx-6 self-stretch"></div>

          <span className="md:text-[15px] text-white lg:text-[25px]">{t('footer.category')}</span>
        </div>
      </div>


      <div className="w-full h-0.5 bg-white"></div>

      {/* Section 2 */}
      <div className={`${isLightFooter ? 'bg-white text-black' : 'bg-black text-white'} py-12 px-6 md:px-20`}>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 ${isRTL ? 'md:text-right' : 'md:text-left'}`}>

          {/* Follow Us */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide">{t('footer.follow_us')}</h3>
            <ul className="space-y-2 text-sm">
              {/* <li>{t('footer.email')}</li>
              <li>{t('footer.phone')}</li>
              <li>{t('footer.location')}</li> */}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide">{t('footer.pages')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className={`${isLightFooter ? 'hover:text-gray-500' : 'hover:text-[#EDEAE2]'}`}>{t('footer.home')}</a></li>
              <li><a href="#" className={`${isLightFooter ? 'hover:text-gray-500' : 'hover:text-[#EDEAE2]'}`}>{t('footer.featured')}</a></li>
              <li><a href="#" className={`${isLightFooter ? 'hover:text-gray-500' : 'hover:text-[#EDEAE2]'}`}>{t('footer.about_us')}</a></li>
              <li><a href="#" className={`${isLightFooter ? 'hover:text-gray-500' : 'hover:text-[#EDEAE2]'}`}>{t('footer.contacts')}</a></li>
              <li><a href="#" className={`${isLightFooter ? 'hover:text-gray-500' : 'hover:text-[#EDEAE2]'}`}>{t('footer.new_collection')}</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide">{t('footer.contact_us')}</h3>
            <ul className="space-y-2 text-sm">
              {/* <li>{t('footer.email')}</li>
              <li>{t('footer.phone')}</li>
              <li>{t('footer.location')}</li> */}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className={`flex flex-col md:flex-row justify-between items-center md:items-end mt-20 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className={`text-xs ${isLightFooter ? 'text-gray-600' : 'text-gray-300'}`}>
            {t('footer.copyright')}
          </div>

          <h2 className={`mt-4 md:mt-0 text-2xl md:text-4xl lg:text-3xl xl:text-5xl font-[Expo-arabic] sm:text-center md:text-right ${isLightFooter ? 'text-black' : 'text-white'}`}>
            {t('footer.company_name')}
          </h2>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
