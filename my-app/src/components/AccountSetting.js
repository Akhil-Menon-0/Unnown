/* eslint-disable */ import React, {
  Fragment,
  useState,
  useContext
} from 'react';
import Modal from 'react-responsive-modal';
import AuthContext from '../context/auth/authContext';
import Axios from 'axios';
import FormData from 'form-data';

export const AccountSetting = () => {
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [success, setSuccess] = useState(false);
  const [incomplete, setIncomplete] = useState(false);

  const [test, setTest] = useState('');
  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };
  const edit = async () => {
    if (test.length == 0) {
      setIncomplete(true);
      setTimeout(() => {
        setIncomplete(false);
      }, 5000);
    } else {
      const fd = new FormData();
      fd.append('image', test);
      fd.append('id', user._id);

      const res = await Axios.post('https://unnown.social/user/edit', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // console.log(res.data);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    edit();
  };

  const onChange = e => {
    e.preventDefault();
    setTest(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  return (
    <Fragment>
      {user && (
        <Fragment>
          <li>
            <a onClick={onOpenModal} title>
              Account Settings
            </a>

            <Modal
              open={open}
              styles={{ top: '30vh' }}
              center={true}
              showCloseIcon={false}
              onClose={onCloseModal}
              closeOnOverlayClick={true}
            >
              <div className='post-project'>
                <h3>Account Settings</h3>
                <div className='post-project-fields'>
                  <div className='signin-pop'>
                    <div className='login-sec'>
                      <div className='sign_in_sec current' id='tab-1'>
                        <form>
                          <div className='row'>
                            {success && (
                              <div className='col-lg-12'>
                                <div
                                  class='alert alert-secondary'
                                  style={{
                                    backgroundColor: '#D4EDDA',
                                    color: '#3A6F41'
                                  }}
                                  role='alert'
                                >
                                  User Profile Successfully updated
                                </div>
                              </div>
                            )}

                            {incomplete && (
                              <div className='col-lg-12 wow fadeIn'>
                                <div
                                  class='alert alert-secondary wow fadeIn'
                                  style={{
                                    backgroundColor: '#F8D7DA',
                                    color: '#721C24'
                                  }}
                                  role='alert'
                                >
                                  Please Enter All the fields
                                </div>
                              </div>
                            )}
                            <div className='col-lg-12 no-pdd'>
                              <div className='sn-field'>
                                <input type='text' value={user.username} />
                                <i
                                  className='fas fa-user'
                                  style={{ paddingBottom: '18px' }}
                                />
                              </div>
                              {/*sn-field end*/}
                            </div>

                            <div className='col-lg-12 text-center'>
                              <label
                                style={{
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  padding: '15px'
                                }}
                              >
                                <img src='/upload.png'></img>
                                <input
                                  type='file'
                                  accept='image/*'
                                  src='test.jpg'
                                  width='48'
                                  alt='Submit'
                                  onChange={onChange}
                                  height='48'
                                  hidden
                                ></input>
                              </label>
                            </div>
                            {test && (
                              <div
                                className='col-lg-12 text-center'
                                style={{
                                  fontWeight: '500',
                                  color: '#ED3A4E',
                                  marginBottom: '10px'
                                }}
                              >
                                <span>{test.name}</span>
                              </div>
                            )}
                            <div className='col-lg-12 no-pdd'>
                              <div className='checky-sec'>
                                {/* <a href="http://gambolthemes.net/workwise-new/sign-in.html#" title>Forgot Password?</a> */}
                              </div>
                            </div>
                            <div className='col-lg-12 no-pdd'>
                              <ul>
                                <li>
                                  <button
                                    className='active'
                                    onClick={onSubmit}
                                    type='submit'
                                    value='post'
                                  >
                                    Update
                                  </button>
                                </li>
                                <li>
                                  <a onClick={onCloseModal} title>
                                    Done
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/*dff-tab end*/}

                    {/*dff-tab end*/}
                  </div>
                </div>
                {/*post-project-fields end*/}
              </div>
            </Modal>
          </li>
        </Fragment>
      )}
    </Fragment>
  );
};
