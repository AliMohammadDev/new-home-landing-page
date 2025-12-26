import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookie from 'cookie-universal';

const cookies = Cookie();


export const useGetAllOrders = (page = 1) => {
  const cookies = Cookie();

  return useQuery({
    queryKey: ['orders', page],
    enabled: !!cookies.get('token'),
    queryFn: async () => {
      const res = await axios.get('orders', {
        params: { page },
      });
      return res.data;
    },
    retry: 1,
  });
};




export const usePlaceOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ checkout_id, payment_method }) => {
      try {
        const res = await axios.post('orders', {
          checkout_id,
          payment_method,
        });

        return res.data;



      } catch (error) {
        throw new Error(
          error.response?.data?.message || 'Failed to place order'
        );
      }

    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });

      queryClient.removeQueries({ queryKey: ['checkout'] });
    },

  });
};




export const useGetOrder = (orderId) => {

  return useQuery({
    queryKey: ['order', orderId],
    enabled: !!cookies.get('token') && !!orderId,
    queryFn: async () => {
      const res = await axios.get(`orders/${orderId}`);
      return res.data.data;
    },
    retry: 1,
  });
};
