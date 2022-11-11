import { createRenderer } from 'react-test-renderer/shallow';
import {BrowserRouter as Router} from 'react-router-dom';

import { EditUser } from '..';

const shallowRenderer = createRenderer();

describe('<EditUser />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <Router>
        <EditUser />
      </Router>
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
