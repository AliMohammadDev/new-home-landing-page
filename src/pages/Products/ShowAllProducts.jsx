import {
  addToast,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
} from '@heroui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import FilterIcon from '../../assets/icons/FilterIcon';
import ProductFilters from './ProductFilters';
import WishListIcon from '../../assets/icons/WishListIcon';
import { useGetAllProductsVariants } from '../../api/products';
import { useAddToCartItem } from '../../api/cart';
import { useGetProfile } from '../../api/auth';
import { Link } from 'react-router-dom';
import { useAddWishlist, useGetAllWishlist } from '../../api/wishlist';

function ShowAllProducts() {

  const { data: products = [] } = useGetAllProductsVariants();
  const { data: wishlistData } = useGetAllWishlist();
  const { mutate: addWishlist } = useAddWishlist();

  const variants = products || [];
  const productsList = variants.map(v => ({
    ...v.product,
    variantId: v.id,
    color: v.color,
    size: v.size,
    material: v.material,
    stock_quantity: v.stock_quantity,
  }));

  const { data: user } = useGetProfile();

  const { mutate: addToCart, isLoading } = useAddToCartItem();
  const [visibleCount, setVisibleCount] = useState(8);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  const handleAddCartItem = (variant) => {
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
        product_variant_id: variant.variantId,
        quantity: 1,
      },
      {
        onSuccess: () => {
          addToast({
            title: 'Cart',
            description: `${variant.product.name} added to cart successfully!`,
            color: 'success',
            duration: 4000,
            isClosable: true,
          });
        },
        onError: () => {
          addToast({
            title: 'Cart',
            description: `Failed to add ${variant.product.name} to cart`,
            color: 'error',
            duration: 4000,
            isClosable: true,
          });
        },
      }
    );
  };


  // Add wishlist
  const handleAddWishlist = (variant) => {
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
    addWishlist(
      variant.variantId,
      {
        onSuccess: () => {
          addToast({
            title: 'Wishlist',
            description: `${variant.product.name} added to Wishlist successfully!`,
            color: 'success',
            duration: 4000,
            isClosable: true,
          });
        },
        onError: () => {
          addToast({
            title: 'Wishlist',
            description: `Failed to add ${variant.product.name} to cart`,
            color: 'error',
            duration: 4000,
            isClosable: true,
          });
        },
      }
    );
  };

  const wishlistProductIds = wishlistData?.data?.map(item =>
    item.product_variant?.id
  ) || [];

  const isProductInWishlist = (variantId) => {
    return wishlistProductIds.includes(variantId);
  };


  const [showFilters, setShowFilters] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderStars = (rating = 0) => {
    const fullStars = Math.round(rating);
    return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
  };

  return (
    <div className="bg-[#EDEAE2] min-h-screen">
      <img
        src="https://res.cloudinary.com/dzvrf9xe3/image/upload/v1765364809/category1_w0uzis.png"
        alt="Category"
        className="w-full"
      />

      <div className=" mx-auto px-6 py-10">
        <div className="flex justify-start mb-10">
          <h1 className="text-5xl font-[Qanduchia] text-black">All Products</h1>
        </div>

        {/* Filter */}
        <div className="relative inline-block mt-5">
          <button
            className="flex items-center cursor-pointer gap-2 bg-[#D9D9D9] text-[#025043] text-[16px] font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-[#cfcfcf] transition"
            onClick={() => {
              if (isMobile) onOpen();
              else setShowFilters(!showFilters);
            }}
          >
            <FilterIcon />
            <span className="font-[Expo-arabic] text-black"> Show filters</span>
          </button>
        </div>

        <div className="flex justify-between">
          <div
            className={`${showFilters ? 'w-2.8 md:w-1/4' : 'w-0 hidden'} transition-all duration-300`}
          >
            {!isMobile && showFilters && <ProductFilters />}
          </div>

          {/* All products */}
          <div
            className={`${showFilters ? 'w-3/2' : 'w-full'} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-5 transition-all duration-300`}
          >
            {productsList.slice(0, visibleCount).map((product, i) => (
              <div key={i} className="md:px-1">
                <div className="relative bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD]">
                  <Link to={`/products/${product.category.id}/product-info/${product.variantId}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 sm:h-56 md:h-60 lg:h-64 object-cover hover:opacity-90 transition cursor-pointer"
                    />
                  </Link>

                  <button
                    onClick={() => handleAddWishlist(product)}
                    className="absolute top-0 right-0 cursor-pointer rounded-full p-1 transition">
                    <WishListIcon isFavorite={isProductInWishlist(product.variantId)} />
                  </button>

                  <div className="p-4">
                    <h3 className="text-[#025043] text-[16px] font-medium mb-2">
                      {product.name}
                    </h3>

                    <div className="border-b border-[#025043]/50 mb-3"></div>

                    <p className="text-[#025043] text-[18px] font-semibold mb-4">
                      {product.final_price} SYP
                    </p>

                    <div className="flex items-center justify-between md:flex-col lg:flex-row text-[#025043]">
                      <div className="flex items-center gap-1 text-sm">
                        <span>{renderStars(product.rating)}</span>
                        <span className="text-xs text-gray-500">
                          ({product.reviews_count})
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddCartItem(product)}
                        disabled={isLoading}
                        className="bg-[#025043] text-white text-sm px-4 py-1.5 rounded-full hover:bg-[#01382f] transition disabled:opacity-50"
                      >
                        {isLoading ? 'Adding...' : 'Add to cart'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* زر Show More */}
            {visibleCount < productsList.length && (
              <div className="col-span-full flex justify-center mt-5">
                <button
                  onClick={handleShowMore}
                  className="px-6 py-2 bg-[#025043] text-white rounded-md hover:bg-[#01382f] transition"
                >
                  Show More...
                </button>
              </div>
            )}
          </div>

        </div>

        <Drawer isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange}>
          <DrawerContent>
            <>
              <DrawerHeader className="flex flex-col gap-1 text-black font-semibold">
                Filters
              </DrawerHeader>
              <DrawerBody>
                <ProductFilters />
              </DrawerBody>
            </>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

export default ShowAllProducts;
