import { UserSubmitButton } from './UserSubmitButton.jsx';
import UserStore from '../../store/UserStore.js';
import Validator from '../../utility/Validator.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  let navigate = useNavigate();
  let { LoginFormData, LoginFormOnChange, UserLoginRequest } = UserStore();

  const onFormSubmit = async () => {
    if (!Validator.IsEmail(LoginFormData.email)) {
      toast.error('Invalid Email Address!');
    } else {
      let res = await UserLoginRequest(LoginFormData);
      res ? navigate('/') : toast.error('Wrong Credentials!');
    }
  };

  return (
    <div className="container section">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card p-5">
            <h4 className="mb-4 text-center">Enter Your Credentials</h4>
            <input
              value={LoginFormData.email}
              onChange={(e) => {
                LoginFormOnChange('email', e.target.value);
              }}
              placeholder="email"
              type="email"
              className="form-control mb-3"
              autoComplete
            />

            <input
              value={LoginFormData.password}
              onChange={(e) => {
                LoginFormOnChange('password', e.target.value);
              }}
              placeholder="password"
              type="password"
              className="form-control"
            />
            <UserSubmitButton onClick={onFormSubmit} className="btn mt-3 btn-success" text="Login" />
            <div className="mt-4 p-3 bg-light rounded">
              <small className="text-muted">
                <strong>Test Credentials:</strong>
                <br />
                Email: testuser@gmail.com
                <br />
                Password: testuser121
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
