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
        
        // Dados da anamnese
        queixaPrincipal: '',
        inicioSintomas: '',
        intensidade: '',
        frequencia: '',
        fatoresMelhora: '',
        fatoresPiora: '',
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
        let text = `DASHBOARD CLÍNICO\n`;
        text += `Paciente: ${paciente.nome}\n`;
        text += `Prontuário: ${paciente.prontuario}\n`;
        text += `Data: ${dashboardData.dataAvaliacao}\n\n`;
        
        if (dashboardData.queixaPrincipal) {
            text += `QUEIXA PRINCIPAL: ${dashboardData.queixaPrincipal}\n\n`;
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

                {/* Seção de Identificação */}
                <View style={styles.mainSection}>
                    <Text style={styles.mainSectionTitle}>👤 IDENTIFICAÇÃO</Text>
                    <View style={styles.identificationGrid}>
                        <View style={styles.identificationItem}>
                            <Text style={styles.identificationLabel}>Nome:</Text>
                            <Text style={styles.identificationValue}>{paciente.nome}</Text>
                        </View>
                        <View style={styles.identificationItem}>
                            <Text style={styles.identificationLabel}>Prontuário:</Text>
                            <Text style={styles.identificationValue}>{paciente.prontuario}</Text>
                        </View>
                        {dashboardData.idade && (
                            <View style={styles.identificationItem}>
                                <Text style={styles.identificationLabel}>Idade:</Text>
                                <Text style={styles.identificationValue}>{dashboardData.idade} anos</Text>
                            </View>
                        )}
                        {dashboardData.sexo && (
                            <View style={styles.identificationItem}>
                                <Text style={styles.identificationLabel}>Sexo:</Text>
                                <Text style={styles.identificationValue}>{dashboardData.sexo}</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Indicador de dados vazios */}
                {!Object.keys(dashboardData).some(key => 
                    key !== 'dataAvaliacao' && 
                    key !== 'numeroProntuario' && 
                    key !== 'nomeCompleto' && 
                    dashboardData[key] && dashboardData[key] !== ''
                ) && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateIcon}>📋</Text>
                        <Text style={styles.emptyStateTitle}>Nenhum dado disponível</Text>
                        <Text style={styles.emptyStateText}>
                            Para visualizar o resumo clínico, preencha os dados na tela de Anamnese.
                        </Text>
                        <TouchableOpacity 
                            style={styles.emptyStateButton}
                            onPress={() => navigation.navigate('Anamnese', { paciente })}
                        >
                            <Text style={styles.emptyStateButtonText}>Ir para Anamnese</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Seção de Queixa Principal */}
                {renderDataSection('💬 QUEIXA PRINCIPAL', dashboardData.queixaPrincipal, '💬')}

                {/* Seção de História da Doença */}
                {renderDataSection('📋 HISTÓRIA DA DOENÇA ATUAL', dashboardData.evolucaoSintomas, '📋')}

                {/* Seção de Sintomas */}
                {(dashboardData.inicioSintomas || dashboardData.intensidade || dashboardData.frequencia) && (
                    <View style={styles.dataSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionIcon}>🔍</Text>
                            <Text style={styles.sectionTitle}>CARACTERÍSTICAS DOS SINTOMAS</Text>
                        </View>
                        <View style={styles.dataContent}>
                            {dashboardData.inicioSintomas && (
                                <Text style={styles.dataText}>• Início: {dashboardData.inicioSintomas}</Text>
                            )}
                            {dashboardData.intensidade && (
                                <Text style={styles.dataText}>• Intensidade: {dashboardData.intensidade}</Text>
                            )}
                            {dashboardData.frequencia && (
                                <Text style={styles.dataText}>• Frequência: {dashboardData.frequencia}</Text>
                            )}
                            {dashboardData.fatoresMelhora && (
                                <Text style={styles.dataText}>• Fatores de melhora: {dashboardData.fatoresMelhora}</Text>
                            )}
                            {dashboardData.fatoresPiora && (
                                <Text style={styles.dataText}>• Fatores de piora: {dashboardData.fatoresPiora}</Text>
                            )}
                        </View>
                    </View>
                )}

                {/* Seção de Histórico Médico */}
                {(dashboardData.doencasCronicas || dashboardData.cirurgiasAnteriores || dashboardData.internacoesAnteriores) && (
                    <View style={styles.dataSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionIcon}>🏥</Text>
                            <Text style={styles.sectionTitle}>HISTÓRICO MÉDICO</Text>
                        </View>
                        <View style={styles.dataContent}>
                            {dashboardData.doencasCronicas && (
                                <Text style={styles.dataText}>• Doenças crônicas: {dashboardData.doencasCronicas}</Text>
                            )}
                            {dashboardData.cirurgiasAnteriores && (
                                <Text style={styles.dataText}>• Cirurgias: {dashboardData.cirurgiasAnteriores}</Text>
                            )}
                            {dashboardData.quaisCirurgias && (
                                <Text style={styles.dataText}>  {dashboardData.quaisCirurgias}</Text>
                            )}
                            {dashboardData.internacoesAnteriores && (
                                <Text style={styles.dataText}>• Internações: {dashboardData.internacoesAnteriores}</Text>
                            )}
                            {dashboardData.quaisInternacoes && (
                                <Text style={styles.dataText}>  {dashboardData.quaisInternacoes}</Text>
                            )}
                        </View>
                    </View>
                )}

                {/* Seção de Alergias */}
                {(dashboardData.alergiasAlimentares || dashboardData.alergiasMedicamentos) && (
                    <View style={styles.dataSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionIcon}>⚠️</Text>
                            <Text style={styles.sectionTitle}>ALERGIAS</Text>
                        </View>
                        <View style={styles.dataContent}>
                            {dashboardData.alergiasAlimentares && (
                                <Text style={styles.dataText}>• Alimentares: {dashboardData.alergiasAlimentares}</Text>
                            )}
                            {dashboardData.quaisAlergias && (
                                <Text style={styles.dataText}>  {dashboardData.quaisAlergias}</Text>
                            )}
                            {dashboardData.alergiasMedicamentos && (
                                <Text style={styles.dataText}>• Medicamentos: {dashboardData.alergiasMedicamentos}</Text>
                            )}
                            {dashboardData.quaisAlergiasMedicamentos && (
                                <Text style={styles.dataText}>  {dashboardData.quaisAlergiasMedicamentos}</Text>
                            )}
                        </View>
                    </View>
                )}

                {/* Seção de Medicamentos */}
                {renderDataSection('💊 MEDICAMENTOS EM USO', dashboardData.quaisMedicamentos, '💊')}

                {/* Seção de Histórico Familiar */}
                {(dashboardData.doencasHereditarias || dashboardData.condicoesCronicas) && (
                    <View style={styles.dataSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionIcon}>👨‍👩‍👧‍👦</Text>
                            <Text style={styles.sectionTitle}>HISTÓRICO FAMILIAR</Text>
                        </View>
                        <View style={styles.dataContent}>
                            {dashboardData.doencasHereditarias && (
                                <Text style={styles.dataText}>• Doenças hereditárias: {dashboardData.doencasHereditarias}</Text>
                            )}
                            {dashboardData.quaisDoencasHereditarias && (
                                <Text style={styles.dataText}>  {dashboardData.quaisDoencasHereditarias}</Text>
                            )}
                            {dashboardData.condicoesCronicas && (
                                <Text style={styles.dataText}>• Condições crônicas: {dashboardData.condicoesCronicas}</Text>
                            )}
                            {dashboardData.quaisCondicoes && (
                                <Text style={styles.dataText}>  {dashboardData.quaisCondicoes}</Text>
                            )}
                        </View>
                    </View>
                )}

                {/* Seção de Hábitos de Vida */}
                {(dashboardData.tabagismo || dashboardData.consumoAlcool || dashboardData.atividadeFisica) && (
                    <View style={styles.dataSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionIcon}>🧠</Text>
                            <Text style={styles.sectionTitle}>HÁBITOS DE VIDA</Text>
                        </View>
                        <View style={styles.dataContent}>
                            {dashboardData.tabagismo && (
                                <Text style={styles.dataText}>• Tabagismo: {dashboardData.tabagismo}</Text>
                            )}
                            {dashboardData.consumoAlcool && (
                                <Text style={styles.dataText}>• Consumo de álcool: {dashboardData.consumoAlcool}</Text>
                            )}
                            {dashboardData.atividadeFisica && (
                                <Text style={styles.dataText}>• Atividade física: {dashboardData.atividadeFisica}</Text>
                            )}
                            {dashboardData.habitosAlimentares && (
                                <Text style={styles.dataText}>• Hábitos alimentares: {dashboardData.habitosAlimentares}</Text>
                            )}
                        </View>
                    </View>
                )}

                {/* Seção de Hipóteses Diagnósticas */}
                {renderDataSection('🔍 HIPÓTESES DIAGNÓSTICAS', dashboardData.hipotesesDiagnosticas, '🔍')}

                {/* Seção de Conduta */}
                {renderDataSection('📋 CONDUTA INICIAL', dashboardData.condutaInicial, '📋')}

                {/* Seção de Encaminhamentos */}
                {renderDataSection('➡️ ENCAMINHAMENTOS', dashboardData.encaminhamentos, '➡️')}

                {/* Seção de Observações Clínicas */}
                {renderDataSection('📝 OBSERVAÇÕES CLÍNICAS', dashboardData.observacoesClinicas, '📝')}

                {/* Seção de Tratamentos Anteriores */}
                {renderDataSection('💉 TRATAMENTOS ANTERIORES', dashboardData.tratamentosAnteriores, '💉')}

                {/* Seção de Exames Realizados */}
                {renderDataSection('🔬 EXAMES REALIZADOS', dashboardData.examesRealizados, '🔬')}

                {/* Seção de Impacto na Rotina */}
                {renderDataSection('📅 IMPACTO NA ROTINA', dashboardData.impactoRotina, '📅')}

                {/* Footer do documento */}
                <View style={styles.documentFooter}>
                    <Text style={styles.footerText}>Documento gerado em {new Date().toLocaleString('pt-BR')}</Text>
                    <Text style={styles.footerText}>Sistema de Avaliação de Pacientes</Text>
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
});

export default Dashboard;
