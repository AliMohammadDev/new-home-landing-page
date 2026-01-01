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
import { useTranslation } from 'react-i18next';


const ProductInfo = () => {
  const { t, i18n } = useTranslation();
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
        title: t('cart.button'),
        description: t('wishlist.loginRequired'),
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
            title: t('cart.button'),
            description: t('essential_to_prep.cart_success', {
              product: variant.name,
            }),
            color: 'success',
            duration: 4000,
            isClosable: true,
          });
        },
        onError: () => {
          addToast({
            title: t('cart.button'),
            description: t('essential_to_prep.cart_error', {
              product: variant.name,
            }),
            color: 'error',
            duration: 4000,
            isClosable: true,
          });
        },
      }
    );
  };


  const wishlistProductIds = addWishlist?.data?.map(item =>
    item.product_variant?.id
  ) || [];
  const isProductInWishlist = (variantId) => {
    return wishlistProductIds.includes(variantId);
  };
  // Add wishlist
  const handleAddWishlist = (variant) => {
    if (!user) {
      addToast({
        title: t('wishlist.title'),
        description: t('wishlist.loginRequired'),
        color: 'warning',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    if (isProductInWishlist(variant.variantId)) {
      addToast({
        title: t('wishlist.title'),
        description: t('wishlist.addedError'),
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
            title: t('wishlist.title'),
            description: t('wishlist.addedSuccess'),
            color: 'success',
            duration: 4000,
            isClosable: true,
          });
        },
        onError: () => {
          addToast({
            title: t('wishlist.title'),
            description: t('wishlist.addedError'),
            color: 'warning',
            duration: 4000,
            isClosable: true,
          });
        },
      }
    );
  };


  const { mutate: addReview } = useAddReviews();
  //Add review
  const handleRateProduct = (variantId, rating) => {
    if (!user) {
      addToast({
        title: t('rating.title'),
        description: t('rating.loginRequired'),
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
            title: t('rating.successTitle'),
            description: t('rating.successMessage'),
            color: 'success',
          });
        },
        onError: () => {
          addToast({
            title: t('rating.title'),
            description: t('rating.alreadyRated'),
            color: 'warning',
          });
        }
      }
    );

  };



  if (!data || !product || !variant) {
    return <p className="text-center mt-20">Loading product...</p>;
  }
  const isRTL = i18n.language === 'ar';


  return (
    <div className="w-full text-black px-4 md:px-10 lg:px-20 py-10 bg-white min-h-screen relative" dir={isRTL ? 'rtl' : 'ltr'}>

      <div className={`absolute top-4 ${isRTL ? 'left-4' : 'left-4'} z-20`}>
        <Link to={-1} className="hover:opacity-80 transition">
          <LeftIcon />
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl text-center font-bold">
        {t('productInfo.description_title')}
      </h1>
      <hr className="mt-5 border-[#025043]" />

      {/* Category Menu */}
      <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 mt-4 text-sm md:text-base">
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;
          return (
            <span
              key={category.id}
              className={`px-3 py-1 rounded-full transition ${isActive ? 'bg-[#025043] text-white font-bold' : 'text-gray-600'
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
          <p className="mt-10 text-center text-black leading-relaxed font-[Expo-arabic]">
            {product.category?.description || product.category?.name || ""}
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col md:flex-row justify-between gap-8 items-stretch relative">

          {/* Left Subsection (Details) */}
          <div className={`md:w-1/2 flex-1 space-y-4 ${isRTL ? 'pe-4 text-right' : 'ps-4 text-left'}`}>
            <h2 className="text-2xl md:text-3xl font-semibold font-[Expo-arabic]">
              {product?.name}
            </h2>

            {/* Price */}
            <div className="text-lg">
              {product?.discount > 0 && (
                <span className="line-through text-gray-400">{product.price} $</span>
              )}
              <br />
              <span className="font-bold text-black">{product?.final_price} $</span>
            </div>

            {/* Colors */}
            <div className="space-y-1">
              <span className="font-bold font-[Expo-arabic]">{t('productInfo.color')}</span>
              <div
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: variant.color?.hex_code }}
              ></div>
            </div>

            {/* Size */}
            <div className="text-sm">
              <span className="font-bold font-[Expo-arabic]">{t('productInfo.size')}</span>
              <p>{variant?.size}</p>
            </div>

            {/* Rating */}
            <div className="font-bold font-[Expo-arabic]">
              {t('productInfo.rate')}

              <div className="flex items-center gap-2 text-sm mt-1">
                <RatingStars
                  rating={Number(variant?.reviews_avg) || 0}
                  onRate={(star) => handleRateProduct(variant.id, star)}
                />

                <span className="text-xs text-gray-500">
                  ({variant?.reviews_count ?? 0})
                </span>
              </div>
            </div>


            {/* Add to cart */}
            <div className="flex flex-col mt-6 w-full gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleAddCartItem(variant)}
                  disabled={isLoading}
                  className="px-8 py-2 bg-black text-white rounded-md hover:opacity-80 transition whitespace-nowrap font-bold"
                >
                  {isLoading ? t('productInfo.adding') : t('productInfo.add_to_cart')}
                </button>
                <div className={`w-10 h-10 bg-black flex items-center justify-center rounded-full ${isRTL ? 'rotate-180' : ''}`}>
                  <ChevronRightIcon color="white" />
                </div>
              </div>
              <button
                onClick={() => handleAddWishlist(product)}
                className="text-sm text-gray-600 hover:underline text-start pe-10"
              >
                {t('productInfo.add_to_favorites')}
              </button>
            </div>

            <hr className="mt-6 border-[#025043]" />
          </div>

          {/* Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 border-l-2 border-[#025043] transform -translate-x-1/2"></div>

          {/* Right Subsection (Description) */}
          <div className={`md:w-1/2 flex-1 space-y-3 ${isRTL ? 'ps-4 text-right' : 'pe-4 text-left'}`}>
            <p className="mt-2 text-black leading-relaxed font-[Expo-arabic]">
              {product?.description || product?.body || t('productInfo.no_description_available')}
            </p>

            <div className="mt-4">
              <h4 className="font-semibold text-lg font-[Expo-arabic]">{t('productInfo.material')}</h4>
              <p className="text-black mt-1 leading-relaxed font-[Expo-arabic]">{variant?.material}</p>
            </div>

            <hr className="mt-6 border-[#025043]" />
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProductInfo;
