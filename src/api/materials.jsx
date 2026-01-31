import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import axios from 'axios';


export const useGetMaterials = () => {
    const { i18n } = useTranslation();
    return useQuery({
        queryKey: ['materials', i18n.language],
        queryFn: async () => {
            const lang = localStorage.getItem('lang') || 'en';
            const res = await axios.get('materials', {
                headers: {
                    'Accept-Language': lang,
                },
            });
            return res.data.data;
        },
    });
};
