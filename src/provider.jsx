import { HeroUIProvider, ToastProvider } from '@heroui/react';

const Providers = ({ children }) => {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
};

export default Providers;
