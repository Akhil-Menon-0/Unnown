 /* eslint-disable */ import React, { Fragment } from 'react';

export const Loading = () => {
  return (
    <Fragment>
      <div style={{ textAlign: 'center' }}>
        <img
          src='/myfiles/loader.gif'
          class='special'
          alt='animated'
          style={{ marginTop: '20vh', float: 'none' }}
        ></img>
      </div>
    </Fragment>
  );
};
