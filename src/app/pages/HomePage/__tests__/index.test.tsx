import { createRenderer } from 'react-test-renderer/shallow';

import {BrowserRouter as Router} from 'react-router-dom';
import { HomePage } from '..';

const shallowRenderer = createRenderer();

describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <Router>
        <HomePage />
      </Router>
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
