import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookie from 'cookie-universal';
import { useTranslation } from 'react-i18next';

export const useGetAllWishlist = (page = 1) => {
  const cookies = Cookie();
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: ['wishlist', page, i18n.language],
    enabled: !!cookies.get('token'),
    queryFn: async () => {
      const res = await axios.get('wishlists', {
        params: { page },
      });
      return res.data;
    },
    keepPreviousData: true,
    retry: 1,
  });
};


export const useAddWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product_variant_id) => {
      try {
        const res = await axios.post('wishlists', {
          product_variant_id,
        });
        return res.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || 'Failed to add item to wishlist'
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist']);
    },
  });
};

export const useRemoveWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      try {
        const res = await axios.delete(`wishlists/${id}`);
        return res.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || 'Failed to remove item from wishlist'
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist']);
    },
  });
};



export const useClearAllWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.delete('wishlist/clear-all');
        return res.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || 'Failed to clear wishlist'
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist']);
    },
  });
};