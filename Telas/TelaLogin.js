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
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={estilos.card}>
        <Text style={estilos.titulo}>login</Text>
        <Text style={estilos.subtitulo}>faça login para ver os produtos</Text>

        <View style={estilos.campo}>
          <Text style={estilos.label}>E-mail:</Text>
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
          <Text style={estilos.label}>Senha:</Text>
          <TextInput
            style={estilos.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholder="Digite a sua senha..."
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={estilos.botao} onPress={fazerLogin}>
          <Text style={estilos.botaoTexto}>Fazer o login</Text>
        </TouchableOpacity>

        {erro ? <Text style={estilos.erro}>{erro}</Text> : null}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={estilos.link}>É novo por aqui? criar conta</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    textTransform: 'lowercase',
    color: '#0D0D1A',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 15,
    color: '#5E5B7B',
    marginBottom: 24,
    textAlign: 'center',
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
    marginTop: 12,
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