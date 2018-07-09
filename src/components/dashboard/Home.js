import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';

import * as actions from '../../actions/worlds';
import WorldTile from '../world/Tile';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectPath: null,
    };

    this.props.getUserWorlds();
    this.handleTileSelection = this.handleTileSelection.bind(this);
  }

  handleTileSelection(id) {
    this.setState({
      redirectPath: `/dashboard/worlds/${id}`,
    });
  }

  render() {
    const { redirectPath } = this.state;

    if (redirectPath) {
      return <Redirect to={redirectPath} push></Redirect>;
    }

    const { worlds } = this.props;
    const tiles = _.map(worlds, world => <WorldTile data={world} handleClick={this.handleTileSelection} />);

    if (!worlds || !worlds.length) {
      return null;
    }

    return (
      <div className="flex columns dashboard">
        <h1 className="dashboard-heading">
          Welcome to your dashboard!
        </h1>

        <div className="flex wrap">
          {tiles}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  worlds: PropTypes.array,
  getUserWorlds: PropTypes.func,
};

const mapStateToProps = state => ({
  worlds: state.worlds,
});

export default connect(
  mapStateToProps,
  actions,
)(Dashboard);
