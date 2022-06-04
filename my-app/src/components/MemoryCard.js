/* eslint-disable */ import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const MemoryCard = mem => {
  return (
    <Fragment>
      <div
        className='col-lg-6 col-md-6 col-sm-12 col-12'
        style={{ paddingBottom: '40px' }}
      >
        <Link to={'/description/' + mem.mem._id}>
          <div className='gallery_pt'>
            {mem.mem.hidden ? (
              <img src='/hidden.png'></img>
            ) : (
              <img src={'https://unnown.social/' + mem.mem.image} alt='' />
            )}
            <Link to={'/description/' + mem.mem._id}>
              <img src='/myfiles/all-out.png' alt='' />
            </Link>
          </div>
        </Link>
        {/*gallery_pt end*/}
      </div>
    </Fragment>
  );
};
