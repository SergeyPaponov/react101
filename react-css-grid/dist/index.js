'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var px = function px(n) {
  return typeof n === 'number' ? n + 'px' : n;
};

var width = function width(props) {
  return {
    gridTemplateColumns: 'repeat(auto-fit, minmax(' + px(props.width) + ', 1fr))'
  };
};

var gap = function gap(props) {
  return {
    gridGap: px(props.gap)
  };
};

var align = function align(props) {
  return props.align ? {
    alignItems: props.align
  } : null;
};

var span = function span(props) {
  return props.span ? {
    gridColumn: 'span ' + props.span
  } : null;
};

var Grid = _styledComponents2.default.div([], {
  display: 'grid'
}, width, gap, align);

Grid.propTypes = {
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  gap: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  align: _propTypes2.default.string
};

Grid.defaultProps = {
  width: 320,
  gap: 32
};

Grid.Item = _styledComponents2.default.div([], span);

exports.default = Grid;