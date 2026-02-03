import { addToast } from '@heroui/react';
import {
  useDecreaseItem,
  useGetAllCartItems,
  useIncreaseItem,
  useRemoveFromCartItem,
  useUpdateCartItem,
} from '../../api/cart';
import CartIcon from '../../assets/icons/CartIcon';
import MinusIcon from '../../assets/icons/MinusIcon';
import PlusIcon from '../../assets/icons/PlusIcon';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import ChevronDownIcon from '../../assets/icons/ChevronDownIcon';
import LeftIcon from '../../assets/icons/LeftIcon';


function Carts() {
  const { t, i18n } = useTranslation();
  const { data: cartItems, isLoading } = useGetAllCartItems();
  const { mutate: increaseItem } = useIncreaseItem();
  const { mutate: decreaseItem } = useDecreaseItem();
  const { mutate: updateItem } = useUpdateCartItem();
  const { mutate: removeItem } = useRemoveFromCartItem();


  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedMaterial, setSelectedMaterial] = useState({});
  const [selectedVariantId, setSelectedVariantId] = useState({});
  const [currentPrice, setCurrentPrice] = useState({});
  const [oldPrice, setOldPrice] = useState({});
  const [selectedPackage, setSelectedPackage] = useState({});

  const isAr = i18n.language === 'ar';

  const items = cartItems?.data || [];


  useEffect(() => {
    if (items.length > 0) {
      const colors = {};
      const sizes = {};
      const materials = {};
      const variants = {};
      const prices = {};
      const oldPrices = {};
      const pkgInfos = {};
      const packages = {};

      items.forEach((item) => {
        const variant = item.product_variant;

        const matchingColor = item.available_options?.find(
          (c) => c.hex === variant.color_code || c.name === variant.color_name
        ) || item.available_options?.[0];

        const matchingSize = matchingColor?.available_sizes?.find(
          (s) => s.name === variant.size
        ) || matchingColor?.available_sizes?.[0];

        const matchingMaterial = matchingSize?.available_materials?.find(
          (m) => m.name === variant.material
        ) || matchingSize?.available_materials?.[0];

        const matchingPackage =
          matchingMaterial?.available_packages?.find(
            (p) => p.id === item.package_info?.package_id
          ) || null;
        packages[item.id] = matchingPackage;

        colors[item.id] = matchingColor;
        sizes[item.id] = matchingSize;
        materials[item.id] = matchingMaterial;
        variants[item.id] = variant.id;

        if (item.type === 'Package') {
          pkgInfos[item.id] = item.package_info;
          prices[item.id] = item.package_info?.package_price;
          oldPrices[item.id] = null;
        } else {
          prices[item.id] = variant.final_price;
          oldPrices[item.id] = variant.price;
        }
      });

      setSelectedColor(colors);
      setSelectedSize(sizes);
      setSelectedMaterial(materials);
      setSelectedVariantId(variants);
      setCurrentPrice(prices);
      setOldPrice(oldPrices);
    }
  }, [items]);



  if (isLoading) {
    return (
      <div className="text-center mt-40 text-white font-[Expo-arabic]">
        {t('cart.loading')}
      </div>
    );
  }

  const computedTotal = cartItems?.cart_total || 0;

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


  const handleColorChange = (itemId, color) => {
    setSelectedColor(prev => ({ ...prev, [itemId]: color }));

    const firstSize = color.available_sizes?.[0];
    if (firstSize) {
      handleSizeChange(itemId, firstSize);
    }
  };

  const handleSizeChange = (itemId, size) => {
    setSelectedSize(prev => ({ ...prev, [itemId]: size }));

    const firstMaterial = size.available_materials?.[0];
    if (firstMaterial) {
      handleMaterialChange(itemId, firstMaterial);
    }
  };


  const handleMaterialChange = (itemId, material) => {
    setSelectedMaterial(prev => ({ ...prev, [itemId]: material }));
    setCurrentPrice(prev => ({ ...prev, [itemId]: material.final_price }));
    updateItem({
      id: itemId,
      data: { product_variant_id: material.variant_id }
    }, {
      onError: (err) => {
        addToast({
          title: t('cart.notice'),
          description: err.message,
          color: 'danger'
        });
      }
    });
  };


  const handlePackageChange = (itemId, pkg, type = 'Package') => {
    setSelectedPackage(prev => ({ ...prev, [itemId]: pkg }));

    updateItem({
      id: itemId,
      data: {
        type: type, // 'Package' أو 'Individual'
        product_variant_package_id: type === 'Package' ? pkg.id : null
      }
    }, {
      onError: (err) => {
        addToast({ title: t('cart.notice'), description: err.message, color: 'danger' });
      }
    });
  };
  return (
    <div
      className="w-full bg-[#025043] min-h-screen px-6 lg:px-24 py-24 font-[Expo-arabic] text-white"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Back Button */}
      <Link
        to={-1}
        className={clsx(
          "absolute top-40 z-50 cursor-pointer hover:opacity-80 transition active:scale-95",
          isAr ? "right-6 lg:right-24" : "left-6 lg:left-24"
        )}
      >
        <LeftIcon className={i18n.language === 'ar' ? 'rotate-180' : ''} />
      </Link>

      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-4 mt-10">
          <CartIcon size={48} color="white" />
        </div>
        <h1 className="text-4xl font-bold tracking-wide">{t('cart.my_cart')}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Cart Items */}
        <div className={clsx(items.length === 0 ? 'lg:col-span-4' : 'lg:col-span-2')}>
          {items.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 ">
              <p className="text-xl text-gray-300 mb-6">{t('cart.empty')}</p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3  active:scale-95 text-sm font-semibold
        bg-white text-[#025043] hover:bg-gray-200 transition rounded-full"
              >
                {t('cart.explore')}
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-sm text-white/70">
                    <th className="text-start py-4 px-2 w-[120px]">{t('cart.product')}</th>
                    <th className="text-center py-4 px-2 min-w-[150px]">{t('filter.name')}</th>
                    <th className="text-center py-4 px-2 min-w-[120px]">{t('filter.color')}</th>
                    <th className="text-center py-4 px-2 min-w-[100px]">{t('filter.size')}</th>
                    <th className="text-center py-4 px-2 min-w-[120px]">{t('filter.material')}</th>
                    <th className="text-center py-4 px-2 min-w-[100px]">{t('cart.price')}</th>
                    <th className="text-center py-4 px-2 min-w-[140px]">{t('cart.quantity')}</th>
                    <th className="text-end py-4 px-2 w-[120px]">{t('cart.count')}</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b last:border-none transition-colors hover:bg-white/5">
                      {/* عمود الصورة */}
                      <td className="py-6 px-2">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleRemoveCartItem(item.id, item.product_variant?.name)}
                            className="text-white/50 cursor-pointer hover:text-red-400 text-sm"
                          >
                            ✕
                          </button>
                          <Link
                            to={`/products/${item.product_variant?.product_id}/product-info/${item.product_variant?.id}`}
                            className="hover:opacity-80 transition-opacity"
                          >
                            <img
                              src={item.image}
                              alt={item.product_variant?.name}
                              className="w-16 h-20 min-w-16 object-cover rounded cursor-pointer"
                            />
                          </Link>
                        </div>
                      </td>

                      <td className="py-6 px-2 text-white font-medium text-center">
                        <div className="flex flex-col items-center gap-1 max-w-[200px] mx-auto">
                          <Link
                            to={`/products/${item.product_variant?.product_id}/product-info/${item.product_variant?.id}`}
                            className="hover:text-[#E2995E] transition-colors cursor-pointer line-clamp-2"
                          >
                            <span>{item.product_variant?.name}</span>
                          </Link>
                          {item.type === 'Package' && (
                            <span className="bg-[#E2995E] text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm whitespace-nowrap">
                              {t('productInfo.package_saving')}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-6 px-2">
                        <div className="flex justify-center">
                          <Dropdown>
                            <DropdownTrigger>
                              <Button variant="bordered"
                                className="w-50 text-white flex justify-between">
                                <span className="flex items-center gap-2 overflow-hidden">
                                  {selectedColor[item.id] && (
                                    <span
                                      className="w-3 h-3 min-w-[12px] rounded-full border border-gray-300"
                                      style={{ backgroundColor: selectedColor[item.id].hex }}
                                    ></span>
                                  )}
                                  <span className="truncate">
                                    {selectedColor[item.id]
                                      ? t(`filter.colors.${selectedColor[item.id].name}`) || selectedColor[item.id].name
                                      : t('filter.color')}
                                  </span>
                                </span>
                                <ChevronDownIcon className="min-w-4" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Select Color">
                              {item.available_options?.map((color) => (
                                <DropdownItem key={color.id} onClick={() => handleColorChange(item.id, color)}>
                                  <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color.hex }}></span>
                                    {t(`filter.colors.${color.name}`) || color.name}
                                  </div>
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </td>

                      <td className="py-6 px-2">
                        <div className="flex justify-center">
                          <Dropdown>
                            <DropdownTrigger>
                              <Button variant="bordered"
                                className="w-30 text-white flex justify-between">
                                {selectedSize[item.id]?.name || t('filter.size')}
                                <ChevronDownIcon />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                              {selectedColor[item.id]?.available_sizes?.map((size) => (
                                <DropdownItem key={size.id} onClick={() => handleSizeChange(item.id, size)}>
                                  {size.name}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </td>

                      <td className="py-6 px-2">
                        <div className="flex justify-center">
                          <Dropdown>
                            <DropdownTrigger>
                              <Button
                                variant="bordered"
                                className="w-35 text-white flex justify-between items-center px-3"
                              >
                                <span className="truncate flex-1 text-start">
                                  {selectedMaterial[item.id]?.name || t('filter.material')}
                                </span>
                                <ChevronDownIcon className="shrink-0 ml-2" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                              {selectedSize[item.id]?.available_materials?.map((mat) => (
                                <DropdownItem
                                  key={mat.id}
                                  onClick={() => handleMaterialChange(item.id, mat)}
                                >
                                  {mat.name}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </td>

                      <td className="py-6 px-2 text-center">
                        <div className="flex flex-col items-center justify-center min-w-[100px]">
                          <span className="text-[#E2995E] font-semibold whitespace-nowrap">
                            {currentPrice[item.id]} $
                          </span>
                          {item.type === 'Package' && (
                            <span className="text-[11px] text-gray-400 mt-0.5 italic">
                              {item.package_info?.quantity_in_package
                                ? `(${item.package_info.quantity_in_package} ${t('cart.pcs')})`
                                : t('cart.package_price')}
                            </span>
                          )}
                          {item.type === 'Individual' && oldPrice[item.id] > currentPrice[item.id] && (
                            <span className="text-xs text-gray-400 line-through">
                              {oldPrice[item.id]} $
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-6 px-2">
                        <div className="flex justify-center">
                          <Dropdown>
                            <DropdownTrigger>
                              <Button
                                variant="bordered"
                                className={clsx(
                                  "min-w-[120px] text-white font-[Expo-arabic] flex justify-between items-center",
                                  item.type === 'Package' ? "border-[#E2995E] text-[#E2995E]" : "border-white/20"
                                )}
                              >
                                <span className="truncate">
                                  {item.type === 'Package' && item.package_info
                                    ? `${item.package_info.quantity_in_package} ${t('cart.pcs')}`
                                    : t('cart.individual')}
                                </span>
                                <ChevronDownIcon />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                              aria-label="Select Package"
                              onAction={(key) => {
                                if (key === 'individual') {
                                  handlePackageChange(item.id, null, 'Individual');
                                } else {
                                  const pkg = selectedMaterial[item.id]?.available_packages?.find(p => p.id === Number(key));
                                  if (pkg) handlePackageChange(item.id, pkg, 'Package');
                                }
                              }}
                            >
                              <DropdownItem key="individual" className="text-black">
                                {t('cart.individual')}
                              </DropdownItem>
                              {(selectedMaterial[item.id]?.available_packages || []).map((pkg) => (
                                <DropdownItem
                                  key={pkg.id}
                                  description={`${pkg.price} $`}
                                  className="text-[#E2995E] font-bold"
                                >
                                  {pkg.quantity} {t('cart.pcs')}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </td>

                      <td className="py-6 px-2">
                        <div className="flex justify-end">
                          <div className="inline-flex items-center bg-white text-[#025043] rounded-2xl px-2 py-1 gap-2">
                            <button onClick={() => decreaseItem(item.id)} className="p-1 bg-[#025043] text-white rounded-lg cursor-pointer">
                              <MinusIcon />
                            </button>
                            <span className="px-2 font-semibold min-w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => {
                                increaseItem(item.id, {
                                  onError: (err) => {
                                    const countMatch = err.message.match(/\d+/);
                                    const count = countMatch ? countMatch[0] : '';
                                    addToast({
                                      title: t('cart.notice'),
                                      description: t('cart.stock_limit_msg', { count }) || err.message,
                                      color: 'danger',
                                      duration: 3000,
                                    });
                                  }
                                });
                              }}
                              className="p-1 bg-[#025043] text-white rounded-lg cursor-pointer"
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
        {items.length > 0 && (<div className="bg-white text-[#025043] rounded-3xl p-8 h-fit shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-center">{t('cart.my_cart')}</h2>
          <div className="flex justify-between mb-4">
            <span>{t('cart.total')}</span>
            <span className="font-semibold">{computedTotal} $</span>
          </div>

          <div className="border-b my-4 border-[#025043]/10"></div>


          <Link to="/checkouts">
            <button className="w-full bg-[#025043] text-white py-3 cursor-pointer rounded-full hover:bg-opacity-90 active:scale-95 transition">
              {t('cart.proceed_checkout')}
            </button>
          </Link>
        </div>)}

      </div>


    </div >
  );
}

export default Carts;