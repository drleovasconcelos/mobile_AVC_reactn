import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Footer from '../components/Footer';

const Anamnese = ({ navigation, route }) => {
    const { paciente } = route.params;
    
    // Estado para controlar quais seções estão expandidas
    const [expandedSections, setExpandedSections] = useState({});

    // Função para alternar o estado de expansão de uma seção
    const toggleSection = (sectionKey) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey]
        }));
    };

    // Dados das seções
    const sections = [
        {
            key: 'identificacao',
            title: '1. Identificação Pessoal',
            icon: '👤',
            content: 'Dados pessoais, documentos, contatos...'
        },
        {
            key: 'socioeconomicas',
            title: '2. Informações Socioeconômicas',
            icon: '🏠',
            content: 'Condições de moradia, trabalho, renda...'
        },
        {
            key: 'impressaoGeral',
            title: '3. Impressão Geral do Paciente (Contato Inicial)',
            icon: '👁️',
            content: 'Primeira impressão, aparência geral, estado de consciência...'
        },
        {
            key: 'queixaPrincipal',
            title: '4. Queixa Principal',
            icon: '💬',
            content: 'Motivo da consulta, sintomas principais...'
        },
        {
            key: 'historiaDoenca',
            title: '5. História da Doença Atual',
            icon: '📋',
            content: 'Evolução dos sintomas, duração, fatores agravantes...'
        },
        {
            key: 'historicoMedico',
            title: '6. Histórico Médico Pregresso',
            icon: '🏥',
            content: 'Doenças anteriores, cirurgias, internações...'
        },
        {
            key: 'historicoFamiliar',
            title: '7. Histórico Familiar',
            icon: '👨‍👩‍👧‍👦',
            content: 'Histórico de doenças na família, hereditariedade...'
        },
        {
            key: 'historicoPsicossocial',
            title: '8. Histórico Psicossocial',
            icon: '🧠',
            content: 'Histórico psicológico, social, hábitos de vida...'
        },
        {
            key: 'usoMedicamentos',
            title: '9. Uso de Medicamentos',
            icon: '💊',
            content: 'Medicamentos em uso, alergias, reações adversas...'
        },
        {
            key: 'impressaoDiagnostica',
            title: '10. Impressão Diagnóstica',
            icon: '🔍',
            content: 'Hipóteses diagnósticas, impressão clínica...'
        }
    ];

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
                <Text style={styles.title}>Anamnese</Text>
                <Text style={styles.subtitle}>Selecione uma seção para expandir</Text>
                
                {/* Seções Colapsáveis */}
                <View style={styles.sectionsContainer}>
                    {sections.map((section) => (
                        <View key={section.key} style={styles.sectionWrapper}>
                            <TouchableOpacity 
                                style={styles.sectionHeader}
                                onPress={() => toggleSection(section.key)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.sectionHeaderLeft}>
                                    <Text style={styles.sectionIcon}>{section.icon}</Text>
                                    <Text style={styles.sectionTitle}>{section.title}</Text>
                                </View>
                                <Text style={[
                                    styles.expandIcon,
                                    expandedSections[section.key] && styles.expandIconRotated
                                ]}>
                                    ▼
                                </Text>
                            </TouchableOpacity>
                            
                            {expandedSections[section.key] && (
                                <View style={styles.sectionContent}>
                                    <Text style={styles.sectionContentText}>
                                        {section.content}
                                    </Text>
                                    <View style={styles.placeholderContent}>
                                        <Text style={styles.placeholderText}>
                                            Conteúdo específico desta seção será implementado aqui
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>

            <Footer navigation={navigation} currentScreen="Anamnese" />
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
    sectionsContainer: {
        gap: 15,
    },
    sectionWrapper: {
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    sectionHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    sectionIcon: {
        fontSize: 24,
        marginRight: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#343a40',
        flex: 1,
    },
    expandIcon: {
        fontSize: 16,
        color: '#6c757d',
        fontWeight: 'bold',
        transform: [{ rotate: '0deg' }],
    },
    expandIconRotated: {
        transform: [{ rotate: '180deg' }],
    },
    sectionContent: {
        padding: 20,
        backgroundColor: '#fff',
    },
    sectionContentText: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 15,
        lineHeight: 20,
    },
    placeholderContent: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#007bff',
    },
    placeholderText: {
        fontSize: 13,
        color: '#6c757d',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});

export default Anamnese;
