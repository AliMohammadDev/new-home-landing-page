import { useForm } from "react-hook-form";
import { useAddCheckout } from "../../api/checkout";
import { addToast } from "@heroui/react";
import { useGetProfile } from '../../api/auth';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Checkouts() {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();
  const { data: profile } = useGetProfile();

  const { mutate, isPending: loading } = useAddCheckout();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (!profile?.active_cart?.id) {
      addToast({
        title: t('checkout.contact_information'),
        description: t('toast.no_active_cart'),
        color: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const payload = {
      ...data,
      cart_id: profile.active_cart.id,
    };

    mutate(payload, {
      onSuccess: (checkout) => {
        addToast({
          title: t('checkout.contact_information'),
          description: t('toast.success'),
          color: 'success',
          duration: 4000,
          isClosable: true,
        });
        reset();
        navigate(`orders/${checkout.data.id}`);
      },
      onError: (error) => {
        addToast({
          title: t('checkout.contact_information'),
          description: error.message || t('toast.failed'),
          color: 'error',
          duration: 4000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start text-white px-6 lg:px-20 py-16 md:py-32 gap-10 md:gap-16 bg-[#025043] min-h-screen font-[Expo-arabic]">
      {/* Left Side - Contact Information */}
      <div className="w-full md:w-1/2 p-8 bg-white/10 backdrop-blur-lg rounded-2xl space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide">{t('checkout.contact_information')}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              {...register('first_name', { required: true })}
              type="text"
              placeholder={t('checkout.first_name')}
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              {...register('last_name', { required: true })}
              type="text"
              placeholder={t('checkout.last_name')}
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder={t('checkout.email')}
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              {...register('phone', { required: true })}
              type="tel"
              placeholder={t('checkout.phone')}
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
          </div>

          {/* Address Title */}
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide pt-4">{t('checkout.address')}</h2>

          {/* Row 3 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              {...register('country', { required: true })}
              type="text"
              placeholder={t('checkout.country')}
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              {...register('city', { required: true })}
              type="text"
              placeholder={t('checkout.city')}
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
          </div>

          {/* Row 4 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              {...register('street')}
              type="text"
              placeholder={t('checkout.street')}
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              {...register('floor')}
              type="text"
              placeholder={t('checkout.floor')}
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
          </div>

          {/* Row 5 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              {...register('postal_code')}
              type="number"
              placeholder={t('checkout.postal_code')}
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              {...register('additional_information')}
              type="text"
              placeholder={t('checkout.additional_information')}
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
          </div>

          {/* Save Button */}
          <button
            disabled={loading}
            type="submit"
            className={`w-full py-4 cursor-pointer rounded-xl font-bold transition
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:opacity-90 text-white'}`}
          >
            {loading ? t('checkout.sending') : t('checkout.save_continue')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkouts;
