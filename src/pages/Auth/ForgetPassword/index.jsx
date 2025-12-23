import { Link } from 'react-router-dom';
import EmailIcon from '../../../assets/icons/EmailIcon';
import LeftIcon from '../../../assets/icons/LeftIcon';
import { useForm } from 'react-hook-form';

function ForgetPassword() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (values) => {
    console.log('Send reset email to:', values.email);
    alert('If this email exists, a reset link will be sent.');
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-no-repeat relative bg-center md:bg-right"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765358011/LoginImage_q4fdk3.jpg)`,
      }}
    >
      <div className="absolute top-1 md:top-6 left-6 z-20">
        <Link to={-1} className="hover:opacity-80 transition">
          <LeftIcon />
        </Link>
      </div>

      <div className="flex h-screen items-center justify-center bg-cover bg-center relative">
        <div className="relative w-full max-w-md px-4">
          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-8 shadow-2xl border border-white/20 text-white">
            <div className="flex mb-6">
              <img
                src="https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765366635/home-logo-white_c2et5l.svg"
                className="w-20 h-15"
                alt="Home Logo"
              />
            </div>

            <h2 className="text-2xl mb-1">Forgot Password?</h2>
            <p className="text-gray-200 mb-6">
              Enter your email below to receive a password reset link.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Email input */}
              <div className="relative">
                <div className="pointer-events-none absolute left-1 top-1/2 -translate-y-1/2">
                  <EmailIcon />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  className="block w-full rounded-md border border-white/20 bg-white/20 px-3 py-3 pl-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 sm:text-sm"
                  required
                  placeholder="E-mail Address"
                  autoComplete="email"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl py-2 font-semibold transition bg-black hover:opacity-90"
              >
                Send Reset Link
              </button>

              <div className="text-center text-sm text-white mt-4">
                Remembered your password?{' '}
                <Link to="/login" className="text-white hover:underline">
                  Login
                </Link>
              </div>

              <div className="text-center text-sm text-white mt-2">
                Don’t have an account?{' '}
                <Link to="/register" className="text-white hover:underline">
                  Create one
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
