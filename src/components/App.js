import React from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
// import Header from './Header';
import Welcome from './Welcome';
import * as actions from '../actions/auth';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ user, initUser }) => {
  initUser();

  return (
    <Router>
      <div className="flex columns">
        <ToastContainer />

        {/* Redirect guest users to the welcome page */}
        {!user
          && <Redirect to='/welcome' />
        }

        {/* Render the welcome landing page */}
        <Route exact path="/" component={Welcome} />
        <Route exact path="/welcome" component={Welcome} />

        {/* <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} /> */}
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
