import React from 'react';
import { createRoot } from 'react-dom/client';  
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

async function enableMocking() {

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

const rootElement = document.getElementById('root');

enableMocking().then(() => {
  if (rootElement) {
    const root = createRoot(rootElement);  
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
});
