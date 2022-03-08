import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/public.css';
import { App } from 'App';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { ToastProvider } from 'react-toast-notifications';

ReactDOM.render(
    <React.StrictMode>
        <ToastProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </ToastProvider>
    </React.StrictMode>,
    document.getElementById('root')
);