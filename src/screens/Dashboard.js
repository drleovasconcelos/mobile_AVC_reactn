import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert,
    Share
} from 'react-native';
import Footer from '../components/Footer';
import { useAnamnese } from '../context/AnamneseContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({ navigation, route }) => {
    const { paciente } = route.params;
    const { getAnamneseData } = useAnamnese();
    
    // Estado para controlar o status de salvamento
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    
    // Estado para os dados do dashboard
    const [dashboardData, setDashboardData] = useState({
        // Dados básicos do paciente
        dataAvaliacao: new Date().toLocaleDateString('pt-BR'),
        numeroProntuario: paciente.prontuario || '',
        nomeCompleto: paciente.nome || '',
        dataNascimento: '',
        idade: '',
        diagnosticoClinico: '',
        sexo: '',
        racaCor: '',
        
        // Informações socioeconômicas
        ocupacao: '',
        estadoCivil: '',
        escolaridade: '',
        lateralidade: '',
        tipoTransporte: '',
        outroTransporte: '',
        
        // Impressão geral
        impressaoGeral: [],
        locomocao: '',
        outrosImpressao: '',
        outrosLocomocao: '',
        
        // Queixa principal
        descricaoQueixa: '',
        inicioSintomas: '',
        intensidade: '',
        frequencia: '',
        fatoresMelhora: '',
        fatoresPiora: '',
        
        // História da doença
        evolucaoSintomas: '',
        tratamentosAnteriores: '',
        examesRealizados: '',
        impactoRotina: '',
        
        // Histórico médico
        doencasCronicas: '',
        cirurgiasAnteriores: '',
        quaisCirurgias: '',
        internacoesAnteriores: '',
        quaisInternacoes: '',
        alergiasAlimentares: '',
        quaisAlergias: '',
        detalhesMedicos: '',
        
        // Histórico familiar
        doencasHereditarias: '',
        quaisDoencasHereditarias: '',
        condicoesCronicas: '',
        quaisCondicoes: '',
        detalhesFamiliares: '',
        
        // Histórico psicossocial
        tabagismo: '',
        consumoAlcool: '',
        usoDrogas: '',
        atividadeFisica: '',
        habitosAlimentares: '',
        saudeMental: '',
        
        // Medicamentos
        medicamentosUso: '',
        quaisMedicamentos: '',
        alergiasMedicamentos: '',
        quaisAlergiasMedicamentos: '',
        observacoesMedicamentos: '',
        
        // Impressão diagnóstica
        hipotesesDiagnosticas: '',
        condutaInicial: '',
        encaminhamentos: '',
        observacoesClinicas: ''
    });

    // Carregar dados da anamnese e dados salvos ao montar o componente
    useEffect(() => {
        const loadData = async () => {
            try {
                // Carregar dados da anamnese
                const anamneseData = getAnamneseData(paciente.prontuario);
                if (anamneseData && Object.keys(anamneseData).length > 0) {
                    setDashboardData(prev => {
                        // Só atualiza se os dados são diferentes
                        const hasChanges = Object.keys(anamneseData).some(key => 
                            anamneseData[key] !== prev[key]
                        );
                        
                        if (hasChanges) {
                            return {
                                ...prev,
                                ...anamneseData
                            };
                        }
                        return prev;
                    });
                }
                
                // Carregar dados salvos do dashboard
                const latestKey = await AsyncStorage.getItem(`dashboard_latest_${paciente.prontuario}`);
                if (latestKey) {
                    const savedData = await AsyncStorage.getItem(latestKey);
                    if (savedData) {
                        const parsedData = JSON.parse(savedData);
                        if (parsedData.savedAt) {
                            setLastSaved(new Date(parsedData.savedAt));
                        }
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };
        
        loadData();
    }, [paciente.prontuario, getAnamneseData]);

    // Detectar mudanças nos dados para indicar se há alterações não salvas
    useEffect(() => {
        if (lastSaved) {
            setHasUnsavedChanges(true);
        }
    }, [dashboardData]);

    // Função para salvar dados do dashboard
    const handleSaveData = useCallback(async () => {
        try {
            setIsSaving(true);
            
            // Preparar dados para salvar
            const dataToSave = {
                ...dashboardData,
                pacienteId: paciente.prontuario,
                savedAt: new Date().toISOString(),
                version: '1.0'
            };
            
            // Salvar no AsyncStorage
            const key = `dashboard_${paciente.prontuario}_${new Date().getTime()}`;
            await AsyncStorage.setItem(key, JSON.stringify(dataToSave));
            
            // Salvar também uma referência da última versão
            await AsyncStorage.setItem(`dashboard_latest_${paciente.prontuario}`, key);
            
            setLastSaved(new Date());
            setHasUnsavedChanges(false);
            
            Alert.alert(
                'Sucesso!',
                'Dados do dashboard foram salvos com sucesso.',
                [{ text: 'OK', style: 'default' }]
            );
            
        } catch (error) {
            console.error('Erro ao salvar dashboard:', error);
            Alert.alert(
                'Erro',
                'Não foi possível salvar os dados do dashboard. Tente novamente.',
                [{ text: 'OK', style: 'default' }]
            );
        } finally {
            setIsSaving(false);
        }
    }, [dashboardData, paciente.prontuario]);

    // Função para compartilhar o dashboard
    const handleShare = useCallback(async () => {
        try {
            const dashboardText = generateDashboardText();
            await Share.share({
                message: dashboardText,
                title: `Dashboard - ${paciente.nome}`
            });
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível compartilhar o dashboard');
        }
    }, [paciente.nome]);

    // Função para gerar texto do dashboard para compartilhamento
    const generateDashboardText = useCallback(() => {
        let text = `AVALIAÇÃO CLÍNICA DO PACIENTE\n`;
        text += `===================================\n\n`;
        text += `Nome: ${paciente.nome}\n`;
        text += `Prontuário: ${paciente.prontuario}\n`;
        text += `Data da Avaliação: ${dashboardData.dataAvaliacao}\n\n`;
        
        if (dashboardData.dataNascimento) {
            text += `Data de Nascimento: ${dashboardData.dataNascimento}\n`;
        }
        if (dashboardData.idade) {
            text += `Idade: ${dashboardData.idade} anos\n`;
        }
        if (dashboardData.sexo) {
            text += `Sexo: ${dashboardData.sexo}\n`;
        }
        if (dashboardData.racaCor) {
            text += `Raça/Cor: ${dashboardData.racaCor}\n`;
        }
        if (dashboardData.diagnosticoClinico) {
            text += `Diagnóstico Clínico: ${dashboardData.diagnosticoClinico}\n`;
        }
        text += `\n`;
        
        if (dashboardData.descricaoQueixa) {
            text += `QUEIXA PRINCIPAL: ${dashboardData.descricaoQueixa}\n\n`;
        }
        
        if (dashboardData.evolucaoSintomas) {
            text += `HISTÓRIA DA DOENÇA: ${dashboardData.evolucaoSintomas}\n\n`;
        }
        
        if (dashboardData.hipotesesDiagnosticas) {
            text += `HIPÓTESES DIAGNÓSTICAS: ${dashboardData.hipotesesDiagnosticas}\n\n`;
        }
        
        if (dashboardData.condutaInicial) {
            text += `CONDUTA: ${dashboardData.condutaInicial}\n\n`;
        }
        
        return text;
    }, [paciente.nome, paciente.prontuario, dashboardData]);

    // Função para renderizar seção de dados
    const renderDataSection = useCallback((title, data, icon = '📋') => {
        if (!data || data === '') return null;
        
        return (
            <View style={styles.dataSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionIcon}>{icon}</Text>
                    <Text style={styles.sectionTitle}>{title}</Text>
                </View>
                <View style={styles.dataContent}>
                    <Text style={styles.dataText}>{data}</Text>
                </View>
            </View>
        );
    }, []);

    // Função para renderizar seção de dados múltiplos
    const renderMultipleDataSection = useCallback((title, dataArray, icon = '📋') => {
        if (!dataArray || dataArray.length === 0) return null;
        
        return (
            <View style={styles.dataSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionIcon}>{icon}</Text>
                    <Text style={styles.sectionTitle}>{title}</Text>
                </View>
                <View style={styles.dataContent}>
                    {dataArray.map((item, index) => (
                        <Text key={index} style={styles.dataText}>• {item}</Text>
                    ))}
                </View>
            </View>
        );
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header com informações do paciente */}
            <View style={styles.header}>
                <View style={styles.pacienteInfo}>
                    <Text style={styles.pacienteNome}>{paciente.nome}</Text>
                    <Text style={styles.pacienteProntuario}>Prontuário: {paciente.prontuario}</Text>
                    <Text style={styles.dataAvaliacao}>Data: {dashboardData.dataAvaliacao}</Text>
                </View>
                
                {/* Botões de ação */}
                <View style={styles.headerActions}>
                    <TouchableOpacity 
                        style={[styles.actionButton, isSaving && styles.actionButtonDisabled]} 
                        onPress={handleSaveData}
                        disabled={isSaving}
                    >
                        <Text style={styles.actionButtonText}>
                            {isSaving ? '⏳' : '💾'}
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                        <Text style={styles.actionButtonText}>📤</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView 
                style={styles.content} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Título do Dashboard */}
                <View style={styles.dashboardTitle}>
                    <Text style={styles.title}>Dashboard Clínico</Text>
                    <Text style={styles.subtitle}>Resumo da Avaliação do Paciente</Text>
                    
                    {/* Indicador de status de salvamento */}
                    {lastSaved && (
                        <View style={[styles.saveStatus, hasUnsavedChanges && styles.saveStatusWarning]}>
                            <Text style={[styles.saveStatusText, hasUnsavedChanges && styles.saveStatusTextWarning]}>
                                {hasUnsavedChanges ? '⚠️' : '💾'} 
                                {hasUnsavedChanges ? 'Alterações não salvas' : `Última atualização: ${lastSaved.toLocaleString('pt-BR')}`}
                            </Text>
                        </View>
                    )}
                    
                    {/* Indicador de dados não salvos */}
                    {hasUnsavedChanges && (
                        <View style={styles.unsavedWarning}>
                            <Text style={styles.unsavedWarningText}>
                                ⚠️ Clique em "Salvar Dados" para preservar as alterações
                            </Text>
                        </View>
                    )}
                </View>

                {/* Conteúdo unificado como arquivo de texto */}
                <View style={styles.unifiedContent}>
                    {/* Cabeçalho do documento */}
                    <Text style={styles.documentHeader}>
                        AVALIAÇÃO CLÍNICA DO PACIENTE{'\n'}
                        ===================================
                    </Text>

                    {/* Identificação */}
                    <Text style={styles.documentSection}>
                        IDENTIFICAÇÃO{'\n'}
                        ------------{'\n'}
                        Nome: {paciente.nome}{'\n'}
                        Prontuário: {paciente.prontuario}{'\n'}
                        Data da Avaliação: {dashboardData.dataAvaliacao}{'\n'}
                        {dashboardData.dataNascimento ? `Data de Nascimento: ${dashboardData.dataNascimento}\n` : ''}
                        {dashboardData.idade ? `Idade: ${dashboardData.idade} anos\n` : ''}
                        {dashboardData.sexo ? `Sexo: ${dashboardData.sexo}\n` : ''}
                        {dashboardData.racaCor ? `Raça/Cor: ${dashboardData.racaCor}\n` : ''}
                        {dashboardData.diagnosticoClinico ? `Diagnóstico Clínico: ${dashboardData.diagnosticoClinico}\n` : ''}
                    </Text>

                    {/* Informações Socioeconômicas */}
                    {(dashboardData.ocupacao || dashboardData.estadoCivil || dashboardData.escolaridade || dashboardData.lateralidade) && (
                        <Text style={styles.documentSection}>
                            INFORMAÇÕES SOCIOECONÔMICAS{'\n'}
                            ----------------------------{'\n'}
                            {dashboardData.ocupacao ? `Ocupação/Profissão: ${dashboardData.ocupacao}\n` : ''}
                            {dashboardData.estadoCivil ? `Estado Civil: ${dashboardData.estadoCivil}\n` : ''}
                            {dashboardData.escolaridade ? `Escolaridade: ${dashboardData.escolaridade}\n` : ''}
                            {dashboardData.lateralidade ? `Lateralidade: ${dashboardData.lateralidade}\n` : ''}
                            {dashboardData.tipoTransporte ? `Tipo de Transporte: ${dashboardData.tipoTransporte}\n` : ''}
                            {dashboardData.outroTransporte ? `Especificação: ${dashboardData.outroTransporte}\n` : ''}
                        </Text>
                    )}

                    {/* Impressão Geral */}
                    {(dashboardData.impressaoGeral && dashboardData.impressaoGeral.length > 0 || dashboardData.locomocao) && (
                        <Text style={styles.documentSection}>
                            IMPRESSÃO GERAL{'\n'}
                            --------------{'\n'}
                            {dashboardData.impressaoGeral && dashboardData.impressaoGeral.length > 0 ? 
                                `Impressão: ${dashboardData.impressaoGeral.join(', ')}\n` : ''}
                            {dashboardData.outrosImpressao ? `Outros: ${dashboardData.outrosImpressao}\n` : ''}
                            {dashboardData.locomocao ? `Locomoção: ${dashboardData.locomocao}\n` : ''}
                            {dashboardData.outrosLocomocao ? `Outros: ${dashboardData.outrosLocomocao}\n` : ''}
                        </Text>
                    )}

                    {/* Queixa Principal */}
                    {dashboardData.descricaoQueixa && (
                        <Text style={styles.documentSection}>
                            QUEIXA PRINCIPAL{'\n'}
                            ---------------{'\n'}
                            {dashboardData.descricaoQueixa}{'\n'}
                            {dashboardData.inicioSintomas ? `Início dos Sintomas: ${dashboardData.inicioSintomas}\n` : ''}
                            {dashboardData.intensidade ? `Intensidade: ${dashboardData.intensidade}\n` : ''}
                            {dashboardData.frequencia ? `Frequência: ${dashboardData.frequencia}\n` : ''}
                            {dashboardData.fatoresMelhora ? `Fatores de Melhora: ${dashboardData.fatoresMelhora}\n` : ''}
                            {dashboardData.fatoresPiora ? `Fatores de Piora: ${dashboardData.fatoresPiora}\n` : ''}
                        </Text>
                    )}

                    {/* História da Doença */}
                    {dashboardData.evolucaoSintomas && (
                        <Text style={styles.documentSection}>
                            HISTÓRIA DA DOENÇA ATUAL{'\n'}
                            -------------------------{'\n'}
                            {dashboardData.evolucaoSintomas}{'\n'}
                            {dashboardData.tratamentosAnteriores ? `Tratamentos Anteriores: ${dashboardData.tratamentosAnteriores}\n` : ''}
                            {dashboardData.examesRealizados ? `Exames Realizados: ${dashboardData.examesRealizados}\n` : ''}
                            {dashboardData.impactoRotina ? `Impacto na Rotina: ${dashboardData.impactoRotina}\n` : ''}
                        </Text>
                    )}

                    {/* Histórico Médico */}
                    {(dashboardData.doencasCronicas || dashboardData.cirurgiasAnteriores || dashboardData.internacoesAnteriores || dashboardData.alergiasAlimentares) && (
                        <Text style={styles.documentSection}>
                            HISTÓRICO MÉDICO{'\n'}
                            ---------------{'\n'}
                            {dashboardData.doencasCronicas ? `Doenças Crônicas: ${dashboardData.doencasCronicas}\n` : ''}
                            {dashboardData.cirurgiasAnteriores ? `Cirurgias Anteriores: ${dashboardData.cirurgiasAnteriores}\n` : ''}
                            {dashboardData.quaisCirurgias ? `  ${dashboardData.quaisCirurgias}\n` : ''}
                            {dashboardData.internacoesAnteriores ? `Internações Anteriores: ${dashboardData.internacoesAnteriores}\n` : ''}
                            {dashboardData.quaisInternacoes ? `  ${dashboardData.quaisInternacoes}\n` : ''}
                            {dashboardData.alergiasAlimentares ? `Alergias Alimentares: ${dashboardData.alergiasAlimentares}\n` : ''}
                            {dashboardData.quaisAlergias ? `  ${dashboardData.quaisAlergias}\n` : ''}
                            {dashboardData.detalhesMedicos ? `Detalhamento Médico: ${dashboardData.detalhesMedicos}\n` : ''}
                        </Text>
                    )}

                    {/* Histórico Familiar */}
                    {(dashboardData.doencasHereditarias || dashboardData.condicoesCronicas) && (
                        <Text style={styles.documentSection}>
                            HISTÓRICO FAMILIAR{'\n'}
                            ------------------{'\n'}
                            {dashboardData.doencasHereditarias ? `Doenças Hereditárias: ${dashboardData.doencasHereditarias}\n` : ''}
                            {dashboardData.quaisDoencasHereditarias ? `  ${dashboardData.quaisDoencasHereditarias}\n` : ''}
                            {dashboardData.condicoesCronicas ? `Condições Crônicas: ${dashboardData.condicoesCronicas}\n` : ''}
                            {dashboardData.quaisCondicoes ? `  ${dashboardData.quaisCondicoes}\n` : ''}
                            {dashboardData.detalhesFamiliares ? `Detalhamento Familiar: ${dashboardData.detalhesFamiliares}\n` : ''}
                        </Text>
                    )}

                    {/* Histórico Psicossocial */}
                    {(dashboardData.tabagismo || dashboardData.consumoAlcool || dashboardData.usoDrogas || dashboardData.atividadeFisica || dashboardData.habitosAlimentares || dashboardData.saudeMental) && (
                        <Text style={styles.documentSection}>
                            HISTÓRICO PSICOSSOCIAL{'\n'}
                            ---------------------{'\n'}
                            {dashboardData.tabagismo ? `Tabagismo: ${dashboardData.tabagismo}\n` : ''}
                            {dashboardData.consumoAlcool ? `Consumo de Álcool: ${dashboardData.consumoAlcool}\n` : ''}
                            {dashboardData.usoDrogas ? `Uso de Drogas: ${dashboardData.usoDrogas}\n` : ''}
                            {dashboardData.atividadeFisica ? `Atividade Física: ${dashboardData.atividadeFisica}\n` : ''}
                            {dashboardData.habitosAlimentares ? `Hábitos Alimentares: ${dashboardData.habitosAlimentares}\n` : ''}
                            {dashboardData.saudeMental ? `Saúde Mental: ${dashboardData.saudeMental}\n` : ''}
                        </Text>
                    )}

                    {/* Uso de Medicamentos */}
                    {(dashboardData.medicamentosUso || dashboardData.alergiasMedicamentos) && (
                        <Text style={styles.documentSection}>
                            USO DE MEDICAMENTOS{'\n'}
                            -------------------{'\n'}
                            {dashboardData.medicamentosUso ? `Medicamentos em Uso: ${dashboardData.medicamentosUso}\n` : ''}
                            {dashboardData.quaisMedicamentos ? `  ${dashboardData.quaisMedicamentos}\n` : ''}
                            {dashboardData.alergiasMedicamentos ? `Alergias a Medicamentos: ${dashboardData.alergiasMedicamentos}\n` : ''}
                            {dashboardData.quaisAlergiasMedicamentos ? `  ${dashboardData.quaisAlergiasMedicamentos}\n` : ''}
                            {dashboardData.observacoesMedicamentos ? `Observações: ${dashboardData.observacoesMedicamentos}\n` : ''}
                        </Text>
                    )}

                    {/* Impressão Diagnóstica */}
                    {(dashboardData.hipotesesDiagnosticas || dashboardData.condutaInicial || dashboardData.encaminhamentos || dashboardData.observacoesClinicas) && (
                        <Text style={styles.documentSection}>
                            IMPRESSÃO DIAGNÓSTICA{'\n'}
                            ---------------------{'\n'}
                            {dashboardData.hipotesesDiagnosticas ? `Hipóteses Diagnósticas: ${dashboardData.hipotesesDiagnosticas}\n` : ''}
                            {dashboardData.condutaInicial ? `Conduta Inicial: ${dashboardData.condutaInicial}\n` : ''}
                            {dashboardData.encaminhamentos ? `Encaminhamentos: ${dashboardData.encaminhamentos}\n` : ''}
                            {dashboardData.observacoesClinicas ? `Observações Clínicas: ${dashboardData.observacoesClinicas}\n` : ''}
                        </Text>
                    )}

                    {/* Rodapé do documento */}
                    <Text style={styles.documentFooter}>
                        {'\n'}=================================={'\n'}
                        Documento gerado em {new Date().toLocaleString('pt-BR')}{'\n'}
                        Sistema de Avaliação de Pacientes{'\n'}
                        ==================================
                    </Text>
                </View>
            </ScrollView>

            <Footer navigation={navigation} currentScreen="Dashboard" />
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
        marginBottom: 2,
        textAlign: 'center',
    },
    dataAvaliacao: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.8,
        textAlign: 'center',
    },
    headerActions: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 10,
        borderRadius: 8,
        marginLeft: 8,
    },
    actionButtonDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        opacity: 0.6,
    },
    actionButtonText: {
        fontSize: 18,
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
    dashboardTitle: {
        alignItems: 'center',
        marginBottom: 30,
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#007bff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#343a40',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
    },
    saveStatus: {
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: '#e8f5e8',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#28a745',
    },
    saveStatusText: {
        fontSize: 12,
        color: '#28a745',
        textAlign: 'center',
        fontWeight: '600',
    },
    saveStatusWarning: {
        backgroundColor: '#fff3cd',
        borderColor: '#ffc107',
    },
    saveStatusTextWarning: {
        color: '#856404',
    },
    unsavedWarning: {
        marginTop: 8,
        paddingHorizontal: 20,
        paddingVertical: 6,
        backgroundColor: '#f8d7da',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#dc3545',
    },
    unsavedWarningText: {
        fontSize: 11,
        color: '#721c24',
        textAlign: 'center',
        fontWeight: '600',
    },
    mainSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    mainSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: 15,
        textAlign: 'center',
    },
    identificationGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    identificationItem: {
        minWidth: '45%',
    },
    identificationLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6c757d',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    identificationValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#343a40',
    },
    dataSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    sectionIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#343a40',
        flex: 1,
    },
    dataContent: {
        gap: 8,
    },
    dataText: {
        fontSize: 14,
        color: '#495057',
        lineHeight: 20,
    },
    documentFooter: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 20,
        marginTop: 20,
        alignItems: 'center',
        borderTopWidth: 2,
        borderTopColor: '#dee2e6',
    },
    footerText: {
        fontSize: 12,
        color: '#6c757d',
        textAlign: 'center',
        marginBottom: 4,
    },
    emptyState: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 30,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    emptyStateIcon: {
        fontSize: 48,
        marginBottom: 20,
    },
    emptyStateTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 10,
        textAlign: 'center',
    },
    emptyStateText: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20,
    },
    emptyStateButton: {
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },
    emptyStateButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    unifiedContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    documentHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 24,
    },
    documentSection: {
        fontSize: 14,
        color: '#495057',
        lineHeight: 20,
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    documentFooter: {
        fontSize: 12,
        color: '#6c757d',
        textAlign: 'center',
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
        lineHeight: 18,
    },
});

export default Dashboard;
