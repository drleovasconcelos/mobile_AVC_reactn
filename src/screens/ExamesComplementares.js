import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import Footer from '../components/Footer';

const ExamesComplementares = ({ navigation, route }) => {
    const { paciente } = route.params;
    
    // Estado para controlar quais seções estão expandidas
    const [expandedSections, setExpandedSections] = useState({});
    
    // Estado para os dados dos exames
    const [formData, setFormData] = useState({
        // Exames Laboratoriais
        hemograma: '',
        glicemia: '',
        colesterol: '',
        triglicerides: '',
        creatinina: '',
        ureia: '',
        sódio: '',
        potássio: '',
        outrosLab: '',
        
        // Exames de Imagem
        raioX: '',
        tomografia: '',
        ressonancia: '',
        ultrassom: '',
        outrosImagem: '',
        
        // Exames Específicos
        ecg: '',
        holter: '',
        testeErgometrico: '',
        espirometria: '',
        outrosEspecificos: '',
        
        // Observações
        observacoes: '',
        dataSolicitacao: '',
        dataResultado: '',
        medicoSolicitante: ''
    });

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
            key: 'laboratoriais',
            title: '1. Exames Laboratoriais',
            icon: '🧪',
            content: 'Hemograma, bioquímica, eletrólitos...'
        },
        {
            key: 'imagem',
            title: '2. Exames de Imagem',
            icon: '📷',
            content: 'Raio-X, tomografia, ressonância...'
        },
        {
            key: 'especificos',
            title: '3. Exames Específicos',
            icon: '🔬',
            content: 'ECG, Holter, espirometria...'
        },
        {
            key: 'gerais',
            title: '4. Informações Gerais',
            icon: '📋',
            content: 'Datas, médico solicitante, observações...'
        }
    ];

    // Função para renderizar o conteúdo específico de cada seção
    const renderSectionContent = (sectionKey) => {
        switch(sectionKey) {
            case 'laboratoriais':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Hemograma:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.hemograma}
                                onChangeText={(text) => setFormData({...formData, hemograma: text})}
                                placeholder="Resultado do hemograma"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Glicemia:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.glicemia}
                                onChangeText={(text) => setFormData({...formData, glicemia: text})}
                                placeholder="Nível de glicemia"
                                keyboardType="numeric"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Colesterol Total:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.colesterol}
                                onChangeText={(text) => setFormData({...formData, colesterol: text})}
                                placeholder="Nível de colesterol"
                                keyboardType="numeric"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Triglicerídeos:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.triglicerides}
                                onChangeText={(text) => setFormData({...formData, triglicerides: text})}
                                placeholder="Nível de triglicerídeos"
                                keyboardType="numeric"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Creatinina:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.creatinina}
                                onChangeText={(text) => setFormData({...formData, creatinina: text})}
                                placeholder="Nível de creatinina"
                                keyboardType="numeric"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Ureia:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.ureia}
                                onChangeText={(text) => setFormData({...formData, ureia: text})}
                                placeholder="Nível de ureia"
                                keyboardType="numeric"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Sódio:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.sodio}
                                onChangeText={(text) => setFormData({...formData, sodio: text})}
                                placeholder="Nível de sódio"
                                keyboardType="numeric"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Potássio:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.potassio}
                                onChangeText={(text) => setFormData({...formData, potassio: text})}
                                placeholder="Nível de potássio"
                                keyboardType="numeric"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Outros Exames Laboratoriais:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.outrosLab}
                                onChangeText={(text) => setFormData({...formData, outrosLab: text})}
                                placeholder="Outros exames laboratoriais realizados"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            case 'imagem':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Raio-X:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.raioX}
                                onChangeText={(text) => setFormData({...formData, raioX: text})}
                                placeholder="Resultado do raio-X"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Tomografia:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.tomografia}
                                onChangeText={(text) => setFormData({...formData, tomografia: text})}
                                placeholder="Resultado da tomografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Ressonância Magnética:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.ressonancia}
                                onChangeText={(text) => setFormData({...formData, ressonancia: text})}
                                placeholder="Resultado da ressonância"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Ultrassom:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.ultrassom}
                                onChangeText={(text) => setFormData({...formData, ultrassom: text})}
                                placeholder="Resultado do ultrassom"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Outros Exames de Imagem:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.outrosImagem}
                                onChangeText={(text) => setFormData({...formData, outrosImagem: text})}
                                placeholder="Outros exames de imagem realizados"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            case 'especificos':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>ECG (Eletrocardiograma):</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.ecg}
                                onChangeText={(text) => setFormData({...formData, ecg: text})}
                                placeholder="Resultado do ECG"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Holter:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.holter}
                                onChangeText={(text) => setFormData({...formData, holter: text})}
                                placeholder="Resultado do Holter"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Teste Ergométrico:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.testeErgometrico}
                                onChangeText={(text) => setFormData({...formData, testeErgometrico: text})}
                                placeholder="Resultado do teste ergométrico"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Espirometria:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.espirometria}
                                onChangeText={(text) => setFormData({...formData, espirometria: text})}
                                placeholder="Resultado da espirometria"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Outros Exames Específicos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.outrosEspecificos}
                                onChangeText={(text) => setFormData({...formData, outrosEspecificos: text})}
                                placeholder="Outros exames específicos realizados"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            case 'gerais':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Solicitação:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.dataSolicitacao}
                                onChangeText={(text) => setFormData({...formData, dataSolicitacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data do Resultado:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.dataResultado}
                                onChangeText={(text) => setFormData({...formData, dataResultado: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Médico Solicitante:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.medicoSolicitante}
                                onChangeText={(text) => setFormData({...formData, medicoSolicitante: text})}
                                placeholder="Nome do médico solicitante"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.observacoes}
                                onChangeText={(text) => setFormData({...formData, observacoes: text})}
                                placeholder="Observações sobre os exames complementares"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            default:
                return (
                    <View style={styles.placeholderContent}>
                        <Text style={styles.placeholderText}>
                            Conteúdo específico desta seção será implementado aqui
                        </Text>
                    </View>
                );
        }
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

            <KeyboardAvoidingView 
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView 
                    style={styles.content} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    automaticallyAdjustKeyboardInsets={true}
                >
                    <Text style={styles.title}>Exames Complementares</Text>
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
                                        {renderSectionContent(section.key)}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            
            <Footer navigation={navigation} currentScreen="ExamesComplementares" />
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
    keyboardAvoidingView: {
        flex: 1,
        width: '100%',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingVertical: 20,
        paddingBottom: 100,
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
    formContent: {
        gap: 15,
    },
    formRow: {
        marginBottom: 15,
    },
    formLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#343a40',
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        backgroundColor: '#fff',
        color: '#495057',
    },
});

export default ExamesComplementares;
