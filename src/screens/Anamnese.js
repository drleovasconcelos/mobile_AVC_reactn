import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform
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

    // Estado para os dados do formulário
    const [formData, setFormData] = useState({
        // Seção 1: Identificação Pessoal
        dataAvaliacao: '',
        numeroProntuario: paciente.prontuario || '',
        nomeCompleto: paciente.nome || '',
        dataNascimento: '',
        idade: '',
        diagnosticoClinico: '',
        sexo: '',
        racaCor: '',
        
        // Seção 2: Informações Socioeconômicas
        ocupacao: '',
        estadoCivil: '',
        escolaridade: '',
        lateralidade: '',
        tipoTransporte: '',
        outroTransporte: '',
        
        // Seção 3: Impressão Geral
        impressaoGeral: [],
        locomocao: '',
        outrosImpressao: '',
        outrosLocomocao: '',
        
        // Seção 4: Queixa Principal
        descricaoQueixa: '',
        inicioSintomas: '',
        intensidade: '',
        frequencia: '',
        fatoresMelhora: '',
        fatoresPiora: '',
        
        // Seção 5: História da Doença
        evolucaoSintomas: '',
        tratamentosAnteriores: '',
        examesRealizados: '',
        impactoRotina: '',
        
        // Seção 6: Histórico Médico
        cirurgiasAnteriores: '',
        quaisCirurgias: '',
        internacoesAnteriores: '',
        quaisInternacoes: '',
        alergiasAlimentares: '',
        quaisAlergias: '',
        detalhesMedicos: '',
        
        // Seção 7: Histórico Familiar
        doencasHereditarias: '',
        quaisDoencasHereditarias: '',
        condicoesCronicas: '',
        quaisCondicoes: '',
        detalhesFamiliares: '',
        
        // Seção 8: Histórico Psicossocial
        tabagismo: '',
        consumoAlcool: '',
        usoDrogas: '',
        atividadeFisica: '',
        habitosAlimentares: '',
        saudeMental: '',
        
        // Seção 9: Uso de Medicamentos
        medicamentosUso: '',
        quaisMedicamentos: '',
        alergiasMedicamentos: '',
        quaisAlergiasMedicamentos: '',
        
        // Seção 10: Impressão Diagnóstica
        hipotesesDiagnosticas: '',
        condutaInicial: '',
        encaminhamentos: '',
        observacoesClinicas: ''
    });

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

    // Função para renderizar o conteúdo específico de cada seção
    const renderSectionContent = (sectionKey) => {
        switch(sectionKey) {
            case 'identificacao':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data da avaliação:</Text>
                            <TouchableOpacity style={styles.dateButton}>
                                <Text style={styles.dateButtonText}>📅 Selecionar Data</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Número do prontuário:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.numeroProntuario}
                                onChangeText={(text) => setFormData({...formData, numeroProntuario: text})}
                                placeholder="Digite o número do prontuário"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Nome completo:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.nomeCompleto}
                                onChangeText={(text) => setFormData({...formData, nomeCompleto: text})}
                                placeholder="Digite o nome completo"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de nascimento:</Text>
                            <TouchableOpacity style={styles.dateButton}>
                                <Text style={styles.dateButtonText}>📅 Selecionar Data</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Idade:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.idade}
                                onChangeText={(text) => setFormData({...formData, idade: text})}
                                placeholder="Idade automática"
                                editable={false}
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Diagnóstico clínico:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.diagnosticoClinico}
                                onChangeText={(text) => setFormData({...formData, diagnosticoClinico: text})}
                                placeholder="Digite o diagnóstico clínico"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Sexo:</Text>
                            <View style={styles.checkboxGroup}>
                                {['Masculino', 'Feminino', 'Outro'].map((opcao) => (
                                    <TouchableOpacity
                                        key={opcao}
                                        style={styles.checkboxItem}
                                        onPress={() => setFormData({...formData, sexo: opcao})}
                                    >
                                        <Text style={formData.sexo === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                            {formData.sexo === opcao ? '☑' : '☐'} {opcao}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Raça/Cor:</Text>
                            <View style={styles.checkboxGroup}>
                                {['Branca', 'Preta', 'Parda', 'Amarela', 'Indígena', 'Prefere não informar'].map((opcao) => (
                                    <TouchableOpacity
                                        key={opcao}
                                        style={styles.checkboxItem}
                                        onPress={() => setFormData({...formData, racaCor: opcao})}
                                    >
                                        <Text style={formData.racaCor === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                            {formData.racaCor === opcao ? '☑' : '☐'} {opcao}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                );
                
            case 'socioeconomicas':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Ocupação/Profissão:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.ocupacao}
                                onChangeText={(text) => setFormData({...formData, ocupacao: text})}
                                placeholder="Digite a ocupação/profissão"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Estado civil:</Text>
                            <View style={styles.checkboxGroup}>
                                {['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União estável'].map((opcao) => (
                                    <TouchableOpacity
                                        key={opcao}
                                        style={styles.checkboxItem}
                                        onPress={() => setFormData({...formData, estadoCivil: opcao})}
                                    >
                                        <Text style={formData.estadoCivil === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                            {formData.estadoCivil === opcao ? '☑' : '☐'} {opcao}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Escolaridade:</Text>
                            <View style={styles.checkboxGroup}>
                                {[
                                    'Ensino fundamental incompleto',
                                    'Ensino fundamental completo',
                                    'Ensino médio incompleto',
                                    'Ensino médio completo',
                                    'Ensino superior incompleto',
                                    'Ensino superior completo',
                                    'Pós-graduação'
                                ].map((opcao) => (
                                    <TouchableOpacity
                                        key={opcao}
                                        style={styles.checkboxItem}
                                        onPress={() => setFormData({...formData, escolaridade: opcao})}
                                    >
                                        <Text style={formData.escolaridade === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                            {formData.escolaridade === opcao ? '☑' : '☐'} {opcao}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Lateralidade:</Text>
                            <View style={styles.checkboxGroup}>
                                {['Destro', 'Canhoto', 'Ambidestro'].map((opcao) => (
                                    <TouchableOpacity
                                        key={opcao}
                                        style={styles.checkboxItem}
                                        onPress={() => setFormData({...formData, lateralidade: opcao})}
                                    >
                                        <Text style={formData.lateralidade === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                            {formData.lateralidade === opcao ? '☑' : '☐'} {opcao}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Tipo de transporte utilizado:</Text>
                            <View style={styles.checkboxGroup}>
                                {['Próprio', 'Alugado', 'Emprestado', 'Transporte público', 'Aplicativo (Uber, 99 etc.)', 'Outro'].map((opcao) => (
                                    <TouchableOpacity
                                        key={opcao}
                                        style={styles.checkboxItem}
                                        onPress={() => setFormData({...formData, tipoTransporte: opcao})}
                                    >
                                        <Text style={formData.tipoTransporte === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                            {formData.tipoTransporte === opcao ? '☑' : '☐'} {opcao}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        
                        {formData.tipoTransporte === 'Outro' && (
                            <View style={styles.formRow}>
                                <Text style={styles.formLabel}>Especificar:</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={formData.outroTransporte}
                                    onChangeText={(text) => setFormData({...formData, outroTransporte: text})}
                                    placeholder="Digite o tipo de transporte"
                                />
                            </View>
                        )}
                    </View>
                );
                
            case 'impressaoGeral':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.formLabel}>Impressão Geral:</Text>
                        <View style={styles.checkboxGroup}>
                            {[
                                'Inconsciente', 'Confuso', 'Alteração de linguagem', 'Fadigado',
                                'Cansado', 'Ansioso', 'Deprimido', 'Apático', 'Colaborante',
                                'Agressivo', 'Agitado', 'Sonolento', 'Orientado', 'Desorientado',
                                'Choroso', 'Irritado'
                            ].map((opcao) => (
                                <TouchableOpacity
                                    key={opcao}
                                    style={styles.checkboxItem}
                                    onPress={() => {
                                        const newImpressao = formData.impressaoGeral || [];
                                        const index = newImpressao.indexOf(opcao);
                                        if (index > -1) {
                                            newImpressao.splice(index, 1);
                                        } else {
                                            newImpressao.push(opcao);
                                        }
                                        setFormData({...formData, impressaoGeral: newImpressao});
                                    }}
                                >
                                    <Text style={(formData.impressaoGeral || []).includes(opcao) ? styles.checkboxTextSelected : styles.checkboxText}>
                                        {(formData.impressaoGeral || []).includes(opcao) ? '☑' : '☐'} {opcao}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Outros:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.outrosImpressao}
                                onChangeText={(text) => setFormData({...formData, outrosImpressao: text})}
                                placeholder="Especificar outros"
                            />
                        </View>
                        
                        <Text style={styles.formLabel}>Locomoção (Chegada ao Serviço):</Text>
                        <View style={styles.checkboxGroup}>
                            {[
                                'Deambulação independente',
                                'Deambula com supervisão (sem contato físico)',
                                'Deambula com assistência leve (braço, apoio verbal)',
                                'Deambula com assistência moderada (muleta, bengala, acompanhante segurando)',
                                'Deambula com assistência total (cadeira de rodas empurrada, carregado)',
                                'Cadeirante independente',
                                'Cadeirante dependente',
                                'Em maca',
                                'Em ambulância',
                                'Em veículo particular'
                            ].map((opcao) => (
                                <TouchableOpacity
                                    key={opcao}
                                    style={styles.checkboxItem}
                                    onPress={() => setFormData({...formData, locomocao: opcao})}
                                >
                                    <Text style={formData.locomocao === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                        {formData.locomocao === opcao ? '☑' : '☐'} {opcao}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Outros:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.outrosLocomocao}
                                onChangeText={(text) => setFormData({...formData, outrosLocomocao: text})}
                                placeholder="Especificar outros"
                            />
                        </View>
                    </View>
                );
                
            case 'queixaPrincipal':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Descrição da queixa:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.descricaoQueixa}
                                onChangeText={(text) => setFormData({...formData, descricaoQueixa: text})}
                                placeholder="Descreva a queixa principal"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Início dos sintomas:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.inicioSintomas}
                                onChangeText={(text) => setFormData({...formData, inicioSintomas: text})}
                                placeholder="Quando começaram os sintomas"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Intensidade:</Text>
                            <View style={styles.checkboxGroup}>
                                {['Leve', 'Moderada', 'Intensa'].map((opcao) => (
                                    <TouchableOpacity
                                        key={opcao}
                                        style={styles.checkboxItem}
                                        onPress={() => setFormData({...formData, intensidade: opcao})}
                                    >
                                        <Text style={formData.intensidade === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                            {formData.intensidade === opcao ? '☑' : '☐'} {opcao}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Frequência:</Text>
                            <View style={styles.checkboxGroup}>
                                {['Ocasional', 'Frequente', 'Contínua'].map((opcao) => (
                                    <TouchableOpacity
                                        key={opcao}
                                        style={styles.checkboxItem}
                                        onPress={() => setFormData({...formData, frequencia: opcao})}
                                    >
                                        <Text style={formData.frequencia === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                            {formData.frequencia === opcao ? '☑' : '☐'} {opcao}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Fatores de melhora:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.fatoresMelhora}
                                onChangeText={(text) => setFormData({...formData, fatoresMelhora: text})}
                                placeholder="O que melhora os sintomas"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Fatores de piora:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.fatoresPiora}
                                onChangeText={(text) => setFormData({...formData, fatoresPiora: text})}
                                placeholder="O que piora os sintomas"
                            />
                        </View>
                    </View>
                );
                
            case 'historiaDoenca':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução dos sintomas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.evolucaoSintomas}
                                onChangeText={(text) => setFormData({...formData, evolucaoSintomas: text})}
                                placeholder="Como os sintomas evoluíram"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Tratamentos anteriores:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.tratamentosAnteriores}
                                onChangeText={(text) => setFormData({...formData, tratamentosAnteriores: text})}
                                placeholder="Tratamentos já realizados"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Exames realizados:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.examesRealizados}
                                onChangeText={(text) => setFormData({...formData, examesRealizados: text})}
                                placeholder="Exames já realizados"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Impacto na rotina:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.impactoRotina}
                                onChangeText={(text) => setFormData({...formData, impactoRotina: text})}
                                placeholder="Como afeta a rotina diária"
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
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView 
                    style={styles.content} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
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
                                        {renderSectionContent(section.key)}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

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
    keyboardAvoidingView: {
        flex: 1,
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
    dateButton: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    dateButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    checkboxGroup: {
        gap: 8,
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    checkboxText: {
        fontSize: 14,
        color: '#495057',
        marginLeft: 8,
    },
    checkboxTextSelected: {
        fontSize: 14,
        color: '#007bff',
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default Anamnese;
