import { usePlaceOrder } from '../../api/order';

import { useGetAllCartItems } from '../../api/cart';
import { addToast } from '@heroui/react';
import { useGetCheckout } from '../../api/checkout';
import { useNavigate, useParams } from 'react-router-dom';
import CheckoutIcon from '../../assets/icons/CheckoutIcon';

function Orders() {
    const navigate = useNavigate();
    const { checkoutId } = useParams();

    const { data: checkout } = useGetCheckout(checkoutId);

    const { data: cartDataItems } = useGetAllCartItems();

    const { mutate, isPending: loading } = usePlaceOrder();

    const handlePlaceOrder = () => {
        const payload = {
            checkout_id: checkoutId,
            payment_method: 'cod',
        };

        mutate(payload, {
            onSuccess: (order) => {
                addToast({
                    title: 'Order Placed',
                    description: 'Your order has been placed successfully!',
                    color: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                navigate(`orders-info/${order.data.id}`);
            },
            onError: (error) => {
                addToast({
                    title: 'Order Failed',
                    description:
                        error.response?.data?.message ||
                        error.message ||
                        'Failed to place order',
                    color: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            },
        });
    };

    return (
        <div className="w-full flex flex-col md:flex-row justify-between items-start text-white px-6 lg:px-20 py-16 md:py-32 gap-10 md:gap-16 bg-[#025043] min-h-screen font-[Expo-arabic]">
            {/* Left Side - Order Info */}
            <div className="w-full md:w-1/2 p-8 bg-white/10 backdrop-blur-lg rounded-2xl">
                <div className="flex items-center gap-3 mb-8">
                    <CheckoutIcon className="w-12 h-12 text-white" />
                    <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
                        Checkout Information
                    </h2>
                </div>

                {checkout ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <p>
                            <strong>First Name:</strong> {checkout.first_name || '-'}
                        </p>
                        <p>
                            <strong>Last Name:</strong> {checkout.last_name || '-'}
                        </p>
                        <p>
                            <strong>Email:</strong> {checkout.email || '-'}
                        </p>
                        <p>
                            <strong>Phone:</strong> {checkout.phone || '-'}
                        </p>
                        <p>
                            <strong>Country:</strong> {checkout.country || '-'}
                        </p>
                        <p>
                            <strong>City:</strong> {checkout.city || '-'}
                        </p>
                        <p>
                            <strong>Street:</strong> {checkout.street || '-'}
                        </p>
                        <p>
                            <strong>Floor:</strong> {checkout.floor || '-'}
                        </p>
                        <p>
                            <strong>Postal Code:</strong> {checkout.postal_code || '-'}
                        </p>
                        <p>
                            <strong>Additional Info:</strong>{' '}
                            {checkout.additional_information || '-'}
                        </p>
                    </div>
                ) : (
                    <p>Loading checkout info...</p>
                )}
            </div>

            {/* Right Side - Order Summary */}
            <div className="w-full md:w-1/2 space-y-6 text-left font-[Expo-bold]  p-8 bg-white/10 rounded-2xl backdrop-blur-lg">
                <h2 className="text-2xl md:text-3xl tracking-wide mb-4">
                    Order Summary
                </h2>

                <div className="w-full h-0.5 bg-white/40"></div>

                {cartDataItems?.data?.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 bg-white/10 p-4 rounded-xl"
                    >
                        <img
                            src={item.product_variant.image}
                            className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-[Expo-arabic]">
                                {item.product_variant.name}
                            </h3>
                            <p className="text-sm text-white/70">{item.total_price} $</p>
                        </div>
                    </div>
                ))}

                <div className="w-full h-0.5 bg-white/40"></div>

                <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>{cartDataItems?.cart_total || 0} $</span>
                </div>

                {/* Place Order Button */}
                <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className={`w-full py-4 cursor-pointer rounded-xl font-bold transition
        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-white text-[#025043] hover:bg-gray-200'}`}
                >
                    {loading ? 'Placing Order...' : 'Place Order / Pay'}
                </button>

            </div>
        </div>
    );
}

export default Orders;
