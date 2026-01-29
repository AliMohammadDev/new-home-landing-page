import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

// export const useAddReviews = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (payload) => {
//       const res = await axios.post('/reviews', payload);
//       return res.data.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['variants'] });
//     },
//   });
// };


export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post('/reviews', payload);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sliders-products-variants'] });
      queryClient.invalidateQueries({ queryKey: ['variants'] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['variant'] });
    },
  });
};