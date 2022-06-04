/* eslint-disable */ import React, { Fragment, useState } from 'react';
/* eslint-disable */ import ReactModal from 'react-responsive-modal';

export const InstaModal = username => {
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
  return (
    <Fragment>
      <span>
        <i
          class='fab fa-2x fa-instagram'
          onClick={onOpenModal}
          style={{ color: '#DF3A3A', margin: '5px' }}
        ></i>
      </span>

      <ReactModal
        open={open}
        styles={{ top: '30vh' }}
        center={true}
        showCloseIcon={false}
        onClose={onCloseModal}
        closeOnOverlayClick={true}
      >
        <div className='post-project'>
          <div className='d-flex justify-content-between'>
            <div style={{ fontWeight: 'bold' }}>Share on Instagram</div>
            <a onClick={onCloseModal} style={{ cursor: 'pointer' }} title>
              Cancel
            </a>
          </div>
          <hr />
          <div
            className='post-project-fields'
            style={{ paddingLeft: '0px', paddingRight: '0px' }}
          >
            <div className='row text-center'>
              <div className='col' style={{ textAlign: 'center' }}>
                <img
                  alt='Image'
                  className=''
                  src='instaimage.jpeg'
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>
            </div>
            <form>
              <div className='row'>
                {username && (
                  <div className='col-lg-12 text-center'>
                    <input
                      value={'unnown.social/' + username.username}
                      id='textinput'
                      className='trytry'
                      style={{
                        fontWeight: '600',
                        marginTop: '20px',
                        color: '#ED3A4E',
                        textAlign: 'center',
                        border: 'none'
                      }}
                    ></input>
                  </div>
                )}
                <div className='col-lg-12 text-right'>
                  <i class='fas fa-copy' color='#ED3A4E' onClick={onClick}></i>
                </div>
                <div
                  className='col-lg-12 text-center'
                  style={{ fontSize: '0.9rem', marginTop: '10px' }}
                >
                  To add to profile go to{' '}
                  <span style={{ fontWeight: 'bold' }}>Edit Profile</span> on
                  Instagram and place the link above in the{' '}
                  <span style={{ fontWeight: 'bold' }}>Website</span> field
                </div>
                <br />
              </div>
            </form>
          </div>
        </div>
      </ReactModal>
    </Fragment>
  );
};
