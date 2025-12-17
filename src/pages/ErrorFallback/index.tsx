import { Link, useRouteError } from 'react-router-dom';

const ErrorFallback = () => {
  const error = useRouteError();

  return (
    <section className="flex h-svh items-center p-16 bg-[#EDEAE2] font-[Expo-arabic]">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mb-8 mt-4 text-gray-800">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            to="/"
            className="font-[Expo-bold] rounded px-8 py-3 bg-[#025043] text-white hover:bg-[#015045] transition"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorFallback;
