import React from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import Header from './Header';
import Welcome from './Welcome';
import Dashboard from './dashboard/Dashboard';
import * as actions from '../actions/auth';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ user, initUser }) => {
  const localUser = localStorage.getItem('user');
  const authedUser = user || JSON.parse(localUser);
  initUser(); // TODO: Get rid of this

  return (
    <Router>
      <div className="flex columns">
        {/* Notification Container */}
        <ToastContainer
          className='toast-container'
          toastClassName="dark-toast"
          progressClassName='toast-progress'/>
        <Header></Header>


        <div className="flex app-body">
          {/* Landing page for all users */}
          <Route path="/welcome" component={Welcome} />

          {/* Redirect guest users to the landing page */}
          {!authedUser
            && <Redirect to='/welcome' />
          }

          {/* Authenticated users can see these pages */}
          {authedUser
            && <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          }
        </div>
      </div>
    </Router>
  );
};

App.propTypes = {
  user: PropTypes.object,
  initUser: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  actions,
)(App);
