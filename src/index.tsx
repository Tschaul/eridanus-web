import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { AppViewModel } from './app/viewmodel/app-viewmodel';

const vm = new AppViewModel();

(window as any).vm = vm;

ReactDOM.render(<App vm={vm}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
