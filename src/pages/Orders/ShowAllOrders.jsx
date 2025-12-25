import { useNavigate } from 'react-router-dom';
import { useGetAllOrders } from '../../api/order';
import OrderIcon from '../../assets/icons/OrderIcon';

function ShowAllOrders() {
  const { data: orders, isLoading } = useGetAllOrders();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-lg tracking-wide">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#025043] text-white font-[Expo-arabic] px-6 lg:px-24 py-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-14">
        <div className="p-3 rounded-2xl bg-white/10">
          <OrderIcon className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold tracking-wide">My Orders</h2>
      </div>

      {/* Empty State */}
      {orders?.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-16 text-center">
          <OrderIcon className="w-12 h-12 mb-4 opacity-70" />
          <p className="text-lg text-white/80">
            You haven’t placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="relative bg-white/10 backdrop-blur-xl border border-white/10
              rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center
              justify-between gap-6 hover:bg-white/20 transition-all duration-300"
            >
              {/* Order Info */}
              <div className="space-y-2">
                <p className="text-sm text-white/60 tracking-wide">
                  Order #{order.id}
                </p>

                <p className="text-xl font-bold">{order.total_amount} $</p>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      order.status === 'pending'
                        ? 'bg-yellow-400'
                        : order.status === 'completed'
                          ? 'bg-green-400'
                          : 'bg-gray-400'
                    }`}
                  ></span>

                  <span
                    className={`text-sm font-semibold capitalize ${
                      order.status === 'pending'
                        ? 'text-yellow-300'
                        : order.status === 'completed'
                          ? 'text-green-300'
                          : 'text-gray-300'
                    }`}
                  >
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() =>
                  navigate(
                    `/checkouts/orders/${order.checkout.id}/orders-info/${order.id}`
                  )
                }
                className="px-7 py-3 rounded-full bg-white text-[#025043]
                font-bold tracking-wide hover:bg-gray-200
                transition-all duration-300 shadow-md"
              >
                View details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowAllOrders;
