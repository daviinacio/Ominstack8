import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

import api from '../services/api';

export default function Main({ navigation }){
    // Obtem o parametro passado pela rota anterior
    const id = navigation.getParam('user');
    const [ users, setUsers ] = useState([]);

    const displayMax = 5;

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: {
                    user: id
                }
            });

            setUsers(response.data);

            console.log(response.data);
        }

        loadUsers();
    },[id]);

    async function handleDislike(){
        const [user, ...rest] = users;

        api.post(`/devs/${user._id}/dislikes`, null, {
            headers: {
                user: id
            }
        });

        setUsers(rest);
        console.log(`dislike: ${user._id}`);
    }

    async function handleLike(){
        // Essa desestruturação pega o primeiro elemento do array
        // O resto do array está na variável 'rest'
        const [user, ...rest] = users;

        api.post(`/devs/${user._id}/likes`, null, {
            headers: {
                user: id
            }
        });

        setUsers(rest);
        console.log(`like: ${user._id}`);
    }

    async function handleLogout(){
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    function calcTranslateX(index){
        return index < displayMax ? ((index * 7) - ((displayMax * 7) / 3)) : 1000;
    }

    function calcTranslateY(index){
        return index < displayMax ? (index * -3) : 1000;
    }

    return (
        <SafeAreaView style={styles.constainer}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

            <View style={styles.cardsContainer}>
                { users.length === 0 ? (
                    <Text style={styles.empty}>Acabou :(</Text>
                ) : (
                    users.map((user, index) => (
                        <View key={user._id} style={[styles.card, { zIndex: users.length - index, transform: [ { translateX: calcTranslateX(index) }, { translateY: calcTranslateY(index) } ] }]}>
                            <Image style={styles.avatar} source={{ uri: user.avatar }} />
                            <View style={styles.footer}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text numberOfLines={3} style={styles.bio}>{user.bio}</Text>
                            </View>
                        </View>
                    ))
                )}
            </View>

            { users.length > 0 && (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleDislike}>
                        <Image source={dislike} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleLike}>
                        <Image source={like} />
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        // Cria um espaço igual entre os elementos
        justifyContent: 'space-between'
    },
    logo: {
        marginTop: 30
    },
    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    },
    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        /*transform: [
            // { perspective: 850 },
            { translateX: - 50 },
            // { rotateY: '60deg'},
        
        ]*/
    },
    avatar: {
        flex: 1,
        height: 300
    },
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        // Sombra no Android
        elevation: 2,
        // Sombra no IOS
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        }
    }
});

