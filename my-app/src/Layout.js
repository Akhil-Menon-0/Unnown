/* eslint-disable */ import React, {
  Fragment,
  useEffect,
  useContext
} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Profile } from './components/Profile';
import { Login } from './components/Login';
import { Description } from './components/Description';
import AuthContext from './context/auth/authContext';
import axios from 'axios';
import { About } from './components/About';

import { NotFound } from './components/NotFound';
import { Terms } from './components/Terms';
import { Contact } from './components/Contact';

export const Layout = () => {
  const authContext = useContext(AuthContext);
  const { user, setUser } = authContext;

  const getUser = async () => {
    try {
      const res = await axios.get(
        'https://unnown.social/user/get_logged_in_user',
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      // console.log(res);
      if (res.data.result) {
        setUser(res.data.user);
      }
    } catch (error) {
      // console.log('in error');
      // console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Router>
      <Fragment>
        <Switch>
          {/* <Route
  path='/description_pg/:id'
  render={(props) => <DescriptionPG {...props} isAuthed={true} />}
/> */}
          <Route exact path='/' component={About}></Route>
          <Route exact path='/contact' component={Contact}></Route>
          <Route exact path='/about' component={About}></Route>
          <Route exact path='/termsandconditions' component={Terms}></Route>

          <Route exact path='/notfound' component={NotFound}></Route>

          <Route exact path='/description/:id' component={Description}></Route>

          <Route exact path='/:username' component={Profile}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Fragment>
    </Router>
  );
};
