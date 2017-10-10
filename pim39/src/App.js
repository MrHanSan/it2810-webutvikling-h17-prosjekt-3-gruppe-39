import React, {Component} from 'react';
import logo from './39logo.svg';
import './App.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/nb';
import 'moment/locale/en-gb';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import TodoApp from './todo/TodoApp.js';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
moment.locale('en-gb');

class Header extends Component {
    render() {
        return (
            <div id="pim_header">
                <div id="logo_title">
                    <img src={logo} id="pim_logo" alt="PIM39 logo" />
                    <h1><span>Personal Information Manager No. 39</span></h1>
                </div>
                <nav id="navbar">
                    <button type="button" className="active_button">Calendar</button>
                    <button type="button" id="todo_button">To-do</button>
                    <button type="button">Notes</button>
                </nav>
            </div>
        );
    }
}

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

class Calendar extends Component {

    static get stringMessages() {
        return {
            'previous': 'previous'
        };
    }
    static get formats() {
        return {
            weekdayFormat: (date, culture, localizer) => localizer.format(date, 'dddd', culture),
            eventTimeRangeFormat: ({start, end}, culture, localizer) => ""
        };
    }
    
    selectSlot({start, end, slots, action}) {
        // TODO new event
    }
    selectEvent(event, e) {
        // TODO show event
    }

    render() {
        return (
            <div id="calendar_container">
                <BigCalendar
                    //view='month'
                    events={testEvents}
                    onSelectSlot={this.selectSlot}
                    onSelectEvent={this.selectEvent}
                    views={['month', 'week', 'day', 'agenda']}
                    drilldownView={null}
                    toolbar={true}
                    popup={true}
                    step={60}
                    timeslots={2}
                    formats={Calendar.formats}
                    messages={Calendar.stringMessages}
                />
            </div>
        )
    }
    
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <Calendar />
                {
//                <TodoApp />
                }
            </div>
        );
    }
}

export {App as default, Header};
