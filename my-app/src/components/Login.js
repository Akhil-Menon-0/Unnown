 /* eslint-disable */ import React, { Fragment } from 'react';

export const Login = () => {
  return (
    <Fragment>
      <div className='wrapper'>
        <div className='sign-in-page'>
          <div className='signin-popup'>
            <div className='signin-pop'>
              <div className='row'>
                <div className='col-lg-6'>
                  <div className='login-sec'>
                    <ul
                      className='sign-control'
                      style={{ textAlign: 'center' }}
                    >
                      <li data-tab='tab-1' className='current'>
                        <a title>Sign in</a>
                      </li>
                      <li data-tab='tab-2'>
                        <a title>Sign up</a>
                      </li>
                    </ul>
                    <div className='sign_in_sec current' id='tab-1'>
                      <h3>Sign in</h3>
                      <form>
                        <div className='row'>
                          <div className='col-lg-12 no-pdd'>
                            <div className='sn-field'>
                              <input
                                type='text'
                                name='username'
                                placeholder='Username'
                              />
                              <i className='fas fa-user' />
                            </div>
                            {/*sn-field end*/}
                          </div>
                          <div className='col-lg-12 no-pdd'>
                            <div className='sn-field'>
                              <input
                                type='password'
                                name='password'
                                placeholder='Password'
                              />
                              <i className='fas fa-lock' />
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
                    {/*sign_in_sec end*/}
                    <div className='sign_in_sec' id='tab-2'>
                      <div className='dff-tab current' id='tab-3'>
                        <h3>Sign up</h3>

                        <form>
                          <div className='row'>
                            <div className='col-lg-12 no-pdd'>
                              <div className='sn-field'>
                                <input
                                  type='text'
                                  name='name'
                                  placeholder='Full Name'
                                />
                                <i className='fas fa-user' />
                              </div>
                            </div>

                            <div className='col-lg-12 no-pdd'>
                              <div className='sn-field'>
                                <input
                                  type='password'
                                  name='password'
                                  placeholder='Password'
                                />
                                <i className='fas fa-lock' />
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
                      {/*dff-tab end*/}

                      {/*dff-tab end*/}
                    </div>
                  </div>
                  {/*login-sec end*/}
                </div>
              </div>
            </div>
            {/*signin-pop end*/}
          </div>
          {/*signin-popup end*/}

          {/*footy-sec end*/}
        </div>
        {/*sign-in-page end*/}
      </div>
      {/*theme-layout end*/}
    </Fragment>
  );
};
