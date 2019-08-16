import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    //View,
    KeyboardAvoidingView,
    // Disponibiliza algumas informações sobre a plataforma
    Platform,
    Image,
    TextInput,
    // O Button vem com umas estilizações próprias de acordo com a plataforma
    // Já o TouchableOpacity dinue um pouco a opacidade ao ser clicado
    // e é mais fácil de personalizar.
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import logo from '../assets/logo.png';

import api from '../services/api';

// O parametro 'navigation' é similar ao 'history' do react-native-dom
export default function Login({ navigation }){
    const [ user, setUser ] = useState('');
    
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('Main', { user });
            }
        })
    // Array de parâmetro vazio: useEffect irá executar apenas uma vez.
    }, []);
    
    async function handleLogin(){
        const response = await api.post('/devs', {
            username: user
        });

        const { _id } = response.data;
        
        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', { user: _id });

        console.log(_id);
    }

    return (
        // KeyboardAvoidingView Evita que o teclado sobreponha o layout (IOS)
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.constainer}>

            <Image source={logo} />

            {/* O TextInput não tem estilização padrão. */}
            <TextInput
                // Disabilita o uppercase na primeira letra
                autoCapitalize="none"
                // Disabilita o corretor automático
                autoCorrect={false}
                placeholder="Digite o seu usuário no GitHub"
                placeholderTextColor="#999"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    input:  {
        height: 46,
        // Faz ocupar toda largura possível
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        // Corresponde ao =>> padding: 0 50 <<= do CSS
        paddingHorizontal: 15
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});