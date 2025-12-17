import { useForm } from 'react-hook-form';
import { useSendMail } from '../../api/auth';
import { addToast } from '@heroui/react';

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isPending: loading } = useSendMail();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        addToast({
          title: 'Contact Us',
          description: 'Message sent successfully!',
          color: 'success',
          duration: 4000,
          isClosable: true,
        });

        reset();
      },
      onError: (error) => {
        addToast({
          title: 'Contact Us',
          description:
            error.message || 'Failed to send message. Please try again.',
          color: 'error',
          duration: 4000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start text-white px-6 lg:px-20 py-16 md:py-32 gap-10 md:gap-16 bg-[#025043] min-h-screen font-[Expo-arabic]">
      {/* Left Text Overlay */}
      <div
        className="w-full rounded-t-4xl md:w-1/2 space-y-6  text-left font-[Qanduchia] translate-y-6 p-8"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-4xl text-white font-bold leading-snug">
          Smart kitchen essentials
        </h1>

        <h2 className="text-2xl sm:text-3xl md:text-3xl text-white leading-snug">
          for everyday chefs
        </h2>

        <p className="text-sm sm:text-base md:text-base leading-relaxed text-gray-200 font-[Expo-arabic]">
          Almanzel-Alhadith where elegance meets functionality. We bring you a
          curated selection of premium kitchen tools, home essentials, and
          tasteful gift collections.
        </p>
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg mt-10 md:mt-4 md:ml-10">
        <h2 className="text-3xl sm:text-4xl md:text-3xl font-[Qanduchia] font-bold mb-4 text-left text-white">
          Welcome back!
        </h2>
        <p className="text-gray-200 text-sm sm:text-base md:text-sm text-left mb-6">
          Hello, please log in to access your account.
        </p>

        <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('name', { required: true })}
            type="text"
            name="name"
            required
            placeholder="Name"
            className="w-full p-3 rounded-md bg-white/20 text-white
               border-0 outline-none focus:outline-none
               focus:ring-2 focus:ring-white"
          />

          <input
            {...register('email', { required: true })}
            type="email"
            name="email"
            required
            placeholder="Email"
            className="w-full p-3 rounded-md bg-white/20 text-white
               border-0 outline-none focus:outline-none
               focus:ring-2 focus:ring-white"
          />

          <textarea
            {...register('message', { required: true })}
            name="message"
            required
            rows="5"
            placeholder="Message"
            className="w-full p-3 rounded-md bg-white/20 text-white
               border-0 outline-none focus:outline-none
               focus:ring-2 focus:ring-white"
          />

          <button
            disabled={loading}
            type="submit"
            className={`w-full bg-black text-white py-2 rounded-xl hover:opacity-80 transition

                 ${
                   loading
                     ? 'bg-gray-400 cursor-not-allowed'
                     : 'bg-black hover:opacity-90'
                 }
                `}
          >
            {loading ? 'Sending...' : 'SEND MESSAGE'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
