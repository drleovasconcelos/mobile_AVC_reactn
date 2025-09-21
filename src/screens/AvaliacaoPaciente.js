import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';
import Footer from '../components/Footer';
import ModalSalvarAvaliacao from '../components/ModalSalvarAvaliacao';
import ListaAvaliacoes from '../components/ListaAvaliacoes';
import { 
    createAvaliacaoData, 
    salvarAvaliacao, 
    validarDadosAvaliacao 
} from '../services/AvaliacaoStorage';

const AvaliacaoPaciente = ({ navigation, route }) => {
    const { paciente } = route.params || {};
    
    console.log('AvaliacaoPaciente renderizada com paciente:', paciente);
    
    // Se não há paciente, mostrar mensagem de erro
    if (!paciente) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Paciente não encontrado</Text>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.navigate('ListaPacientes')}
                    >
                        <Text style={styles.backButtonText}>Voltar para Lista</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
    
    // Estados para o sistema de persistência
    const [modalSalvarVisible, setModalSalvarVisible] = useState(false);
    const [modalListaVisible, setModalListaVisible] = useState(false);
    const [salvando, setSalvando] = useState(false);

    const handleAnamnese = () => {
        navigation.navigate('Anamnese', { paciente });
    };

    const handleExamesFisicos = () => {
        navigation.navigate('ExameFisico', { paciente });
    };

    const handleExamesComplementares = () => {
        navigation.navigate('ExamesComplementares', { paciente });
    };

    const handleDashboard = () => {
        navigation.navigate('Dashboard', { paciente });
    };

    const handleEscalasHospitalares = () => {
        navigation.navigate('EscalasHospitalares', { paciente });
    };

    // Funções para o sistema de persistência
    const handleSalvarAvaliacao = async (nomeAvaliacao) => {
        try {
            setSalvando(true);
            
            // Criar dados da avaliação (simulados para demonstração)
            const dadosAvaliacao = createAvaliacaoData({
                // Dados simulados - em uma implementação real, estes dados viriam dos Contexts
                anamnese: {},
                exameFisico: {},
                examesComplementares: {}
            }, nomeAvaliacao, 0, 'Regular', paciente);

            // Validar dados
            if (!validarDadosAvaliacao(dadosAvaliacao)) {
                Alert.alert('Erro', 'Dados da avaliação inválidos');
                return;
            }

            // Salvar avaliação
            await salvarAvaliacao(dadosAvaliacao);
            
            setModalSalvarVisible(false);
            Alert.alert('Sucesso!', 'Avaliação salva com sucesso!');
            
        } catch (error) {
            console.error('Erro ao salvar avaliação:', error);
            Alert.alert('Erro', 'Erro ao salvar a avaliação. Tente novamente.');
        } finally {
            setSalvando(false);
        }
    };

    const handleCarregarAvaliacao = (avaliacao) => {
        setModalListaVisible(false);
        Alert.alert(
            'Avaliação Carregada',
            `Avaliação "${avaliacao.nomeAvaliacao}" carregada com sucesso!`,
            [
                { text: 'OK', onPress: () => {
                    // Aqui você pode implementar a lógica para carregar os dados da avaliação
                    console.log('Avaliação carregada:', avaliacao);
                }}
            ]
        );
    };

    const handleAbrirModalSalvar = () => {
        setModalSalvarVisible(true);
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {/* Informações do Paciente */}
                <View style={styles.pacienteInfo}>
                    <Text style={styles.pacienteNome}>{paciente.nome}</Text>
                    <Text style={styles.pacienteProntuario}>Prontuário: {paciente.prontuario}</Text>
                </View>
                
                {/* Botões de Ação */}
                <View style={styles.headerActions}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.buscarButton]}
                        onPress={() => navigation.navigate('BuscarAvaliacao', { paciente })}
                    >
                        <Text style={styles.buscarButtonText}>🔍 Buscar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={[styles.actionButton, styles.salvarButton]}
                        onPress={handleAbrirModalSalvar}
                        disabled={salvando}
                    >
                        {salvando ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <Text style={styles.salvarButtonText}>💾 Salvar</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView 
                style={styles.content} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.title}>Avaliação do Paciente</Text>
                <Text style={styles.subtitle}>Selecione uma opção para continuar</Text>

                {/* Botões de Avaliação */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.menuButton} onPress={handleAnamnese}>
                        <Text style={styles.menuIcon}>📋</Text>
                        <Text style={styles.menuTitle}>Anamnese</Text>
                        <Text style={styles.menuDescription}>
                            Queixa principal, história da doença atual e sinais vitais
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <TouchableOpacity style={styles.menuButton} onPress={handleExamesFisicos}>
                        <Text style={styles.menuIcon}>👨‍⚕️</Text>
                        <Text style={styles.menuTitle}>Exames Físicos</Text>
                        <Text style={styles.menuDescription}>
                            Exame físico geral e avaliações específicas
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <TouchableOpacity style={styles.menuButton} onPress={handleExamesComplementares}>
                        <Text style={styles.menuIcon}>🔬</Text>
                        <Text style={styles.menuTitle}>Exames Complementares</Text>
                        <Text style={styles.menuDescription}>
                            Exames laboratoriais, imagens e outros complementares
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <TouchableOpacity style={styles.menuButton} onPress={handleEscalasHospitalares}>
                        <Text style={styles.menuIcon}>📏</Text>
                        <Text style={styles.menuTitle}>Escalas Hospitalares</Text>
                        <Text style={styles.menuDescription}>
                            Escalas de avaliação e monitoramento hospitalar
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <TouchableOpacity style={styles.menuButton} onPress={handleDashboard}>
                        <Text style={styles.menuIcon}>📊</Text>
                        <Text style={styles.menuTitle}>Dashboard</Text>
                        <Text style={styles.menuDescription}>
                            Resumo completo, hipótese diagnóstica e conduta
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Modais para persistência */}
            <ModalSalvarAvaliacao
                visible={modalSalvarVisible}
                onClose={() => setModalSalvarVisible(false)}
                onSalvar={handleSalvarAvaliacao}
                salvando={salvando}
                paciente={paciente}
            />
            
            <ListaAvaliacoes
                visible={modalListaVisible}
                onClose={() => setModalListaVisible(false)}
                onCarregar={handleCarregarAvaliacao}
                paciente={paciente}
            />

            <Footer navigation={navigation} currentScreen="AvaliacaoPaciente" />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#007bff',
    },
    pacienteInfo: {
        flex: 1,
        alignItems: 'center',
    },
    pacienteNome: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
        textAlign: 'center',
    },
    pacienteProntuario: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
        textAlign: 'center',
    },
    headerActions: {
        flexDirection: 'row',
        gap: 10,
        marginLeft: 20,
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 80,
    },
    buscarButton: {
        backgroundColor: '#17a2b8',
    },
    buscarButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    salvarButton: {
        backgroundColor: '#28a745',
    },
    salvarButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingVertical: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#343a40',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonsContainer: {
        gap: 20,
    },
    menuButton: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 40,
        marginBottom: 15,
    },
    menuTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 8,
        textAlign: 'center',
    },
    menuDescription: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'center',
        lineHeight: 20,
    },
    separator: {
        height: 1,
        backgroundColor: '#e9ecef',
        marginVertical: 15,
        marginHorizontal: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#dc3545',
        marginBottom: 20,
        textAlign: 'center',
    },
    backButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AvaliacaoPaciente;
