import { lazy } from 'react';

const SellerRegistration = lazy(() => import('./components/seller/SellerRegistration.jsx'));
const AddProduct = lazy(() => import('./components/seller/AddProduct.jsx'));
const Products = lazy(() => import('./components/seller/Products.jsx'));
const LoginForm = lazy(() => import('./components/seller/Login.jsx'));
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const ProductDetails = lazy(() => import('./pages/ProductDetailsPage.jsx'));
const ProductByBrand = lazy(() => import('./pages/ProductByBrand.jsx'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const HowToBuyPage = lazy(() => import('./pages/HowToBuyPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const OtpPage = lazy(() => import('./pages/OtpPage.jsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage.jsx'));
const CartPage = lazy(() => import('./pages/CartPage.jsx'));
const InvoicePage = lazy(() => import('./pages/InvoicePage.jsx'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage.jsx'));
const FAQPage = lazy(() => import('./pages/FAQPage.jsx'));
const ErrorPage = lazy(() => import('./pages/ErrorPage.jsx'));
const ProductsPage = lazy(() => import('./pages/ProductsPage.jsx'));
const OrderStatusPage = lazy(() => import('./pages/OrderStatusPage.jsx'));
const WishPage = lazy(() => import('./pages/WishPage.jsx'));
const RemarkProducts = lazy(() => import('./components/product/RemarkProducts.jsx'));

export const routes = [
  { path: '/', element: <HomePage /> },
  // Auth
  { path: '/register', element: <RegistrationPage /> },
  { path: '/verify', element: <OtpPage /> },
  { path: '/login', element: <LoginPage /> },
  // // User
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
