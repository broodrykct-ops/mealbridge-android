import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MealBridgeBootstrap from './MealBridgeBootstrap';
import './index.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js', { scope: './' })
      .catch(() => undefined);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MealBridgeBootstrap />
  </StrictMode>,
);
