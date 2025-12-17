
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetAllReviews = (userId) => {
    return useQuery({
        queryKey: ['reviews', userId],
        queryFn: async () => {
            const res = await axios.get(`/reviews${userId ? `?userId=${userId}` : ''}`);
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
        // onSuccess: (data, variables) => {
        //     addToast({
        //         title: 'Review Added',
        //         description: 'Your review has been submitted successfully!',
        //         color: 'success',
        //         duration: 4000,
        //         isClosable: true,
        //     });
        //     // تحديث الريفيوز بعد الإضافة
        //     queryClient.invalidateQueries(['reviews', variables.userId]);
        // },
        // onError: (error) => {
        //     addToast({
        //         title: 'Review Failed',
        //         description: error.response?.data?.message || error.message,
        //         color: 'error',
        //         duration: 4000,
        //         isClosable: true,
        //     });
        // },
    });
};