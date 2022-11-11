import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { Title } from '../Title';

const shallowRenderer = createRenderer();

describe('<Title />', () => {
  it('<Title />', () => {
    shallowRenderer.render(<Title />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
