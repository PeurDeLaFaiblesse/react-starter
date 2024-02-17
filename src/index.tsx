import { createRoot } from 'react-dom/client';
import App from './App';
import './global/cssReset.css';

const root = createRoot(document.getElementById('root'));

root.render(<App />);
