/* eslint-disable */ import React, {
  Fragment,
  useEffect,
  useContext,
  useState
} from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import AuthContext from '../context/auth/authContext';
import Axios from 'axios';

export const PostCard = ({ post }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [change, setChange] = useState(false);

  const toggle = e => {
    e.preventDefault();
    setChange(!change);
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
  const hidePost = e => {
    e.preventDefault();
    // console.log('hiding');
    changeHideStatus();
    window.location.reload(false);
  };
  return (
    <Fragment>
      {post && post.hidden == false ? (
        <div
          className='post-bar'
          style={{
            backgroundColor: '#191a1a',
            border: '0px',
            boxShadow: '0px 2px '
          }}
        >
          <div className='post_topbar'>
            {/* <Link to={'/description/' + post._id} style={{ color: 'black' }}> */}
            <div className='usy-dt'>
              <div
                className='usy-name'
                style={{
                  marginLeft: '0px'
                }}
              >
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
            {/* </Link> */}
            <div className='ed-opts' style={{}}>
              <button
                title
                className='ed-opts-open'
                style={{ backgroundColor: 'transparent', border: '0px' }}
                onClick={toggle}
              >
                <i
                  class='fas fa-ellipsis-h fa-2x'
                  style={{ color: 'white' }}
                ></i>
              </button>
              {change && (
                <ul id={post._id} className='ed-options active'>
                  <li>
                    <Link to={'/description/' + post._id}>
                      <span title>View Post</span>
                    </Link>
                  </li>
                  {user && post && (
                    <Fragment>
                      {user.username == post.user && (
                        <li>
                          <span href='#' onClick={hidePost} title>
                            Hide Post
                          </span>
                        </li>
                      )}
                    </Fragment>
                  )}
                </ul>
              )}
            </div>
          </div>
          <Link to={'/description/' + post._id} style={{ color: '#030303' }}>
            <div className='job_descp'>
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
                  <Moment from={Date.now()}>{post.date}</Moment>
                </span>
              </div>

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
                  fontWeight: '400',
                  fontSize: '1.2rem',
                  color: 'white'
                }}
              >
                {post.content}{' '}
                {/* <a href='http://gambolthemes.net/workwise-new/index.html#' title>
              view more
            </a> */}
              </p>
            </div>
            <div className='job-status-bar'>
              <ul className='like-com'>
                {/* <li>
              <a href='http://gambolthemes.net/workwise-new/index.html#'>
                <i className='fas fa-heart' /> Like
              </a>
              <img src='./myfiles/liked-img.png' alt='' />
              <span>25</span>
            </li> */}
                <li>
                  <a href='#' className='com'>
                    <i className='fas fa-comment-alt' /> Comments{' '}
                    {post.comments.length}
                  </a>
                </li>
              </ul>
              {/* <a href='http://gambolthemes.net/workwise-new/index.html#'>
            <i className='fas fa-eye' />
            Views 50
          </a> */}
            </div>
          </Link>
        </div>
      ) : (
        <div
          className='post-bar'
          style={{
            backgroundColor: '#191a1a',
            border: '0px',
            boxShadow: '0px 2px '
          }}
        >
          <div className='post_topbar'>
            {/* <Link to={'/description/' + post._id} style={{ color: 'black' }}> */}
            <div className='usy-dt'>
              <div
                className='usy-name'
                style={{
                  marginLeft: '0px'
                }}
              >
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
            {/* </Link> */}

            {user && post && (
              <Fragment>
                {user.username == post.user && (
                  <div className='ed-opts' style={{}}>
                    <button
                      title
                      className='ed-opts-open'
                      style={{ backgroundColor: 'transparent', border: '0px' }}
                      onClick={toggle}
                    >
                      <i
                        class='fas fa-ellipsis-h fa-2x'
                        style={{ color: 'white' }}
                      ></i>
                    </button>
                    {change && (
                      <ul id={post._id} className='ed-options active'>
                        <li>
                          <span href='#' onClick={hidePost} title>
                            Unhide Post
                          </span>
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </Fragment>
            )}
          </div>

          {/* <Link to={'/description/' + post._id} style={{ color: 'black' }}> */}
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

          {/* </Link> */}
        </div>
      )}
    </Fragment>
  );
};
