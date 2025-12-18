import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookie from 'cookie-universal';

const cookies = Cookie();

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



export const useGetSlidersProductsVariants = () => {
  return useQuery({
    queryKey: ['sliders-products-variants'],
    queryFn: async () => {
      const res = await axios.get('variants-sliders');
      return res.data;
    },
  });
};


export const useGetProductsVariantsByLimit = (limit = 10) => {
  return useQuery({
    queryKey: ['variants', limit],
    queryFn: async () => {
      const res = await axios.get(`variants-all/${limit}`);
      return res.data.data;
    },
  });
};

export const useGetProductsVariantsByCategory = (categoryName) => {
  return useQuery({
    queryKey: ['variants', categoryName],
    queryFn: async () => {
      const res = await axios.get(`variants-category/${categoryName}`);
      return res.data.data;
    },
    enabled: !!categoryName,
  });
};


export const useGetAllProductsVariants = () => {
  return useQuery({
    queryKey: ['variants', 'all'],
    queryFn: async () => {
      const res = await axios.get('product-variants');
      return res.data.data;
    },
  });
};


export const useGetProductVariant = (product_variant_id) => {

  return useQuery({
    queryKey: ['variant', product_variant_id],
    enabled: !!cookies.get('token') && !!product_variant_id,
    queryFn: async () => {
      const res = await axios.get(`product-variants/${product_variant_id}`);
      return res.data.data;
    },
    retry: 1,
  });
};


