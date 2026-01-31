import FilterIcon from '../../assets/icons/FilterIcon.jsx';
import WishListIcon from '../../assets/icons/WishListIcon.jsx';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { useSubmitReview } from '../../api/reviews.jsx';
import RatingStars from '../../components/RatingStars.jsx';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const Product = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [filters, setFilters] = useState({
    colors: [],
    categories: [],
    sizes: [],
    materials: [],
    price: { min: 0.2, max: 100 },
  });

  const [showFilters, setShowFilters] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);
  const { data: wishlistData } = useGetAllWishlist();
  const { data: user } = useGetProfile();
  const { mutate: addToCart, isLoading } = useAddToCartItem();
  const { mutate: addWishlist } = useAddWishlist();

  const { data: productsData = [] } = useGetProductsVariantsByCategory(categoryId);
  const rawProducts = productsData?.data || productsData || [];

  const productsList = rawProducts.map(v => ({
    ...v.product,
    variantId: v.id,
    image: v.image,
    price: v.price,
    final_price: v.final_price,
    discount: v.discount,
    available_options: v.product?.available_options || [],
    category: v.product?.category,
    color: v.current_color,
    size: v.current_size,
    material: v.current_material,
    stock_quantity: v.stock_quantity,
    rating: Number(v.reviews_avg || 0),
    reviews_count: v.reviews_count,
    sku: v.sku,
  }));

  const category = productsList[0]?.category;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddCartItem = (product) => {
    if (!user) {
      addToast({ title: t('cart.button'), description: t('wishlist.loginRequired'), color: 'warning' });
      navigate('/login');
      return;
    }
    addToCart({ product_variant_id: product.variantId, quantity: 1 }, {
      onSuccess: () => addToast({ title: t('cart.button'), description: t('essential_to_prep.cart_success', { product: product.name }), color: 'success' }),
      onError: () => addToast({ title: t('cart.button'), description: t('essential_to_prep.cart_error', { product: product.name }), color: 'danger' }),
    });
  };

  const handleAddWishlist = (product) => {
    if (!user) {
      addToast({ title: t('wishlist.title'), description: t('wishlist.loginRequired'), color: 'warning' });
      navigate('/login');
      return;
    }
    addWishlist(product.variantId, {
      onSuccess: (res) => {
        const isRemoved = res.status === 'removed';
        addToast({ title: t('wishlist.title'), description: isRemoved ? t('wishlist.removedSuccess') : t('wishlist.addedSuccess'), color: isRemoved ? "warning" : "success" });
      }
    });
  };

  const isProductInWishlist = (id) => wishlistData?.data?.some(item => item.product_variant?.id === id);

  const { mutate: submitReview } = useSubmitReview();
  const handleRateProduct = (variantId, rating) => {
    if (!user) { navigate('/login'); return; }
    submitReview({ product_variant_id: variantId, rating }, {
      onSuccess: (data) => addToast({ title: t('rating.successTitle'), description: `${t('rating.successMessage')} : ${data.rating}`, color: 'success' })
    });
  };

  const updatePrice = (type, value) => setFilters(prev => ({ ...prev, price: { ...prev.price, [type]: Number(value) } }));
  const toggleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value) ? prev[type].filter(v => v !== value) : [...prev[type], value],
    }));
  };

  const filteredProducts = productsList.filter((p) => {
    const matchCategory = filters.categories.length === 0 || filters.categories.includes(p.category.name);
    const matchColor = filters.colors.length === 0 || filters.colors.includes(p.color);
    const matchPrice = Number(p.final_price) >= filters.price.min && Number(p.final_price) <= filters.price.max;
    return matchCategory && matchColor && matchPrice;
  });

  return (
    <div className="bg-[#EDEAE2] min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      {category && (
        <div className="w-full h-[300px] md:h-[900px] overflow-hidden">
          <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="mx-auto px-6 py-10">
        <h1 className={clsx("text-5xl text-black mb-10", isRTL ? "font-[Expo-arabic]" : "font-[Qanduchia]")}>
          {category?.name}
        </h1>

        <button
          className="flex items-center gap-2 bg-[#D9D9D9] text-black px-4 py-2 rounded-lg mb-5 hover:bg-[#cfcfcf] transition"
          onClick={() => isMobile ? onOpen() : setShowFilters(!showFilters)}
        >
          <FilterIcon /> <span className="font-[Expo-arabic]">{t('filters.show')}</span>
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {showFilters && !isMobile && (
            <div className="w-full md:w-1/4 transition-all duration-300">
              <ProductFilters filters={filters} onChange={toggleFilter} onPriceChange={updatePrice} />
            </div>
          )}

          <div className={clsx("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full transition-all duration-300")}>
            {filteredProducts.map((product) => {
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
                <div key={product.variantId} className="relative bg-[#EDEAE2] rounded-xl overflow-hidden border border-[#D8D5CD] flex flex-col group">
                  {product.discount > 0 && (
                    <div className={clsx(
                      "absolute top-3 z-20 px-3 py-1 text-xs font-bold text-white bg-red-600 shadow-lg",
                      isRTL ? "right-0 rounded-l-full font-[Expo-arabic]" : "left-0 rounded-r-full"
                    )}>
                      {isRTL ? <>{t('essential_to_prep.off')} {Number(product.discount)}%</> : <>{Number(product.discount)}% {t('essential_to_prep.off')}</>}
                    </div>
                  )}
                  <div className="relative overflow-hidden">
                    <Link to={`/products/${categoryId}/product-info/${product.variantId}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
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
                  <div className="p-4 flex flex-col flex-1 gap-2">
                    <h3 className="text-[#025043] text-[16px] font-bold h-12 overflow-hidden -mb-6">{product.name}</h3>
                    <p className="text-xs text-black">
                      SKU: <span className="text-gray-500">{product?.sku}</span>
                    </p>

                    <div className="border-b border-[#025043]/20"></div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#025043] text-lg font-bold">{product.final_price} $</span>
                      {product.discount > 0 && (
                        <span className="text-gray-400 text-sm line-through">{product.price} $</span>
                      )}
                    </div>

                    <div className={clsx(
                      "flex flex-col gap-2 mt-1",
                      isRTL ? "items-start text-right" : "items-start text-left"
                    )}>
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold font-[Expo-arabic]">
                        </span>
                      </div>
                      {/* Colors */}
                      <div className="flex gap-1.5 flex-wrap">
                        <span className="text-[9px] text-gray-400 min-w-10">{t('filter.color')}</span>
                        {product.available_options?.slice(0, 8).map((option) => (
                          <div
                            key={option.id}
                            title={option.name}
                            className="w-5 h-5 rounded-full border border-gray-200 transition-all duration-200 cursor-default hover:scale-110 hover:shadow-md"
                            style={{ backgroundColor: option.hex }}
                          />
                        ))}
                      </div>

                      {/* Sizes  */}
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[9px] text-gray-400 min-w-10">{t('filter.size')}</span>
                        <div className="flex gap-1 flex-wrap">
                          {sizes.map((size, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-[1px] text-[9px] rounded-full bg-white border border-[#025043]/20 text-[#025043]"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Materials  */}
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-gray-400 min-w-10">{t('filter.material')}</span>
                        <div className="flex gap-1 flex-wrap">
                          {materials.map((mat, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-[1px] text-[9px] rounded-full bg-[#025043]/5 border border-[#025043]/20 text-[#025043]"
                            >
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-200 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <RatingStars rating={product.rating} onRate={(star) => handleRateProduct(product.variantId, star)} />
                        <span className="text-xs text-gray-400">({product.reviews_count})</span>
                      </div>

                      <button
                        onClick={() => handleAddCartItem(product)}
                        disabled={isLoading}
                        className="w-full bg-[#025043] text-white py-2 cursor-pointer rounded-full text-sm font-bold hover:bg-[#01382f] transition active:scale-95 disabled:opacity-50"
                      >
                        {isLoading ? t('wishlist.adding') : t('wishlist.addToCart')}
                      </button>
                    </div>
                  </div>
                </div>
              )


            })}

          </div>
        </div>
      </div>

      <Drawer isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>Filters</DrawerHeader>
          <DrawerBody><ProductFilters filters={filters} onChange={toggleFilter} onPriceChange={updatePrice} /></DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Product;