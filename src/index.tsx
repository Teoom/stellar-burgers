import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { router } from './components/app/index';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@store';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
