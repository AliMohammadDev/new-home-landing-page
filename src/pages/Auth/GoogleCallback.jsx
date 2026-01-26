// GoogleCallback.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookie from 'cookie-universal';
import axios from 'axios';
import Loading from '../../components/Loading';

const cookies = Cookie();

export default function GoogleCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      cookies.set('token', token);
      axios.defaults.headers.common.Authorization = 'Bearer ' + token;
      navigate('/');
    }
  }, []);

  return <Loading />;
}
