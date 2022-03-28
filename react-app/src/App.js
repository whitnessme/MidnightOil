import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';

import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import DeckPage from './components/DeckPage/index'
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import UnauthPage from './components/UnauthPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <LandingPage />
        </Route>
        <ProtectedRoute path='/dashboard' exact={true}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path='/decks/:deckId(\\d+)' exact={true}>
          <DeckPage />
        </ProtectedRoute>
        <Route path='/unauthorized' exact={true}>
          <UnauthPage />
        </Route>
        <Route>
          <UnauthPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
