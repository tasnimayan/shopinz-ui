import UserStore from '../../store/UserStore.js';
import { ProfileSkeleton } from '../../skeleton/ProfileSkeleton.jsx';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const ProfileForm = () => {
  let { ProfileDetails, ProfileForm, ProfileFormChange, ProfileDetailsRequest, ProfileSaveRequest } = UserStore();

  useEffect(() => {
    (async () => {
      await ProfileDetailsRequest();
    })();
  }, [ProfileDetailsRequest]);

  const Save = async () => {
    let res = await ProfileSaveRequest(ProfileForm);
    if (res) {
      toast.success('Profile Updated');
      await ProfileDetailsRequest();
    }
  };

  if (ProfileDetails === null) {
    return <ProfileSkeleton />;
  } else {
    return (
      <div className="mt-5">
        <div className="card p-5 rounded-3">
          <h5>Customer Details</h5>
          <hr />
          <div className="row mb-4">
            <div className="row mb-4">
              <div className="col-md-4 p-2">
                <label className="form-label" htmlFor="cus_name">
                  Customer Name{' '}
                </label>
                <input
                  value={ProfileForm.cus_name}
                  onChange={(e) => {
                    ProfileFormChange('cus_name', e.target.value);
                  }}
                  type="text"
                  className="form-control "
                />
              </div>
              <div className="col-md-4 p-2">
                <label className="form-label" htmlFor="cus_phone">
                  Customer Phone{' '}
                </label>
                <input
                  value={ProfileForm.cus_phone}
                  onChange={(e) => {
                    ProfileFormChange('cus_phone', e.target.value);
                  }}
                  type="text"
                  className="form-control "
                />
              </div>

              <div className="col-md-4 p-2">
                <label className="form-label" htmlFor="cus_fax">
                  Customer Fax{' '}
                </label>
                <input
                  value={ProfileForm.cus_fax}
                  onChange={(e) => {
                    ProfileFormChange('cus_fax', e.target.value);
                  }}
                  type="text"
                  className="form-control "
                />
              </div>
              <div className="col-md-4 p-2">
                <label className="form-label" htmlFor="cus_country">
                  Customer Country{' '}
                </label>
                <input
                  value={ProfileForm.cus_country}
                  onChange={(e) => {
                    ProfileFormChange('cus_country', e.target.value);
                  }}
                  type="text"
                  className="form-control "
                />
              </div>
              <div className="col-md-4 p-2">
                <label className="form-label" htmlFor="cus_city">
                  Customer City{' '}
                </label>
                <input
                  value={ProfileForm.cus_city}
                  onChange={(e) => {
                    ProfileFormChange('cus_city', e.target.value);
                  }}
                  type="text"
                  className="form-control "
                />
              </div>
              <div className="col-md-4 p-2">
                <label className="form-label" htmlFor="cus_state">
                  Customer State{' '}
                </label>
                <input
                  value={ProfileForm.cus_state}
                  onChange={(e) => {
                    ProfileFormChange('cus_state', e.target.value);
                  }}
                  type="text"
                  className="form-control "
                />
              </div>
              <div className="col-md-4 p-2">
                <label className="form-label" htmlFor="cus_postcode">
                  Customer Post Code{' '}
                </label>
                <input
                  value={ProfileForm.cus_postcode}
                  onChange={(e) => {
                    ProfileFormChange('cus_postcode', e.target.value);
                  }}
                  type="text"
                  className="form-control "
                />
              </div>
              <div className="col-md-4 p-2">
                <label className="form-label" htmlFor="cus_add">
                  Customer Address
                </label>
                <input
                  value={ProfileForm.cus_add}
                  onChange={(e) => {
                    ProfileFormChange('cus_add', e.target.value);
                  }}
                  type="text"
                  className="form-control "
                />
              </div>
            </div>
          </div>

          <h6>Shipping Details</h6>
          <hr />
          <div className="row">
            <div className="col-md-4 p-2">
              <label className="form-label" htmlFor="ship_name">
                Shipping Name{' '}
              </label>
              <input
                value={ProfileForm.ship_name}
                onChange={(e) => {
                  ProfileFormChange('ship_name', e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-4 p-2">
              <label className="form-label" htmlFor="ship_phone">
                Shipping Phone{' '}
              </label>
              <input
                value={ProfileForm.ship_phone}
                onChange={(e) => {
                  ProfileFormChange('ship_phone', e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-4 p-2">
              <label className="form-label" htmlFor="ship_country">
                Shipping Country{' '}
              </label>
              <input
                value={ProfileForm.ship_country}
                onChange={(e) => {
                  ProfileFormChange('ship_country', e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-4 p-2">
              <label className="form-label" htmlFor="ship_city">
                Shipping City{' '}
              </label>
              <input
                value={ProfileForm.ship_city}
                onChange={(e) => {
                  ProfileFormChange('ship_city', e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-4 p-2">
              <label className="form-label" htmlFor="ship_state">
                Shipping State{' '}
              </label>
              <input
                value={ProfileForm.ship_state}
                onChange={(e) => {
                  ProfileFormChange('ship_state', e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-4 p-2">
              <label className="form-label" htmlFor="ship_postcode">
                Shipping Post Code{' '}
              </label>
              <input
                value={ProfileForm.ship_postcode}
                onChange={(e) => {
                  ProfileFormChange('ship_postcode', e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-4 p-2">
              <label className="form-label" htmlFor="ship_add">
                Shipping Address
              </label>
              <input
                value={ProfileForm.ship_add}
                onChange={(e) => {
                  ProfileFormChange('ship_add', e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-3 p-2">
              <button onClick={Save} className="btn btn-success">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
