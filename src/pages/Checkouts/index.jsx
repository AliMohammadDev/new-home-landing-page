import { useForm } from "react-hook-form";
import { useAddCheckout } from "../../api/checkout";
import { addToast } from "@heroui/react";
import { useGetProfile } from '../../api/auth';
import { useNavigate } from "react-router-dom";

function Checkouts() {
  const { register, handleSubmit, reset } = useForm();
  const { data: profile } = useGetProfile();

  const { mutate, isPending: loading } = useAddCheckout();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    if (!profile?.active_cart?.id) {
      addToast({
        title: 'Checkout',
        description: 'No active cart found!',
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
          title: 'Checkout',
          description: 'Message sent successfully!',
          color: 'success',
          duration: 4000,
          isClosable: true,
        });
        reset();
        navigate(`orders/${checkout.data.id}`);
      },
      onError: (error) => {
        addToast({
          title: 'Checkout',
          description: error.message || 'Failed to save. Please try again.',
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
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide">CONTACT INFORMATION</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              {...register('first_name', { required: true })}
              type="text"
              placeholder="First Name"
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              {...register('last_name', { required: true })}
              type="text"
              placeholder="Last Name"
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="Email"
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              {...register('phone', { required: true })}
              type="tel"
              placeholder="Phone"
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
          </div>

          {/* Address Title */}
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide pt-4">ADDRESS</h2>

          {/* Row 3 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              {...register('country', { required: true })}
              type="text"
              placeholder="Country"
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              {...register('city', { required: true })}
              type="text"
              placeholder="City"
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
          </div>

          {/* Row 4 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              {...register('street')}
              type="text"
              placeholder="Street"
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              {...register('floor')}
              type="text"
              placeholder="Building / Floor"
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
          </div>

          {/* Row 5 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              {...register('postal_code')}
              type="number"
              placeholder="Postal Code"
              className="w-full p-4 rounded-xl bg-white/20 border border-white/40 focus:border-white outline-none"
            />
            <input
              {...register('additional_information')}
              type="text"
              placeholder="Additional Info"
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
            {loading ? 'Sending...' : 'Save & Continue'}
          </button>
        </form>
      </div>
    </div >
  );
}

export default Checkouts;
