import React, { useState } from 'react';
import {View,Text,Image,StyleSheet,ScrollView,TouchableOpacity,Dimensions,Alert,SafeAreaView,
} from 'react-native';
import paleta from '../config/paletaCores';
import RodapeNavegacao from './RodapeNavegacao';

const { width } = Dimensions.get('window'); export default function TelaDetalheProduto({ route, navigation }) {
    const { produto } = route.params;
    const Descricao = produto.Descricao || produto.Descrição || 'Nenhuma descrição disponível para este produto.';
    const [quantidade, setQuantidade] = useState(1);
    const [imagemAtiva, setImagemAtiva] = useState(0);// Garantir que temos 3 fotos para o carrossel usando fallbacks se necessário
    const fotos = [
        produto.Foto,
        produto.Foto2 || produto.Foto,
        produto.Foto3 || produto.Foto,
    ]; const aoMudarSlide = (event) => {
        const scrollOffset = event.nativeEvent.contentOffset.x;
        const slide = Math.round(scrollOffset / width);
        setImagemAtiva(slide);
    }; const incrementar = () => {
        setQuantidade((antigo) => antigo + 1);
    }; const decrementar = () => {
        if (quantidade > 1) {
            setQuantidade((antigo) => antigo - 1);
        }
    }; const parsePreco = (valor) => {
        if (valor == null || valor === '') return 0;
        const texto = typeof valor === 'number' ? valor.toString() : valor.toString();
        const limpo = texto
            .replace(/\s/g, '')
            .replace('R$', '')
            .replace(/[^0-9,.-]/g, '')
            .replace(',', '.');
        const num = parseFloat(limpo);
        return Number.isFinite(num) ? num : 0;
    };
    const formatarMoeda = (valor) => {
        const num = parsePreco(valor);
        return `R$ ${num.toFixed(2).replace('.', ',')}`;
    };
    const precoNumerico = parsePreco(produto.Preço);
    const precoNormalNumerico = produto.ValorNormal
        ? parsePreco(produto.ValorNormal)
        : 0; const total = precoNumerico * quantidade; const adicionarAoCarrinho = () => {
            Alert.alert(
                'Adicionado ao Carrinho!',
                `Sucesso! Adicionado ao carrinho:\n\n🛍️ ${produto.Produto}\n🔢 Quantidade: ${quantidade}x\n💰 Valor Total: ${formatarMoeda(total)}`,
                [
                    {
                        text: 'Continuar Comprando',
                        onPress: () => navigation.goBack(),
                        style: 'cancel',
                    },
                    {
                        text: 'Ir para o Carrinho',
                        onPress: () => {
                            Alert.alert('Funcionalidade Futura', 'O fluxo do carrinho está em desenvolvimento!');
                        },
                    },
                ]
            );
        };// Calcular desconto percentual se não estiver preenchido mas temos ValorNormal e Preço
    let descontoTexto = produto.Desconto;
    if (!descontoTexto && precoNormalNumerico > 0 && precoNumerico > 0 && precoNormalNumerico > precoNumerico) {
        const perc = Math.round(((precoNormalNumerico - precoNumerico) / precoNormalNumerico) * 100);
        descontoTexto = `${perc}%`;
    } return (
        <SafeAreaView style={estilos.container}>
            <ScrollView contentContainerStyle={estilos.scrollContainer}>
                {/* Carrossel de Imagens */}
                <View style={estilos.carouselContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={aoMudarSlide}
                        scrollEventThrottle={16}
                        style={estilos.carousel}
                    >
                        {fotos.map((foto, index) => {
                            const fonteImagem = typeof foto === 'string' ? { uri: foto } : foto;
                            return (
                                <Image
                                    key={index}
                                    source={fonteImagem}
                                    style={estilos.imagemSlide}
                                    resizeMode="contain"
                                />
                            );
                        })}
                    </ScrollView>{/* Indicador de Páginas (Dots) */}
                    <View style={estilos.paginacaoContainer}>
                        {fotos.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    estilos.dot,
                                    imagemAtiva === index ? estilos.dotAtivo : estilos.dotInativo,
                                ]}
                            />
                        ))}
                    </View>{/* Selo de desconto */}
                    {descontoTexto ? (
                        <View style={estilos.badgeDesconto}>
                            <Text style={estilos.textoBadgeDesconto}>{descontoTexto} OFF</Text>
                        </View>
                    ) : null}
                </View>{/* Detalhes do Produto */}
                <View style={estilos.detalhesContainer}>
                    <Text style={estilos.nome}>{produto.Produto}</Text>
                    {produto.Descricao ? (
                        <Text style={estilos.descricao}>{produto.Descricao}</Text>
                    ) : (
                        <Text style={[estilos.descricao, estilos.semDescricao]}>
                            Nenhuma descrição disponível para este produto.
                        </Text>
                    )}{/* Linha de Preços */}
                    <View style={estilos.blocoPreco}>
                        {produto.ValorNormal ? (
                            <Text style={estilos.precoNormal}>{formatarMoeda(produto.ValorNormal)}</Text>
                        ) : null}
                        <View style={estilos.linhaPrecoVenda}>
                            <Text style={estilos.precoVenda}>{formatarMoeda(produto.Preço)}</Text>
                            {produto.ValorDesconto ? (
                                <Text style={estilos.economizeBadge}>
                                    Economize {formatarMoeda(produto.ValorDesconto)}
                                </Text>
                            ) : null}
                        </View>
                    </View><View style={estilos.divisor} />{/* Seletor de Quantidade */}
                    <View style={estilos.secaoQuantidade}>
                        <View>
                            <Text style={estilos.tituloQuantidade}>Quantidade</Text>
                            <Text style={estilos.subtituloQuantidade}>Selecione quantas unidades deseja</Text>
                        </View>
                        <View style={estilos.contadorContainer}>
                            <TouchableOpacity
                                style={[estilos.botaoContador, quantidade === 1 && estilos.botaoContadorDesativado]}
                                onPress={decrementar}
                                disabled={quantidade === 1}
                            >
                                <Text style={estilos.textoBotaoContador}>-</Text>
                            </TouchableOpacity>
                            <Text style={estilos.quantidadeTexto}>{quantidade}</Text>
                            <TouchableOpacity style={estilos.botaoContador} onPress={incrementar}>
                                <Text style={estilos.textoBotaoContador}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View><View style={estilos.divisor} />{/* Resumo e Botão de Comprar */}
                    <View style={estilos.footer}>
                        <View style={estilos.blocoTotal}>
                            <Text style={estilos.tituloTotal}>Subtotal</Text>
                            <Text style={estilos.valorTotal}>{formatarMoeda(total)}</Text>
                        </View><TouchableOpacity style={estilos.botaoCarrinho} onPress={adicionarAoCarrinho}>
                            <Text style={estilos.textoBotaoCarrinho}>🛒 Comprar agora</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <RodapeNavegacao navigation={navigation} />
        </SafeAreaView>
    );
} const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: paleta.white,
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: paleta.background,
    },
    carouselContainer: {
        position: 'relative',
        height: 320,
        backgroundColor: paleta.black,
    },
    carousel: {
        width: width,
        height: 320,
    },
    imagemSlide: {
        width: width,
        height: 320,
        alignSelf: 'center',
    },
    paginacaoContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    dotAtivo: {
        backgroundColor: paleta.primary,
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    dotInativo: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    badgeDesconto: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
        backgroundColor: paleta.danger,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    textoBadgeDesconto: {
        color: paleta.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    detalhesContainer: {
        backgroundColor: paleta.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -16,
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    nome: {
        fontSize: 22,
        fontWeight: 'bold',
        color: paleta.text,
        marginBottom: 10,
        lineHeight: 28,
    },
    descricao: {
        fontSize: 15,
        color: paleta.muted,
        lineHeight: 22,
        marginBottom: 20,
    },
    semDescricao: {
        fontStyle: 'italic',
        color: paleta.mutedLight,
    },
    blocoPreco: {
        backgroundColor: paleta.surfaceLight,
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    precoNormal: {
        fontSize: 14,
        color: paleta.muted,
        textDecorationLine: 'line-through',
        marginBottom: 4,
    },
    linhaPrecoVenda: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    precoVenda: {
        fontSize: 26,
        fontWeight: 'bold',
        color: paleta.text,
        marginRight: 12,
    },
    economizeBadge: {
        fontSize: 12,
        color: paleta.success,
        fontWeight: 'bold',
        backgroundColor: paleta.successLight,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    divisor: {
        height: 1,
        backgroundColor: paleta.divider,
        marginVertical: 16,
    },
    secaoQuantidade: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tituloQuantidade: {
        fontSize: 16,
        fontWeight: 'bold',
        color: paleta.text,
    },
    subtituloQuantidade: {
        fontSize: 12,
        color: paleta.muted,
        marginTop: 2,
    },
    contadorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: paleta.surfaceLight,
        borderRadius: 30,
        padding: 4,
        borderWidth: 1,
        borderColor: paleta.disabled,
    },
    botaoContador: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: paleta.white,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    botaoContadorDesativado: {
        backgroundColor: paleta.disabled,
        opacity: 0.5,
    },
    textoBotaoContador: {
        fontSize: 20,
        fontWeight: 'bold',
        color: paleta.text,
    },
    quantidadeTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        color: paleta.text,
        minWidth: 44,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    blocoTotal: {
        flex: 1,
    },
    tituloTotal: {
        fontSize: 13,
        color: paleta.muted,
        fontWeight: '600',
    },
    valorTotal: {
        fontSize: 24,
        fontWeight: 'bold',
        color: paleta.success,
        marginTop: 2,
    },
    botaoCarrinho: {
        backgroundColor: paleta.primary,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    textoBotaoCarrinho: {
        color: paleta.white,
        fontSize: 15,
        fontWeight: 'bold',
    },
});