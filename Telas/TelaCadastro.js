import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
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
      await updateProfile(user, { displayName: nome });
      navigation.navigate('Login');
    } catch (erro) {
      setErro('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={estilos.card}>
        <Text style={estilos.titulo}>Crie a sua conta</Text>
        <Text style={estilos.subtitulo}>Comece e cadastre-se agora</Text>

        <View style={estilos.campo}>
          <Text style={estilos.label}>Email</Text>
          <TextInput
            style={estilos.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite o seu Email..."
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={estilos.campo}>
          <Text style={estilos.label}>Nome</Text>
          <TextInput
            style={estilos.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite o seu Nome..."
            placeholderTextColor="#999"
          />
        </View>

        <View style={estilos.campo}>
          <Text style={estilos.label}>Senha</Text>
          <TextInput
            style={estilos.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholder="Digite a sua senha..."
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={estilos.botao} onPress={fazerCadastro}>
          <Text style={estilos.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>

        {erro ? <Text style={estilos.erro}>{erro}</Text> : null}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={estilos.link}>Já é um Membro? Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F4FF',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#7F5CFF',
    padding: 24,
    shadowColor: '#7F5CFF',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0D0D1A',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 15,
    color: '#5E5B7B',
    marginBottom: 24,
  },
  campo: {
    marginBottom: 16,
  },
  label: {
    color: '#7F5CFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F6FF',
    borderWidth: 1,
    borderColor: '#DAD7F7',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    color: '#1A1A2E',
  },
  botao: {
    marginTop: 10,
    backgroundColor: '#7F5CFF',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
  erro: {
    color: '#FF4F91',
    marginTop: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  link: {
    marginTop: 20,
    color: '#FF8C42',
    fontWeight: '700',
    fontSize: 15,
  },
});