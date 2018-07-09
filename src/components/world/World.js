import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as D3 from 'd3/dist/d3.node';
import * as TopoJson from 'topojson/dist/topojson.node';

class World extends Component {
  constructor(props) {
    super(props);
    this.projectionType = this.props.projection;
  }

  componentDidMount() {
    this.container = D3.select(this.props.target).node();
    const { width, height } = this.container.getBoundingClientRect();

    this.width = width;
    this.height = height;

    const rotate = [10, -10];
    const velocity = [0.01, -0.003];
    const time = Date.now();

    this.projection = D3.geoOrthographic()
      .scale(Math.min(width / Math.PI, height / Math.PI))
      .clipAngle(90 + 1e-6)
      .precision(0.3);

    if (this.props.center) {
      this.projection.translate([width / 2, height / 2]);
    } else {
      // this.projection.translate([0, 0]);
    }


    this.path = D3.geoPath()
      .projection(this.projection);

    this.graticule = D3.geoGraticule();
    this.svg = D3.select(this.props.target).append('svg');
    this.svg.classed('world-svg', true);

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

    if (!this.props.geography) {
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

        D3.timer(() => {
          if (this.projectionType === 'ORTHOGRAPHIC') {
            const dt = Date.now() - time;
            this.projection.rotate([rotate[0] + velocity[0] * dt, rotate[1] + velocity[1] * dt]);
            feature.attr('d', this.path);
          }
        });
      });
    } else {
      const world = this.props.geography;
      this.svg.insert('path', '.graticule')
        .datum(TopoJson.feature(world, world.objects.land))
        .attr('class', 'land')
        .attr('d', this.path);

      this.svg.insert('path', '.graticule')
        .datum(TopoJson.mesh(world, world.objects.countries, (a, b) => a !== b))
        .attr('class', 'boundary')
        .attr('d', this.path);

      const feature = this.svg.selectAll('path');

      D3.timer(() => {
        if (this.projectionType === 'ORTHOGRAPHIC') {
          const dt = Date.now() - time;
          this.projection.rotate([rotate[0] + velocity[0] * dt, rotate[1] + velocity[1] * dt]);
          feature.attr('d', this.path);
        }
      });
    }
  }

  toggle() {
    const newProjection = D3.geoEquirectangular().rotate([0, 0]).center([0, 0]);
    newProjection.translate([this.width / 2, this.height / 2]);
    newProjection.scale(300);

    const container = D3.select(this.svg.node().parentNode);
    const width = parseInt(this.svg.style('width'));
    const height = parseInt(this.svg.style('height'));
    const aspect = width / height;
    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    this.svg.attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMid')
      .call(() => {
        const targetWidth = parseInt(container.style('width'));
        this.svg.attr('width', targetWidth);
        this.svg.attr('height', Math.round(targetWidth / aspect));
        // this.svg.classed('flat', true);
      });


    this.projection.rotate([0, 0, 0]);
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
      this.projectionType = projectionType;
      this.toggle();
    }

    return null;
  }
}

World.propTypes = {
  projection: PropTypes.string,
  target: PropTypes.string.isRequired,
  center: PropTypes.bool,
  geography: PropTypes.object,
};

const mapStateToProps = state => ({
  projection: state.projection,
});

export default connect(
  mapStateToProps,
)(World);
