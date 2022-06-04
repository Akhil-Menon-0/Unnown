 /* eslint-disable */ import React, { Fragment, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProfileBody } from './components/ProfileBody';
import AuthState from './context/auth/AuthState';
import { Layout } from './Layout';
 /* eslint-disable */ import ReactGa from 'react-ga';

function App() {
  useEffect(() => {
    ReactGa.initialize('UA-162765327-1');

    ReactGa.pageview(window.location.pathname);
  }, []);
  return (
    <AuthState>
      <Fragment>
        <Layout></Layout>
        {/*theme-layout end*/}
      </Fragment>
    </AuthState>
  );
}

export default App;
