 /* eslint-disable */ import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Navbar } from './Navbar';
import Moment from 'react-moment';

import { Comment } from './Comment';
import $ from 'jquery';
import Axios from 'axios';
import AuthContext from '../context/auth/authContext';
import {Loading} from './Loading'
import { SmallLoading } from './SmallLoading';

export const Description = props => {
  const authContext = useContext(AuthContext);
  const [loginloading, setLoginLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [signuploading, setSignupLoading] = useState(false);
  const [commentloading, setCommentLoading] = useState(false);
  const [alreadyInUse, setAlreadyInUse] = useState(false);
  const { user } = authContext;
  const { match } = props;
  // const [incomplete, setIncomplete] = useState(false);
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [change, setChange] = useState(false);

  const getPost = async () => {
    const res = await Axios.get(
      'https://unnown.social/post/get_by_id/' + match.params.id
    );
    // console.log(res.data.post);
    setPost(res.data.post);
  };

  const changeHideStatus = async () => {
    try {
      const res = await Axios.post(
        'https://unnown.social/post/hide/' + post._id
      );
      // console.log(res.data);
    } catch (error) {
      // console.log(error);
    }
  };
  const onChange10 = e => {
    e.preventDefault();
    setComment(e.target.value)
  }
  const hidePost = e => {
    e.preventDefault();
    // console.log('hiding');
    changeHideStatus();
    window.location.reload(false);
  };
  const toggle = e => {
    // e.preventDefault();

    setChange(!change);

    // $('#a' + post._id)
    
    //   .toggleClass('active');
  };
  // useEffect(() => {
  //   $('.ed-opts-open').on('click', function() {
  //     $(this)
  //       .next('.ed-options')
  //       .toggleClass('active');
  //     return false;
  //   });
  // }, [])

  const postComment = async () => {

    if(comment.length == 0 || comment.split(' ').join('').length == 0)
    {
      setIncomplete(true);
      setTimeout(() => {
        setIncomplete(false);
      }, 5000)
    }
    else
  {
    let comments = post.comments;
    comments.push({
      date: Date.now(),
      content: comment
    });
    setCommentLoading(true);
    const res = await Axios.post('https://unnown.social/comment/upload', {
      comment: {
        content: comment
      },
      id: post._id
    });
    setCommentLoading(false);
    // console.log(res.data);
    window.location.reload(false);
  }
   
  };
  const onSubmit = e => {
    e.preventDefault();
    postComment();
  };

  const onChange = e => {
    e.preventDefault();
    setComment(e.target.value);
  };
  useEffect(() => {
    // console.log('getting data');
    getPost();
  }, []);

  const [success, setSuccess] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const { setUser, setNew } = authContext;

  const [details, setDetails] = useState({
    username: '',
    password: '',
    username2: '',
    password2: '',
    cpassword: ""
  });
  const { username, password, username2, password2, cpassword } = details;
  const onChange1 = e => {
    e.preventDefault();
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const register = async () => {
    if (username.length == 0 ||    
     username.split(' ').join('').length == 0  ||      
      password.length == 0) {
      setIncomplete(true);
      setTimeout(() => {
        setIncomplete(false);
      }, 5000);
    }
    else if (password != cpassword) {
      setConfirm(true);
      setTimeout(() => {
        setConfirm(false);
      }, 5000);
    }
    else {
      setSignupLoading(true);
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
      }
      else
      {
        if(res.data.message == 'Username already in use')
        {
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
<Fragment style={{backgroundColor: "#030303"}}>

{post ? (
      <Fragment>
      {post.hidden == false ? (
<Fragment>
<div>
        <Navbar></Navbar>
        <div
          className='wrapper'
          style={{ minHeight: '100vh', backgroundColor: '#030303' }}
        >
          {post && (
            <main style={{ backgroundColor: '#030303' }}>
              <div className='main-section'>
                <div className='container'>
                  <div className='main-section-data'>
                    <div className='row'>
                      <div className='col-xl-2 col-lg-2 col-md-2'></div>
                      <div className='col-xl-8 col-lg-8 col-md-8'>
                        <div className='main-ws-sec'>
                          <div
                            className='posts-section'
                            style={{ backgroundColor: '#191919' }}
                          >
                            <div
                              className='post-bar'
                              style={{
                                backgroundColor: '#191919',
                                border: '0px',
                                boxShadow: '0px 0px'
                              }}
                            >
                              <div className='post_topbar'>
                                <div className='usy-dt'>
                                 
                                  <div className='usy-name' style={{

                    marginLeft: '0px'

                                  }}>
                                    <h3
                                      style={{
                                        color: '#FFFFFF',
                                        fontStyle: 'italic',
                    marginLeft: '0px'

                                      }}
                                    >
                                      Anonymous
                                    </h3>
                                    <span>
                                      <h3
                                        style={{
                                          color: '#B2B2B2',
                                          textTransform: 'initial',
                                          fontSize: '0.95rem'
                                        }}
                                      >
                                        @{post.user}
                                      </h3>
                                    </span>
                                  </div>
                                </div>

                                {user && post && (
                                  <Fragment>
                                    {user.username == post.user && (
                                      <div className='ed-opts' style={{

                                      }}>
                                        <button
                                          title
                                          className='ed-opts-open'
                                          onClick={toggle}
                                          style={{backgroundColor: 'transparent', border: '0px'}}
                                        >
                                          <i
                                          onClick={toggle}

                                            class='fas fa-ellipsis-h fa-2x'
                                            style={{ color: 'white' }}
                                          ></i>
                                        </button>
                                        {change && (
                                          <ul
                                          id={'a' + post._id}
                                          className='ed-options active'
                                        >
                                          <li>
                                            <span
                                              href='#'
                                              onClick={hidePost}
                                              title
                                            >
                                              Hide Post
                                            </span>
                                          </li>
                                        </ul>
                                        )}
                                        
                                      </div>
                                    )}
                                  </Fragment>
                                )}
                              </div>

                              <div className='job_descp accountnone'>
                                <div style={{ marginBottom: '5px' }}>
                                  <img
                                    src='/myfiles/clock.png'
                                    style={{ marginTop: '4px' }}
                                    alt=''
                                  />
                                  <span
                                    style={{
                                      color: '#B2B2B2',
                                      marginLeft: '3px',
                                      fontSize: '0.8rem'
                                    }}
                                  >
                                    <Moment from={Date.now()}>
                                      {post.date}
                                    </Moment>
                                  </span>
                                </div>
                                <div className='container' style={{padding: '0px'}}>
                                  <div className='row'>
{post.image.length > 0 && (
  <div className='col-12'>
    <img
      src={
        'https://unnown.social/' + post.image
      }
      style={{
        marginTop: '20px',
        marginBottom: '20px'
      }}
    ></img>
  </div>
)}

                                
<div className='col-12' style={{padding: '0px'}}>
<p 
                                  style={{
                                    fontWeight: '400',
                                    fontSize: '1.2rem',
                                    color: 'white',
                                    marginBottom: '20px'
                                  }}
                                >
                                  {/* <a href='http://gambolthemes.net/workwise-new/index.html#' title>
              view more
            </a> */}
                                  {post.content}
                                </p>
</div>
                                  </div>
                                </div>

                               
                              </div>
                              <div className='job-status-bar'>
                                <ul className='like-com'>
                                  <li>
                                    <a
                                      className='com' style={{color: "#808080"}}
                                    >
                                      <i className='fas fa-comment-alt' />{' '}
                                      Comments {post.comments.length}
                                    </a>
                                  </li>
                                </ul>
                              </div>

                              {post.comments.map(temp => {
                                return <Comment comment1={temp}></Comment>;
                              })}
                            </div>
                          </div>
                          {/*post-bar end*/}
                        </div>
                        {/*posts-section end*/}
                      </div>
                      <div className='col-xl-2 col-lg-2 col-md-2'></div>
                      <div className='container' style={{ marginTop: '50px' }}>
                        <div className='row'>
                        {incomplete && (
                            <Fragment>
<div className="col-md-2"></div>
<div className='col-md-8 '>
  <div
    class='alert alert-secondary '
    style={{ backgroundColor: '#F8D7DA', color: '#721C24' }}
    role='alert'
  >
    Comment cannot be Empty
  </div>
</div>
<div className="col-md-2"></div>

                            </Fragment>
                        
                )}
                          <div className='col-md-2'>
                            {/* <img
                                    src='./myfiles/bg-img4.png'
                                    alt=''
                                  /> */}
                          </div>
                         
                          <div className='col-md-8'>
                            <form>
                              <div className='form-group text-center'>
                                <textarea
                                  type='text'
                                  className='form-control'
                                  value={comment}
                                  onChange={onChange10}
                                  id='inputPassword'
                                  placeholder='Post a comment'
                                  style={{ height: '100px' }}
                                />
                              </div>
                            </form>
                          </div>
                          <div className='col-md-2'></div>
                          <div className='col-md-2'></div>

                          <div className='col-md-8 text-left'>
                            {commentloading ? (
                              <SmallLoading></SmallLoading>
                            ): (
<button
                              type='button'
                              onClick={onSubmit}
                              className='btn '
                              style={{
                                backgroundColor: '#ED3A4E',
                                width: '120px',
                                height: '50px',
                                marginTop: '20px',
                                color: 'white'
                              }}
                            >
                              <div
                                style={{
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: '1.2rem'
                                }}
                              >
                                POST
                              </div>
                            </button>
                            )}
                            
                          </div>
                        </div>
                      </div>
                      {/*main-ws-sec end*/}
                    </div>
                    {/* freelancerbiding */}
                  </div>
                  {/* main-section-data end*/}
                </div>
              </div>
            </main>
          )}
          {/*header end*/}

          {/*footer end*/}
        </div>
      </div>
      <div className='post-popup pst-pj'>
        <div className='post-project'>
          <h3>Login / Register</h3>
          <div className='post-project-fields'>
            <div className='signin-pop'>
              <div className='login-sec'>
                <ul className='sign-control' style={{textAlign: 'center'}}>
                  <li data-tab='tab-1' className='current'>
                    <a
                      title
                    >
                      Sign in
                    </a>
                  </li>
                  <li data-tab='tab-2'>
                    <a
                      title
                    >
                      Sign up
                    </a>
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
                        ): (
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
                          ): (
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
          <a
           title>
            <i className='fas fa-close' />
          </a>
        </div>
        {/*post-project end*/}
      </div>

</Fragment>
      )
    : (
      <Fragment>

<div>
        <Navbar></Navbar>
        <div
          className='wrapper'
          style={{ minHeight: '100vh', backgroundColor: '#030303' }}
        >
          {post && (
            <main style={{ backgroundColor: '#030303' }}>
              <div className='main-section'>
                <div className='container'>
                  <div className='main-section-data'>
                    <div className='row'>
                      <div className='col-xl-2 col-lg-2 col-md-2'></div>
                      <div className='col-xl-8 col-lg-8 col-md-8'>
                        <div className='main-ws-sec'>
                          <div
                            className='posts-section'
                            style={{ backgroundColor: '#191919' }}
                          >
                            <div
                              className='post-bar'
                              style={{
                                backgroundColor: '#191919',
                                border: '0px',
                                boxShadow: '0px 0px'
                              }}
                            >
                              <div className='post_topbar'>
                                <div className='usy-dt'>
                                  
                                  <div className='usy-name' style={{
                    marginLeft: '0px'

                                  }}>
                                    <h3
                                      style={{
                                        color: '#FFFFFF',
                                        fontStyle: 'italic',
                    marginLeft: '0px'

                                      }}
                                    >
                                      Anonymous
                                    </h3>
                                    <span>
                                      <h3
                                        style={{
                                          color: '#B2B2B2',
                                          textTransform: 'initial',
                                          fontSize: '0.95rem'
                                        }}
                                      >
                                        @{post.user}
                                      </h3>
                                    </span>
                                  </div>
                                </div>

                                {user && post && (
                                  <Fragment>
                                    {user.username == post.user && (
                                      <div className='ed-opts' style={{}}>
                                        <button
                                          title
                                          className='ed-opts-open'
                                          onClick={toggle}
                                          style={{backgroundColor: 'transparent', border: '0px'}}

                                        >
                                          <i
                                            class='fas fa-ellipsis-h fa-2x'
                                            style={{ color: 'white' }}
                                          ></i>
                                        </button>
                                        {
                                          change && (
                                            <ul
                                            id={'a' + post._id}
                                            
                                            className='ed-options active'
                                          >
                                            <li>
                                              <span
                                                href='#'
                                                onClick={hidePost}
                                                title
                                              >
                                                Unhide Post
                                              </span>
                                            </li>
                                          </ul>
                                          )
                                        }
                                       
                                      </div>
                                    )}
                                  </Fragment>
                                )}
                              </div>

                              
                              <div
            className='job_descp'
            style={{ marginTop: '20px', textAlign: 'center' }}
          >
            {/* <ul className='job-dt'>
          <li>
            <a href='http://gambolthemes.net/workwise-new/index.html#' title>
              Full Time
            </a>
          </li>
          <li>
            <span>$30 / hr</span>
          </li>
        </ul> */}
            <p
              style={{
                fontWeight: '700',
                fontSize: '1.6rem',
                color: 'white'
              }}
            >
              <i class='fas fa-eye-slash' aria-hidden='true'></i>
              Hidden
              {/* <a href='http://gambolthemes.net/workwise-new/index.html#' title>
            view more
          </a> */}
            </p>
          </div>

                              
                            </div>
                          </div>
                          {/*post-bar end*/}
                        </div>
                        {/*posts-section end*/}
                      </div>

                     
                      {/*main-ws-sec end*/}
                    </div>
                    {/* freelancerbiding */}
                  </div>
                  {/* main-section-data end*/}
                </div>
              </div>
            </main>
          )}
          {/*header end*/}

          {/*footer end*/}
        </div>
      </div>
      <div className='post-popup pst-pj'>
        <div className='post-project'>
          <h3>Login / Register</h3>
          <div className='post-project-fields'>
            <div className='signin-pop'>
              <div className='login-sec'>
                <ul className='sign-control'
                style={{textAlign: 'center'}}
                >
                  <li data-tab='tab-1' className='current'>
                    <a

                      title
                    >
                      Sign in
                    </a>
                  </li>
                  <li data-tab='tab-2'>
                    <a

                      title
                    >
                      Sign up
                    </a>
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
                        <button type='submit' value='submit'>
                          Sign in
                        </button>
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
                          <button type='submit' value='submit'>
                            Get Started
                          </button>
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
          <a 

           title>
            <i className='fas fa-close' />
          </a>
        </div>
        {/*post-project end*/}
      </div>
      </Fragment>
    )
    }
      
    </Fragment>
    ): (
      <Loading></Loading>
    )}
</Fragment>
    
    
  );
};
