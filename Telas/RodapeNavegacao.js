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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconeNav} onPress={() => navegar('Favoritos')}>
        <Image source={iconeFavoritos} style={styles.iconeImagem} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconeNavCentral} onPress={() => navegar('Carrinho')}>
        <Image source={iconeCarrinho} style={styles.iconeImagemCentral} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconeNav} onPress={() => navegar('Admin')}>
        <Image source={iconeAdmin} style={styles.iconeImagem} resizeMode="contain" />
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
});
