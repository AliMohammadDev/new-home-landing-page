import { useTranslation } from 'react-i18next';
import { Link, useRouteError } from 'react-router-dom';

const ErrorFallback = () => {
  const error = useRouteError();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className="flex h-svh items-center p-16 bg-[#EDEAE2] font-[Expo-arabic]"
    >
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold">
            <span className="sr-only">{t('ErrorFallback.title')}</span>
            404
          </h2>

          <p className="text-2xl font-semibold md:text-3xl">
            {t('ErrorFallback.notFound')}
          </p>

          <p className="mb-8 mt-4 text-gray-800">
            {t('ErrorFallback.description')}
          </p>

          <Link
            to="/"
            className="font-[Expo-bold] rounded px-8 py-3 bg-[#025043] text-white hover:bg-[#015045] transition"
          >
            {t('ErrorFallback.backHome')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorFallback;
