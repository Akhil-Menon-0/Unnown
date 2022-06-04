import { Navbar } from './Navbar';
import './css/custom.css';
/* eslint-disable */ import React, {
  Fragment,
  useState,
  useEffect,
  useContext
} from 'react';
import Axios from 'axios';

import AuthContext from '../context/auth/authContext';
import { SmallLoading } from './SmallLoading';

export const Terms = () => {
  const [loginloading, setLoginLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [signuploading, setSignupLoading] = useState(false);
  let [smallscreen, setsmallscreen] = useState(false);

  const resize = e => {
    if (window.innerWidth <= 767) {
      setsmallscreen(true);
    } else {
      setsmallscreen(false);
    }
  };

  useEffect(() => {
    console.log(window.innerWidth);
    window.addEventListener('resize', resize);
  }, []);
  useEffect(() => {
    console.log('ch');
  }, [smallscreen]);

  const [alreadyInUse, setAlreadyInUse] = useState(false);

  const [success, setSuccess] = useState(false);

  const [incomplete, setIncomplete] = useState(false);

  const [test, setTest] = useState('');

  const [invalid, setInvalid] = useState(false);

  const authContext = useContext(AuthContext);

  const { setUser, user, setNew } = authContext;

  const [details, setDetails] = useState({
    username: '',
    password: '',
    username2: '',
    password2: '',
    cpassword: ''
  });
  const { username, password, username2, password2, cpassword } = details;

  const onChange = e => {
    e.preventDefault();
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const onChange4 = e => {
    e.preventDefault();
    setTest(e.target.files[0]);
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
          // console.log('all set');
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
      } else {
        setInvalid(true);
        setTimeout(() => {
          setInvalid(false);
        }, 5000);
      }
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    // // console.log('submitted');
    register();
  };
  const onSubmit2 = e => {
    e.preventDefault();
    login();
  };
  return (
    <Fragment>
      <div style={{ backgroundColor: '#030303', paddingBottom: '50px' }}>
        <Navbar></Navbar>
        {/*ending of navbar*/}
        <div className='container '>
          <div
            className='text-center'
            style={{ paddingTop: '15vh', backgroundColor: '#030303' }}
          >
            <h1
              className='underline-big'
              style={{ color: 'white', fontSize: '200%', fontWeight: 'bold' }}
            >
              TERMS AND CONDITIONS
            </h1>
            <div>
              <p className='text-main ' style={{ marginTop: '40px' }}>
                These terms and conditions govern the access to and the use of
                UNNOWN services and platforms, through the website. All users
                must comply with the terms and conditions on this page to be
                able to use UNNOWN and its services and platforms.
              </p>

              <h4 className='text-sec'>Public Use</h4>
              <p className='text-main'>
                All users should commit to ethics and values and should refrain
                from insult and abuse of the site.
              </p>

              <h4 className='text-sec'>Non-Registered Users</h4>
              <p className='text-main'>
                Non-registered users are able to access only the parts of the
                Services that are publicly available and do not enjoy all of the
                privileges of being a registered member. Non-registered users
                are, however, still subject to the TC and Privacy Policy.
              </p>

              <h4 className='text-sec'>Denial of Access</h4>
              <p className='text-main'>
                UNNOWN has the right to block any user from accessing the
                website or using it's services in general.
              </p>

              <h4 className='text-sec'>Impersonation</h4>
              <p className='text-main'>
                Impersonation by name or subdomain is not allowed and UNNOWN has
                the right to take adequate actions.
              </p>

              <h4 className='text-sec'>Inactive Accounts</h4>
              <p className='text-main'>
                UNNOWN has the right to remove inactive accounts under the
                duration that UNNOWN sees adequate.
              </p>

              <h4 className='text-sec'>
                Removal and Blocking of Content and Accounts
              </h4>
              <p className='text-main'>
                UNNOWN has the right to block or remove content and accounts for
                any reason it sees adequate. In addition, you acknowledge that
                we have your consent to monitor and block content that we
                consider to be harassing or bullying.
              </p>

              <h4 className='text-sec'>Age</h4>
              <p className='text-main'>
                We require our users to be at least 13 years old to access or
                use any of our platform and services.
              </p>

              <h4 className='text-sec'>Information</h4>
              <p className='text-main'>
                UNNOWN has the right to use the information input by users with
                agreement to the privacy policy
              </p>

              <h4 className='text-sec'>E-mail</h4>
              <p className='text-main'>
                UNNOWN has the right to e-mail users with what UNNOWN sees
                adequate with the option to unsubscribe from notification
                e-mails
              </p>

              <h4 className='text-sec'>
                Modifications of Terms and Conditions
              </h4>
              <p className='text-main'>
                We have the right to modify terms and conditions if needed and
                whenever adequate
              </p>

              <h4 className='text-sec'>Limits of Responsibility</h4>
              <p className='text-main'>
                All communicated content on the website is the responsibility of
                their owners and UNNOWN is not responsible for its content or
                any damage that could result from this content or the use of any
                of the site's services.
              </p>
              <h4 className='text-sec'>Contact Us</h4>
              <p className='text-main'>Contact us at unnown.social@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
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
                        <div className='col-lg-12'>
                          <div
                            class='alert alert-secondary'
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
                      {invalid && (
                        <div className='col-lg-12'>
                          <div
                            class='alert alert-secondary'
                            style={{
                              backgroundColor: '#F8D7DA',
                              color: '#721C24'
                            }}
                            role='alert'
                          >
                            Invalid Credentials
                          </div>
                        </div>
                      )}
                      <div className='col-lg-12 no-pdd'>
                        <div className='sn-field'>
                          <input
                            type='text'
                            name='username2'
                            value={username2}
                            onChange={onChange}
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
                            onChange={onChange}
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
                    <form onSubmit={onSubmit}>
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
                          <div className='col-lg-12 '>
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
                              name='username'
                              value={username}
                              onChange={onChange}
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
                              onChange={onChange}
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
                              onChange={onChange}
                              placeholder='Confirm Password'
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
    </Fragment>
  );
};
