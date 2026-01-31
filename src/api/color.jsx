import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetColors = () => {
    return useQuery({
        queryKey: ['colors'],
        queryFn: async () => {
            const res = await axios.get('colors');
            return res.data.data;
        },
    });
};
