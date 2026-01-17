import { addToast } from '@heroui/react';
import {
  useDecreaseItem,
  useGetAllCartItems,
  useIncreaseItem,
  useRemoveFromCartItem,
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


function Carts() {
  const { t, i18n } = useTranslation();
  const { data: cartItems, isLoading } = useGetAllCartItems();
  const { mutate: increaseItem } = useIncreaseItem();
  const { mutate: decreaseItem } = useDecreaseItem();
  const { mutate: removeItem } = useRemoveFromCartItem();


  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedMaterial, setSelectedMaterial] = useState({});
  const [selectedVariantId, setSelectedVariantId] = useState({});
  const [currentPrice, setCurrentPrice] = useState({});
  const [oldPrice, setOldPrice] = useState({});

  const items = cartItems?.data || [];

  console.log(selectedVariantId);


  useEffect(() => {
    if (items.length > 0) {
      const colors = {};
      const sizes = {};
      const materials = {};
      const variants = {};
      const prices = {};
      const oldPrices = {};

      items.forEach((item) => {
        const firstColor = item.available_options?.[0] || item.product_variant;
        const firstSize = firstColor?.available_sizes?.[0] || item.product_variant;
        const firstMaterial = firstSize?.available_materials?.[0] || item.product_variant;

        colors[item.id] = firstColor;
        sizes[item.id] = firstSize;
        materials[item.id] = firstMaterial;
        variants[item.id] = firstMaterial?.variant_id || item.product_variant?.id;
        prices[item.id] = firstMaterial?.final_price || item.product_variant?.final_price;
        oldPrices[item.id] = firstMaterial?.price || item.product_variant?.price;
      });

      setSelectedColor(colors);
      setSelectedSize(sizes);
      setSelectedMaterial(materials);
      setSelectedVariantId(variants);
      setCurrentPrice(prices);
      setOldPrice(oldPrices);
    }
  }, [items]);



  const isAr = i18n.language === 'ar';

  if (isLoading) {
    return (
      <div className="text-center mt-40 text-white font-[Expo-arabic]">
        {t('cart.loading')}
      </div>
    );
  }


  const computedTotal = items.reduce((acc, item) => {
    const price = currentPrice[item.id] || item.product_variant.final_price;
    return acc + price * item.quantity;
  }, 0);


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

  return (
    <div
      className="w-full bg-[#025043] min-h-screen px-6 lg:px-24 py-24 font-[Expo-arabic] text-white"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-4">
          <CartIcon size={48} color="white" />
        </div>
        <h1 className="text-4xl font-bold tracking-wide">{t('cart.my_cart')}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Cart Items */}
        <div className={clsx(items.length === 0 ? 'lg:col-span-4' : 'lg:col-span-2')}>
          {items.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-xl text-gray-300 mb-6">{t('cart.empty')}</p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold
        bg-white text-[#025043] hover:bg-gray-200 transition rounded-full"
              >
                {t('cart.explore')}
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="text-start py-4 px-2">{t('cart.product')}</th>
                    <th className="text-start py-4 px-2">{t('filter.name')}</th>
                    <th className="text-start py-4 px-2">{t('filter.color')}</th>
                    <th className="text-start py-4 px-2">{t('filter.size')}</th>
                    <th className="text-start py-4 px-2">{t('filter.material')}</th>
                    <th className="text-start py-4 px-2">{t('cart.price')}</th>
                    <th className="text-end py-4 px-2">{t('cart.quantity')}</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b last:border-none">
                      {/* Product Image */}
                      <td className="py-6 px-2">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() =>
                              handleRemoveCartItem(item.id, item.product_variant?.name)
                            }
                            className="text-white/50 cursor-pointer hover:text-red-400 text-sm"
                          >
                            ✕
                          </button>

                          <img
                            src={item.image}
                            alt={item.product_variant?.name}
                            className="w-16 h-20 object-cover rounded"
                          />
                        </div>
                      </td>

                      {/* Name */}
                      <td className="py-6 px-2 text-white font-medium">
                        {item.product_variant?.name}
                      </td>


                      {/* Color */}
                      <td className="py-6 px-2">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              variant="bordered"
                              className="w-full text-white font-[Expo-arabic] flex justify-between items-center"
                            >
                              <span className="flex items-center gap-2">
                                {selectedColor[item.id] && (
                                  <span
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: selectedColor[item.id].hex }}
                                  ></span>
                                )}
                                <span>{selectedColor[item.id]?.name || t('filter.color')}</span>
                              </span>

                              <span className="ml-2">
                                <ChevronDownIcon />
                              </span>
                            </Button>
                          </DropdownTrigger>

                          <DropdownMenu aria-label="Select Color">
                            {item.available_options?.map((color) => (
                              <DropdownItem
                                key={color.id}
                                className="flex items-center gap-2"
                                onClick={() => {
                                  setSelectedColor(prev => ({ ...prev, [item.id]: color }));
                                  const firstSize = color.available_sizes[0];
                                  const firstMaterial = firstSize.available_materials[0];
                                  setSelectedSize(prev => ({ ...prev, [item.id]: firstSize }));
                                  setSelectedMaterial(prev => ({ ...prev, [item.id]: firstMaterial }));
                                  setSelectedVariantId(prev => ({ ...prev, [item.id]: firstMaterial.variant_id }));
                                  setCurrentPrice(prev => ({ ...prev, [item.id]: firstMaterial.final_price }));
                                  setOldPrice(prev => ({ ...prev, [item.id]: firstMaterial.price }));
                                }}
                              >
                                <span className="flex items-center gap-2">
                                  {/* هذي الدائرة الخاصة بكل لون */}
                                  <span
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: color.hex }}
                                  ></span>
                                  <span>{color.name}</span>
                                </span>
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      </td>




                      {/* Size */}
                      <td className="py-6 px-2">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button variant="bordered" className="w-full text-white font-[Expo-arabic]">
                              {selectedSize[item.id]?.name || t('filter.size')}
                              <span className="ml-2"><ChevronDownIcon /></span>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Select Size">
                            {selectedColor[item.id]?.available_sizes?.map((size) => (
                              <DropdownItem
                                key={size.id}
                                onClick={() => {
                                  setSelectedSize(prev => ({ ...prev, [item.id]: size }));
                                  const firstMaterial = size.available_materials[0];
                                  setSelectedMaterial(prev => ({ ...prev, [item.id]: firstMaterial }));
                                  setSelectedVariantId(prev => ({ ...prev, [item.id]: firstMaterial.variant_id }));
                                  setCurrentPrice(prev => ({ ...prev, [item.id]: firstMaterial.final_price }));
                                  setOldPrice(prev => ({ ...prev, [item.id]: firstMaterial.price }));
                                }}
                              >
                                {size.name}
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      </td>

                      {/* Material */}
                      <td className="py-6 px-2">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button variant="bordered" className="w-full text-white font-[Expo-arabic]">
                              {selectedMaterial[item.id]?.name || t('filter.material')}
                              <span className="ml-2"> <ChevronDownIcon /> </span>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Select Material">
                            {selectedSize[item.id]?.available_materials?.map((material) => (
                              <DropdownItem
                                key={material.id}
                                onClick={() => {
                                  setSelectedMaterial(prev => ({ ...prev, [item.id]: material }));
                                  setSelectedVariantId(prev => ({ ...prev, [item.id]: material.variant_id }));
                                  setCurrentPrice(prev => ({ ...prev, [item.id]: material.final_price }));
                                  setOldPrice(prev => ({ ...prev, [item.id]: material.price }));
                                }}
                              >
                                {material.name}
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      </td>



                      {/* Price */}
                      <td className="py-6 px-2">
                        <div className="flex flex-col">
                          <span className="text-[#E2995E] font-semibold">
                            {currentPrice[item.id]} $
                          </span>
                          {oldPrice[item.id] > currentPrice[item.id] && (
                            <span className="text-xs text-gray-400 line-through">
                              {oldPrice[item.id]} $
                            </span>
                          )}
                          <span className="text-xs text-gray-300 mt-1">
                            {t('cart.item_total')}: {currentPrice[item.id] * item.quantity} $
                          </span>
                        </div>
                      </td>


                      {/* Quantity */}
                      <td className="py-6 px-2">
                        <div className="flex justify-end">
                          <div className="inline-flex items-center bg-white text-[#025043] rounded-2xl px-2 py-1 gap-2">
                            <button
                              onClick={() => decreaseItem(item.id)}
                              className="p-1 bg-[#025043] text-white cursor-pointer rounded-xl"
                            >
                              <MinusIcon />
                            </button>
                            <span className="px-2 font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => increaseItem(item.id)}
                              className="p-1 bg-[#025043] text-white cursor-pointer rounded-xl"
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
            <button className="w-full bg-[#025043] text-white py-3 cursor-pointer rounded-full hover:bg-opacity-90 transition">
              {t('cart.proceed_checkout')}
            </button>
          </Link>
        </div>)}

      </div>
    </div >
  );
}

export default Carts;