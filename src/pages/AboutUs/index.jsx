import { Link } from 'react-router-dom';
import LeftIcon from '../../assets/icons/LeftIcon';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIcon';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t, i18n } = useTranslation();


  return (
    <div
      className={`flex flex-col lg:flex-row ${i18n.language === 'ar' ? 'lg:flex-row-reverse' : ''
        } justify-around items-start text-black px-4 sm:px-6 lg:px-20 py-10 gap-6 bg-white min-h-screen relative`}
    >


      {/* Back Button */}
      <Link to={-1} className="hover:opacity-80 transition">
        <LeftIcon className={i18n.language === 'ar' ? 'rotate-180' : ''} />
      </Link>


      {/* Text Section */}
      <div
        className={`w-full lg:w-1/2 space-y-6 text-start wrap-break-word leading-relaxed
    ${i18n.language === 'ar' ? 'lg:order-2' : 'lg:order-1'}
  `}
      >

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-[Asteroid]">
          {t('about.about_us')}
        </h1>

        <div className="w-full h-0.5 bg-black"></div>

        <div className="space-y-4 text-sm sm:text-base md:text-lg">
          <p>{t('about.company_desc')}</p>
        </div>

        <div className="w-full h-0.5 bg-black"></div>

        <section className="text-[#025043]">
          <span className="font-[Expo-book] text-black text-3xl sm:text-4xl md:text-5xl block mb-6 ps-2 sm:ps-4 md:ps-0">
            {t('about.intro_company')}
          </span>

          <p className="text-black text-sm sm:text-base md:text-2xl mb-4 ps-2 sm:ps-4 md:ps-0">
            {t('about.company_desc')}
            <span className="text-black text-sm sm:text-lg md:text-[24px] block mb-4">
              {t('about.core_products')}
            </span>
          </p>

          <ul className="list-none font-[Expo-arabic] text-black space-y-2 ps-6 sm:ps-10 md:ps-20 text-sm sm:text-base md:text-lg">
            <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:me-3 before:align-middle">
              {t('about.product_1')}
            </li>
            <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:me-3 before:align-middle">
              {t('about.product_2')}
            </li>
            <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:me-3 before:align-middle">
              {t('about.product_3')}
            </li>
            <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:me-3 before:align-middle">
              {t('about.product_4')}
            </li>
            <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:me-3 before:align-middle">
              {t('about.product_5')}
            </li>
            <li className="relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:me-3 before:align-middle">
              {t('about.product_6')}
            </li>
          </ul>

          <div className="flex flex-col md:flex-row items-center md:items-end text-center md:text-start mt-10">
            <p className="font-[Expo-book] text-xs sm:text-sm md:text-lg text-black max-w-2xl mt-2 md:mt-0 leading-snug text-balance">
              {t('about.we_desc')}
            </p>
          </div>
        </section>

        {/* Gallery Link */}
        <div className="flex items-center gap-1 justify-end">
          <Link
            to={'/products'}
            className="px-6 py-1 bg-black text-white font-[Expo-arabic] rounded-md hover:opacity-80 transition whitespace-nowrap"
          >
            {t('about.click_gallery')}
          </Link>

          <div className="w-9 h-9 flex items-center bg-black justify-center border border-black rounded-full">
            {
              i18n.language === 'ar' ? (
                <ChevronLeftIcon
                  color="white"
                />
              ) : (
                <ChevronRightIcon
                  color="white"
                />
              )
            }

          </div>
        </div>

        {/* Google Map */}
        <div className="mt-10 w-full h-64 md:h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103019.56928146418!2d37.230985581401605!3d36.20640640850586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152ff86477bcc0bb%3A0x15e58eabbe0ff127!2z2YLZhNi52Kkg2K3ZhNioLi4uLg!5e0!3m2!1sar!2snl!4v1766520804768!5m2!1sar!2snl"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Company Location"
          ></iframe>
        </div>
      </div>

      {/* Divider line */}
      <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-black"></div>



      {/* Image Section */}
      <div
        className={`w-full lg:w-1/2 mt-10 lg:mt-0 flex flex-col
    ${i18n.language === 'ar'
            ? 'lg:items-end lg:pe-10'
            : 'lg:items-start lg:ps-10'
          }
    items-center`}
      >
        <div className="w-[80%]">
          <img
            src="https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765366635/home-logo-black_dicco2.svg"
            alt="Home Logo 1"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="self-stretch h-0.5 my-8 lg:-ml-33 lg:mr-22 bg-black"></div>


        <div className="w-[80%]">
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
