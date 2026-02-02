import { Accordion, AccordionItem } from '@heroui/accordion';
import { Checkbox, Slider } from '@heroui/react';
import { useLocation } from 'react-router-dom';
import { useGetCategories } from '../../api/categories';
import { useTranslation } from 'react-i18next';
import { useGetColors } from '../../api/color';
import { useGetMaterials } from '../../api/materials';
import { useGetSizes } from '../../api/size';
import clsx from 'clsx';

const ProductFilters = ({ filters, onChange, onPriceChange, onClearAll }) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { data: categories = [] } = useGetCategories();
  const { data: colors = [] } = useGetColors();
  const { data: materials = [] } = useGetMaterials();
  const { data: sizes = [] } = useGetSizes();

  return (
    <>
      <Accordion
        key={i18n.language}
        selectionMode="multiple"
        defaultExpandedKeys={["1", "2", "3", "4", "5"]}
      >
        {location.pathname === "/products" && (
          // category filter
          <AccordionItem
            key="1"
            aria-label={t('filter.categories')}
            title={t('filter.categories')}
            className="font-[Expo-arabic]"
          >
            <ul className="space-y-1 font-[Expo-arabic]">
              {categories.slice(0, 7).map((category) => (
                <li key={category.id} className="flex items-center gap-2">
                  <Checkbox
                    isSelected={filters.categories.includes(category.name)}
                    onChange={() => onChange('categories', category.name)}
                  />
                  {category.name}
                </li>
              ))}
            </ul>
          </AccordionItem>
        )}

        {/* size filter */}
        <AccordionItem key="2" aria-label={t('filter.size')} title={t('filter.size')} className="font-[Expo-arabic]">
          <ul className="space-y-1 font-[Expo-arabic]">
            {sizes?.map((s) => (
              <li key={s.id}>
                <Checkbox
                  isSelected={filters.sizes.includes(s.size)}
                  onChange={() => onChange('sizes', s.size)}
                />
                {s.size}
              </li>
            ))}
          </ul>
        </AccordionItem>

        {/* color price */}
        <AccordionItem
          key="3"
          aria-label={t('filter.color')}
          title={t('filter.color')}
          className="font-[Expo-arabic]"
        >
          <div className="flex flex-wrap gap-2 font-[Expo-arabic]">
            {colors.map((c) => (
              <label
                key={c.id}
                className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-full border border-gray-200 hover:bg-gray-200 cursor-pointer transition"
              >
                <Checkbox
                  size="sm"
                  isSelected={filters.colors.includes(c.color)}
                  onChange={() => onChange('colors', c.color)}
                />

                <span
                  className="w-3 h-3 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: c.hex_code }}
                ></span>

                <span className="text-xs text-gray-800">
                  {t(`filter.colors.${c.color}`) || c.color}
                </span>
              </label>
            ))}
          </div>
        </AccordionItem>


        {/* price filter */}
        <AccordionItem
          key="4"
          aria-label={t('filter.price')}
          title={<span className="text-[14px] font-medium">{t('filter.price')}</span>}
          className="font-[Expo-arabic]"
        >
          <div className="px-1 pt-4 pb-6 flex flex-col gap-4">
            <Slider
              label={t('filter.price_range')}
              step={1}
              size='sm'
              minValue={1}
              maxValue={100}
              defaultValue={[filters.price.min, filters.price.max]}
              value={[filters.price.min, filters.price.max]}
              onChange={(value) => {
                onPriceChange('min', value[0]);
                onPriceChange('max', value[1]);
              }}
              formatOptions={{ style: "currency", currency: "USD" }}
              className="max-w-md"
              classNames={{
                base: "max-w-md",
                filler: "bg-[#025043]",
                thumb: "bg-[#025043] after:bg-[#025043]",
              }}
            />

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-tiny text-default-500">{t('filter.min_price')}</span>
                <div className="px-3 py-1 border rounded-lg text-sm font-semibold">
                  ${filters.price.min}
                </div>
              </div>
              <div className="h-px w-4 bg-default-300 mt-5"></div>
              <div className="flex flex-col gap-1 text-right">
                <span className="text-tiny text-default-500">{t('filter.max_price')}</span>
                <div className="px-3 py-1 border rounded-lg text-sm font-semibold">
                  ${filters.price.max}
                </div>
              </div>
            </div>
          </div>
        </AccordionItem>

        {/* material price */}
        <AccordionItem
          key="5"
          aria-label={t('filter.material')}
          title={t('filter.material')}
          className="font-[Expo-arabic]"
        >
          <ul className="space-y-1 font-[Expo-arabic]">

            {materials?.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                <Checkbox
                  isSelected={filters.materials.includes(item.material)}
                  onChange={() => onChange('materials', item.material)}
                />
                <span className="text-sm">{item.material}</span>
              </li>
            ))}

          </ul>
        </AccordionItem>
      </Accordion>
      <div className="mt-6 ml-5 pt-4 border-t border-[#025043]/10">
        <button
          onClick={onClearAll}
          className={clsx(
            "w-full py-2 rounded-xl flex items-center justify-center gap-2  cursor-pointer transition-all duration-300 group",
            "bg-white border-2 border-gray-100 text-black-600 hover:bg-gray-50 hover:border-gray-200 active:scale-95 shadow-sm"
          )}
        >
          <span className="text-sm font-[Expo-arabic] cursor-pointer uppercase tracking-wider">
            {t('filter.clear_all')}
          </span>
        </button>
      </div>
    </>


  );
};

export default ProductFilters;
