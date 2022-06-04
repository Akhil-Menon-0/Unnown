/* eslint-disable */ import React, {
  Fragment,
  useContext,
  useEffect,
  useState
} from 'react';

/* eslint-disable */ import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Login } from './Login';
import AuthContext from '../context/auth/authContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AccountSetting } from './AccountSetting';

import $ from 'jquery';
import Axios from 'axios';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [freeze, setFreeze] = useState(null);
  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const doLogout = async () => {
    const res = await axios.get('https://unnown.social/user/logout', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    window.location.reload();
  };
  const unfreezeIt = async () => {
    const res = await Axios.post('https://unnown.social/user/unfreeze', {
      username: user.username
    });
    window.location.reload(false);
  };
  const unfreeze = e => {
    e.preventDefault();

    unfreezeIt();
  };
  const freezeKar = async () => {
    const res = await axios.post('https://unnown.social/user/freeze', {
      username: user.username
    });
    // console.log(res.data);
    window.location.reload(false);
  };
  const freezeIt = e => {
    e.preventDefault();
    freezeKar();
  };
  const logout = e => {
    e.preventDefault();
    // console.log('loggin out');
    doLogout();
  };
  useEffect(() => {
    $('.user-info').click(function() {
      $('.user-account-settingss').slideToggle('fast');
      $('#message')
        .not($(this).next('#message'))
        .slideUp();
      $('#notification')
        .not($(this).next('#notification'))
        .slideUp();
      // Animation complete.
    });
  }, []);
  const getFreeze = async () => {
    const res = await Axios.post('https://unnown.social/user/checkfreeze', {
      username: user.username
    });
    console.log(res.data.freeze);
    if (res.data.freeze === true) {
      setFreeze(true);
    }
    if (res.data.freeze === false) {
      setFreeze(false);
    }
  };
  useEffect(() => {
    if (user) {
      getFreeze();
    }
  }, [user]);

  return (
    <Fragment>
      <header style={{ backgroundColor: '#191919' }}>
        <div className='container'>
          <div className='header-data'>
            <div className='d-flex justify-content-between'>
              <div className='' style={{ width: 'fit-content' }}>
                <div
                  className='user-account'
                  style={{ border: '0px', width: '100%' }}
                >
                  <div className='user-info'>
                    {user && user.image.length > 0 ? (
                      <img
                        src={'https://unnown.social/' + user.image}
                        style={{
                          height: '50px',
                          width: '50px',
                          borderRadius: '100%',
                          float: 'left'
                        }}
                        alt=''
                      />
                    ) : (
                      <img
                        src='/myfiles/user.png'
                        style={{
                          float: 'left',
                          height: '50px',
                          width: '50px'
                        }}
                        alt=''
                      />
                    )}
                    <a
                      href='#'
                      title
                      style={{
                        marginTop: '16px',

                        fontWeight: '400',
                        fontSize: '1.1rem'
                      }}
                    >
                      {user ? (
                        <Fragment>{user.username}</Fragment>
                      ) : (
                        <Fragment>Sign In</Fragment>
                      )}
                    </a>
                    {/* <i className='fas fa-sort-down' /> */}
                  </div>
                  <div className='user-account-settingss' id='users'>
                    {/*search_form end*/}
                    <ul className='us-links'>
                      {user && (
                        <Fragment>
                          <li>
                            <a href={'/' + user.username}>
                              <a title>My Profile</a>
                            </a>
                          </li>
                          {freeze !== null && freeze == false && (
                            <li>
                              <a>
                                <a
                                  onClick={freezeIt}
                                  style={{ fontWeight: '700' }}
                                  title
                                >
                                  Freeze Account{' '}
                                  <span
                                    class='badge badge-danger'
                                    style={{ marginLeft: '8px' }}
                                  >
                                    New
                                  </span>
                                </a>
                              </a>
                            </li>
                          )}
                          {freeze !== null && freeze == true && (
                            <li>
                              <a>
                                <a
                                  onClick={unfreeze}
                                  style={{ fontWeight: '700' }}
                                  title
                                >
                                  UnFreeze Account{' '}
                                  <span
                                    class='badge badge-danger'
                                    style={{ marginLeft: '8px' }}
                                  >
                                    New
                                  </span>
                                </a>
                              </a>
                            </li>
                          )}
                        </Fragment>
                      )}

                      <AccountSetting></AccountSetting>

                      <li>
                        <a href='/about'>
                          <a title>Home</a>
                        </a>
                      </li>
                      <li>
                        <a href='/contact'>
                          <a title>Meet Our Team</a>
                        </a>
                      </li>
                      <li>
                        <a href='/termsandconditions' title>
                          Terms and Conditions
                        </a>
                      </li>
                      <li>
                        {user && (
                          <h3 className='' style={{ textAlign: 'center' }}>
                            <a onClick={logout}>
                              <span
                                style={{
                                  fontWeight: '700',
                                  fontSize: '1.1rem'
                                }}
                              >
                                Logout
                              </span>
                            </a>
                          </h3>
                        )}
                      </li>
                    </ul>
                    {!user && (
                      <h3 className='tc post_project'>
                        <a>Login/Register</a>
                      </h3>
                    )}
                  </div>
                  {/*user-account-settingss end*/}
                </div>
              </div>

              {/* <div className='col-2'></div> */}
              <div className='' style={{ textAlign: 'right' }}>
                <div className='logo'>
                  <a href='/about'>
                    <img src='bottle.png' style={{ height: '40px' }} alt='' />
                  </a>
                </div>
              </div>
            </div>

            {/*logo end*/}
            {/* <div className="search-bar">
                <form>
                  <input type="text" name="search" placeholder="Search..." />
                  <button type="submit"><i className="fas fa-search" /></button>
                </form>
              </div> */}
            {/*search-bar end*/}

            {/*menu-btn end*/}
          </div>
          {/*header-data end*/}
        </div>
      </header>
      {/*header end*/}
    </Fragment>
  );
};
