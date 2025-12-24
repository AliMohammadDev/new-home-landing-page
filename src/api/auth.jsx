import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal';


export const useRegister = (onSuccess) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axios.post('register', data);
        return res.data;
      } catch (error) {
        const message =
          error.response?.data?.errors?.email?.[0] ||
          error.response?.data?.message ||
          'Something went wrong';
        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      if (data.token) {
        Cookie().set('token', data.token);
        axios.defaults.headers.common.Authorization =
          'Bearer ' + data.token;
      }
      onSuccess?.(data);
      navigate('/');
    },
  });
};


export const useLogin = (onSuccess) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axios.post('login', data);
        return res.data;
      } catch (error) {
        const message =
          error.response?.data?.errors?.email?.[0] ||
          error.response?.data?.message ||
          'Something went wrong';
        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      Cookie().set('token', data.token);
      axios.defaults.headers.common.Authorization = 'Bearer ' + data.token;
      queryClient.setQueryData(['profile'], data.user);
      onSuccess?.(data);
      navigate('/');
    },
  });
};



export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    enabled: !!Cookie().get('token'),
    retry: 1,
    queryFn: async () => {
      const res = await axios.get('me');
      return res.data.user;
    },
  });
};


export const useEditProfile = (onSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axios.put('profile', data);
        return res.data;
      } catch (error) {
        const message =
          error.response?.data?.errors?.name?.[0] ||
          error.response?.data?.errors?.email?.[0] ||
          error.response?.data?.errors?.password?.[0] ||
          error.response?.data?.message ||
          'Something went wrong';

        throw new Error(message);
      }
    },

    onSuccess: (data) => {
      if (data.user) {
        queryClient.setQueryData(['profile'], data.user);
      }
      onSuccess?.(data);
    },
  });
};


export const useSendMail = () => {
  return useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axios.post('/contact-us', data);
        return res.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || 'Failed to send message'
        );
      }
    },
  });
};



export const useForgotPassword = (onSuccess) => {
  return useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axios.post('forgot-password', data);
        return res.data;
      } catch (error) {
        const message =
          error.response?.data?.errors?.email?.[0] ||
          error.response?.data?.message ||
          'Failed to send reset link';
        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
};


export const useResetPassword = (onSuccess) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axios.post('reset-password', data);
        return res.data;
      } catch (error) {
        const message =
          error.response?.data?.errors?.password?.[0] ||
          error.response?.data?.message ||
          'Failed to reset password';

        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      onSuccess?.(data);
      navigate('/login');
    },
  });
};
