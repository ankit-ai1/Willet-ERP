import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import App from './App';
import { ToastProvider } from './lib/toast';
import './styles.css';

// reducedMotion="user": when the OS asks for reduced motion, Motion keeps opacity fades
// but drops transform/layout animation. Parallax, tilt and magnetic effects check it themselves.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <App />
      </ToastProvider>
    </MotionConfig>
  </StrictMode>,
);
