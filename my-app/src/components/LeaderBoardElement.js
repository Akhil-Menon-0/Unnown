import React, { Fragment } from 'react';

export const LeaderBoardElement = user => {
  return (
    <Fragment>
      <div className='suggestion-usd'>
        {user.user.image.length > 0 ? (
          <img
            src={'https://unnown.social/' + user.user.image}
            alt=''
            style={{
              backgroundColor: '#191919',
              width: '35px',
              height: '40px'
            }}
          />
        ) : (
          <img
            src='/myfiles/user-pic.png'
            style={{
              backgroundColor: '#191919',
              width: '35px',
              height: '40px'
            }}
            alt=''
          />
        )}

        <div className='sgt-text'>
          <a href={'/' + user.user.username}>
            <h4 style={{ color: 'white' }}>{user.user.username}</h4>
          </a>
          <span style={{ color: 'white' }}>{user.user.views} views</span>
        </div>
      </div>
    </Fragment>
  );
};
