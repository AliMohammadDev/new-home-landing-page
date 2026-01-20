import website from '../assets/images/website.svg';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FacebookIcon from '../assets/icons/FacebookIcon';
import InstagramIcon from '../assets/icons/InstagramIcon';
import WhatsappIcon from '../assets/icons/WhatsappIcon';
import TelegramIcon from '../assets/icons/TelegramIcon';
import { Link } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isLightFooter =
    location.pathname.includes('/about') ||
    location.pathname.includes('/product-info');

  const isRTL = i18n.language === 'ar';

  return (
    <footer className={`font-[Expo-book] ${isRTL ? 'direction-rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top line */}
      <div className="w-full h-0.5 bg-white"></div>

      {/* Section 1 */}
      <div className="bg-[#024538] border-b border-[#EDEAE2]/30">
        <div className={`flex flex-col md:flex-row items-center w-full ${isRTL ? 'md:flex-row-reverse' : ''}`}>

          <div className="flex-1 flex items-center justify-center gap-3 py-2 md:py-0">
            <img src={website} alt="website" className="w-5 h-5 lg:w-6 lg:h-6 opacity-90" />
            <span className="text-white text-sm md:text-[16px] lg:text-[22px] font-light">
              {t('footer.website_url')}
            </span>
          </div>

          <div className="hidden md:block w-px bg-[#EDEAE2]/30 h-10 mx-2"></div>

          <div className={`flex-1 flex items-center justify-center gap-4 py-2 md:py-0 ${isRTL ? 'font-[Expo-arabic]' : 'font-[Qanduchia]'}`}>
            <img
              src="https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765366635/home-logo-white_c2et5l.svg"
              alt="logo"
              className="w-10 h-10 lg:w-14 lg:h-14 object-contain"
            />
            <span className="text-white text-sm md:text-[18px] lg:text-[25px] tracking-widest uppercase">
              {t('footer.brand_name')}
            </span>
          </div>

          <div className="hidden md:block w-px bg-[#EDEAE2]/30 h-10 mx-2"></div>

          <div className="flex-1 flex items-center justify-center py-2 md:py-0">
            <span className="text-white text-sm md:text-[16px] lg:text-[22px] font-light">
              {t('footer.category')}
            </span>
          </div>

        </div>
      </div>

      <div className="w-full h-0.5 bg-white"></div>

      {/* Section 2 */}
      <div className={`${isLightFooter ? 'bg-white text-black' : 'bg-black text-white'} py-12 px-6 md:px-20`}>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 ${isRTL ? 'md:text-right' : 'md:text-left'}`}>

          {/* Follow Us - Social Media Links */}
          <div>
            <h3 className="text-sm font-bold mb-8 uppercase tracking-[0.2em]">{t('footer.follow_us')}</h3>
            <ul className="space-y-5 text-sm">
              <li className="group">
                <Link to={'https://www.facebook.com'} className={`flex items-center gap-3 transition-all duration-300 ${isLightFooter ? 'hover:text-blue-600' : 'hover:text-blue-400'}`}>
                  <span className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors"><FacebookIcon /></span>
                  <span className="opacity-80 group-hover:opacity-100">Facebook</span>
                </Link>
              </li>
              <li className="group">
                <Link to={'https://www.instagram.com'} className={`flex items-center gap-3 transition-all duration-300 ${isLightFooter ? 'hover:text-pink-600' : 'hover:text-pink-400'}`}>
                  <span className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors"><InstagramIcon /></span>
                  <span className="opacity-80 group-hover:opacity-100">Instagram</span>
                </Link>
              </li>
              <li className="group">
                <Link to={'https://www.whatsapp.com'} className={`flex items-center gap-3 transition-all duration-300 ${isLightFooter ? 'hover:text-green-600' : 'hover:text-green-400'}`}>
                  <span className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors"><WhatsappIcon /></span>
                  <span className="opacity-80 group-hover:opacity-100">Whatsapp</span>
                </Link>
              </li>
              <li className="group">
                <Link to={'https://www.telegram.com'} className={`flex items-center gap-3 transition-all duration-300 ${isLightFooter ? 'hover:text-sky-600' : 'hover:text-sky-400'}`}>
                  <span className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors"><TelegramIcon /></span>
                  <span className="opacity-80 group-hover:opacity-100">Telegram</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-sm font-bold mb-8 uppercase tracking-[0.2em]">{t('footer.pages')}</h3>
            <ul className="space-y-4 text-sm">
              {['home', 'featured', 'about_us', 'contacts', 'new_collection'].map((item) => (
                <li key={item}>
                  <a href="#" className={`opacity-80 transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-current hover:after:w-full hover:opacity-100 ${isLightFooter ? 'hover:text-black' : 'hover:text-[#EDEAE2]'}`}>
                    {t(`footer.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-bold mb-8 uppercase tracking-[0.2em]">{t('footer.contact_us')}</h3>
            <div className="space-y-6 text-sm">
              <div className="flex flex-col space-y-1">
                <span className="text-sm uppercase tracking-widest opacity-50">{t('footer.email_label') || 'Email'}</span>
                <a href="mailto:almanzel.alhadith@gmail.com" className="hover:underline decoration-1 underline-offset-4">almanzel.alhadith@gmail.com</a>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm uppercase tracking-widest opacity-50">{t('footer.phone_label') || 'Phone'}</span>
                <span dir="ltr" className="font-medium">+963 951 548 855</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm uppercase tracking-widest opacity-50">{t('footer.location_label') || 'Location'}</span>
                <div className="flex flex-col space-y-1">

                  <p className="opacity-80 leading-relaxed">
                    {t('footer.address_line1')}<br />
                    {t('footer.address_line2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className={`flex flex-col md:flex-row justify-between items-center md:items-end mt-20 pt-8 border-t ${isLightFooter ? 'border-gray-200' : 'border-white/10'} ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className={`text-sm md:text-xs uppercase tracking-widest ${isLightFooter ? 'text-gray-600' : 'text-gray-400'}`}>
            © {new Date().getFullYear()} {t('footer.copyright')}
          </div>

          <h2 className={`mt-6 md:mt-0 text-2xl md:text-4xl lg:text-3xl xl:text-5xl font-[Expo-arabic] sm:text-center md:text-right ${isLightFooter ? 'text-black' : 'text-white'}`}>
            {t('footer.company_name')}
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;