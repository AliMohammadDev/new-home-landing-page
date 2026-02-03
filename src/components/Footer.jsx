import website from '../assets/images/website.svg';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FacebookIcon from '../assets/icons/FacebookIcon';
import InstagramIcon from '../assets/icons/InstagramIcon';
import WhatsappIcon from '../assets/icons/WhatsappIcon';
import TelegramIcon from '../assets/icons/TelegramIcon';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const Footer = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isLightFooter =
    location.pathname.includes('/about') ||
    location.pathname.includes('/product-info');

  const isRTL = i18n.language === 'ar';

  return (
    <footer className={`font-[Expo-book] ${isRTL ? 'direction-rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full h-0.5 bg-[#025043]"></div>

      {/* Section 2 */}
      <div className={`${isLightFooter ? 'bg-white text-black' : 'bg-black text-white'} py-12 px-6 md:px-20`}>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 ${isRTL ? 'md:text-right' : 'md:text-left'}`}>

          {/* Follow Us - Social Media Links */}
          <div>
            <h3 className="text-lg mr-0 md:mr-2 font-bold mb-8 uppercase tracking-[0.2em]">{t('footer.follow_us')}</h3>
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
            <h3 className="text-lg font-bold mb-8 uppercase tracking-[0.2em]">
              {t('footer.quick_links')}
            </h3>
            <ul className="space-y-4 text-sm">
              {[
                { key: 'home', path: '/' },
                { key: 'products', path: '/products' },
                { key: 'about_us', path: '/about' },
                { key: 'contact', path: '/contact' },
                { key: 'my_profile', path: '/profile' },
                { key: 'wishlist', path: '/wishlists' },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.path}
                    className={clsx(
                      "text-[16px] opacity-80 transition-all duration-300 hover:opacity-100 relative inline-block after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-current hover:after:w-full",
                      isLightFooter ? 'hover:text-[#E2995E]' : 'hover:text-[#E2995E]'
                    )}
                  >
                    {t(`footer.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-8 uppercase tracking-[0.2em]">
              {t('footer.contact_us')}
            </h3>
            <div className="space-y-6 text-sm">

              {/* Email Section */}
              <div className="flex flex-col space-y-1">
                <span className="text-sm uppercase tracking-widest opacity-50">
                  {t('footer.email_label') || 'Email'}
                </span>
                <a
                  href="mailto:almanzel.alhadith@gmail.com"
                  className="hover:text-[#E2995E] transition underline text-sm decoration-1 underline-offset-4"
                >
                  almanzel.alhadith@gmail.com
                </a>
              </div>

              {/* Phone Section */}
              <div className="flex flex-col space-y-1">
                <span className="text-sm uppercase tracking-widest opacity-50 mb-1">
                  {t('footer.phone_label') || 'Phone'}
                </span>

                <div className="flex flex-col space-y-3">
                  <a
                    href="tel:+963930681449"
                    className="flex items-center gap-2 hover:text-[#E2995E] transition group"
                  >
                    <span className="font-medium tracking-wider" dir="ltr">
                      +963 930 681 449
                    </span>
                  </a>

                  <a
                    href="tel:+963981096823"
                    className="flex items-center gap-2 hover:text-[#E2995E] transition group"
                  >
                    <span className="font-medium tracking-wider" dir="ltr">
                      +963 981 096 823
                    </span>
                  </a>

                  <a
                    href="tel:+963930623299"
                    className="flex items-center gap-2 hover:text-[#E2995E] transition group"
                  >
                    <span className="font-medium tracking-wider" dir="ltr">
                      +963 930 623 299
                    </span>
                  </a>
                </div>
              </div>

              {/* Location Section */}
              <div className="flex flex-col space-y-1">
                <span className="text-sm uppercase tracking-widest opacity-50">
                  {t('footer.location_label') || 'Location'}
                </span>
                <p className="opacity-80 leading-relaxed">
                  {t('footer.address_line1')}<br />
                  {t('footer.address_line2')}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className={`flex flex-col md:flex-row justify-between items-center md:items-end mt-20 pt-8 border-t ${isLightFooter ? 'border-gray-200' : 'border-white/10'} ${isRTL ? 'md:flex-row-reverse' : ''}`}>

          <div className={`text-sm md:text-xs uppercase tracking-widest ${isLightFooter ? 'text-gray-600' : 'text-gray-400'}`}>
            © {new Date().getFullYear()} {t('footer.copyright')}
          </div>

          <h2 className={`mt-6 md:mt-0 text-2xl md:text-4xl lg:text-3xl xl:text-5xl font-[Expo-arabic] ${isRTL ? 'md:text-right' : 'md:text-left'} ${isLightFooter ? 'text-black' : 'text-white'}`}>
            {t('footer.company_name')}
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

