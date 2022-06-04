/* eslint-disable */ import React, {
  Fragment,
  useEffect,
  useState
} from 'react';
import { Navbar } from './Navbar';
import { ProfileBody } from './ProfileBody';
import Axios from 'axios';
import { Loading } from './Loading';

export const Profile = props => {
  const [posts, setPosts] = useState(null);
  const [mems, setMems] = useState(null);
  const [freeze, setFreeze] = useState(false);

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const { match } = props;

  const getPosts = async () => {
    // console.log(match.params.username);
    setLoading(true);
    // if (match.params) {
    const req = await Axios.post('https://unnown.social/user/checkfreeze', {
      username: match.params.username
    });
    console.log(req.data);
    if (req.data.freeze == true) {
      setFreeze(true);
    }
    const res = await Axios.get(
      'https://unnown.social/post/posts/' + match.params.username
    );
    // console.log(res.data.message);
    if (res.data.message == 'Not Found') {
      // console.log('Not Found');
      props.history.push('/NotFound');
    }
    setPosts(res.data.allPosts);
    setMems(res.data.allMems);
    setProfile(res.data.user);
    setLoading(false);
    // }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Fragment>
      <div
        className='wrapper'
        style={{ minHeight: '100vh', backgroundColor: '#030303' }}
      >
        <Navbar></Navbar>
        {posts && mems && profile ? (
          <Fragment>
            <ProfileBody
              posts={posts}
              profile={profile}
              freeze={freeze}
              mems={mems}
              {...props}
            ></ProfileBody>
            {!freeze && (
              <div
                className='floating-button
wow fadeIn
'
                style={{ fontSize: '100', borderColor: '#ED3A4E' }}
              >
                {/* <Link to='/add_options'> */}
                <button
                  type='button'
                  className='btn btn-primary post-jb active'
                  style={{
                    borderRadius: '70%',
                    backgroundColor: '#ED3A4E',
                    fontSize: '30px',
                    width: '70px'
                  }}
                >
                  <i className='fas fa-edit' aria-hidden='true'></i>
                </button>
                {/* </Link> */}
              </div>
            )}
          </Fragment>
        ) : (
          <Loading></Loading>
        )}

        {/*chatbox-list end*/}
      </div>
    </Fragment>
  );
};
