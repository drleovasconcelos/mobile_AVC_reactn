import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import Footer from '../components/Footer';

const BuscarAvaliacao = ({ navigation, route }) => {
    const { paciente } = route.params || {};

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

            <View style={styles.content}>
                <View style={styles.placeholderContainer}>
                    <Text style={styles.placeholderIcon}>🔍</Text>
                    <Text style={styles.placeholderTitle}>Buscar Avaliação</Text>
                    <Text style={styles.placeholderDescription}>
                        Esta tela será implementada para buscar avaliações salvas do paciente.
                    </Text>
                    
                    {paciente && (
                        <View style={styles.pacienteInfo}>
                            <Text style={styles.pacienteLabel}>Paciente:</Text>
                            <Text style={styles.pacienteNome}>{paciente.nome}</Text>
                            <Text style={styles.pacienteProntuario}>
                                Prontuário: {paciente.prontuario}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    placeholderContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: '100%',
        maxWidth: 400,
    },
    placeholderIcon: {
        fontSize: 64,
        marginBottom: 20,
    },
    placeholderTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 10,
        textAlign: 'center',
    },
    placeholderDescription: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
    },
    pacienteInfo: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 15,
        width: '100%',
        borderWidth: 1,
        borderColor: '#e9ecef',
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
});

export default BuscarAvaliacao;
