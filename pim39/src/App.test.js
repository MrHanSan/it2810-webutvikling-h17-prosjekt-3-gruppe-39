import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import sinon from 'sinon';
import { expect } from 'chai';

import App from './App';
import { Header } from './App'

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('Test Setup', () => {
    const x = 1;
    expect(x === 1);
});

describe('<Header />', () => {
    it('should render Header without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Header />, div);
    });

    it('should render three nav_bttons', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('.nav_button')).to.have.length(3);
    });
});

describe('<App />', () => {
    it('Checks that only one instance of App is renderd', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('.App')).to.have.length(1);
    });

    it('simulates click events', () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<App onButtonClick={onButtonClick} />);
        wrapper.find(navList[0]).simulate('click');
        expect(onButtonClick.calledOnce).to.equal(true);
    });
});
