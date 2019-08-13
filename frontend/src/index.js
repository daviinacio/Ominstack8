// Biblioteca do react
import React from 'react';
// Biblioteca do react para trabalhar com o DOM do navegador
import ReactDOM from 'react-dom';

//import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';

// Renderiza alguma coisa dentro da div 'root'
// No lugar de <App /> pode conter qualquer HTML
// Cadastra qual é o componente global/principal da aplicação
// Geralmente é rodado apenas uma vez
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
