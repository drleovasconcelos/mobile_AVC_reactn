import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import Footer from '../components/Footer';

const ExameFisico = ({ navigation, route }) => {
    const { paciente } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Exame Físico</Text>
                <Text style={styles.pacienteNome}>{paciente.nome}</Text>
                <Text style={styles.pacienteProntuario}>Prontuário: {paciente.prontuario}</Text>
            </View>

            {/* Conteúdo Principal */}
            <View style={styles.mainContent}>
                <Text style={styles.welcomeText}>Bem-vindo ao Exame Físico</Text>
                <Text style={styles.descriptionText}>
                    Esta tela está preparada para receber o conteúdo do exame físico.
                </Text>
                
                {/* Botão de Voltar */}
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>⬅️ Voltar para Anamnese</Text>
                </TouchableOpacity>
            </View>
            
            {/* Footer */}
            <Footer navigation={navigation} currentScreen="ExameFisico" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#007bff',
        padding: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    pacienteNome: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 5,
    },
    pacienteProntuario: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.8,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#343a40',
        textAlign: 'center',
        marginBottom: 15,
    },
    descriptionText: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    backButton: {
        backgroundColor: '#6c757d',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default ExameFisico;
