import { useForm } from "react-hook-form";
import { useAddCheckout, useAddNewCheckout } from "../../api/checkout";
import { addToast, Card, CardBody, Tab, Tabs } from "@heroui/react";
import { useGetProfile } from '../../api/auth';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import { useGetShipping } from "../../api/shipping";
import shoppingCart from '../../assets/animations/shoppingCart.json';
import LeftIcon from "../../assets/icons/LeftIcon";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/react";

function Checkouts() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("info");

  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const { data: profile } = useGetProfile();
  const { data: shippingCities } = useGetShipping();

  const { mutate: updateMutate, isPending: updateLoading } = useAddCheckout();
  const { mutate: createNewMutate, isPending: createLoading } = useAddNewCheckout();

  const navigate = useNavigate();
  const selectedCountry = watch('country');

  const onSubmit = (data) => {
    if (!profile?.active_cart?.id) {
      addToast({
        title: t('checkout.contact_information'),
        description: t('toast.no_active_cart'),
        color: 'error',
        duration: 4000,
      });
      return;
    }

    const payload = {
      ...data,
      cart_id: profile.active_cart.id,
    };

    if (data.country === 'Syria') {
      const selectedCity = shippingCities?.find(c => c.id == data.shipping_city_id);
      payload.city = selectedCity ? selectedCity.city_name : data.city;
      payload.country = 'Syria';
    } else {
      payload.country = data.city;
      payload.shipping_city_id = null;
    }

    const currentMutate = activeTab === "edit" ? createNewMutate : updateMutate;

    currentMutate(payload, {
      onSuccess: (checkout) => {
        addToast({
          title: t('checkout.contact_information'),
          description: t('toast.success'),
          color: 'success',
          duration: 4000,
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
        });
      },
    });
  };

  useEffect(() => {
    if (activeTab === "edit") {
      reset({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        country: 'Syria',
        city: '',
        shipping_city_id: '',
        street: '',
        floor: '',
        postal_code: '',
        additional_information: '',
      });
    } else if (activeTab === "info" && profile) {
      const isInternational = profile.checkout?.country && profile.checkout?.country !== 'Syria';
      reset({
        first_name: profile.checkout?.first_name || '',
        last_name: profile.checkout?.last_name || '',
        email: profile.checkout?.email || profile.email || '',
        phone: profile.checkout?.phone || '',
        country: isInternational ? 'International' : 'Syria',
        city: profile.checkout?.city || '',
        shipping_city_id: profile.checkout?.shipping_city_id || '',
        street: profile.checkout?.street || '',
        floor: profile.checkout?.floor || '',
        postal_code: profile.checkout?.postal_code || '',
        additional_information: profile.checkout?.additional_information || '',
      });
    }
  }, [activeTab, profile, reset]);

  const isLoading = updateLoading || createLoading;

  const selectedCityData = shippingCities?.find(c => String(c.id) === String(watch('shipping_city_id')));

  return (
    <div className="w-full flex flex-col lg:flex-row mt-10 justify-between items-start text-white px-6 lg:px-20 py-16 md:py-32 gap-10 md:gap-16 bg-[#025043] min-h-screen font-[Expo-arabic]">

      <Link to={-1} className="hover:opacity-80 transition active:scale-95">
        <LeftIcon className={i18n.language === 'ar' ? 'rotate-180' : ''} />
      </Link>

      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={setActiveTab}
          aria-label="Checkout Options"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-white/20",
            cursor: "w-full bg-white",
            tab: "max-w-fit px-0 h-12",
            tabContent: "text-white font-[Expo-arabic] text-lg group-data-[selected=true]:text-white group-data-[selected=true]:font-bold"
          }}
        >
          <Tab key="info" title={t('checkout.delivery_information')}>
            <Card className="bg-white/10 backdrop-blur-lg border-none mt-4">
              <CardBody className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input {...register('first_name', { required: true })} placeholder={t('checkout.first_name')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none focus:border-white text-white" />
                    <input {...register('last_name', { required: true })} placeholder={t('checkout.last_name')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none focus:border-white text-white" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input {...register('email', { required: true })} type="email" placeholder={t('checkout.email')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none text-white" />
                    <input {...register('phone', { required: true })} type="tel" placeholder={t('checkout.phone')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none text-white" />
                  </div>
                  <hr className="border-white/10" />
                  <div className="flex flex-col sm:flex-row gap-4">


                    <div className="w-full">
                      <Select
                        aria-label={t('checkout.country')}
                        placeholder={t('checkout.select_country')}
                        selectedKeys={[watch('country') || "Syria"]}
                        className="w-full"
                        classNames={{ trigger: "bg-white/20 border border-white/40 rounded-xl h-[58px]", value: "text-white", popoverContent: "bg-[#025043] text-white" }}
                        onChange={(e) => {
                          setValue('country', e.target.value);
                          if (e.target.value !== 'Syria') setValue('shipping_city_id', '');
                        }}
                      >
                        <SelectItem key="Syria" textValue={t('countries.syria')}>{t('countries.syria')}</SelectItem>
                        <SelectItem key="International" textValue={t('countries.outside_syria')}>{t('countries.outside_syria')}</SelectItem>
                      </Select>

                    </div>

                    <div className="w-full">
                      {selectedCountry === 'Syria' ? (
                        <>
                          <Select
                            aria-label={t('checkout.select_city')}
                            placeholder={t('checkout.select_city')}
                            selectedKeys={watch('shipping_city_id') ? [String(watch('shipping_city_id'))] : []}
                            className="w-full"
                            classNames={{ trigger: "bg-white/20 border border-white/40 rounded-xl h-[58px]", value: "text-white" }}
                            onChange={(e) => setValue('shipping_city_id', e.target.value)}
                          >
                            {(shippingCities || []).map((city) => (
                              <SelectItem key={city.id} textValue={city.city_name}>{city.city_name}</SelectItem>
                            ))}
                          </Select>

                          {selectedCityData && (
                            <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 animate-appearance-in">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-white/60">{t('checkout.estimated_delivery')}:</span>
                                <span className="font-bold text-white">{selectedCityData.estimated_delivery}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm mt-1">
                                <span className="text-white/60">{t('checkout.shipping_fee')}:</span>
                                <span className={`font-bold ${selectedCityData.is_free_shipping ? 'text-green-400' : 'text-white'}`}>
                                  {selectedCityData.is_free_shipping ? t('checkout.free_shipping') : `${selectedCityData.shipping_fee} SYP`}
                                </span>
                              </div>
                            </div>
                          )}
                          {/* ----------------------- */}
                        </>
                      ) : (
                        <input {...register('city', { required: selectedCountry !== 'Syria' })} placeholder={t('checkout.enter_country_and_city')} className="w-full p-4 h-[58px] rounded-xl bg-white/20 border border-white/40 outline-none text-white" />
                      )}
                    </div>



                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input {...register('street')} placeholder={t('checkout.street')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none text-white" />
                    <input {...register('floor')} placeholder={t('checkout.floor')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none text-white" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input {...register('postal_code')} type="number" placeholder={t('checkout.postal_code')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none text-white" />
                    <input {...register('additional_information')} placeholder={t('checkout.additional_information')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none text-white" />
                  </div>
                  <button disabled={isLoading} type="submit" className={`w-full py-4 cursor-pointer rounded-xl font-bold active:scale-95 transition ${isLoading ? 'bg-gray-400' : 'bg-black text-white hover:opacity-90'}`}>
                    {isLoading ? t('checkout.sending') : t('checkout.save_continue')}
                  </button>
                </form>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="edit" title={t('checkout.edit_delivery_information')}>
            <Card className="bg-white/10 backdrop-blur-lg border-none mt-4">
              <CardBody className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input {...register('first_name', { required: true })} placeholder={t('checkout.first_name')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none focus:border-white text-white" />
                    <input {...register('last_name', { required: true })} placeholder={t('checkout.last_name')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none focus:border-white text-white" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input {...register('email', { required: true })} type="email" placeholder={t('checkout.email')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none text-white" />
                    <input {...register('phone', { required: true })} type="tel" placeholder={t('checkout.phone')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none text-white" />
                  </div>
                  <hr className="border-white/10" />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <Select
                        aria-label={t('checkout.country')}
                        placeholder={t('checkout.select_country')}
                        selectedKeys={[watch('country') || "Syria"]}
                        className="w-full"
                        classNames={{ trigger: "bg-white/20 border border-white/40 rounded-xl h-[58px]", value: "text-white", popoverContent: "bg-[#025043] text-white" }}
                        onChange={(e) => {
                          setValue('country', e.target.value);
                          if (e.target.value !== 'Syria') setValue('shipping_city_id', '');
                        }}
                      >
                        <SelectItem key="Syria" textValue={t('countries.syria')}>{t('countries.syria')}</SelectItem>
                        <SelectItem key="International" textValue={t('countries.outside_syria')}>{t('countries.outside_syria')}</SelectItem>
                      </Select>
                    </div>

                    <div className="w-full">
                      {selectedCountry === 'Syria' ? (
                        <>
                          <Select
                            aria-label={t('checkout.select_city')}
                            placeholder={t('checkout.select_city')}
                            selectedKeys={watch('shipping_city_id') ? [String(watch('shipping_city_id'))] : []}
                            className="w-full"
                            classNames={{ trigger: "bg-white/20 border border-white/40 rounded-xl h-[58px]", value: "text-white" }}
                            onChange={(e) => setValue('shipping_city_id', e.target.value)}
                          >
                            {(shippingCities || []).map((city) => (
                              <SelectItem key={city.id} textValue={city.city_name}>{city.city_name}</SelectItem>
                            ))}
                          </Select>

                          {selectedCityData && (
                            <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 animate-appearance-in">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-white/60">{t('checkout.estimated_delivery')}:</span>
                                <span className="font-bold text-white">{selectedCityData.estimated_delivery}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm mt-1">
                                <span className="text-white/60">{t('checkout.shipping_fee')}:</span>
                                <span className={`font-bold ${selectedCityData.is_free_shipping ? 'text-green-400' : 'text-white'}`}>
                                  {selectedCityData.is_free_shipping ? t('checkout.free_shipping') : `${selectedCityData.shipping_fee} SYP`}
                                </span>
                              </div>
                            </div>
                          )}
                          {/* ----------------------- */}
                        </>
                      ) : (
                        <input {...register('city', { required: selectedCountry !== 'Syria' })} placeholder={t('checkout.enter_country_and_city')} className="w-full p-4 h-[58px] rounded-xl bg-white/20 border border-white/40 outline-none text-white" />
                      )}
                    </div>


                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input {...register('street')} placeholder={t('checkout.street')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none text-white" />
                    <input {...register('floor')} placeholder={t('checkout.floor')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none text-white" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input {...register('postal_code')} type="number" placeholder={t('checkout.postal_code')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none text-white" />
                    <input {...register('additional_information')} placeholder={t('checkout.additional_information')} className="w-full p-4 rounded-xl bg-white/20 border border-white/40 outline-none text-white" />
                  </div>
                  <button disabled={isLoading} type="submit" className={`w-full py-4 cursor-pointer rounded-xl font-bold active:scale-95 transition ${isLoading ? 'bg-gray-400' : 'bg-black text-white hover:opacity-90'}`}>
                    {isLoading ? t('checkout.sending') : t('checkout.save_continue')}
                  </button>
                </form>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
        <div className="w-full max-w-[550px] lg:max-w-[750px]">
          <Lottie animationData={shoppingCart} loop autoplay speed={1.5} />
        </div>
      </div>
    </div>
  );
}

export default Checkouts;