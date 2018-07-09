import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import Home from './Home';
import World from './World';

const Dashboard = () => (
  <Router>
    <div className="flex dashboard">
      {/* TODO: Dashboard Header/Toolbar here? */}
      {/* Landing page for all users */}
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Home} />
      <Route exact path="/dashboard/worlds/:worldId" component={World} />
    </div>
  </Router>
);

export default Dashboard;
