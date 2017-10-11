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
                    <button type="button" id="calendar_button" className="nav_button active_button">Calendar</button>
                    <button type="button" id="todo_button" className="nav_button">To-do</button>
                    <button type="button" id="notes_button" className="nav_button">Notes</button>
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
//    constructor(props) {
//        super(props);
//        // TODO construct
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
                    events={testEvents}
                    onSelectSlot={this.selectSlot}
                    onSelectEvent={this.selectEvent}
                    views={['month', 'week', 'day']}
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


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navTab: 'calendar', // Valid states: calendar, todo, notes
            landscapeMode: true
        }
        // Properly bind this to ensure only one instance of method
        this.handleResize = this.handleResize.bind(this);
        this.handleNavClick = this.handleNavClick.bind(this);
    }
    componentDidMount() {
        this.handleResize(); // Set state based on viewport size
        window.addEventListener('resize', this.handleResize);
        // iOS (and other mobile) delayed event to increase chance of correct behaviour on rotation
        window.addEventListener('orientationchange', () => setTimeout(this.handleResize, 250));
        
        // Add navbar buttons click listeners
        // TODO suboptimal solution
        const navList = document.getElementsByClassName('nav_button');
        for (let i = 0; i < navList.length; i++) {
            navList[i].addEventListener('click', this.handleNavClick);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    
    handleResize() {
        const portraitWidth = 600,
              landscapeWidth = 800;
        
        if (window.innerWidth > landscapeWidth) {
            if (this.state.navTab === 'todo') {
                this.setState({
                    navTab: 'calendar'
                });
            }
            this.setState({
                landscapeMode: true
            });
        } else if (window.innerWidth > portraitWidth) {
            this.setState({
                landscapeMode: false
            });
        } else {
            this.setState({
                landscapeMode: false
            });
        }
    }
    
    handleNavClick(event) {
        let oldState = this.state.navTab;
        document.getElementById(oldState + '_button').classList.remove('active_button');
        event.currentTarget.classList.add('active_button');
        
        if (event.currentTarget.id === 'calendar_button') this.setState({navTab: 'calendar'});
        else if (event.currentTarget.id === 'todo_button') this.setState({navTab: 'todo'});
        else if (event.currentTarget.id === 'notes_button') this.setState({navTab: 'notes'});
    }
    
    render() {
        let calendar, todo, notes;
        
        if (this.state.navTab === 'calendar') {
            // App is in Calendar/combined mode
            if (this.state.landscapeMode) {
                // Combined calendar and todo list
                calendar = <Calendar />;
                todo = <TodoApp />;
            } else {
                // Only calendar
                calendar = <Calendar />;
            }
            
        } else if (this.state.navTab === 'todo') {
            // App is in To-do mode
            todo = <TodoApp />;
            
        } else if (this.state.navTab === 'notes') {
            // App is in Notes mode
            // TODO insert Notes component here
            notes = 'Here is should be notes';
        }
        
        return (
            <div className="App">
                {calendar}
                {todo}
                {notes}
            </div>
        );
    }
}

export {App as default, Header};
