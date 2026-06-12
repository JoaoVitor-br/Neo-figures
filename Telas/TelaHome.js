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
import paleta from '../config/paletaCores';

const produtos = [
  { id: '1', nome: 'Coisa Teto', preco: 'R$67,00', imagem: require('../imagens/CoisaTeto-03.webp') },
  { id: '2', nome: 'Fallout Toy', preco: 'R$67,00', imagem: require('../imagens/falloutToy-01.jpg') },
  { id: '3', nome: 'Funko Steven', preco: 'R$67,00', imagem: require('../imagens/funkoSteven-04.png') },
  { id: '4', nome: 'Mangle', preco: 'R$67,00', imagem: require('../imagens/Mangle-05.jpg') },
  { id: '5', nome: 'Sayori', preco: 'R$67,00', imagem: require('../imagens/Sayori-06.jpg') },
  { id: '6', nome: 'Silksong', preco: 'R$67,00', imagem: require('../imagens/silksong.png') },
  { id: '7', nome: 'Aang', preco: 'R$67,00', imagem: require('../imagens/aange.webp') },
  { id: '8', nome: 'Zumbi Fallout', preco: 'R$67,00', imagem: require('../imagens/zumbiFallout-02.png') },

];

export default function TelaHome({ navigation }) {
  const fazerLogout = () => {
    signOut(autenticacao);
  };

  const Linha = ({ nome, preco, imagem }) => (
    <TouchableOpacity
      style={estilos.cardProduto}
      onPress={() =>
        navigation.navigate('Detalhe', {
          produto: {
            Produto: nome,
            Preço: preco,
            Foto: imagem,
          },
        })
      }
    >
      <View style={estilos.produto}>
        <Image source={imagem} style={estilos.imagemProduto} resizeMode="cover" />
      </View>
      <View style={estilos.rodapeProduto}>
        <View>
          <Text style={estilos.nomeProduto}>{nome}</Text>
          <Text style={estilos.precoProduto}>{preco}</Text>
        </View>
        <View style={estilos.favoritoBadge}>
          <Text style={estilos.favoritoTexto}>💗</Text>
        </View>
      </View>
    </TouchableOpacity>
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
    backgroundColor: paleta.background,
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 22,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: paleta.primary,
    marginBottom: 16,
  },
  areaProdutos: {
    flex: 1,
    width: '100%',
    backgroundColor: paleta.surface,
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
    borderColor: paleta.primary,
    shadowColor: paleta.primary,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  produto: {
    height: 160,
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
  },
  imagemProduto: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 300,
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
    backgroundColor: paleta.primary,
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
    color: paleta.white,
  },
  botaoSair: {
    marginTop: 12,
    backgroundColor: paleta.accent || '#FF8C42',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
  },
  botaoSairTexto: {
    color: paleta.white,
    fontWeight: '700',
    fontSize: 16,
  },
});