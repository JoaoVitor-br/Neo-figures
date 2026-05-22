import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

export default function TelaCadastro({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');

  const fazerCadastro = async () => {
    if (!nome.trim()) {
      setErro('Por favor, informe seu nome.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(autenticacao, email, senha);
      const user = userCredential.user;
      // Atualiza o displayName do usuário com o nome informado
      await updateProfile(user, { displayName: nome });
      navigation.navigate('Login');
    } catch (erro) {
      setErro('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <View style={estilos.container}>
      <Text>Email</Text>
      <TextInput style={estilos.input} value={email} onChangeText={setEmail} />
      <Text>Nome</Text>
      <TextInput style={estilos.input} value={nome} onChangeText={setNome} />
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