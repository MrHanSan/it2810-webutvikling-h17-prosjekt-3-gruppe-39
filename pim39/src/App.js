import React, {Component} from 'react';
import logo from './39logo.svg';
import './App.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import nb from 'moment/locale/nb'
import engb from 'moment/locale/en-gb'
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
        'title': 'jalla',
        'start': new Date(2017, 10, 3),
        'end': new Date(2017, 10, 4)
    },
    {
        'title': 'jalla',
        'start': new Date(2017, 10, 3),
        'end': new Date(2017, 10, 4)
    },
    {
        'title': 'jalla',
        'start': new Date(2017, 10, 3),
        'end': new Date(2017, 10, 4)
    },
    {
        'title': 'jalla',
        'start': new Date(2017, 10, 3),
        'end': new Date(2017, 10, 4)
    }
];

class Calendar extends Component {
    
    render() {
        return (
            <div id="calendar_container">
                <BigCalendar
                    //view='month'
                    events={testEvents}
                    views={['month', 'week', 'day', 'agenda']}
                    toolbar={true}
                    popup={true}
                    step={60}
                    timeslots={2}
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
//                <div className="todoAppCont">
//                    <TodoApp />
//                </div>
                }
            </div>
        );
    }
}

export {App as default, Header};
