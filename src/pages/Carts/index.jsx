import { addToast } from '@heroui/react';
import {
  useDecreaseItem,
  useGetAllCartItems,
  useIncreaseItem,
  useRemoveFromCartItem,
} from '../../api/cart';
import CartIcon from '../../assets/icons/CartIcon';
import MinusIcon from '../../assets/icons/MinusIcon';
import PlusIcon from '../../assets/icons/PlusIcon';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Carts() {
  const { t, i18n } = useTranslation();
  const { data: cartItems, isLoading } = useGetAllCartItems();
  const { mutate: increaseItem } = useIncreaseItem();
  const { mutate: decreaseItem } = useDecreaseItem();
  const { mutate: removeItem } = useRemoveFromCartItem();

  const isAr = i18n.language === 'ar';

  if (isLoading) {
    return (
      <div className="text-center mt-40 text-white font-[Expo-arabic]">
        {t('cart.loading')}
      </div>
    );
  }

  const items = cartItems?.data || [];
  const total = cartItems?.cart_total || 0;


  const handleRemoveCartItem = (cartItemId, productName) => {
    removeItem(cartItemId, {
      onSuccess: () => {
        addToast({
          title: t('cart.my_cart'),
          description: t('cart.removed_success', { product: productName }),
          color: 'success',
          duration: 4000,
        });
      },
    });
  };

  return (
    <div
      className="w-full bg-[#025043] min-h-screen px-6 lg:px-24 py-24 font-[Expo-arabic] text-white"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-4">
          <CartIcon size={48} color="white" />
        </div>
        <h1 className="text-4xl font-bold tracking-wide">{t('cart.my_cart')}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.length === 0 ? (
            <div className="text-center py-20 text-lg">{t('cart.empty')}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="text-start py-4 px-2">{t('cart.product')}</th>
                    <th className="text-start py-4 px-2">{t('cart.price')}</th>
                    <th className="text-end py-4 px-2">{t('cart.quantity')}</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b last:border-none">
                      {/* Product */}
                      <td className="py-6 px-2">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleRemoveCartItem(item.id, item.product_variant?.name)}
                            className="text-white/50 cursor-pointer hover:text-red-400 text-sm"
                          >
                            ✕
                          </button>
                          <img
                            src={item.product_variant?.image}
                            alt={item.product_variant?.name}
                            className="w-16 h-20 object-cover rounded"
                          />
                          <span className="font-medium">{item.product_variant?.name}</span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-6 px-2">
                        <span className="text-[#E2995E] font-semibold whitespace-nowrap">
                          {item.total_price} $
                        </span>
                      </td>

                      {/* Quantity */}
                      <td className="py-6 px-2">
                        <div className="flex justify-end">
                          <div className="inline-flex items-center bg-white text-[#025043] rounded-2xl px-2 py-1 gap-2">
                            <button
                              onClick={() => decreaseItem(item.id)}
                              className="p-1 bg-[#025043] text-white cursor-pointer rounded-xl"
                            >
                              <MinusIcon />
                            </button>
                            <span className="px-2 font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => increaseItem(item.id)}
                              className="p-1 bg-[#025043] text-white cursor-pointer rounded-xl"
                            >
                              <PlusIcon />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="bg-white text-[#025043] rounded-3xl p-8 h-fit shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-center">{t('cart.my_cart')}</h2>

          <div className="flex justify-between mb-4">
            <span>{t('cart.subtotal')}</span>
            <span className="font-semibold">{total} $</span>
          </div>

          <div className="border-b my-4 border-[#025043]/10"></div>

          <div className="flex justify-between text-lg font-bold mb-8">
            <span>{t('cart.total')}</span>
            <span>{total} $</span>
          </div>

          <Link to="/checkouts">
            <button className="w-full bg-[#025043] text-white py-3 cursor-pointer rounded-full hover:bg-opacity-90 transition">
              {t('cart.proceed_checkout')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Carts;