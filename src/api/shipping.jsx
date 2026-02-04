import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export const useGetShipping = () => {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: ['shipping', i18n.language],
    queryFn: async () => {
      const lang = localStorage.getItem('lang') || 'en';
      const res = await axios.get('shipping-cities', {
        headers: {
          'Accept-Language': lang,
        },
      });
      return res.data.data;
    },
  });
};
