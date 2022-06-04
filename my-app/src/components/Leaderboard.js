import React, { Fragment, useEffect, useState } from 'react';
import { LeaderBoardElement } from './LeaderBoardElement';
import Axios from 'axios';

export const Leaderboard = () => {
  const [users, setUsers] = useState(null);
  const getLeaderboard = async () => {
    try {
      const res = await Axios.get('https://unnown.social/post/leaderboard');
      console.log(res.data.output);
      setUsers(res.data.output);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLeaderboard();
  }, []);
  return (
    <Fragment>
      <div
        className='suggestions full-width'
        style={{ backgroundColor: '#191919', border: '1px solid #191919' }}
      >
        <div className='sd-title'>
          <h3 style={{ color: 'white' }}>
            Leaderboard
            <span class='badge badge-danger' style={{ marginLeft: '8px' }}>
              New
            </span>
          </h3>
        </div>
        <div className='suggestions-list'>
          {users &&
            users.map(user => {
              return <LeaderBoardElement user={user}></LeaderBoardElement>;
            })}
          {/* <LeaderBoardElement></LeaderBoardElement> */}
        </div>
      </div>
    </Fragment>
  );
};
