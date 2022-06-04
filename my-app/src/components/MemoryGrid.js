 /* eslint-disable */ import React, { Fragment } from 'react';
import { MemoryCard } from './MemoryCard';

export const Grid = mems => {
  return (
    <Fragment>
      <div className='gallery_pf'>
        {mems.mems.length > 0 ? (
          <div
            className='row'
            style={{
              backgroundColor: '#030303'
            }}
          >
            {mems.mems.map(mem => {
              return <MemoryCard mem={mem}></MemoryCard>;
            })}
          </div>
        ) : (
          <Fragment>
            <div className='row' style={{ justifyContent: 'center' }}>
              <img src='/myfiles/noposts.png'></img>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '2.5rem',
                  fontWeight: '500',
                  color: 'white'
                }}
              >
                <span>No Memories Yet</span>
              </div>
              <div className='text-center'>
                <div className='post-st'>
                  <ul>
                    <li>
                      <a
                        className='post_mem active'
                        style={{ marginTop: '20px', fontSize: '1.5rem' }}
                        title
                      >
                        Upload a Memory
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
