import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserStore from '../../store/userStore.js';
import CartStore from '../../store/cartStore.js';
import './layout.style.css';

export const AppNavBar = () => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { isLogin, UserLogoutRequest } = UserStore();
  const { CartCount, CartListRequest } = CartStore();

  const onLogout = async () => {
    await UserLogoutRequest();
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isLogin()) {
      CartListRequest();
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <>
      {/* Header Bar */}
      <div className="container-fluid text-white p-2 bg-theme">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3 f-12">
            <span>
              <i className="bi bi-envelope" /> support@shopinz.com
            </span>
            <span>
              <i className="bi bi-telephone" /> 01645800408
            </span>
          </div>
          <div className="d-flex gap-3">
            <i className="bi bi-whatsapp bodySmal" />
            <i className="bi bi-youtube bodySmal" />
            <i className="bi bi-facebook bodySmal" />
          </div>
        </div>
      </div>

      <nav className="navbar sticky-top bg-white navbar-expand-lg navbar-light py-3 border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand ms-3" to="/">
            <h2 className="fw-bold font-raleway">
              Shopin<span className="text-warning">Z</span>
            </h2>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navCollapse"
            aria-controls="navCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse d-lg-flex justify-content-between flex-row-reverse" id="navCollapse">
            <div className="d-flex align-items-center">
              <div className="input-group border rounded-2">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  className="form-control border-0 searchbox"
                  type="search"
                  placeholder="Search"
                />
                <Link to={search ? `/products?search=${search}` : '/'} className="btn search">
                  <i className="bi bi-search"></i>
                </Link>
              </div>

              <Link to={isLogin() ? '/cart' : '/login'} className="btn btn-light position-relative ms-2">
                <i className="bi bi-bag text-dark"></i>
                {isLogin() && CartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-theme">
                    {CartCount > 9 ? '9+' : CartCount}
                  </span>
                )}
              </Link>

              <Link to={isLogin() ? '/wish' : '/login'} className="btn btn-light ms-2">
                <i className="bi bi-heart text-dark"></i>
              </Link>

              {isLogin() ? (
                <div className=" position-relative mx-3">
                  <img
                    src="./src/assets/images/profile_placeholder.png"
                    onClick={() => setVisible((v) => !v)}
                    className="border border-2 rounded-circle object-fit-cover border-secondary border-opacity-25"
                    style={{ width: 40, height: 40, cursor: 'pointer' }}
                    alt="User"
                  />

                  {visible ? (
                    <div
                      className="pop-up position-absolute end-0 top-100 mt-1 border py-3 px-4 bg-white rounded"
                      style={{ zIndex: 99 }}
                    >
                      <div className="text-center fs-6" style={{ width: '8rem' }}>
                        <Link to="/profile" className="nav-link">
                          Profile
                        </Link>
                        <hr className="my-1" />
                        <button onClick={onLogout} className="nav-link w-100">
                          Logout
                        </button>
                        <hr className="my-1" />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <>
                  <Link className="ms-3" to="/login">
                    Login
                  </Link>
                  <div className="ms-3">|</div>
                  <Link className="ms-3" to="/register">
                    Register
                  </Link>
                </>
              )}
            </div>

            <ul className="navbar-nav mt-3 mt-lg-0 mb-3 mb-lg-0 ms-lg-3">
              {[
                { path: '/products', label: 'All Products' },
                { path: '/remark/new', label: 'New Arrival' },
                { path: '/men', label: 'Men' },
                { path: '/women', label: 'Women' },
                { path: '/remark/trending', label: 'Trending' },
              ].map(({ path, label }) => (
                <li className="nav-item me-4" key={label}>
                  <Link className="nav-link" to={path}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
