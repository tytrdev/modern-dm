import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import _ from 'lodash';

import WorldSVG from '../world/World';

class World extends Component {
  constructor(props) {
    super(props);

    const { worldId } = props.match.params;
    const world = _.find(props.worlds, w => w.id === worldId);

    console.log(worldId);
    console.log(world);
    console.log(props.worlds);

    this.state = {
      world,
      worldId,
    };
  }

  render() {
    const { worldId } = this.state;
    const { world } = this.state;
    return (
      <div className="flex columns">
        <p>{world.name}</p>
        <p>{worldId}</p>

        <div id={`world-${worldId}`}></div>

        <WorldSVG center geography={world.geography} target={`#world-${worldId}`}/>
      </div>
    );
  }
}

World.propTypes = {
  match: PropTypes.object.isRequired,
  worlds: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  worlds: state.worlds,
});

export default connect(
  mapStateToProps,
)(World);
