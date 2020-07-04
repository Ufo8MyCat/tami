import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Store from './store/Store'
import {SignupForm} from './screens/SignupForm'
import {LoginForm} from './screens/LoginForm'
import {UsersList} from './screens/UsersList'
import {CanditateDetails} from './screens/CanditateDeteils'
import './App.css';

export const App = (props)=> {
  const [auth, setAuth] = useState(false)

  const fakeAuth = {
    authenticate() {
      setAuth(true)
    },
    signout() {
      setAuth(false)
    }
  };

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <Store>
          <Router>
            <Switch>
              <Route exact path="/">
                <SignupForm auth={fakeAuth}/>
              </Route>
              <Route path="/Login">
                <LoginForm auth={fakeAuth}/>
              </Route>
              <PrivateRoute path="/details">
                <CanditateDetails  auth={fakeAuth}/>
              </PrivateRoute>
              <PrivateRoute path="/homepage">
                <UsersList />
              </PrivateRoute>
            </Switch>
          </Router>
        </Store>
      </header>
    </div>
  );
}

