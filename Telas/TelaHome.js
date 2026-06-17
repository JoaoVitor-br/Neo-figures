import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { autenticacao, bancoDados } from '../config/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import paleta from '../config/paletaCores';
import RodapeNavegacao from './RodapeNavegacao';

export default function TelaHome({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const produtosRef = collection(bancoDados, 'produtos');
    const desinscrever = onSnapshot(
      produtosRef,
      (querySnapshot) => {
        const lista = [];
        querySnapshot.forEach((docSnap) => {
          lista.push({ id: docSnap.id, ...docSnap.data() });
        });
        setProdutos(lista);
        setCarregando(false);
      },
      (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        setCarregando(false);
      }
    );

    return desinscrever;
  }, []);

  const fazerLogout = () => {
    signOut(autenticacao);
  };

  const Linha = ({ item }) => (
    <TouchableOpacity
      style={estilos.cardProduto}
      onPress={() =>
        navigation.navigate('Detalhe', {
          produto: {
            Produto: item.Produto || item.nome || 'Produto',
            Preço: item.Preço || item.preco || 'R$0,00',
            Foto: item.Foto || item.imagem || item.Foto2 || item.Foto3 || item.Foto || undefined,
          },
        })
      }
    >
      <View style={estilos.produto}>
        <Image
          source={
            item.Foto
              ? { uri: item.Foto }
              : item.imagem
              ? item.imagem
              : require('../imagens/CoisaTeto-03.webp')
          }
          style={estilos.imagemProduto}
          resizeMode="cover"
        />
      </View>
      <View style={estilos.rodapeProduto}>
        <View>
          <Text style={estilos.nomeProduto}>{item.Produto || item.nome}</Text>
          <Text style={estilos.precoProduto}>{item.Preço || item.preco}</Text>
        </View>
        <View style={estilos.favoritoBadge}>
          <Image source={iconeFavoritos} style={estilos.iconeImagem} resizeMode="contain" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Neo Figures</Text>
      <View style={estilos.areaProdutos}>
        {carregando ? (
          <View style={estilos.centralizado}>
            <ActivityIndicator size="large" color={paleta.primary} />
            <Text style={estilos.carregandoTexto}>Carregando produtos...</Text>
          </View>
        ) : produtos.length === 0 ? (
          <View style={estilos.centralizado}>
            <Text style={estilos.semProdutosTexto}>Nenhum produto disponível.</Text>
          </View>
        ) : (
          <FlatList
            data={produtos}
            renderItem={(item) => <Linha {...item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={estilos.linhaCards}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <RodapeNavegacao navigation={navigation} />
      <TouchableOpacity style={estilos.botaoPerfil} onPress={() => navigation.navigate('Perfil')}>
        <Text style={estilos.botaoPerfilTexto}>Perfil</Text>
      </TouchableOpacity>
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
  centralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  carregandoTexto: {
    marginTop: 12,
    color: paleta.primary,
    fontSize: 16,
  },
  semProdutosTexto: {
    color: paleta.muted,
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
  iconeImagem: {
    width: 24,
    height: 24,
    tintColor: paleta.white,
  },
  iconeImagemCentral: {
    width: 30,
    height: 30,
    tintColor: paleta.white,
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
  botaoPerfil: {
    marginTop: 12,
    backgroundColor: paleta.primaryDark || '#6b46e7',
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  botaoPerfilTexto: {
    color: paleta.white,
    fontWeight: '700',
    fontSize: 15,
  },
});