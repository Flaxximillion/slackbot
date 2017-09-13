import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Table from './Table.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Table url="api/links" pollInterval={300000}/>, document.getElementById('root'));
registerServiceWorker();
