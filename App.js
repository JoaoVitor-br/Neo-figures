import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaLogin from './Telas/TelaLogin';
import TelaCadastro from './Telas/TelaCadastro';
import TelaHome from './Telas/TelaHome';
import { onAuthStateChanged } from 'firebase/auth';
import { autenticacao } from './Config/firebaseConfig';

const Camadas = createNativeStackNavigator();

export default function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const desinscrever = onAuthStateChanged(autenticacao, (usuarioAtual) => {
      setUsuario(usuarioAtual);
    });
    return desinscrever;
  }, []);

  return (
    <NavigationContainer>
      <Camadas.Navigator>
        {usuario ? (
          <Camadas.Screen name="Home" component={TelaHome} />
        ) : (
          <>
            <Camadas.Screen name="Login" component={TelaLogin} />
            <Camadas.Screen name="Cadastro" component={TelaCadastro} />
          </>
        )}
      </Camadas.Navigator>
    </NavigationContainer>
  );
}