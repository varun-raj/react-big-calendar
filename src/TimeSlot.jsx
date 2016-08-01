import React, { PropTypes, Component } from 'react';

import cn from 'classnames'

export default class TimeSlot extends Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date).isRequired,
    isNow: PropTypes.bool,
    showLabel: PropTypes.bool,
    content: PropTypes.string,
    culture: PropTypes.string,
    events: React.PropTypes.array.isRequired,
  }

  static defaultProps = {
    isNow: false,
    showLabel: false,
    content: ''
  }
  
  render() {

    let EventComponent = this.props.eventComponent;
    let MoreEvents = this.props.eventModalComponent;

    return (
      <div
        className={cn(
          'rbc-time-slot',
          this.props.showLabel && 'rbc-label',
          this.props.isNow && 'rbc-now',
        )}
      >          
      {!this.props.showLabel && this.props.events.map(function(event, i){
        return (<div>
                <div className='rbc-event-label'></div>
                <div className='rbc-event-content'>
                  { EventComponent
                    ? <EventComponent key={event.id} event={event} title={event.title}/>
                    : event.title
                  }
                </div>
              </div>)
      })}
      {!this.props.showLabel && this.props.events.length > 5 &&
        <MoreEvents value={this.props.value}/>
      }
      {this.props.showLabel &&
        <span>{this.props.content}</span>
      }
      </div>
    )
  }
}
