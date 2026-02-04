import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import LetSomeLight from '../assets/animations/LetSomeLight.json';
import FacebookIcon from '../assets/icons/FacebookIcon';
import InstagramIcon from '../assets/icons/InstagramIcon';
import WhatsappIcon from '../assets/icons/WhatsappIcon';
import PhoneIcon from '../assets/icons/PhoneIcon';
import TelegramIcon from '../assets/icons/TelegramIcon';

function AboutSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section
      className=" pt-24 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex flex-col lg:flex-row items-center gap-16 px-6 md:px-20 mb-20">
        {/* LEFT SIDE - TEXT */}
        <div className="flex-1">
          <h2 className="font-[Expo-arabic] text-white text-[40px] md:text-[64px] mb-8 leading-tight text-start">
            {t('about_section.title')}
          </h2>

          <div className="text-white text-[16px] md:text-[24px] font-[Expo-arabic] mb-8 max-w-5xl leading-relaxed text-start">
            <p className="mb-4">{t('about_section.description')}</p>
            <span className="font-bold block">
              {t('about_section.core_products')}
            </span>
          </div>

          <ul className="list-none text-white space-y-4 ps-6 md:ps-16 mb-16 text-start">
            {t('about_section.product_list', { returnObjects: true }).map(
              (item, index) => (
                <li
                  key={index}
                  className="relative flex font-[Expo-book] items-center gap-3 before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:bg-white before:rounded-full"
                >
                  {item}
                </li>
              )
            )}
          </ul>

          <div className="flex flex-col md:flex-row items-center gap-6 mt-20">
            <span
              className={clsx(
                'text-6xl md:text-8xl text-white leading-none',
                isRTL ? 'font-[Expo-arabic]' : 'font-[Asteroid]'
              )}
            >
              {t('about_section.we')}
            </span>
            <p
              className={clsx(
                'font-[Expo-book] text-sm md:text-xl text-white max-w-2xl leading-relaxed border-t md:border-t-0 pt-4 md:pt-0 text-start',
                isRTL ? 'md:pr-4 border-white/10' : 'md:pl-4 border-white/10'
              )}
            >
              {t('about_section.we_description')}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - LOTTIE */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-[550px] lg:max-w-[750px]">
            <Lottie
              animationData={LetSomeLight}
              loop
              autoplay
              initialSegment={[45, 380]}
            />
          </div>
        </div>
      </div>



      {/* MAP & CONTACT INFO SECTION */}
      <div className="flex flex-col lg:flex-row w-full items-stretch overflow-hidden border-t border-white/5">

        {/* Contact Info Box */}
        <div className="w-full lg:w-1/3 p-10 md:p-12 lg:p-16 flex flex-col justify-between text-white">
          <div>
            <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest border-b border-white/10 pb-4">
              {t('footer.contact_us')}
            </h3>

            <div className="space-y-6">
              {/* Phone Numbers Section */}
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">
                  {t('footer.phone_label')}
                </span>

                <div className="space-y-5">
                  {/* Mobile Numbers */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-white/40 mb-1">
                      <WhatsappIcon size={14} />
                      <span className="text-[16px] uppercase tracking-widest">{t('footer.mobile') || 'Mobile'}</span>
                    </div>
                    {[
                      { tel: "+963930681449", label: "+963 930 681 449" },
                      { tel: "+963981096823", label: "+963 981 096 823" },
                      { tel: "+963930623299", label: "+963 930 623 299" }
                    ].map((num, idx) => (
                      <a key={idx} href={`tel:${num.tel}`} className="text-lg lg:text-xl font-light hover:text-[#E2995E] transition tracking-wider flex items-center gap-3 group" dir="ltr">
                        <span className="w-1 h-1 rounded-full bg-[#E2995E] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {num.label}
                      </a>
                    ))}
                  </div>

                  {/* Landline Number */}
                  <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-white/40 mb-1">
                      <PhoneIcon size={14} />
                      <span className="text-[16px] uppercase tracking-widest">{t('footer.landline') || 'Landline'}</span>
                    </div>
                    <a href="tel:0212310379" className="text-lg ml-0 md:ml-2 lg:text-xl font-light hover:text-[#E2995E] transition tracking-wider flex items-center gap-3 group" dir="ltr">
                      <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-[#E2995E] transition-colors"></span>
                      021 2310 379
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="flex flex-col pt-4 border-t border-white/5">
                <span className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">{t('footer.location_label')}</span>
                <p className="text-base lg:text-lg opacity-90 leading-relaxed font-[Expo-book]">
                  {t('footer.address_line1')}<br />
                  <span className="text-white/60 text-sm lg:text-base">{t('footer.address_line2')}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Social Icons - Fixed at the bottom of the box */}
          <div className="flex gap-3 pt-8 mt-auto">
            {[
              { icon: <FacebookIcon />, href: "https://facebook.com" },
              { icon: <InstagramIcon />, href: "https://instagram.com" },
              { icon: <WhatsappIcon />, href: "https://whatsapp.com" },
              { icon: <TelegramIcon />, href: "https://telegram.com" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-[#E2995E] hover:text-white rounded-xl transition-all duration-300 border border-white/10"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="w-full lg:w-2/3 min-h-[500px] lg:min-h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13316.483935634568!2d36.2861!3d33.5138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMwJzQ5LjciTiAzNsKwMTcnMDkuOSJF!5e0!3m2!1sen!2ssy!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '100%' }}
            allowFullScreen=""
            loading="lazy"
            title="Company Location"
            className="filter grayscale contrast-125 hover:grayscale-0 transition-all duration-1000 h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
