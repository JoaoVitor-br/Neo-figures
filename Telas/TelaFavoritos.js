import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import RodapeNavegacao from './RodapeNavegacao';

const FAVS = [
  { id: '1', nome: 'Action Figure Mario Bros', preco: 'R$ 67,00', img: 'https://images.unsplash.com/photo-1601987177651-8edfe6c20009?w=150' },
];

export default function TelaFavoritos({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Favoritos</Text>
      {FAVS.length > 0 ? (
        <FlatList
          data={FAVS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardFav}>
              <Image source={{ uri: item.img }} style={styles.imgFav} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.nomeFav}>{item.nome}</Text>
                <Text style={styles.precoFav}>{item.preco}</Text>
              </View>
              <Text style={{ color: '#94a3b8', fontSize: 18 }}>❤️</Text>
            </View>
          )}
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
  cardFav: { backgroundColor: '#fff', p: 12, borderRadius: 12, flexDirection: 'row', padding: 12, alignItems: 'center', elevation: 1, marginBottom: 10 },
  imgFav: { width: 60, height: 60, resizeMode: 'contain' },
  nomeFav: { fontSize: 14, fontWeight: '600', color: '#334155' },
  precoFav: { fontSize: 14, fontWeight: 'bold', color: '#e11d48', marginTop: 2 },
  vazio: { textAlign: 'center', color: '#64748b', marginTop: 40 }
});
