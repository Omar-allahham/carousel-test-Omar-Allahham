import React from 'react';
import renderer from 'react-test-renderer';
import Films from './Films';


describe('Films Component', () => {
    it('match the snapshots', () => {
        const tree = renderer
            .create(<Films />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

})



