import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme,{ shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import sinon from 'sinon';
import { expect } from 'chai';

import App from './App';
import { Header } from './App.js';
import TodoApp from './todo/TodoApp.js';
import TodoForm from './todo/TodoForm.js';
import TodoList from './todo/TodoList.js';

Enzyme.configure({ adapter: new Adapter() });

// React 15 Enzyme adapter
// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
// Fail tests on any warning

const todoItems = [{
    title:"test0",
    desc:"test0 dec",
    type:"spare time",
    start:"2017-10-17T00:00:00.000Z",
    end:"2017-10-18T00:00:00.000Z",
    id:1
}];

const props = {
    todoItems
};

console.error = message => {
    throw new Error(message);
};


it('renders without crashing', () => {
    console.log(props)
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('Test Setup', () => {
    const x = 1;
    expect(x === 1);
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
    it('Smoke test: app renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    it('Smoke test: TodoApp renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TodoApp {...props} />, div);
    });
});

describe('Shallow tests:', () => {
    it('Shallow test: renders App without crashing', () => {
        shallow(<App />);
    });

    it('App contains a div with classname "App"', ()=>{
        const wrapper = shallow(<App />);
        expect(wrapper.find('div').hasClass('App'));
    });

    it('Shallow test: render TodoApp without crashing', () => {
        const wrapper = shallow(<TodoApp {...props} />);
        expect(wrapper.find('div').hasClass('todoAppCont'));
    });
});

