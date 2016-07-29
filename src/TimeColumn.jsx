import React, { Component, PropTypes } from 'react'
import cn from 'classnames';

import dates from './utils/dates';

import TimeSlotGroup from './TimeSlotGroup'

export default class TimeColumn extends Component {
  static propTypes = {
    step: PropTypes.number.isRequired,
    timeslots: PropTypes.number.isRequired,
    now: PropTypes.instanceOf(Date).isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    showLabels: PropTypes.bool,
    timeGutterFormat: PropTypes.string,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    events: React.PropTypes.array.isRequired,
  }
  static defaultProps = {
    step: 60,
    timeslots: 1,
    showLabels: false,
    type: 'day',
    className: ''
  }

  renderTimeSliceGroup(key, isNow, date, eves) {
    return (
      <TimeSlotGroup
        key={key}
        isNow={isNow}
        timeslots={this.props.timeslots}
        step={this.props.step}
        showLabels={this.props.showLabels}
        timeGutterFormat={this.props.timeGutterFormat}
        value={date}
        events={eves}
        eventComponent={this.props.eventComponent}
      />
    )
  }

  render() {
    const totalMin = dates.diff(this.props.min, this.props.max, 'minutes')
    const numGroups = Math.ceil(totalMin / (this.props.step * this.props.timeslots))
    const timeslots = []
    const groupLengthInMinutes = this.props.step * this.props.timeslots

    let date = this.props.min
    let next = date
    let isNow = false
    let eves = [];
    for (var i = 0; i < numGroups; i++) {
      isNow = dates.inRange(
          this.props.now
        , date
        , dates.add(next, groupLengthInMinutes - 1, 'minutes')
        , 'minutes'
      )

      let end_time = new Date();
      end_time = new Date(end_time.setTime(date.getTime() + (1*60*60*1000)));

      if (this.props.events.length > 0) {
        eves = this.props.events.filter(function (el) {
                return el.start >= date &&
                       el.start <= end_time
              }.bind(this));
      }      

      next = dates.add(date, groupLengthInMinutes, 'minutes');
      timeslots.push(this.renderTimeSliceGroup(i, isNow, date, eves))

      date = next
    }

    return (
      <div
        className={cn(this.props.className, 'rbc-time-column')}
        style={this.props.style}
      >
        {timeslots}
        {this.props.children}
      </div>
    )
  }
}
