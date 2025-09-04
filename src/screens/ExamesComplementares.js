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
        // 1. EXAMES LABORATORIAIS
        // Hemograma Completo
        hemogramaDataRealizacao: '',
        hemogramaValoresObtidos: '',
        hemogramaObservacoesClinicas: '',
        hemogramaEvolucaoPaciente: '',
        hemogramaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Glicemia (Jejum e Pós-prandial)
        glicemiaDataRealizacao: '',
        glicemiaValoresObtidos: '',
        glicemiaObservacoesClinicas: '',
        glicemiaEvolucaoPaciente: '',
        glicemiaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Colesterol Total e Frações
        colesterolDataRealizacao: '',
        colesterolValoresObtidos: '',
        colesterolObservacoesClinicas: '',
        colesterolEvolucaoPaciente: '',
        colesterolStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Triglicerídeos
        trigliceridesDataRealizacao: '',
        trigliceridesValoresObtidos: '',
        trigliceridesObservacoesClinicas: '',
        trigliceridesEvolucaoPaciente: '',
        trigliceridesStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Ureia e Creatinina
        ureiaCreatininaDataRealizacao: '',
        ureiaCreatininaValoresObtidos: '',
        ureiaCreatininaObservacoesClinicas: '',
        ureiaCreatininaEvolucaoPaciente: '',
        ureiaCreatininaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Transaminases (TGO/AST, TGP/ALT)
        transaminasesDataRealizacao: '',
        transaminasesValoresObtidos: '',
        transaminasesObservacoesClinicas: '',
        transaminasesEvolucaoPaciente: '',
        transaminasesStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // PCR (Proteína C Reativa)
        pcrDataRealizacao: '',
        pcrValoresObtidos: '',
        pcrObservacoesClinicas: '',
        pcrEvolucaoPaciente: '',
        pcrStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // VHS (Velocidade de Hemossedimentação)
        vhsDataRealizacao: '',
        vhsValoresObtidos: '',
        vhsObservacoesClinicas: '',
        vhsEvolucaoPaciente: '',
        vhsStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Eletrólitos
        eletrolitosDataRealizacao: '',
        eletrolitosValoresObtidos: '',
        eletrolitosObservacoesClinicas: '',
        eletrolitosEvolucaoPaciente: '',
        eletrolitosStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Exames Hormonais
        hormonaisDataRealizacao: '',
        hormonaisValoresObtidos: '',
        hormonaisObservacoesClinicas: '',
        hormonaisEvolucaoPaciente: '',
        hormonaisStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Urina Tipo I e Urocultura
        urinaDataRealizacao: '',
        urinaValoresObtidos: '',
        urinaObservacoesClinicas: '',
        urinaEvolucaoPaciente: '',
        urinaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Outros exames laboratoriais
        outrosLab: '',
        
        // 2. EXAMES DE IMAGEM
        // Radiografia (Raio-X)
        radiografiaDataRealizacao: '',
        radiografiaResultadosObtidos: '',
        radiografiaObservacoesClinicas: '',
        radiografiaEvolucaoPaciente: '',
        radiografiaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Ultrassonografia (USG)
        ultrassonografiaDataRealizacao: '',
        ultrassonografiaResultadosObtidos: '',
        ultrassonografiaObservacoesClinicas: '',
        ultrassonografiaEvolucaoPaciente: '',
        ultrassonografiaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Tomografia Computadorizada (TC)
        tomografiaDataRealizacao: '',
        tomografiaResultadosObtidos: '',
        tomografiaObservacoesClinicas: '',
        tomografiaEvolucaoPaciente: '',
        tomografiaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Ressonância Magnética (RM)
        ressonanciaDataRealizacao: '',
        ressonanciaResultadosObtidos: '',
        ressonanciaObservacoesClinicas: '',
        ressonanciaEvolucaoPaciente: '',
        ressonanciaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Densitometria Óssea
        densitometriaDataRealizacao: '',
        densitometriaResultadosObtidos: '',
        densitometriaObservacoesClinicas: '',
        densitometriaEvolucaoPaciente: '',
        densitometriaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Mamografia
        mamografiaDataRealizacao: '',
        mamografiaResultadosObtidos: '',
        mamografiaObservacoesClinicas: '',
        mamografiaEvolucaoPaciente: '',
        mamografiaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Ecocardiograma
        ecocardiogramaDataRealizacao: '',
        ecocardiogramaResultadosObtidos: '',
        ecocardiogramaObservacoesClinicas: '',
        ecocardiogramaEvolucaoPaciente: '',
        ecocardiogramaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Doppler Vascular
        dopplerDataRealizacao: '',
        dopplerResultadosObtidos: '',
        dopplerObservacoesClinicas: '',
        dopplerEvolucaoPaciente: '',
        dopplerStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Outros exames de imagem
        outrosImagem: '',
        
        // 3. EXAMES CARDIOLÓGICOS
        // Eletrocardiograma (ECG)
        ecgDataRealizacao: '',
        ecgResultadosObtidos: '',
        ecgObservacoesClinicas: '',
        ecgEvolucaoPaciente: '',
        ecgStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Teste Ergométrico (Teste de Esforço)
        testeErgometricoDataRealizacao: '',
        testeErgometricoResultadosObtidos: '',
        testeErgometricoObservacoesClinicas: '',
        testeErgometricoEvolucaoPaciente: '',
        testeErgometricoStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Holter 24h
        holterDataRealizacao: '',
        holterResultadosObtidos: '',
        holterObservacoesClinicas: '',
        holterEvolucaoPaciente: '',
        holterStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // MAPA (Monitorização Ambulatorial da PA)
        mapaDataRealizacao: '',
        mapaResultadosObtidos: '',
        mapaObservacoesClinicas: '',
        mapaEvolucaoPaciente: '',
        mapaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Ecocardiograma com Doppler
        ecocardiogramaDopplerDataRealizacao: '',
        ecocardiogramaDopplerResultadosObtidos: '',
        ecocardiogramaDopplerObservacoesClinicas: '',
        ecocardiogramaDopplerEvolucaoPaciente: '',
        ecocardiogramaDopplerStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Outros exames cardiológicos
        outrosCardio: '',
        
        // 4. EXAMES RESPIRATÓRIOS
        // Espirometria
        espirometriaDataRealizacao: '',
        espirometriaResultadosObtidos: '',
        espirometriaObservacoesClinicas: '',
        espirometriaEvolucaoPaciente: '',
        espirometriaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Gasometria Arterial
        gasometriaDataRealizacao: '',
        gasometriaResultadosObtidos: '',
        gasometriaObservacoesClinicas: '',
        gasometriaEvolucaoPaciente: '',
        gasometriaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Oximetria de Pulso
        oximetriaDataRealizacao: '',
        oximetriaResultadosObtidos: '',
        oximetriaObservacoesClinicas: '',
        oximetriaEvolucaoPaciente: '',
        oximetriaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Radiografia de Tórax
        radiografiaToraxDataRealizacao: '',
        radiografiaToraxResultadosObtidos: '',
        radiografiaToraxObservacoesClinicas: '',
        radiografiaToraxEvolucaoPaciente: '',
        radiografiaToraxStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Teste de Caminhada de 6 Minutos
        testeCaminhadaDataRealizacao: '',
        testeCaminhadaResultadosObtidos: '',
        testeCaminhadaObservacoesClinicas: '',
        testeCaminhadaEvolucaoPaciente: '',
        testeCaminhadaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Outros exames respiratórios
        outrosRespiratorios: '',
        
        // 5. EXAMES NEUROLÓGICOS
        // Eletroencefalograma (EEG)
        eegDataRealizacao: '',
        eegResultadosObtidos: '',
        eegObservacoesClinicas: '',
        eegEvolucaoPaciente: '',
        eegStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Eletroneuromiografia (ENMG)
        enmgDataRealizacao: '',
        enmgResultadosObtidos: '',
        enmgObservacoesClinicas: '',
        enmgEvolucaoPaciente: '',
        enmgStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Ressonância Magnética Cerebral
        ressonanciaCerebralDataRealizacao: '',
        ressonanciaCerebralResultadosObtidos: '',
        ressonanciaCerebralObservacoesClinicas: '',
        ressonanciaCerebralEvolucaoPaciente: '',
        ressonanciaCerebralStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Tomografia Cerebral
        tomografiaCerebralDataRealizacao: '',
        tomografiaCerebralResultadosObtidos: '',
        tomografiaCerebralObservacoesClinicas: '',
        tomografiaCerebralEvolucaoPaciente: '',
        tomografiaCerebralStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Potenciais Evocados
        potenciaisEvocadosDataRealizacao: '',
        potenciaisEvocadosResultadosObtidos: '',
        potenciaisEvocadosObservacoesClinicas: '',
        potenciaisEvocadosEvolucaoPaciente: '',
        potenciaisEvocadosStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Outros exames neurológicos
        outrosNeurologicos: '',
        
        // 6. EXAMES ORTOPÉDICOS E FUNCIONAIS
        // Radiografias Específicas
        radiografiasEspecificasDataRealizacao: '',
        radiografiasEspecificasResultadosObtidos: '',
        radiografiasEspecificasObservacoesClinicas: '',
        radiografiasEspecificasEvolucaoPaciente: '',
        radiografiasEspecificasStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Ressonância Magnética Articular
        ressonanciaArticularDataRealizacao: '',
        ressonanciaArticularResultadosObtidos: '',
        ressonanciaArticularObservacoesClinicas: '',
        ressonanciaArticularEvolucaoPaciente: '',
        ressonanciaArticularStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Ultrassonografia Musculoesquelética
        ultrassonografiaMusculoesqueleticaDataRealizacao: '',
        ultrassonografiaMusculoesqueleticaResultadosObtidos: '',
        ultrassonografiaMusculoesqueleticaObservacoesClinicas: '',
        ultrassonografiaMusculoesqueleticaEvolucaoPaciente: '',
        ultrassonografiaMusculoesqueleticaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Densitometria Óssea
        densitometriaOsseaDataRealizacao: '',
        densitometriaOsseaResultadosObtidos: '',
        densitometriaOsseaObservacoesClinicas: '',
        densitometriaOsseaEvolucaoPaciente: '',
        densitometriaOsseaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Avaliação Postural por Fotogrametria
        avaliacaoPosturalDataRealizacao: '',
        avaliacaoPosturalResultadosObtidos: '',
        avaliacaoPosturalObservacoesClinicas: '',
        avaliacaoPosturalEvolucaoPaciente: '',
        avaliacaoPosturalStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Baropodometria (Análise da Pisada)
        baropodometriaDataRealizacao: '',
        baropodometriaResultadosObtidos: '',
        baropodometriaObservacoesClinicas: '',
        baropodometriaEvolucaoPaciente: '',
        baropodometriaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Outros exames ortopédicos e funcionais
        outrosOrtopedicos: '',
        
        // 7. EXAMES UROLÓGICOS E GINECOLÓGICOS
        // Exame de Urina
        exameUrinaDataRealizacao: '',
        exameUrinaResultadosObtidos: '',
        exameUrinaObservacoesClinicas: '',
        exameUrinaEvolucaoPaciente: '',
        exameUrinaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Ultrassonografia Pélvica/Transvaginal
        ultrassonografiaPelvicaDataRealizacao: '',
        ultrassonografiaPelvicaResultadosObtidos: '',
        ultrassonografiaPelvicaObservacoesClinicas: '',
        ultrassonografiaPelvicaEvolucaoPaciente: '',
        ultrassonografiaPelvicaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // PSA (Antígeno Prostático Específico)
        psaDataRealizacao: '',
        psaResultadosObtidos: '',
        psaObservacoesClinicas: '',
        psaEvolucaoPaciente: '',
        psaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Papanicolau
        papanicolauDataRealizacao: '',
        papanicolauResultadosObtidos: '',
        papanicolauObservacoesClinicas: '',
        papanicolauEvolucaoPaciente: '',
        papanicolauStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Colposcopia
        colposcopiaDataRealizacao: '',
        colposcopiaResultadosObtidos: '',
        colposcopiaObservacoesClinicas: '',
        colposcopiaEvolucaoPaciente: '',
        colposcopiaStatus: '', // Bom (+1) / Atenção (0) / Ruim (-1)
        
        // Outros exames urológicos e ginecológicos
        outrosUrologicos: '',
        
        // Observações Gerais
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
            title: '1. EXAMES LABORATORIAIS',
            icon: '🧪',
            content: 'Hemograma, bioquímica, eletrólitos...'
        },
        {
            key: 'imagem',
            title: '2. EXAMES DE IMAGEM',
            icon: '📷',
            content: 'Raio-X, tomografia, ressonância...'
        },
        {
            key: 'cardiologicos',
            title: '3. EXAMES CARDIOLÓGICOS',
            icon: '❤️',
            content: 'ECG, Holter, ecocardiograma...'
        },
        {
            key: 'respiratorios',
            title: '4. EXAMES RESPIRATÓRIOS',
            icon: '🫁',
            content: 'Espirometria, gasometria, radiografia...'
        },
        {
            key: 'neurologicos',
            title: '5. EXAMES NEUROLÓGICOS',
            icon: '🧠',
            content: 'EEG, tomografia craniana, ressonância...'
        },
        {
            key: 'ortopedicos',
            title: '6. EXAMES ORTOPÉDICOS E FUNCIONAIS',
            icon: '🦴',
            content: 'Radiografia óssea, densitometria...'
        },
        {
            key: 'urologicos',
            title: '7. EXAMES UROLÓGICOS E GINECOLÓGICOS',
            icon: '🔬',
            content: 'Ultrassom, urofluxometria, papanicolau...'
        },
        {
            key: 'gerais',
            title: '8. INFORMAÇÕES GERAIS',
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
                        {/* Hemograma Completo */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Hemograma Completo</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• Hemácias: 4.5-5.9 M/μL</Text>
                            <Text style={styles.referenceText}>• Hemoglobina: 13-17 g/dL</Text>
                            <Text style={styles.referenceText}>• Hematócrito: 40-50%</Text>
                            <Text style={styles.referenceText}>• Leucócitos: 4.5-11.0 K/μL</Text>
                            <Text style={styles.referenceText}>• Plaquetas: 150-450 K/μL</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.hemogramaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, hemogramaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Valores Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.hemogramaValoresObtidos}
                                onChangeText={(text) => setFormData({...formData, hemogramaValoresObtidos: text})}
                                placeholder="Insira os valores obtidos do hemograma"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.hemogramaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, hemogramaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre o hemograma"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.hemogramaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, hemogramaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada no hemograma"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.hemogramaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, hemogramaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.hemogramaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.hemogramaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, hemogramaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.hemogramaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.hemogramaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, hemogramaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.hemogramaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Glicemia (Jejum e Pós-prandial) */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Glicemia (Jejum e Pós-prandial)</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• Glicemia de Jejum: 70-99 mg/dL</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.glicemiaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, glicemiaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Valores Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.glicemiaValoresObtidos}
                                onChangeText={(text) => setFormData({...formData, glicemiaValoresObtidos: text})}
                                placeholder="Insira os valores de glicemia (jejum e pós-prandial)"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.glicemiaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, glicemiaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a glicemia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.glicemiaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, glicemiaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na glicemia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.glicemiaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, glicemiaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.glicemiaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.glicemiaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, glicemiaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.glicemiaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.glicemiaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, glicemiaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.glicemiaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Colesterol Total e Frações */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Colesterol Total e Frações</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• Colesterol Total: &lt;200 mg/dL</Text>
                            <Text style={styles.referenceText}>• HDL: &gt;40 mg/dL</Text>
                            <Text style={styles.referenceText}>• LDL: &lt;100 mg/dL</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.colesterolDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, colesterolDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Valores Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.colesterolValoresObtidos}
                                onChangeText={(text) => setFormData({...formData, colesterolValoresObtidos: text})}
                                placeholder="Insira os valores de colesterol total, HDL e LDL"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.colesterolObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, colesterolObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre o colesterol"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.colesterolEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, colesterolEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada no colesterol"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.colesterolStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, colesterolStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.colesterolStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.colesterolStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, colesterolStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.colesterolStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.colesterolStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, colesterolStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.colesterolStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Triglicerídeos */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Triglicerídeos</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• Triglicerídeos: &lt;150 mg/dL</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.trigliceridesDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, trigliceridesDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Valores Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.trigliceridesValoresObtidos}
                                onChangeText={(text) => setFormData({...formData, trigliceridesValoresObtidos: text})}
                                placeholder="Insira os valores de triglicerídeos obtidos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.trigliceridesObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, trigliceridesObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre os triglicerídeos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.trigliceridesEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, trigliceridesEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada nos triglicerídeos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.trigliceridesStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, trigliceridesStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.trigliceridesStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.trigliceridesStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, trigliceridesStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.trigliceridesStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.trigliceridesStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, trigliceridesStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.trigliceridesStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Ureia e Creatinina */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Ureia e Creatinina</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• Ureia: 7-20 mg/dL</Text>
                            <Text style={styles.referenceText}>• Creatinina: 0.6-1.2 mg/dL</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.ureiaCreatininaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, ureiaCreatininaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Valores Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ureiaCreatininaValoresObtidos}
                                onChangeText={(text) => setFormData({...formData, ureiaCreatininaValoresObtidos: text})}
                                placeholder="Insira os valores de ureia e creatinina obtidos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ureiaCreatininaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, ureiaCreatininaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre ureia e creatinina"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ureiaCreatininaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, ureiaCreatininaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na ureia e creatinina"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ureiaCreatininaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, ureiaCreatininaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ureiaCreatininaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ureiaCreatininaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, ureiaCreatininaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ureiaCreatininaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ureiaCreatininaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, ureiaCreatininaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ureiaCreatininaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Transaminases (TGO/AST, TGP/ALT) */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Transaminases (TGO/AST, TGP/ALT)</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• TGO (AST): 5-40 U/L</Text>
                            <Text style={styles.referenceText}>• TGP (ALT): 7-56 U/L</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.transaminasesDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, transaminasesDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Valores Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.transaminasesValoresObtidos}
                                onChangeText={(text) => setFormData({...formData, transaminasesValoresObtidos: text})}
                                placeholder="Insira os valores de TGO/AST e TGP/ALT obtidos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.transaminasesObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, transaminasesObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre as transaminases"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.transaminasesEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, transaminasesEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada nas transaminases"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.transaminasesStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, transaminasesStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.transaminasesStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.transaminasesStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, transaminasesStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.transaminasesStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.transaminasesStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, transaminasesStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.transaminasesStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* PCR (Proteína C Reativa) */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>PCR (Proteína C Reativa)</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• PCR: &lt;3 mg/L</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.pcrDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, pcrDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Valores Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.pcrValoresObtidos}
                                onChangeText={(text) => setFormData({...formData, pcrValoresObtidos: text})}
                                placeholder="Insira os valores de PCR obtidos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.pcrObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, pcrObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre o PCR"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.pcrEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, pcrEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada no PCR"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.pcrStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, pcrStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.pcrStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.pcrStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, pcrStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.pcrStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.pcrStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, pcrStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.pcrStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* VHS (Velocidade de Hemossedimentação) */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>VHS (Velocidade de Hemossedimentação)</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• Homens: &lt;15 mm/h</Text>
                            <Text style={styles.referenceText}>• Mulheres: &lt;20 mm/h</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.vhsDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, vhsDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Valores Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.vhsValoresObtidos}
                                onChangeText={(text) => setFormData({...formData, vhsValoresObtidos: text})}
                                placeholder="Insira os valores de VHS obtidos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.vhsObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, vhsObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre o VHS"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.vhsEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, vhsEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada no VHS"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.vhsStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, vhsStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.vhsStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.vhsStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, vhsStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.vhsStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.vhsStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, vhsStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.vhsStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Eletrólitos */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Eletrólitos</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• Na (Sódio): 135-145 mEq/L</Text>
                            <Text style={styles.referenceText}>• K (Potássio): 3.5-5.0 mEq/L</Text>
                            <Text style={styles.referenceText}>• Ca (Cálcio): 8.5-10.5 mg/dL</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.eletrolitosDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, eletrolitosDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Valores Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.eletrolitosValoresObtidos}
                                onChangeText={(text) => setFormData({...formData, eletrolitosValoresObtidos: text})}
                                placeholder="Insira os valores de Na, K e Ca obtidos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.eletrolitosObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, eletrolitosObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre os eletrólitos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.eletrolitosEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, eletrolitosEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada nos eletrólitos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.eletrolitosStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, eletrolitosStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.eletrolitosStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.eletrolitosStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, eletrolitosStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.eletrolitosStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.eletrolitosStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, eletrolitosStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.eletrolitosStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Exames Hormonais */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Exames Hormonais</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• TSH: 0.4-4.0 mUI/L</Text>
                            <Text style={styles.referenceText}>• T4: 0.8-1.8 ng/dL</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.hormonaisDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, hormonaisDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Valores Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.hormonaisValoresObtidos}
                                onChangeText={(text) => setFormData({...formData, hormonaisValoresObtidos: text})}
                                placeholder="Insira os valores de TSH e T4 obtidos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.hormonaisObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, hormonaisObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre os exames hormonais"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.hormonaisEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, hormonaisEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada nos exames hormonais"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.hormonaisStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, hormonaisStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.hormonaisStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.hormonaisStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, hormonaisStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.hormonaisStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.hormonaisStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, hormonaisStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.hormonaisStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Urina Tipo I e Urocultura */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Urina Tipo I e Urocultura</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• Densidade: 1.005-1.030</Text>
                            <Text style={styles.referenceText}>• pH: 4.5-8.0</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.urinaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, urinaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Valores Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.urinaValoresObtidos}
                                onChangeText={(text) => setFormData({...formData, urinaValoresObtidos: text})}
                                placeholder="Insira os valores da urina tipo I e urocultura obtidos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.urinaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, urinaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a urina tipo I e urocultura"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.urinaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, urinaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na urina tipo I e urocultura"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.urinaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, urinaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.urinaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.urinaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, urinaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.urinaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.urinaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, urinaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.urinaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Outros Exames Laboratoriais */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Outros Exames Laboratoriais</Text>
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
                        {/* Radiografia (Raio-X) */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Radiografia (Raio-X)</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.radiografiaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, radiografiaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.radiografiaResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, radiografiaResultadosObtidos: text})}
                                placeholder="Resultados obtidos da radiografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.radiografiaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, radiografiaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a radiografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.radiografiaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, radiografiaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na radiografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.radiografiaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, radiografiaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.radiografiaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.radiografiaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, radiografiaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.radiografiaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.radiografiaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, radiografiaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.radiografiaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Ultrassonografia (USG) */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Ultrassonografia (USG)</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.ultrassonografiaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, ultrassonografiaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ultrassonografiaResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, ultrassonografiaResultadosObtidos: text})}
                                placeholder="Resultados obtidos da ultrassonografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ultrassonografiaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, ultrassonografiaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a ultrassonografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ultrassonografiaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, ultrassonografiaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na ultrassonografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ultrassonografiaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, ultrassonografiaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ultrassonografiaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ultrassonografiaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, ultrassonografiaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ultrassonografiaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ultrassonografiaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, ultrassonografiaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ultrassonografiaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Tomografia Computadorizada (TC) */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Tomografia Computadorizada (TC)</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.tomografiaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, tomografiaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.tomografiaResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, tomografiaResultadosObtidos: text})}
                                placeholder="Resultados obtidos da tomografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.tomografiaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, tomografiaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a tomografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.tomografiaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, tomografiaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na tomografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.tomografiaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, tomografiaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.tomografiaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.tomografiaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, tomografiaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.tomografiaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.tomografiaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, tomografiaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.tomografiaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Ressonância Magnética (RM) */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Ressonância Magnética (RM)</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.ressonanciaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, ressonanciaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ressonanciaResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, ressonanciaResultadosObtidos: text})}
                                placeholder="Resultados obtidos da ressonância magnética"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ressonanciaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, ressonanciaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a ressonância magnética"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ressonanciaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, ressonanciaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na ressonância magnética"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ressonanciaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, ressonanciaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ressonanciaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ressonanciaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, ressonanciaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ressonanciaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ressonanciaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, ressonanciaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ressonanciaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Densitometria Óssea */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Densitometria Óssea</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• T-score &gt; -1.0 (Normal)</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.densitometriaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, densitometriaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.densitometriaResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, densitometriaResultadosObtidos: text})}
                                placeholder="Resultados obtidos da densitometria óssea"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.densitometriaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, densitometriaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a densitometria óssea"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.densitometriaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, densitometriaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na densitometria óssea"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.densitometriaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, densitometriaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.densitometriaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.densitometriaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, densitometriaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.densitometriaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.densitometriaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, densitometriaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.densitometriaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Mamografia */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Mamografia</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.mamografiaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, mamografiaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.mamografiaResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, mamografiaResultadosObtidos: text})}
                                placeholder="Resultados obtidos da mamografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.mamografiaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, mamografiaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a mamografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.mamografiaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, mamografiaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na mamografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.mamografiaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, mamografiaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.mamografiaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.mamografiaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, mamografiaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.mamografiaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.mamografiaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, mamografiaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.mamografiaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Ecocardiograma */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Ecocardiograma</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.ecocardiogramaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, ecocardiogramaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ecocardiogramaResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, ecocardiogramaResultadosObtidos: text})}
                                placeholder="Resultados obtidos do ecocardiograma"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ecocardiogramaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, ecocardiogramaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre o ecocardiograma"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ecocardiogramaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, ecocardiogramaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada no ecocardiograma"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ecocardiogramaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, ecocardiogramaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ecocardiogramaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ecocardiogramaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, ecocardiogramaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ecocardiogramaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ecocardiogramaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, ecocardiogramaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ecocardiogramaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Doppler Vascular */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Doppler Vascular</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.dopplerDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, dopplerDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.dopplerResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, dopplerResultadosObtidos: text})}
                                placeholder="Resultados obtidos do doppler vascular"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.dopplerObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, dopplerObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre o doppler vascular"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.dopplerEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, dopplerEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada no doppler vascular"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.dopplerStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, dopplerStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.dopplerStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.dopplerStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, dopplerStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.dopplerStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.dopplerStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, dopplerStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.dopplerStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Outros Exames de Imagem */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Outros Exames de Imagem</Text>
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
                
            case 'cardiologicos':
                return (
                    <View style={styles.formContent}>
                        {/* Eletrocardiograma (ECG) */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Eletrocardiograma (ECG)</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.ecgDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, ecgDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ecgResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, ecgResultadosObtidos: text})}
                                placeholder="Resultados obtidos do eletrocardiograma"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ecgObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, ecgObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre o eletrocardiograma"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ecgEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, ecgEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada no eletrocardiograma"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ecgStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, ecgStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ecgStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ecgStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, ecgStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ecgStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ecgStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, ecgStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ecgStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Teste Ergométrico (Teste de Esforço) */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Teste Ergométrico (Teste de Esforço)</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.testeErgometricoDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, testeErgometricoDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.testeErgometricoResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, testeErgometricoResultadosObtidos: text})}
                                placeholder="Resultados obtidos do teste ergométrico"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.testeErgometricoObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, testeErgometricoObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre o teste ergométrico"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.testeErgometricoEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, testeErgometricoEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada no teste ergométrico"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.testeErgometricoStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, testeErgometricoStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.testeErgometricoStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.testeErgometricoStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, testeErgometricoStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.testeErgometricoStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.testeErgometricoStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, testeErgometricoStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.testeErgometricoStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Holter 24h */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Holter 24h</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.holterDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, holterDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.holterResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, holterResultadosObtidos: text})}
                                placeholder="Resultados obtidos do Holter 24h"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.holterObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, holterObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre o Holter 24h"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.holterEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, holterEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada no Holter 24h"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.holterStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, holterStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.holterStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.holterStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, holterStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.holterStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.holterStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, holterStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.holterStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* MAPA (Monitorização Ambulatorial da PA) */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>MAPA (Monitorização Ambulatorial da PA)</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• PA &lt; 140/90 mmHg</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.mapaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, mapaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.mapaResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, mapaResultadosObtidos: text})}
                                placeholder="Resultados obtidos do MAPA"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.mapaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, mapaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre o MAPA"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.mapaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, mapaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada no MAPA"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.mapaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, mapaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.mapaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.mapaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, mapaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.mapaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.mapaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, mapaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.mapaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Ecocardiograma com Doppler */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Ecocardiograma com Doppler</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.ecocardiogramaDopplerDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, ecocardiogramaDopplerDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ecocardiogramaDopplerResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, ecocardiogramaDopplerResultadosObtidos: text})}
                                placeholder="Resultados obtidos do ecocardiograma com Doppler"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ecocardiogramaDopplerObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, ecocardiogramaDopplerObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre o ecocardiograma com Doppler"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ecocardiogramaDopplerEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, ecocardiogramaDopplerEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada no ecocardiograma com Doppler"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ecocardiogramaDopplerStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, ecocardiogramaDopplerStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ecocardiogramaDopplerStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ecocardiogramaDopplerStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, ecocardiogramaDopplerStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ecocardiogramaDopplerStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ecocardiogramaDopplerStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, ecocardiogramaDopplerStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ecocardiogramaDopplerStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Outros Exames Cardiológicos */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Outros Exames Cardiológicos</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Outros Exames Cardiológicos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.outrosCardio}
                                onChangeText={(text) => setFormData({...formData, outrosCardio: text})}
                                placeholder="Outros exames cardiológicos realizados"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            case 'respiratorios':
                return (
                    <View style={styles.formContent}>
                        {/* Espirometria */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Espirometria</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• CVF &gt; 80%</Text>
                            <Text style={styles.referenceText}>• VEF1 &gt; 80%</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.espirometriaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, espirometriaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.espirometriaResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, espirometriaResultadosObtidos: text})}
                                placeholder="Resultados obtidos da espirometria"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.espirometriaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, espirometriaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a espirometria"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.espirometriaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, espirometriaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na espirometria"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.espirometriaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, espirometriaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.espirometriaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.espirometriaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, espirometriaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.espirometriaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.espirometriaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, espirometriaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.espirometriaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Gasometria Arterial */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Gasometria Arterial</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• pH: 7.35-7.45</Text>
                            <Text style={styles.referenceText}>• PaO2: 80-100 mmHg</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.gasometriaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, gasometriaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.gasometriaResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, gasometriaResultadosObtidos: text})}
                                placeholder="Resultados obtidos da gasometria arterial"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.gasometriaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, gasometriaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a gasometria arterial"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.gasometriaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, gasometriaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na gasometria arterial"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.gasometriaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, gasometriaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.gasometriaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.gasometriaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, gasometriaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.gasometriaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.gasometriaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, gasometriaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.gasometriaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Oximetria de Pulso */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Oximetria de Pulso</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• SpO2 &gt; 95%</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.oximetriaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, oximetriaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.oximetriaResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, oximetriaResultadosObtidos: text})}
                                placeholder="Resultados obtidos da oximetria de pulso"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.oximetriaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, oximetriaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a oximetria de pulso"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.oximetriaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, oximetriaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na oximetria de pulso"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.oximetriaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, oximetriaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.oximetriaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.oximetriaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, oximetriaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.oximetriaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.oximetriaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, oximetriaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.oximetriaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Radiografia de Tórax */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Radiografia de Tórax</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.radiografiaToraxDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, radiografiaToraxDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.radiografiaToraxResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, radiografiaToraxResultadosObtidos: text})}
                                placeholder="Resultados obtidos da radiografia de tórax"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.radiografiaToraxObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, radiografiaToraxObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a radiografia de tórax"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.radiografiaToraxEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, radiografiaToraxEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na radiografia de tórax"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.radiografiaToraxStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, radiografiaToraxStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.radiografiaToraxStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.radiografiaToraxStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, radiografiaToraxStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.radiografiaToraxStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.radiografiaToraxStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, radiografiaToraxStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.radiografiaToraxStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Teste de Caminhada de 6 Minutos */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Teste de Caminhada de 6 Minutos</Text>
                        </View>
                        
                        {/* Valores de Referência */}
                        <View style={styles.referenceValues}>
                            <Text style={styles.referenceTitle}>Valores de Referência:</Text>
                            <Text style={styles.referenceText}>• &gt; 350 metros</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.testeCaminhadaDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, testeCaminhadaDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.testeCaminhadaResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, testeCaminhadaResultadosObtidos: text})}
                                placeholder="Resultados obtidos do teste de caminhada de 6 minutos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.testeCaminhadaObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, testeCaminhadaObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre o teste de caminhada de 6 minutos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.testeCaminhadaEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, testeCaminhadaEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada no teste de caminhada de 6 minutos"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.testeCaminhadaStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, testeCaminhadaStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.testeCaminhadaStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.testeCaminhadaStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, testeCaminhadaStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.testeCaminhadaStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.testeCaminhadaStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, testeCaminhadaStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.testeCaminhadaStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Outros Exames Respiratórios */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Outros Exames Respiratórios</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Outros Exames Respiratórios:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.outrosRespiratorios}
                                onChangeText={(text) => setFormData({...formData, outrosRespiratorios: text})}
                                placeholder="Outros exames respiratórios realizados"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            case 'neurologicos':
                return (
                    <View style={styles.formContent}>
                        {/* Eletroencefalograma (EEG) */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Eletroencefalograma (EEG)</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.eegDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, eegDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.eegResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, eegResultadosObtidos: text})}
                                placeholder="Resultados obtidos do eletroencefalograma"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.eegObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, eegObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre o eletroencefalograma"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.eegEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, eegEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada no eletroencefalograma"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.eegStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, eegStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.eegStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.eegStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, eegStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.eegStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.eegStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, eegStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.eegStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Eletroneuromiografia (ENMG) */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Eletroneuromiografia (ENMG)</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.enmgDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, enmgDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.enmgResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, enmgResultadosObtidos: text})}
                                placeholder="Resultados obtidos da eletroneuromiografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.enmgObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, enmgObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a eletroneuromiografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.enmgEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, enmgEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na eletroneuromiografia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.enmgStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, enmgStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.enmgStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.enmgStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, enmgStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.enmgStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.enmgStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, enmgStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.enmgStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Ressonância Magnética Cerebral */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Ressonância Magnética Cerebral</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.ressonanciaCerebralDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, ressonanciaCerebralDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ressonanciaCerebralResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, ressonanciaCerebralResultadosObtidos: text})}
                                placeholder="Resultados obtidos da ressonância magnética cerebral"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ressonanciaCerebralObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, ressonanciaCerebralObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a ressonância magnética cerebral"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.ressonanciaCerebralEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, ressonanciaCerebralEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na ressonância magnética cerebral"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ressonanciaCerebralStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, ressonanciaCerebralStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ressonanciaCerebralStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ressonanciaCerebralStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, ressonanciaCerebralStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ressonanciaCerebralStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.ressonanciaCerebralStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, ressonanciaCerebralStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.ressonanciaCerebralStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Tomografia Cerebral */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Tomografia Cerebral</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.tomografiaCerebralDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, tomografiaCerebralDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.tomografiaCerebralResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, tomografiaCerebralResultadosObtidos: text})}
                                placeholder="Resultados obtidos da tomografia cerebral"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.tomografiaCerebralObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, tomografiaCerebralObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre a tomografia cerebral"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.tomografiaCerebralEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, tomografiaCerebralEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada na tomografia cerebral"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.tomografiaCerebralStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, tomografiaCerebralStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.tomografiaCerebralStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.tomografiaCerebralStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, tomografiaCerebralStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.tomografiaCerebralStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.tomografiaCerebralStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, tomografiaCerebralStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.tomografiaCerebralStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Potenciais Evocados */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Potenciais Evocados</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Data de Realização:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={formData.potenciaisEvocadosDataRealizacao}
                                onChangeText={(text) => setFormData({...formData, potenciaisEvocadosDataRealizacao: text})}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Resultados Obtidos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.potenciaisEvocadosResultadosObtidos}
                                onChangeText={(text) => setFormData({...formData, potenciaisEvocadosResultadosObtidos: text})}
                                placeholder="Resultados obtidos dos potenciais evocados"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Observações Clínicas:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.potenciaisEvocadosObservacoesClinicas}
                                onChangeText={(text) => setFormData({...formData, potenciaisEvocadosObservacoesClinicas: text})}
                                placeholder="Observações clínicas sobre os potenciais evocados"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Evolução do Paciente:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                value={formData.potenciaisEvocadosEvolucaoPaciente}
                                onChangeText={(text) => setFormData({...formData, potenciaisEvocadosEvolucaoPaciente: text})}
                                placeholder="Evolução do paciente baseada nos potenciais evocados"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Status do Exame:</Text>
                            <View style={styles.statusButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.potenciaisEvocadosStatus === 'bom' && styles.statusButtonBom
                                    ]}
                                    onPress={() => setFormData({...formData, potenciaisEvocadosStatus: 'bom'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.potenciaisEvocadosStatus === 'bom' && styles.statusButtonTextSelected
                                    ]}>
                                        Bom (+1)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.potenciaisEvocadosStatus === 'atencao' && styles.statusButtonAtencao
                                    ]}
                                    onPress={() => setFormData({...formData, potenciaisEvocadosStatus: 'atencao'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.potenciaisEvocadosStatus === 'atencao' && styles.statusButtonTextSelected
                                    ]}>
                                        Atenção (0)
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        formData.potenciaisEvocadosStatus === 'ruim' && styles.statusButtonRuim
                                    ]}
                                    onPress={() => setFormData({...formData, potenciaisEvocadosStatus: 'ruim'})}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        formData.potenciaisEvocadosStatus === 'ruim' && styles.statusButtonTextSelected
                                    ]}>
                                        Ruim (-1)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Separador */}
                        <View style={styles.separator} />
                        
                        {/* Outros Exames Neurológicos */}
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Outros Exames Neurológicos</Text>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Outros Exames Neurológicos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.outrosNeurologicos}
                                onChangeText={(text) => setFormData({...formData, outrosNeurologicos: text})}
                                placeholder="Outros exames neurológicos realizados"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            case 'ortopedicos':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Radiografia de Ossos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.radiografiaOssos}
                                onChangeText={(text) => setFormData({...formData, radiografiaOssos: text})}
                                placeholder="Resultado da radiografia óssea"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Densitometria Óssea:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.densitometria}
                                onChangeText={(text) => setFormData({...formData, densitometria: text})}
                                placeholder="Resultado da densitometria"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Ressonância Articular:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.ressonanciaArticular}
                                onChangeText={(text) => setFormData({...formData, ressonanciaArticular: text})}
                                placeholder="Resultado da ressonância articular"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Artroscopia:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.artroscopia}
                                onChangeText={(text) => setFormData({...formData, artroscopia: text})}
                                placeholder="Resultado da artroscopia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Outros Exames Ortopédicos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.outrosOrtopedicos}
                                onChangeText={(text) => setFormData({...formData, outrosOrtopedicos: text})}
                                placeholder="Outros exames ortopédicos realizados"
                                multiline
                            />
                        </View>
                    </View>
                );
                
            case 'urologicos':
                return (
                    <View style={styles.formContent}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Ultrassom Abdominal:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.ultrassomAbdominal}
                                onChangeText={(text) => setFormData({...formData, ultrassomAbdominal: text})}
                                placeholder="Resultado do ultrassom abdominal"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Urofluxometria:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.urofluxometria}
                                onChangeText={(text) => setFormData({...formData, urofluxometria: text})}
                                placeholder="Resultado da urofluxometria"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Cistoscopia:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.citoscopia}
                                onChangeText={(text) => setFormData({...formData, citoscopia: text})}
                                placeholder="Resultado da cistoscopia"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Ultrassom Pélvico:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.ultrassomPelvico}
                                onChangeText={(text) => setFormData({...formData, ultrassomPelvico: text})}
                                placeholder="Resultado do ultrassom pélvico"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Papanicolau:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.papanicolau}
                                onChangeText={(text) => setFormData({...formData, papanicolau: text})}
                                placeholder="Resultado do papanicolau"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Outros Exames Urológicos/Ginecológicos:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.outrosUrologicos}
                                onChangeText={(text) => setFormData({...formData, outrosUrologicos: text})}
                                placeholder="Outros exames urológicos/ginecológicos realizados"
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
    sectionTitle: {
        marginBottom: 15,
        marginTop: 10,
    },
    sectionTitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
        textAlign: 'center',
    },
    referenceValues: {
        backgroundColor: '#e3f2fd',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#2196f3',
    },
    referenceTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1976d2',
        marginBottom: 8,
    },
    referenceText: {
        fontSize: 13,
        color: '#424242',
        marginBottom: 2,
    },
    statusButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    statusButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ced4da',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    statusButtonSelected: {
        borderColor: '#007bff',
        backgroundColor: '#007bff',
    },
    statusButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6c757d',
        textAlign: 'center',
    },
    statusButtonTextSelected: {
        color: '#fff',
    },
    // Cores específicas para cada status
    statusButtonBom: {
        borderColor: '#28a745',
        backgroundColor: '#28a745',
    },
    statusButtonAtencao: {
        borderColor: '#ffc107',
        backgroundColor: '#ffc107',
    },
    statusButtonRuim: {
        borderColor: '#dc3545',
        backgroundColor: '#dc3545',
    },
    separator: {
        height: 1,
        backgroundColor: '#e9ecef',
        marginVertical: 20,
    },
});

export default ExamesComplementares;
