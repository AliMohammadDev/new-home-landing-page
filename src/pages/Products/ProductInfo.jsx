import { Link, useParams } from 'react-router-dom';
import LeftIcon from '../../assets/icons/LeftIcon';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon';
import { useGetProductVariant } from '../../api/products';
import { useGetCategories } from '../../api/categories';
import { addToast } from '@heroui/react';
import { useAddToCartItem } from '../../api/cart';
import { useAddWishlist } from '../../api/wishlist';
import { useGetProfile } from '../../api/auth';
import RatingStars from '../../components/RatingStars';
import { useAddReviews } from '../../api/reviews';


const ProductInfo = () => {
  const { variantId } = useParams();
  const { data } = useGetProductVariant(variantId);
  const { data: categories = [] } = useGetCategories();
  const { data: user } = useGetProfile();
  const { mutate: addToCart, isLoading } = useAddToCartItem();
  const { mutate: addWishlist } = useAddWishlist();
  const product = data?.product;
  const variant = data;


  const activeCategoryId = product?.category?.id;


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
        product_variant_id: variant.id,
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
      variant.id,
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



  if (!data || !product || !variant) {
    return <p className="text-center mt-20">Loading product...</p>;
  }


  return (
    <div className="w-full text-black px-4 md:px-10 lg:px-20 py-10 bg-white min-h-screen relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <Link to={-1} className="hover:opacity-80 transition">
          <LeftIcon />
        </Link>
      </div>
      {/* Title */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl text-center font-bold">
        DESCRIPTION OF PRODUCTS
      </h1>
      <hr className="mt-5 border-[#025043]" />
      {/* Category Menu */}
      <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 mt-4 text-sm md:text-base">
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;

          return (
            <span
              key={category.id}
              className={` px-3 py-1 rounded-full transition
          ${isActive
                  ? 'bg-[#025043] text-white font-bold'
                  : 'text-gray-600'
                }`}
            >
              {category.name}
            </span>
          );
        })}
      </div>

      <hr className="mt-4 border-[#025043]" />
      {/* Main Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mt-1">
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-auto object-cover shadow-md rounded-2xl"
          />

          <p className="mt-10 text-center text-black leading-relaxed">
            Almanzel-Alhadith is a company specializing in providing
            high-quality kitchen tools and hospitality equipment for homes,
            restaurants, and hotels.
          </p>
        </div>
        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col md:flex-row justify-between gap-8 items-stretch relative">
          {/* Left Subsection */}
          <div className="md:w-1/2 pr-4 flex-1 space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold font-[Expo-arabic]">
              {product?.name}
            </h2>
            {/* Price */}
            <div className="text-lg">
              {product?.discount > 0 && (
                <span className="line-through text-gray-400">
                  {product.price} $
                </span>
              )}
              <br />

              <span className="font-bold text-black">
                {product?.final_price} $
              </span>

              {product?.discount > 0 && (
                <span className="bg-yellow-300 px-2 py-0.5 rounded-full text-sm font-medium ml-2">
                  {Math.round(
                    ((product.price - product.final_price) / product.price) * 100
                  )}
                  % OFF
                </span>
              )}
            </div>

            {/* Colors */}
            <div className="space-x-2">
              <span className="font-bold font-[Expo-arabic]">COLOR</span>
              <br />
              <span
                className="inline-block w-5 h-5 rounded-full border border-gray-300"
                style={{ backgroundColor: variant.color?.hex_code }}
              ></span>
            </div>

            {/* Size */}
            <div className="text-sm">
              <span className="font-bold font-[Expo-arabic]">Size</span>
              <br />
              {variant?.size}
            </div>

            {/* Rating */}
            <div className="font-bold font-[Expo-arabic]">
              Rate
              <br />
              {/* <span className="text-[#025043]">
                {'★'.repeat(Math.round(product?.reviews_avg || 0))}
                {'☆'.repeat(5 - Math.round(product?.reviews_avg || 0))}
              </span> */}

              <RatingStars
                rating={Number(variant.reviews_avg) || 0}
                onRate={(star) =>
                  handleRateProduct(variant.id, star)
                }
              />
              <span className="ml-2 font-bold">
                ({product?.reviews_count || 0})
              </span>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex flex-col mt-6 w-full">
              <div className="flex items-center justify-between w-full">
                {/* Quantity Controls */}
                {/* <div className="relative flex items-center border-white rounded-md bg-gray-200 px-2 py-1">
                  <button
                    onClick={() => {
                      increaseItem(variant.id);
                    }}
                    className="p-2 ml-1 rounded-full bg-black text-white hover:opacity-80 cursor-pointer">
                    <PlusIcon color="black" />
                  </button>

                  <span className="px-4 text-black p-1 font-bold text-center">
                    {product.quantity}
                  </span>

                  <button
                    onClick={() => {
                      decreaseItem(variant.id);
                    }}
                    className="p-2 -ml-1 rounded-full bg-black text-white hover:opacity-80 cursor-pointer">
                    <MinusIcon color="black" />
                  </button>
                </div> */}

                {/* Add to Cart + Chevron Icon */}
                <div className="flex items-center gap-2">


                  <div className='flex gap-1'>
                    <button
                      onClick={() => handleAddCartItem(product)}
                      disabled={isLoading}
                      className="px-6 py-1 bg-black cursor-pointer  text-white rounded-md hover:opacity-80 transition whitespace-nowrap"
                    >
                      {isLoading ? 'Adding...' : 'Add to cart'}
                    </button>

                    {/* Circle Chevron Icon */}
                    <div className="w-8 h-8 bg-black flex items-center justify-center border border-black  rounded-full hover:opacity-80 transition">
                      <ChevronRightIcon color="white" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Add to favorites */}
              <span
                onClick={() => handleAddWishlist(product)}
                className="text-sm cursor-pointer text-gray-600 mt-1 mr-12 text-right hover:underline-offset-2"
              >
                Add to favorites+
              </span>



            </div>
            <hr className="mt-6 border-[#025043]" />
            <p className="font-[Expo-arabic] text-black">
              Elegant glassware, cups, mugs, jars, and all tabletop essentials.
            </p>
            <p className="font-[Expo-arabic] text-black">
              Decorative homeware, gifts, crystal items, and ornaments.
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 border-l-2 border-[#025043] mx-auto"></div>

          {/* Right Subsection */}
          <div className="md:w-1/2 pl-4 flex-1 space-y-3">
            {/* <div className="flex items-center gap-2 text-sm  text-gray-500">
              <span className='hover:opacity-80'>
                <CloseIcon />
              </span>
              <span>Remove</span>
            </div> */}

            <h3 className="text-xl md:text-2xl font-semibold font-[Expo-arabic]">
              PRODUCT DESCRIPTION
            </h3>
            <p className="mt-2 text-black leading-relaxed font-[Expo-arabic]">
              Stainless steel cooking pot with transparent cover for easy
              monitoring during cooking.
            </p>

            <div className="mt-4">
              <h4 className="font-semibold text-lg font-[Expo-arabic]">
                MATERIAL
              </h4>
              <p className="text-black mt-1 leading-relaxed font-[Expo-arabic]">
                {variant?.material}
              </p>
            </div>

            <hr className="mt-6 border-[#025043]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
