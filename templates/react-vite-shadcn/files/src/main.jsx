import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { setAppApiRootUrl } from './services/http';
import { environ } from './utilities/config.js';
import log from './services/log.js';
import App from './App.jsx';

import './index.css';

// Setup services
log.init.setLogHandler(environ.logHandler);
log.init.setLogLevel(environ.logLevel);
setAppApiRootUrl(environ.apiRootUrl);

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
