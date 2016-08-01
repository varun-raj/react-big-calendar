import React, { PropTypes, Component } from 'react'
import TimeSlot from './TimeSlot'
import date from './utils/dates.js'
import localizer from './localizer'

export default class TimeSlotGroup extends Component {
  static propTypes = {
    timeslots: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    events: React.PropTypes.array.isRequired,
    value: PropTypes.instanceOf(Date).isRequired,
    showLabels: PropTypes.bool,
    isNow: PropTypes.bool,
    timeGutterFormat: PropTypes.string,
    culture: PropTypes.string
  }
  static defaultProps = {
    timeslots: 1,
    step: 60,
    isNow: false,
    showLabels: false
  }

  renderSlice(slotNumber, content, value) {

    return <TimeSlot key={slotNumber}
                     showLabel={this.props.showLabels && !slotNumber}
                     content={content}
                     culture={this.props.culture}
                     isNow={this.props.isNow}
                     value={value}
                     events={this.props.events}
                     eventComponent={this.props.eventComponent}
                     eventModalComponent={this.props.eventModalComponent}
                     />
  }

  renderSlices() {
    const ret = []
    const sliceLength = this.props.step
    let sliceValue = this.props.value
    for (let i = 0; i < this.props.timeslots; i++) {
      const content = localizer.format(sliceValue, this.props.timeGutterFormat, this.props.culture)
      ret.push(this.renderSlice(i, content, sliceValue))
      sliceValue = date.add(sliceValue, sliceLength , 'minutes')
    }
    return ret
  }
  render() {
    return (
      <div className="rbc-timeslot-group">
        {this.renderSlices()}
      </div>
    )
  }
}
