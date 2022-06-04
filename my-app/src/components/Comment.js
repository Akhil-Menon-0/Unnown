 /* eslint-disable */ import React, { Fragment, useEffect } from 'react';
import Moment from 'react-moment';

export const Comment = comment1 => {
  useEffect(() => {
    // console.log(comment1);
  }, []);
  return (
    <Fragment>
      {comment1 && (
        <div className='comment-area' style={{}}>
          {/* <i className='la la-plus-circle' /> */}
          <div className='post_topbar'>
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
                    fontStyle: 'italic'
                  }}
                >
                  Anonymous
                </h3>
                <span>
                  <img src='/myfiles/clock.png' alt='' />
                  <Moment from={Date.now()}>
                    {comment1.comment1.comment1.date}
                  </Moment>
                </span>
              </div>
            </div>
          </div>
          <div className='reply-area'>
            <p
              style={{
                fontWeight: '400',
                fontSize: '1.2rem',
                color: 'white'
              }}
            >
              {comment1.comment1.comment1.content}
            </p>
          </div>
        </div>
      )}
    </Fragment>
  );
};
