import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';

const testEvents = [
    {
        'title': 'Jalla 1',
        'start': new Date(2017, 9, 3, 10),
        'end': new Date(2017, 9, 3, 11)
    },
    {
        'title': 'Jalla 2',
        'start': new Date(2017, 9, 3, 14),
        'end': new Date(2017, 9, 3, 15)
    },
    {
        'title': 'ting',
        'start': new Date(2017, 9, 20, 14),
    },
    {
        'title': 'Helg',
        'start': new Date(2017, 9, 13, 17),
        'end': new Date(2017, 9, 15, 23, 59)
    },
    {
        'title': 'Heldags',
        'start': new Date(2017, 9, 3, 8),
        'end': new Date(2017, 9, 3, 9),
        'allDay': true
    }
];

/**
 *
 */
class Calendar extends Component {
//    constructor(props) {
//        super(props);
//        // TODO construct?
//    }

    static get stringMessages() {
        return {
            'previous': 'prev'
        };
    }
    static get formats() {
        return {
            weekdayFormat: (date, culture, localizer) => localizer.format(date, 'ddd', culture),
            eventTimeRangeFormat: ({start, end}, culture, localizer) => ""
        };
    }
    
    selectSlot({start, end, slots, action}) {
        // TODO new event
        alert('w00t! ' + start.toLocaleString());
    }
    selectEvent(event, e) {
        // TODO show event
        alert('hello! ' + event.title);
    }

    render() {
        return (
            <div id="calendar_container">
                <BigCalendar
                    //view='month'
                    events={this.props.eventItems}
                    onSelectSlot={this.selectSlot}
                    onSelectEvent={this.selectEvent}
                    views={['month', 'week']}
                    drilldownView={null}
                    toolbar={true}
                    popup={true}
                    selectable={true}
                    step={60}
                    timeslots={2}
                    formats={Calendar.formats}
                    messages={Calendar.stringMessages}
                />
            </div>
        )
    }
}

export default Calendar;
