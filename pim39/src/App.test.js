import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme,{ shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import sinon from 'sinon';
import { expect } from 'chai';

import App from './App';
import { Header } from './App.js';
import Calendar from './todo/Calendar.js';
import TodoApp from './todo/TodoApp.js';
import TodoForm from './todo/TodoForm.js';
import TodoList from './todo/TodoList.js';
import NotesApp from './notes/NotesApp.js';
import Noteform from './notes/NoteForm.js';
import NoteList from './notes/NoteList.js';

Enzyme.configure({ adapter: new Adapter() });

// React 15 Enzyme adapter
// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
// Fail tests on any warning
console.error = message => {
    throw new Error(message);
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

describe('<App />', () => {
    it('Checks that only one instance of App is renderd', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('.App')).to.have.length(1);
    });
});
 
describe('<Header/>', () => {
    it('should render Header without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Header />, div);
    });

    it('should render three nav_bttons', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('.nav_button')).to.have.length(3);
    });
});

    /* class syntax (.foo, .foo-bar, etc.)
tag syntax (input, div, span, etc.)
id syntax (#foo, #foo-bar, etc.)
prop syntax ([htmlFor="foo"], [bar], [baz=1], etc.); */


describe('Smoke tests:', () => {
    it('Smoke test: App renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });
    it('Smoke test: TodoApp renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TodoApp />, div);
    });
    it('Smoke test: TodoForm renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TodoForm />, div);
    });
    it('Smoke test: TodoList renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TodoList />, div);
    });
    it('Smoke test: Calendar renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Calendar {..props} />, div);
    });
    it('Smoke test: NotesApp renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<NotesApp />, div);
    });
});

describe('Shallow tests:', () => {
    it('Shallow test: renders App  without crashing', () => {
        shallow(<App />);
    });
    it('Shallow test: App contains a div with classname "App"', ()=>{
        const wrapper = shallow(<App />);
        expect(wrapper.find('div').hasClass('App'));
    });
    it('Shallow test: TodoApp contains a div with classname "todoAppCount"', () => {
        const wrapper = shallow(<TodoApp />);
        expect(wrapper.find('div').hasClass('todoAppCont'));
    });
    it('Shallow test: Calendar renders without crashing', () => {
        const wrapper = shallow(<Calendar />);
        expect(wrapper.find('div').hasClass('calendar_container'));
    });
    it('Shallow test: NotesApp renders without crashing', () => {
        const wrapper = shallow(<NotesApp />);
        expect(wrapper.find('div').hasClass('notesApp'));
    });
});
describe('Mount tests:', () => {
  describe('Basic rendering mounted',()=>{
      it('Mount test: renders App  without crashing', () => {
          const wrapper = mount(<App />);
          wrapper.unmount();
      });
      it('Mount test: App contains a div with classname "App"', ()=>{
          const wrapper = mount(<App />);
          expect(wrapper.find('div').hasClass('App'));
          wrapper.unmount();
      });
      it('MOunt test: TodoApp contains a div with classname "todoAppCount"', () => {
          const wrapper = mount(<TodoApp />);
          expect(wrapper.find('div').hasClass('todoAppCont'));
          wrapper.unmount();
      });
      it('Mount test: Calendar renders without crashing', () => {
          const wrapper = mount(<Calendar />);
          expect(wrapper.find('div').hasClass('calendar_container'));
          wrapper.unmount();
      });
      it('Mount test: NotesApp renders without crashing', () => {
          const wrapper = mount(<NotesApp />);
          expect(wrapper.find('div').hasClass('notesApp'));
          wrapper.unmount();
      });
  });
  describe('Basic changes to props values', () =>{
    it('allows us to set props to App', () => {
      const wrapper = mount(<App storedTodo="baz" />);
      expect(wrapper.props().storedTodo).to.equal('baz');
      wrapper.setProps({ bar: 'foo' });
      expect(wrapper.props().bar).to.equal('foo');
      wrapper.unmount();
    });
  });
});
