import { useState } from 'react';
import { addToast } from '@heroui/react';
import FavoriteIcon from '../../assets/icons/FavoriteIcon';
import { useGetAllWishlist, useRemoveWishlist } from '../../api/wishlist';
import { useAddToCartItem } from '../../api/cart';
import { useGetProfile } from '../../api/auth';

function Wishlists() {
  const removeWishlist = useRemoveWishlist();

  const [page, setPage] = useState(1);

  const { data: response } = useGetAllWishlist(page);

  const wishlistItems = response?.data || [];
  const meta = response?.meta;

  const { data: user } = useGetProfile();

  const { mutate: addToCart, isLoading: isAdding } = useAddToCartItem();

  // Add to cart
  const handleAddCartItem = (item) => {
    if (!user) {
      addToast({
        title: 'Cart',
        description: 'You have to login first!',
        color: 'warning',
        duration: 4000,
        isClosable: true,
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
            title: 'Cart',
            description: `${item.product_variant.name} added to cart successfully!`,
            color: 'success',
            duration: 4000,
            isClosable: true,
          });
        },
        onError: () => {
          addToast({
            title: 'Cart',
            description: `Failed to add ${item.product_variant.name} to cart`,
            color: 'error',
            duration: 4000,
            isClosable: true,
          });
        },
      }
    );
  };

  // Remove from wishlist
  const handleRemoveWishlist = (wishlistId, productName) => {
    removeWishlist.mutate(wishlistId, {
      onSuccess: () => {
        addToast({
          title: 'Wishlist',
          description: `${productName} removed from wishlist successfully!`,
          color: 'success',
          duration: 4000,
          isClosable: true,
        });
      },
      onError: (error) => {
        addToast({
          title: 'Wishlist',
          description:
            error.response?.data?.message ||
            'Failed to remove product from wishlist.',
          color: 'error',
          duration: 4000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <div className="w-full bg-[#025043] min-h-screen px-6 lg:px-24 py-24 font-[Expo-arabic] text-white">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-4">
          <FavoriteIcon size={48} />
        </div>
        <h1 className="text-4xl font-bold tracking-wide">My Wishlist</h1>
      </div>

      <div className="flex justify-center my-6">
        <div className="w-100 h-px bg-white/70"></div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-sm text-white">
              <th className="text-left py-4">Product name</th>
              <th className="text-left py-4">Unit price</th>
              <th className="text-right py-4"></th>
            </tr>
          </thead>

          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item.id} className="border-b last:border-none">
                <td className="py-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        handleRemoveWishlist(
                          item.id,
                          item.product_variant?.name
                        )
                      }
                      className="text-white/50 cursor-pointer hover:text-red-400 transition text-sm"
                    >
                      ✕
                    </button>

                    <img
                      src={item.product_variant?.image}
                      alt={item.product_variant?.name}
                      className="w-16 h-20 object-cover"
                    />

                    <span className="font-medium">
                      {item.product_variant?.name}
                    </span>
                  </div>
                </td>

                <td className="py-6">
                  <div className="flex gap-2 items-center">
                    <span className="line-through text-gray-400">
                      ${item.product_variant?.price}
                    </span>
                    <span className="text-[#E2995E] font-semibold">
                      ${item.product_variant?.final_price}
                    </span>
                  </div>
                </td>

                <td className="py-6 text-right">
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-gray-400">
                      Added on: {item.created_at}
                    </span>

                    <button
                      onClick={() => handleAddCartItem(item)}
                      disabled={isAdding}
                      className="bg-white text-black px-5 py-2 cursor-pointer rounded-full text-sm hover:bg-gray-200 transition"
                    >
                      {isAdding ? 'Adding...' : 'Add to cart'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {meta && meta.last_page > 1 && (
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              disabled={meta.current_page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-5 py-2 rounded-full cursor-pointer bg-white/10 disabled:opacity-40 hover:bg-white/20 transition"
            >
              Previous
            </button>

            <span className="text-sm text-white/70">
              Page {meta.current_page} of {meta.last_page}
            </span>

            <button
              disabled={meta.current_page === meta.last_page}
              onClick={() => setPage((p) => p + 1)}
              className="px-5 py-2 rounded-full cursor-pointer bg-white/10 disabled:opacity-40 hover:bg-white/20 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlists;
