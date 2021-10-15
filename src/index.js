import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Routing } from './routes';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
