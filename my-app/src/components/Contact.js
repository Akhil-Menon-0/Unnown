/* eslint-disable */ import React, {
  Fragment,
  useState,
  useEffect,
  useContext
} from 'react';

import { Navbar } from './Navbar';
import './css/contact.css';
import AuthContext from '../context/auth/authContext';
import Axios from 'axios';
import { SmallLoading } from './SmallLoading';

export const Contact = () => {
  const [loginloading, setLoginLoading] = useState(false);
  const [signuploading, setSignupLoading] = useState(false);
  const [alreadyInUse, setAlreadyInUse] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  const [success, setSuccess] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const { setUser, setNew } = authContext;

  const [details, setDetails] = useState({
    username: '',
    password: '',
    username2: '',
    password2: '',
    cpassword: ''
  });
  const { username, password, username2, password2, cpassword } = details;
  const onChange1 = e => {
    e.preventDefault();
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const register = async () => {
    if (
      username.length == 0 ||
      username.split(' ').join('').length == 0 ||
      password.length == 0
    ) {
      setIncomplete(true);
      setTimeout(() => {
        setIncomplete(false);
      }, 5000);
    } else if (password != cpassword) {
      setConfirm(true);
      setTimeout(() => {
        setConfirm(false);
      }, 5000);
    } else {
      setSignupLoading(true);
      const res = await Axios.post(
        'https://unnown.social/user/signup',
        {
          username,
          password
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setSignupLoading(false);
      // console.log(res);

      if (res.data.result == true) {
        setSuccess(true);
        setNew(true);

        getUser();
      } else {
        if (res.data.message == 'Username already in use') {
          // console.log("all set")
          setAlreadyInUse(true);
          setTimeout(() => {
            setAlreadyInUse(false);
          }, 5000);
        }
      }
    }
  };

  const getUser = async () => {
    try {
      const res = await Axios.get(
        'https://unnown.social/user/get_logged_in_user',
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      // console.log(res);
      setUser(res.data.user);
    } catch (error) {
      // console.log('in error');
      // console.log(error);
    }
  };

  const login = async () => {
    if (username2.length == 0 || password2.length == 0) {
      setIncomplete(true);
      setTimeout(() => {
        setIncomplete(false);
      }, 5000);
    } else {
      setLoginLoading(true);
      const res = await Axios.post(
        'https://unnown.social/user/login',
        {
          username: username2,
          password: password2
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setLoginLoading(false);
      // console.log(res);
      if (res.data.result == true) {
        setSuccess(true);

        getUser();
      }
    }
  };
  const onSubmit1 = e => {
    e.preventDefault();
    // // console.log('submitted');
    register();
  };
  const onSubmit2 = e => {
    e.preventDefault();
    login();
  };
  return (
    <div>
      <Navbar></Navbar>
      <section id='speakers' style={{ minHeight: '100vh' }}>
        <div class='container'>
          <div className='row'>
            {/* <!-- First Row of Speakers --> */}
            {/* <!-- Speaker 1 --> */}

            <div className='col-12' style={{ marginTop: '80px' }}>
              <span style={{ color: 'white', fontSize: '1.2rem' }}>
                Contact Us at:
              </span>
            </div>
            <div className='col-12'>
              <a
                href='mailto:unnown.social@gmail.com'
                style={{ fontSize: '1.5rem' }}
              >
                unnown.social@gmail.com
              </a>
            </div>
          </div>
          <div className='col-12'>
            <h3
              style={{
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                color: 'white',
                marginTop: '70px'
              }}
            >
              Media Partners
            </h3>
          </div>

          <div class='col-md-3' style={{ marginBottom: '30px' }}>
            <a class='member-profile'>
              <div class='unhover_img'>
                <img
                  src='duassassins.jpeg'
                  style={{
                    border: '15px solid white',
                    height: '150px',
                    width: '150px'
                  }}
                  alt=''
                />
              </div>
              <div class='hover_img'>
                <img
                  src='duassassins.jpeg'
                  style={{ color: 'white', height: '150px', width: '150px' }}
                  alt=''
                />
              </div>
              {/* <span style={{ color: 'white' }}></span> */}
              {/* <h4 style={{ color: 'white' }}> */}
              {/* <span style={{ color: 'white' }}></span>DU Assassins */}
              {/* </h4> */}
            </a>
            {/* <ul style={{ marginTop: '10px' }}>
                <li>
                  <a href='tel:9999482734' target='_blank'>
                    <i
                      class='fas fa-phone-square'
                      style={{ color: '#ED3A4E' }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a href='mailto:ritviknagpal48@gmail.com' target='_blank'>
                    <i class='fas fa-envelope' style={{ color: '#ED3A4E' }}></i>
                  </a>
                </li>
              </ul> */}
          </div>

          {/*<!-- End First Row --> */}
          {/* <!-- End Second Row -->	 */}
          <div class='clear'></div>
          {/* <!-- View All Button --> */}
        </div>
      </section>

      <div className='post-popup pst-pj'>
        <div className='post-project'>
          <h3>Login / Register</h3>
          <div className='post-project-fields'>
            <div className='signin-pop'>
              <div className='login-sec'>
                <ul className='sign-control' style={{ textAlign: 'center' }}>
                  <li data-tab='tab-1' className='current'>
                    <a title>Sign in</a>
                  </li>
                  <li data-tab='tab-2'>
                    <a title>Sign up</a>
                  </li>
                </ul>
                <div className='sign_in_sec current' id='tab-1'>
                  <form onSubmit={onSubmit2}>
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
                            Successfully Logged in
                          </div>
                        </div>
                      )}
                      {incomplete && (
                        <div className='col-lg-12 '>
                          <div
                            class='alert alert-secondary '
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
                          <input
                            type='text'
                            name='username2'
                            value={username2}
                            onChange={onChange1}
                            placeholder='Username'
                          />
                          <i
                            className='fas fa-user'
                            style={{ paddingBottom: '18px' }}
                          />
                        </div>
                        {/*sn-field end*/}
                      </div>
                      <div className='col-lg-12 no-pdd'>
                        <div className='sn-field'>
                          <input
                            type='password'
                            name='password2'
                            value={password2}
                            onChange={onChange1}
                            placeholder='Password'
                          />
                          <i
                            className='fas fa-lock'
                            style={{ paddingBottom: '18px' }}
                          />
                        </div>
                      </div>
                      <div className='col-lg-12 no-pdd'>
                        <div className='checky-sec'>
                          {/* <a href="http://gambolthemes.net/workwise-new/sign-in.html#" title>Forgot Password?</a> */}
                        </div>
                      </div>
                      <div className='col-lg-12 no-pdd'>
                        {loginloading ? (
                          <SmallLoading></SmallLoading>
                        ) : (
                          <button type='submit' value='submit'>
                            Sign in
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
                <div className='sign_in_sec' id='tab-2'>
                  <div className='dff-tab current' id='tab-3'>
                    <form onSubmit={onSubmit1}>
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
                              Successfully Registered
                            </div>
                          </div>
                        )}
                        {alreadyInUse && (
                          <div className='col-lg-12'>
                            <div
                              class='alert alert-secondary'
                              style={{
                                backgroundColor: '#F8D7DA',
                                color: '#721C24'
                              }}
                              role='alert'
                            >
                              Username is already in use
                            </div>
                          </div>
                        )}
                        {confirm && (
                          <div className='col-lg-12 '>
                            <div
                              class='alert alert-secondary'
                              style={{
                                backgroundColor: '#F8D7DA',
                                color: '#721C24'
                              }}
                              role='alert'
                            >
                              Password do not match
                            </div>
                          </div>
                        )}
                        {incomplete && (
                          <div className='col-lg-12'>
                            <div
                              class='alert alert-secondary '
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
                            <input
                              type='text'
                              name='username'
                              value={username}
                              onChange={onChange1}
                              placeholder='Username'
                            />
                            <i
                              className='fas fa-user'
                              style={{ paddingBottom: '18px' }}
                            />
                          </div>
                        </div>

                        <div className='col-lg-12 no-pdd'>
                          <div className='sn-field'>
                            <input
                              type='password'
                              name='password'
                              value={password}
                              onChange={onChange1}
                              placeholder='Password'
                            />
                            <i
                              className='fas fa-lock'
                              style={{ paddingBottom: '18px' }}
                            />
                          </div>
                        </div>
                        <div className='col-lg-12 no-pdd'>
                          <div className='sn-field'>
                            <input
                              type='password'
                              name='cpassword'
                              value={cpassword}
                              onChange={onChange1}
                              placeholder='Password'
                            />
                            <i
                              className='fas fa-lock'
                              style={{ paddingBottom: '18px' }}
                            />
                          </div>
                        </div>

                        <div className='col-lg-12 no-pdd'>
                          <span style={{ fontSize: '0.9rem' }}>
                            By clicking Get Started, you agree to our
                            <span> </span>
                            <a
                              href='/termsandconditions'
                              target='__blank'
                              style={{ color: '#ED3A4E' }}
                            >
                              Terms and Conditions.
                            </a>
                          </span>
                        </div>

                        <div className='col-lg-12 no-pdd'>
                          {signuploading ? (
                            <SmallLoading></SmallLoading>
                          ) : (
                            <button type='submit' value='submit'>
                              Get Started
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/*dff-tab end*/}

              {/*dff-tab end*/}
            </div>
          </div>
          {/*post-project-fields end*/}
          <a title>
            <i className='fas fa-close' />
          </a>
        </div>
        {/*post-project end*/}
      </div>
      {/* <!-- //SPEAKERS SECTION -->	 */}

      {/* <!-- Load jQuery --> */}
    </div>
  );
};
