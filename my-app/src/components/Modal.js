/* eslint-disable */ import React, { Fragment, useState } from 'react';
/* eslint-disable */ import ReactModal from 'react-responsive-modal';
import { InstaModal } from './InstaModal';

export const Modal = profile => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => {
    setOpen(true);
  };

  const onClick = e => {
    e.preventDefault();

    //var Url = document.createElement("textarea");
    //Copied = Url.createTextRange();
    //Copied.execCommand("Copy");
    var copyText = document.getElementById('textinput');

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand('copy');
  };
  const onCloseModal = () => {
    setOpen(false);
  };
  const onClose = () => {
    setOpen(false);
  };
  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
  };

  return (
    <Fragment>
      <Fragment>
        <button
          type='button'
          onClick={onOpenModal}
          className='btn '
          style={{
            backgroundColor: '#ED3A4E',
            width: '200px',
            height: '60px',
            marginTop: '20px',
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
            SHARE
            <span>
              <i
                class='fas fa-share-alt'
                style={{ marginLeft: '10px', color: 'white' }}
                aria-hidden='true'
              ></i>
            </span>
          </div>
        </button>
        <ReactModal
          open={open}
          styles={{ top: '30vh' }}
          center={true}
          showCloseIcon={false}
          onClose={onCloseModal}
          closeOnOverlayClick={true}
        >
          <div className='post-project'>
            <h3>SHARE</h3>
            <div
              className='post-project-fields'
              style={{ paddingLeft: '0px', paddingRight: '0px' }}
            >
              <form>
                <div className='row'>
                  <div className='col-lg-12 text-center'>
                    <input
                      value={'unnown.social' + window.location.pathname}
                      id='textinput'
                      style={{
                        fontWeight: '600',
                        color: '#ED3A4E',
                        fontSize: '1.2rem',
                        textAlign: 'center'
                      }}
                    ></input>
                  </div>
                  <div className='col-lg-12 text-right'>
                    <i
                      class='fas fa-copy fa-2x'
                      color='#ED3A4E'
                      onClick={onClick}
                    ></i>
                  </div>
                  <div class='col-lg-12' style={{ textAlign: 'center' }}>
                    <span>
                      <a
                        href={
                          'whatsapp://send?text=Hey, You are invited to write a message or upload a memory, Anonymously to ' +
                          window.location.pathname.substring(1) +
                          ' at https://unnown.social' +
                          window.location.pathname
                        }
                        data-action='share/whatsapp/share'
                      >
                        <i
                          class='fab fa-2x fa-whatsapp'
                          style={{ color: '#62D467' }}
                        ></i>
                      </a>
                    </span>
                    <InstaModal
                      username={window.location.pathname.substring(1) + ''}
                    ></InstaModal>
                    <span>
                      <iframe
                        src={
                          'https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Funnown.social%2F' +
                          window.location.pathname.substring(1) +
                          '&layout=button&size=large&appId=2250494815263616&width=77&height=28'
                        }
                        width={88}
                        height={28}
                        style={{ border: 'none', overflow: 'hidden' }}
                        scrolling='no'
                        frameBorder={0}
                        allowTransparency='true'
                        allow='encrypted-media'
                      />
                    </span>
                  </div>

                  <div className='col-lg-12'>
                    <ul>
                      <li>
                        <button
                          className='active'
                          onClick={onCloseModal}
                          type='submit'
                          value='post'
                        >
                          Done
                        </button>
                      </li>
                      <li>
                        <a onClick={onCloseModal} title>
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ReactModal>
      </Fragment>
    </Fragment>
  );
};
