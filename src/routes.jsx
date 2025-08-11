import React from 'react';

const SellerRegistration = React.lazy(() => import('./components/seller/SellerRegistration.jsx'));
const AddProduct = React.lazy(() => import('./components/seller/AddProduct.jsx'));
const Products = React.lazy(() => import('./components/seller/Products.jsx'));
const LoginForm = React.lazy(() => import('./components/seller/Login.jsx'));
const RemarkProducts = React.lazy(() => import('./components/product/RemarkProducts.jsx'));

const HomePage = React.lazy(() => import('./pages/HomePage.jsx'));
const ProductDetails = React.lazy(() => import('./pages/ProductDetailsPage.jsx'));
const ProductByBrand = React.lazy(() => import('./pages/ProductByBrand.jsx'));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage.jsx'));
const AboutPage = React.lazy(() => import('./pages/AboutPage.jsx'));
const HowToBuyPage = React.lazy(() => import('./pages/HowToBuyPage.jsx'));
const ContactPage = React.lazy(() => import('./pages/ContactPage.jsx'));
const LoginPage = React.lazy(() => import('./pages/LoginPage.jsx'));
const OtpPage = React.lazy(() => import('./pages/OtpPage.jsx'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage.jsx'));
const CartPage = React.lazy(() => import('./pages/CartPage.jsx'));
const InvoicePage = React.lazy(() => import('./pages/InvoicePage.jsx'));
const RegistrationPage = React.lazy(() => import('./pages/RegistrationPage.jsx'));
const FAQPage = React.lazy(() => import('./pages/FAQPage.jsx'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage.jsx'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage.jsx'));
const OrderStatusPage = React.lazy(() => import('./pages/OrderStatusPage.jsx'));
const WishPage = React.lazy(() => import('./pages/WishPage.jsx'));

export const routes = [
  { path: '/', element: <HomePage /> },
  // Auth
  { path: '/register', element: <RegistrationPage /> },
  { path: '/verify', element: <OtpPage /> },
  { path: '/login', element: <LoginPage /> },
  // User
  { path: '/profile', element: <ProfilePage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/invoices', element: <InvoicePage /> },
  { path: '/wish', element: <WishPage /> },

  // Products
  { path: '/by-brand/:id', element: <ProductByBrand /> },
  { path: '/remark/:remark', element: <RemarkProducts /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/men', element: <ProductsPage key="men" categoryId="65da16965bbd2a52c887720d" /> },
  { path: '/women', element: <ProductsPage key="women" categoryId="65da16a65bbd2a52c887720e" /> },
  { path: '/products/:id', element: <ProductDetails /> },

  // Info Pages
  { path: '/about', element: <AboutPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/faq', element: <FAQPage /> },
  { path: '/how-to-buy', element: <HowToBuyPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/orders/status', element: <OrderStatusPage /> },

  // Seller
  { path: '/seller/register', element: <SellerRegistration /> },
  { path: '/seller/login', element: <LoginForm /> },

  // Catch All
  { path: '*', element: <ErrorPage /> },
];

export const privateSellerRoutes = [
  { path: '/seller/add-product', element: <AddProduct /> },
  { path: '/seller/products', element: <Products /> },
];
