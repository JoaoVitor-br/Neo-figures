import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

export default function TelaCadastro({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const fazerCadastro = async () => {
    try {
      await createUserWithEmailAndPassword(autenticacao, email, senha);
      navigation.navigate('Login');
    } catch (erro) {
      setErro('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <View style={estilos.container}>
      <Text>Email</Text>
      <TextInput style={estilos.input} value={email} onChangeText={setEmail} />
      <Text>Senha</Text>
      <TextInput style={estilos.input} value={senha} onChangeText={setSenha} secureTextEntry />
      <Button title="Cadastrar" onPress={fazerCadastro} />
      {erro ? <Text style={estilos.erro}>{erro}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  erro: { color: 'red', marginTop: 10 },
});