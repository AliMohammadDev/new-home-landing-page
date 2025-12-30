import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookie from 'cookie-universal';

// const cookies = Cookie();

// export const useGetSlidersProducts = () => {
//   return useQuery({
//     queryKey: ['sliders-products'],
//     queryFn: async () => {
//       const res = await axios.get('products-sliders');
//       return res.data;
//     },
//   });
// };


// export const useGetProductsByLimit = (limit = 10) => {
//   return useQuery({
//     queryKey: ['products', limit],
//     queryFn: async () => {
//       const res = await axios.get(`products-all/${limit}`);
//       return res.data.data;
//     },
//   });
// };

// export const useGetProductsByCategory = (categoryName) => {
//   return useQuery({
//     queryKey: ['products', categoryName],
//     queryFn: async () => {
//       const res = await axios.get(`products-category/${categoryName}`);
//       return res.data.data;
//     },
//     enabled: !!categoryName,
//   });
// };


// export const useGetAllProducts = () => {
//   return useQuery({
//     queryKey: ['products', 'all'],
//     queryFn: async () => {
//       const res = await axios.get('products');
//       return res.data.data;
//     },
//   });
// };


const getLangHeader = () => {
  const lang = localStorage.getItem('lang') || 'en';
  return { 'Accept-Language': lang };
};

// Sliders Products Variants
export const useGetSlidersProductsVariants = () => {
  const lang = localStorage.getItem('lang') || 'en';
  return useQuery({
    queryKey: ['sliders-products-variants', lang],
    queryFn: async () => {
      const res = await axios.get('variants-sliders', {
        headers: getLangHeader(),
      });
      return res.data;
    },
  });
};

// Products Variants By Limit
export const useGetProductsVariantsByLimit = (limit = 10) => {
  const lang = localStorage.getItem('lang') || 'en';
  return useQuery({
    queryKey: ['variants', limit, lang],
    queryFn: async () => {
      const res = await axios.get(`variants-all/${limit}`, {
        headers: getLangHeader(),
      });
      return res.data.data;
    },
  });
};

// Products Variants By Category
export const useGetProductsVariantsByCategory = (categoryName) => {
  const lang = localStorage.getItem('lang') || 'en';
  return useQuery({
    queryKey: ['variants', categoryName, lang],
    queryFn: async () => {
      const res = await axios.get(`variants-category/${categoryName}`, {
        headers: getLangHeader(),
      });
      return res.data.data;
    },
    enabled: !!categoryName,
  });
};

// All Products Variants
export const useGetAllProductsVariants = () => {
  const lang = localStorage.getItem('lang') || 'en';
  return useQuery({
    queryKey: ['variants', 'all', lang],
    queryFn: async () => {
      const res = await axios.get('product-variants', {
        headers: getLangHeader(),
      });
      return res.data.data;
    },
  });
};

// Single Product Variant
export const useGetProductVariant = (product_variant_id) => {
  const lang = localStorage.getItem('lang') || 'en';
  return useQuery({
    queryKey: ['variant', product_variant_id, lang],
    queryFn: async () => {
      const res = await axios.get(`product-variants/${product_variant_id}`, {
        headers: getLangHeader(),
      });
      return res.data.data;
    },
    retry: 1,
  });
};
