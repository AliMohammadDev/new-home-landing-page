import { useForm } from 'react-hook-form';
import { useEditProfile, useGetProfile } from '../../api/auth';
import { useEffect } from 'react';
import { addToast } from '@heroui/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
      name: values.name,
      email: values.email,
    };

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
        password: '',
        password_confirmation: '',
      });
    }
  }, [profile, reset]);

  if (isLoading) return null;

  return (
    <div className="w-full min-h-screen bg-[#025043] py-20 md:py-32 px-6 lg:px-20 text-white">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ================= LEFT: EDIT FORM ================= */}
        <div
          className="lg:col-span-2 rounded-2xl p-8 md:p-12 shadow-xl"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <h1 className="text-3xl font-[Expo-bold] text-center mb-10">
            {t('profile.edit_profile')}
          </h1>

          <form
            className="flex flex-col gap-6 font-[Expo-arabic]"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Name */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">{t('profile.full_name')}</label>
              <input
                {...register('name', { required: t('profile.full_name') })}
                type="text"
                className="px-4 py-2 rounded-lg text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-white"
              />
              {errors.name && (
                <span className="text-red-300 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">{t('profile.email')}</label>
              <input
                {...register('email', { required: t('profile.email') })}
                type="email"
                className="px-4 py-2 rounded-lg text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-white"
              />
              {errors.email && (
                <span className="text-red-300 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">{t('profile.new_password')}</label>
              <input
                {...register('password', {
                  minLength: {
                    value: 6,
                    message: t('profile.new_password') + ' ' + 'must be at least 6 characters',
                  },
                })}
                type="password"
                autoComplete="new-password"
                className="px-4 py-2 rounded-lg text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Confirm Password */}
            {password && (
              <div className="flex flex-col">
                <label className="mb-2 font-semibold">
                  {t('profile.confirm_password')}
                </label>
                <input
                  {...register('password_confirmation', {
                    validate: (value) =>
                      value === password || t('profile.confirm_password') + ' ' + 'does not match',
                  })}
                  type="password"
                  className="px-4 py-2 rounded-lg text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                />
                {errors.password_confirmation && (
                  <span className="text-red-300 text-sm">
                    {errors.password_confirmation.message}
                  </span>
                )}
              </div>
            )}

            {error && (
              <p className="text-red-300 text-sm text-center">
                {error.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-black hover:opacity-90 text-white  cursor-pointer rounded-lg font-semibold transition disabled:opacity-50"
            >
              {isPending ? t('profile.saving') : t('profile.save_changes')}
            </button>
          </form>
        </div>

        {/* ================= RIGHT: SIDE PANEL ================= */}
        <div
          className="rounded-2xl p-6 shadow-xl flex flex-col gap-6"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center text-black text-3xl font-bold">
              {profile.name?.charAt(0)}
            </div>
            <p className="font-semibold">{profile.name}</p>
            <p className="text-sm opacity-80">{profile.email}</p>
          </div>

          <div className="h-px bg-white/20" />

          {/* Account Info */}
          <div className="flex flex-col gap-3 text-sm">
            <p>📧 {t('profile.email_status')}: <span className="font-semibold">{t('profile.active')}</span></p>
            <p>🛒 {t('profile.orders')}: <Link to={'/my-orders'} className="font-semibold">{t('profile.view_orders')}</Link></p>
          </div>

          <div className="h-px bg-white/20" />

          {/* Actions */}
          <Link to={'/logout'} className="py-3 text-center rounded-lg bg-white/10 hover:bg-white/20 transition text-sm">
            {t('profile.logout')}
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Profile;
