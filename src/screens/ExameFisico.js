import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
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
import { useExameFisico } from '../context/ExameFisicoContext';

const ExameFisico = ({ navigation, route }) => {
    const { paciente } = route.params;
    
    // Hook para acessar o Context do Exame Físico
    const { salvarExameFisico, getExameFisicoData } = useExameFisico();
    
    // Estado para controlar quais seções estão expandidas
    const [expandedSections, setExpandedSections] = useState({});
    
    // Estados para o sistema de persistência
    const [modalSalvarVisible, setModalSalvarVisible] = useState(false);
    const [modalListaVisible, setModalListaVisible] = useState(false);
    const [salvando, setSalvando] = useState(false);
    
    // Estado para os dados do exame físico
    const [formData, setFormData] = useState({
        dataAvaliacao: new Date().toLocaleDateString('pt-BR'),
        
        // Seção 1: Histórico Funcional
        limitacoesFuncionais: '',
        dispositivosAuxiliares: [],
        alteracoesMarcha: [],
        observacoesHistorico: '',
        statusHistorico: 0,
        
        // Seção 2: Impressão Geral
        impressaoGeral: [],
        outrosImpressao: '',
        statusImpressao: 0,
        
        // Seção 3: Avaliação da Dor
        localizacaoDor: [],
        observacoesDorLocal: '',
        statusLocalizacao: 0,
        tipoDor: [],
        observacoesTipoDor: '',
        statusTipoDor: 0,
        intensidadeDor: [],
        observacoesIntensidade: '',
        statusIntensidadeDor: 0,
        frequenciaDuracao: [],
        observacoesFrequencia: '',
        statusFrequenciaDuracao: 0,
        irradiacaoDor: [],
        observacoesIrradiacao: '',
        statusIrradiacao: 0,
        
        // Seção 4: Sinais Vitais
        pressaoArterial: '',
        frequenciaCardiaca: '',
        frequenciaRespiratoria: '',
        temperatura: '',
        estatura: '',
        peso: '',
        imc: '',
        classificacaoIMC: '',
        
        // Seção 4-5: Exames Fisioterapêuticos
        inspecaoPostural: [],
        observacoesInspecao: '',
        statusInspecao: 0,
        palpacao: [],
        observacoesPalpacao: '',
        statusPalpacao: 0,
        amplitudeMovimento: [],
        observacoesAmplitude: '',
        statusAmplitude: 0,
        forcaMuscular: [],
        observacoesForca: '',
        statusForca: 0,
        tonusMuscular: [],
        observacoesTonus: '',
        statusTonusMuscular: 0,
        coordenacao: {
            dedoNariz: '',
            indexIndex: '',
            indexNariz: '',
            diadococinesia: '',
            calcanharJoelho: '',
            grafia: ''
        },
        observacoesCoordenacao: '',
        statusCoordenacao: 0,
        equilibrio: {
            romberg: '',
            tandem: '',
            sentarLevantar: '',
            alcanceFuncional: '',
            timedUpGo: '',
            marchaTandem: '',
            degrau: '',
            berg: '',
            tinetti: ''
        },
        observacoesEquilibrio: '',
        statusEquilibrio: 0,
        reflexosSuperiores: [],
        observacoesReflexosSuperiores: '',
        statusReflexosSuperiores: 0,
        reflexosInferiores: [],
        observacoesReflexosInferiores: '',
        statusReflexosInferiores: 0,
        reflexosPatologicos: [],
        outrosReflexosPatologicos: '',
        statusReflexosPatologicos: '',
        statusReflexosPatologicosExame: 0,
        manobrasDeficitarias: {
            bracosEstendidos: '',
            barre: '',
            mingazzini: ''
        },
        observacoesManobrasDeficitarias: '',
        statusManobrasDeficitarias: 0,
        tiposMarcha: [],
        observacoesMarcha: '',
        statusMarcha: 0,
        sensibilidadeSuperficial: {
            tatil: '',
            termica: '',
            dolorosa: ''
        },
        observacoesSensibilidadeSuperficial: '',
        statusSensibilidadeSuperficial: 0,
        sensibilidadeProfunda: {
            vibratoria: '',
            pressao: '',
            peso: '',
            formato: '',
            grafestesia: '',
            propriocepcao: ''
        },
        observacoesSensibilidadeProfunda: '',
        statusSensibilidadeProfunda: 0,
        
        // Seção 6: Avaliação Respiratória
        inspecaoToracica: [],
        statusInspecaoToracica: 0,
        palpacaoRespiratoria: [],
        statusPalpacaoRespiratoria: 0,
        auscultaRespiratoria: [],
        statusAuscultaRespiratoria: 0,
        percussaoRespiratoria: [],
        observacoesPercussao: '',
        statusPercussao: 0,
        frequenciaRespiratoriaDet: '',
        saturacaoO2: '',
        tipoOxigenoterapia: [],
        fluxoO2: '',
        escalaDispneia: [],
        observacoesParametrosResp: '',
        statusParametrosResp: 0,
        tosse: [],
        secrecao: [],
        expectoracao: [],
        dorToracica: [],
        intoleranciEsforco: [],
        observacoesClinicasResp: '',
        statusObservacoesClinicas: 0,
        statusVentilacaoMecanica: 0,
        tipoInterface: [],
        outroInterface: '',
        modoVentilatorio: [],
        outroModoVentilatorio: '',
        ipap: '',
        epapPeep: '',
        pip: '',
        pawPressaoMedia: '',
        fio2: [],
        outroFio2: '',
        tempoUsoDiario: [],
        outroTempoUso: '',
        sincroniaPacienteVentilador: [],
        observacoesSincronia: '',
        sinaisDesconforto: [],
        outrosSinaisDesconforto: '',
        observacoesSinaisDesconforto: '',
        secrecaoVM: [],
        observacoesSecrecaoVM: '',
        aspiracaoViasAereas: [],
        observacoesAspiracao: '',
        
        // Seção 7: Avaliação dos Sistemas
        sistemaRespiratorio: [],
        outroSistemaRespiratorio: '',
        observacoesSistemaRespiratorio: '',
        statusSistemaRespiratorio: 0,
        sistemaCardiovascular: [],
        outroSistemaCardiovascular: '',
        observacoesSistemaCardiovascular: '',
        statusSistemaCardiovascular: 0,
        sistemaGastrointestinal: [],
        outroSistemaGastrointestinal: '',
        observacoesSistemaGastrointestinal: '',
        statusSistemaGastrointestinal: 0,
        sistemaNeurologico: [],
        outroSistemaNeurologico: '',
        observacoesSistemaNeurologico: '',
        statusSistemaNeurologico: 0,
        sistemaGeniturinario: [],
        outroSistemaGeniturinario: '',
        observacoesSistemaGeniturinario: '',
        statusSistemaGeniturinario: 0,
        sistemaMusculoesqueletico: [],
        outroSistemaMusculoesqueletico: '',
        observacoesSistemaMusculoesqueletico: '',
        statusSistemaMusculoesqueletico: 0,
        sistemaDermatologico: [],
        outroSistemaDermatologico: '',
        observacoesSistemaDermatologico: '',
        statusSistemaDermatologico: 0,
        
        // Seção 8: Conduta Fisioterapêutica - Objetivos
        metasCurtoPrazo: [],
        outroMetasCurto: '',
        descricaoMetasCurto: '',
        metasMedioPrazo: [],
        outroMetasMedio: '',
        descricaoMetasMedio: '',
        metasLongoPrazo: [],
        outroMetasLongo: '',
        descricaoMetasLongo: '',
        focoTerapeutico: [],
        outroFocoTerapeutico: '',
        descricaoFocoTerapeutico: '',
        
        // Conduta Fisioterapêutica - Plano
        tecnicasUtilizadas: '',
        frequenciaSessoes: [],
        observacoesFrequenciaSessoes: '',
        duracaoSessoes: [],
        outraDuracaoSessoes: '',
        encaminhamentos: [],
        outrosEncaminhamentos: '',
        observacoesEncaminhamentos: '',
        statusConduta: 0,
        observacoesEvolucao: ''
    });

    // useEffect para carregar dados salvos quando o componente montar
    useEffect(() => {
        const dadosSalvos = getExameFisicoData(paciente.prontuario);
        if (dadosSalvos && Object.keys(dadosSalvos).length > 0) {
            setFormData(prev => ({ ...prev, ...dadosSalvos }));
        }
    }, [paciente.prontuario]);

    // Função para calcular IMC
    const calcularIMC = (peso, altura) => {
        if (peso && altura) {
            const alturaM = altura / 100;
            const imc = peso / (alturaM * alturaM);
            let classificacao = '';
            
            if (imc < 18.5) classificacao = 'Abaixo do peso';
            else if (imc < 25) classificacao = 'Peso normal';
            else if (imc < 30) classificacao = 'Sobrepeso';
            else if (imc < 35) classificacao = 'Obesidade Grau I';
            else if (imc < 40) classificacao = 'Obesidade Grau II';
            else classificacao = 'Obesidade Grau III';
            
            return { imc: imc.toFixed(1), classificacao };
        }
        return { imc: '', classificacao: '' };
    };

    // Função para atualizar peso e altura e calcular IMC automaticamente
    const handlePesoAlturaChange = (campo, valor) => {
        const newFormData = { ...formData, [campo]: valor };
        
        if (campo === 'peso' || campo === 'estatura') {
            const resultado = calcularIMC(
                campo === 'peso' ? valor : formData.peso,
                campo === 'estatura' ? valor : formData.estatura
            );
            newFormData.imc = resultado.imc;
            newFormData.classificacaoIMC = resultado.classificacao;
        }
        
        setFormData(newFormData);
    };

    // Função para alternar checkbox
    const toggleCheckbox = (campo, valor) => {
        const currentArray = formData[campo] || [];
        const newArray = currentArray.includes(valor)
            ? currentArray.filter(item => item !== valor)
            : [...currentArray, valor];
        setFormData({ ...formData, [campo]: newArray });
    };

    // Função para alterar status (Bom/Atenção/Ruim)
    const handleStatusChange = (campo, valor) => {
        setFormData({ ...formData, [campo]: valor });
    };

    // Função para renderizar botões de status
    const renderStatusButtons = (campo) => (
        <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status do exame:</Text>
            <View style={styles.statusButtons}>
                <TouchableOpacity
                    style={[styles.statusButton, formData[campo] === 1 && styles.statusButtonGood]}
                    onPress={() => handleStatusChange(campo, 1)}
                >
                    <Text style={[styles.statusButtonText, formData[campo] === 1 && styles.statusButtonTextActive]}>
                        Bom (+1)
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.statusButton, formData[campo] === 0 && styles.statusButtonAttention]}
                    onPress={() => handleStatusChange(campo, 0)}
                >
                    <Text style={[styles.statusButtonText, formData[campo] === 0 && styles.statusButtonTextActive]}>
                        Atenção (0)
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.statusButton, formData[campo] === -1 && styles.statusButtonBad]}
                    onPress={() => handleStatusChange(campo, -1)}
                >
                    <Text style={[styles.statusButtonText, formData[campo] === -1 && styles.statusButtonTextActive]}>
                        Ruim (-1)
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    // Função para renderizar checkbox
    const renderCheckbox = (campo, valor, label) => (
        <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => toggleCheckbox(campo, valor)}
        >
            <View style={[styles.checkbox, formData[campo]?.includes(valor) && styles.checkboxChecked]}>
                {formData[campo]?.includes(valor) && <Text style={styles.checkboxIcon}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>{label}</Text>
        </TouchableOpacity>
    );

    // Função para renderizar checkbox com subcampos
    const renderSubFieldCheckbox = (field, subField, value, label) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    const newFormData = { ...formData };
                    // Se o valor já está selecionado, remove a seleção (toggle)
                    if (newFormData[field]?.[subField] === value) {
                        newFormData[field] = { ...newFormData[field], [subField]: '' };
                    } else {
                        // Se não está selecionado, seleciona
                        newFormData[field] = { ...newFormData[field], [subField]: value };
                    }
                    setFormData(newFormData);
                }}
                style={styles.checkboxContainer}
            >
                <View style={[
                    styles.checkbox, 
                    formData[field]?.[subField] === value && styles.checkboxChecked
                ]}>
                    {formData[field]?.[subField] === value && <Text style={styles.checkboxIcon}>✓</Text>}
                </View>
                <Text style={{ color: 'black', marginLeft: 6, fontSize: 14, fontWeight: '500' }}>{label}</Text>
            </TouchableOpacity>
        );
    };

    // Funções para calcular evolução do paciente
    const getStatusCount = (statusValue) => {
        // Lista completa de todos os campos de status
        const allStatusFields = [
            'statusHistorico', 'statusImpressao', 'statusLocalizacao', 'statusTipoDor',
            'statusIntensidadeDor', 'statusFrequenciaDuracao', 'statusIrradiacao',
            'statusInspecao', 'statusPalpacao', 'statusAmplitude', 'statusForca',
            'statusTonusMuscular', 'statusCoordenacao', 'statusEquilibrio',
            'statusReflexosSuperiores', 'statusReflexosInferiores', 'statusReflexosPatologicosExame',
            'statusManobrasDeficitarias', 'statusMarcha', 'statusSensibilidadeSuperficial',
            'statusSensibilidadeProfunda', 'statusInspecaoToracica', 'statusPalpacaoRespiratoria',
            'statusAuscultaRespiratoria', 'statusPercussao', 'statusParametrosResp',
            'statusObservacoesClinicas', 'statusVentilacaoMecanica', 'statusSistemaRespiratorio',
            'statusSistemaCardiovascular', 'statusSistemaGastrointestinal', 'statusSistemaNeurologico',
            'statusSistemaGeniturinario', 'statusSistemaMusculoesqueletico', 'statusSistemaDermatologico',
            'statusConduta'
        ];
        
        return allStatusFields.filter(field => formData[field] === statusValue).length;
    };

    const getPontuacaoTotal = () => {
        // Lista completa de todos os campos de status
        const allStatusFields = [
            'statusHistorico', 'statusImpressao', 'statusLocalizacao', 'statusTipoDor',
            'statusIntensidadeDor', 'statusFrequenciaDuracao', 'statusIrradiacao',
            'statusInspecao', 'statusPalpacao', 'statusAmplitude', 'statusForca',
            'statusTonusMuscular', 'statusCoordenacao', 'statusEquilibrio',
            'statusReflexosSuperiores', 'statusReflexosInferiores', 'statusReflexosPatologicosExame',
            'statusManobrasDeficitarias', 'statusMarcha', 'statusSensibilidadeSuperficial',
            'statusSensibilidadeProfunda', 'statusInspecaoToracica', 'statusPalpacaoRespiratoria',
            'statusAuscultaRespiratoria', 'statusPercussao', 'statusParametrosResp',
            'statusObservacoesClinicas', 'statusVentilacaoMecanica', 'statusSistemaRespiratorio',
            'statusSistemaCardiovascular', 'statusSistemaGastrointestinal', 'statusSistemaNeurologico',
            'statusSistemaGeniturinario', 'statusSistemaMusculoesqueletico', 'statusSistemaDermatologico',
            'statusConduta'
        ];
        
        // Calcula a pontuação total somando todos os status
        return allStatusFields.reduce((total, field) => {
            const value = formData[field] || 0;
            return total + value;
        }, 0);
    };

    const getClassificacaoEvolucao = (pontuacao) => {
        if (pontuacao >= 20) return '🟢 Excelente';
        if (pontuacao >= 10) return '🟡 Bom';
        if (pontuacao >= 0) return '🟠 Regular';
        if (pontuacao >= -10) return '🔴 Ruim';
        return '⚫ Crítico';
    };

    const getPosicaoIndicador = () => {
        const pontuacao = getPontuacaoTotal();
        // Pontuação vai de -30 a +30, mapeia para 0-100%
        // -30 (crítico) = 0% (esquerda), +30 (excelente) = 100% (direita)
        const posicao = ((pontuacao + 30) / 60) * 100;
        return Math.max(0, Math.min(100, posicao));
    };

    const getEvolucaoPorSecao = () => {
        return [
            { nome: 'Histórico Funcional', pontuacao: formData.statusHistorico || 0 },
            { nome: 'Impressão Geral', pontuacao: formData.statusImpressao || 0 },
            { nome: 'Avaliação da Dor', pontuacao: (formData.statusLocalizacao || 0) + (formData.statusTipoDor || 0) + (formData.statusIntensidadeDor || 0) + (formData.statusFrequenciaDuracao || 0) + (formData.statusIrradiacao || 0) },
            { nome: 'Sinais Vitais', pontuacao: 0 }, // Não tem status específico
            { nome: 'Exames Fisioterapêuticos', pontuacao: (formData.statusInspecao || 0) + (formData.statusPalpacao || 0) + (formData.statusAmplitude || 0) + (formData.statusForca || 0) + (formData.statusTonusMuscular || 0) + (formData.statusCoordenacao || 0) + (formData.statusEquilibrio || 0) + (formData.statusReflexosSuperiores || 0) + (formData.statusReflexosInferiores || 0) + (formData.statusReflexosPatologicosExame || 0) + (formData.statusManobrasDeficitarias || 0) + (formData.statusMarcha || 0) + (formData.statusSensibilidadeSuperficial || 0) + (formData.statusSensibilidadeProfunda || 0) },
            { nome: 'Avaliação Respiratória', pontuacao: (formData.statusInspecaoToracica || 0) + (formData.statusPalpacaoRespiratoria || 0) + (formData.statusAuscultaRespiratoria || 0) + (formData.statusPercussao || 0) + (formData.statusParametrosResp || 0) + (formData.statusObservacoesClinicas || 0) + (formData.statusVentilacaoMecanica || 0) },
            { nome: 'Avaliação dos Sistemas', pontuacao: (formData.statusSistemaRespiratorio || 0) + (formData.statusSistemaCardiovascular || 0) + (formData.statusSistemaGastrointestinal || 0) + (formData.statusSistemaNeurologico || 0) + (formData.statusSistemaGeniturinario || 0) + (formData.statusSistemaMusculoesqueletico || 0) + (formData.statusSistemaDermatologico || 0) },
            { nome: 'Conduta Fisioterapêutica', pontuacao: formData.statusConduta || 0 }
        ];
    };

    const getCorSecao = (pontuacao) => {
        if (pontuacao >= 2) return '#28a745'; // Verde
        if (pontuacao >= 0) return '#ffc107'; // Amarelo
        if (pontuacao >= -2) return '#fd7e14'; // Laranja
        return '#dc3545'; // Vermelho
    };

    // Função para debug - mostra todos os campos de status e seus valores
    const debugStatusFields = () => {
        const allStatusFields = [
            'statusHistorico', 'statusImpressao', 'statusLocalizacao', 'statusTipoDor',
            'statusIntensidadeDor', 'statusFrequenciaDuracao', 'statusIrradiacao',
            'statusInspecao', 'statusPalpacao', 'statusAmplitude', 'statusForca',
            'statusTonusMuscular', 'statusCoordenacao', 'statusEquilibrio',
            'statusReflexosSuperiores', 'statusReflexosInferiores', 'statusReflexosPatologicosExame',
            'statusManobrasDeficitarias', 'statusMarcha', 'statusSensibilidadeSuperficial',
            'statusSensibilidadeProfunda', 'statusInspecaoToracica', 'statusPalpacaoRespiratoria',
            'statusAuscultaRespiratoria', 'statusPercussao', 'statusParametrosResp',
            'statusObservacoesClinicas', 'statusVentilacaoMecanica', 'statusSistemaRespiratorio',
            'statusSistemaCardiovascular', 'statusSistemaGastrointestinal', 'statusSistemaNeurologico',
            'statusSistemaGeniturinario', 'statusSistemaMusculoesqueletico', 'statusSistemaDermatologico',
            'statusConduta'
        ];
        
        console.log('=== DEBUG: TODOS OS CAMPOS DE STATUS ===');
        allStatusFields.forEach(field => {
            console.log(`${field}: ${formData[field] || 0}`);
        });
        console.log('=== PONTUAÇÃO TOTAL:', getPontuacaoTotal(), '===');
    };

    // Funções para o sistema de persistência
    const handleSalvarAvaliacao = async (nomeAvaliacao) => {
        setSalvando(true);
        
        try {
            // Validar dados antes de salvar
            const validacao = validarDadosAvaliacao(formData);
            if (!validacao.valido) {
                Alert.alert('Erro', validacao.erros.join('\n'));
                setSalvando(false);
                return;
            }

            // Criar dados da avaliação
            const pontuacaoTotal = getPontuacaoTotal();
            const statusGeral = getClassificacaoEvolucao(pontuacaoTotal);
            
            const avaliacaoData = createAvaliacaoData(
                formData, 
                nomeAvaliacao, 
                pontuacaoTotal, 
                statusGeral
            );

            // Salvar avaliação
            const resultado = await salvarAvaliacao(avaliacaoData);
            
            if (resultado.success) {
                Alert.alert('Sucesso!', resultado.message);
                setModalSalvarVisible(false);
            } else {
                Alert.alert('Erro', resultado.message);
            }
        } catch (error) {
            console.error('Erro ao salvar avaliação:', error);
            Alert.alert('Erro', 'Erro inesperado ao salvar avaliação.');
        } finally {
            setSalvando(false);
        }
    };

    const handleCarregarAvaliacao = (avaliacao) => {
        try {
            // Carregar dados da avaliação
            setFormData(avaliacao.dadosAvaliacao);
            
            Alert.alert(
                'Avaliação Carregada!', 
                `A avaliação "${avaliacao.nomeAvaliacao}" foi carregada com sucesso.`
            );
        } catch (error) {
            console.error('Erro ao carregar avaliação:', error);
            Alert.alert('Erro', 'Erro ao carregar avaliação.');
        }
    };

    const handleAbrirModalSalvar = () => {
        const validacao = validarDadosAvaliacao(formData);
        if (!validacao.valido) {
            Alert.alert('Atenção', validacao.erros.join('\n'));
            return;
        }
        setModalSalvarVisible(true);
    };

    // useEffect para salvar automaticamente os dados quando houver mudanças
    useEffect(() => {
        if (formData && Object.keys(formData).length > 0) {
            salvarExameFisico(paciente.prontuario, formData);
        }
    }, [formData, paciente.prontuario]);

    // Função para alternar o estado de expansão de uma seção
    const toggleSection = (sectionKey) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey]
        }));
    };

    // Dados das seções
    const sections = [
        { key: 'historicoFuncional', title: '1. HISTÓRICO FUNCIONAL', icon: '📋' },
        { key: 'impressaoGeral', title: '2. IMPRESSÃO GERAL', icon: '👁️' },
        { key: 'avaliacaoDor', title: '3. AVALIAÇÃO DA DOR', icon: '😣' },
        { key: 'sinaisVitais', title: '4. SINAIS VITAIS E OUTROS', icon: '💓' },
        { key: 'examesFisioterapeuticos', title: '5. EXAMES FISIOTERAPÊUTICOS', icon: '🔬' },
        { key: 'avaliacaoRespiratoria', title: '6. AVALIAÇÃO RESPIRATÓRIA', icon: '🫁' },
        { key: 'avaliacaoSistemas', title: '7. AVALIAÇÃO DOS SISTEMAS', icon: '⚕️' },
        { key: 'condutaFisioterapeutica', title: '8. CONDUTA FISIOTERAPÊUTICA', icon: '🎯' },
        { key: 'evolucaoPaciente', title: '9. EVOLUÇÃO DO PACIENTE', icon: '📈' }
    ];

    // Função para renderizar o conteúdo específico de cada seção
    const renderSectionContent = (sectionKey) => {
        switch(sectionKey) {
            case 'historicoFuncional':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>Data da Avaliação: {formData.dataAvaliacao}</Text>
                        
                        <Text style={styles.formLabel}>Limitações Funcionais Atuais:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                            value={formData.limitacoesFuncionais}
                            onChangeText={(text) => setFormData({...formData, limitacoesFuncionais: text})}
                            placeholder="Descreva as limitações funcionais atuais"
                            multiline
                        />

                        <Text style={styles.formLabel}>Uso de Dispositivos Auxiliares:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('dispositivosAuxiliares', 'nenhum', 'Nenhum')}
                            {renderCheckbox('dispositivosAuxiliares', 'muletas', 'Muletas')}
                            {renderCheckbox('dispositivosAuxiliares', 'andador', 'Andador')}
                            {renderCheckbox('dispositivosAuxiliares', 'cadeira_rodas', 'Cadeira de rodas')}
                            {renderCheckbox('dispositivosAuxiliares', 'orteses', 'Órteses')}
                            {renderCheckbox('dispositivosAuxiliares', 'proteses', 'Próteses')}
                            {renderCheckbox('dispositivosAuxiliares', 'bengala', 'Bengala')}
                            {renderCheckbox('dispositivosAuxiliares', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Alterações na Marcha ou Postura:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('alteracoesMarcha', 'nenhuma', 'Nenhuma')}
                            {renderCheckbox('alteracoesMarcha', 'escarvante', 'Escarvante')}
                            {renderCheckbox('alteracoesMarcha', 'hemiplegica', 'Hemiplégica')}
                            {renderCheckbox('alteracoesMarcha', 'parkinsoniana', 'Parkinsoniana')}
                            {renderCheckbox('alteracoesMarcha', 'anserina', 'Anserina')}
                            {renderCheckbox('alteracoesMarcha', 'tesoura', 'Tesoura')}
                            {renderCheckbox('alteracoesMarcha', 'antalgica', 'Antálgica')}
                            {renderCheckbox('alteracoesMarcha', 'espastica', 'Espástica')}
                            {renderCheckbox('alteracoesMarcha', 'ataxica', 'Atáxica')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                            value={formData.observacoesHistorico}
                            onChangeText={(text) => setFormData({...formData, observacoesHistorico: text})}
                            placeholder="Observações adicionais"
                            multiline
                        />

                        {renderStatusButtons('statusHistorico')}
                    </View>
                );

            case 'impressaoGeral':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.formLabel}>Impressão Geral:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('impressaoGeral', 'inconsciente', 'Inconsciente')}
                            {renderCheckbox('impressaoGeral', 'confuso', 'Confuso')}
                            {renderCheckbox('impressaoGeral', 'alteracao_linguagem', 'Alteração de linguagem')}
                            {renderCheckbox('impressaoGeral', 'fatigado', 'Fatigado')}
                            {renderCheckbox('impressaoGeral', 'cansado', 'Cansado')}
                            {renderCheckbox('impressaoGeral', 'ansioso', 'Ansioso')}
                            {renderCheckbox('impressaoGeral', 'deprimido', 'Deprimido')}
                            {renderCheckbox('impressaoGeral', 'apatico', 'Apático')}
                            {renderCheckbox('impressaoGeral', 'colaborante', 'Colaborante')}
                            {renderCheckbox('impressaoGeral', 'agressivo', 'Agressivo')}
                            {renderCheckbox('impressaoGeral', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outrosImpressao}
                            onChangeText={(text) => setFormData({...formData, outrosImpressao: text})}
                            placeholder="Especifique outros aspectos"
                        />

                        {renderStatusButtons('statusImpressao')}
                    </View>
                );

            case 'avaliacaoDor':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.formLabel}>Localização da Dor:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('localizacaoDor', 'cabeca', 'Cabeça')}
                            {renderCheckbox('localizacaoDor', 'pescoco', 'Pescoço')}
                            {renderCheckbox('localizacaoDor', 'ombro', 'Ombro')}
                            {renderCheckbox('localizacaoDor', 'braco', 'Braço')}
                            {renderCheckbox('localizacaoDor', 'antebraco', 'Antebraço')}
                            {renderCheckbox('localizacaoDor', 'mao', 'Mão')}
                            {renderCheckbox('localizacaoDor', 'torax', 'Tórax')}
                            {renderCheckbox('localizacaoDor', 'costas', 'Costas')}
                            {renderCheckbox('localizacaoDor', 'lombar', 'Lombar')}
                            {renderCheckbox('localizacaoDor', 'quadril', 'Quadril')}
                            {renderCheckbox('localizacaoDor', 'coxa', 'Coxa')}
                            {renderCheckbox('localizacaoDor', 'perna', 'Perna')}
                            {renderCheckbox('localizacaoDor', 'pe', 'Pé')}
                            {renderCheckbox('localizacaoDor', 'generalizada', 'Generalizada')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesDorLocal}
                            onChangeText={(text) => setFormData({...formData, observacoesDorLocal: text})}
                            multiline
                        />

                        {renderStatusButtons('statusLocalizacao')}

                        <Text style={styles.formLabel}>Tipo de Dor:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('tipoDor', 'aguda', 'Aguda')}
                            {renderCheckbox('tipoDor', 'cronica', 'Crônica')}
                            {renderCheckbox('tipoDor', 'irradiada', 'Irradiada')}
                            {renderCheckbox('tipoDor', 'pontada', 'Pontada')}
                            {renderCheckbox('tipoDor', 'queimacao', 'Queimação')}
                            {renderCheckbox('tipoDor', 'pressao', 'Pressão')}
                            {renderCheckbox('tipoDor', 'latejante', 'Latejante')}
                            {renderCheckbox('tipoDor', 'caimbra', 'Câimbra')}
                            {renderCheckbox('tipoDor', 'formigamento', 'Formigamento')}
                            {renderCheckbox('tipoDor', 'dormencia', 'Dormência')}
                            {renderCheckbox('tipoDor', 'eletrica', 'Elétrica')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesTipoDor}
                            onChangeText={(text) => setFormData({...formData, observacoesTipoDor: text})}
                            multiline
                        />

                        <Text style={styles.formLabel}>Intensidade da Dor:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('intensidadeDor', 'leve', 'Leve')}
                            {renderCheckbox('intensidadeDor', 'moderada', 'Moderada')}
                            {renderCheckbox('intensidadeDor', 'intensa', 'Intensa')}
                            {renderCheckbox('intensidadeDor', 'insuportavel', 'Insuportável')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesIntensidade}
                            onChangeText={(text) => setFormData({...formData, observacoesIntensidade: text})}
                            multiline
                        />

                        <Text style={styles.formLabel}>Frequência e Duração:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('frequenciaDuracao', 'constante', 'Constante')}
                            {renderCheckbox('frequenciaDuracao', 'intermitente', 'Intermitente')}
                            {renderCheckbox('frequenciaDuracao', 'matinal', 'Matinal')}
                            {renderCheckbox('frequenciaDuracao', 'vespertina', 'Vespertina')}
                            {renderCheckbox('frequenciaDuracao', 'noturna', 'Noturna')}
                            {renderCheckbox('frequenciaDuracao', 'ao_movimento', 'Ao movimento')}
                            {renderCheckbox('frequenciaDuracao', 'em_repouso', 'Em repouso')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesFrequencia}
                            onChangeText={(text) => setFormData({...formData, observacoesFrequencia: text})}
                            multiline
                        />

                        <Text style={styles.formLabel}>Irradiação da Dor:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('irradiacaoDor', 'nenhuma', 'Nenhuma')}
                            {renderCheckbox('irradiacaoDor', 'membro_superior', 'Membro superior')}
                            {renderCheckbox('irradiacaoDor', 'membro_inferior', 'Membro inferior')}
                            {renderCheckbox('irradiacaoDor', 'cabeca', 'Cabeça')}
                            {renderCheckbox('irradiacaoDor', 'torax', 'Tórax')}
                            {renderCheckbox('irradiacaoDor', 'costas', 'Costas')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesIrradiacao}
                            onChangeText={(text) => setFormData({...formData, observacoesIrradiacao: text})}
                            multiline
                        />

                        {renderStatusButtons('statusIrradiacao')}
                    </View>
                );

            case 'sinaisVitais':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>Data: {formData.dataAvaliacao}</Text>
                        <Text style={styles.formDescription}>Preencha os dados vitais e estado geral do paciente:</Text>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Pressão Arterial (mmHg):</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.pressaoArterial}
                                onChangeText={(text) => setFormData({...formData, pressaoArterial: text})}
                                placeholder="Ex: 120/80"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Frequência Cardíaca (bpm):</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.frequenciaCardiaca}
                                onChangeText={(text) => setFormData({...formData, frequenciaCardiaca: text})}
                                placeholder="Ex: 80"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Frequência Respiratória (rpm):</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.frequenciaRespiratoria}
                                onChangeText={(text) => setFormData({...formData, frequenciaRespiratoria: text})}
                                placeholder="Ex: 16"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Temperatura (°C):</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.temperatura}
                                onChangeText={(text) => setFormData({...formData, temperatura: text})}
                                placeholder="Ex: 36.5"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Estatura (cm):</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.estatura}
                                onChangeText={(text) => handlePesoAlturaChange('estatura', text)}
                                placeholder="Ex: 170"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Peso (Kg):</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.peso}
                                onChangeText={(text) => handlePesoAlturaChange('peso', text)}
                                placeholder="Ex: 70"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>IMC: {formData.imc}</Text>
                            <Text style={styles.classificacaoIMC}>Classificação: {formData.classificacaoIMC}</Text>
                        </View>
                    </View>
                );

            case 'examesFisioterapeuticos':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.formLabel}>Inspeção Postural:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('inspecaoPostural', 'normal', 'Normal')}
                            {renderCheckbox('inspecaoPostural', 'escoliose', 'Escoliose')}
                            {renderCheckbox('inspecaoPostural', 'cifose', 'Cifose')}
                            {renderCheckbox('inspecaoPostural', 'lordose', 'Lordose')}
                            {renderCheckbox('inspecaoPostural', 'assimetria', 'Assimetria')}
                            {renderCheckbox('inspecaoPostural', 'deformidades', 'Deformidades')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesInspecao}
                            onChangeText={(text) => setFormData({...formData, observacoesInspecao: text})}
                            multiline
                        />

                        {renderStatusButtons('statusInspecao')}

                        <Text style={styles.formLabel}>Palpação:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('palpacao', 'normal', 'Normal')}
                            {renderCheckbox('palpacao', 'pontos_dolorosos', 'Pontos dolorosos')}
                            {renderCheckbox('palpacao', 'contraturas', 'Contraturas')}
                            {renderCheckbox('palpacao', 'espasmos_musculares', 'Espasmos musculares')}
                            {renderCheckbox('palpacao', 'edema', 'Edema')}
                            {renderCheckbox('palpacao', 'alteracao_temperatura', 'Alteração de temperatura')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesPalpacao}
                            onChangeText={(text) => setFormData({...formData, observacoesPalpacao: text})}
                            multiline
                        />

                        {renderStatusButtons('statusPalpacao')}

                        <Text style={styles.formLabel}>Amplitude de Movimento:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('amplitudeMovimento', 'normal', 'Normal')}
                            {renderCheckbox('amplitudeMovimento', 'limitada_ativa', 'Limitada ativa')}
                            {renderCheckbox('amplitudeMovimento', 'limitada_passiva', 'Limitada passiva')}
                            {renderCheckbox('amplitudeMovimento', 'dor_movimento', 'Dor ao movimento')}
                            {renderCheckbox('amplitudeMovimento', 'rigidez', 'Rigidez')}
                            {renderCheckbox('amplitudeMovimento', 'hipermobilidade', 'Hipermobilidade')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesAmplitude}
                            onChangeText={(text) => setFormData({...formData, observacoesAmplitude: text})}
                            multiline
                        />

                        {renderStatusButtons('statusAmplitude')}

                        <Text style={styles.formLabel}>Força Muscular:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('forcaMuscular', 'normal', 'Normal')}
                            {renderCheckbox('forcaMuscular', 'fraqueza_leve', 'Fraqueza leve')}
                            {renderCheckbox('forcaMuscular', 'fraqueza_moderada', 'Fraqueza moderada')}
                            {renderCheckbox('forcaMuscular', 'fraqueza_grave', 'Fraqueza grave')}
                            {renderCheckbox('forcaMuscular', 'paralisia', 'Paralisia')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesForca}
                            onChangeText={(text) => setFormData({...formData, observacoesForca: text})}
                            multiline
                        />

                        {renderStatusButtons('statusForca')}

                        <View style={styles.tableContainer}>
                            <Text style={styles.tableTitle}>Escala de Força Muscular</Text>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeaderCell}>Grau</Text>
                                <Text style={styles.tableHeaderCell}>Descrição</Text>
                                <Text style={styles.tableHeaderCell}>Características</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>0</Text>
                                <Text style={styles.tableCell}>Ausência de contração</Text>
                                <Text style={styles.tableCell}>Nenhuma contração muscular palpável ou visível</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>1</Text>
                                <Text style={styles.tableCell}>Contração palpável</Text>
                                <Text style={styles.tableCell}>Contração muscular palpável, mas sem movimento articular</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>2</Text>
                                <Text style={styles.tableCell}>Movimento ativo sem gravidade</Text>
                                <Text style={styles.tableCell}>Movimento completo da articulação apenas com eliminação da gravidade</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>3</Text>
                                <Text style={styles.tableCell}>Movimento ativo contra gravidade</Text>
                                <Text style={styles.tableCell}>Movimento completo da articulação contra a gravidade, mas sem resistência adicional</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>4</Text>
                                <Text style={styles.tableCell}>Movimento ativo contra resistência</Text>
                                <Text style={styles.tableCell}>Movimento completo contra gravidade e resistência moderada</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>5</Text>
                                <Text style={styles.tableCell}>Força normal</Text>
                                <Text style={styles.tableCell}>Movimento completo contra gravidade e resistência máxima</Text>
                            </View>
                        </View>

                        <Text style={styles.formLabel}>Tônus Muscular:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('tonusMuscular', 'normal', 'Normal')}
                            {renderCheckbox('tonusMuscular', 'espasticidade', 'Espasticidade')}
                            {renderCheckbox('tonusMuscular', 'flacidez', 'Flacidez')}
                            {renderCheckbox('tonusMuscular', 'rigidez', 'Rigidez')}
                            {renderCheckbox('tonusMuscular', 'hipotonia', 'Hipotonia')}
                            {renderCheckbox('tonusMuscular', 'hipertonia', 'Hipertonia')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesTonus}
                            onChangeText={(text) => setFormData({...formData, observacoesTonus: text})}
                            multiline
                        />

                        <Text style={styles.formLabel}>Coordenação:</Text>
                        
                        <Text style={styles.subLabel}>Dedo-Nariz:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('coordenacao', 'dedoNariz', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('coordenacao', 'dedoNariz', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('coordenacao', 'dedoNariz', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Índex-Índex:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('coordenacao', 'indexIndex', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('coordenacao', 'indexIndex', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('coordenacao', 'indexIndex', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Índex-Nariz:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('coordenacao', 'indexNariz', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('coordenacao', 'indexNariz', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('coordenacao', 'indexNariz', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Diadococinesia:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('coordenacao', 'diadococinesia', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('coordenacao', 'diadococinesia', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('coordenacao', 'diadococinesia', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Calcanhar-Joelho:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('coordenacao', 'calcanharJoelho', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('coordenacao', 'calcanharJoelho', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('coordenacao', 'calcanharJoelho', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Grafia:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('coordenacao', 'grafia', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('coordenacao', 'grafia', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('coordenacao', 'grafia', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesCoordenacao}
                            onChangeText={(text) => setFormData({...formData, observacoesCoordenacao: text})}
                            multiline
                        />

                        {renderStatusButtons('statusCoordenacao')}

                        <Text style={styles.formLabel}>Equilíbrio Estático e Dinâmico:</Text>
                        
                        <Text style={styles.subLabel}>Romberg:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('equilibrio', 'romberg', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('equilibrio', 'romberg', 'alterado', 'Alterado')}
                        </View>

                        <Text style={styles.subLabel}>Tandem:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('equilibrio', 'tandem', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('equilibrio', 'tandem', 'alterado', 'Alterado')}
                        </View>

                        <Text style={styles.subLabel}>Sentar e Levantar:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('equilibrio', 'sentarLevantar', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('equilibrio', 'sentarLevantar', 'alterado', 'Alterado')}
                        </View>

                        <Text style={styles.subLabel}>Alcance Funcional:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('equilibrio', 'alcanceFuncional', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('equilibrio', 'alcanceFuncional', 'alterado', 'Alterado')}
                        </View>

                        <Text style={styles.subLabel}>Timed Up and Go:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('equilibrio', 'timedUpGo', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('equilibrio', 'timedUpGo', 'alterado', 'Alterado')}
                        </View>

                        <Text style={styles.subLabel}>Marcha Tandem:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('equilibrio', 'marchaTandem', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('equilibrio', 'marchaTandem', 'alterado', 'Alterado')}
                        </View>

                        <Text style={styles.subLabel}>Degrau:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('equilibrio', 'degrau', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('equilibrio', 'degrau', 'alterado', 'Alterado')}
                        </View>

                        <Text style={styles.subLabel}>Berg:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('equilibrio', 'berg', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('equilibrio', 'berg', 'alterado', 'Alterado')}
                        </View>

                        <Text style={styles.subLabel}>Tinetti:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('equilibrio', 'tinetti', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('equilibrio', 'tinetti', 'alterado', 'Alterado')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesEquilibrio}
                            onChangeText={(text) => setFormData({...formData, observacoesEquilibrio: text})}
                            multiline
                        />

                        {renderStatusButtons('statusEquilibrio')}

                        <Text style={styles.formLabel}>Reflexos Membros Superiores:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('reflexosSuperiores', 'preservado', 'Preservado')}
                            {renderCheckbox('reflexosSuperiores', 'exaltado', 'Exaltado')}
                            {renderCheckbox('reflexosSuperiores', 'diminuido', 'Diminuído')}
                            {renderCheckbox('reflexosSuperiores', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesReflexosSuperiores}
                            onChangeText={(text) => setFormData({...formData, observacoesReflexosSuperiores: text})}
                            multiline
                        />

                        {renderStatusButtons('statusReflexosSuperiores')}

                        <Text style={styles.formLabel}>Reflexos Membros Inferiores:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('reflexosInferiores', 'preservado', 'Preservado')}
                            {renderCheckbox('reflexosInferiores', 'exaltado', 'Exaltado')}
                            {renderCheckbox('reflexosInferiores', 'diminuido', 'Diminuído')}
                            {renderCheckbox('reflexosInferiores', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesReflexosInferiores}
                            onChangeText={(text) => setFormData({...formData, observacoesReflexosInferiores: text})}
                            multiline
                        />

                        {renderStatusButtons('statusReflexosInferiores')}

                        <Text style={styles.formLabel}>Reflexos Patológicos:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('reflexosPatologicos', 'babinski', 'Babinski')}
                            {renderCheckbox('reflexosPatologicos', 'hoffman', 'Hoffman')}
                            {renderCheckbox('reflexosPatologicos', 'clonus', 'Clônus')}
                            {renderCheckbox('reflexosPatologicos', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outrosReflexosPatologicos}
                            onChangeText={(text) => setFormData({...formData, outrosReflexosPatologicos: text})}
                        />

                        {renderStatusButtons('statusReflexosPatologicosExame')}

                        <Text style={styles.formLabel}>Manobras Deficitárias da Motricidade:</Text>
                        
                        <Text style={styles.subLabel}>Braços Estendidos:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('manobrasDeficitarias', 'bracosEstendidos', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('manobrasDeficitarias', 'bracosEstendidos', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('manobrasDeficitarias', 'bracosEstendidos', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Barre:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('manobrasDeficitarias', 'barre', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('manobrasDeficitarias', 'barre', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('manobrasDeficitarias', 'barre', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Mingazzini:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('manobrasDeficitarias', 'mingazzini', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('manobrasDeficitarias', 'mingazzini', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('manobrasDeficitarias', 'mingazzini', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.formLabel}>Marcha:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('tiposMarcha', 'normal', 'Normal')}
                            {renderCheckbox('tiposMarcha', 'antalgica', 'Antálgica')}
                            {renderCheckbox('tiposMarcha', 'espastica', 'Espástica')}
                            {renderCheckbox('tiposMarcha', 'ataxica', 'Atáxica')}
                            {renderCheckbox('tiposMarcha', 'escarvante', 'Escarvante')}
                            {renderCheckbox('tiposMarcha', 'hemiplegica', 'Hemiplégica')}
                            {renderCheckbox('tiposMarcha', 'parkinsoniana', 'Parkinsoniana')}
                            {renderCheckbox('tiposMarcha', 'anserina', 'Anserina')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesMarcha}
                            onChangeText={(text) => setFormData({...formData, observacoesMarcha: text})}
                            multiline
                        />

                        {renderStatusButtons('statusMarcha')}

                        <Text style={styles.formLabel}>Sensibilidade Superficial:</Text>
                        
                        <Text style={styles.subLabel}>Tátil:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('sensibilidadeSuperficial', 'tatil', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('sensibilidadeSuperficial', 'tatil', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('sensibilidadeSuperficial', 'tatil', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Térmica:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('sensibilidadeSuperficial', 'termica', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('sensibilidadeSuperficial', 'termica', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('sensibilidadeSuperficial', 'termica', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Dolorosa:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('sensibilidadeSuperficial', 'dolorosa', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('sensibilidadeSuperficial', 'dolorosa', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('sensibilidadeSuperficial', 'dolorosa', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesSensibilidadeSuperficial}
                            onChangeText={(text) => setFormData({...formData, observacoesSensibilidadeSuperficial: text})}
                            multiline
                        />

                        {renderStatusButtons('statusSensibilidadeSuperficial')}

                        <Text style={styles.formLabel}>Sensibilidade Profunda:</Text>
                        
                        <Text style={styles.subLabel}>Vibratória:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'vibratoria', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'vibratoria', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'vibratoria', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Pressão:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'pressao', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'pressao', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'pressao', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Peso:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'peso', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'peso', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'peso', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Formato:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'formato', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'formato', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'formato', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Grafestesia:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'grafestesia', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'grafestesia', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'grafestesia', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Propriocepção:</Text>
                        <View style={styles.radioGroup}>
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'propriocepcao', 'preservado', 'Preservado')}
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'propriocepcao', 'alterado', 'Alterado')}
                            {renderSubFieldCheckbox('sensibilidadeProfunda', 'propriocepcao', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesSensibilidadeProfunda}
                            onChangeText={(text) => setFormData({...formData, observacoesSensibilidadeProfunda: text})}
                            multiline
                        />

                        {renderStatusButtons('statusSensibilidadeProfunda')}
                    </View>
                );

            case 'avaliacaoRespiratoria':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.formLabel}>Inspeção Torácica:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('inspecaoToracica', 'presente', 'Presente')}
                            {renderCheckbox('inspecaoToracica', 'ausente', 'Ausente')}
                            {renderCheckbox('inspecaoToracica', 'assimetrico', 'Assimétrico')}
                            {renderCheckbox('inspecaoToracica', 'reduzido', 'Reduzido')}
                        </View>

                        {renderStatusButtons('statusInspecaoToracica')}

                        <Text style={styles.formLabel}>Palpação:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('palpacaoRespiratoria', 'presente', 'Presente')}
                            {renderCheckbox('palpacaoRespiratoria', 'ausente', 'Ausente')}
                            {renderCheckbox('palpacaoRespiratoria', 'assimetrico', 'Assimétrico')}
                            {renderCheckbox('palpacaoRespiratoria', 'reduzido', 'Reduzido')}
                        </View>

                        {renderStatusButtons('statusPalpacaoRespiratoria')}

                        <Text style={styles.formLabel}>Ausculta:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('auscultaRespiratoria', 'presente', 'Presente')}
                            {renderCheckbox('auscultaRespiratoria', 'ausente', 'Ausente')}
                            {renderCheckbox('auscultaRespiratoria', 'assimetrico', 'Assimétrico')}
                            {renderCheckbox('auscultaRespiratoria', 'reduzido', 'Reduzido')}
                        </View>

                        {renderStatusButtons('statusAuscultaRespiratoria')}

                        <Text style={styles.formLabel}>Percussão:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('percussaoRespiratoria', 'presente', 'Presente')}
                            {renderCheckbox('percussaoRespiratoria', 'ausente', 'Ausente')}
                            {renderCheckbox('percussaoRespiratoria', 'assimetrico', 'Assimétrico')}
                            {renderCheckbox('percussaoRespiratoria', 'reduzido', 'Reduzido')}
                            {renderCheckbox('percussaoRespiratoria', 'localizada', 'Localizada')}
                            {renderCheckbox('percussaoRespiratoria', 'difusa', 'Difusa')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesPercussao}
                            onChangeText={(text) => setFormData({...formData, observacoesPercussao: text})}
                            multiline
                        />

                        {renderStatusButtons('statusPercussao')}

                        <Text style={styles.formLabel}>Parâmetros Respiratórios:</Text>
                        
                        <Text style={styles.subLabel}>Frequência respiratória:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.frequenciaRespiratoriaDet}
                            onChangeText={(text) => setFormData({...formData, frequenciaRespiratoriaDet: text})}
                            placeholder="Ex: 16"
                            keyboardType="numeric"
                        />

                        <Text style={styles.subLabel}>Saturação de O₂:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.saturacaoO2}
                            onChangeText={(text) => setFormData({...formData, saturacaoO2: text})}
                            placeholder="Ex: 98%"
                            keyboardType="numeric"
                        />

                        <Text style={styles.subLabel}>Tipo de oxigenoterapia:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('tipoOxigenoterapia', 'cateter', 'Cateter')}
                            {renderCheckbox('tipoOxigenoterapia', 'mascara', 'Máscara')}
                            {renderCheckbox('tipoOxigenoterapia', 'vni', 'VNI')}
                            {renderCheckbox('tipoOxigenoterapia', 'vmi', 'VMI')}
                            {renderCheckbox('tipoOxigenoterapia', 'nenhum', 'Nenhum')}
                        </View>

                        <Text style={styles.subLabel}>Fluxo de O₂:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.fluxoO2}
                            onChangeText={(text) => setFormData({...formData, fluxoO2: text})}
                            placeholder="Ex: 2L/min"
                        />

                        <Text style={styles.subLabel}>Escala de dispneia:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('escalaDispneia', 'borg', 'Borg')}
                            {renderCheckbox('escalaDispneia', 'mrc', 'MRC')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesParametrosResp}
                            onChangeText={(text) => setFormData({...formData, observacoesParametrosResp: text})}
                            multiline
                        />

                        {renderStatusButtons('statusParametrosResp')}

                        <Text style={styles.formLabel}>Observações Clínicas:</Text>
                        
                        <Text style={styles.subLabel}>Tosse:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('tosse', 'seca', 'Seca')}
                            {renderCheckbox('tosse', 'produtiva', 'Produtiva')}
                            {renderCheckbox('tosse', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Secreção:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('secrecao', 'clara', 'Clara')}
                            {renderCheckbox('secrecao', 'amarelada', 'Amarelada')}
                            {renderCheckbox('secrecao', 'purulenta', 'Purulenta')}
                            {renderCheckbox('secrecao', 'hemoptoica', 'Hemoptoica')}
                        </View>

                        <Text style={styles.subLabel}>Expectoração:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('expectoracao', 'preservada', 'Preservada')}
                            {renderCheckbox('expectoracao', 'prejudicada', 'Prejudicada')}
                        </View>

                        <Text style={styles.subLabel}>Dor torácica:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('dorToracica', 'inspiratoria', 'Inspiratória')}
                            {renderCheckbox('dorToracica', 'continua', 'Contínua')}
                            {renderCheckbox('dorToracica', 'ausente', 'Ausente')}
                        </View>

                        <Text style={styles.subLabel}>Intolerância ao esforço:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('intoleranciEsforco', 'leve', 'Leve')}
                            {renderCheckbox('intoleranciEsforco', 'moderada', 'Moderada')}
                            {renderCheckbox('intoleranciEsforco', 'grave', 'Grave')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesClinicasResp}
                            onChangeText={(text) => setFormData({...formData, observacoesClinicasResp: text})}
                            multiline
                        />

                        {renderStatusButtons('statusObservacoesClinicas')}

                        <Text style={styles.sectionSubtitle}>Ventilação Mecânica (VNI/VMI)</Text>
                        
                        {renderStatusButtons('statusVentilacaoMecanica')}

                        <Text style={styles.formLabel}>🔹 Tipo de Interface:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('tipoInterface', 'mascara_facial', 'Máscara facial')}
                            {renderCheckbox('tipoInterface', 'mascara_nasal', 'Máscara nasal')}
                            {renderCheckbox('tipoInterface', 'mascara_total', 'Máscara total')}
                            {renderCheckbox('tipoInterface', 'tot', 'TOT (Tubo Orotraqueal)')}
                            {renderCheckbox('tipoInterface', 'tqt', 'TQT (Traqueostomia)')}
                            {renderCheckbox('tipoInterface', 'outro', 'Outro')}
                        </View>

                        <Text style={styles.formLabel}>Outro:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroInterface}
                            onChangeText={(text) => setFormData({...formData, outroInterface: text})}
                        />

                        <Text style={styles.formLabel}>🔹 Modo Ventilatório:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('modoVentilatorio', 'cpap', 'CPAP')}
                            {renderCheckbox('modoVentilatorio', 'bipap', 'BiPAP')}
                            {renderCheckbox('modoVentilatorio', 'psv', 'PSV')}
                            {renderCheckbox('modoVentilatorio', 'vc', 'VC (Volume Controlado)')}
                            {renderCheckbox('modoVentilatorio', 'pc', 'PC (Pressão Controlada)')}
                            {renderCheckbox('modoVentilatorio', 'simv', 'SIMV')}
                            {renderCheckbox('modoVentilatorio', 'assistido', 'Assistido')}
                            {renderCheckbox('modoVentilatorio', 'outro', 'Outro')}
                        </View>

                        <Text style={styles.formLabel}>Outro:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroModoVentilatorio}
                            onChangeText={(text) => setFormData({...formData, outroModoVentilatorio: text})}
                        />

                        <Text style={styles.formLabel}>🔹 Pressões Respiratórias (cmH₂O):</Text>
                        
                        <Text style={styles.subLabel}>IPAP:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.ipap}
                            onChangeText={(text) => setFormData({...formData, ipap: text})}
                            keyboardType="numeric"
                        />

                        <Text style={styles.subLabel}>EPAP / PEEP:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.epapPeep}
                            onChangeText={(text) => setFormData({...formData, epapPeep: text})}
                            keyboardType="numeric"
                        />

                        <Text style={styles.subLabel}>PIP:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.pip}
                            onChangeText={(text) => setFormData({...formData, pip: text})}
                            keyboardType="numeric"
                        />

                        <Text style={styles.subLabel}>Paw (Pressão média):</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.pawPressaoMedia}
                            onChangeText={(text) => setFormData({...formData, pawPressaoMedia: text})}
                            keyboardType="numeric"
                        />

                        <Text style={styles.formLabel}>🔹 FiO₂ (Frações de Oxigênio Inspirado):</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('fio2', '21', '21% (ar ambiente)')}
                            {renderCheckbox('fio2', '30', '30%')}
                            {renderCheckbox('fio2', '40', '40%')}
                            {renderCheckbox('fio2', '50', '50%')}
                            {renderCheckbox('fio2', '60', '60%')}
                            {renderCheckbox('fio2', '100', '100%')}
                            {renderCheckbox('fio2', 'outro', 'Outro')}
                        </View>

                        <Text style={styles.formLabel}>Outro:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroFio2}
                            onChangeText={(text) => setFormData({...formData, outroFio2: text})}
                        />

                        <Text style={styles.formLabel}>🔹 Tempo de Uso Diário:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('tempoUsoDiario', 'menos_2h', '< 2 horas')}
                            {renderCheckbox('tempoUsoDiario', '2_4h', '2–4 horas')}
                            {renderCheckbox('tempoUsoDiario', '4_8h', '4–8 horas')}
                            {renderCheckbox('tempoUsoDiario', 'mais_8h', '> 8 horas')}
                            {renderCheckbox('tempoUsoDiario', 'continuo', 'Contínuo')}
                            {renderCheckbox('tempoUsoDiario', 'outro', 'Outro')}
                        </View>

                        <Text style={styles.formLabel}>Outro:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroTempoUso}
                            onChangeText={(text) => setFormData({...formData, outroTempoUso: text})}
                        />

                        <Text style={styles.formLabel}>🔹 Sincronia Paciente-Ventilador:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('sincroniaPacienteVentilador', 'presente', 'Presente')}
                            {renderCheckbox('sincroniaPacienteVentilador', 'ausente', 'Ausente')}
                            {renderCheckbox('sincroniaPacienteVentilador', 'parcial', 'Parcial')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesSincronia}
                            onChangeText={(text) => setFormData({...formData, observacoesSincronia: text})}
                            multiline
                        />

                        <Text style={styles.formLabel}>🔹 Sinais de Desconforto:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('sinaisDesconforto', 'nenhum', 'Nenhum')}
                            {renderCheckbox('sinaisDesconforto', 'taquipneia', 'Taquipneia')}
                            {renderCheckbox('sinaisDesconforto', 'uso_musculatura', 'Uso de musculatura acessória')}
                            {renderCheckbox('sinaisDesconforto', 'agitacao', 'Agitação')}
                            {renderCheckbox('sinaisDesconforto', 'dispneia', 'Dispneia')}
                            {renderCheckbox('sinaisDesconforto', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outrosSinaisDesconforto}
                            onChangeText={(text) => setFormData({...formData, outrosSinaisDesconforto: text})}
                        />

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesSinaisDesconforto}
                            onChangeText={(text) => setFormData({...formData, observacoesSinaisDesconforto: text})}
                            multiline
                        />

                        <Text style={styles.formLabel}>🔹 Secreção:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('secrecaoVM', 'ausente', 'Ausente')}
                            {renderCheckbox('secrecaoVM', 'clara', 'Clara')}
                            {renderCheckbox('secrecaoVM', 'amarelada', 'Amarelada')}
                            {renderCheckbox('secrecaoVM', 'purulenta', 'Purulenta')}
                            {renderCheckbox('secrecaoVM', 'hemoptoica', 'Hemoptoica')}
                            {renderCheckbox('secrecaoVM', 'abundante', 'Abundante')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesSecrecaoVM}
                            onChangeText={(text) => setFormData({...formData, observacoesSecrecaoVM: text})}
                            multiline
                        />

                        <Text style={styles.formLabel}>🔹 Aspiração de Vias Aéreas:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('aspiracaoViasAereas', 'necessaria', 'Necessária')}
                            {renderCheckbox('aspiracaoViasAereas', 'nao_necessaria', 'Não necessária')}
                            {renderCheckbox('aspiracaoViasAereas', 'frequente', 'Frequente')}
                            {renderCheckbox('aspiracaoViasAereas', 'eventual', 'Eventual')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesAspiracao}
                            onChangeText={(text) => setFormData({...formData, observacoesAspiracao: text})}
                            multiline
                        />
                    </View>
                );

            case 'avaliacaoSistemas':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>Para cada sistema, selecione os achados relevantes e descreva observações clínicas:</Text>

                        <Text style={styles.formLabel}>🔹 Sistema Respiratório:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('sistemaRespiratorio', 'tosse', 'Tosse')}
                            {renderCheckbox('sistemaRespiratorio', 'dispneia', 'Dispneia')}
                            {renderCheckbox('sistemaRespiratorio', 'secrecao', 'Secreção')}
                            {renderCheckbox('sistemaRespiratorio', 'uso_musculatura', 'Uso de musculatura acessória')}
                            {renderCheckbox('sistemaRespiratorio', 'ruidos_adventicios', 'Ruídos adventícios')}
                            {renderCheckbox('sistemaRespiratorio', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroSistemaRespiratorio}
                            onChangeText={(text) => setFormData({...formData, outroSistemaRespiratorio: text})}
                        />

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesSistemaRespiratorio}
                            onChangeText={(text) => setFormData({...formData, observacoesSistemaRespiratorio: text})}
                            multiline
                        />

                        {renderStatusButtons('statusSistemaRespiratorio')}

                        <Text style={styles.formLabel}>🔹 Sistema Cardiovascular:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('sistemaCardiovascular', 'palpitacoes', 'Palpitações')}
                            {renderCheckbox('sistemaCardiovascular', 'edema_periferico', 'Edema periférico')}
                            {renderCheckbox('sistemaCardiovascular', 'dor_toracica', 'Dor torácica')}
                            {renderCheckbox('sistemaCardiovascular', 'hipotensao_hipertensao', 'Hipotensão / Hipertensão')}
                            {renderCheckbox('sistemaCardiovascular', 'cianose', 'Cianose')}
                            {renderCheckbox('sistemaCardiovascular', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroSistemaCardiovascular}
                            onChangeText={(text) => setFormData({...formData, outroSistemaCardiovascular: text})}
                        />

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesSistemaCardiovascular}
                            onChangeText={(text) => setFormData({...formData, observacoesSistemaCardiovascular: text})}
                            multiline
                        />

                        {renderStatusButtons('statusSistemaCardiovascular')}

                        <Text style={styles.formLabel}>🔹 Sistema Gastrointestinal:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('sistemaGastrointestinal', 'nauseas_vomitos', 'Náuseas / Vômitos')}
                            {renderCheckbox('sistemaGastrointestinal', 'diarreia_constipacao', 'Diarreia / Constipação')}
                            {renderCheckbox('sistemaGastrointestinal', 'dor_abdominal', 'Dor abdominal')}
                            {renderCheckbox('sistemaGastrointestinal', 'refluxo', 'Refluxo')}
                            {renderCheckbox('sistemaGastrointestinal', 'perda_apetite', 'Perda de apetite')}
                            {renderCheckbox('sistemaGastrointestinal', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroSistemaGastrointestinal}
                            onChangeText={(text) => setFormData({...formData, outroSistemaGastrointestinal: text})}
                        />

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesSistemaGastrointestinal}
                            onChangeText={(text) => setFormData({...formData, observacoesSistemaGastrointestinal: text})}
                            multiline
                        />

                        {renderStatusButtons('statusSistemaGastrointestinal')}

                        <Text style={styles.formLabel}>🔹 Sistema Neurológico:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('sistemaNeurologico', 'alteracoes_motoras', 'Alterações motoras')}
                            {renderCheckbox('sistemaNeurologico', 'alteracoes_sensitivas', 'Alterações sensitivas')}
                            {renderCheckbox('sistemaNeurologico', 'convulsoes', 'Convulsões')}
                            {renderCheckbox('sistemaNeurologico', 'deficits_cognitivos', 'Déficits cognitivos')}
                            {renderCheckbox('sistemaNeurologico', 'alteracoes_fala', 'Alterações de fala')}
                            {renderCheckbox('sistemaNeurologico', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroSistemaNeurologico}
                            onChangeText={(text) => setFormData({...formData, outroSistemaNeurologico: text})}
                        />

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesSistemaNeurologico}
                            onChangeText={(text) => setFormData({...formData, observacoesSistemaNeurologico: text})}
                            multiline
                        />

                        {renderStatusButtons('statusSistemaNeurologico')}

                        <Text style={styles.formLabel}>🔹 Sistema Geniturinário:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('sistemaGeniturinario', 'incontinencia_urinaria', 'Incontinência urinária')}
                            {renderCheckbox('sistemaGeniturinario', 'retencao_urinaria', 'Retenção urinária')}
                            {renderCheckbox('sistemaGeniturinario', 'infeccoes_recorrentes', 'Infecções recorrentes')}
                            {renderCheckbox('sistemaGeniturinario', 'dor_pelvica', 'Dor pélvica')}
                            {renderCheckbox('sistemaGeniturinario', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroSistemaGeniturinario}
                            onChangeText={(text) => setFormData({...formData, outroSistemaGeniturinario: text})}
                        />

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesSistemaGeniturinario}
                            onChangeText={(text) => setFormData({...formData, observacoesSistemaGeniturinario: text})}
                            multiline
                        />

                        {renderStatusButtons('statusSistemaGeniturinario')}

                        <Text style={styles.formLabel}>🔹 Sistema Musculoesquelético:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('sistemaMusculoesqueletico', 'dor_articular', 'Dor articular')}
                            {renderCheckbox('sistemaMusculoesqueletico', 'limitacao_movimento', 'Limitação de movimento')}
                            {renderCheckbox('sistemaMusculoesqueletico', 'fraqueza_muscular', 'Fraqueza muscular')}
                            {renderCheckbox('sistemaMusculoesqueletico', 'deformidades', 'Deformidades')}
                            {renderCheckbox('sistemaMusculoesqueletico', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroSistemaMusculoesqueletico}
                            onChangeText={(text) => setFormData({...formData, outroSistemaMusculoesqueletico: text})}
                        />

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesSistemaMusculoesqueletico}
                            onChangeText={(text) => setFormData({...formData, observacoesSistemaMusculoesqueletico: text})}
                            multiline
                        />

                        {renderStatusButtons('statusSistemaMusculoesqueletico')}

                        <Text style={styles.formLabel}>🔹 Sistema Dermatológico:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('sistemaDermatologico', 'lesoes_cutaneas', 'Lesões cutâneas')}
                            {renderCheckbox('sistemaDermatologico', 'ulceras_pressao', 'Úlceras de pressão')}
                            {renderCheckbox('sistemaDermatologico', 'eritema', 'Eritema')}
                            {renderCheckbox('sistemaDermatologico', 'prurido', 'Prurido')}
                            {renderCheckbox('sistemaDermatologico', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroSistemaDermatologico}
                            onChangeText={(text) => setFormData({...formData, outroSistemaDermatologico: text})}
                        />

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesSistemaDermatologico}
                            onChangeText={(text) => setFormData({...formData, observacoesSistemaDermatologico: text})}
                            multiline
                        />

                        {renderStatusButtons('statusSistemaDermatologico')}
                    </View>
                );

            case 'condutaFisioterapeutica':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>OBJETIVOS DO TRATAMENTO</Text>
                        <Text style={styles.formDescription}>Defina metas terapêuticas com base na avaliação:</Text>

                        <Text style={styles.formLabel}>🔹 Metas a Curto Prazo:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('metasCurtoPrazo', 'reducao_dor', 'Redução da dor')}
                            {renderCheckbox('metasCurtoPrazo', 'melhora_mobilidade', 'Melhora da mobilidade')}
                            {renderCheckbox('metasCurtoPrazo', 'aumento_forca', 'Aumento da força muscular')}
                            {renderCheckbox('metasCurtoPrazo', 'melhora_funcao_respiratoria', 'Melhora da função respiratória')}
                            {renderCheckbox('metasCurtoPrazo', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroMetasCurto}
                            onChangeText={(text) => setFormData({...formData, outroMetasCurto: text})}
                        />

                        <Text style={styles.formLabel}>Descrição:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                            value={formData.descricaoMetasCurto}
                            onChangeText={(text) => setFormData({...formData, descricaoMetasCurto: text})}
                            multiline
                        />

                        <Text style={styles.formLabel}>🔹 Metas a Médio Prazo:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('metasMedioPrazo', 'reeducacao_postural', 'Reeducação postural')}
                            {renderCheckbox('metasMedioPrazo', 'aumento_resistencia', 'Aumento da resistência física')}
                            {renderCheckbox('metasMedioPrazo', 'melhora_coordenacao', 'Melhora da coordenação')}
                            {renderCheckbox('metasMedioPrazo', 'independencia_funcional', 'Independência funcional')}
                            {renderCheckbox('metasMedioPrazo', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroMetasMedio}
                            onChangeText={(text) => setFormData({...formData, outroMetasMedio: text})}
                        />

                        <Text style={styles.formLabel}>Descrição:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                            value={formData.descricaoMetasMedio}
                            onChangeText={(text) => setFormData({...formData, descricaoMetasMedio: text})}
                            multiline
                        />

                        <Text style={styles.formLabel}>🔹 Metas a Longo Prazo:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('metasLongoPrazo', 'retorno_atividades', 'Retorno às atividades ocupacionais')}
                            {renderCheckbox('metasLongoPrazo', 'prevencao_recidivas', 'Prevenção de recidivas')}
                            {renderCheckbox('metasLongoPrazo', 'manutencao_funcionalidade', 'Manutenção da funcionalidade')}
                            {renderCheckbox('metasLongoPrazo', 'qualidade_vida', 'Qualidade de vida')}
                            {renderCheckbox('metasLongoPrazo', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroMetasLongo}
                            onChangeText={(text) => setFormData({...formData, outroMetasLongo: text})}
                        />

                        <Text style={styles.formLabel}>Descrição:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                            value={formData.descricaoMetasLongo}
                            onChangeText={(text) => setFormData({...formData, descricaoMetasLongo: text})}
                            multiline
                        />

                        <Text style={styles.formLabel}>🔹 Foco Terapêutico:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('focoTerapeutico', 'neurologico', 'Neurológico')}
                            {renderCheckbox('focoTerapeutico', 'respiratorio', 'Respiratório')}
                            {renderCheckbox('focoTerapeutico', 'musculoesqueletico', 'Musculoesquelético')}
                            {renderCheckbox('focoTerapeutico', 'funcional', 'Funcional')}
                            {renderCheckbox('focoTerapeutico', 'multissistemico', 'Multissistêmico')}
                            {renderCheckbox('focoTerapeutico', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outroFocoTerapeutico}
                            onChangeText={(text) => setFormData({...formData, outroFocoTerapeutico: text})}
                        />

                        <Text style={styles.formLabel}>Descrição:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                            value={formData.descricaoFocoTerapeutico}
                            onChangeText={(text) => setFormData({...formData, descricaoFocoTerapeutico: text})}
                            multiline
                        />

                        <Text style={styles.sectionSubtitle}>CONDUTA FISIOTERAPÊUTICA</Text>
                        <Text style={styles.formDescription}>Planeje a intervenção com base nos achados:</Text>

                        <Text style={styles.formLabel}>🔹 Técnicas a Serem Utilizadas:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 120, textAlignVertical: 'top' }]}
                            value={formData.tecnicasUtilizadas}
                            onChangeText={(text) => setFormData({...formData, tecnicasUtilizadas: text})}
                            placeholder="Descreva as técnicas fisioterapêuticas que serão utilizadas"
                            multiline
                        />

                        <Text style={styles.formLabel}>🔹 Frequência das Sessões:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('frequenciaSessoes', '1x_semana', '1x/semana')}
                            {renderCheckbox('frequenciaSessoes', '2x_semana', '2x/semana')}
                            {renderCheckbox('frequenciaSessoes', '3x_semana', '3x/semana')}
                            {renderCheckbox('frequenciaSessoes', 'diario', 'Diário')}
                            {renderCheckbox('frequenciaSessoes', 'conforme_evolucao', 'Conforme evolução')}
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.observacoesFrequenciaSessoes}
                            onChangeText={(text) => setFormData({...formData, observacoesFrequenciaSessoes: text})}
                            multiline
                        />

                        <Text style={styles.formLabel}>🔹 Duração das Sessões:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('duracaoSessoes', '30_minutos', '30 minutos')}
                            {renderCheckbox('duracaoSessoes', '45_minutos', '45 minutos')}
                            {renderCheckbox('duracaoSessoes', '60_minutos', '60 minutos')}
                            {renderCheckbox('duracaoSessoes', 'outro', 'Outro')}
                        </View>

                        <Text style={styles.formLabel}>Outro:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outraDuracaoSessoes}
                            onChangeText={(text) => setFormData({...formData, outraDuracaoSessoes: text})}
                        />

                        <Text style={styles.formLabel}>🔹 Encaminhamentos ou Equipe Multidisciplinar:</Text>
                        <View style={styles.checkboxGroup}>
                            {renderCheckbox('encaminhamentos', 'medico', 'Médico')}
                            {renderCheckbox('encaminhamentos', 'psicologo', 'Psicólogo')}
                            {renderCheckbox('encaminhamentos', 'fonoaudiologo', 'Fonoaudiólogo')}
                            {renderCheckbox('encaminhamentos', 'terapeuta_ocupacional', 'Terapeuta ocupacional')}
                            {renderCheckbox('encaminhamentos', 'nutricionista', 'Nutricionista')}
                            {renderCheckbox('encaminhamentos', 'assistente_social', 'Assistente social')}
                            {renderCheckbox('encaminhamentos', 'outros', 'Outros')}
                        </View>

                        <Text style={styles.formLabel}>Outros:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formData.outrosEncaminhamentos}
                            onChangeText={(text) => setFormData({...formData, outrosEncaminhamentos: text})}
                        />

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                            value={formData.observacoesEncaminhamentos}
                            onChangeText={(text) => setFormData({...formData, observacoesEncaminhamentos: text})}
                            placeholder="Observações sobre encaminhamentos"
                            multiline
                        />
                    </View>
                );

            case 'evolucaoPaciente':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>📊 EVOLUÇÃO DO PACIENTE</Text>
                        <Text style={styles.formDescription}>
                            Esta seção mostra o somatório dos status dos exames e a evolução geral do paciente
                        </Text>

                        {/* Resumo dos Status */}
                        <View style={styles.evolucaoContainer}>
                            <Text style={styles.evolucaoTitle}>Resumo dos Status dos Exames:</Text>
                            
                            <View style={styles.statusResumoContainer}>
                                <View style={styles.statusResumoItem}>
                                    <View style={[styles.statusIndicator, styles.statusBom]} />
                                    <Text style={styles.statusResumoText}>Bom (+1): {getStatusCount(1)} exames</Text>
                                </View>
                                
                                <View style={styles.statusResumoItem}>
                                    <View style={[styles.statusIndicator, styles.statusAtencao]} />
                                    <Text style={styles.statusResumoText}>Atenção (0): {getStatusCount(0)} exames</Text>
                                </View>
                                
                                <View style={styles.statusResumoItem}>
                                    <View style={[styles.statusIndicator, styles.statusRuim]} />
                                    <Text style={styles.statusResumoText}>Ruim (-1): {getStatusCount(-1)} exames</Text>
                                </View>
                            </View>

                            {/* Pontuação Total */}
                            <View style={styles.pontuacaoContainer}>
                                <Text style={styles.pontuacaoTitle}>Pontuação Total:</Text>
                                <Text style={styles.pontuacaoValor}>{getPontuacaoTotal()}</Text>
                                <Text style={styles.pontuacaoClassificacao}>
                                    {getClassificacaoEvolucao(getPontuacaoTotal())}
                                </Text>
                            </View>
                        </View>

                        {/* Linha de Evolução Visual */}
                        <View style={styles.evolucaoVisualContainer}>
                            <Text style={styles.evolucaoVisualTitle}>Linha de Evolução:</Text>
                            
                            <View style={styles.evolucaoBarraContainer}>
                                <View style={styles.evolucaoBarra}>
                                    <View 
                                        style={[
                                            styles.evolucaoIndicador, 
                                            { left: `${getPosicaoIndicador()}%` }
                                        ]} 
                                    />
                                </View>
                                
                                <View style={styles.evolucaoLabels}>
                                    <Text style={styles.evolucaoLabel}>Crítico</Text>
                                    <Text style={styles.evolucaoLabel}>Ruim</Text>
                                    <Text style={styles.evolucaoLabel}>Regular</Text>
                                    <Text style={styles.evolucaoLabel}>Bom</Text>
                                    <Text style={styles.evolucaoLabel}>Excelente</Text>
                                </View>
                            </View>
                        </View>

                        {/* Gráfico de Evolução por Seção */}
                        <View style={styles.graficoEvolucaoContainer}>
                            <Text style={styles.graficoEvolucaoTitle}>Evolução por Seção:</Text>
                            
                            {getEvolucaoPorSecao().map((secao, index) => (
                                <View key={index} style={styles.graficoSecaoItem}>
                                    <Text style={styles.graficoSecaoNome}>{secao.nome}</Text>
                                    <View style={styles.graficoSecaoBarra}>
                                        <View 
                                            style={[
                                                styles.graficoSecaoIndicador,
                                                { 
                                                    width: `${Math.max(0, (secao.pontuacao + 3) * 16.67)}%`,
                                                    backgroundColor: getCorSecao(secao.pontuacao)
                                                }
                                            ]} 
                                        />
                                    </View>
                                    <Text style={styles.graficoSecaoPontuacao}>{secao.pontuacao}</Text>
                                </View>
                            ))}
                        </View>


                        {/* Observações da Evolução */}
                        <Text style={styles.formLabel}>Observações da Evolução:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                            value={formData.observacoesEvolucao}
                            onChangeText={(text) => setFormData({...formData, observacoesEvolucao: text})}
                            placeholder="Descreva observações sobre a evolução do paciente"
                            multiline
                        />

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
                    <Text style={styles.title}>Exame Físico</Text>
                    <Text style={styles.subtitle}>Selecione uma seção para expandir</Text>
                    
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

            {/* Botão para Exames Complementares - Posicionado na tela principal */}
            <View style={styles.examesComplementaresContainer}>
                <TouchableOpacity 
                    style={styles.examesComplementaresButton}
                    onPress={() => navigation.navigate('ExamesComplementares', { paciente })}
                >
                    <Text style={styles.examesComplementaresButtonText}>
                        🔬 Exames Complementares
                    </Text>
                </TouchableOpacity>
            </View>
            
            {/* Modais */}
            <ModalSalvarAvaliacao
                visible={modalSalvarVisible}
                onClose={() => setModalSalvarVisible(false)}
                onConfirm={handleSalvarAvaliacao}
                loading={salvando}
                pontuacaoTotal={getPontuacaoTotal()}
                statusGeral={getClassificacaoEvolucao(getPontuacaoTotal())}
            />
            
            <ListaAvaliacoes
                visible={modalListaVisible}
                onClose={() => setModalListaVisible(false)}
                onCarregarAvaliacao={handleCarregarAvaliacao}
            />

            
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
    },
    pacienteNome: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    pacienteProntuario: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
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
    sectionSubtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007bff',
        marginBottom: 15,
        textAlign: 'center',
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
    formDescription: {
        fontSize: 13,
        color: '#6c757d',
        fontStyle: 'italic',
        marginBottom: 15,
    },
    subLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: '#495057',
        marginTop: 10,
        marginBottom: 5,
    },
    subSection: {
        marginBottom: 15,
        paddingLeft: 15,
        borderLeftWidth: 2,
        borderLeftColor: '#e9ecef',
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#007bff',
        borderRadius: 4,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    checkboxChecked: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    checkboxIcon: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#343a40',
        flex: 1,
        marginLeft: 8,
        fontWeight: '500',
    },
    checkboxGroup: {
        marginBottom: 15,
    },
    radioGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    statusContainer: {
        marginTop: 15,
        marginBottom: 15,
    },
    statusLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#343a40',
        marginBottom: 8,
    },
    statusButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    statusButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 6,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    statusButtonGood: {
        backgroundColor: '#28a745',
        borderColor: '#28a745',
    },
    statusButtonAttention: {
        backgroundColor: '#ffc107',
        borderColor: '#ffc107',
    },
    statusButtonBad: {
        backgroundColor: '#dc3545',
        borderColor: '#dc3545',
    },
    statusButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#343a40',
    },
    statusButtonTextActive: {
        color: '#fff',
    },
    classificacaoIMC: {
        fontSize: 14,
        fontWeight: '500',
        color: '#007bff',
        marginTop: 4,
    },
    tableContainer: {
        marginVertical: 15,
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
    },
    tableTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#343a40',
        textAlign: 'center',
        padding: 12,
        backgroundColor: '#007bff',
        color: '#fff',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
    },
    tableHeaderCell: {
        flex: 1,
        padding: 8,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#343a40',
        textAlign: 'center',
        backgroundColor: '#e9ecef',
    },
    tableCell: {
        flex: 1,
        padding: 8,
        fontSize: 11,
        color: '#495057',
        textAlign: 'center',
    },
    // Estilos para a seção de evolução do paciente
    evolucaoContainer: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#007bff',
    },
    evolucaoTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#343a40',
        marginBottom: 15,
        textAlign: 'center',
    },
    statusResumoContainer: {
        marginBottom: 20,
    },
    statusResumoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    statusIndicator: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 12,
    },
    statusBom: {
        backgroundColor: '#28a745',
    },
    statusAtencao: {
        backgroundColor: '#ffc107',
    },
    statusRuim: {
        backgroundColor: '#dc3545',
    },
    statusResumoText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#343a40',
        flex: 1,
    },
    pontuacaoContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    pontuacaoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6c757d',
        marginBottom: 8,
    },
    pontuacaoValor: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: 5,
    },
    pontuacaoClassificacao: {
        fontSize: 18,
        fontWeight: '600',
        color: '#343a40',
    },
    evolucaoVisualContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    evolucaoVisualTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#343a40',
        marginBottom: 15,
        textAlign: 'center',
    },
    evolucaoBarraContainer: {
        alignItems: 'center',
    },
    evolucaoBarra: {
        width: '100%',
        height: 20,
        backgroundColor: '#e9ecef',
        borderRadius: 10,
        marginBottom: 15,
        position: 'relative',
    },
    evolucaoIndicador: {
        position: 'absolute',
        top: 2,
        width: 16,
        height: 16,
        backgroundColor: '#007bff',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    evolucaoLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    evolucaoLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6c757d',
        textAlign: 'center',
        flex: 1,
    },
    graficoEvolucaoContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    graficoEvolucaoTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#343a40',
        marginBottom: 15,
        textAlign: 'center',
    },
    graficoSecaoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingVertical: 8,
    },
    graficoSecaoNome: {
        fontSize: 14,
        fontWeight: '600',
        color: '#343a40',
        width: '40%',
        marginRight: 10,
    },
    graficoSecaoBarra: {
        flex: 1,
        height: 12,
        backgroundColor: '#e9ecef',
        borderRadius: 6,
        marginRight: 10,
        overflow: 'hidden',
    },
    graficoSecaoIndicador: {
        height: '100%',
        borderRadius: 6,
        minWidth: 4,
    },
    graficoSecaoPontuacao: {
        fontSize: 14,
        fontWeight: '700',
        color: '#343a40',
        width: '15%',
        textAlign: 'center',
    },
    // Estilos para o botão de Exames Complementares na tela principal
    examesComplementaresContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#f8f9fa',
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
    },
    examesComplementaresButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    examesComplementaresButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ExameFisico;