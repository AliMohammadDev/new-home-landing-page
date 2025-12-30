import { Accordion, AccordionItem } from '@heroui/accordion';
import { Checkbox } from '@heroui/react';
import { useLocation } from 'react-router-dom';
import { useGetCategories } from '../../api/categories';
import { useTranslation } from 'react-i18next';

const ProductFilters = ({ filters, onChange, onPriceChange }) => {
  const location = useLocation();
  const { t } = useTranslation();

  const { data: categories = [] } = useGetCategories();

  return (
    <Accordion>
      {location.pathname === "/products" && (
        <AccordionItem
          key="1"
          aria-label={t('filter.categories')}
          title={t('filter.categories')}
        >
          <ul className="space-y-1">
            {categories.map((category) => (
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

      <AccordionItem
        key="2"
        aria-label={t('filter.size')}
        title={t('filter.size')}
      >
        <ul className="space-y-1">
          <li>
            <Checkbox
              isSelected={filters.sizes.includes('Small')}
              onChange={() => onChange('sizes', 'Small')}
            />
            {t('filter.sizes.small')}
          </li>
          <li>
            <Checkbox
              isSelected={filters.sizes.includes('Medium')}
              onChange={() => onChange('sizes', 'Medium')}
            />
            {t('filter.sizes.medium')}
          </li>
          <li>
            <Checkbox
              isSelected={filters.sizes.includes('Large')}
              onChange={() => onChange('sizes', 'Large')}
            />
            {t('filter.sizes.large')}
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem
        key="3"
        aria-label={t('filter.color')}
        title={t('filter.color')}
      >
        <div className="flex flex-wrap gap-2">
          {[
            { color: "bg-gray-800", label: "Black", key: "black" },
            { color: "bg-red-600", label: "Red", key: "red" },
            { color: "bg-green-600", label: "Green", key: "green" },
            { color: "bg-yellow-400", label: "Yellow", key: "yellow" },
            { color: "bg-purple-600", label: "Purple", key: "purple" },
            { color: "bg-pink-500", label: "Pink", key: "pink" },
          ].map((c, i) => (
            <label
              key={i}
              className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-full border border-gray-200 hover:bg-gray-200 cursor-pointer transition"
            >
              <Checkbox
                size="sm"
                isSelected={filters.colors.includes(c.label)}
                onChange={() => onChange('colors', c.label)}
              />

              <span
                className={`w-3 h-3 rounded-full ${c.color} border border-white shadow-sm`}
              ></span>

              <span className="text-xs text-gray-800">
                {t(`filter.colors.${c.key}`)}
              </span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        key="4"
        aria-label={t('filter.price')}
        title={t('filter.price')}
      >
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-700">
            <span>{filters.price.min} $</span>
            <span>{filters.price.max} $</span>
          </div>

          <input
            type="range"
            min="100"
            max="1000000"
            step="100"
            value={filters.price.min}
            onChange={(e) => onPriceChange('min', e.target.value)}
            className="w-full accent-[#025043]"
          />

          <input
            type="range"
            min="100"
            max="1000000"
            step="100"
            value={filters.price.max}
            onChange={(e) => onPriceChange('max', e.target.value)}
            className="w-full accent-[#025043]"
          />
        </div>
      </AccordionItem>

      <AccordionItem
        key="5"
        aria-label={t('filter.material')}
        title={t('filter.material')}
      >
        <ul className="space-y-1">
          <li>
            <Checkbox
              isSelected={filters.materials.includes('Ceramic')}
              onChange={() => onChange('materials', 'Ceramic')}
            />
            {t('filter.materials.ceramic')}
          </li>
          <li>
            <Checkbox
              isSelected={filters.materials.includes('Glass')}
              onChange={() => onChange('materials', 'Glass')}
            />
            {t('filter.materials.glass')}
          </li>
          <li>
            <Checkbox
              isSelected={filters.materials.includes('Stainless Steel')}
              onChange={() => onChange('materials', 'Stainless Steel')}
            />
            {t('filter.materials.stainless_steel')}
          </li>
          <li>
            <Checkbox
              isSelected={filters.materials.includes('Cast Iron')}
              onChange={() => onChange('materials', 'Cast Iron')}
            />
            {t('filter.materials.cast_iron')}
          </li>
          <li>
            <Checkbox
              isSelected={filters.materials.includes('Plastic')}
              onChange={() => onChange('materials', 'Plastic')}
            />
            {t('filter.materials.plastic')}
          </li>
          <li>
            <Checkbox
              isSelected={filters.materials.includes('Wood')}
              onChange={() => onChange('materials', 'Wood')}
            />
            {t('filter.materials.wood')}
          </li>
        </ul>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductFilters;
