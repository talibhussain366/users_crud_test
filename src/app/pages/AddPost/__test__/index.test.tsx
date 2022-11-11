import { createRenderer } from 'react-test-renderer/shallow';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '../../../../utils/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

import {BrowserRouter as Router} from 'react-router-dom';
import { AddPost } from '..';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import { ToastContainer } from 'react-toastify';

const shallowRenderer = createRenderer();

describe('<AddPost />', () => {
  beforeEach(() => {
    const store = configureAppStore();
    render(
      <Provider store={store}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContainer autoClose={2000} />
          <Router>
            <AddPost />
          </Router>
        </QueryClientProvider>
      </ThemeProvider>
      </Provider>
    );
  });

  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <Router>
        <AddPost />
      </Router>
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should give validation error if submitted with empty fields', async () => {
    let submitButton: HTMLButtonElement;
    const user = userEvent.setup();

    submitButton = screen.getByText('Save');
    await user.click(submitButton);
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Job is required')).toBeInTheDocument();
  });

  it('should give validation error if only job is required', async () => {
    let firstName: HTMLInputElement;
    let submitButton: HTMLButtonElement;
    const user = userEvent.setup();

    firstName = screen.getByPlaceholderText('Enter name');
    submitButton = screen.getByText('Save');

    await user.type(firstName, 'here is the name');
    await user.click(submitButton);

    expect(screen.getByText('Job is required')).toBeInTheDocument();
  });
});
