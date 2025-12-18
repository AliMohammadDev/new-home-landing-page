import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrder } from '../../api/order';
import { addToast } from '@heroui/react';

function OrdersInfo() {
    const { orderId } = useParams();
    const { data: order, isLoading, isError } = useGetOrder(orderId);

    if (isLoading) return <p className="text-white">Loading order...</p>;
    if (isError) {
        addToast({
            title: 'Error',
            description: 'Failed to load order info',
            color: 'error',
            duration: 4000,
            isClosable: true,
        });
        return <p className="text-white">Error loading order.</p>;
    }

    return (
        <div className="w-full flex flex-col md:flex-row justify-between items-start text-white px-6 lg:px-20 py-16 md:py-32 gap-10 md:gap-16 bg-[#025043] min-h-screen font-[Expo-arabic]">

            {/* Left Side - Checkout / Customer Info */}
            <div className="w-full md:w-1/2 p-8 bg-white/10 backdrop-blur-lg rounded-2xl space-y-8 mt-10">
                <h2 className="text-2xl md:text-3xl font-bold tracking-wide mb-4">Order Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p>
                        <strong>Status:</strong>{' '}
                        <span
                            className={`font-bold ${order.status === 'pending'
                                ? 'text-yellow-400'
                                : order.status === 'completed'
                                    ? 'text-green-500'
                                    : 'text-gray-300'
                                }`}
                        >
                            {order.status}
                        </span>
                    </p>

                    <p><strong>Total:</strong> {order.total_amount} 4</p>
                    {/* <p><strong>Payment Method:</strong> {order.payment_method}</p> */}
                    <p><strong>Created At:</strong> {(order.created_at)}</p>

                    {/* User information */}
                    {order.checkout && (
                        <>
                            <p><strong>First Name:</strong> {order.checkout.first_name || '-'}</p>
                            <p><strong>Last Name:</strong> {order.checkout.last_name || '-'}</p>
                            <p><strong>Email:</strong> {order.checkout.email || '-'}</p>
                            <p><strong>Phone:</strong> {order.checkout.phone || '-'}</p>
                            <p><strong>Country:</strong> {order.checkout.country || '-'}</p>
                            <p><strong>City:</strong> {order.checkout.city || '-'}</p>
                            <p><strong>Street:</strong> {order.checkout.street || '-'}</p>
                            <p><strong>Floor:</strong> {order.checkout.floor || '-'}</p>
                            <p><strong>Postal Code:</strong> {order.checkout.postal_code || '-'}</p>
                            <p><strong>Additional Info:</strong> {order.checkout.additional_information || '-'}</p>
                        </>
                    )}
                </div>
            </div>

            {/* Right Side - Order Items */}
            <div className="w-full md:w-1/2 space-y-6 text-left font-[Expo-bold] translate-y-10 p-8 bg-white/10 rounded-2xl backdrop-blur-lg">
                <h2 className="text-2xl md:text-3xl tracking-wide mb-4">Order Summary</h2>
                <div className="w-full h-0.5 bg-white/40"></div>
                {order.items?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 bg-white/10 p-4 rounded-xl">
                        <img src={item.product_variant.image} alt={item.product_variant.name} className="w-20 h-20 rounded-xl object-cover" />
                        <div className="flex-1">
                            <h3 className="text-lg font-[Expo-arabic]">{item.product_variant.name}</h3>
                            <p className="text-sm text-white/70">{item.total} $</p>
                        </div>
                        <p className="text-white font-bold">{item.quantity}x</p>
                    </div>
                ))}
                <div className="w-full h-0.5 bg-white/40"></div>
                <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>{order.total_amount} $</span>
                </div>
            </div>
        </div>
    );
}

export default OrdersInfo;
