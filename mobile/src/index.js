import React from 'react';
//import { View, Text, StyleSheet } from 'react-native';

import Routes from './routes';

// Preisa ficar por volta de toda a navegação da aplicação
export default function App () {
  // return (
  //   /* Por padrão, todos os componentes do react native já tem 'display: flex' */
  //   <View style={styles.constainer}>
  //     <Text style={styles.text}>Hello world</Text>
  //     <Text style={styles.text}>Hello world</Text>
  //   </View>
  // );

  return (<Routes />);
};

/*const styles = StyleSheet.create({
  constainer: {
    flex: 1, 
    backgroundColor: '#7159c1', 

    // Por padrão o flexDirection vem definido como column
    // Isso significa que os itens serão organizados um em baixo do outro
    flexDirection: 'row',
    
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20
  }
});*/