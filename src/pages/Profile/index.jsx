import { useForm } from 'react-hook-form';
import { useEditProfile, useGetProfile } from '../../api/auth';
import { useEffect } from 'react';
import { addToast, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddressIcon from '../../assets/icons/AddressIcon';
import ProfileIcon from '../../assets/icons/ProfileIcon';
import { useGetShipping } from '../../api/shipping';
import { Select, SelectItem } from "@heroui/react";
function Profile() {
  const { t } = useTranslation();
  const { data: profile, isLoading } = useGetProfile();
  const { data: shippingCities } = useGetShipping();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
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
    });
  });

  const password = watch('password');
  const selectedCountry = watch('country');

  const onSubmit = (values) => {
    const payload = { ...values };

    if (values.country === 'Syria') {
      const selectedCity = shippingCities?.find(c => c.id == values.shipping_city_id);
      payload.city = selectedCity ? selectedCity.city_name : values.city;
      payload.country = 'Syria';
      payload.shipping_city_id = values.shipping_city_id;
    } else {
      payload.country = values.city;
      payload.shipping_city_id = null;
    }

    if (!values.password || values.password.trim() === "") {
      delete payload.password;
      delete payload.password_confirmation;
    }

    updateProfile(payload);
  };

  useEffect(() => {
    if (profile) {
      const isInternational = profile.checkout?.country && profile.checkout?.country !== 'Syria';

      reset({
        name: profile.name,
        email: profile.email,
        first_name: profile.checkout?.first_name || '',
        last_name: profile.checkout?.last_name || '',
        phone: profile.checkout?.phone || '',
        country: isInternational ? 'International' : 'Syria',
        city: profile.checkout?.city || '',
        shipping_city_id: profile.checkout?.shipping_city_id || '',
        street: profile.checkout?.street || '',
        floor: profile.checkout?.floor || '',
        postal_code: profile.checkout?.postal_code || '',
        additional_information: profile.checkout?.additional_information || '',
        password: '',
        password_confirmation: '',
      });
    }
  }, [profile, reset]);

  if (isLoading) return null;

  return (
    <div className="w-full min-h-screen bg-[#025043] py-20 md:py-32 px-4 md:px-6 lg:px-20 mt-10 text-white font-[Expo-arabic] overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

        {/* ================= LEFT: FORM ================= */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-8 w-full">

          {/* Section 1: Account Info */}
          <div className="rounded-2xl p-6 md:p-10 shadow-xl border border-white/10 bg-white/10 backdrop-blur-md w-full">
            <h2 className="text-xl md:text-2xl font-[Expo-bold] mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
              <ProfileIcon className="w-6 h-6" />
              <span>{t('profile.edit_profile')}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm font-semibold">{t('profile.full_name')}</label>
                <input
                  {...register('name', { required: true })}
                  className="w-full px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white transition"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm font-semibold">{t('profile.email')}</label>
                <input
                  {...register('email', { required: true })}
                  className="w-full px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white transition"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm font-semibold">{t('profile.new_password')}</label>
                <input
                  {...register('password', { minLength: 6 })}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white transition"
                />
              </div>

              {password && (
                <div className="flex flex-col w-full animate-in fade-in duration-300">
                  <label className="mb-2 text-sm font-semibold">{t('profile.confirm_password')}</label>
                  <input
                    {...register('password_confirmation', {
                      validate: v => v === password || t('profile.passwords_not_match')
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white transition"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Address */}
          <div className="rounded-2xl p-6 md:p-10 shadow-xl border border-white/10 bg-white/10 backdrop-blur-md w-full">
            <h2 className="text-xl md:text-2xl font-[Expo-bold] mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
              <AddressIcon className="w-6 h-6" />
              <span>{t('checkout.address')}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm font-semibold">{t('checkout.first_name')}</label>
                <input {...register('first_name', { required: true })} className="w-full px-4 py-3 rounded-xl text-black bg-white/90 outline-none" />
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm font-semibold">{t('checkout.last_name')}</label>
                <input {...register('last_name', { required: true })} className="w-full px-4 py-3 rounded-xl text-black bg-white/90 outline-none" />
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm font-semibold">{t('checkout.phone')}</label>
                <input {...register('phone')} placeholder="+963..." className="w-full px-4 py-3 rounded-xl text-black bg-white/90 outline-none" />
              </div>



              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm font-semibold">{t('checkout.country')}</label>
                <Select
                  aria-label={t('checkout.country')}
                  placeholder={t('checkout.select_country')}
                  selectedKeys={[watch('country') || "Syria"]}
                  className="w-full"
                  classNames={{
                    trigger: "bg-white/90 rounded-xl h-12",
                    value: "text-black",
                  }}
                  onChange={(e) => {
                    setValue('country', e.target.value);
                    if (e.target.value !== 'Syria') setValue('shipping_city_id', '');
                  }}
                >
                  <SelectItem key="Syria" textValue={t('countries.syria')} className="text-black"
                    classNames={{
                      title: "text-sm font-bold font-[Expo-arabic]"
                    }}
                  >
                    {t('countries.syria')}
                  </SelectItem>
                  <SelectItem key="International" textValue={t('countries.outside_syria')}
                    className="text-black"
                    classNames={{
                      title: "text-sm font-bold font-[Expo-arabic]"
                    }}
                  >
                    {t('countries.outside_syria')}
                  </SelectItem>
                </Select>
                <input type="hidden" {...register('country', { required: true })} />
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm font-semibold">
                  {selectedCountry === 'Syria' ? t('checkout.city') : t('checkout.country_and_city')}
                </label>

                {selectedCountry === 'Syria' ? (
                  <Select
                    aria-label={t('checkout.city')}
                    placeholder={t('checkout.select_city')}
                    selectedKeys={watch('shipping_city_id') ? [String(watch('shipping_city_id'))] : []}
                    className="w-full"
                    classNames={{
                      trigger: "bg-white/90 rounded-xl h-12",
                      value: "text-black",
                    }}
                    onChange={(e) => setValue('shipping_city_id', e.target.value)}
                  >
                    {(shippingCities || []).map((city) => (
                      <SelectItem key={city.id} textValue={city.city_name}
                        className="text-black"
                        classNames={{
                          title: "text-sm font-bold font-[Expo-arabic]"
                        }}
                      >
                        {city.city_name}
                      </SelectItem>
                    ))}
                  </Select>
                ) : (
                  <input
                    {...register('city', { required: selectedCountry !== 'Syria' })}
                    placeholder={t('checkout.enter_country_and_city')}
                    className="w-full px-4 py-3 rounded-xl text-black bg-white/90 outline-none focus:ring-2 focus:ring-white transition"
                  />
                )}
                <input type="hidden" {...register('shipping_city_id', { required: selectedCountry === 'Syria' })} />
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm font-semibold">{t('checkout.floor')}</label>
                <input {...register('floor')} className="w-full px-4 py-3 rounded-xl text-black bg-white/90 outline-none" />
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm font-semibold">{t('checkout.street')}</label>
                <input {...register('street')} className="w-full px-4 py-3 rounded-xl text-black bg-white/90 outline-none" />
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm font-semibold">{t('checkout.postal_code')}</label>
                <input {...register('postal_code')} type="number" className="w-full px-4 py-3 rounded-xl text-black bg-white/90 outline-none" />
              </div>

              <div className="flex flex-col w-full md:col-span-2">
                <label className="mb-2 text-sm font-semibold">{t('checkout.additional_information')}</label>
                <textarea
                  {...register('additional_information')}
                  rows="2"
                  className="w-full px-4 py-3 rounded-xl text-black bg-white/90 outline-none resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-10 py-4 bg-black hover:bg-zinc-900 text-white rounded-xl font-bold transition-all disabled:opacity-50 active:scale-[0.98] shadow-lg"
            >
              {isPending ? t('profile.saving') : t('profile.save_changes')}
            </button>
          </div>
        </form>

        {/* ================= RIGHT: SIDE PANEL ================= */}
        <div className="lg:col-span-1 lg:sticky w-full">
          <div className="rounded-2xl p-8 shadow-xl border border-white/10 bg-white/10 backdrop-blur-md text-center w-full">
            <div className="w-24 h-24 rounded-full bg-white/90 mx-auto flex items-center justify-center text-black text-3xl font-bold shadow-lg mb-4">
              {profile.name?.charAt(0)}
            </div>
            <div className="mb-6">
              <p className="font-[Expo-bold] text-xl truncate">{profile.name}</p>
              <p className="text-sm opacity-70 truncate">{profile.email}</p>
            </div>
            <div className="h-px bg-white/20 mb-6" />
            <Link to={'/my-orders'} className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition flex justify-between items-center mb-4">
              <span>🛒 {t('profile.orders')}</span>
              <span className="font-bold underline text-xs">{t('profile.view_orders')}</span>
            </Link>
            <Link to={'/logout'} className="block py-3 bg-red-500/20 hover:bg-red-500/40 text-red-100 rounded-xl text-sm font-semibold transition">
              {t('profile.logout')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;