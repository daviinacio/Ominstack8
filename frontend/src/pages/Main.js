import React, { useEffect, useState } from 'react';

// Serve para redirecionar dentro da aplicação
import { Link } from 'react-router-dom';

import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

// O react-router-dom inclue uma propriedade no componente chamado 'match'
// Dentro desse 'match' tem todos os parametros que foram passados para essa rota
// Para obter os parametros basta usar Main({ match }){ match.params.prop; }
export default function Main({ match }){
    // Toda vez que for necessário uma variável que o componente possa ter acesso,
    // se usa o useState(<Valor inicial>)
    const [ users, setUsers ] = useState([]);

    // Recebe 2 parametros: 
    //      Função que quer executar (pode ser uma arrow function. () => {})
    //      Quando quer executar a função. Array de dependências do useEffecs.
    //          A função é chamada toda vez que alguma variável do array é alterada.
    //          Se o array estiver vazio, a função será executada apenas uma vez.

    // Executa toda vez que o parâmetro id for alterado
    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            });

            // Toda vez que o valor de um estado é alterado
            // Uma nova renderização é gerada pelo react
            // E todo o HTML é renderizado do zero com os novos dados.
            setUsers(response.data);

            console.log(response.data);
        }

        loadUsers();
    },[match.params.id]);

    // Toda ação gerada a partir de uma interação do usuário é chamada de handle
    async function handleDislike(id){
        // No método post, o segundo parametro é o corpo da requisição.
        // Para passar os paremetros, deve se usar o terceiro parametro da função.
        api.post(`/devs/${id}/dislikes`, null, {
            headers: {
                user: match.params.id
            }
        });

        console.log(`dislike: ${id}`);

        // Modificando a lista de usuários filtrando apenas usuários cujo o id seja diferente.
        // A variável user nunca pode ser alterada diretamente, apenas com o setUsers
        setUsers(users.filter(user => user._id !== id));
    }

    async function handleLike(id){
        api.post(`/devs/${id}/likes`, null, {
            headers: {
                user: match.params.id
            }
        });

        setUsers(users.filter(user => user._id !== id));

        console.log(`like: ${id}`);
    }

    //return <h1>{match.params.id}</h1>;
    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="tindev" />
            </Link>
            {/* Um if ternário sendo utilizado para mostrar uma mensagem se estiver vazio */}
            { users.length > 0 ? (
                <ul>
                {users.map(user => (
                    // O react precisa de uma key unica para gerencias melhor a lista
                    // Sem a key, todos os elementos serão recarregado quando holver alterações
                    // Inserir uma key, melhora consideravelmente a performance
                    <li key={user._id}>
                        <img src={user.avatar} alt={user.name}/>
                        <footer>
                            <a href={`http://github.com/${user.user}`} target="_blank" 
                                    without="true" rel="noopener noreferrer">
                                <strong>{user.name}</strong>
                            </a>
                            <p>{user.bio}</p>
                        </footer>
                        <div className="buttons">
                            {/* Quando o react encontra uma função com '()', 
                                ele entende que deve executar e usar o valor do retorno.
                                Para executar a função apenas quando o evento for chamado,
                                deve ser declarado uma função por volta. Essa função pode
                                ser uma arrow function.
                            */}
                            <button type="button" onClick={() => handleDislike(user._id)}>
                                <img src={dislike} alt="dislike" />
                            </button>
                            <button type="button" onClick={() => handleLike(user._id)}>
                                <img src={like} alt="like" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            ) : (
                <div className="empty">Acabou :(</div>
            )}
        </div>
    );
}