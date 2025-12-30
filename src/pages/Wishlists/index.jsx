import { useState } from 'react';
import { addToast } from '@heroui/react';
import FavoriteIcon from '../../assets/icons/FavoriteIcon';
import { useGetAllWishlist, useRemoveWishlist } from '../../api/wishlist';
import { useAddToCartItem } from '../../api/cart';
import { useGetProfile } from '../../api/auth';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

function Wishlists() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const removeWishlist = useRemoveWishlist();
  const [page, setPage] = useState(1);
  const { data: response, isLoading: isWishlistLoading } = useGetAllWishlist(page);
  const wishlistItems = response?.data || [];
  const meta = response?.meta;

  const { data: user } = useGetProfile();
  const { mutate: addToCart, isLoading: isAdding } = useAddToCartItem();

  // Add to cart
  const handleAddCartItem = (item) => {

    if (!user) {
      addToast({
        title: t('cart.title') || 'Cart',
        description: t('wishlist.loginRequired'),
        color: 'warning',
      });
      return;
    }

    addToCart(
      {
        product_variant_id: item.product_variant.id,
        quantity: 1,
      },
      {
        onSuccess: () => {
          addToast({
            title: t('cart.button') || 'Cart',
            description: t('essential_to_prep.cart_success', {
              product: item.product_variant.name,
            }),
            color: 'success',
          });
        },
        onError: () => {
          addToast({
            title: t('cart.button') || 'Cart',
            description: t('essential_to_prep.cart_error', {
              product: item.product_variant.name,
            }),
            color: 'error',
          });
        },
      }
    );
  };

  // Add to wishlist
  const handleRemoveWishlist = (wishlistId, productName) => {
    removeWishlist.mutate(wishlistId, {
      onSuccess: () => {
        addToast({
          title: t('wishlist.title'),
          description: `${productName} ${t('wishlist.removedSuccess')}`,
          color: 'success',
        });
      },
      onError: () => {
        addToast({
          title: t('wishlist.title'),
          description: t('wishlist.removedError'),
          color: 'error',
        });
      },
    });
  };

  if (isWishlistLoading) {
    return (
      <div className="w-full bg-[#025043] min-h-screen flex items-center justify-center text-white font-[Expo-arabic]">
        <p className="animate-pulse">{t('wishlist.loading') || 'Loading...'}</p>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-[#025043] min-h-screen px-4 md:px-12 lg:px-24 py-24 font-[Expo-arabic] text-white"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-4 transition-transform hover:scale-110 duration-300">
          <FavoriteIcon size={54} color="white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
          {t('wishlist.title')}
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <p className="text-xl text-gray-300">{t('wishlist.empty') || 'Your wishlist is empty'}</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/20 text-sm text-gray-300">
                  <th className="text-start py-4 px-4 font-light">{t('wishlist.productName')}</th>
                  <th className="text-start py-4 px-4 font-light">{t('wishlist.unitPrice')}</th>
                  <th className="text-end py-4 px-4 font-light"></th>
                </tr>
              </thead>

              <tbody>
                {wishlistItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/10 last:border-none group hover:bg-white/5 transition-all duration-300"
                  >
                    {/* Product Info */}
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handleRemoveWishlist(item.id, item.product_variant?.name)}
                          className="text-white/30 hover:text-red-400 cursor-pointer transition-colors p-1"
                          title={t('wishlist.remove')}
                        >
                          <span className="text-lg">✕</span>
                        </button>

                        <div className="relative group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={item.product_variant?.image}
                            alt={item.product_variant?.name}
                            className="w-16 h-20 object-cover rounded-lg shadow-lg border border-white/10"
                          />
                        </div>

                        <span className="font-medium text-lg tracking-wide">
                          {item.product_variant?.name}
                        </span>
                      </div>
                    </td>

                    {/* Unit Price */}
                    <td className="py-6 px-4">
                      <span className="text-[#E2995E] font-bold text-xl">
                        {item.product_variant?.final_price} $
                      </span>
                    </td>

                    {/* Action & Date */}
                    <td className="py-6 px-4">
                      <div className="flex flex-col items-end gap-3">
                        <span className="text-[11px] text-gray-400 font-light italic">
                          {t('wishlist.addedOn')} {new Date(item.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US')}
                        </span>

                        <button
                          onClick={() => handleAddCartItem(item)}
                          disabled={isAdding}
                          className={clsx(
                            "bg-white text-[#025043] font-bold px-8 py-2.5 rounded-full text-sm",
                            "hover:bg-[#E2995E] hover:text-white transition-all duration-300",
                            "active:scale-95 disabled:opacity-50 shadow-md cursor-pointer"
                          )}
                        >
                          {isAdding ? t('wishlist.adding') : t('wishlist.addToCart')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {meta && meta.last_page > 1 && (
          <div className="flex justify-center items-center gap-8 mt-16 pt-8 border-t border-white/10">
            <button
              disabled={meta.current_page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="text-sm uppercase tracking-widest disabled:opacity-30 hover:text-[#E2995E] transition-colors cursor-pointer"
            >
              {t('wishlist.previous') || (isAr ? 'السابق' : 'Previous')}
            </button>

            <div className="flex items-center gap-2 font-medium">
              <span className="text-[#E2995E]">{meta.current_page}</span>
              <span className="text-gray-400">/</span>
              <span>{meta.last_page}</span>
            </div>

            <button
              disabled={meta.current_page === meta.last_page}
              onClick={() => setPage((p) => p + 1)}
              className="text-sm uppercase tracking-widest disabled:opacity-30 hover:text-[#E2995E] transition-colors cursor-pointer"
            >
              {t('wishlist.next') || (isAr ? 'التالي' : 'Next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlists;