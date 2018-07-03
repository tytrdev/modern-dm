import React from 'react';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import Header from './Header';
import Welcome from './Welcome';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <Router>
      <div className="flex columns">
        <ToastContainer />

        <Route any component={Header} />
        <Route any component={Welcome} />

        {/* <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} /> */}

        {/* <Route exact path="/" render={() => (
          <div>
            {user
              && <Redirect to='/dashboard' />
            }

            {!user
              && <Redirect to='/login' />
            }
          </div>
        )} /> */}
      </div>
    </Router>
);

export default App;
