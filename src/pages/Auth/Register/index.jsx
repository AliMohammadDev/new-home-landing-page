import { Link } from 'react-router-dom';
import EmailIcon from '../../../assets/icons/EmailIcon';
import PasswordIcon from '../../../assets/icons/PasswordIcon';
import NameIcon from '../../../assets/icons/NameIcon';
import LeftIcon from '../../../assets/icons/LeftIcon';
import { useForm } from 'react-hook-form';
import { useRegister } from '../../../api/auth';
import { useTranslation } from 'react-i18next';
import loginBG from "../../../assets/images/login.jpg";
import homeLogoWhite from "../../../assets/images/home-logo-white.svg";
import GoogleIcon from '../../../assets/icons/GoogleIcon';


function Register() {
  const { register: formRegister, handleSubmit } = useForm();
  const { mutate: registerUser, isPending: loading, error } = useRegister();
  const { t, i18n } = useTranslation();

  const onSubmit = (values) => registerUser(values);

  return (
    <div
      className="w-full min-h-screen bg-cover bg-no-repeat relative bg-center md:bg-right"
      style={{ backgroundImage: `url(${loginBG})` }}
    >
      <div className="absolute top-1 md:top-6 left-6 z-20">
        <Link to={-1} className="hover:opacity-80 transition active:scale-95">
          <LeftIcon />
        </Link>
      </div>

      <div className="flex h-screen items-center justify-center bg-cover bg-center relative font-[Expo-arabic]">
        <div className="relative w-full max-w-md px-4">
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

            <h2 className="text-2xl mb-1">{t('auth.welcome_register')}</h2>
            <p className="text-gray-200 mb-6">{t('auth.register_desc')}</p>

            {error && (
              <div className="mb-4 rounded-md bg-red-500/20 border border-red-500/40 px-3 py-2 text-sm text-red-200">
                {error.message}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <div className="relative">
                <div className="pointer-events-none absolute left-1 top-1/2 -translate-y-1/2">
                  <NameIcon />
                </div>
                <input
                  {...formRegister('name')}
                  type="text"
                  placeholder={t('auth.full_name')}
                  className="block w-full rounded-md border border-white/20 bg-white/20 px-3 py-3 pl-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 sm:text-sm"
                  required
                  autoComplete="name"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <div className="pointer-events-none absolute left-1 top-1/2 -translate-y-1/2">
                  <EmailIcon />
                </div>
                <input
                  {...formRegister('email')}
                  type="text"
                  placeholder={t('auth.email_placeholder')}
                  className="block w-full rounded-md border border-white/20 bg-white/20 px-3 py-3 pl-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 sm:text-sm"
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <div className="pointer-events-none absolute left-1 top-1/2 -translate-y-1/2">
                  <PasswordIcon />
                </div>
                <input
                  {...formRegister('password')}
                  type="password"
                  placeholder={t('auth.password_placeholder')}
                  className="block w-full rounded-md border border-white/20 bg-white/20 px-3 py-3 pl-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 sm:text-sm"
                  required
                  autoComplete="new-password"
                />
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <div className="pointer-events-none absolute left-1 top-1/2 -translate-y-1/2">
                  <PasswordIcon />
                </div>
                <input
                  {...formRegister('password_confirmation')}
                  type="password"
                  placeholder={t('auth.confirm_password')}
                  className="block w-full rounded-md border border-white/20 bg-white/20 px-3 py-3 pl-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 sm:text-sm"
                  required
                  autoComplete="new-password"
                />
              </div>

              {/* Terms */}
              <div className="flex justify-center sm:justify-between items-center gap-3 text-sm text-gray-200 mt-4">
                <label className="flex items-center gap-2 select-none">
                  <input type="checkbox" className="accent-white w-4 h-4 cursor-pointer" required />
                  <span>{t('auth.terms')}</span>
                </label>
              </div>

              {/* Submit */}
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-xl cursor-pointer py-3 active:scale-95 font-semibold transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:opacity-90'
                  }`}
              >
                {loading ? t('auth.signing_up') : t('auth.sign_up')}
              </button>

              {/* Divider (OR) */}
              <div className="relative my-6 flex items-center">
                <div className="grow border-t border-white/20"></div>
                <span className="mx-4 shrink text-xs uppercase text-gray-300">
                  {t('auth.or')}
                </span>
                <div className="grow border-t border-white/20"></div>
              </div>

              {/* Google Register Button */}
              <Link
                to={'http://127.0.0.1:8000/api/login-google'}
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-white py-3 text-black font-medium transition hover:bg-gray-100 active:scale-95 cursor-pointer shadow-lg"
              >
                <GoogleIcon />
                <span>{t('auth.continue_with_google')}</span>
              </Link>

              {/* Login Link */}
              <div className="text-center text-sm text-white mt-4">
                {t('auth.have_account')}{' '}
                <Link to="/login" className="text-white hover:underline">
                  {t('auth.login_here')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
