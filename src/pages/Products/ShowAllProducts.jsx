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
import { Link, useNavigate } from 'react-router-dom';
import { useAddWishlist, useGetAllWishlist } from '../../api/wishlist';
import RatingStars from '../../components/RatingStars';
import { useSubmitReview } from '../../api/reviews';
import allProducts from "../../assets/images//all_products.png"
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
function ShowAllProducts() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    colors: [],
    categories: [],
    sizes: [],
    materials: [],
    price: {
      min: 0.2,
      max: 100,
    },
  });
  const { data: products = [] } = useGetAllProductsVariants();
  const { data: wishlistData } = useGetAllWishlist();
  const { mutate: addWishlist } = useAddWishlist();
  const variants = products || [];
  const productsList = variants.map(v => ({
    variantId: v.id,
    image: v.image,

    name: v.product.name,
    category: v.product.category,

    price: Number(v.price),
    discount: Number(v.discount),
    final_price: Number(v.final_price),

    color: v.current_color,
    size: v.current_size,
    material: v.current_material,

    available_options: v.product.available_options || [],

    stock_quantity: v.stock_quantity,
    rating: Number(v.reviews_avg) || 0,
    reviews_count: v.reviews_count,
    sku: v.sku,
  }));

  const { data: user } = useGetProfile();
  const { mutate: addToCart, isLoading } = useAddToCartItem();
  const [visibleCount, setVisibleCount] = useState(8);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 8);
  };

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
      navigate('/login');
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
            title: t('cart.button'),
            description: t('essential_to_prep.cart_success', {
              product: variant.name,
            })
            ,
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
            })
            ,
            color: 'error',
            duration: 4000,
            isClosable: true,
          });
        },
      }
    );
  };


  const handleAddWishlist = (variant) => {
    if (!user) {
      addToast({
        title: t('wishlist.title'),
        description: t('wishlist.loginRequired'),
        color: 'warning',
      });
      navigate('/login');
      return;
    }

    addWishlist(
      variant.variantId,
      {
        onSuccess: (res) => {
          const isRemoved = res.status === 'removed';
          addToast({
            title: t('wishlist.title'),
            description: isRemoved
              ? t('wishlist.removedSuccess')
              : t('wishlist.addedSuccess'),
            color: isRemoved ? "warning" : "success",
            duration: 2000,
          });
        },
        onError: (error) => {
          addToast({
            title: t('wishlist.title'),
            description: error.message,
            color: 'error',
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

  const [showFilters, setShowFilters] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const updatePrice = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        [type]: Number(value),
      },
    }));
  };
  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      if (!Array.isArray(prev[type])) return prev;

      const exists = prev[type].includes(value);

      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      };
    });
  };

  const filteredProducts = productsList.filter((product) => {
    // Category filter
    const matchCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category.name);

    // Color filter
    const matchColor =
      filters.colors.length === 0 ||
      filters.colors.includes(product.color);

    // Size filter
    const matchSize =
      filters.sizes.length === 0 ||
      filters.sizes.includes(product.size);

    // Material filter
    const matchMaterial =
      filters.materials.length === 0 ||
      filters.materials.includes(product.material);

    // Price filter
    const matchPrice =
      Number(product.final_price) >= filters.price.min &&
      Number(product.final_price) <= filters.price.max;

    return (
      matchCategory &&
      matchColor &&
      matchSize &&
      matchMaterial &&
      matchPrice
    );
  });

  const { mutate: submitReview } = useSubmitReview();
  const handleRateProduct = (variantId, rating) => {
    if (!user) {
      addToast({
        title: t('rating.title'),
        description: t('rating.loginRequired'),
        color: 'warning',
        duration: 4000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }
    submitReview(
      {
        product_variant_id: variantId,
        rating,
      },
      {
        onSuccess: (data) => {
          addToast({
            title: t('rating.successTitle'),
            description: `${t('rating.successMessage')} : ${data.rating}`,
            color: 'success',
          });
        },
        onError: (error) => {
          console.error(error);
          addToast({
            title: t('rating.title'),
            description: error.response?.data?.message || t('rating.error'),
            color: 'error',
          });
        }
      }
    );
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      sizes: [],
      colors: [],
      materials: [],
      price: { min: 1, max: 1000 }
    });
  };

  return (
    <div className="bg-[#EDEAE2] min-h-screen">
      <div className="w-full h-screen relative overflow-hidden bg-black">
        <Swiper
          key={i18n.language}
          dir={isRTL ? 'rtl' : 'ltr'}
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          speed={1500}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {[
            {
              image: "https://kitchenwarehouseltd.com/wp-content/uploads/2025/04/heritagegreen-5-1024x724.jpg",
              title: t('slider.modern_kitchenware')
            },
            {
              image: "https://www.spotlightstores.com/medias/kitchenware-buying-guide-1.jpg?context=bWFzdGVyfHJvb3R8MjM0MzkzfGltYWdlL2pwZWd8cm9vdC9oM2IvaGYyLzE2ODY1NjY0ODkyOTU4L2tpdGNoZW53YXJlLWJ1eWluZy1ndWlkZS0xLmpwZ3wyOWVjZDg4N2QxY2M3MGE5ZmFmODViYzkxNzNlZGYxODU4MGM5MGI1ZmY5ZjQ5YmJiMDc5ZWI4NjQ1M2IyMmQy",
              title: t('slider.premium_collection')
            },
            {
              image: allProducts,
              title: t('slider.everything_you_need'),
            }
          ].map((slide, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div
                  className="w-full h-full bg-cover bg-no-repeat bg-center relative"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black/30" />
                  <div className={clsx(
                    "absolute z-10 top-1/2 -translate-y-1/2 px-10 text-white w-full transition-all duration-1000",
                    isRTL ? "text-right" : "text-left",
                    isActive ? "opacity-100" : "opacity-0"
                  )}>
                    <h1 className={clsx(
                      "text-4xl md:text-6xl font-bold",
                      isRTL ? "font-[Expo-arabic]" : "font-[Qanduchia]"
                    )}>
                      {slide.title}
                    </h1>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <style>{`
    .swiper-pagination-bullet { background: white !important; opacity: 0.5; }
    .swiper-pagination-bullet-active { background: #E2995E !important; opacity: 1; width: 30px; border-radius: 4px; }
  `}</style>
      </div>

      <div className=" mx-auto px-6 py-10">
        <div className="flex justify-start mb-10">
          <h1 className={
            clsx("text-5xl  text-black",
              isRTL ? "font-[Expo-arabic]" : "font-[Qanduchia]"
            )
          }>
            {t('navbar.all_products')}
          </h1>
        </div>

        {/* Filter */}
        <div className="relative inline-block mt-5">
          <button
            className="flex items-center cursor-pointer gap-2 bg-[#D9D9D9] text-[#025043] text-[16px] font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-[#cfcfcf] transition"
            onClick={() => {
              if (isMobile) {
                onOpen();
              } else {
                setShowFilters(!showFilters);
              }
            }}
          >
            <FilterIcon />
            <div className="w-[1.5px] h-6 bg-[#025043]/20 mx-1"></div>
            <span className="font-[Expo-arabic] text-black">
              {(isMobile ? isOpen : showFilters)
                ? t('filters.hide')
                : t('filters.show')
              }
            </span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">


          <div
            className={`${showFilters ? 'w-2.8 md:w-1/4' : 'w-0 hidden'} transition-all duration-300`}
          >
            {!isMobile && showFilters && (
              <ProductFilters
                filters={filters}
                onChange={toggleFilter}
                onPriceChange={updatePrice}
                onClearAll={clearFilters}
              />
            )}
          </div>

          {/* All products */}
          <div
            className={`${showFilters ? 'w-3/2' : 'w-full'} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-5 transition-all duration-300`}
          >
            {filteredProducts.slice(0, visibleCount).map((product, i) => {
              const sizes = [
                ...new Set(
                  product.available_options?.flatMap(color =>
                    color.available_sizes?.map(size => size.name)
                  )
                )
              ].slice(0, 4);

              const materials = [
                ...new Set(
                  product.available_options?.flatMap(color =>
                    color.available_sizes?.flatMap(size =>
                      size.available_materials?.map(mat => mat.name)
                    )
                  )
                )
              ].slice(0, 4);

              return (
                <div key={i} className="md:px-1">
                  <div className="relative bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD] flex flex-col h-full group">

                    {product.discount > 0 && (
                      <div className={clsx(
                        "absolute top-3 z-20 px-3 py-1 text-xs font-bold text-white bg-red-600 shadow-lg",
                        isRTL ? "right-0 rounded-l-full font-[Expo-arabic]" : "left-0 rounded-r-full"
                      )}>
                        {isRTL ? (
                          <>{t('essential_to_prep.off')} {Number(product.discount)}%</>
                        ) : (
                          <>{Number(product.discount)}% {t('essential_to_prep.off')}</>
                        )}
                      </div>
                    )}

                    <div className="relative overflow-hidden">
                      <Link to={`/products/${product.category.id}/product-info/${product.variantId}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 sm:h-56 md:h-60 lg:h-64 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                        />
                      </Link>
                      <button
                        onClick={() => handleAddWishlist(product)}
                        className={clsx(
                          "absolute top-2 z-30 p-2 rounded-full transition cursor-pointer",
                          isRTL ? "left-2" : "right-2"
                        )}
                      >
                        <WishListIcon isFavorite={isProductInWishlist(product.variantId)} />
                      </button>
                    </div>

                    <div className="p-4 font-[Expo-arabic] flex flex-col flex-1 gap-2">
                      <h3 className="text-[#025043] text-[16px] font-bold h-12 overflow-hidden -mb-6">
                        {product.name}
                      </h3>

                      <p className="text-xs text-black">
                        SKU: <span className="text-gray-500">{product?.sku}</span>
                      </p>

                      <div className="border-b border-[#025043]/20 my-1"></div>

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#025043] text-[18px] font-bold">
                          {product.final_price} $
                        </span>
                        {product.discount > 0 && (
                          <span className="text-gray-400 text-sm line-through decoration-red-500/50">
                            {product.price} $
                          </span>
                        )}
                      </div>
                      {/* Colors  */}
                      <div className="flex gap-1.5 flex-wrap">
                        <span className="text-[13px] text-gray-400 min-w-10"> {t('filter.color')} </span>
                        {product.available_options?.slice(0, 8).map((option) => (
                          <div
                            key={option.id}
                            title={option.name}
                            className="w-6 h-6 rounded-full border border-gray-400 transition-all duration-200 cursor-default hover:scale-110 hover:shadow-md"
                            style={{ backgroundColor: option.hex }}
                          />
                        ))}
                      </div>

                      {/* Sizes  */}
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[13px] text-gray-400 min-w-10">{t('filter.size')}</span>
                        <div className="flex gap-1 flex-wrap">
                          {sizes.map((size, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-px text-[13px] rounded-full bg-white border border-[#025043]/20 text-[#025043]"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Materials  */}
                      <div className="flex items-center gap-1">
                        <span className="text-[13px] text-gray-400 min-w-10">{t('filter.material')}</span>
                        <div className="flex gap-1 flex-wrap">
                          {materials.map((mat, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-px text-[13px] rounded-full bg-[#025043]/5 border border-[#025043]/20 text-[#025043]"
                            >
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto pt-3 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-[#025043]">
                          <div className="flex items-center gap-1 text-sm">
                            <RatingStars
                              rating={product.rating}
                              onRate={(star) => handleRateProduct(product.variantId, star)}
                            />
                            <span className="text-xs text-gray-500">
                              ({product.reviews_count})
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleAddCartItem(product)}
                          disabled={isLoading}
                          className="w-full bg-[#025043] text-white cursor-pointer text-sm px-4 py-2.5 rounded-full hover:bg-[#01382f] transition-all disabled:opacity-50 active:scale-95 font-bold"
                        >
                          {isLoading ? t('wishlist.adding') : t('wishlist.addToCart')}
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}

            {/* Show More */}
            {visibleCount < filteredProducts.length && filteredProducts.length > 0 && (
              <div className="col-span-full flex justify-center mt-5">
                <button
                  onClick={handleShowMore}
                  className="px-6 py-2 bg-[#025043] text-white rounded-md hover:bg-[#01382f] transition"
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <span className="text-white">{t('essential_to_prep.view_more')}...</span>
                  </div>
                </button>
              </div>
            )}
          </div>


        </div>

        <Drawer isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange}>
          <DrawerContent>
            <>
              <DrawerHeader className="flex flex-col gap-1 text-black font-semibold">
                {isOpen ? t('filters.hide') : t('filters.show')}
              </DrawerHeader>
              <DrawerBody>
                <ProductFilters
                  filters={filters}
                  onChange={toggleFilter}
                  onPriceChange={updatePrice}
                />
              </DrawerBody>
            </>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

export default ShowAllProducts;
