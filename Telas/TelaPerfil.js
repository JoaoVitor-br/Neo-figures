import React, { useEffect, useState } from 'react';
import {
View,
Text,
TextInput,
Image,
StyleSheet,
ScrollView,
ActivityIndicator,
Alert,
TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { autenticacao, bancoDados, armazenamento } from '../config/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RodapeNavegacao from './RodapeNavegacao';
const camposIniciais = {
nome: '',
sobrenome: '',
rua: '',
bairro: '',
cidade: '',
estado: '',
cep: '',
telefone: '',
};export default function TelaPerfil({ navigation }) {
const [perfil, setPerfil] = useState(camposIniciais);
const [photoUrl, setPhotoUrl] = useState(null);
const [localImage, setLocalImage] = useState(null);
const [editando, setEditando] = useState(false);
const [carregando, setCarregando] = useState(true);
const [salvando, setSalvando] = useState(false);const usuario = autenticacao.currentUser;useEffect(() => {
const carregarDados = async () => {
if (!usuario) {
setCarregando(false);
return;
}const storageKey = `@perfil_usuario_${usuario.uid}`;
// 1. Tentar ler do AsyncStorage primeiro para exibição instantânea
try {
const perfilLocal = await AsyncStorage.getItem(storageKey);
if (perfilLocal) {
const dadosLocais = JSON.parse(perfilLocal);
setPerfil({
nome: dadosLocais.nome || '',
sobrenome: dadosLocais.sobrenome || '',
rua: dadosLocais.rua || '',
bairro: dadosLocais.bairro || '',
cidade: dadosLocais.cidade || '',
estado: dadosLocais.estado || '',
cep: dadosLocais.cep || '',
telefone: dadosLocais.telefone || '',
});
setPhotoUrl(dadosLocais.fotoUrl || null);
setEditando(false);
// Ocultar o carregando inicial caso já tenhamos dados locais
setCarregando(false);
}
} catch (e) {
console.error("Erro ao carregar dados locais do perfil:", e);
}// 2. Fazer requisição ao Firestore em segundo plano para obter os dados mais atualizados
try {
const perfilRef = doc(bancoDados, 'users', usuario.uid);
const perfilSnap = await getDoc(perfilRef);if (perfilSnap.exists()) {
const dados = perfilSnap.data();
const novosDados = {
nome: dados.nome || '',
sobrenome: dados.sobrenome || '',
rua: dados.rua || '',
bairro: dados.bairro || '',
cidade: dados.cidade || '',
estado: dados.estado || '',
cep: dados.cep || '',
telefone: dados.telefone || '',
fotoUrl: dados.fotoUrl || usuario.photoURL || null,
};
setPerfil({
nome: novosDados.nome,
sobrenome: novosDados.sobrenome,
rua: novosDados.rua,
bairro: novosDados.bairro,
cidade: novosDados.cidade,
estado: novosDados.estado,
cep: novosDados.cep,
telefone: novosDados.telefone,
});
setPhotoUrl(novosDados.fotoUrl);
setEditando(false);// Atualizar o cache local no AsyncStorage
await AsyncStorage.setItem(storageKey, JSON.stringify(novosDados));
} else {
const [primeiroNome, ...rest] = (usuario.displayName || '').split(' ');
const dadosPadrao = {
nome: primeiroNome || '',
sobrenome: rest.join(' ') || '',
rua: '',
bairro: '',
cidade: '',
estado: '',
cep: '',
telefone: '',
fotoUrl: usuario.photoURL || null,
};setPerfil({
nome: dadosPadrao.nome,
sobrenome: dadosPadrao.sobrenome,
rua: dadosPadrao.rua,
bairro: dadosPadrao.bairro,
cidade: dadosPadrao.cidade,
estado: dadosPadrao.estado,
cep: dadosPadrao.cep,
telefone: dadosPadrao.telefone,
});
setPhotoUrl(dadosPadrao.fotoUrl);
setEditando(true);// Salvar dados padrão no cache local do AsyncStorage
await AsyncStorage.setItem(storageKey, JSON.stringify(dadosPadrao));
}
} catch (erro) {
console.error("Erro ao buscar dados do Firestore:", erro);
// Exibir erro apenas se não conseguimos carregar nada localmente
const perfilLocal = await AsyncStorage.getItem(storageKey);
if (!perfilLocal) {
Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
}
} finally {
setCarregando(false);
}
};carregarDados();
}, [usuario]);const selecionarFoto = async () => {
const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
if (permissao.status !== 'granted') {
Alert.alert(
'Permissão necessária',
'Permita o acesso à galeria para escolher a foto de perfil.'
);
return;
}const resultado = await ImagePicker.launchImageLibraryAsync({
mediaTypes: ImagePicker.MediaTypeOptions.Images,
allowsEditing: true,
quality: 0.7,
});if (!resultado.canceled && resultado.assets?.length > 0) {
setLocalImage(resultado.assets[0].uri);
} else if (!resultado.cancelled && resultado.uri) {
setLocalImage(resultado.uri);
}
};const uploadImageAsync = async (uri) => {
const response = await fetch(uri);
const blob = await response.blob();
const imagemRef = ref(armazenamento, `profilePictures/${usuario.uid}/${Date.now()}`);
const snapshot = await uploadBytes(imagemRef, blob);
return await getDownloadURL(snapshot.ref);
};const salvarPerfil = async () => {
if (!usuario) {
return;
}setSalvando(true);
try {
let uploadedUrl = photoUrl;if (localImage) {
uploadedUrl = await uploadImageAsync(localImage);
}const nomeCompleto = `${perfil.nome.trim()} ${perfil.sobrenome.trim()}`.trim();
const usuarioAtualizado = {};
if (nomeCompleto) usuarioAtualizado.displayName = nomeCompleto;
if (uploadedUrl) usuarioAtualizado.photoURL = uploadedUrl;if (Object.keys(usuarioAtualizado).length > 0) {
await updateProfile(usuario, usuarioAtualizado);
}const perfilRef = doc(bancoDados, 'users', usuario.uid);
const novosDados = {
nome: perfil.nome,
sobrenome: perfil.sobrenome,
rua: perfil.rua,
bairro: perfil.bairro,
cidade: perfil.cidade,
estado: perfil.estado,
cep: perfil.cep,
telefone: perfil.telefone,
fotoUrl: uploadedUrl || null,
updatedAt: new Date(),
};await setDoc(perfilRef, novosDados, { merge: true });// Salvar os novos dados no AsyncStorage localmente também
const storageKey = `@perfil_usuario_${usuario.uid}`;
await AsyncStorage.setItem(storageKey, JSON.stringify(novosDados));setPhotoUrl(uploadedUrl);
setLocalImage(null);
setEditando(false);
Alert.alert('Sucesso', 'Perfil atualizado com sucesso.');
} catch (erro) {
Alert.alert('Erro', 'Não foi possível salvar o perfil. Tente novamente.');
} finally {
setSalvando(false);
}
};const atualizarCampo = (campo, valor) => {
setPerfil((anterior) => ({ ...anterior, [campo]: valor }));
};if (carregando) {
return (
<View style={estilos.centralizado}>
<ActivityIndicator size="large" />
</View>
);
}return (
<View style={estilos.tela}>
<ScrollView contentContainerStyle={estilos.container} keyboardShouldPersistTaps="handled">
<View style={estilos.card}>
<Text style={estilos.titulo}>sua conta</Text>
<View style={estilos.topRow}>
<TouchableOpacity
style={estilos.avatarWrapper}
activeOpacity={0.75}
onPress={editando ? selecionarFoto : undefined}
>
<View style={estilos.avatarContainer}>
{localImage ? (
<Image source={{ uri: localImage }} style={estilos.avatar} />
) : photoUrl ? (
<Image source={{ uri: photoUrl }} style={estilos.avatar} />
) : (
<View style={[estilos.avatar, estilos.avatarVazio]}>
<Text style={estilos.avatarTexto}>Foto</Text>
</View>
)}
</View>
</TouchableOpacity>
<View style={estilos.fieldsColumn}>
<Text style={estilos.label}>nome:</Text>
<TextInput
style={estilos.input}
placeholder="Digite seu nome"
placeholderTextColor="#8b72f1"
value={perfil.nome}
onChangeText={(valor) => atualizarCampo('nome', valor)}
editable={editando}
/>
<Text style={estilos.label}>sobrenome:</Text>
<TextInput
style={estilos.input}
placeholder="Digite seu sobrenome"
placeholderTextColor="#8b72f1"
value={perfil.sobrenome}
onChangeText={(valor) => atualizarCampo('sobrenome', valor)}
editable={editando}
/>
<Text style={estilos.label}>rua:</Text>
<TextInput
style={estilos.input}
placeholder="Digite sua rua"
placeholderTextColor="#8b72f1"
value={perfil.rua}
onChangeText={(valor) => atualizarCampo('rua', valor)}
editable={editando}
/>
</View>
</View>
<Text style={estilos.label}>bairro:</Text>
<TextInput
style={estilos.input}
placeholder="Digite seu bairro"
placeholderTextColor="#8b72f1"
value={perfil.bairro}
onChangeText={(valor) => atualizarCampo('bairro', valor)}
editable={editando}
/>
<Text style={estilos.label}>cidade:</Text>
<TextInput
style={estilos.input}
placeholder="Digite sua cidade"
placeholderTextColor="#8b72f1"
value={perfil.cidade}
onChangeText={(valor) => atualizarCampo('cidade', valor)}
editable={editando}
/>
<Text style={estilos.label}>estado:</Text>
<TextInput
style={estilos.input}
placeholder="Digite seu estado"
placeholderTextColor="#8b72f1"
value={perfil.estado}
onChangeText={(valor) => atualizarCampo('estado', valor)}
editable={editando}
/>
<Text style={estilos.label}>cep:</Text>
<TextInput
style={estilos.input}
placeholder="Digite seu CEP"
placeholderTextColor="#8b72f1"
value={perfil.cep}
onChangeText={(valor) => atualizarCampo('cep', valor)}
editable={editando}
keyboardType="numeric"
/>
<Text style={estilos.label}>telefone:</Text>
<TextInput
style={estilos.input}
placeholder="Digite seu telefone"
placeholderTextColor="#8b72f1"
value={perfil.telefone}
onChangeText={(valor) => atualizarCampo('telefone', valor)}
editable={editando}
keyboardType="phone-pad"
/>
<View style={estilos.buttonGroup}>
{editando ? (
<>
<TouchableOpacity
style={[estilos.button, estilos.primaryButton]}
onPress={salvarPerfil}
disabled={salvando}
>
<Text style={estilos.buttonText}>{salvando ? 'salvando...' : 'salvar'}</Text>
</TouchableOpacity>
<TouchableOpacity
style={[estilos.button, estilos.secondaryButton]}
onPress={() => setEditando(false)}
>
<Text style={estilos.secondaryButtonText}>cancelar</Text>
</TouchableOpacity>
</>
) : (
<TouchableOpacity
style={[estilos.button, estilos.primaryButton]}
onPress={() => setEditando(true)}
>
<Text style={estilos.buttonText}>editar perfil</Text>
</TouchableOpacity>
)}
</View>
</View>
</ScrollView>
<RodapeNavegacao navigation={navigation} />
</View>
);
}const estilos = StyleSheet.create({
tela: {
flex: 1,
backgroundColor: '#E8E0FF',
},
container: {
padding: 20,
paddingBottom: 30,
},
card: {
backgroundColor: '#F5EEFF',
borderRadius: 32,
padding: 22,
shadowColor: '#7B61FF',
shadowOffset: { width: 0, height: 12 },
shadowOpacity: 0.08,
shadowRadius: 16,
elevation: 5,
},
titulo: {
fontSize: 28,
fontWeight: '700',
marginBottom: 20,
textAlign: 'center',
color: '#2D0F68',
textTransform: 'lowercase',
},
topRow: {
flexDirection: 'row',
alignItems: 'flex-start',
},
avatarWrapper: {
width: 132,
height: 132,
borderRadius: 28,
borderWidth: 2,
borderColor: '#8B72F1',
backgroundColor: '#FFFFFF',
justifyContent: 'center',
alignItems: 'center',
},
avatarContainer: {
width: 120,
height: 120,
borderRadius: 24,
justifyContent: 'center',
alignItems: 'center',
},
avatar: {
width: 120,
height: 120,
borderRadius: 24,
},
avatarVazio: {
backgroundColor: '#F0ECFF',
justifyContent: 'center',
alignItems: 'center',
paddingHorizontal: 10,
},
avatarTexto: {
color: '#6A4BFF',
fontSize: 14,
fontWeight: '600',
textAlign: 'center',
},
avatarIcon: {
color: '#6A4BFF',
fontSize: 28,
marginTop: 8,
},
fieldsColumn: {
flex: 1,
marginLeft: 16,
},
label: {
fontSize: 13,
fontWeight: '600',
color: '#5C3BBA',
marginBottom: 6,
},
input: {
backgroundColor: '#F4E8FF',
borderRadius: 24,
paddingVertical: 14,
paddingHorizontal: 18,
marginBottom: 16,
fontSize: 16,
color: '#2C1A62',
},
buttonGroup: {
marginTop: 10,
},
button: {
paddingVertical: 16,
borderRadius: 24,
alignItems: 'center',
marginBottom: 12,
},
primaryButton: {
backgroundColor: '#6F4DFF',
},
secondaryButton: {
backgroundColor: '#FFFFFF',
borderWidth: 1,
borderColor: '#6F4DFF',
},
buttonText: {
color: '#FFFFFF',
fontSize: 16,
fontWeight: '700',
textTransform: 'uppercase',
},
secondaryButtonText: {
color: '#6F4DFF',
fontSize: 16,
fontWeight: '700',
textTransform: 'uppercase',
},
centralizado: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},
espaco: {
height: 10,
},
});
