import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import paleta from '../config/paletaCores';

const iconeFavoritos = require('../imagens/icons/solar_heart-bold.png');
const iconeCarrinho = require('../imagens/icons/material-symbols_shopping-cart-rounded.png');
const iconeAdmin = require('../imagens/icons/Frame.png');

export default function RodapeNavegacao({ navigation }) {
  const navegar = (rota) => {
    if (rota === 'Carrinho') {
      Alert.alert('Em breve', 'O carrinho ainda não está implementado.');
      return;
    }

    if (navigation && navigation.navigate) {
      navigation.navigate(rota);
    }
  };

  // Determinar rota ativa a partir do estado de navegação
  const state = navigation && navigation.getState ? navigation.getState() : null;
  const rotaAtiva = state && state.routes && typeof state.index === 'number' ? state.routes[state.index].name : null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.iconeNav, rotaAtiva === 'Favoritos' ? styles.iconeAtivo : null]}
        onPress={() => navegar('Favoritos')}
      >
        <Image
          source={iconeFavoritos}
          style={[styles.iconeImagem, rotaAtiva === 'Favoritos' ? styles.iconeImagemAtivo : null]}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.iconeNavCentral,
          // mudar o background do carrinho quando não estivermos na 'Home'
          rotaAtiva && rotaAtiva !== 'Home' ? { backgroundColor: paleta.primary } : null,
          // agora o ícone central representa a Home
          rotaAtiva === 'Home' ? styles.iconeAtivoCentral : null,
        ]}
        onPress={() => navegar('Home')}
      >
        <Image
          source={iconeCarrinho}
          style={[styles.iconeImagemCentral, rotaAtiva === 'Home' ? styles.iconeImagemAtivoCentral : null]}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.iconeNav, rotaAtiva === 'Admin' ? styles.iconeAtivo : null]}
        onPress={() => navegar('Admin')}
      >
        <Image
          source={iconeAdmin}
          style={[styles.iconeImagem, rotaAtiva === 'Admin' ? styles.iconeImagemAtivo : null]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: paleta.black,
    borderRadius: 16,
  },
  iconeAtivo: {
    backgroundColor: paleta.white,
    borderRadius: 12,
    padding: 6,
  },
  iconeAtivoCentral: {
    backgroundColor: paleta.primaryDark,
    borderRadius: 16,
  },
  iconeImagem: {
    width: 24,
    height: 24,
    tintColor: paleta.white,
  },
  iconeImagemAtivo: {
    tintColor: paleta.primary,
  },
  iconeImagemCentral: {
    width: 30,
    height: 30,
    tintColor: paleta.white,
  },
  iconeImagemAtivoCentral: {
    tintColor: paleta.white,
  },
});
