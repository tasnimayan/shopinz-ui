import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes, privateSellerRoutes } from './routes';
import { Loading } from './components/Loading.jsx';
import PrivateRoute from './utility/PrivateRoute.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}

          {/* Private Routes, Need authentication */}
          <Route element={<PrivateRoute />}>
            {privateSellerRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
