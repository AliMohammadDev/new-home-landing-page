import FilterIcon from '../../assets/icons/FilterIcon.jsx';
import WishListIcon from '../../assets/icons/WishListIcon.jsx';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  addToast,
} from '@heroui/react';
import ProductFilters from './ProductFilters.jsx';
import { useGetProductsVariantsByCategory } from '../../api/products.jsx';
import { useAddToCartItem } from '../../api/cart.jsx';
import { useGetProfile } from '../../api/auth.jsx';
import { useAddWishlist, useGetAllWishlist } from '../../api/wishlist.jsx';
import { useAddReviews } from '../../api/reviews.jsx';
import RatingStars from '../../components/RatingStars.jsx';

const Product = () => {
  const { categoryId } = useParams();



  const [showFilters, setShowFilters] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);
  const { data: wishlistData } = useGetAllWishlist();

  const { data: user } = useGetProfile();
  const { mutate: addToCart, isLoading } = useAddToCartItem();
  const { mutate: addWishlist } = useAddWishlist();
  const { data: products = [] } = useGetProductsVariantsByCategory(categoryId);
  const productsList = (products || []).map(v => ({
    ...v.product,
    variantId: v.id,
    color: v.color,
    size: v.size,
    material: v.material,
    stock_quantity: v.stock_quantity,
    rating: Number(v.reviews_avg),
    reviews_count: v.reviews_count,
  }));
  const category = products[0]?.product?.category;


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add to cart 
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


  const { mutate: addReview } = useAddReviews();

  const handleRateProduct = (variantId, rating) => {
    if (!user) {
      addToast({
        title: 'Rating',
        description: 'You have to login first!',
        color: 'warning',
      });
      return;
    }




    addReview(
      {
        product_variant_id: variantId,
        rating,
      },
      {
        onSuccess: () => {
          addToast({
            title: 'Thank you!',
            description: 'Your review has been submitted',
            color: 'success',
          });
        },
        onError: (error) => {
          addToast({
            title: 'Error',
            description:
              error.response?.data?.message || 'Failed to submit review',
            color: 'error',
          });
        }
      }
    );

  };


  return (
    <div className="bg-[#EDEAE2] min-h-screen">
      {category && (
        <div className="w-full h-[300px] md:h-[900px] overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}


      <div className=" mx-auto px-6 py-10">
        <div className="flex justify-start mb-10">
          <h1 className="text-5xl font-[Qanduchia] text-black">{categoryId}</h1>
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
            {productsList.map((product) => (
              <div key={product.variantId} className="md:px-1">
                <div className="relative bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD]">
                  <Link to={`/products/${categoryId}/product-info/${product.variantId}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 sm:h-56 md:h-60 lg:h-64 object-cover hover:opacity-90 transition"
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
                        <RatingStars
                          rating={product.rating}
                          onRate={(star) =>
                            handleRateProduct(product.variantId, star)
                          }
                        />
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
};

export default Product;
