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
        raioX: '',
        tomografia: '',
        ressonancia: '',
        ultrassom: '',
        outrosImagem: '',
        
        // 3. EXAMES CARDIOLÓGICOS
        ecg: '',
        holter: '',
        testeErgometrico: '',
        ecocardiograma: '',
        cateterismo: '',
        outrosCardio: '',
        
        // 4. EXAMES RESPIRATÓRIOS
        espirometria: '',
        gasometria: '',
        radiografiaTorax: '',
        tomografiaTorax: '',
        outrosRespiratorios: '',
        
        // 5. EXAMES NEUROLÓGICOS
        eletroencefalograma: '',
        tomografiaCranio: '',
        ressonanciaCranio: '',
        puncaoLombar: '',
        outrosNeurologicos: '',
        
        // 6. EXAMES ORTOPÉDICOS E FUNCIONAIS
        radiografiaOssos: '',
        densitometria: '',
        ressonanciaArticular: '',
        artroscopia: '',
        outrosOrtopedicos: '',
        
        // 7. EXAMES UROLÓGICOS E GINECOLÓGICOS
        ultrassomAbdominal: '',
        urofluxometria: '',
        citoscopia: '',
        ultrassomPelvico: '',
        papanicolau: '',
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
                
            case 'cardiologicos':
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
                            <Text style={styles.formLabel}>Ecocardiograma:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.ecocardiograma}
                                onChangeText={(text) => setFormData({...formData, ecocardiograma: text})}
                                placeholder="Resultado do ecocardiograma"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Cateterismo:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.cateterismo}
                                onChangeText={(text) => setFormData({...formData, cateterismo: text})}
                                placeholder="Resultado do cateterismo"
                                multiline
                            />
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
                            <Text style={styles.formLabel}>Gasometria Arterial:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.gasometria}
                                onChangeText={(text) => setFormData({...formData, gasometria: text})}
                                placeholder="Resultado da gasometria"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Radiografia de Tórax:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.radiografiaTorax}
                                onChangeText={(text) => setFormData({...formData, radiografiaTorax: text})}
                                placeholder="Resultado da radiografia de tórax"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Tomografia de Tórax:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.tomografiaTorax}
                                onChangeText={(text) => setFormData({...formData, tomografiaTorax: text})}
                                placeholder="Resultado da tomografia de tórax"
                                multiline
                            />
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
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Eletroencefalograma (EEG):</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.eletroencefalograma}
                                onChangeText={(text) => setFormData({...formData, eletroencefalograma: text})}
                                placeholder="Resultado do EEG"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Tomografia de Crânio:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.tomografiaCranio}
                                onChangeText={(text) => setFormData({...formData, tomografiaCranio: text})}
                                placeholder="Resultado da tomografia de crânio"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Ressonância de Crânio:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.ressonanciaCranio}
                                onChangeText={(text) => setFormData({...formData, ressonanciaCranio: text})}
                                placeholder="Resultado da ressonância de crânio"
                                multiline
                            />
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Punção Lombar:</Text>
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                value={formData.puncaoLombar}
                                onChangeText={(text) => setFormData({...formData, puncaoLombar: text})}
                                placeholder="Resultado da punção lombar"
                                multiline
                            />
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
