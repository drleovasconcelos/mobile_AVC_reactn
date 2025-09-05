import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Alert,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import Footer from '../components/Footer';
import { 
    buscarTodasAvaliacoes, 
    formatarDataExibicao,
    obterCorStatus
} from '../services/AvaliacaoStorage';

const BuscarAvaliacao = ({ navigation, route }) => {
    const { paciente } = route.params || {};
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        carregarAvaliacoes();
    }, []);

    const carregarAvaliacoes = async () => {
        setLoading(true);
        try {
            const todasAvaliacoes = await buscarTodasAvaliacoes();
            // Filtrar avaliações do paciente específico se fornecido
            const avaliacoesFiltradas = paciente 
                ? todasAvaliacoes.filter(av => av.dadosAvaliacao?.paciente?.prontuario === paciente.prontuario)
                : todasAvaliacoes;
            
            // Agrupar por data e ordenar por data mais recente
            const avaliacoesAgrupadas = agruparAvaliacoesPorData(avaliacoesFiltradas);
            setAvaliacoes(avaliacoesAgrupadas);
        } catch (error) {
            console.error('Erro ao carregar avaliações:', error);
            Alert.alert('Erro', 'Erro ao carregar avaliações salvas.');
        } finally {
            setLoading(false);
        }
    };

    const agruparAvaliacoesPorData = (avaliacoes) => {
        const agrupadas = {};
        
        avaliacoes.forEach(avaliacao => {
            const data = new Date(avaliacao.dataCriacao);
            const dataFormatada = data.toLocaleDateString('pt-BR');
            
            if (!agrupadas[dataFormatada]) {
                agrupadas[dataFormatada] = {
                    data: dataFormatada,
                    dataCompleta: data,
                    avaliacoes: []
                };
            }
            
            agrupadas[dataFormatada].avaliacoes.push(avaliacao);
        });

        // Converter para array e ordenar por data (mais recente primeiro)
        return Object.values(agrupadas).sort((a, b) => b.dataCompleta - a.dataCompleta);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await carregarAvaliacoes();
        setRefreshing(false);
    };

    const handleCarregarAvaliacao = (avaliacao) => {
        Alert.alert(
            'Carregar Avaliação',
            `Deseja carregar a avaliação "${avaliacao.nomeAvaliacao}"?\n\nIsso substituirá os dados atuais.`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Carregar', 
                    onPress: () => {
                        // Aqui você pode implementar a lógica para carregar os dados da avaliação
                        console.log('Avaliação carregada:', avaliacao);
                        Alert.alert('Sucesso', 'Avaliação carregada com sucesso!');
                    }
                }
            ]
        );
    };

    const renderAvaliacao = ({ item: avaliacao }) => (
        <TouchableOpacity 
            style={styles.avaliacaoCard}
            onPress={() => handleCarregarAvaliacao(avaliacao)}
        >
            <View style={styles.avaliacaoHeader}>
                <Text style={styles.avaliacaoNome} numberOfLines={2}>
                    {avaliacao.nomeAvaliacao}
                </Text>
                <Text style={styles.avaliacaoHora}>
                    {new Date(avaliacao.dataCriacao).toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })}
                </Text>
            </View>
            
            <View style={styles.avaliacaoInfo}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Pontuação:</Text>
                    <Text style={styles.infoValue}>{avaliacao.pontuacaoTotal}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Status:</Text>
                    <Text style={[styles.infoValue, { color: obterCorStatus(avaliacao.statusGeral) }]}>
                        {avaliacao.statusGeral}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderDiaAvaliacao = ({ item: diaAvaliacao }) => (
        <View style={styles.diaContainer}>
            <View style={styles.diaHeader}>
                <Text style={styles.diaData}>{diaAvaliacao.data}</Text>
                <Text style={styles.diaContador}>
                    {diaAvaliacao.avaliacoes.length} avaliação(ões)
                </Text>
            </View>
            
            <FlatList
                data={diaAvaliacao.avaliacoes}
                renderItem={renderAvaliacao}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
            />
        </View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📋</Text>
            <Text style={styles.emptyStateTitle}>
                {paciente ? 'Nenhuma avaliação encontrada' : 'Nenhuma avaliação salva'}
            </Text>
            <Text style={styles.emptyStateDescription}>
                {paciente 
                    ? `Não há avaliações salvas para o paciente ${paciente.nome}.`
                    : 'Salve sua primeira avaliação para vê-la aqui.'
                }
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>← Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Buscar Avaliação</Text>
            </View>

            {paciente && (
                <View style={styles.pacienteInfo}>
                    <Text style={styles.pacienteLabel}>Paciente:</Text>
                    <Text style={styles.pacienteNome}>{paciente.nome}</Text>
                    <Text style={styles.pacienteProntuario}>
                        Prontuário: {paciente.prontuario}
                    </Text>
                </View>
            )}

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007bff" />
                    <Text style={styles.loadingText}>Carregando avaliações...</Text>
                </View>
            ) : (
                <FlatList
                    data={avaliacoes}
                    renderItem={renderDiaAvaliacao}
                    keyExtractor={(item) => item.data}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#007bff']}
                        />
                    }
                    ListEmptyComponent={renderEmptyState}
                />
            )}

            <Footer navigation={navigation} currentScreen="BuscarAvaliacao" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#007bff',
    },
    backButton: {
        marginRight: 15,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
    },
    pacienteInfo: {
        backgroundColor: '#fff',
        padding: 15,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    pacienteLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6c757d',
        marginBottom: 5,
    },
    pacienteNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 3,
    },
    pacienteProntuario: {
        fontSize: 14,
        color: '#6c757d',
    },
    listContainer: {
        padding: 20,
        flexGrow: 1,
    },
    diaContainer: {
        marginBottom: 20,
    },
    diaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    diaData: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    diaContador: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
    },
    avaliacaoCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    avaliacaoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    avaliacaoNome: {
        fontSize: 16,
        fontWeight: '600',
        color: '#343a40',
        flex: 1,
        marginRight: 10,
    },
    avaliacaoHora: {
        fontSize: 12,
        color: '#6c757d',
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    avaliacaoInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoItem: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: '#6c757d',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#343a40',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#6c757d',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyStateIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#343a40',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyStateDescription: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default BuscarAvaliacao;
