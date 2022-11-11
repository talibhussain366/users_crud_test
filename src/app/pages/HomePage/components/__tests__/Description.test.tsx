import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { Description } from '../Description';

const shallowRenderer = createRenderer();

describe('<Description />', () => {
    it('<Description />', () => {
        shallowRenderer.render(<Description />);
        const renderedOutput = shallowRenderer.getRenderOutput();
        expect(renderedOutput).toMatchSnapshot();
    });
});
