import { useNavigate } from 'react-router-dom';
import { useGetAllOrders } from '../../api/order';
import OrderIcon from '../../assets/icons/OrderIcon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function ShowAllOrders() {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);
  const { data: response, isLoading } = useGetAllOrders(page);
  const navigate = useNavigate();

  const orders = response?.data || [];
  const meta = response?.meta;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-lg tracking-wide">
        {t('orders.loading')}
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen bg-[#025043] text-white font-[Expo-arabic] px-6 lg:px-24 py-20`}
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 mt-20">
        <div className="p-3 rounded-2xl bg-white/10">
          <OrderIcon className="w-7 h-7" />
        </div>
        <h2 className="text-3xl font-bold tracking-wide">{t('orders.myOrders')}</h2>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-16 text-center">
          <OrderIcon className="w-12 h-12 mb-4 opacity-70" />
          <p className="text-lg text-white/80">{t('orders.noOrders')}</p>
        </div>
      ) : (
        <>
          {/* Orders */}
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className={`relative bg-white/10 backdrop-blur-xl border border-white/10
                rounded-2xl px-6 py-4 flex flex-col md:flex-row
                items-start md:items-center justify-between
                hover:bg-white/20 transition-all duration-300`}
              >
                {/* Left */}
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-white/50">
                      {t('orders.order')} #{order.id}
                    </span>
                    <span className="text-lg font-bold">
                      {order.total_amount} $
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${order.status === 'pending'
                        ? 'bg-yellow-400'
                        : order.status === 'completed'
                          ? 'bg-green-400'
                          : 'bg-gray-400'
                        }`}
                    ></span>

                    <span
                      className={`text-sm font-semibold capitalize ${order.status === 'pending'
                        ? 'text-yellow-300'
                        : order.status === 'completed'
                          ? 'text-green-300'
                          : 'text-gray-300'
                        }`}
                    >
                      {t(`orders.status.${order.status}`)}
                    </span>
                  </div>
                </div>

                {/* Right */}
                <button
                  onClick={() =>
                    navigate(
                      `/checkouts/orders/${order.checkout.id}/orders-info/${order.id}`
                    )
                  }
                  className="mt-4 md:mt-0 px-6 py-2 rounded-full bg-white text-[#025043]
                  text-sm font-bold tracking-wide cursor-pointer hover:bg-gray-200
                  transition-all duration-300 shadow"
                >
                  {t('orders.viewDetails')}
                </button>

                {/* Latest badge */}
                {meta?.current_page === 1 && index === 0 && (
                  <span className="absolute top-3 right-4 text-xs bg-green-400 text-[#025043]
                  px-3 py-1 rounded-full font-bold">
                    {t('orders.latest')}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              disabled={meta.current_page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-5 py-2 rounded-full cursor-pointer bg-white/10 disabled:opacity-40
              hover:bg-white/20 transition"
            >
              {t('orders.previous')}
            </button>

            <span className="text-sm text-white/70">
              {t('orders.page')} {meta.current_page} {t('orders.of')} {meta.last_page}
            </span>

            <button
              disabled={meta.current_page === meta.last_page}
              onClick={() => setPage((p) => p + 1)}
              className="px-5 py-2 rounded-full cursor-pointer bg-white/10 disabled:opacity-40
              hover:bg-white/20 transition"
            >
              {t('orders.next')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShowAllOrders;
