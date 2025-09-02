import React, { useState, useEffect, useCallback } from 'react';
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
    Platform,
    Modal
} from 'react-native';
import Footer from '../components/Footer';
import { useAnamnese } from '../context/AnamneseContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const Anamnese = ({ navigation, route }) => {
    const { paciente } = route.params;
    const { saveAnamneseData, getAnamneseData } = useAnamnese();
    
    // Estado para controlar quais seções estão expandidas
    const [expandedSections, setExpandedSections] = useState({});
    
    // Estados para controlar os pickers de data
    const [showDataAvaliacaoPicker, setShowDataAvaliacaoPicker] = useState(false);
    const [showDataNascimentoPicker, setShowDataNascimentoPicker] = useState(false);
    
    // Função auxiliar para converter string de data para Date object
    const parseDateString = useCallback((dateString) => {
        if (!dateString) return new Date();
        try {
            const parts = dateString.split('/');
            if (parts.length === 3) {
                const day = parseInt(parts[0]);
                const month = parseInt(parts[1]) - 1; // Mês começa em 0
                const year = parseInt(parts[2]);
                
                // Validar se os valores são válidos
                if (day >= 1 && day <= 31 && month >= 0 && month <= 11 && year >= 1900) {
                    return new Date(year, month, day);
                }
            }
        } catch (error) {
            console.log('Erro ao converter data:', error);
        }
        return new Date();
    }, []);

    // Função para alternar o estado de expansão de uma seção
    const toggleSection = useCallback((sectionKey) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey]
        }));
    }, []);

    // Função para lidar com a seleção da data de avaliação
    const handleDataAvaliacaoChange = useCallback((event, selectedDate) => {
        setShowDataAvaliacaoPicker(false);
        if (selectedDate && event.type !== 'dismissed') {
            const formattedDate = selectedDate.toLocaleDateString('pt-BR');
            setFormData(prev => ({
                ...prev,
                dataAvaliacao: formattedDate
            }));
        }
    }, []);

    // Função para lidar com a seleção da data de nascimento
    const handleDataNascimentoChange = useCallback((event, selectedDate) => {
        setShowDataNascimentoPicker(false);
        if (selectedDate && event.type !== 'dismissed') {
            const formattedDate = selectedDate.toLocaleDateString('pt-BR');
            
            // Calcular idade de forma mais precisa
            const today = new Date();
            const birthDate = new Date(selectedDate);
            
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            // Garantir que a idade não seja negativa e não seja muito alta
            age = Math.max(0, Math.min(age, 150));
            
            setFormData(prev => ({
                ...prev,
                dataNascimento: formattedDate,
                idade: age.toString()
            }));
        }
    }, []);

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
         doencasCronicas: '',
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
         observacoesMedicamentos: '',
        
        // Seção 10: Impressão Diagnóstica
        hipotesesDiagnosticas: '',
        condutaInicial: '',
        encaminhamentos: '',
        observacoesClinicas: ''
    });

    // Carregar dados existentes ao montar o componente
    useEffect(() => {
        const existingData = getAnamneseData(paciente.prontuario);
        if (existingData && Object.keys(existingData).length > 0) {
            setFormData(prev => {
                // Só atualiza se os dados são diferentes
                const hasChanges = Object.keys(existingData).some(key => 
                    existingData[key] !== prev[key]
                );
                
                if (hasChanges) {
                    return {
                        ...prev,
                        ...existingData
                    };
                }
                return prev;
            });
        } else {
            // Se não há dados existentes, inicializar com a data atual
            setFormData(prev => ({
                ...prev,
                dataAvaliacao: new Date().toLocaleDateString('pt-BR')
            }));
        }
    }, [paciente.prontuario, getAnamneseData]);

    // Salvar dados automaticamente quando formData mudar (com debounce)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (Object.keys(formData).some(key => formData[key] !== '')) {
                saveAnamneseData(paciente.prontuario, formData);
            }
        }, 1000); // Aguarda 1 segundo antes de salvar

        return () => clearTimeout(timeoutId);
    }, [formData, paciente.prontuario, saveAnamneseData]);

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
                            <TouchableOpacity 
                                style={styles.dateButton}
                                onPress={() => setShowDataAvaliacaoPicker(true)}
                            >
                                <Text style={styles.dateButtonText}>
                                    {formData.dataAvaliacao ? formData.dataAvaliacao : '📅 Selecionar Data'}
                                </Text>
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
                            <TouchableOpacity 
                                style={styles.dateButton}
                                onPress={() => setShowDataNascimentoPicker(true)}
                            >
                                <Text style={styles.dateButtonText}>
                                    {formData.dataNascimento ? formData.dataNascimento : '📅 Selecionar Data'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Idade:</Text>
                            <TextInput
                                style={[styles.textInput, styles.ageInput]}
                                value={formData.idade ? `${formData.idade} anos` : ''}
                                placeholder="Idade calculada automaticamente"
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

             case 'historicoMedico':
                 return (
                     <View style={styles.formContent}>
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Doenças crônicas:</Text>
                             <TextInput
                                 style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                 value={formData.doencasCronicas}
                                 onChangeText={(text) => setFormData({...formData, doencasCronicas: text})}
                                 placeholder="Descreva as doenças crônicas"
                                 multiline
                             />
                         </View>
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Cirurgias anteriores:</Text>
                             <View style={styles.checkboxGroup}>
                                 {['Sim', 'Não'].map((opcao) => (
                                     <TouchableOpacity
                                         key={opcao}
                                         style={styles.checkboxItem}
                                         onPress={() => setFormData({...formData, cirurgiasAnteriores: opcao})}
                                     >
                                         <Text style={formData.cirurgiasAnteriores === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                             {formData.cirurgiasAnteriores === opcao ? '☑' : '☐'} {opcao}
                                         </Text>
                                     </TouchableOpacity>
                                 ))}
                             </View>
                         </View>
                         
                         {formData.cirurgiasAnteriores === 'Sim' && (
                             <View style={styles.formRow}>
                                 <Text style={styles.formLabel}>Quais cirurgias:</Text>
                                 <TextInput
                                     style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                     value={formData.quaisCirurgias}
                                     onChangeText={(text) => setFormData({...formData, quaisCirurgias: text})}
                                     placeholder="Especifique as cirurgias realizadas"
                                     multiline
                                 />
                             </View>
                         )}
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Internações anteriores:</Text>
                             <View style={styles.checkboxGroup}>
                                 {['Sim', 'Não'].map((opcao) => (
                                     <TouchableOpacity
                                         key={opcao}
                                         style={styles.checkboxItem}
                                         onPress={() => setFormData({...formData, internacoesAnteriores: opcao})}
                                     >
                                         <Text style={formData.internacoesAnteriores === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                             {formData.internacoesAnteriores === opcao ? '☑' : '☐'} {opcao}
                                         </Text>
                                     </TouchableOpacity>
                                 ))}
                             </View>
                         </View>
                         
                         {formData.internacoesAnteriores === 'Sim' && (
                             <View style={styles.formRow}>
                                 <Text style={styles.formLabel}>Quais internações:</Text>
                                 <TextInput
                                     style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                     value={formData.quaisInternacoes}
                                     onChangeText={(text) => setFormData({...formData, quaisInternacoes: text})}
                                     placeholder="Especifique as internações"
                                     multiline
                                 />
                             </View>
                         )}
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Alergias alimentares:</Text>
                             <View style={styles.checkboxGroup}>
                                 {['Sim', 'Não'].map((opcao) => (
                                     <TouchableOpacity
                                         key={opcao}
                                         style={styles.checkboxItem}
                                         onPress={() => setFormData({...formData, alergiasAlimentares: opcao})}
                                     >
                                         <Text style={formData.alergiasAlimentares === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                             {formData.alergiasAlimentares === opcao ? '☑' : '☐'} {opcao}
                                         </Text>
                                     </TouchableOpacity>
                                 ))}
                             </View>
                         </View>
                         
                         {formData.alergiasAlimentares === 'Sim' && (
                             <View style={styles.formRow}>
                                 <Text style={styles.formLabel}>Quais alergias:</Text>
                                 <TextInput
                                     style={styles.textInput}
                                     value={formData.quaisAlergias}
                                     onChangeText={(text) => setFormData({...formData, quaisAlergias: text})}
                                     placeholder="Especifique as alergias alimentares"
                                 />
                             </View>
                         )}
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Detalhamento médico:</Text>
                             <TextInput
                                 style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                 value={formData.detalhesMedicos}
                                 onChangeText={(text) => setFormData({...formData, detalhesMedicos: text})}
                                 placeholder="Campo de texto livre para detalhamento médico"
                                 multiline
                             />
                         </View>
                     </View>
                 );

             case 'historicoFamiliar':
                 return (
                     <View style={styles.formContent}>
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Doenças hereditárias:</Text>
                             <View style={styles.checkboxGroup}>
                                 {['Sim', 'Não'].map((opcao) => (
                                     <TouchableOpacity
                                         key={opcao}
                                         style={styles.checkboxItem}
                                         onPress={() => setFormData({...formData, doencasHereditarias: opcao})}
                                     >
                                         <Text style={formData.doencasHereditarias === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                             {formData.doencasHereditarias === opcao ? '☑' : '☐'} {opcao}
                                         </Text>
                                     </TouchableOpacity>
                                 ))}
                             </View>
                         </View>
                         
                         {formData.doencasHereditarias === 'Sim' && (
                             <View style={styles.formRow}>
                                 <Text style={styles.formLabel}>Quais doenças hereditárias:</Text>
                                 <TextInput
                                     style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                     value={formData.quaisDoencasHereditarias}
                                     onChangeText={(text) => setFormData({...formData, quaisDoencasHereditarias: text})}
                                     placeholder="Especifique as doenças hereditárias"
                                     multiline
                                 />
                             </View>
                         )}
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Condições crônicas na família:</Text>
                             <View style={styles.checkboxGroup}>
                                 {['Sim', 'Não'].map((opcao) => (
                                     <TouchableOpacity
                                         key={opcao}
                                         style={styles.checkboxItem}
                                         onPress={() => setFormData({...formData, condicoesCronicas: opcao})}
                                     >
                                         <Text style={formData.condicoesCronicas === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                             {formData.condicoesCronicas === opcao ? '☑' : '☐'} {opcao}
                                         </Text>
                                     </TouchableOpacity>
                                 ))}
                             </View>
                         </View>
                         
                         {formData.condicoesCronicas === 'Sim' && (
                             <View style={styles.formRow}>
                                 <Text style={styles.formLabel}>Quais condições:</Text>
                                 <TextInput
                                     style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                     value={formData.quaisCondicoes}
                                     onChangeText={(text) => setFormData({...formData, quaisCondicoes: text})}
                                     placeholder="Especifique as condições crônicas na família"
                                     multiline
                                 />
                             </View>
                         )}
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Detalhamento familiar:</Text>
                             <TextInput
                                 style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                 value={formData.detalhesFamiliares}
                                 onChangeText={(text) => setFormData({...formData, detalhesFamiliares: text})}
                                 placeholder="Campo de texto livre para detalhamento familiar"
                                 multiline
                             />
                         </View>
                     </View>
                 );

             case 'historicoPsicossocial':
                 return (
                     <View style={styles.formContent}>
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Tabagismo:</Text>
                             <View style={styles.checkboxGroup}>
                                 {['Nunca fumou', 'Ex-fumante', 'Fumante atual'].map((opcao) => (
                                     <TouchableOpacity
                                         key={opcao}
                                         style={styles.checkboxItem}
                                         onPress={() => setFormData({...formData, tabagismo: opcao})}
                                     >
                                         <Text style={formData.tabagismo === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                             {formData.tabagismo === opcao ? '☑' : '☐'} {opcao}
                                         </Text>
                                     </TouchableOpacity>
                                 ))}
                             </View>
                         </View>
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Consumo de álcool:</Text>
                             <View style={styles.checkboxGroup}>
                                 {['Não consome', 'Socialmente', 'Regularmente'].map((opcao) => (
                                     <TouchableOpacity
                                         key={opcao}
                                         style={styles.checkboxItem}
                                         onPress={() => setFormData({...formData, consumoAlcool: opcao})}
                                     >
                                         <Text style={formData.consumoAlcool === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                             {formData.consumoAlcool === opcao ? '☑' : '☐'} {opcao}
                                         </Text>
                                     </TouchableOpacity>
                                 ))}
                             </View>
                         </View>
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Uso de drogas:</Text>
                             <View style={styles.checkboxGroup}>
                                 {['Não usa', 'Uso ocasional', 'Uso frequente'].map((opcao) => (
                                     <TouchableOpacity
                                         key={opcao}
                                         style={styles.checkboxItem}
                                         onPress={() => setFormData({...formData, usoDrogas: opcao})}
                                     >
                                         <Text style={formData.usoDrogas === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                             {formData.usoDrogas === opcao ? '☑' : '☐'} {opcao}
                                         </Text>
                                     </TouchableOpacity>
                                 ))}
                             </View>
                         </View>
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Atividade física:</Text>
                             <View style={styles.checkboxGroup}>
                                 {['Sedentário', 'Irregular', 'Regular'].map((opcao) => (
                                     <TouchableOpacity
                                         key={opcao}
                                         style={styles.checkboxItem}
                                         onPress={() => setFormData({...formData, atividadeFisica: opcao})}
                                     >
                                         <Text style={formData.atividadeFisica === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                             {formData.atividadeFisica === opcao ? '☑' : '☐'} {opcao}
                                         </Text>
                                     </TouchableOpacity>
                                 ))}
                             </View>
                         </View>
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Hábitos alimentares:</Text>
                             <View style={styles.checkboxGroup}>
                                 {['Saudáveis', 'Irregulares', 'Restritivos'].map((opcao) => (
                                     <TouchableOpacity
                                         key={opcao}
                                         style={styles.checkboxItem}
                                         onPress={() => setFormData({...formData, habitosAlimentares: opcao})}
                                     >
                                         <Text style={formData.habitosAlimentares === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                             {formData.habitosAlimentares === opcao ? '☑' : '☐'} {opcao}
                                         </Text>
                                     </TouchableOpacity>
                                 ))}
                             </View>
                         </View>
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Saúde mental:</Text>
                             <View style={styles.checkboxGroup}>
                                 {['Sem queixas', 'Ansiedade', 'Depressão', 'Transtornos diagnosticados', 'Em acompanhamento psicológico/psiquiátrico'].map((opcao) => (
                                     <TouchableOpacity
                                         key={opcao}
                                         style={styles.checkboxItem}
                                         onPress={() => setFormData({...formData, saudeMental: opcao})}
                                     >
                                         <Text style={formData.saudeMental === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                             {formData.saudeMental === opcao ? '☑' : '☐'} {opcao}
                                         </Text>
                                     </TouchableOpacity>
                                 ))}
                             </View>
                         </View>
                     </View>
                 );

             case 'usoMedicamentos':
                 return (
                     <View style={styles.formContent}>
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Medicamentos em uso atual:</Text>
                             <View style={styles.checkboxGroup}>
                                 {['Sim', 'Não'].map((opcao) => (
                                     <TouchableOpacity
                                         key={opcao}
                                         style={styles.checkboxItem}
                                         onPress={() => setFormData({...formData, medicamentosUso: opcao})}
                                     >
                                         <Text style={formData.medicamentosUso === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                             {formData.medicamentosUso === opcao ? '☑' : '☐'} {opcao}
                                         </Text>
                                     </TouchableOpacity>
                                 ))}
                             </View>
                         </View>
                         
                         {formData.medicamentosUso === 'Sim' && (
                             <View style={styles.formRow}>
                                 <Text style={styles.formLabel}>Quais medicamentos:</Text>
                                 <TextInput
                                     style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                     value={formData.quaisMedicamentos}
                                     onChangeText={(text) => setFormData({...formData, quaisMedicamentos: text})}
                                     placeholder="Especifique os medicamentos em uso"
                                     multiline
                                 />
                             </View>
                         )}
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Alergias a medicamentos:</Text>
                             <View style={styles.checkboxGroup}>
                                 {['Sim', 'Não'].map((opcao) => (
                                     <TouchableOpacity
                                         key={opcao}
                                         style={styles.checkboxItem}
                                         onPress={() => setFormData({...formData, alergiasMedicamentos: opcao})}
                                     >
                                         <Text style={formData.alergiasMedicamentos === opcao ? styles.checkboxTextSelected : styles.checkboxText}>
                                             {formData.alergiasMedicamentos === opcao ? '☑' : '☐'} {opcao}
                                         </Text>
                                     </TouchableOpacity>
                                 ))}
                             </View>
                         </View>
                         
                                                   {formData.alergiasMedicamentos === 'Sim' && (
                              <View style={styles.formRow}>
                                  <Text style={styles.formLabel}>Quais alergias a medicamentos:</Text>
                                  <TextInput
                                      style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                      value={formData.quaisAlergiasMedicamentos}
                                      onChangeText={(text) => setFormData({...formData, quaisAlergiasMedicamentos: text})}
                                      placeholder="Especifique as alergias a medicamentos"
                                      multiline
                                  />
                              </View>
                          )}
                          
                          <View style={styles.formRow}>
                              <Text style={styles.formLabel}>Observações clínicas:</Text>
                              <TextInput
                                  style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                  value={formData.observacoesMedicamentos}
                                  onChangeText={(text) => setFormData({...formData, observacoesMedicamentos: text})}
                                  placeholder="Campo de texto livre para observações clínicas sobre medicamentos"
                                  multiline
                              />
                          </View>
                      </View>
                  );

             case 'impressaoDiagnostica':
                 return (
                     <View style={styles.formContent}>
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Hipóteses diagnósticas:</Text>
                             <TextInput
                                 style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                 value={formData.hipotesesDiagnosticas}
                                 onChangeText={(text) => setFormData({...formData, hipotesesDiagnosticas: text})}
                                 placeholder="Descreva as hipóteses diagnósticas"
                                 multiline
                             />
                         </View>
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Conduta inicial:</Text>
                             <TextInput
                                 style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                 value={formData.condutaInicial}
                                 onChangeText={(text) => setFormData({...formData, condutaInicial: text})}
                                 placeholder="Descreva a conduta inicial"
                                 multiline
                             />
                         </View>
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Encaminhamentos necessários:</Text>
                             <TextInput
                                 style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                                 value={formData.encaminhamentos}
                                 onChangeText={(text) => setFormData({...formData, encaminhamentos: text})}
                                 placeholder="Descreva os encaminhamentos necessários"
                                 multiline
                             />
                         </View>
                         
                         <View style={styles.formRow}>
                             <Text style={styles.formLabel}>Observações clínicas:</Text>
                             <TextInput
                                 style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                                 value={formData.observacoesClinicas}
                                 onChangeText={(text) => setFormData({...formData, observacoesClinicas: text})}
                                 placeholder="Campo de texto livre para observações clínicas"
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

            {/* DateTimePickers */}
            {showDataAvaliacaoPicker && (
                <DateTimePicker
                    value={parseDateString(formData.dataAvaliacao)}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDataAvaliacaoChange}
                    maximumDate={new Date()}
                    minimumDate={new Date(1900, 0, 1)}
                />
            )}
            
            {showDataNascimentoPicker && (
                <DateTimePicker
                    value={parseDateString(formData.dataNascimento)}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDataNascimentoChange}
                    maximumDate={new Date()} // Permite apenas datas até hoje
                    minimumDate={new Date(1900, 0, 1)} // Permite datas a partir de 1900
                />
)}
            
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
    ageInput: {
        backgroundColor: '#f8f9fa',
        color: '#6c757d',
        fontStyle: 'italic',
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
