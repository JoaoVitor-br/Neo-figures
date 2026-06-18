import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { autenticacao, bancoDados } from '../config/firebaseConfig';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import RodapeNavegacao from './RodapeNavegacao';

export default function TelaFavoritos({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const produtosRef = collection(bancoDados, 'produtos');
    const unsubscribe = onSnapshot(
      produtosRef,
      (querySnapshot) => {
        const lista = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const isFavorito = data.favorito === true || data.Favorito === true || data.fav === true;
          if (isFavorito) {
            lista.push({ id: docSnap.id, ...data });
          }
        });
        setFavoritos(lista);
        setCarregando(false);
      },
      (erro) => {
        console.error('Erro ao carregar favoritos:', erro);
        setCarregando(false);
      }
    );

    return unsubscribe;
  }, []);

  const toggleFavorito = async (item) => {
    const produtoRef = doc(bancoDados, 'produtos', item.id);
    const valorAtual = item.favorito === true || item.Favorito === true || item.fav === true;
    try {
      await updateDoc(produtoRef, { favorito: !valorAtual });
    } catch (erro) {
      console.error('Erro ao atualizar favorito:', erro);
    }
  };

  const renderItem = ({ item }) => {
    const imagem = item.Foto || item.imagem || item.Foto2 || item.Foto3 || item.img;
    const nome = item.Produto || item.nome || item.title || 'Produto';
    const preco = item.Preço || item.preco || item.price || 'R$ 0,00';

    return (
      <View style={styles.cardFav}>
        <Image source={imagem ? { uri: imagem } : require('../imagens/CoisaTeto-03.webp')} style={styles.imgFav} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.nomeFav}>{nome}</Text>
          <Text style={styles.precoFav}>{preco}</Text>
        </View>
        <TouchableOpacity style={styles.favoritoBadge} onPress={() => toggleFavorito(item)}>
          <Text style={styles.favoritoTexto}>❤️</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Favoritos</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#6f4dff" />
      ) : favoritos.length > 0 ? (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.vazio}>Nenhum item favoritado.</Text>
      )}
      <RodapeNavegacao navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 15 },
  cardFav: { backgroundColor: '#fff', borderRadius: 12, flexDirection: 'row', padding: 12, alignItems: 'center', elevation: 1, marginBottom: 10 },
  imgFav: { width: 60, height: 60, resizeMode: 'contain', borderRadius: 10, backgroundColor: '#f3f4f6' },
  nomeFav: { fontSize: 14, fontWeight: '600', color: '#334155' },
  precoFav: { fontSize: 14, fontWeight: 'bold', color: '#e11d48', marginTop: 2 },
  vazio: { textAlign: 'center', color: '#64748b', marginTop: 40 }
});
