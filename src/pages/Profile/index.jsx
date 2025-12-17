import { useForm } from 'react-hook-form';
import { useEditProfile, useGetProfile } from '../../api/auth';
import { useEffect } from 'react';
import { addToast } from '@heroui/react';
function Profile() {
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
      title: 'Update Profile',
      description: 'Profile updated successfully',
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
    <div className="w-full min-h-screen bg-[#025043] flex items-start py-20 md:py-32 px-6 lg:px-20 text-white">
      <div
        className="w-full max-w-3xl rounded-2xl p-8 md:p-12 flex flex-col gap-8 shadow-xl"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <h1 className="text-3xl font-[Expo-bold] text-center">Edit Profile</h1>

        <form
          className="flex flex-col gap-6 font-[Expo-arabic]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Full Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              className="px-4 py-2 rounded-lg text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-white shadow-sm"
            />
            {errors.name && (
              <span className="text-red-300 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
              })}
              type="email"
              className="px-4 py-2 rounded-lg text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-white shadow-sm"
            />
            {errors.email && (
              <span className="text-red-300 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">New Password</label>
            <input
              {...register('password', {
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type="password"
              autoComplete='new-password'
              className="px-4 py-2 rounded-lg text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-white shadow-sm"
            />
          </div>

          {/* Password Confirmation */}
          {password && (
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Confirm Password</label>
              <input
                {...register('password_confirmation', {
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
                type="password"
                className="px-4 py-2 rounded-lg text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-white shadow-sm"
              />
              {errors.password_confirmation && (
                <span className="text-red-300 text-sm">
                  {errors.password_confirmation.message}
                </span>
              )}
            </div>
          )}

          {error && (
            <p className="text-red-300 text-sm text-center">{error.message}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-black hover:opacity-90  text-white rounded-lg font-semibold transition disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
