import { usePlaceOrder } from '../../api/order';
import { useGetAllCartItems } from '../../api/cart';
import { addToast } from '@heroui/react';
import { useGetCheckout } from '../../api/checkout';
import { useNavigate, useParams } from 'react-router-dom';
import CheckoutIcon from '../../assets/icons/CheckoutIcon';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

function Orders() {
    const navigate = useNavigate();
    const { checkoutId } = useParams();
    const { t, i18n } = useTranslation();

    const { data: checkout } = useGetCheckout(checkoutId);
    const { data: cartDataItems } = useGetAllCartItems();
    const { mutate, isPending: loading } = usePlaceOrder();

    const handlePlaceOrder = () => {
        const payload = { checkout_id: checkoutId, payment_method: 'cod' };

        mutate(payload, {
            onSuccess: (order) => {
                addToast({
                    title: t('orders.place_order'),
                    description: t('orders.order_placed_success'),
                    color: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                navigate(`orders-info/${order.data.id}`);
            },
            onError: (error) => {
                addToast({
                    title: t('orders.place_order'),
                    description:
                        error.response?.data?.message || error.message || 'Failed to place order',
                    color: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            },
        });
    };

    return (
        <div className={`w-full flex flex-col md:flex-row justify-between items-start px-6 lg:px-20 py-16 md:py-32 gap-10 md:gap-16 min-h-screen font-[Expo-arabic] ${i18n.language === 'ar' ? 'text-right' : 'text-left'} bg-[#025043] text-white`}>

            {/* Left Side - Checkout Info */}
            <div className="w-full md:w-1/2 p-8 bg-white/10 backdrop-blur-lg rounded-2xl">
                <div className="flex items-center gap-3 mb-8">
                    <CheckoutIcon className="w-12 h-12 text-white" />
                    <h2 className="text-2xl md:text-3xl font-bold tracking-wide">{t('orders.checkout_info')}</h2>
                </div>

                {checkout ? (
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <p><strong>{t('orders.first_name')}:</strong> {checkout.first_name || '-'}</p>
                        <p><strong>{t('orders.last_name')}:</strong> {checkout.last_name || '-'}</p>
                        <p><strong>{t('orders.email')}:</strong> {checkout.email || '-'}</p>
                        <p><strong>{t('orders.phone')}:</strong> {checkout.phone || '-'}</p>
                        <p><strong>{t('orders.country')}:</strong> {checkout.country || '-'}</p>
                        <p><strong>{t('orders.city')}:</strong> {checkout.city || '-'}</p>
                        <p><strong>{t('orders.street')}:</strong> {checkout.street || '-'}</p>
                        <p><strong>{t('orders.floor')}:</strong> {checkout.floor || '-'}</p>
                        <p><strong>{t('orders.postal_code')}:</strong> {checkout.postal_code || '-'}</p>
                        <p><strong>{t('orders.additional_info')}:</strong> {checkout.additional_information || '-'}</p>
                    </div>
                ) : (
                    <p>Loading checkout info...</p>
                )}
            </div>

            {/* Right Side - Order Summary */}
            <div
                className={clsx(
                    "w-full md:w-1/2 space-y-6 p-8 bg-white/10 rounded-2xl backdrop-blur-lg font-[Expo-bold]",
                    i18n.language === 'ar' ? "text-right" : "text-left"
                )}
                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            >
                <h2 className="text-2xl md:text-3xl tracking-wide mb-4">
                    {t('orders.order_summary')}
                </h2>

                <div className="w-full h-0.5 bg-white/40"></div>

                <div className="space-y-4">
                    {cartDataItems?.data?.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-4 bg-white/10 p-4 rounded-xl">
                            <img
                                src={item.product_variant.image}
                                className="w-20 h-20 rounded-xl object-cover"
                                alt={item.product_variant.name}
                            />

                            <div className="flex-1">
                                <h3 className="text-lg font-[Expo-arabic]">{item.product_variant.name}</h3>
                                <p className="text-sm text-white/70">{item.total_price} $</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full h-0.5 bg-white/40"></div>

                <div className="flex justify-between text-xl font-bold">
                    <span>{t('orders.total')}</span>
                    <span>{cartDataItems?.cart_total || 0} $</span>
                </div>

                <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className={clsx(
                        "w-full py-4 rounded-xl font-bold transition",
                        loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-white text-[#025043] hover:bg-gray-200 shadow-lg cursor-pointer active:scale-[0.98]'
                    )}
                >
                    {loading ? t('orders.placing_order') : t('orders.place_order')}
                </button>
            </div>
        </div>
    );
}

export default Orders;
