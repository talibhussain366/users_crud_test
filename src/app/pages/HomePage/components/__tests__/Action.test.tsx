import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { Action } from '../Action';

const shallowRenderer = createRenderer();

describe('<Action />', () => {
    it('<Action />', () => {
        shallowRenderer.render(<Action />);
        const renderedOutput = shallowRenderer.getRenderOutput();
        expect(renderedOutput).toMatchSnapshot();
    });
});
