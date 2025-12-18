import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetAllReviews = (userId) => {
  return useQuery({
    queryKey: ['reviews', userId],
    queryFn: async () => {
      const res = await axios.get(
        `/reviews${userId ? `?userId=${userId}` : ''}`
      );
      return res.data.data;
    },
    retry: 1,
  });
};

export const useAddReviews = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post('/reviews', payload);
      return res.data.data;
    },
  });
};
