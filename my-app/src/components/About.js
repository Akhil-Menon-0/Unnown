/* eslint-disable */ import React, {
  Fragment,
  useState,
  useEffect,
  useContext
} from 'react';
import './css/custom.css';
// import './css/css.css';
import Axios from 'axios';

import AuthContext from '../context/auth/authContext';

import { Navbar } from './Navbar';
import { SmallLoading } from './SmallLoading';

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}';
  document.body.appendChild(css);
};

export const About = props => {
  let [smallscreen, setsmallscreen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loginloading, setLoginLoading] = useState(false);
  const [signuploading, setSignupLoading] = useState(false);

  const resize = e => {
    if (window.innerWidth <= 767) {
      setsmallscreen(true);
    } else {
      setsmallscreen(false);
    }
  };

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
    cpassword: '',
    username2: '',
    password2: ''
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
        window.location.reload(false);
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
      setLoginLoading(false);
      // console.log(res);
      if (res.data.result == true) {
        setSuccess(true);
        window.location.reload(false);
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

  // useEffect(() => {
  //   console.log(window.innerWidth);
  //   window.addEventListener('resize', resize);
  // }, []);
  // useEffect(() => {
  //   console.log('ch');
  // }, [smallscreen]);

  return (
    <Fragment>
      <div>
        <Navbar></Navbar>
        {/*ending of navbar*/}
        <div className='main-container'>
          <div className='text-center'>
            <img
              src='bottle.png'
              class='chutiya'
              style={{ float: 'none', marginTop: '20px' }}
            ></img>
          </div>
          <div
            className='text-center'
            style={{ paddingTop: '0vh', backgroundColor: '#030303' }}
          >
            <h1
              className='ac-mar-tp specialfont'
              style={{
                fontWeight: 'bold',
                marginTop: '20px',
                fontSize: '77px',
                color: 'white'
              }}
            >
              UnNown
            </h1>
            <p
              className='lead mar-sz typewriter'
              style={{ marginTop: '20px', color: 'white' }}
            >
              Create | Share | Live
            </p>
            {user && (
              <button
                type='button'
                className='btn'
                onClick={e => {
                  e.preventDefault();
                  console.log('clicked');
                  window.location.pathname = '/' + user.username;
                }}
                style={{
                  backgroundColor: '#ED3A4E',
                  width: '200px',
                  height: '60px',
                  marginTop: '100px',
                  color: 'white'
                }}
              >
                <div
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.4rem'
                  }}
                >
                  VIEW PROFILE
                </div>
              </button>
            )}
            {user == null && (
              <button
                type='button'
                className='btn '
                style={{
                  backgroundColor: '#ED3A4E',
                  width: '200px',
                  height: '60px',
                  marginTop: '100px',
                  color: 'white'
                }}
              >
                <div
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.4rem'
                  }}
                  className='tc post_project'
                >
                  GET STARTED
                </div>
              </button>
            )}
          </div>
        </div>
        <section
          className='switchable my-0 feature-large'
          style={{ paddingTop: '190px', backgroundColor: '#030303' }}
        >
          {smallscreen === false ? (
            <div className='container'>
              <div className='row'>
                <div
                  className='col-md-6   col-lg-5 col-xl-6 col-xl-push-6'
                  id='id2'
                >
                  <div className='switchable__text'>
                    <div className='text-block'>
                      <h2
                        className='underline-big'
                        style={{
                          fontWeight: 'bold',
                          marginTop: '20px',
                          fontSize: '2.6rem',
                          color: 'white'
                        }}
                      >
                        Create
                      </h2>
                    </div>
                    <p
                      className='lead'
                      style={{ marginTop: '10px', color: 'white' }}
                    >
                      Create your own catalogue of memories filled with
                      nostalgia. Signup to create your own customized UNNOWN
                      link.
                    </p>
                  </div>
                </div>
                <div
                  className='col-md-6 col-xl-6 col-xl-pull-6'
                  style={{ justifyContent: 'center' }}
                  id='id1'
                >
                  <h1
                    className='center'
                    style={{
                      fontSize: '150%',
                      color: 'white',
                      marginTop: '50px'
                    }}
                  >
                    unnown.social/
                    <a
                      className='typewrite'
                      style={{ color: 'red' }}
                      data-period='300'
                      data-type='[ "TonyStark", "FaizalKhan", "Mogambo", "JohnMcClane" ]'
                    >
                      <span class='wrap'></span>
                    </a>
                  </h1>
                </div>
              </div>
              {/*end of row*/}
            </div>
          ) : (
            /*end of container*/
            <div className='container'></div>
          )}
        </section>
        {/* <div class="container">
                                        <hr>
                                    </div> */}
        <section
          className='switchable my-0 feature-large'
          style={{ paddingTop: '100px', backgroundColor: '#030303' }}
        >
          <div className='container'>
            <div className='row'>
              <div
                className='col-md-6'
                style={{ justifyContent: 'center', textAlign: 'center' }}
              >
                <i
                  className='fas fa-share-alt fa-6x'
                  style={{ color: '#ED3A4E' }}
                ></i>
              </div>
              <div className='col-md-6 col-lg-5'>
                <div className='switchable__text'>
                  <div className='text-block'>
                    <h2
                      className='underline-big'
                      style={{
                        fontWeight: 'bold',
                        marginTop: '20px',
                        fontSize: '2.6rem',
                        color: 'white'
                      }}
                    >
                      Share
                    </h2>
                  </div>
                  <p
                    className='lead'
                    style={{ marginTop: '10px', color: 'white' }}
                  >
                    Share your custom UNNOWN link on various social media
                    platforms. Grab some popcorn while you wait for your friends
                    and family to upload those wonderful memories.
                  </p>
                </div>
              </div>
            </div>
            {/*end of row*/}
          </div>
          {/*end of container*/}
        </section>
        <section
          className='switchable my-0 feature-large'
          style={{
            paddingTop: '100px',
            paddingBottom: '100px',
            backgroundColor: '#030303'
          }}
        >
          {smallscreen === false ? (
            <div className='container'>
              <div className='row'>
                <div
                  className='col-md-6   col-lg-5 col-xl-6 col-xl-push-6'
                  id='id2'
                >
                  <div className='switchable__text'>
                    <div className='text-block'>
                      <h2
                        className='underline-big'
                        style={{
                          fontWeight: 'bold',
                          marginTop: '20px',
                          fontSize: '2.6rem',
                          color: 'white'
                        }}
                      >
                        Live
                      </h2>
                    </div>
                    <p
                      className='lead'
                      style={{ marginTop: '10px', color: 'white' }}
                    >
                      Relive those wonderful memories.
                    </p>
                  </div>
                </div>
                <div
                  className='col-md-6 col-xl-6 col-xl-pull-6'
                  style={{ justifyContent: 'center' }}
                  id='id1'
                ></div>
              </div>
              {/*end of row*/}
            </div>
          ) : (
            /*end of container*/
            <div className='container'></div>
          )}
        </section>

        {/* <div class="container">
                                        <hr>
                                    </div> */}
        {/* <div class="container">
                                        <hr>
                                    </div>
                             */}
        {/* starting of footer */}
        {/*<div class="loader"></div>*/}
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
                      {invalid && (
                        <div className='col-lg-12 '>
                          <div
                            class='alert alert-secondary '
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
                          <div className='col-lg-12'>
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
