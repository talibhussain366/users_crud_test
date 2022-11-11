/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { AddPost } from './pages/AddPost/Loadable';
import { EditUser } from './pages/EditUser/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { queryClient } from '../utils/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Helmet
          titleTemplate="%s - React App"
          defaultTitle="React App"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="A React application" />
        </Helmet>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-user" element={<AddPost />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer autoClose={2000} />
        <GlobalStyle />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
