import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme,{ shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Header from './App.js';
import TodoApp from './todo/TodoApp.js';
import TodoForm from './todo/TodoForm.js';
import TodoList from './todo/TodoList.js';


// React 15 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
// Fail tests on any warning
console.error = message => {
   throw new Error(message);
};


/* class syntax (.foo, .foo-bar, etc.)
tag syntax (input, div, span, etc.)
id syntax (#foo, #foo-bar, etc.)
prop syntax ([htmlFor="foo"], [bar], [baz=1], etc.); */


describe('Smoke tests:', () => {
  it('Smoke test: app renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
   it('Smoke test: TodoApp renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TodoApp />, div);
   });
});
describe('Shallow tests:', () => {
  it('Shallow test: renders App without crashing', () => {
    shallow(<App />);
  });
  it('App contains a div with classname "App"', ()=>{
    const wrapper = shallow(<App />);
    expect(wrapper.find('div').hasClass('App')).toEqual(true);
  });
  it('Shallow test: render TodoApp without crashing', () => {
    const wrapper = shallow(<TodoApp />);
    expect(wrapper.find('div').hasClass('todoAppCont')).toEqual(true);
  });
});

describe('<Header/>', () => {
  it('renders Header component', () => {
    const wrapper = (document.createElement('div'));
    ReactDOM.render(<Header />, wrapper);
    
  });
});



