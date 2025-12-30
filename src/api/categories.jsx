import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories', localStorage.getItem('lang')],
    queryFn: async () => {
      const lang = localStorage.getItem('lang') || 'en';
      const res = await axios.get('categories', {
        headers: {
          'Accept-Language': lang,
        },
      });
      return res.data.data;
    },
  });
};
