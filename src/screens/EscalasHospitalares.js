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
    Alert
} from 'react-native';
import Footer from '../components/Footer';

const EscalasHospitalares = ({ navigation, route }) => {
    const { paciente } = route.params;
    
    // Estado para controlar quais seções estão expandidas
    const [expandedSections, setExpandedSections] = useState({});
    
    // Estado para os dados das escalas
    const [formData, setFormData] = useState({
        // Escala de Glasgow
        glasgowAberturaOcular: '',
        glasgowRespostaVerbal: '',
        glasgowRespostaMotora: '',
        glasgowTotal: '',
        
        // Escala de Braden
        bradenPercepcaoSensorial: '',
        bradenUmidade: '',
        bradenAtividade: '',
        bradenMobilidade: '',
        bradenNutricao: '',
        bradenFriccaoCisalhamento: '',
        bradenTotal: '',
        
        // Escala de Morse
        morseHistoricoQuedas: '',
        morseDiagnosticoSecundario: '',
        morseDeambulacao: '',
        morseTerapiaEndovenosa: '',
        morseMarcha: '',
        morseEstadoMental: '',
        morseTotal: '',
        
        // Escala de Waterlow
        waterlowConstituicaoCorporal: '',
        waterlowContinencia: '',
        waterlowMobilidade: '',
        waterlowSexo: '',
        waterlowIdade: '',
        waterlowApetite: '',
        waterlowMedicamentos: '',
        waterlowTotal: '',
        
        // Escala de Norton
        nortonEstadoFisico: '',
        nortonEstadoMental: '',
        nortonAtividade: '',
        nortonMobilidade: '',
        nortonIncontinencia: '',
        nortonTotal: '',
        
        // Escala de Ramsay
        ramsayNivelSedacao: '',
        ramsayObservacoes: '',
        
        // Escala de RASS
        rassNivelAgitacao: '',
        rassObservacoes: '',
        
        // Escala de CAM-ICU
        camIcuAtencao: '',
        camIcuMudanca: '',
        camIcuIncoerencia: '',
        camIcuResultado: '',
        
        // Escala de APACHE II
        apacheIdade: '',
        apacheTemperatura: '',
        apachePressaoArterial: '',
        apacheFrequenciaCardiaca: '',
        apacheFrequenciaRespiratoria: '',
        apacheOximetria: '',
        apachePh: '',
        apacheSodio: '',
        apachePotassio: '',
        apacheCreatinina: '',
        apacheHematocrito: '',
        apacheLeucocitos: '',
        apacheGlasgow: '',
        apacheTotal: '',
        
        // Observações gerais
        observacoes: '',
        dataAvaliacao: '',
        profissionalResponsavel: ''
    });

    // useEffect para carregar dados salvos quando o componente montar
    useEffect(() => {
        // Aqui você pode implementar a lógica para carregar dados salvos
        // const dadosSalvos = getEscalasHospitalaresData(paciente.prontuario);
        // if (dadosSalvos) {
        //     setFormData(dadosSalvos);
        // }
    }, [paciente.prontuario]);

    // useEffect para salvar dados automaticamente
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (Object.keys(formData).some(key => formData[key] !== '')) {
                // Aqui você pode implementar a lógica para salvar dados
                // salvarEscalasHospitalares(paciente.prontuario, formData);
            }
        }, 1000); // Aguarda 1 segundo antes de salvar

        return () => clearTimeout(timeoutId);
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
        {
            key: 'glasgow',
            title: '1. ESCALA DE GLASGOW',
            icon: '🧠',
            content: 'Avaliação do nível de consciência'
        },
        {
            key: 'braden',
            title: '2. ESCALA DE BRADEN',
            icon: '🛏️',
            content: 'Avaliação do risco de úlceras por pressão'
        },
        {
            key: 'morse',
            title: '3. ESCALA DE MORSE',
            icon: '⚠️',
            content: 'Avaliação do risco de quedas'
        },
        {
            key: 'waterlow',
            title: '4. ESCALA DE WATERLOW',
            icon: '💧',
            content: 'Avaliação do risco de úlceras por pressão'
        },
        {
            key: 'norton',
            title: '5. ESCALA DE NORTON',
            icon: '📊',
            content: 'Avaliação do risco de úlceras por pressão'
        },
        {
            key: 'sedacao',
            title: '6. ESCALAS DE SEDAÇÃO',
            icon: '😴',
            content: 'Ramsay e RASS - Avaliação do nível de sedação'
        },
        {
            key: 'delirium',
            title: '7. ESCALA CAM-ICU',
            icon: '🔍',
            content: 'Avaliação de delirium em UTI'
        },
        {
            key: 'apache',
            title: '8. ESCALA APACHE II',
            icon: '🏥',
            content: 'Avaliação da gravidade em UTI'
        }
    ];

    // Função para renderizar o conteúdo específico de cada seção
    const renderSectionContent = (sectionKey) => {
        switch(sectionKey) {
            case 'glasgow':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>🧠 ESCALA DE GLASGOW</Text>
                        <Text style={styles.formDescription}>
                            Avaliação do nível de consciência (3-15 pontos)
                        </Text>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Abertura Ocular:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.glasgowAberturaOcular}
                                onChangeText={(text) => setFormData({...formData, glasgowAberturaOcular: text})}
                                placeholder="1-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resposta Verbal:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.glasgowRespostaVerbal}
                                onChangeText={(text) => setFormData({...formData, glasgowRespostaVerbal: text})}
                                placeholder="1-5 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resposta Motora:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.glasgowRespostaMotora}
                                onChangeText={(text) => setFormData({...formData, glasgowRespostaMotora: text})}
                                placeholder="1-6 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Total Glasgow:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.glasgowTotal}
                                onChangeText={(text) => setFormData({...formData, glasgowTotal: text})}
                                placeholder="3-15 pontos"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                );

            case 'braden':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>🛏️ ESCALA DE BRADEN</Text>
                        <Text style={styles.formDescription}>
                            Avaliação do risco de úlceras por pressão (6-23 pontos)
                        </Text>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Percepção Sensorial:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.bradenPercepcaoSensorial}
                                onChangeText={(text) => setFormData({...formData, bradenPercepcaoSensorial: text})}
                                placeholder="1-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Umidade:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.bradenUmidade}
                                onChangeText={(text) => setFormData({...formData, bradenUmidade: text})}
                                placeholder="1-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Atividade:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.bradenAtividade}
                                onChangeText={(text) => setFormData({...formData, bradenAtividade: text})}
                                placeholder="1-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Mobilidade:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.bradenMobilidade}
                                onChangeText={(text) => setFormData({...formData, bradenMobilidade: text})}
                                placeholder="1-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Nutrição:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.bradenNutricao}
                                onChangeText={(text) => setFormData({...formData, bradenNutricao: text})}
                                placeholder="1-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Fricção e Cisalhamento:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.bradenFriccaoCisalhamento}
                                onChangeText={(text) => setFormData({...formData, bradenFriccaoCisalhamento: text})}
                                placeholder="1-3 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Total Braden:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.bradenTotal}
                                onChangeText={(text) => setFormData({...formData, bradenTotal: text})}
                                placeholder="6-23 pontos"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                );

            case 'morse':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>⚠️ ESCALA DE MORSE</Text>
                        <Text style={styles.formDescription}>
                            Avaliação do risco de quedas (0-125 pontos)
                        </Text>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Histórico de Quedas:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.morseHistoricoQuedas}
                                onChangeText={(text) => setFormData({...formData, morseHistoricoQuedas: text})}
                                placeholder="0-25 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Diagnóstico Secundário:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.morseDiagnosticoSecundario}
                                onChangeText={(text) => setFormData({...formData, morseDiagnosticoSecundario: text})}
                                placeholder="0-15 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Deambulação:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.morseDeambulacao}
                                onChangeText={(text) => setFormData({...formData, morseDeambulacao: text})}
                                placeholder="0-20 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Terapia Endovenosa:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.morseTerapiaEndovenosa}
                                onChangeText={(text) => setFormData({...formData, morseTerapiaEndovenosa: text})}
                                placeholder="0-20 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Marcha:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.morseMarcha}
                                onChangeText={(text) => setFormData({...formData, morseMarcha: text})}
                                placeholder="0-20 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Estado Mental:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.morseEstadoMental}
                                onChangeText={(text) => setFormData({...formData, morseEstadoMental: text})}
                                placeholder="0-15 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Total Morse:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.morseTotal}
                                onChangeText={(text) => setFormData({...formData, morseTotal: text})}
                                placeholder="0-125 pontos"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                );

            case 'waterlow':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>💧 ESCALA DE WATERLOW</Text>
                        <Text style={styles.formDescription}>
                            Avaliação do risco de úlceras por pressão
                        </Text>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Constituição Corporal:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.waterlowConstituicaoCorporal}
                                onChangeText={(text) => setFormData({...formData, waterlowConstituicaoCorporal: text})}
                                placeholder="0-3 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Continência:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.waterlowContinencia}
                                onChangeText={(text) => setFormData({...formData, waterlowContinencia: text})}
                                placeholder="0-3 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Mobilidade:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.waterlowMobilidade}
                                onChangeText={(text) => setFormData({...formData, waterlowMobilidade: text})}
                                placeholder="0-5 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Sexo:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.waterlowSexo}
                                onChangeText={(text) => setFormData({...formData, waterlowSexo: text})}
                                placeholder="0-1 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Idade:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.waterlowIdade}
                                onChangeText={(text) => setFormData({...formData, waterlowIdade: text})}
                                placeholder="0-8 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Apetite:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.waterlowApetite}
                                onChangeText={(text) => setFormData({...formData, waterlowApetite: text})}
                                placeholder="0-3 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Medicamentos:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.waterlowMedicamentos}
                                onChangeText={(text) => setFormData({...formData, waterlowMedicamentos: text})}
                                placeholder="0-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Total Waterlow:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.waterlowTotal}
                                onChangeText={(text) => setFormData({...formData, waterlowTotal: text})}
                                placeholder="Total de pontos"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                );

            case 'norton':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>📊 ESCALA DE NORTON</Text>
                        <Text style={styles.formDescription}>
                            Avaliação do risco de úlceras por pressão (5-20 pontos)
                        </Text>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Estado Físico:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.nortonEstadoFisico}
                                onChangeText={(text) => setFormData({...formData, nortonEstadoFisico: text})}
                                placeholder="1-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Estado Mental:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.nortonEstadoMental}
                                onChangeText={(text) => setFormData({...formData, nortonEstadoMental: text})}
                                placeholder="1-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Atividade:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.nortonAtividade}
                                onChangeText={(text) => setFormData({...formData, nortonAtividade: text})}
                                placeholder="1-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Mobilidade:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.nortonMobilidade}
                                onChangeText={(text) => setFormData({...formData, nortonMobilidade: text})}
                                placeholder="1-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Incontinência:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.nortonIncontinencia}
                                onChangeText={(text) => setFormData({...formData, nortonIncontinencia: text})}
                                placeholder="1-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Total Norton:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.nortonTotal}
                                onChangeText={(text) => setFormData({...formData, nortonTotal: text})}
                                placeholder="5-20 pontos"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                );

            case 'sedacao':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>😴 ESCALAS DE SEDAÇÃO</Text>
                        <Text style={styles.formDescription}>
                            Avaliação do nível de sedação
                        </Text>

                        <Text style={styles.subsectionTitle}>Escala de Ramsay:</Text>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Nível de Sedação:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.ramsayNivelSedacao}
                                onChangeText={(text) => setFormData({...formData, ramsayNivelSedacao: text})}
                                placeholder="1-6 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <Text style={styles.formLabel}>Observações Ramsay:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.ramsayObservacoes}
                            onChangeText={(text) => setFormData({...formData, ramsayObservacoes: text})}
                            placeholder="Observações sobre o nível de sedação"
                            multiline
                        />

                        <Text style={styles.subsectionTitle}>Escala RASS:</Text>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Nível de Agitação:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.rassNivelAgitacao}
                                onChangeText={(text) => setFormData({...formData, rassNivelAgitacao: text})}
                                placeholder="-5 a +4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <Text style={styles.formLabel}>Observações RASS:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                            value={formData.rassObservacoes}
                            onChangeText={(text) => setFormData({...formData, rassObservacoes: text})}
                            placeholder="Observações sobre o nível de agitação"
                            multiline
                        />
                    </View>
                );

            case 'delirium':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>🔍 ESCALA CAM-ICU</Text>
                        <Text style={styles.formDescription}>
                            Avaliação de delirium em UTI
                        </Text>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Atenção:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.camIcuAtencao}
                                onChangeText={(text) => setFormData({...formData, camIcuAtencao: text})}
                                placeholder="Positivo/Negativo"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Mudança:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.camIcuMudanca}
                                onChangeText={(text) => setFormData({...formData, camIcuMudanca: text})}
                                placeholder="Positivo/Negativo"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Incoerência:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.camIcuIncoerencia}
                                onChangeText={(text) => setFormData({...formData, camIcuIncoerencia: text})}
                                placeholder="Positivo/Negativo"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultado CAM-ICU:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.camIcuResultado}
                                onChangeText={(text) => setFormData({...formData, camIcuResultado: text})}
                                placeholder="Positivo/Negativo"
                            />
                        </View>
                    </View>
                );

            case 'apache':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>🏥 ESCALA APACHE II</Text>
                        <Text style={styles.formDescription}>
                            Avaliação da gravidade em UTI (0-71 pontos)
                        </Text>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Idade:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.apacheIdade}
                                onChangeText={(text) => setFormData({...formData, apacheIdade: text})}
                                placeholder="0-6 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Temperatura:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.apacheTemperatura}
                                onChangeText={(text) => setFormData({...formData, apacheTemperatura: text})}
                                placeholder="0-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Pressão Arterial:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.apachePressaoArterial}
                                onChangeText={(text) => setFormData({...formData, apachePressaoArterial: text})}
                                placeholder="0-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Frequência Cardíaca:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.apacheFrequenciaCardiaca}
                                onChangeText={(text) => setFormData({...formData, apacheFrequenciaCardiaca: text})}
                                placeholder="0-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Frequência Respiratória:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.apacheFrequenciaRespiratoria}
                                onChangeText={(text) => setFormData({...formData, apacheFrequenciaRespiratoria: text})}
                                placeholder="0-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Oximetria:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.apacheOximetria}
                                onChangeText={(text) => setFormData({...formData, apacheOximetria: text})}
                                placeholder="0-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>pH:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.apachePh}
                                onChangeText={(text) => setFormData({...formData, apachePh: text})}
                                placeholder="0-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Sódio:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.apacheSodio}
                                onChangeText={(text) => setFormData({...formData, apacheSodio: text})}
                                placeholder="0-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Potássio:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.apachePotassio}
                                onChangeText={(text) => setFormData({...formData, apachePotassio: text})}
                                placeholder="0-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Creatinina:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.apacheCreatinina}
                                onChangeText={(text) => setFormData({...formData, apacheCreatinina: text})}
                                placeholder="0-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Hematócrito:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.apacheHematocrito}
                                onChangeText={(text) => setFormData({...formData, apacheHematocrito: text})}
                                placeholder="0-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Leucócitos:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.apacheLeucocitos}
                                onChangeText={(text) => setFormData({...formData, apacheLeucocitos: text})}
                                placeholder="0-4 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Glasgow:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.apacheGlasgow}
                                onChangeText={(text) => setFormData({...formData, apacheGlasgow: text})}
                                placeholder="0-12 pontos"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Total APACHE II:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.apacheTotal}
                                onChangeText={(text) => setFormData({...formData, apacheTotal: text})}
                                placeholder="0-71 pontos"
                                keyboardType="numeric"
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
            >
                <ScrollView 
                    style={styles.content} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <Text style={styles.title}>Escalas Hospitalares</Text>
                    <Text style={styles.subtitle}>Avaliações e monitoramento hospitalar</Text>

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

                    {/* Informações Gerais */}
                    <View style={styles.generalInfoContainer}>
                        <Text style={styles.sectionSubtitle}>📋 INFORMAÇÕES GERAIS</Text>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data da Avaliação:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.dataAvaliacao}
                                onChangeText={(text) => setFormData({...formData, dataAvaliacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Profissional Responsável:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.profissionalResponsavel}
                                onChangeText={(text) => setFormData({...formData, profissionalResponsavel: text})}
                                placeholder="Nome do profissional"
                            />
                        </View>

                        <Text style={styles.formLabel}>Observações:</Text>
                        <TextInput
                            style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                            value={formData.observacoes}
                            onChangeText={(text) => setFormData({...formData, observacoes: text})}
                            placeholder="Observações sobre as escalas aplicadas"
                            multiline
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            
            <Footer navigation={navigation} currentScreen="EscalasHospitalares" />
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
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
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
        fontWeight: 'bold',
        color: '#343a40',
        flex: 1,
    },
    expandIcon: {
        fontSize: 16,
        color: '#6c757d',
        transform: [{ rotate: '0deg' }],
    },
    expandIconRotated: {
        transform: [{ rotate: '180deg' }],
    },
    sectionContent: {
        padding: 20,
    },
    formContent: {
        gap: 15,
    },
    sectionSubtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: 10,
        textAlign: 'center',
    },
    subsectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#495057',
        marginTop: 15,
        marginBottom: 10,
    },
    formDescription: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'center',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    formRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    formLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
        width: '40%',
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        color: '#343a40',
        backgroundColor: '#fff',
    },
    generalInfoContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    placeholderContent: {
        padding: 20,
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default EscalasHospitalares;
