import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookie from 'cookie-universal';


export const useGetAllCartItems = () => {
    const cookies = Cookie();

    return useQuery({
        queryKey: ['cart-items'],
        enabled: !!cookies.get('token'),
        queryFn: async () => {
            const res = await axios.get('cart-items');
            return res.data;
        },
        retry: 1,
    });
};


export const useAddToCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            try {
                const res = await axios.post('cart-items', data);
                return res.data;
            } catch (error) {
                throw new Error(
                    error.response?.data?.message || 'Failed to add item to cart'
                );
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart-items']);
        },
    });
};
export const useIncreaseItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            try {
                const res = await axios.patch(`cart-items/${id}/increase`);
                return res.data;
            } catch (error) {
                throw new Error(
                    error.response?.data?.message || 'Failed to increase item'
                );
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart-items']);
        },
    });
};

export const useDecreaseItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            try {
                const res = await axios.patch(`cart-items/${id}/decrease`);
                return res.data;
            } catch (error) {
                throw new Error(
                    error.response?.data?.message || 'Failed to decrease item'
                );
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart-items']);
        },
    });
};

export const useRemoveFromCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            try {
                const res = await axios.delete(`cart-items/${id}`);
                return res.data;
            } catch (error) {
                throw new Error(
                    error.response?.data?.message || 'Failed to remove item'
                );
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart-items']);
        },
    });
};
