/* eslint-disable */ import React, {
  Fragment,
  useState,
  useEffect,
  useContext
} from 'react';
import { PostCard } from './PostCard';
import { Login } from './Login';
import Axios from 'axios';
import FormData from 'form-data';
import $ from 'jquery';

import { Grid } from './MemoryGrid';
import AuthContext from '../context/auth/authContext';
import { Modal } from './Modal';
import { MyShare } from './MyShare';
import { SmallLoading } from './SmallLoading';
import { Leaderboard } from './Leaderboard';

export const ProfileBody = props => {
  const [loginloading, setLoginLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [signuploading, setSignupLoading] = useState(false);
  const [postloading, setPostLoading] = useState(false);
  const [memloading, setMemLoading] = useState(false);

  const { match, posts, mems, profile, freeze } = props;
  const [alreadyInUse, setAlreadyInUse] = useState(false);
  const [memdesc, setMemdesc] = useState('');
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
  const [description, setDescription] = useState('');

  // const [details2, setDetails2] = useState({
  //   username2: '',
  //   password2: ''
  // });
  const { username, password, username2, password2, cpassword } = details;

  const postMem = async () => {
    if (
      test.length == 0 ||
      memdesc.length == 0 ||
      memdesc.split(' ').join('').length == 0
    ) {
      setIncomplete(true);
      setTimeout(() => {
        setIncomplete(false);
      }, 5000);
    } else {
      const fd = new FormData();
      fd.append('image', test);
      fd.append('content', memdesc);
      fd.append('username', match.params.username);
      setMemLoading(true);
      const res = await Axios.post('https://unnown.social/post/upload', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMemLoading(false);
      // console.log(res.data);
      setSuccess(true);

      window.location.reload(false);
    }
  };
  const onMem = e => {
    e.preventDefault();

    postMem();
  };

  const onChange = e => {
    e.preventDefault();
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const onChange2 = e => {
    e.preventDefault();
    setDescription(e.target.value);
  };
  const onChange3 = e => {
    e.preventDefault();
    setMemdesc(e.target.value);
  };
  const onChange4 = e => {
    e.preventDefault();
    setTest(e.target.files[0]);
  };
  useEffect(() => {
    $('.tab-feed ul li').on('click', function() {
      var tab_id = $(this).attr('data-tab');
      $('.tab-feed ul li').removeClass('active');
      $('.product-feed-tab').removeClass('current');
      $(this).addClass('active animated fadeIn');
      $('#' + tab_id).addClass('current animated fadeIn');
      return false;
    });
    $('.post_project').on('click', function() {
      $('.post-popup.pst-pj').addClass('active');
      $('.wrapper').addClass('overlay');
      return false;
    });
    $('.post-project > a').on('click', function() {
      $('.post-popup.pst-pj').removeClass('active');
      $('.wrapper').removeClass('overlay');
      return false;
    });

    $('.post-project > a').on('click', function() {
      $('.mem-popup.mst-pj').removeClass('active');
      $('.wrapper').removeClass('overlay');
      return false;
    });

    $('.post_mem').on('click', function() {
      $('.mem-popup.mst-pj').addClass('active');
      $('.wrapper').addClass('overlay');
      return false;
    });

    //  ============= POST JOB POPUP FUNCTION =========

    $('.post-jb').on('click', function() {
      $('.post-popup.job_post').addClass('active');
      $('.wrapper').addClass('overlay');
      return false;
    });
    $('.post-project > a').on('click', function() {
      $('.post-popup.job_post').removeClass('active');
      $('.wrapper').removeClass('overlay');
      return false;
    });
  }, []);

  const addPost = async () => {
    if (
      description.length == 0 ||
      description.split(' ').join('').length == 0
    ) {
      setIncomplete(true);

      setTimeout(() => {
        setIncomplete(false);
      }, 5000);
    } else {
      setPostLoading(true);
      const res = await Axios.post('https://unnown.social/post/upload', {
        content: description,
        username: match.params.username
      });
      setPostLoading(false);
      // console.log(res.data);
      setSuccess(true);
      window.location.reload(false);
    }
  };

  const onSubmit3 = e => {
    e.preventDefault();
    addPost();
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
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
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
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
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
      <main style={{ backgroundColor: '#030303' }}>
        <div className='main-section'>
          <div className='container'>
            <div className='main-section-data'>
              <div className='row'>
                <div className='col-lg-3 col-md-4 pd-left-none no-pd'>
                  <div className='main-left-sidebar no-margin'>
                    <div
                      className='user-data full-width'
                      style={{ border: '0px' }}
                    >
                      <div
                        className='user-profile'
                        style={{ backgroundColor: '#191A1A' }}
                      >
                        <div
                          className='username-dt'
                          style={{ backgroundColor: '#ED3A4E' }}
                        >
                          <div className='usr-pic'>
                            {profile.image.length > 0 ? (
                              <img
                                src={'https://unnown.social/' + profile.image}
                                alt=''
                                style={{
                                  backgroundColor: '#191919',
                                  width: '105px',
                                  height: '105px'
                                }}
                              />
                            ) : (
                              <img
                                src='/myfiles/user-pic.png'
                                style={{
                                  backgroundColor: '#191919',
                                  width: '105px',
                                  height: '105px'
                                }}
                                alt=''
                              />
                            )}
                          </div>
                        </div>
                        {/*username-dt end*/}
                        <div className='user-specs'>
                          <h3
                            style={{ color: '#FFFFFF', textTransform: 'none' }}
                          >
                            {profile.username}
                          </h3>
                          {/* <span>Graphic Designer at Self Employed</span> */}
                        </div>
                      </div>
                      {/*user-profile end*/}
                      <ul
                        className='user-fw-status'
                        style={{ backgroundColor: '#191A1A' }}
                      >
                        <li>
                          <h4 style={{ color: '#FFFFFF' }}>Visits</h4>
                          <span style={{ color: '#FFFFFF' }}>
                            {profile.views}
                          </span>
                        </li>

                        <li>
                          <Modal profile={profile}></Modal>
                        </li>

                        {/* <li>
                          <a
                            href='http://gambolthemes.net/workwise-new/my-profile.html'
                            title
                          >
                            View Profile
                          </a>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                  <Leaderboard></Leaderboard>

                  {/*main-left-sidebar end*/}
                </div>

                <div className='col-lg-6 col-md-8 no-pd'>
                  <div className='main-ws-sec'>
                    <div
                      className='post-topbar'
                      style={{ backgroundColor: '#191919', border: '0px' }}
                    >
                      {!freeze ? (
                        <Fragment>
                          <div className='user-picy'>
                            <img src='./myfiles/user-pic.png' alt='' />
                          </div>
                          <div className='post-st'>
                            <ul>
                              <li>
                                <a className='post_mem' title>
                                  Upload a Memory
                                </a>
                              </li>
                              <li>
                                <a className='post-jb active' title>
                                  Bottle a Message
                                </a>
                              </li>
                            </ul>
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <div style={{ textAlign: 'center' }}>
                            <i
                              class='fas fa-lock'
                              style={{ fontSize: '1.8rem', color: 'white' }}
                            ></i>
                          </div>
                          <div
                            style={{ textAlign: 'center', marginTop: '20px' }}
                          >
                            <span style={{ color: 'white' }}>
                              Account Freezed by Profile Admin
                            </span>
                          </div>
                        </Fragment>
                      )}

                      {/*post-st end*/}
                    </div>

                    {/*post-topbar end*/}
                    <div className='tab-feed'>
                      <ul style={{ textAlign: 'center' }}>
                        <li
                          data-tab='feed-dd'
                          className='active animated fadeIn'
                        >
                          {/* <a href='#' title> */}
                          {/* <img
                            src='/myfiles/ic3.png'
                            alt=''
                          /> */}
                          <span
                            style={{
                              fontSize: '1.3rem',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            Bottled
                          </span>
                          {/* </a> */}
                        </li>

                        <li data-tab='portfolio-dd' className=''>
                          {/* <a href='#' title> */}
                          {/* <img
                            src='/myfiles/ic1.png'
                            alt=''
                          /> */}
                          <span
                            style={{
                              fontSize: '1.3rem',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            Captured
                          </span>
                          {/* </a> */}
                        </li>
                      </ul>
                    </div>
                    <div
                      className='product-feed-tab current animated fadeIn'
                      id='feed-dd'
                    >
                      {/* <div className='posts-section'></div> */}
                      <div className='posts-section'>
                        {posts.length > 0 ? (
                          posts.map(post => {
                            return <PostCard post={post}></PostCard>;
                          })
                        ) : (
                          <Fragment>
                            <div
                              className='row'
                              style={{ justifyContent: 'center' }}
                            >
                              <img src='/myfiles/noposts.png'></img>
                              <div
                                style={{
                                  textAlign: 'center',
                                  fontSize: '2.5rem',
                                  fontWeight: '500',
                                  color: 'white'
                                }}
                              >
                                <span>No Posts Yet</span>
                              </div>
                              <div className='text-center'>
                                <div className='post-st'>
                                  <ul>
                                    <li>
                                      <a
                                        className='post-jb active'
                                        style={{
                                          marginTop: '20px',
                                          fontSize: '1.5rem'
                                        }}
                                        title
                                      >
                                        Bottle a Message
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </Fragment>
                        )}

                        {/*post-bar end*/}

                        {/*top-profiles end*/}

                        {/*post-bar end*/}

                        {/*posty end*/}

                        {/*process-comm end*/}
                      </div>
                    </div>
                    <div
                      className='product-feed-tab animated fadeIn'
                      id='portfolio-dd'
                      style={{ backgroundColor: '#030303' }}
                    >
                      <div
                        className='portfolio-gallery-sec'
                        style={{ backgroundColor: '#030303', border: '0px' }}
                      >
                        <Grid mems={mems}></Grid>
                      </div>
                    </div>
                    {/*posts-section end*/}
                  </div>
                  {/*main-ws-sec end*/}
                </div>
                <div className='col-lg-3 pd-right-none no-pd'>
                  <div className='right-sidebar'>
                    <div
                      className='widget widget-about'
                      style={{
                        backgroundColor: '#191919',
                        border: '0px',
                        boxShadow: 'none',
                        paddingTop: '30px'
                      }}
                    >
                      <h3 style={{ color: 'white', fontSize: '1.8rem' }}>
                        Share Your Own Profile
                      </h3>

                      {user ? (
                        <MyShare></MyShare>
                      ) : (
                        <button
                          type='button'
                          // onClick={onOpenModal}
                          className='btn tc post_project '
                          style={{
                            backgroundColor: '#ED3A4E',
                            width: '200px',
                            height: '60px',
                            marginTop: '20px',
                            color: 'white',
                            marginBottom: '30px'
                          }}
                        >
                          <div
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: '1.4rem'
                            }}
                          >
                            Login/Register
                            {/* <span> */}
                            <i
                              class='fas fa-user'
                              style={{ marginLeft: '10px', color: 'white' }}
                              aria-hidden='true'
                            ></i>
                            {/* </span> */}
                          </div>
                        </button>
                      )}
                    </div>
                    {/*widget-about end*/}

                    {/*widget-jobs end*/}

                    {/*widget-jobs end*/}
                  </div>
                  {/*right-sidebar end*/}
                </div>
              </div>
            </div>
            {/* main-section-data end*/}
          </div>
        </div>
      </main>
      <div className='mem-popup mst-pj'>
        <div className='post-project'>
          <h3>Upload a Memory</h3>
          <div className='post-project-fields'>
            <form onSubmit={onMem}>
              <div className='row'>
                {success && (
                  <div className='col-lg-12'>
                    <div
                      class='alert alert-secondary'
                      style={{ backgroundColor: '#D4EDDA', color: '#3A6F41' }}
                      role='alert'
                    >
                      Memory Successfully Posted
                    </div>
                  </div>
                )}

                {incomplete && (
                  <div className='col-lg-12 '>
                    <div
                      class='alert alert-secondary '
                      style={{ backgroundColor: '#F8D7DA', color: '#721C24' }}
                      role='alert'
                    >
                      Please Enter All the fields
                    </div>
                  </div>
                )}

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
                      onChange={onChange4}
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
                <div className='col-lg-12 text-center'>
                  <textarea
                    name='memdesc'
                    value={memdesc}
                    onChange={onChange3}
                    placeholder='Things end, but Memories last forever.'
                    defaultValue={''}
                  />
                </div>
                {/* <div className='col-lg-12 text-center'>
                </div> */}

                <div className='col-lg-12'>
                  <ul>
                    <li>
                      {memloading ? (
                        <SmallLoading></SmallLoading>
                      ) : (
                        <button className='active' type='submit' value='post'>
                          Upload
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
          <a title>
            <i className='fas fa-close' />
          </a>
        </div>
        {/*post-project end*/}
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
      {/*post-project-popup end*/}
      <div className='post-popup job_post'>
        <div className='post-project'>
          <h3>Bottle a Message</h3>
          <div className='post-project-fields'>
            <form onSubmit={onSubmit3}>
              <div className='row'>
                {success && (
                  <div className='col-lg-12'>
                    <div
                      class='alert alert-secondary'
                      style={{ backgroundColor: '#D4EDDA', color: '#3A6F41' }}
                      role='alert'
                    >
                      Post Successfully Added
                    </div>
                  </div>
                )}
                {incomplete && (
                  <div className='col-lg-12 '>
                    <div
                      class='alert alert-secondary '
                      style={{ backgroundColor: '#F8D7DA', color: '#721C24' }}
                      role='alert'
                    >
                      Please Enter All the fields
                    </div>
                  </div>
                )}

                <div className='col-lg-12'>
                  <textarea
                    name='description'
                    value={description}
                    onChange={onChange2}
                    placeholder="Take a DEEP breath, they won't know who you are."
                    defaultValue={''}
                  />
                </div>

                <div className='col-lg-12'>
                  <ul>
                    <li>
                      {postloading ? (
                        <SmallLoading></SmallLoading>
                      ) : (
                        <button className='active' type='submit' value='post'>
                          Post
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
          {/*post-project-fields end*/}
          <a title>
            <i className='fas fa-close' style={{ color: 'white' }} />
          </a>
        </div>
        {/*post-project end*/}
      </div>
      {/*post-project-popup end*/}
    </Fragment>
  );
};
