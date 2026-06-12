import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Imports antigos...
import TelaLogin from './loja-bonecos/NeoFiguresApp/Telas/TelaLogin';
import TelaInicial from './loja-bonecos/NeoFiguresApp/Telas/TelaInicial';
import TelaProdutos from './loja-bonecos/NeoFiguresApp/Telas/TelaProdutos';
import TelaCadastro from './loja-bonecos/NeoFiguresApp/Telas/TelaCadastro';
import TelaFavoritos from './loja-bonecos/NeoFiguresApp/Telas/TelaFavoritos';

// ADICIONE ESTE IMPORT:
import TelaPerfil from './loja-bonecos/NeoFiguresApp/Telas/TelaPerfil';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerStyle: { backgroundColor: '#e91e63' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
        
        {/* Telas que já estavam aqui... */}
        <Stack.Screen name="Login" component={TelaLogin} options={{ headerShown: false }} />
        <Stack.Screen name="Inicial" component={TelaInicial} options={{ title: 'NeoFigures' }} />
        <Stack.Screen name="Produtos" component={TelaProdutos} options={{ title: 'Nossos Bonecos' }} />
        <Stack.Screen name="Cadastro" component={TelaCadastro} options={{ title: 'Criar Conta' }} />
        <Stack.Screen name="Favoritos" component={TelaFavoritos} options={{ title: 'Meus Favoritos' }} />

        {/* ADICIONE ESTA NOVA SCREEN: */}
        <Stack.Screen 
          name="Perfil" 
          component={TelaPerfil} 
          options={{ title: 'Meu Perfil' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
