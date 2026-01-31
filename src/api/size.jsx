import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetSizes = () => {
    return useQuery({
        queryKey: ['sizes'],
        queryFn: async () => {
            const res = await axios.get('sizes');
            return res.data.data;
        },
    });
};
