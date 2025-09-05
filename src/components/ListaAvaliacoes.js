import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { 
    buscarTodasAvaliacoes, 
    buscarAvaliacoesPorNome, 
    deletarAvaliacao,
    formatarDataExibicao,
    obterCorStatus
} from '../services/AvaliacaoStorage';

const ListaAvaliacoes = ({ onCarregarAvaliacao, visible, onClose }) => {
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [termoBusca, setTermoBusca] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (visible) {
            carregarAvaliacoes();
        }
    }, [visible]);

    const carregarAvaliacoes = async () => {
        setLoading(true);
        try {
            const todasAvaliacoes = await buscarTodasAvaliacoes();
            setAvaliacoes(todasAvaliacoes);
        } catch (error) {
            console.error('Erro ao carregar avaliações:', error);
            Alert.alert('Erro', 'Erro ao carregar avaliações salvas.');
        } finally {
            setLoading(false);
        }
    };

    const buscarAvaliacoes = async (termo) => {
        setTermoBusca(termo);
        if (termo.trim() === '') {
            carregarAvaliacoes();
            return;
        }

        setLoading(true);
        try {
            const resultados = await buscarAvaliacoesPorNome(termo);
            setAvaliacoes(resultados);
        } catch (error) {
            console.error('Erro ao buscar avaliações:', error);
            Alert.alert('Erro', 'Erro ao buscar avaliações.');
        } finally {
            setLoading(false);
        }
    };

    const handleCarregar = (avaliacao) => {
        Alert.alert(
            'Carregar Avaliação',
            `Deseja carregar a avaliação "${avaliacao.nomeAvaliacao}"?\n\nIsso substituirá os dados atuais.`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Carregar', 
                    onPress: () => {
                        onCarregarAvaliacao(avaliacao);
                        onClose();
                    }
                }
            ]
        );
    };

    const handleDeletar = (avaliacao) => {
        Alert.alert(
            'Deletar Avaliação',
            `Deseja deletar a avaliação "${avaliacao.nomeAvaliacao}"?\n\nEsta ação não pode ser desfeita.`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Deletar', 
                    style: 'destructive',
                    onPress: async () => {
                        const resultado = await deletarAvaliacao(avaliacao.id);
                        if (resultado.success) {
                            Alert.alert('Sucesso', resultado.message);
                            carregarAvaliacoes();
                        } else {
                            Alert.alert('Erro', resultado.message);
                        }
                    }
                }
            ]
        );
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await carregarAvaliacoes();
        setRefreshing(false);
    };

    const renderAvaliacao = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                    {item.nomeAvaliacao}
                </Text>
                <Text style={styles.cardDate}>
                    {formatarDataExibicao(item.dataCriacao)}
                </Text>
            </View>

            <View style={styles.cardContent}>
                <View style={styles.cardInfo}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Pontuação:</Text>
                        <Text style={styles.infoValue}>{item.pontuacaoTotal}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Status:</Text>
                        <Text style={[styles.infoValue, { color: obterCorStatus(item.statusGeral) }]}>
                            {item.statusGeral}
                        </Text>
                    </View>
                </View>

                <View style={styles.cardActions}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.carregarButton]}
                        onPress={() => handleCarregar(item)}
                    >
                        <Text style={styles.carregarButtonText}>📂 Carregar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={[styles.actionButton, styles.deletarButton]}
                        onPress={() => handleDeletar(item)}
                    >
                        <Text style={styles.deletarButtonText}>🗑️ Deletar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📋</Text>
            <Text style={styles.emptyStateTitle}>
                {termoBusca ? 'Nenhuma avaliação encontrada' : 'Nenhuma avaliação salva'}
            </Text>
            <Text style={styles.emptyStateDescription}>
                {termoBusca 
                    ? 'Tente usar outros termos de busca.'
                    : 'Salve sua primeira avaliação para vê-la aqui.'
                }
            </Text>
        </View>
    );

    if (!visible) return null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>📚 Avaliações Salvas</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={termoBusca}
                    onChangeText={buscarAvaliacoes}
                    placeholder="Buscar avaliações salvas..."
                    placeholderTextColor="#6c757d"
                />
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007bff" />
                    <Text style={styles.loadingText}>Carregando avaliações...</Text>
                </View>
            ) : (
                <FlatList
                    data={avaliacoes}
                    renderItem={renderAvaliacao}
                    keyExtractor={(item) => item.id}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#343a40',
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6c757d',
    },
    searchContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#343a40',
        backgroundColor: '#fff',
    },
    listContainer: {
        padding: 20,
        flexGrow: 1,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#343a40',
        marginBottom: 4,
    },
    cardDate: {
        fontSize: 12,
        color: '#6c757d',
    },
    cardContent: {
        gap: 12,
    },
    cardInfo: {
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
    cardActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    carregarButton: {
        backgroundColor: '#007bff',
    },
    carregarButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    deletarButton: {
        backgroundColor: '#dc3545',
    },
    deletarButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
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

export default ListaAvaliacoes;
