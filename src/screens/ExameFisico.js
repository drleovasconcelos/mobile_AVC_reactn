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

const ExameFisico = ({ navigation, route }) => {
    const { paciente } = route.params;
    
    // Estado para controlar quais seções estão expandidas
    const [expandedSections, setExpandedSections] = useState({});
    
    // Estado para os dados do exame físico
    const [formData, setFormData] = useState({
        // Seção 1: Histórico Funcional
        atividadesDiarias: '',
        limitacoesFuncionais: '',
        independenciaFuncional: '',
        usoDispositivos: '',
        observacoesFuncionais: '',
        
        // Seção 2: Impressão Geral
        nivelConsciencia: '',
        estadoGeral: '',
        postura: '',
        marcha: '',
        equilibrio: '',
        observacoesImpressao: '',
        
        // Seção 3: Avaliação da Dor
        localizacaoDor: {
            cabeca: false,
            pescoco: false,
            ombro: false,
            braco: false,
            antebraco: false,
            mao: false,
            torax: false,
            costas: false,
            lombar: false,
            quadril: false,
            coxa: false,
            perna: false,
            pe: false,
            generalizada: false
        },
        observacoesLocalizacao: '',
        statusExame: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        tipoDor: {
            aguda: false,
            cronica: false,
            irradiada: false,
            pontada: false,
            queimacao: false,
            pressao: false,
            latejante: false,
            caimbra: false,
            formigamento: false,
            dormencia: false,
            eletrica: false
        },
        observacoesTipoDor: '',
        intensidadeDor: {
            leve: false,
            moderada: false,
            intensa: false,
            insuportavel: false
        },
        observacoesIntensidade: '',
        frequenciaDuracao: {
            constante: false,
            intermitente: false,
            matinal: false,
            vespertina: false,
            noturna: false,
            aoMovimento: false,
            emRepouso: false
        },
        observacoesFrequencia: '',
        irradiacaoDor: {
            nenhuma: false,
            membroSuperior: false,
            membroInferior: false,
            cabeca: false,
            torax: false,
            costas: false
        },
        observacoesIrradiacao: '',
        escalaDor: '',
        observacoesDor: '',
        
        // Seção 4: Sinais Vitais
        pressaoArterial: '',
        frequenciaCardiaca: '',
        frequenciaRespiratoria: '',
        temperatura: '',
        saturacaoOxigenio: '',
        observacoesSinaisVitais: '',
        
        // Seção 5: Exames Fisioterapêuticos
        inspecaoPostural: '',
        palpação: '',
        amplitudeMovimento: '',
        forcaMuscular: '',
        tonusMuscular: '',
        coordenacao: '',
        equilibrioEstatico: '',
        equilibrioDinamico: '',
        reflexos: '',
        reflexosPatologicos: '',
        manobrasDeficitarias: '',
        padraoMarcha: '',
        sensibilidadeSuperficial: '',
        sensibilidadeProfunda: '',
        observacoesExames: '',
        
        // Seção 6: Avaliação Respiratória
        padraoRespiratorio: '',
        expansibilidadeToracica: '',
        auscultaPulmonar: '',
        tosse: '',
        expectoracao: '',
        dispneia: '',
        observacoesRespiratorias: '',
        
        // Seção 7: Avaliação dos Sistemas
        sistemaRespiratorio: '',
        sistemaCardiovascular: '',
        sistemaGastrointestinal: '',
        sistemaNeurologico: '',
        sistemaGeniturinario: '',
        sistemaMusculoesqueletico: '',
        sistemaDermatologico: '',
        observacoesSistemas: '',
        
        // Seção 8: Conduta Fisioterapêutica
        hipoteseDiagnostica: '',
        objetivosTerapeuticos: '',
        planoTerapeutico: '',
        frequenciaTratamento: '',
        observacoesConduta: ''
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
            key: 'historicoFuncional',
            title: '1. HISTÓRICO FUNCIONAL',
            icon: '📋',
            content: 'Atividades diárias, limitações funcionais...'
        },
        {
            key: 'impressaoGeral',
            title: '2. IMPRESSÃO GERAL',
            icon: '👁️',
            content: 'Nível de consciência, postura, marcha...'
        },
        {
            key: 'avaliacaoDor',
            title: '3. AVALIAÇÃO DA DOR',
            icon: '😣',
            content: 'Localização, intensidade, características...'
        },
        {
            key: 'sinaisVitais',
            title: '4. SINAIS VITAIS',
            icon: '💓',
            content: 'PA, FC, FR, temperatura, SpO2...'
        },
        {
            key: 'examesFisioterapeuticos',
            title: '5. EXAMES FISIOTERAPÊUTICOS',
            icon: '🔬',
            content: 'Inspeção, palpação, ADM, força muscular...'
        },
        {
            key: 'avaliacaoRespiratoria',
            title: '6. AVALIAÇÃO RESPIRATÓRIA',
            icon: '🫁',
            content: 'Padrão respiratório, expansibilidade...'
        },
        {
            key: 'avaliacaoSistemas',
            title: '7. AVALIAÇÃO DOS SISTEMAS',
            icon: '⚕️',
            content: 'Respiratório, cardiovascular, neurológico...'
        },
        {
            key: 'condutaFisioterapeutica',
            title: '8. CONDUTA FISIOTERAPÊUTICA',
            icon: '🎯',
            content: 'Hipótese diagnóstica, objetivos, plano...'
        }
    ];

    // Função para renderizar o conteúdo específico de cada seção
    const renderSectionContent = (sectionKey) => {
        switch(sectionKey) {
            case 'historicoFuncional':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Atividades Diárias:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.atividadesDiarias}
                                onChangeText={(text) => setFormData({...formData, atividadesDiarias: text})}
                                placeholder="Descreva as atividades diárias do paciente"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Limitações Funcionais:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.limitacoesFuncionais}
                                onChangeText={(text) => setFormData({...formData, limitacoesFuncionais: text})}
                                placeholder="Descreva as limitações funcionais"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Independência Funcional:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.independenciaFuncional}
                                onChangeText={(text) => setFormData({...formData, independenciaFuncional: text})}
                                placeholder="Nível de independência funcional"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Uso de Dispositivos:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.usoDispositivos}
                                onChangeText={(text) => setFormData({...formData, usoDispositivos: text})}
                                placeholder="Dispositivos de auxílio utilizados"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.observacoesFuncionais}
                                onChangeText={(text) => setFormData({...formData, observacoesFuncionais: text})}
                                placeholder="Observações sobre o histórico funcional"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            case 'impressaoGeral':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Nível de Consciência:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.nivelConsciencia}
                                onChangeText={(text) => setFormData({...formData, nivelConsciencia: text})}
                                placeholder="Nível de consciência do paciente"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Estado Geral:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.estadoGeral}
                                onChangeText={(text) => setFormData({...formData, estadoGeral: text})}
                                placeholder="Estado geral do paciente"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Postura:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.postura}
                                onChangeText={(text) => setFormData({...formData, postura: text})}
                                placeholder="Descreva a postura do paciente"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Marcha:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.marcha}
                                onChangeText={(text) => setFormData({...formData, marcha: text})}
                                placeholder="Características da marcha"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Equilíbrio:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.equilibrio}
                                onChangeText={(text) => setFormData({...formData, equilibrio: text})}
                                placeholder="Avaliação do equilíbrio"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.observacoesImpressao}
                                onChangeText={(text) => setFormData({...formData, observacoesImpressao: text})}
                                placeholder="Observações sobre impressão geral"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            case 'avaliacaoDor':
                return (
                    <View style={styles.formContent}>
                        {/* Localização da Dor */}
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Localização da Dor:</Text>
                            <View style={styles.checkboxContainer}>
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.localizacaoDor.cabeca && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        localizacaoDor: {
                                            ...formData.localizacaoDor,
                                            cabeca: !formData.localizacaoDor.cabeca
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.localizacaoDor.cabeca && styles.checkboxTextSelected
                                    ]}>
                                        {formData.localizacaoDor.cabeca ? '☑' : '☐'} Cabeça
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.localizacaoDor.pescoco && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        localizacaoDor: {
                                            ...formData.localizacaoDor,
                                            pescoco: !formData.localizacaoDor.pescoco
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.localizacaoDor.pescoco && styles.checkboxTextSelected
                                    ]}>
                                        {formData.localizacaoDor.pescoco ? '☑' : '☐'} Pescoço
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.localizacaoDor.ombro && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        localizacaoDor: {
                                            ...formData.localizacaoDor,
                                            ombro: !formData.localizacaoDor.ombro
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.localizacaoDor.ombro && styles.checkboxRowSelected
                                    ]}>
                                        {formData.localizacaoDor.ombro ? '☑' : '☐'} Ombro
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.localizacaoDor.braco && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        localizacaoDor: {
                                            ...formData.localizacaoDor,
                                            braco: !formData.localizacaoDor.braco
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.localizacaoDor.braco && styles.checkboxTextSelected
                                    ]}>
                                        {formData.localizacaoDor.braco ? '☑' : '☐'} Braço
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.localizacaoDor.antebraco && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        localizacaoDor: {
                                            ...formData.localizacaoDor,
                                            antebraco: !formData.localizacaoDor.antebraco
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.localizacaoDor.antebraco && styles.checkboxRowSelected
                                    ]}>
                                        {formData.localizacaoDor.antebraco ? '☑' : '☐'} Antebraço
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.localizacaoDor.mao && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        localizacaoDor: {
                                            ...formData.localizacaoDor,
                                            mao: !formData.localizacaoDor.mao
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.localizacaoDor.mao && styles.checkboxTextSelected
                                    ]}>
                                        {formData.localizacaoDor.mao ? '☑' : '☐'} Mão
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.localizacaoDor.torax && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        localizacaoDor: {
                                            ...formData.localizacaoDor,
                                            torax: !formData.localizacaoDor.torax
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.localizacaoDor.torax && styles.checkboxRowSelected
                                    ]}>
                                        {formData.localizacaoDor.torax ? '☑' : '☐'} Tórax
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.localizacaoDor.costas && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        localizacaoDor: {
                                            ...formData.localizacaoDor,
                                            costas: !formData.localizacaoDor.costas
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.localizacaoDor.costas && styles.checkboxRowSelected
                                    ]}>
                                        {formData.localizacaoDor.costas ? '☑' : '☐'} Costas
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.localizacaoDor.lombar && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        localizacaoDor: {
                                            ...formData.localizacaoDor,
                                            lombar: !formData.localizacaoDor.lombar
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.localizacaoDor.lombar && styles.checkboxRowSelected
                                    ]}>
                                        {formData.localizacaoDor.lombar ? '☑' : '☐'} Lombar
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.localizacaoDor.quadril && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        localizacaoDor: {
                                            ...formData.localizacaoDor,
                                            quadril: !formData.localizacaoDor.quadril
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.localizacaoDor.quadril && styles.checkboxRowSelected
                                    ]}>
                                        {formData.localizacaoDor.quadril ? '☑' : '☐'} Quadril
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.localizacaoDor.coxa && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        localizacaoDor: {
                                            ...formData.localizacaoDor,
                                            coxa: !formData.localizacaoDor.coxa
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.localizacaoDor.coxa && styles.checkboxRowSelected
                                    ]}>
                                        {formData.localizacaoDor.coxa ? '☑' : '☐'} Coxa
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.localizacaoDor.perna && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        localizacaoDor: {
                                            ...formData.localizacaoDor,
                                            perna: !formData.localizacaoDor.perna
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.localizacaoDor.perna && styles.checkboxRowSelected
                                    ]}>
                                        {formData.localizacaoDor.perna ? '☑' : '☐'} Perna
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.localizacaoDor.pe && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        localizacaoDor: {
                                            ...formData.localizacaoDor,
                                            pe: !formData.localizacaoDor.pe
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.localizacaoDor.pe && styles.checkboxRowSelected
                                    ]}>
                                        {formData.localizacaoDor.pe ? '☑' : '☐'} Pé
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.localizacaoDor.generalizada && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        localizacaoDor: {
                                            ...formData.localizacaoDor,
                                            generalizada: !formData.localizacaoDor.generalizada
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.localizacaoDor.generalizada && styles.checkboxRowSelected
                                    ]}>
                                        {formData.localizacaoDor.generalizada ? '☑' : '☐'} Generalizada
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Observações da Localização */}
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações da Localização:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.observacoesLocalizacao}
                                onChangeText={(text) => setFormData({...formData, observacoesLocalizacao: text})}
                                placeholder="Observações sobre a localização da dor"
                                multiline
                            />
                        </View>
                        
                        {/* Status do Exame */}
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusContainer}>
                                <TouchableOpacity 
                                    style={[
                                        styles.statusButton,
                                        formData.statusExame === 'bom' && styles.statusButtonSelected
                                    ]}
                                    onPress={() => setFormData({...formData, statusExame: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.statusExame === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.statusButton,
                                        formData.statusExame === 'atencao' && styles.statusButtonSelected
                                    ]}
                                    onPress={() => setFormData({...formData, statusExame: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.statusExame === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.statusButton,
                                        formData.statusExame === 'ruim' && styles.statusButtonSelected
                                    ]}
                                    onPress={() => setFormData({...formData, statusExame: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.statusExame === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Tipo de Dor */}
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Tipo de Dor:</Text>
                            <View style={styles.checkboxContainer}>
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.tipoDor.aguda && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        tipoDor: {
                                            ...formData.tipoDor,
                                            aguda: !formData.tipoDor.aguda
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.tipoDor.aguda && styles.checkboxTextSelected
                                    ]}>
                                        {formData.tipoDor.aguda ? '☑' : '☐'} Aguda
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.tipoDor.cronica && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        tipoDor: {
                                            ...formData.tipoDor,
                                            cronica: !formData.tipoDor.cronica
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.tipoDor.cronica && styles.checkboxTextSelected
                                    ]}>
                                        {formData.tipoDor.cronica ? '☑' : '☐'} Crônica
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.tipoDor.irradiada && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        tipoDor: {
                                            ...formData.tipoDor,
                                            irradiada: !formData.tipoDor.irradiada
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.tipoDor.irradiada && styles.checkboxTextSelected
                                    ]}>
                                        {formData.tipoDor.irradiada ? '☑' : '☐'} Irradiada
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.tipoDor.pontada && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        tipoDor: {
                                            ...formData.tipoDor,
                                            pontada: !formData.tipoDor.pontada
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.tipoDor.pontada && styles.checkboxTextSelected
                                    ]}>
                                        {formData.tipoDor.pontada ? '☑' : '☐'} Pontada
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.tipoDor.queimacao && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        tipoDor: {
                                            ...formData.tipoDor,
                                            queimacao: !formData.tipoDor.queimacao
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.tipoDor.queimacao && styles.checkboxTextSelected
                                    ]}>
                                        {formData.tipoDor.queimacao ? '☑' : '☐'} Queimação
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.tipoDor.pressao && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        tipoDor: {
                                            ...formData.tipoDor,
                                            pressao: !formData.tipoDor.pressao
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.tipoDor.pressao && styles.checkboxTextSelected
                                    ]}>
                                        {formData.tipoDor.pressao ? '☑' : '☐'} Pressão
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.tipoDor.latejante && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        tipoDor: {
                                            ...formData.tipoDor,
                                            latejante: !formData.tipoDor.latejante
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.tipoDor.latejante && styles.checkboxTextSelected
                                    ]}>
                                        {formData.tipoDor.latejante ? '☑' : '☐'} Latejante
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.tipoDor.caimbra && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        tipoDor: {
                                            ...formData.tipoDor,
                                            caimbra: !formData.tipoDor.caimbra
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.tipoDor.caimbra && styles.checkboxTextSelected
                                    ]}>
                                        {formData.tipoDor.caimbra ? '☑' : '☐'} Câimbra
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.tipoDor.formigamento && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        tipoDor: {
                                            ...formData.tipoDor,
                                            formigamento: !formData.tipoDor.formigamento
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.tipoDor.formigamento && styles.checkboxTextSelected
                                    ]}>
                                        {formData.tipoDor.formigamento ? '☑' : '☐'} Formigamento
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.tipoDor.dormencia && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        tipoDor: {
                                            ...formData.tipoDor,
                                            dormencia: !formData.tipoDor.dormencia
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.tipoDor.dormencia && styles.checkboxTextSelected
                                    ]}>
                                        {formData.tipoDor.dormencia ? '☑' : '☐'} Dormência
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.tipoDor.eletrica && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        tipoDor: {
                                            ...formData.tipoDor,
                                            eletrica: !formData.tipoDor.eletrica
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.tipoDor.eletrica && styles.checkboxTextSelected
                                    ]}>
                                        {formData.tipoDor.eletrica ? '☑' : '☐'} Elétrica
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Observações do Tipo de Dor */}
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações do Tipo de Dor:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.observacoesTipoDor}
                                onChangeText={(text) => setFormData({...formData, observacoesTipoDor: text})}
                                placeholder="Observações sobre o tipo de dor"
                                multiline
                            />
                        </View>
                        
                        {/* Intensidade da Dor */}
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Intensidade da Dor:</Text>
                            <View style={styles.checkboxContainer}>
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.intensidadeDor.leve && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        intensidadeDor: {
                                            ...formData.intensidadeDor,
                                            leve: !formData.intensidadeDor.leve
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.intensidadeDor.leve && styles.checkboxTextSelected
                                    ]}>
                                        {formData.intensidadeDor.leve ? '☑' : '☐'} Leve
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.intensidadeDor.moderada && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        intensidadeDor: {
                                            ...formData.intensidadeDor,
                                            moderada: !formData.intensidadeDor.moderada
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.intensidadeDor.moderada && styles.checkboxTextSelected
                                    ]}>
                                        {formData.intensidadeDor.moderada ? '☑' : '☐'} Moderada
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.intensidadeDor.intensa && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        intensidadeDor: {
                                            ...formData.intensidadeDor,
                                            intensa: !formData.intensidadeDor.intensa
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.intensidadeDor.intensa && styles.checkboxTextSelected
                                    ]}>
                                        {formData.intensidadeDor.intensa ? '☑' : '☐'} Intensa
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.intensidadeDor.insuportavel && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        intensidadeDor: {
                                            ...formData.intensidadeDor,
                                            insuportavel: !formData.intensidadeDor.insuportavel
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.intensidadeDor.insuportavel && styles.checkboxTextSelected
                                    ]}>
                                        {formData.intensidadeDor.insuportavel ? '☑' : '☐'} Insuportável
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Observações da Intensidade */}
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações da Intensidade:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.observacoesIntensidade}
                                onChangeText={(text) => setFormData({...formData, observacoesIntensidade: text})}
                                placeholder="Observações sobre a intensidade da dor"
                                multiline
                            />
                        </View>
                        
                        {/* Frequência e Duração */}
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Frequência e Duração:</Text>
                            <View style={styles.checkboxContainer}>
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.frequenciaDuracao.constante && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        frequenciaDuracao: {
                                            ...formData.frequenciaDuracao,
                                            constante: !formData.frequenciaDuracao.constante
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.frequenciaDuracao.constante && styles.checkboxTextSelected
                                    ]}>
                                        {formData.frequenciaDuracao.constante ? '☑' : '☐'} Constante
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.frequenciaDuracao.intermitente && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        frequenciaDuracao: {
                                            ...formData.frequenciaDuracao,
                                            intermitente: !formData.frequenciaDuracao.intermitente
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.frequenciaDuracao.intermitente && styles.checkboxTextSelected
                                    ]}>
                                        {formData.frequenciaDuracao.intermitente ? '☑' : '☐'} Intermitente
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.frequenciaDuracao.matinal && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        frequenciaDuracao: {
                                            ...formData.frequenciaDuracao,
                                            matinal: !formData.frequenciaDuracao.matinal
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.frequenciaDuracao.matinal && styles.checkboxTextSelected
                                    ]}>
                                        {formData.frequenciaDuracao.matinal ? '☑' : '☐'} Matinal
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.frequenciaDuracao.vespertina && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        frequenciaDuracao: {
                                            ...formData.frequenciaDuracao,
                                            vespertina: !formData.frequenciaDuracao.vespertina
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.frequenciaDuracao.vespertina && styles.checkboxTextSelected
                                    ]}>
                                        {formData.frequenciaDuracao.vespertina ? '☑' : '☐'} Vespertina
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.frequenciaDuracao.noturna && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        frequenciaDuracao: {
                                            ...formData.frequenciaDuracao,
                                            noturna: !formData.frequenciaDuracao.noturna
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.frequenciaDuracao.noturna && styles.checkboxTextSelected
                                    ]}>
                                        {formData.frequenciaDuracao.noturna ? '☑' : '☐'} Noturna
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.frequenciaDuracao.aoMovimento && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        frequenciaDuracao: {
                                            ...formData.frequenciaDuracao,
                                            aoMovimento: !formData.frequenciaDuracao.aoMovimento
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.frequenciaDuracao.aoMovimento && styles.checkboxRowSelected
                                    ]}>
                                        {formData.frequenciaDuracao.aoMovimento ? '☑' : '☐'} Ao movimento
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.frequenciaDuracao.emRepouso && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        frequenciaDuracao: {
                                            ...formData.frequenciaDuracao,
                                            emRepouso: !formData.frequenciaDuracao.emRepouso
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.frequenciaDuracao.emRepouso && styles.checkboxTextSelected
                                    ]}>
                                        {formData.frequenciaDuracao.emRepouso ? '☑' : '☐'} Em repouso
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Observações da Frequência */}
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações da Frequência:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.observacoesFrequencia}
                                onChangeText={(text) => setFormData({...formData, observacoesFrequencia: text})}
                                placeholder="Observações sobre a frequência e duração da dor"
                                multiline
                            />
                        </View>
                        
                        {/* Irradiação da Dor */}
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Irradiação da Dor:</Text>
                            <View style={styles.checkboxContainer}>
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.irradiacaoDor.nenhuma && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        irradiacaoDor: {
                                            ...formData.irradiacaoDor,
                                            nenhuma: !formData.irradiacaoDor.nenhuma
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.irradiacaoDor.nenhuma && styles.checkboxTextSelected
                                    ]}>
                                        {formData.irradiacaoDor.nenhuma ? '☑' : '☐'} Nenhuma
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.irradiacaoDor.membroSuperior && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        irradiacaoDor: {
                                            ...formData.irradiacaoDor,
                                            membroSuperior: !formData.irradiacaoDor.membroSuperior
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.irradiacaoDor.membroSuperior && styles.checkboxTextSelected
                                    ]}>
                                        {formData.irradiacaoDor.membroSuperior ? '☑' : '☐'} Membro superior
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.irradiacaoDor.membroInferior && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        irradiacaoDor: {
                                            ...formData.irradiacaoDor,
                                            membroInferior: !formData.irradiacaoDor.membroInferior
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.irradiacaoDor.membroInferior && styles.checkboxTextSelected
                                    ]}>
                                        {formData.irradiacaoDor.membroInferior ? '☑' : '☐'} Membro inferior
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.irradiacaoDor.cabeca && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        irradiacaoDor: {
                                            ...formData.irradiacaoDor,
                                            cabeca: !formData.irradiacaoDor.cabeca
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.irradiacaoDor.cabeca && styles.checkboxTextSelected
                                    ]}>
                                        {formData.irradiacaoDor.cabeca ? '☑' : '☐'} Cabeça
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.irradiacaoDor.torax && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        irradiacaoDor: {
                                            ...formData.irradiacaoDor,
                                            torax: !formData.irradiacaoDor.torax
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.irradiacaoDor.torax && styles.checkboxTextSelected
                                    ]}>
                                        {formData.irradiacaoDor.torax ? '☑' : '☐'} Tórax
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.checkboxRow,
                                        formData.irradiacaoDor.costas && styles.checkboxRowSelected
                                    ]}
                                    onPress={() => setFormData({
                                        ...formData, 
                                        irradiacaoDor: {
                                            ...formData.irradiacaoDor,
                                            costas: !formData.irradiacaoDor.costas
                                        }
                                    })}
                                >
                                    <Text style={[
                                        styles.checkboxText,
                                        formData.irradiacaoDor.costas && styles.checkboxTextSelected
                                    ]}>
                                        {formData.irradiacaoDor.costas ? '☑' : '☐'} Costas
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Observações da Irradiação */}
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações da Irradiação:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.observacoesIrradiacao}
                                onChangeText={(text) => setFormData({...formData, observacoesIrradiacao: text})}
                                placeholder="Observações sobre a irradiação da dor"
                                multiline
                            />
                        </View>
                        
                        {/* Escala da Dor */}
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Escala da Dor:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.escalaDor}
                                onChangeText={(text) => setFormData({...formData, escalaDor: text})}
                                placeholder="Escala utilizada para avaliação"
                            />
                        </View>
                        
                        {/* Observações Gerais */}
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Gerais:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.observacoesDor}
                                onChangeText={(text) => setFormData({...formData, observacoesDor: text})}
                                placeholder="Observações gerais sobre a dor"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            case 'sinaisVitais':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Pressão Arterial:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.pressaoArterial}
                                onChangeText={(text) => setFormData({...formData, pressaoArterial: text})}
                                placeholder="Ex: 120/80 mmHg"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Frequência Cardíaca:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.frequenciaCardiaca}
                                onChangeText={(text) => setFormData({...formData, frequenciaCardiaca: text})}
                                placeholder="Ex: 80 bpm"
                                keyboardType="numeric"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Frequência Respiratória:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.frequenciaRespiratoria}
                                onChangeText={(text) => setFormData({...formData, frequenciaRespiratoria: text})}
                                placeholder="Ex: 16 irpm"
                                keyboardType="numeric"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Temperatura:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.temperatura}
                                onChangeText={(text) => setFormData({...formData, temperatura: text})}
                                placeholder="Ex: 36.5°C"
                                keyboardType="numeric"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Saturação de Oxigênio:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.saturacaoOxigenio}
                                onChangeText={(text) => setFormData({...formData, saturacaoOxigenio: text})}
                                placeholder="Ex: 98%"
                                keyboardType="numeric"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.observacoesSinaisVitais}
                                onChangeText={(text) => setFormData({...formData, observacoesSinaisVitais: text})}
                                placeholder="Observações sobre sinais vitais"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            case 'examesFisioterapeuticos':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Inspeção Postural:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.inspecaoPostural}
                                onChangeText={(text) => setFormData({...formData, inspecaoPostural: text})}
                                placeholder="Descreva a inspeção postural"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Palpação:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.palpação}
                                onChangeText={(text) => setFormData({...formData, palpação: text})}
                                placeholder="Descreva a palpação realizada"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Amplitude de Movimento:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.amplitudeMovimento}
                                onChangeText={(text) => setFormData({...formData, amplitudeMovimento: text})}
                                placeholder="Descreva a amplitude de movimento"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Força Muscular:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.forcaMuscular}
                                onChangeText={(text) => setFormData({...formData, forcaMuscular: text})}
                                placeholder="Avaliação da força muscular"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Tônus Muscular:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.tonusMuscular}
                                onChangeText={(text) => setFormData({...formData, tonusMuscular: text})}
                                placeholder="Avaliação do tônus muscular"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Coordenação:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.coordenacao}
                                onChangeText={(text) => setFormData({...formData, coordenacao: text})}
                                placeholder="Avaliação da coordenação"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Equilíbrio Estático:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.equilibrioEstatico}
                                onChangeText={(text) => setFormData({...formData, equilibrioEstatico: text})}
                                placeholder="Avaliação do equilíbrio estático"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Equilíbrio Dinâmico:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.equilibrioDinamico}
                                onChangeText={(text) => setFormData({...formData, equilibrioDinamico: text})}
                                placeholder="Avaliação do equilíbrio dinâmico"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Reflexos:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.reflexos}
                                onChangeText={(text) => setFormData({...formData, reflexos: text})}
                                placeholder="Avaliação dos reflexos"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Reflexos Patológicos:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.reflexosPatologicos}
                                onChangeText={(text) => setFormData({...formData, reflexosPatologicos: text})}
                                placeholder="Presença de reflexos patológicos"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Manobras Deficitárias:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.manobrasDeficitarias}
                                onChangeText={(text) => setFormData({...formData, manobrasDeficitarias: text})}
                                placeholder="Manobras deficitárias realizadas"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Padrão de Marcha:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.padraoMarcha}
                                onChangeText={(text) => setFormData({...formData, padraoMarcha: text})}
                                placeholder="Padrão de marcha observado"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Sensibilidade Superficial:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.sensibilidadeSuperficial}
                                onChangeText={(text) => setFormData({...formData, sensibilidadeSuperficial: text})}
                                placeholder="Avaliação da sensibilidade superficial"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Sensibilidade Profunda:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.sensibilidadeProfunda}
                                onChangeText={(text) => setFormData({...formData, sensibilidadeProfunda: text})}
                                placeholder="Avaliação da sensibilidade profunda"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.observacoesExames}
                                onChangeText={(text) => setFormData({...formData, observacoesExames: text})}
                                placeholder="Observações sobre os exames fisioterapêuticos"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            case 'avaliacaoRespiratoria':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Padrão Respiratório:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.padraoRespiratorio}
                                onChangeText={(text) => setFormData({...formData, padraoRespiratorio: text})}
                                placeholder="Padrão respiratório observado"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Expansibilidade Torácica:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.expansibilidadeToracica}
                                onChangeText={(text) => setFormData({...formData, expansibilidadeToracica: text})}
                                placeholder="Avaliação da expansibilidade torácica"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Ausculta Pulmonar:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.auscultaPulmonar}
                                onChangeText={(text) => setFormData({...formData, auscultaPulmonar: text})}
                                placeholder="Descreva a ausculta pulmonar"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Tosse:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.tosse}
                                onChangeText={(text) => setFormData({...formData, tosse: text})}
                                placeholder="Características da tosse"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Expectoração:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.expectoracao}
                                onChangeText={(text) => setFormData({...formData, expectoracao: text})}
                                placeholder="Características da expectoração"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Dispneia:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.dispneia}
                                onChangeText={(text) => setFormData({...formData, dispneia: text})}
                                placeholder="Presença e características da dispneia"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.observacoesRespiratorias}
                                onChangeText={(text) => setFormData({...formData, observacoesRespiratorias: text})}
                                placeholder="Observações sobre avaliação respiratória"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            case 'avaliacaoSistemas':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Sistema Respiratório:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.sistemaRespiratorio}
                                onChangeText={(text) => setFormData({...formData, sistemaRespiratorio: text})}
                                placeholder="Avaliação do sistema respiratório"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Sistema Cardiovascular:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.sistemaCardiovascular}
                                onChangeText={(text) => setFormData({...formData, sistemaCardiovascular: text})}
                                placeholder="Avaliação do sistema cardiovascular"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Sistema Gastrointestinal:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.sistemaGastrointestinal}
                                onChangeText={(text) => setFormData({...formData, sistemaGastrointestinal: text})}
                                placeholder="Avaliação do sistema gastrointestinal"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Sistema Neurológico:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.sistemaNeurologico}
                                onChangeText={(text) => setFormData({...formData, sistemaNeurologico: text})}
                                placeholder="Avaliação do sistema neurológico"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Sistema Geniturinário:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.sistemaGeniturinario}
                                onChangeText={(text) => setFormData({...formData, sistemaGeniturinario: text})}
                                placeholder="Avaliação do sistema geniturinário"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Sistema Musculoesquelético:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.sistemaMusculoesqueletico}
                                onChangeText={(text) => setFormData({...formData, sistemaMusculoesqueletico: text})}
                                placeholder="Avaliação do sistema musculoesquelético"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Sistema Dermatológico:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.sistemaDermatologico}
                                onChangeText={(text) => setFormData({...formData, sistemaDermatologico: text})}
                                placeholder="Avaliação do sistema dermatológico"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.observacoesSistemas}
                                onChangeText={(text) => setFormData({...formData, observacoesSistemas: text})}
                                placeholder="Observações sobre avaliação dos sistemas"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            case 'condutaFisioterapeutica':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Hipótese Diagnóstica:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.hipoteseDiagnostica}
                                onChangeText={(text) => setFormData({...formData, hipoteseDiagnostica: text})}
                                placeholder="Hipótese diagnóstica fisioterapêutica"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Objetivos Terapêuticos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.objetivosTerapeuticos}
                                onChangeText={(text) => setFormData({...formData, objetivosTerapeuticos: text})}
                                placeholder="Objetivos terapêuticos estabelecidos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Plano Terapêutico:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.planoTerapeutico}
                                onChangeText={(text) => setFormData({...formData, planoTerapeutico: text})}
                                placeholder="Plano terapêutico proposto"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Frequência do Tratamento:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.frequenciaTratamento}
                                onChangeText={(text) => setFormData({...formData, frequenciaTratamento: text})}
                                placeholder="Frequência recomendada para tratamento"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.observacoesConduta}
                                onChangeText={(text) => setFormData({...formData, observacoesConduta: text})}
                                placeholder="Observações sobre a conduta fisioterapêutica"
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
                    <Text style={styles.title}>Exame Físico</Text>
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
    checkboxText: {
        fontSize: 14,
        color: '#343a40',
    },
    checkboxTextSelected: {
        fontWeight: 'bold',
        color: '#007bff',
    },
    statusContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 10,
        marginBottom: 10,
    },
    statusButton: {
        paddingVertical: 12,
        paddingHorizontal: 18,
        backgroundColor: '#f8f9fa',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#e9ecef',
        minWidth: 120,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    statusButtonSelected: {
        backgroundColor: '#007bff',
        borderColor: '#0056b3',
        shadowColor: '#007bff',
        shadowOpacity: 0.3,
        elevation: 4,
    },
    statusButtonText: {
        fontSize: 15,
        color: '#495057',
        fontWeight: '500',
    },
    statusButtonTextSelected: {
        color: '#ffffff',
        fontWeight: '600',
    },
});

export default ExameFisico;

