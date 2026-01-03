import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

function AboutSection() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    return (
        <section
            className="bg-[#EDEAE2] text-[#025043] mt-25 py-24 px-6 md:px-20 overflow-hidden"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Title */}
            <h2 className="font-[Expo-arabic] text-black text-[40px] md:text-[64px] block mb-8 leading-tight">
                {t('about_section.title')}
            </h2>

            {/* Description */}
            <div className="text-black text-[16px] md:text-[24px] font-[Expo-arabic] mb-8 max-w-5xl leading-relaxed">
                <p className="mb-4">
                    {t('about_section.description')}
                </p>
                <span className="font-bold block">
                    {t('about_section.core_products')}
                </span>
            </div>

            {/* Product list */}
            <ul className="list-none  text-black space-y-4 ps-6 md:ps-16 mb-16">
                {t('about_section.product_list', { returnObjects: true }).map((item, index) => (
                    <li
                        key={index}
                        className={clsx(
                            "relative flex font-[Expo-book] items-center gap-3 before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:bg-black before:rounded-full"
                        )}
                    >
                        {item}
                    </li>
                ))}
            </ul>

            {/* "We" section */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0 mt-20 relative">
                <span className={clsx(
                    " text-6xl md:text-8xl text-black leading-none z-10",
                    isRTL ? "font-[Expo-arabic] md:translate-x-8" : "font-[Asteroid] md:-translate-x-8"
                )}>
                    {t('about_section.we')}
                </span>
                <p className={clsx(
                    "font-[Expo-book] text-sm md:text-xl text-black max-w-2xl leading-relaxed border-t md:border-t-0 pt-4 md:pt-0",
                    isRTL ? "md:pr-4 border-black/10" : "md:pl-4 border-black/10"
                )}>
                    {t('about_section.we_description')}
                </p>
            </div>
        </section>
    );
}

export default AboutSection;