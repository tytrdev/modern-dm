import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as D3 from 'd3/dist/d3.node';
import * as TopoJson from 'topojson/dist/topojson.node';

class BlankWorld extends Component {
  constructor(props) {
    super(props);
    this.projectionType = this.props.projection;
  }

  componentDidMount() {
    this.container = D3.select('.welcome-blank-world').node();
    const { width, height } = this.container.getBoundingClientRect();

    this.width = width;
    this.height = height;

    const rotate = [10, -10];
    const velocity = [0.003, -0.001];
    const time = Date.now();

    this.projection = D3.geoOrthographic()
      .scale(300)
      .translate([width / 2, height / 2])
      .clipAngle(90 + 1e-6)
      .precision(0.3);

    this.path = D3.geoPath()
      .projection(this.projection);

    this.graticule = D3.geoGraticule();

    this.svg = D3.select('.welcome-blank-world').append('svg')
      .attr('width', width)
      .attr('height', height);

    this.svg.append('defs').append('path')
      .datum({ type: 'Sphere' })
      .attr('id', 'sphere')
      .attr('d', this.path);

    this.svg.append('use')
      .attr('class', 'stroke')
      .attr('xlink:href', '#sphere');

    this.svg.append('use')
      .attr('class', 'fill')
      .attr('xlink:href', '#sphere');

    this.svg.append('path')
      .datum(this.graticule)
      .attr('class', 'graticule')
      .attr('d', this.path);

    D3.json('/world.json').then((world) => {
      this.svg.insert('path', '.graticule')
        .datum(TopoJson.feature(world, world.objects.land))
        .attr('class', 'land')
        .attr('d', this.path);

      this.svg.insert('path', '.graticule')
        .datum(TopoJson.mesh(world, world.objects.countries, (a, b) => a !== b))
        .attr('class', 'boundary')
        .attr('d', this.path);

      const feature = this.svg.selectAll('path');

      // D3.timer(() => {
      //   if (this.projectionType === 'ORTHOGRAPHIC') {
      //     const dt = Date.now() - time;
      //     this.projection.rotate([rotate[0] + velocity[0] * dt, rotate[1] + velocity[1] * dt]);
      //     feature.attr('d', this.path);
      //   } else {
      //     console.log('Not orthographic');
      //     this.projection.rotate([0, 0]);
      //   }
      // });
    });
  }

  toggle() {
    const newProjection = D3.geoEquirectangular().rotate([0, 0]).center([0, 0]);
    newProjection.translate([this.width / 2, this.height / 2]);
    newProjection.scale(350);

    console.log(this.projection);

    console.log(this.svg);

    this.svg.selectAll('path').transition()
      .duration(750)
      .attrTween('d', this.projectionTween(this.projection, newProjection));

    this.projection = newProjection;
  }

  projectionTween(projection0, projection1) {
    const { width, height } = this;
    return function tween(d) {
      let t = 0;

      const projection = D3.geoProjection(project)
        .scale(1)
        .translate([width / 2, height / 2]);

      const path = D3.geoPath()
        .projection(projection);

      function project(λ, φ) {
        λ *= 180 / Math.PI, φ *= 180 / Math.PI;
        const p0 = projection0([λ, φ]); const
          p1 = projection1([λ, φ]);
        return [(1 - t) * p0[0] + t * p1[0], (1 - t) * -p0[1] + t * -p1[1]];
      }

      return function _t(_) {
        t = _;
        return path(d);
      };
    };
  }

  render() {
    const projectionType = this.props.projection;
    if (projectionType !== this.projectionType) {
      console.log('Toggling');
      this.projectionType = projectionType;
      this.toggle();
    }

    return (
      <div className="welcome-blank-world">
      </div>
    );
  }
}

BlankWorld.propTypes = {
  projection: PropTypes.object,
};

const mapStateToProps = state => ({
  projection: state.projection,
});

export default connect(
  mapStateToProps,
)(BlankWorld);
