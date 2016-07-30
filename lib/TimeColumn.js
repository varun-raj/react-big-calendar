'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _TimeSlotGroup = require('./TimeSlotGroup');

var _TimeSlotGroup2 = _interopRequireDefault(_TimeSlotGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeColumn = function (_Component) {
  _inherits(TimeColumn, _Component);

  function TimeColumn() {
    _classCallCheck(this, TimeColumn);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TimeColumn.prototype.renderTimeSliceGroup = function renderTimeSliceGroup(key, isNow, date, eves) {
    return _react2.default.createElement(_TimeSlotGroup2.default, {
      key: key,
      isNow: isNow,
      timeslots: this.props.timeslots,
      step: this.props.step,
      showLabels: this.props.showLabels,
      timeGutterFormat: this.props.timeGutterFormat,
      value: date,
      events: eves,
      eventComponent: this.props.eventComponent
    });
  };

  TimeColumn.prototype.render = function render() {
    var _this2 = this;

    var totalMin = _dates2.default.diff(this.props.min, this.props.max, 'minutes');
    var numGroups = Math.ceil(totalMin / (this.props.step * this.props.timeslots));
    var timeslots = [];
    var groupLengthInMinutes = this.props.step * this.props.timeslots;

    var date = this.props.min;
    var next = date;
    var isNow = false;
    var eves = [];

    var _loop = function _loop() {
      isNow = _dates2.default.inRange(_this2.props.now, date, _dates2.default.add(next, groupLengthInMinutes - 1, 'minutes'), 'minutes');

      var end_time = new Date();
      end_time = new Date(end_time.setTime(date.getTime() + 1 * 60 * 60 * 1000));

      if (_this2.props.events.length > 0) {
        eves = _this2.props.events.filter(function (el) {
          return el.start >= date && el.start <= end_time;
        }.bind(_this2));
      }

      next = _dates2.default.add(date, groupLengthInMinutes, 'minutes');
      timeslots.push(_this2.renderTimeSliceGroup(i, isNow, date, eves));

      date = next;
    };

    for (var i = 0; i < numGroups; i++) {
      _loop();
    }

    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(this.props.className, 'rbc-time-column'),
        style: this.props.style
      },
      timeslots,
      this.props.children
    );
  };

  return TimeColumn;
}(_react.Component);

TimeColumn.propTypes = {
  step: _react.PropTypes.number.isRequired,
  timeslots: _react.PropTypes.number.isRequired,
  now: _react.PropTypes.instanceOf(Date).isRequired,
  min: _react.PropTypes.instanceOf(Date).isRequired,
  max: _react.PropTypes.instanceOf(Date).isRequired,
  showLabels: _react.PropTypes.bool,
  timeGutterFormat: _react.PropTypes.string,
  type: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string,
  events: _react2.default.PropTypes.array.isRequired
};
TimeColumn.defaultProps = {
  step: 60,
  timeslots: 1,
  showLabels: false,
  type: 'day',
  className: ''
};
exports.default = TimeColumn;
module.exports = exports['default'];