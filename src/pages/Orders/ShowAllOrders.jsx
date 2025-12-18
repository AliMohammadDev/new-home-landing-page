import { useNavigate } from 'react-router-dom';
import { useGetAllOrders } from '../../api/order';
import OrderIcon from '../../assets/icons/OrderIcon';

function ShowAllOrders() {
    const { data: orders, isLoading } = useGetAllOrders();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white ">
                Loading orders...
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#025043] text-white font-[Expo-arabic] px-6 lg:px-20 py-24">

            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <OrderIcon className="w-10 h-10" />
                <h2 className="text-3xl font-bold">My Orders</h2>
            </div>

            {/* Empty State */}
            {orders?.length === 0 ? (
                <div className="bg-white/10 rounded-2xl p-10 text-center">
                    <p className="text-lg text-white/80">You have no orders yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-white/20 transition"
                        >
                            {/* Order Info */}
                            <div className="space-y-2">
                                <p className="text-sm text-white/60">Order #{order.id}</p>

                                <p className="text-lg font-bold">
                                    Total: {order.total_amount} $
                                </p>

                                <span
                                    className={`inline-block px-4 py-1 rounded-full text-sm font-semibold
                    ${order.status === 'pending'
                                            ? 'bg-yellow-400/20 text-yellow-300'
                                            : 'bg-green-400/20 text-green-300'
                                        }`}
                                >
                                    {order.status === 'pending' ? 'Pending' : 'Completed'}
                                </span>
                            </div>

                            {/* Action */}
                            <div className="flex items-center">
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/checkouts/orders/${order.checkout.id}/orders-info/${order.id}`
                                        )
                                    }
                                    className="px-6 py-3 rounded-xl bg-white text-[#025043] font-bold hover:bg-gray-200 transition"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ShowAllOrders;
