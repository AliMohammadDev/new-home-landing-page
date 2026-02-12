import { Link, useParams } from 'react-router-dom';
import { useGetOrder } from '../../api/order';
import { addToast } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

function OrdersInfo() {
    const { t, i18n } = useTranslation();
    const { orderId } = useParams();
    const { data: order, isLoading, isError } = useGetOrder(orderId);

    if (isLoading)
        return (
            <p className="text-white">{t('order.loading', 'Loading order...')}</p>
        );
    if (isError) {
        addToast({
            title: t('order.error_title', 'Error'),
            description: t('order.error_desc', 'Failed to load order info'),
            color: 'error',
            duration: 4000,
            isClosable: true,
        });
        return (
            <p className="text-white">
                {t('order.error_desc', 'Error loading order.')}
            </p>
        );
    }
    return (
        <div
            className="w-full flex flex-col md:flex-row justify-between  mt-10 items-start text-white px-6 lg:px-20 py-16 md:py-32 gap-10 md:gap-16 bg-[#025043] min-h-screen font-[Expo-arabic]"
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        >


            {/* Left Side - Checkout / Customer Info */}
            <div className="w-full md:w-1/2 p-8 bg-white/10 backdrop-blur-lg rounded-2xl space-y-8 mt-10">
                <h2 className="text-2xl md:text-3xl font-bold tracking-wide mb-4">
                    {t('order.info_title', 'Order Information')}
                </h2>
                <div className="grid grid-cols-12 sm:grid-cols-2 gap-6">
                    <p>
                        <strong>{t('order.status', 'Status')}:</strong>{' '}
                        <span
                            className={`font-bold ${order.status === 'pending'
                                ? 'text-yellow-500'
                                : order.status === 'completed'
                                    ? 'text-green-500'
                                    : order.status === 'cancelled'
                                        ? 'text-red-500'
                                        : 'text-gray-400'
                                } capitalize`}
                        >
                            {order.status.replace('_', ' ')}
                        </span>
                    </p>

                    <p>
                        <strong>{t('order.total', 'Total')}:</strong> {order.total_amount} $
                    </p>
                    <p>
                        <strong>{t('order.created_at', 'Created At')}:</strong>{' '}
                        {order.created_at}
                    </p>

                    {/* User information */}
                    {order.checkout && (
                        <>
                            <p>
                                <strong>{t('order.first_name', 'First Name')}:</strong>{' '}
                                {order.checkout.first_name || '-'}
                            </p>
                            <p>
                                <strong>{t('order.last_name', 'Last Name')}:</strong>{' '}
                                {order.checkout.last_name || '-'}
                            </p>
                            <p>
                                <strong>{t('order.email', 'Email')}:</strong>{' '}
                                {order.checkout.email || '-'}
                            </p>
                            <p>
                                <strong>{t('order.phone', 'Phone')}:</strong>{' '}
                                {order.checkout.phone || '-'}
                            </p>
                            <p>
                                <strong>{t('order.country', 'Country')}:</strong>{' '}
                                {order.checkout.country || '-'}
                            </p>
                            <p>
                                <strong>{t('order.city', 'City')}:</strong>{' '}
                                {order.checkout.city || '-'}
                            </p>
                            <p>
                                <strong>{t('order.street', 'Street')}:</strong>{' '}
                                {order.checkout.street || '-'}
                            </p>
                            <p>
                                <strong>{t('order.floor', 'Floor')}:</strong>{' '}
                                {order.checkout.floor || '-'}
                            </p>
                            <p>
                                <strong>{t('order.postal_code', 'Postal Code')}:</strong>{' '}
                                {order.checkout.postal_code || '-'}
                            </p>
                            <p>
                                <strong>
                                    {t('order.additional_info', 'Additional Info')}:
                                </strong>{' '}
                                {order.checkout.additional_information || '-'}
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Right Side - Order Items */}
            <div
                className="w-full md:w-1/2 space-y-6 font-[Expo-bold] translate-y-10 p-8 bg-white/10 rounded-2xl backdrop-blur-lg"
                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            >
                <h2
                    className={clsx(
                        'text-2xl md:text-3xl tracking-wide mb-4',
                        i18n.language === 'ar' ? 'text-right' : 'text-left'
                    )}
                >
                    {t('order.summary_title', 'Order Summary')}
                </h2>

                <div className="w-full h-0.5 bg-white/40"></div>

                {order.items?.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 bg-white/10 p-4 rounded-xl"
                    >
                        <img
                            src={item.product_variant.image}
                            alt={item.product_variant.name}
                            className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                            <h3
                                className={clsx(
                                    'text-lg font-[Expo-arabic]',
                                    i18n.language === 'ar' ? 'text-right' : 'text-left'
                                )}
                            >
                                {item.product_variant.name}
                            </h3>
                            <p
                                className={clsx(
                                    'text-sm text-white/70',
                                    i18n.language === 'ar' ? 'text-right' : 'text-left'
                                )}
                            >
                                {item.total} $
                            </p>
                        </div>
                        <p className="text-white font-bold">{item.quantity}x</p>
                    </div>
                ))}

                <div className="w-full h-0.5 bg-white/40"></div>



                <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm space-y-4 font-[Expo-arabic]">

                    <div className="flex justify-between items-center group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <span className="text-white/70 text-base md:text-lg">{t('orders.subtotal', 'Subtotal')}</span>
                        </div>
                        <span className="text-white font-medium tracking-wide">
                            {(parseFloat(order.total_amount) - parseFloat(order.shipping_fee || 0)).toFixed(2)} $
                        </span>
                    </div>

                    <div className="flex justify-between items-center group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-white/70 text-base md:text-lg">{t('orders.shipping_fee', 'Shipping Fee')}</span>
                        </div>
                        <span className="text-white font-medium tracking-wide">
                            {/* {parseFloat(order.shipping_fee || 0).toFixed(2)} $ */}
                            <span className="text-sm font-semibold text-green-400">
                                {t('orders.shipping_info') || 'يتم تحديد التكاليف عند الدفع'}
                            </span>
                        </span>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-2"></div>

                    <div
                        className={clsx(
                            'flex justify-between items-center pt-2',
                            i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'
                        )}
                    >
                        <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            {t('order.total', 'Total')}
                        </span>
                        <div className="flex flex-col items-end">
                            <span className="text-2xl md:text-3xl font-black text-[#E2995E] drop-shadow-sm">
                                {parseFloat(order.total_amount).toFixed(2)} $
                            </span>
                            <span className="text-[10px] uppercase opacity-40 tracking-widest text-white mt-1">
                                {t('order.vat_inclusive', 'Tax Inclusive')}
                            </span>
                        </div>
                    </div>
                </div>


            </div>


        </div>
    );
}

export default OrdersInfo;
