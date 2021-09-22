import './index.css';
import store from './components/redux/Redux-store';
import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux"


//addPost(' ')

//@ts-ignore
ReactDOM.render (
  //@ts-ignore
   <BrowserRouter>
      <Provider store={store} >
           <App/>
    </Provider>
  </BrowserRouter>,
    document.getElementById('root'));




