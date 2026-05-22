import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

const produtos = [
  { id: '1', nome: 'Nome do produto', preco: 'R$67,00', imagem: 'https://images.unsplash.com/photo-1584251050232-f1c070a4ca6c?auto=format&fit=crop&w=800&q=80' },
  { id: '2', nome: 'Nome do produto', preco: 'R$67,00', imagem: 'https://images.unsplash.com/photo-1616628182805-bd5f5f537f71?auto=format&fit=crop&w=800&q=80' },
  { id: '3', nome: 'Nome do produto', preco: 'R$67,00', imagem: 'https://images.unsplash.com/photo-1595535878079-4dbb2a678481?auto=format&fit=crop&w=800&q=80' },
  { id: '4', nome: 'Nome do produto', preco: 'R$67,00', imagem: 'https://images.unsplash.com/photo-1600172454585-e05c3e99c30f?auto=format&fit=crop&w=800&q=80' },
  { id: '5', nome: 'Nome do produto', preco: 'R$67,00', imagem: 'https://images.unsplash.com/photo-1602526216487-7d29d18ad215?auto=format&fit=crop&w=800&q=80' },
  { id: '6', nome: 'Nome do produto', preco: 'R$67,00', imagem: 'https://images.unsplash.com/photo-1616628191050-1051b3f0eae1?auto=format&fit=crop&w=800&q=80' },
];

export default function TelaHome() {
  const fazerLogout = () => {
    signOut(autenticacao);
  };

  const Linha = ({ nome, preco, imagem }) => (
    <View style={estilos.cardProduto}>
      <Image source={{ uri: imagem }} style={estilos.imagemProduto} />
      <View style={estilos.rodapeProduto}>
        <View>
          <Text style={estilos.nomeProduto}>{nome}</Text>
          <Text style={estilos.precoProduto}>{preco}</Text>
        </View>
        <View style={estilos.favoritoBadge}>
          <Text style={estilos.favoritoTexto}>💗</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Neo Figures</Text>
      <View style={estilos.areaProdutos}>
        <FlatList
          data={produtos}
          renderItem={({ item }) => <Linha {...item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={estilos.linhaCards}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={estilos.bottomBar}>
        <TouchableOpacity style={estilos.iconeNav}>
          <Text style={estilos.iconeTexto}>♥</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.iconeNavCentral}>
          <Text style={estilos.iconeTexto}>🛒</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.iconeNav}>
          <Text style={estilos.iconeTexto}>📦</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={estilos.botaoSair} onPress={fazerLogout}>
        <Text style={estilos.botaoSairTexto}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4FF',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 22,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#7F5CFF',
    marginBottom: 16,
  },
  areaProdutos: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ECE3FF',
    borderRadius: 28,
    padding: 16,
  },
  linhaCards: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cardProduto: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '48%',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#7F5CFF',
    shadowColor: '#7F5CFF',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  imagemProduto: {
    width: '100%',
    height: 120,
  },
  rodapeProduto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  nomeProduto: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D0D1A',
  },
  precoProduto: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '800',
    color: '#0D0D1A',
  },
  favoritoBadge: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: '#FFE6F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoritoTexto: {
    fontSize: 16,
  },
  bottomBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 14,
    backgroundColor: '#7F5CFF',
    borderRadius: 24,
  },
  iconeNav: {
    padding: 10,
  },
  iconeNavCentral: {
    padding: 10,
    backgroundColor: '#0D0D1A',
    borderRadius: 16,
  },
  iconeTexto: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  botaoSair: {
    marginTop: 12,
    backgroundColor: '#FF8C42',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
  },
  botaoSairTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});