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
import { useState } from 'react';
import { useEffect } from 'react';
import FavoriteIcon from '../../assets/icons/FavoriteIcon';
import WishListIcon from '../../assets/icons/WishListIcon';


const ProductInfo = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { variantId } = useParams();
  const { data } = useGetProductVariant(variantId);
  const { data: categories = [] } = useGetCategories();
  const { data: user } = useGetProfile();
  const { mutate: addToCart, isLoading } = useAddToCartItem();
  const { mutate: addWishlist } = useAddWishlist();
  const product = data?.product;
  const variant = data;

  const [activeImage, setActiveImage] = useState(null);


  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  console.log(selectedVariantId);


  useEffect(() => {
    if (product?.available_options?.length > 0) {
      const firstColor = product.available_options[0];
      const firstSize = firstColor.available_sizes[0];
      const firstMaterial = firstSize.available_materials[0];

      setSelectedColor(firstColor);
      setSelectedSize(firstSize);
      setSelectedMaterial(firstMaterial);
      setSelectedVariantId(firstMaterial.variant_id);
    }
  }, [product]);


  useEffect(() => {
    if (data?.all_images?.length) {
      setActiveImage(data.all_images[0].url);
    } else if (data?.image) {
      setActiveImage(data.image);
    }
  }, [data]);


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
              className={`px-5 py-1.5 rounded-full text-sm md:text-base transition-all duration-300 shadow-sm ${isActive ? 'bg-[#025043] text-white font-bold scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {category.name}
            </span>
          );
        })}
      </div>

      <hr className="mt-4 border-[#025043]" />

      {/* Main Section */}
      <div className="w-full flex flex-col md:flex-row gap-4 items-start relative">

        {/* Left Image Section */}
        <div className="w-full md:w-5/12">

          {/* Image */}
          <div className="w-full flex justify-start">
            <img
              src={activeImage}
              alt={product?.name}
              className="w-full max-h-[420px] object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 justify-center overflow-x-auto py-2">
            {data.product.product_all_images?.map((img) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(img.url)}
                className={`shrink-0 w-16 h-16 rounded-xl border-2 transition-all ${activeImage === img.url ? 'border-[#025043] scale-110 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
              >
                <img src={img.url} className="w-full h-full object-cover rounded-lg" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Section */}



        {/* Right Section */}
        <div className="w-full flex flex-col md:flex-row gap-4 relative">

          {/* Left Subsection (Details) */}
          <div className={`md:w-1/2 space-y-4 ${isRTL ? 'pe-4 text-right' : 'ps-4 text-left'}`}>
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
            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('productInfo.color')}</span>
              <div className="flex gap-3 mt-3">
                {product.available_options.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => {
                      setSelectedColor(color);
                      const firstSize = color.available_sizes[0];
                      const firstMaterial = firstSize.available_materials[0];
                      setSelectedSize(firstSize);
                      setSelectedMaterial(firstMaterial);
                      setSelectedVariantId(firstMaterial.variant_id);
                    }}
                    className={`w-8 h-8 rounded-full border-2 transition-all shadow-sm ${selectedColor?.id === color.id ? 'border-black scale-125 ring-2 ring-gray-100' : 'border-transparent'
                      }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{t('productInfo.size')}</span>
              <div className="flex gap-2 mt-3 flex-wrap">
                {selectedColor?.available_sizes.map((size) => {
                  const isActive = selectedSize?.id === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => {
                        setSelectedSize(size);
                        const firstMaterial = size.available_materials[0];
                        setSelectedMaterial(firstMaterial);
                        setSelectedVariantId(firstMaterial.variant_id);
                      }}
                      className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all ${isActive ? 'bg-[#025043] text-white border-[#025043]' : 'bg-white border-gray-200 text-gray-600 hover:border-[#025043]'
                        }`}
                    >
                      {size.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rating */}
            <div className="font-bold font-[Expo-arabic]">
              {t('productInfo.rate')}
              <div className="flex items-center gap-2 text-sm mt-1">
                <RatingStars
                  rating={Number(data.reviews_avg) || 0}
                  onRate={(star) => handleRateProduct(selectedVariantId, star)}
                />
                <span className="text-xs text-gray-500">
                  ({variant?.reviews_count ?? 0})
                </span>
              </div>
            </div>

            {/* Add to Cart + Add to Favorites in same line */}



            {/* Container for Buttons */}
            <div className="flex items-center gap-3 mt-8 w-full">

              {/* Add to Cart Button Group */}
              <button
                onClick={() => handleAddCartItem({ id: selectedVariantId })}
                disabled={isLoading}
                className="flex-1 h-14 bg-black text-white rounded-xl flex items-center justify-between px-6 hover:bg-gray-800 transition-all group disabled:bg-gray-400"
              >
                <span className="font-bold text-lg">
                  {isLoading ? t('productInfo.adding') : t('productInfo.add_to_cart')}
                </span>

                {/* Arrow Icon inside the button */}
                <div className={`w-8 h-8 bg-white/20 flex items-center justify-center rounded-full transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`}>
                  <ChevronRightIcon color="white" />
                </div>
              </button>

              {/* Add to Favorites (Icon Button) */}
              {/* Add to Favorites (Icon Button) */}
              <button
                onClick={() => handleAddWishlist({ id: selectedVariantId })}
                className={`w-14 h-14 border-2 rounded-xl flex items-center justify-center transition-all group ${isProductInWishlist(selectedVariantId)
                  ? 'bg-red-50 border-red-200 text-red-500'
                  : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500'
                  }`}
                title={t('productInfo.add_to_favorites')}
              >
                {/* تمرير الحالة للأيقونة لتغيير لون الـ fill داخلياً */}
                <WishListIcon isFavorite={isProductInWishlist(selectedVariantId)} />
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

            {/* Material Selection */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {t('productInfo.material')}
              </h4>
              <div className="flex gap-2 flex-wrap">
                {selectedSize?.available_materials.map((material) => {
                  const isActive = selectedMaterial?.id === material.id;
                  return (
                    <button
                      key={material.id}
                      onClick={() => {
                        setSelectedMaterial(material);
                        setSelectedVariantId(material.variant_id);
                      }}
                      className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all ${isActive ? 'bg-[#025043] text-white border-[#025043]' : 'bg-white border-gray-200 text-gray-600 hover:border-[#025043]'
                        }`}
                    >
                      {material.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="mt-6 border-[#025043]" />
          </div>
        </div>


      </div>
    </div >
  );
};


export default ProductInfo;
