import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { LocaleProvider } from 'antd'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import store from './redux/store'

ReactDOM.render(
    <BrowserRouter>
        <LocaleProvider locale={zh_CN}>
            <Provider store={store}>
                <App />
            </Provider>
        </LocaleProvider>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
