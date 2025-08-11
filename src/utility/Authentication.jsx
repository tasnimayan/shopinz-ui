import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

// This is to control the authenticated routing. No unauthorized user can use defined routes under this component on MainComponent
const isLoggedIn = () => {
  return !!Cookies.get('seller');
};

const PrivateRoute = () => {
  const isAuthenticated = isLoggedIn();
  return isAuthenticated ? <Outlet /> : <Navigate to="/seller/login"></Navigate>;
};

export default PrivateRoute;
