import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';

export default function Routes(){

    // O exact força o router a indentificar apenas se a rota for exatamente igual
    return (
        <BrowserRouter basename="/Omnistack8">
            <Route path="/" exact component={Login}/>
            <Route path="/dev/:id" component={Main}/>
        </BrowserRouter>
    );
}