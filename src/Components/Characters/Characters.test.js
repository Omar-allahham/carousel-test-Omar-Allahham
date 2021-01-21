// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Characters from './Characters';;
import { shallow } from 'enzyme';
describe("Characters View", () => {
    it('Should render with no issues! ', () => {

        shallow(<Characters match={{ params: { fillmId: 1 } }} />);
    });

    it('Should contain a back button ', () => {

        const wrapper = shallow(<Characters match={{ params: { fillmId: 1 } }} />);
        expect(wrapper.find('a').text()).toBe(" Back ");
    });
})