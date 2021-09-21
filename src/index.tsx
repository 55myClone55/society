import './index.css';
import store from './components/redux/Redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux"


//addPost(' ')

//@ts-ignore
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store} >
      //@ts-ignore
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));




