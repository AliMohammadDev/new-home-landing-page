import { Link } from 'react-router-dom';
import EmailIcon from '../../../assets/icons/EmailIcon';
import LeftIcon from '../../../assets/icons/LeftIcon';
import { useForm } from 'react-hook-form';
import { useForgotPassword } from '../../../api/auth';
import { useTranslation } from 'react-i18next';
import loginBG from "../../../assets/images/login.jpg";
import homeLogoWhite from "../../../assets/images/home-logo-white.svg";


function ForgetPassword() {
  const { register, handleSubmit } = useForm();
  const { mutate: forgotPassword, isPending: loading, error, isSuccess } = useForgotPassword();
  const { t, i18n } = useTranslation();

  const onSubmit = (values) => forgotPassword(values);

  return (
    <div
      className="w-full min-h-screen bg-cover bg-no-repeat relative bg-center md:bg-right"
      style={{ backgroundImage: `url(${loginBG})` }}

    >
      {/* Back */}
      <div className="absolute top-1 md:top-6 left-6 z-20">
        <Link to={-1} className="hover:opacity-80 transition">
          <LeftIcon />
        </Link>
      </div>

      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div
            className="rounded-2xl bg-white/10 backdrop-blur-md p-8 shadow-2xl border border-white/20 text-white"
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="flex mb-6 justify-center">
              <img
                src={homeLogoWhite}
                className="w-20 h-15"
                alt="Home Logo"
              />
            </div>

            <h2 className="text-2xl mb-1">{t('auth.forgot_password')}</h2>
            <p className="text-gray-200 mb-6">{t('auth.forgot_desc')}</p>

            {error && (
              <div className="mb-4 rounded-md bg-red-500/20 border border-red-500/40 px-3 py-2 text-sm text-red-200">
                {error.message}
              </div>
            )}

            {isSuccess && (
              <div className="mb-4 rounded-md bg-green-500/20 border border-green-500/40 px-3 py-2 text-sm text-green-200">
                {t('auth.send_reset')}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <div className="relative">
                <div className="pointer-events-none absolute left-1 top-1/2 -translate-y-1/2">
                  <EmailIcon />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  placeholder={t('auth.email_placeholder')}
                  className="block w-full rounded-md border border-white/20 bg-white/20 px-3 py-3 pl-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 sm:text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full cursor-pointer rounded-xl py-2 font-semibold transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:opacity-90'
                  }`}
              >
                {loading ? t('auth.sending') : t('auth.send_reset')}
              </button>

              <div className="text-center text-sm text-white mt-4">
                {t('auth.remembered')}{' '}
                <Link to="/login" className="hover:underline">
                  {t('auth.login_here')}
                </Link>
              </div>

              <div className="text-center text-sm text-white mt-2">
                {t('auth.no_account')}{' '}
                <Link to="/register" className="hover:underline">
                  {t('auth.create_account')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
