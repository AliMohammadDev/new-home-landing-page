import { useForm } from 'react-hook-form';
import { useEditProfile, useGetProfile } from '../../api/auth';
import { useEffect } from 'react';
import { addToast } from '@heroui/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddressIcon from '../../assets/icons/AddressIcon';
import ProfileIcon from '../../assets/icons/ProfileIcon';

function Profile() {
  const { t } = useTranslation();
  const { data: profile, isLoading } = useGetProfile();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const {
    mutate: updateProfile,
    isPending,
    error,
  } = useEditProfile(() => {
    addToast({
      title: t('profile.edit_profile'),
      description: t('profile.profile_updated'),
      color: 'success',
      duration: 4000,
      isClosable: true,
    });
  });

  const password = watch('password');

  const onSubmit = (values) => {
    const payload = {
      ...values,
    };

    if (!values.password || values.password.trim() === "") {
      delete payload.password;
      delete payload.password_confirmation;
    }

    if (values.password) {
      payload.password = values.password;
      payload.password_confirmation = values.password_confirmation;
    }

    updateProfile(payload);
  };



  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        email: profile.email,
        first_name: profile.checkout?.first_name || '',
        last_name: profile.checkout?.last_name || '',
        phone: profile.checkout?.phone || '',
        country: profile.checkout?.country || '',
        city: profile.checkout?.city || '',
        street: profile.checkout?.street || '',
        postal_code: profile.checkout?.postal_code || '',
        additional_information: profile.checkout?.additional_information || '',
        password: '',
        password_confirmation: '',
      });
    }
  }, [profile, reset]);

  if (isLoading) return null;

  return (
    <div className="w-full min-h-screen bg-[#025043] py-20 md:py-32 px-6 lg:px-20 mt-10 text-white font-[Expo-arabic]">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

        {/* ================= LEFT: CONSOLIDATED FORM ================= */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-2 space-y-8"
        >
          {/* Section 1: Account Information */}
          <div
            className="rounded-2xl p-8 md:p-10 shadow-xl border border-white/10"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h2 className="text-2xl font-[Expo-bold] mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
              <ProfileIcon className="w-6 h-6" />
              <span>{t('profile.edit_profile')}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold">{t('profile.full_name')}</label>
                <input
                  {...register('name', { required: t('profile.full_name') })}
                  className="px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold">{t('profile.email')}</label>
                <input
                  {...register('email', { required: t('profile.email') })}
                  className="px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold">{t('profile.new_password')}</label>
                <input
                  {...register('password', {
                    minLength: { value: 6, message: t('errors.password_too_short') }
                  })}
                  type="password"
                  placeholder="••••••••"
                  className={`px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 transition ${errors.password ? 'ring-2 ring-red-500' : 'focus:ring-white'
                    }`}
                />
                {errors.password && (
                  <span className="text-red-300 text-xs mt-1 font-medium px-1 italic">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {password && (
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-semibold">{t('profile.confirm_password')}</label>
                  <input
                    {...register('password_confirmation', {
                      validate: v => v === password || t('profile.passwords_not_match') // تأكد من مفتاح الترجمة هذا
                    })}
                    type="password"
                    placeholder="••••••••"
                    className={`px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 transition ${errors.password_confirmation ? 'ring-2 ring-red-500' : 'focus:ring-white'
                      }`}
                  />
                  {errors.password_confirmation && (
                    <span className="text-red-300 text-xs mt-1 font-medium px-1 italic">
                      {errors.password_confirmation.message}
                    </span>
                  )}
                </div>
              )}


            </div>
          </div>

          {/* Section 2: Shipping Address */}
          <div
            className="rounded-2xl p-8 md:p-10 shadow-xl border border-white/10"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h2 className="text-2xl font-[Expo-bold] mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
              <AddressIcon className="w-6 h-6" />
              <span>{t('checkout.address')}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold">{t('checkout.first_name')}</label>
                <input
                  {...register('first_name', { required: true })}
                  type="text"
                  placeholder={t('checkout.first_name')}
                  className="px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white transition placeholder:text-gray-400"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold">{t('checkout.last_name')}</label>
                <input
                  {...register('last_name', { required: true })}
                  type="text"
                  placeholder={t('checkout.last_name')}
                  className="px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white transition placeholder:text-gray-400"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold">{t('checkout.phone')}</label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="+963 xxxx xxx xxx"
                  className="px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white transition placeholder:text-gray-400"
                />
              </div>

              {/* Country */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold">{t('checkout.country')}</label>
                <input
                  {...register('country')}
                  placeholder="Syria"
                  className="px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white transition placeholder:text-gray-400"
                />
              </div>

              {/* City */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold">{t('checkout.city')}</label>
                <input
                  {...register('city')}
                  placeholder="Damascus"
                  className="px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white transition placeholder:text-gray-400"
                />
              </div>

              {/* Street */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold">{t('checkout.street')}</label>
                <input
                  {...register('street')}
                  placeholder="Al-Hamra Street"
                  className="px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white transition placeholder:text-gray-400"
                />
              </div>

              {/* Postal Code */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold">{t('checkout.postal_code')}</label>
                <input
                  {...register('postal_code')}
                  type="number"
                  placeholder="0000"
                  className="px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white transition placeholder:text-gray-400"
                />
              </div>

              {/* Additional Info */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold">{t('checkout.additional_information')}</label>
                <input
                  {...register('additional_information')}
                  placeholder="Near the main square"
                  className="px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white transition placeholder:text-gray-400"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-10 py-4 bg-black hover:bg-zinc-900 text-white cursor-pointer rounded-xl font-bold shadow-2xl transition active:scale-95 disabled:opacity-50"
            >
              {isPending ? t('profile.saving') : t('profile.save_changes')}
            </button>

            {error && <p className="text-red-300 text-center mt-4 text-sm font-semibold">{error.message}</p>}
          </div>
        </form>

        {/* ================= RIGHT: SIDE PANEL ================= */}
        <div className="lg:col-span-1 sticky top-32">
          <div
            className="rounded-2xl p-8 shadow-xl flex flex-col gap-6 border border-white/10"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center text-black text-3xl font-bold shadow-lg">
                {profile.name?.charAt(0)}
              </div>
              <div>
                <p className="font-[Expo-bold] text-xl">{profile.name}</p>
                <p className="text-sm opacity-70">{profile.email}</p>
              </div>
            </div>

            <div className="h-px bg-white/20" />

            <div className="flex flex-col gap-4 text-sm font-[Expo-book]">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                <span>📧 {t('profile.email_status')}</span>
                <span className="text-green-400 font-bold">{t('profile.active')}</span>
              </div>
              <Link
                to={'/my-orders'}
                className="flex justify-between items-center p-3 bg-white/5 hover:bg-white/10 rounded-xl transition"
              >
                <span>🛒 {t('profile.orders')}</span>
                <span className="font-bold underline">{t('profile.view_orders')}</span>
              </Link>
            </div>

            <div className="h-px bg-white/20" />

            <Link
              to={'/logout'}
              className="py-3 text-center rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-100 transition text-sm font-semibold"
            >
              {t('profile.logout')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
