import React, { useState } from 'react';
// Importação de um arquivo que não precisa de um nome
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

// Para passar argumentos para um componente basta
// Passar as como propridade do componente. Ex: <Login prop1="p1" prop2="p2" />
// Existem duas formas de obter os values
// 1) Pela variável props
//      function Login(props){
//          props.prop1;
//          props.prop2;
//          // ou
//          const { prop1, prop2 } = props;
//      }
//
// 2) Pela desestruturação
//      function Login({ prop1, prop2 }){
//          
//      }

// Todas as rotas automaticamente herdam uma propriedade chamada history
// function Login({ history }) { ... }

// Os três conceitor do React
// Componente, Estado e Propriedades

// Um componente é uma função
// O componente também pode ser exportado diretamente
export default function Login({ history }){
    // Conceito de estado
    // O estado de um componente é todo e qualquer informação que o componente vai manipular
    const [ username, setUsername ] = useState('');


    // Uma função pode ser passada de duas formas para o html
    // Diretamente -> { e => ... }
    // Extermanemte -> {nomeDaFunção}

    async function handleSubmit(e) {
        e.preventDefault();

        // Como em username: username as duas variáveis tem o mesmo nome
        // Mode se deixar apenas 'username'. É um recurso de short syntaz.
        const response = await api.post('/devs', {
            username,
        });

        const { _id } = response.data;

        console.log(_id);

        history.push(`/dev/${_id}`);
    }
    

    // Precisa retornar um HTML
    // Se o HTML tiver mais de uma linha, precisa colocar entre '()'
    return (
        // class é uma palavra reservada do javascript para declarar classes
        // Então o recomendado é utilizar className
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"/>
                <input
                    placeholder="Digite seu usuário no GitHub"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            
        </div>
    );
}

// Exportar o componente
//export default Login;