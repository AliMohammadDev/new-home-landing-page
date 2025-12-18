import {
    useDecreaseItem,
    useGetAllCartItems,
    useIncreaseItem,
    useRemoveFromCartItem
} from '../../api/cart';

import CartIcon from '../../assets/icons/CartIcon';
import MinusIcon from '../../assets/icons/MinusIcon';
import PlusIcon from '../../assets/icons/PlusIcon';
import { Link } from 'react-router-dom';

function Carts() {
    const { data: cartItems, isLoading } = useGetAllCartItems();
    const { mutate: increaseItem } = useIncreaseItem();
    const { mutate: decreaseItem } = useDecreaseItem();
    const { mutate: removeItem } = useRemoveFromCartItem();

    if (isLoading) {
        return (
            <div className="text-center mt-40 text-white font-[Expo-arabic]">
                Loading cart...
            </div>
        );
    }

    const items = cartItems?.data || [];
    const total = cartItems?.cart_total || 0;

    return (
        <div className="w-full bg-[#025043] min-h-screen px-6 lg:px-24 py-24 font-[Expo-arabic] text-white">

            {/* Header */}
            <div className="text-center mb-16">
                <div className="flex justify-center mb-4">
                    <CartIcon size={48} color="white" />
                </div>
                <h1 className="text-4xl font-bold tracking-wide">My Cart</h1>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Cart Items */}
                <div className="lg:col-span-2">
                    {items.length === 0 ? (
                        <div className="text-center py-20 text-lg">
                            Your cart is empty.
                        </div>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b text-sm">
                                    <th className="text-left py-4">Product</th>
                                    <th className="text-left py-4">Price</th>
                                    <th className="text-right py-4">Quantity</th>
                                </tr>
                            </thead>

                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id} className="border-b last:border-none">

                                        {/* Product */}
                                        <td className="py-6">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-white/50 hover:text-red-400 text-sm"
                                                >
                                                    ✕
                                                </button>

                                                <img
                                                    src={item.product_variant?.image}
                                                    alt={item.product_variant?.name}
                                                    className="w-16 h-20 object-cover rounded"
                                                />

                                                <span className="font-medium">
                                                    {item.product_variant?.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Price */}
                                        <td className="py-6">
                                            <span className="text-[#E2995E] font-semibold">
                                                {item.total_price} $
                                            </span>
                                        </td>

                                        {/* Quantity */}
                                        <td className="py-6 text-right">
                                            <div className="inline-flex items-center bg-white text-[#025043] rounded-2xl px-2 py-1">

                                                <button
                                                    onClick={() => increaseItem(item.id)}
                                                    className="p-1 bg-[#025043] text-white rounded-xl"
                                                >
                                                    <PlusIcon />
                                                </button>

                                                <span className="px-4 font-semibold">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() => decreaseItem(item.id)}
                                                    className="p-1 bg-[#025043] text-white rounded-xl"
                                                >
                                                    <MinusIcon />
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Cart Summary */}
                <div className="bg-white text-[#025043] rounded-3xl p-8 h-fit shadow-lg">
                    <h2 className="text-xl font-bold mb-6 text-center">
                        Cart Summary
                    </h2>

                    <div className="flex justify-between mb-4">
                        <span>Subtotal</span>
                        <span className="font-semibold">{total} $</span>
                    </div>

                    <div className="border-b my-4"></div>

                    <div className="flex justify-between text-lg font-bold mb-8">
                        <span>Total</span>
                        <span>{total} $</span>
                    </div>

                    <Link to="/checkouts">
                        <button className="w-full bg-[#025043] text-white py-3 rounded-full hover:bg-opacity-90 transition">
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Carts;
