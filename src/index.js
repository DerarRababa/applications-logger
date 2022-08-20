import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import VisibleLoggerSearch from './pages/visible_logger_search';
import reportWebVitals from './reportWebVitals';


import { Provider } from 'react-redux';
import rootReducer from './store/reducers';
import { createStore } from 'redux';

import { BrowserRouter, Routes, Route } from "react-router-dom";

const store = createStore(rootReducer)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<VisibleLoggerSearch />}>

        </Route>
        </Routes>
        </BrowserRouter>

  </Provider>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
