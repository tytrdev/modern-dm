import React from 'react';
import PropTypes from 'prop-types';
import World from './World';

const Tile = ({ data, handleClick }) => (
  <div id={data.id} className="world-tile" onClick={() => handleClick(data.id)}>
    <span className="world-tile-name">
      {data.name}
    </span>

    <World
      center
      target={`#${data.id}`}
      geography={data.geography}
    />
  </div>
);

Tile.propTypes = {
  key: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Tile;
