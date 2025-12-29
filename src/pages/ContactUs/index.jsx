import { useForm } from 'react-hook-form';
import { useSendMail } from '../../api/auth';
import { addToast } from '@heroui/react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isPending: loading } = useSendMail();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        addToast({
          title: t('contact.form_heading'),
          description: t('contact.contact_success'),
          color: 'success',
          duration: 4000,
          isClosable: true,
        });
        reset();
      },
      onError: (error) => {
        addToast({
          title: t('contact.form_heading'),
          description: error.message || 'Failed to send message. Please try again.',
          color: 'error',
          duration: 4000,
          isClosable: true,
        });
      },
    });
  };

  const isRtl = i18n.language === 'ar';

  return (
    <div
      className={`w-full flex flex-col md:flex-row justify-between items-start text-white px-6 lg:px-20 py-16 md:py-32 gap-10 md:gap-16 bg-[#025043] min-h-screen font-[Expo-arabic]`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Left Text Overlay */}
      <div
        className={`w-full rounded-t-4xl md:w-1/2 space-y-6 p-8 font-[Qanduchia] translate-y-6 
          ${isRtl ? 'text-right md:order-2' : 'text-left md:order-1'}`}
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-4xl text-white font-bold leading-snug">
          {t('contact.heading')}
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-3xl text-white leading-snug">
          {t('contact.subheading')}
        </h2>
        <p className="text-sm sm:text-base md:text-base leading-relaxed text-gray-200 font-[Expo-arabic]">
          {t('contact.description')}
        </p>
      </div>

      {/* Right Form */}
      <div
        className={`w-full md:w-1/2 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg mt-10 md:mt-4
          ${isRtl ? 'md:mr-10 md:order-1' : 'md:ml-10 md:order-2'}`}
      >
        <h2 className={`text-3xl sm:text-4xl md:text-3xl font-[Qanduchia] font-bold mb-4 ${isRtl ? 'text-right' : 'text-left'} text-white`}>
          {t('contact.form_heading')}
        </h2>
        <p className={`text-gray-200 text-sm sm:text-base md:text-sm mb-6 ${isRtl ? 'text-right' : 'text-left'}`}>
          {t('contact.form_description')}
        </p>

        <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('name', { required: true })}
            type="text"
            required
            placeholder={t('contact.name_placeholder')}
            className="w-full p-3 rounded-md bg-white/20 text-white border-0 outline-none focus:outline-none focus:ring-2 focus:ring-white"
          />

          <input
            {...register('email', { required: true })}
            type="email"
            required
            placeholder={t('contact.email_placeholder')}
            className="w-full p-3 rounded-md bg-white/20 text-white border-0 outline-none focus:outline-none focus:ring-2 focus:ring-white"
          />

          <textarea
            {...register('message', { required: true })}
            required
            rows="5"
            placeholder={t('contact.message_placeholder')}
            className="w-full p-3 rounded-md bg-white/20 text-white border-0 outline-none focus:outline-none focus:ring-2 focus:ring-white"
          />

          <button
            disabled={loading}
            type="submit"
            className={`w-full py-2 rounded-xl transition cursor-pointer
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:opacity-90'}`}
          >
            {loading ? t('contact.sending') : t('contact.send_button')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
