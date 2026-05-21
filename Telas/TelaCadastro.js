import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { autenticacao } from '../Config/firebaseConfig';

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
      <View style={estilos.header}>
        <Text style={estilos.titulo}>Crie a sua conta</Text>
        <Text style={estilos.subtitulo}>Comece e cadastre-se agora</Text>
      </View>

      <View style={estilos.formContainer}>
        <View style={estilos.inputGroup}>
          <Text style={estilos.label}>Email:</Text>
          <TextInput 
            style={estilos.input} 
            value={email} 
            onChangeText={setEmail}
            placeholder="Digite o seu Email..."
            placeholderTextColor="#999"
          />
        </View>

        <View style={estilos.inputGroup}>
          <Text style={estilos.label}>Senha:</Text>
          <TextInput 
            style={estilos.input} 
            value={senha} 
            onChangeText={setSenha}
            placeholder="Digite a sua senha..."
            placeholderTextColor="#999"
            secureTextEntry 
          />
        </View>
      </View>

      {erro ? <Text style={estilos.erro}>{erro}</Text> : null}

      <View style={estilos.botaoContainer}>
        <Button title="Cadastrar" onPress={fazerCadastro} color="#7550FF" />
      </View>

      <Text style={estilos.link} onPress={() => navigation.navigate('Login')}>
        Já é um Membro? Entrar
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20, 
    backgroundColor: '#0D001A',
    justifyContent: 'flex-start',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
    marginTop: 40,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  formContainer: {
    borderWidth: 2,
    borderColor: '#7550FF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
    backgroundColor: '#1A1A2E',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#7550FF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: { 
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    padding: 14,
    color: '#FFFFFF',
    backgroundColor: '#262641',
    fontSize: 14,
    minHeight: 48,
  },
  botaoContainer: {
    marginBottom: 30,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#7550FF',
  },
  erro: { 
    color: '#FF4F91', 
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  link: {
    color: '#FF4F91',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});