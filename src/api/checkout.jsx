import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookie from 'cookie-universal';

const cookies = Cookie();

export const useGetAllCheckouts = () => {
  const cookies = Cookie();
  return useQuery({
    queryKey: ['checkouts'],
    enabled: !!cookies.get('token'),
    queryFn: async () => {
      const res = await axios.get('checkouts');
      return res.data;
    },
    retry: 1,
  });
};


export const useAddCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (checkoutData) => {
      try {
        const res = await axios.post('checkouts', checkoutData);
        return res.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || 'Failed to create checkout'
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['checkouts']);
    },
  });
};


export const useUpdateCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      try {
        const res = await axios.patch(`checkouts/${id}`, data);
        return res.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || 'Failed to update checkout'
        );
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['checkout', variables.id]);
      queryClient.invalidateQueries(['checkouts']);
    },
  });
};

export const useGetCheckout = (checkoutId) => {

  return useQuery({
    queryKey: ['checkout', checkoutId],
    enabled: !!cookies.get('token') && !!checkoutId,
    queryFn: async () => {
      const res = await axios.get(`checkouts/${checkoutId}`);
      return res.data.data;
    },
    retry: 1,
  });
};


export const useDeleteCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      try {
        const res = await axios.delete(`checkouts/${id}`);
        return res.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || 'Failed to delete checkout'
        );
      }
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(['checkouts']);
      queryClient.invalidateQueries(['checkout', id]);
    },
  });
};
