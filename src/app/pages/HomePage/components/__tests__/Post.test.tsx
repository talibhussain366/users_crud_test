import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { Post } from '../Post';

const shallowRenderer = createRenderer();

describe('<Post />', () => {
    it('<Post />', () => {
        shallowRenderer.render(<Post />);
        const renderedOutput = shallowRenderer.getRenderOutput();
        expect(renderedOutput).toMatchSnapshot();
    });
});
