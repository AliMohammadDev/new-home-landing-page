import { Accordion, AccordionItem } from '@heroui/accordion';
import { Checkbox } from '@heroui/react';
import { useLocation } from 'react-router-dom';
import { useGetCategories } from '../../api/categories';

const ProductFilters = ({ filters, onChange, onPriceChange }) => {
  const location = useLocation();

  const { data: categories = [] } = useGetCategories();
  return (
    <Accordion>
      {location.pathname === "/products" && (
        <AccordionItem key="1" aria-label="Categories" title="Categories">
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
      <AccordionItem key="2" aria-label="Size" title="Size">
        <ul className="space-y-1">
          <li>
            <Checkbox
              isSelected={filters.sizes.includes('Small')}
              onChange={() => onChange('sizes', 'Small')}
            />
            Small

          </li>
          <li>
            <Checkbox
              isSelected={filters.sizes.includes('Medium')}
              onChange={() => onChange('sizes', 'Medium')}
            />
            Medium
          </li>
          <li>
            <Checkbox
              isSelected={filters.sizes.includes('Large')}
              onChange={() => onChange('sizes', 'Large')}
            />
            Large
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem key="3" aria-label="Color" title="Color">
        <div className="flex flex-wrap gap-2">
          {[
            { color: "bg-gray-800", label: "Black" },
            { color: "bg-red-600", label: "Red" },
            { color: "bg-green-600", label: "Green" },
            { color: "bg-yellow-400", label: "Yellow" },
            { color: "bg-purple-600", label: "Purple" },
            { color: "bg-pink-500", label: "Pink" },
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

              <span className="text-xs text-gray-800">{c.label}</span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem key="4" aria-label="Price" title="Price">
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-700">
            <span>{filters.price.min} $</span>
            <span>{filters.price.max} $</span>
          </div>

          {/* Min price */}
          <input
            type="range"
            min="100"
            max="1000000"
            step="100"
            value={filters.price.min}
            onChange={(e) => onPriceChange('min', e.target.value)}
            className="w-full accent-[#025043]"
          />

          {/* Max price */}
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



      <AccordionItem key="5" aria-label="Material" title="Material">
        <ul className="space-y-1">
          <li>
            {/* <Checkbox label="Ceramic" /> Ceramic */}
            <Checkbox
              isSelected={filters.materials.includes('Ceramic')}
              onChange={() => onChange('materials', 'Ceramic')}
            />
            Ceramic

          </li>
          <li>
            {/* <Checkbox label="Glass" /> Glass */}
            <Checkbox
              isSelected={filters.materials.includes('Glass')}
              onChange={() => onChange('materials', 'Glass')}
            />
            Glass

          </li>
          <li>
            {/* <Checkbox label="Stainless Steel" /> Stainless Steel */}
            <Checkbox
              isSelected={filters.materials.includes('Stainless Steel')}
              onChange={() => onChange('materials', 'Stainless Steel')}
            />
            Stainless Steel
          </li>
          <li>
            {/* <Checkbox label="Cast Iron" /> Cast Iron */}
            <Checkbox
              isSelected={filters.materials.includes('Cast Iron')}
              onChange={() => onChange('materials', 'Cast Iron')}
            />
            Cast Iron
          </li>
          <li>
            {/* <Checkbox label="Plastic" /> Plastic */}
            <Checkbox
              isSelected={filters.materials.includes('Plastic')}
              onChange={() => onChange('materials', 'Plastic')}
            />
            Plastic
          </li>
          <li>
            {/* <Checkbox label="Wood" /> Wood */}
            <Checkbox
              isSelected={filters.materials.includes('Wood')}
              onChange={() => onChange('materials', 'Wood')}
            />
            Wood
          </li>
        </ul>
      </AccordionItem>

    </Accordion>
  );
};

export default ProductFilters;
