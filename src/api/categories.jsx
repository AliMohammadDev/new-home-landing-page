import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export const useGetCategories = () => {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: ['categories', i18n.language],
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
