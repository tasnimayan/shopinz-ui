import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { privateSellerRoutes } from './routes';
import PrivateRoute from './utility/Authentication.jsx';
import { Loading } from './components/Loading.jsx';

const App = () => {
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
};
export default App;
