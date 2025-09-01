import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    ScrollView
} from 'react-native';
import Footer from '../components/Footer';

const AvaliacaoPaciente = ({ navigation, route }) => {
    const { paciente } = route.params;

    const handleAnamnese = () => {
        navigation.navigate('Anamnese', { paciente });
    };

    const handleExamesFisicos = () => {
        Alert.alert(
            'Exames Físicos',
            'Funcionalidade em desenvolvimento.\n\nConteúdo: Exame Físico Geral, Avaliação Neurológica, Avaliação Cardiovascular',
            [{ text: 'OK', style: 'default' }]
        );
    };

    const handleExamesComplementares = () => {
        Alert.alert(
            'Exames Complementares',
            'Funcionalidade em desenvolvimento.\n\nConteúdo: Exames Solicitados, Resultados, Imagens',
            [{ text: 'OK', style: 'default' }]
        );
    };

    const handleDashboard = () => {
        Alert.alert(
            'Dashboard',
            'Funcionalidade em desenvolvimento.\n\nConteúdo: Resumo da Avaliação, Hipótese Diagnóstica, Conduta, Prescrições',
            [{ text: 'OK', style: 'default' }]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {/* Informações do Paciente */}
                <View style={styles.pacienteInfo}>
                    <Text style={styles.pacienteNome}>{paciente.nome}</Text>
                    <Text style={styles.pacienteProntuario}>Prontuário: {paciente.prontuario}</Text>
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

                    <TouchableOpacity style={styles.menuButton} onPress={handleExamesFisicos}>
                        <Text style={styles.menuIcon}>👨‍⚕️</Text>
                        <Text style={styles.menuTitle}>Exames Físicos</Text>
                        <Text style={styles.menuDescription}>
                            Exame físico geral e avaliações específicas
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuButton} onPress={handleExamesComplementares}>
                        <Text style={styles.menuIcon}>🔬</Text>
                        <Text style={styles.menuTitle}>Exames Complementares</Text>
                        <Text style={styles.menuDescription}>
                            Exames laboratoriais, imagens e outros complementares
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuButton} onPress={handleDashboard}>
                        <Text style={styles.menuIcon}>📊</Text>
                        <Text style={styles.menuTitle}>Dashboard</Text>
                        <Text style={styles.menuDescription}>
                            Resumo completo, hipótese diagnóstica e conduta
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
});

export default AvaliacaoPaciente;
