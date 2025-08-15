import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

// This is to control the authenticated routing. No unauthorized user can use defined routes under this component on MainComponent
const isLoggedIn = () => {
  return !!Cookies.get('seller');
};

const PrivateRoute = () => {
  const location = useLocation();
  const isAuthenticated = isLoggedIn();

  // If trying to access a protected route while not authenticated
  if (!isAuthenticated && location.pathname !== '/seller/login') {
    return <Navigate to="/seller/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
