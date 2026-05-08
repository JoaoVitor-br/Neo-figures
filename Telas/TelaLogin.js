import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const fazerLogin = async () => {
    try {
      await signInWithEmailAndPassword(autenticacao, email, senha);
    } catch (erro) {
      setErro('Erro ao fazer login. Verifique seus dados.');
    }
  };

  return (
    <View style={estilos.container}>
      <Text>Email</Text>
      <TextInput style={estilos.input} value={email} onChangeText={setEmail} />
      <Text>Senha</Text>
      <TextInput style={estilos.input} value={senha} onChangeText={setSenha} secureTextEntry />
      <Button title="Entrar" onPress={fazerLogin} />
      {erro ? <Text style={estilos.erro}>{erro}</Text> : null}
      <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  erro: { color: 'red', marginTop: 10 },
});