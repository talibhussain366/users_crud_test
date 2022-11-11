import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { ActionsSection } from '../ActionsSection';

const shallowRenderer = createRenderer();

describe('<ActionsSection />', () => {
    it('<ActionsSection />', () => {
        shallowRenderer.render(<ActionsSection />);
        const renderedOutput = shallowRenderer.getRenderOutput();
        expect(renderedOutput).toMatchSnapshot();
    });
});
