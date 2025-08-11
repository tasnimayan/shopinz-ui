import { Navigate, Outlet } from 'react-router-dom';
import SellerStore from '../store/SellerStore';

// This is to control the authenticated routing. No unauthorized user can use defined routes under this component on MainComponent
const PrivateRoute = () => {
  const { isLogin } = SellerStore();
  const isAuthenticated = isLogin();

  return isAuthenticated ? <Outlet /> : <Navigate to="/seller/login"></Navigate>;
};

export default PrivateRoute;
