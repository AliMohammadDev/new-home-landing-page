import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import ErrorFallback from '../pages/ErrorFallback';
import { lazy } from 'react';
import Loading from '../components/Loading';

// Lazy load all pages
const Home = lazy(() => import('../pages/Home'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const Contact = lazy(() => import('../pages/ContactUs'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const Product = lazy(() => import('../pages/Products'));
const ProductInfo = lazy(() => import('../pages/Products/ProductInfo'));
const Checkouts = lazy(() => import('../pages/Checkouts'));
const Orders = lazy(() => import('../pages/Orders'));
const OrdersInfo = lazy(() => import('../pages/Orders/OrderInfo'));
const ShowAllOrders = lazy(() => import('../pages/Orders/ShowAllOrders'));
const Profile = lazy(() => import('../pages/Profile'));
const Wishlists = lazy(() => import('../pages/Wishlists'));
const ShowAllProducts = lazy(() => import('../pages/Products/ShowAllProducts'));
const Logout = lazy(() => import('../pages/Logout'));
const Carts = lazy(() => import('../pages/Carts'));
const ForgetPassword = lazy(() => import('../pages/Auth/ForgetPassword'));
const ResetPassword = lazy(() => import('../pages/Auth/ResetPassword'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <AboutUs /> },
      { path: 'contact', element: <Contact /> },
      {
        path: 'checkouts',
        children: [
          { index: true, element: <Checkouts /> },
          {
            path: 'orders/:checkoutId',
            children: [
              { index: true, element: <Orders /> },
              {
                path: 'orders-info/:orderId',
                element: <OrdersInfo />,
              },
            ],
          },
        ],
      },
      {
        path: 'wishlists',
        element: <Wishlists />,
      },
      {
        path: 'carts',
        element: <Carts />,
      },
      {
        path: 'my-orders',
        element: <ShowAllOrders />,
      },

      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'products',
        element: <ShowAllProducts />,
      },


      {
        path: 'products/:categoryId',
        children: [
          { index: true, element: <Product /> },
          {
            path: 'product-info/:variantId',
            element: <ProductInfo />,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/forgot-password',
    element: <ForgetPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: 'register',
    element: <Register />,
  },

]);

export default router;
