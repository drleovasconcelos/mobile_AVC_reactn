import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
// Import condicional do Picker apenas para mobile
let Picker = null;
if (Platform.OS !== 'web') {
    try {
        Picker = require('@react-native-picker/picker').Picker;
    } catch (error) {
        console.warn('Picker não disponível:', error);
    }
}

// Componente Picker unificado que funciona em ambas as plataformas
const UnifiedPicker = ({ selectedValue, onValueChange, children, style }) => {
    if (Platform.OS === 'web') {
        return (
            <select 
                value={selectedValue} 
                onChange={(e) => onValueChange(parseInt(e.target.value))}
                style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    ...style
                }}
            >
                {children.map((item, index) => (
                    <option key={index} value={item.props.value}>
                        {item.props.label}
                    </option>
                ))}
            </select>
        );
    } else if (Picker) {
        return (
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                style={style}
            >
                {children}
            </Picker>
        );
    }
    return null;
};
// Import condicional dos módulos Expo apenas para mobile
let Print = null;
let Sharing = null;
if (Platform.OS !== 'web') {
    try {
        Print = require('expo-print');
        Sharing = require('expo-sharing');
    } catch (error) {
        console.warn('Módulos Expo não disponíveis:', error);
    }
}
import Footer from '../components/Footer';

const EscalasHospitalares = ({ navigation, route }) => {
    const { paciente } = route.params;
    
    // Estado para controlar quais seções estão expandidas
    const [expandedSections, setExpandedSections] = useState({});
    
    // Estados para as escalas
    // Glasgow
    const [eyeResponse, setEyeResponse] = useState(4);
    const [verbalResponse, setVerbalResponse] = useState(5);
    const [motorResponse, setMotorResponse] = useState(6);
    const [pupilResponse, setPupilResponse] = useState(0);
    
    // RASS
    const [rassScore, setRassScore] = useState(0);
    
    // CAM-ICU
    const [inicioAgudo, setInicioAgudo] = useState(0);
    const [inatencao, setInatencao] = useState(0);
    const [rassscore, setRassscore] = useState(0);
    const [pensamentodesorganizado, setPensamentodesorganizado] = useState(1);
    
    // Ashworth
    const [ashworthSelected, setAshworthSelected] = useState(null);
    
    // Ramsay
    const [ramsayScore, setRamsayScore] = useState(1);
    
    // AVPU
    const [avpuLevel, setAvpuLevel] = useState('');
    
    // MRC
    const [flexaoOmbroEsq, setFlexaoOmbroEsq] = useState(1);
    const [flexaoOmbroDir, setFlexaoOmbroDir] = useState(1);
    const [cotoveloEsq, setCotoveloEsq] = useState(1);
    const [cotoveloDir, setCotoveloDir] = useState(1);
    const [punhoEsq, setPunhoEsq] = useState(1);
    const [punhoDir, setPunhoDir] = useState(1);
    const [quadrilEsq, setQuadrilEsq] = useState(1);
    const [quadrilDir, setQuadrilDir] = useState(1);
    const [joelhoEsq, setJoelhoEsq] = useState(1);
    const [joelhoDir, setJoelhoDir] = useState(1);
    const [tornozeloEsq, setTornozeloEsq] = useState(1);
    const [tornozeloDir, setTornozeloDir] = useState(1);
    
    // Rankin
    const [rankinLevel, setRankinLevel] = useState('');
    
    // Cincinnati
    const [face, setFace] = useState('normal');
    const [arm, setArm] = useState('normal');
    const [speech, setSpeech] = useState('normal');
    
    // Wexler
    const [wexlerSelected, setWexlerSelected] = useState(null);

    // Funções de cálculo
    const baseScore = Number(eyeResponse) + Number(verbalResponse) + Number(motorResponse);
    const totalScore = baseScore + Number(pupilResponse);
    
    const MRCScore = Number(flexaoOmbroEsq) + Number(flexaoOmbroDir) + Number(cotoveloEsq) + 
                    Number(cotoveloDir) + Number(punhoEsq) + Number(punhoDir) + Number(quadrilEsq) + 
                    Number(quadrilDir) + Number(joelhoEsq) + Number(joelhoDir) + Number(tornozeloEsq) + 
                    Number(tornozeloDir);
    
    const isAbnormal = face !== 'normal' || arm !== 'normal' || speech !== 'normal';

    // Função para alternar o estado de expansão de uma seção
    const toggleSection = (sectionKey) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey]
        }));
    };

    // Funções de interpretação
    const getGlasgowInterpretation = () => {
        if (totalScore <= 8) return '🔴 Comprometimento CEREBRAL GRAVE';
        if (totalScore <= 12) return '🟠 Comprometimento CEREBRAL MODERADO';
        if (totalScore <= 15) return '🟢 Comprometimento CEREBRAL LEVE';
        return '❓ Fora da escala';
    };

    const getRassInterpretation = () => {
        switch (rassScore) {
            case +4: return '🔴 Combativo: violento, perigo imediato para equipe';
            case +3: return '🔴 Muito agitado: puxa/remove tubos ou cateteres; agressivo';
            case +2: return '🟠 Agitado: movimentos frequentes e sem propósito, resistência a ventilação';
            case +1: return '🟠 Inquieto: ansioso, mas movimentos não agressivos/vigorosos';
            case 0: return '🟢 Alerta e calmo';
            case -1: return '🟠 Sonolento: não completamente alerta, mas desperta com estímulo verbal';
            case -2: return '🔵 Sedação leve: desperta com estímulo físico';
            case -3: return '🔵 Sedação moderada: movimento ou abertura ocular ao estímulo físico';
            case -4: return '🔵 Sedação profunda: sem resposta ao estímulo verbal ou físico';
            case -5: return '⚫️ Não despertável: sem resposta a qualquer estímulo';
            default: return 'Selecione um valor na escala RASS';
        }
    };

    const getCamIcuInterpretation = () => {
        if (inicioAgudo == 0 && inatencao == 0 && rassscore == 0 && pensamentodesorganizado < 2) {
            return '🟢 Paciente NÃO APRESENTA Delirium';
        }
        if (inicioAgudo > 0 || inatencao > 0 || rassscore != 0 || pensamentodesorganizado > 1) {
            return '🔴 Paciente APRESENTA Delirium';
        }
        return '❓ Fora da escala';
    };

    const getRamsayInterpretation = () => {
        switch (ramsayScore) {
            case 1: return ' Ansioso, agitado ou inquieto';
            case 2: return ' Cooperativo, orientado e tranquilo';
            case 3: return ' Responde apenas a comandos verbais';
            case 4: return ' Resposta rápida a estímulo tátil ou auditivo';
            case 5: return ' Resposta lenta a estímulo doloroso';
            case 6: return ' Sem resposta a qualquer estímulo (profunda sedação)';
            default: return 'Selecione um nível da escala de Ramsay';
        }
    };

    const getAvpuInterpretation = () => {
        switch (avpuLevel) {
            case 'A': return ' Alerta: paciente desperto, responde espontaneamente.';
            case 'V': return ' Responde ao estímulo verbal: reage quando chamado.';
            case 'P': return ' Responde ao estímulo doloroso: sem resposta verbal, mas reage à dor.';
            case 'U': return ' Não responde: inconsciente, sem resposta a qualquer estímulo.';
            default: return 'Selecione um nível da escala AVPU.';
        }
    };

    const getMRCInterpretation = () => {
        if (MRCScore <= 48) return '🔴 Paciente APRESENTA fraqueza muscular';
        if (MRCScore <= 60) return '🟢 Paciente NÃO APRESENTA fraqueza muscular';
        return '❓ Fora da escala';
    };

    const getRankinInterpretation = () => {
        switch (rankinLevel) {
            case '0': return '0 – Sem sintomas.';
            case '1': return '1 – Sem incapacidade significativa; consegue realizar todas as atividades habituais, apesar de sintomas.';
            case '2': return '2 – Incapacidade leve; incapaz de realizar todas as atividades anteriores, mas é capaz de cuidar de si mesmo sem assistência.';
            case '3': return '3 – Incapacidade moderada; requer alguma ajuda, mas consegue andar sem assistência.';
            case '4': return '4 – Incapacidade moderadamente grave; incapaz de andar sem assistência e incapaz de atender às próprias necessidades físicas sem ajuda.';
            case '5': return '5 – Incapacidade grave; acamado, incontinente e requer cuidados constantes.';
            case '6': return '6 – Óbito.';
            default: return 'Selecione um nível da Escala de Rankin.';
        }
    };

    const getCincinnatiResult = () => {
        if (isAbnormal) return '🔴 Suspeita de AVC - Encaminhar imediatamente!';
        return '🟢 Sem sinais de AVC detectados.';
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
            key: 'rass',
            title: '2. ESCALA RASS',
            icon: '😴',
            content: 'Escala de Agitação-Sedação de Richmond'
        },
        {
            key: 'camIcu',
            title: '3. ESCALA CAM-ICU',
            icon: '🔍',
            content: 'Avaliação de delirium em UTI'
        },
        {
            key: 'ashworth',
            title: '4. ESCALA DE ASHWORTH',
            icon: '💪',
            content: 'Avaliação de espasticidade muscular'
        },
        {
            key: 'ramsay',
            title: '5. ESCALA DE RAMSAY',
            icon: '😴',
            content: 'Avaliação do nível de sedação'
        },
        {
            key: 'avpu',
            title: '6. ESCALA AVPU',
            icon: '👁️',
            content: 'Avaliação rápida do nível de consciência'
        },
        {
            key: 'mrc',
            title: '7. ESCALA MRC',
            icon: '💪',
            content: 'Avaliação da força muscular'
        },
        {
            key: 'rankin',
            title: '8. ESCALA DE RANKIN',
            icon: '📊',
            content: 'Avaliação de incapacidade funcional pós-AVC'
        },
        {
            key: 'cincinnati',
            title: '9. ESCALA DE CINCINNATI',
            icon: '🚨',
            content: 'Identificação de sinais de AVC'
        },
        {
            key: 'wexler',
            title: '10. ESCALA DE WEXLER',
            icon: '🦵',
            content: 'Avaliação de reflexos tendinosos'
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

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Abertura Ocular (E)</Text>
                            <UnifiedPicker
                                selectedValue={eyeResponse}
                                onValueChange={(itemValue) => setEyeResponse(itemValue)}
                                style={styles.picker}
                            >
                                <UnifiedPicker.Item label="4 - Abertura espontânea" value={4} />
                                <UnifiedPicker.Item label="3 - Ao estímulo verbal" value={3} />
                                <UnifiedPicker.Item label="2 - À pressão" value={2} />
                                <UnifiedPicker.Item label="1 - Nenhuma" value={1} />
                                <UnifiedPicker.Item label="NT - Não Testável" value={0} />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Resposta Verbal (V)</Text>
                            <UnifiedPicker
                                selectedValue={verbalResponse}
                                onValueChange={(itemValue) => setVerbalResponse(itemValue)}
                                style={styles.picker}
                            >
                                <UnifiedPicker.Item label="5 - Orientado" value={5} />
                                <UnifiedPicker.Item label="4 - Confuso" value={4} />
                                <UnifiedPicker.Item label="3 - Palavras" value={3} />
                                <UnifiedPicker.Item label="2 - Sons" value={2} />
                                <UnifiedPicker.Item label="1 - Nenhuma" value={1} />
                                <UnifiedPicker.Item label="NT - Não Testável" value={0} />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Resposta Motora (M)</Text>
                            <UnifiedPicker
                                selectedValue={motorResponse}
                                onValueChange={(itemValue) => setMotorResponse(itemValue)}
                                style={styles.picker}
                            >
                                <UnifiedPicker.Item label="6 - Obedece comandos" value={6} />
                                <UnifiedPicker.Item label="5 - Localizado" value={5} />
                                <UnifiedPicker.Item label="4 - Flexão normal" value={4} />
                                <UnifiedPicker.Item label="3 - Flexão anormal" value={3} />
                                <UnifiedPicker.Item label="2 - Extensão" value={2} />
                                <UnifiedPicker.Item label="1 - Nenhuma" value={1} />
                                <UnifiedPicker.Item label="NT - Não Testável" value={0} />
                            </UnifiedPicker>
                        </View>

                        <View style={[styles.section, { backgroundColor: '#fff8e1' }]}>
                            <Text style={styles.sectionTitle}>Resposta Pupilar (P)</Text>
                            <Text style={{ color: '#d32f2f', marginBottom: 8 }}>
                                ⚠️ Subtrai do score total!
                            </Text>
                            <UnifiedPicker
                                selectedValue={pupilResponse}
                                onValueChange={(itemValue) => setPupilResponse(itemValue)}
                                style={styles.picker}
                            >
                                <UnifiedPicker.Item label="0 - Ambas pupilas reagem" value={0} />
                                <UnifiedPicker.Item label="-1 - Apenas uma pupila reage" value={-1} />
                                <UnifiedPicker.Item label="-2 - Nenhuma pupila reage" value={-2} />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.resultContainer}>
                            <Text style={styles.scoreText}>
                                Score Base: {baseScore} (E{eyeResponse} + V{verbalResponse} + M{motorResponse})
                            </Text>
                            <Text style={styles.scoreText}>
                                Resposta Pupilar: {pupilResponse} 
                                {pupilResponse < 0 && " (reduz o score)"}
                            </Text>
                            <Text style={styles.finalScore}>
                                SCORE FINAL: {baseScore} {pupilResponse} = {totalScore}
                            </Text>
                            <Text style={styles.interpretationText}>
                                {getGlasgowInterpretation()}
                            </Text>
                        </View>
                    </View>
                );

            case 'rass':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>😴 ESCALA RASS</Text>
                        <Text style={styles.formDescription}>
                            Escala de Agitação-Sedação de Richmond
                        </Text>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Nível de Agitação/Sedação</Text>
                            <UnifiedPicker
                                selectedValue={rassScore}
                                onValueChange={(itemValue) => setRassScore(itemValue)}
                                style={styles.picker}
                            >
                                <UnifiedPicker.Item label="+4 - Combativo" value={+4} />
                                <UnifiedPicker.Item label="+3 - Muito agitado" value={+3} />
                                <UnifiedPicker.Item label="+2 - Agitado" value={+2} />
                                <UnifiedPicker.Item label="+1 - Inquieto" value={+1} />
                                <UnifiedPicker.Item label="0 - Alerta e calmo" value={0} />
                                <UnifiedPicker.Item label="-1 - Sonolento" value={-1} />
                                <UnifiedPicker.Item label="-2 - Sedação leve" value={-2} />
                                <UnifiedPicker.Item label="-3 - Sedação moderada" value={-3} />
                                <UnifiedPicker.Item label="-4 - Sedação profunda" value={-4} />
                                <UnifiedPicker.Item label="-5 - Não despertável" value={-5} />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.resultContainer}>
                            <Text style={styles.finalScore}>ESCALA RASS: {rassScore}</Text>
                            <Text style={styles.interpretationText}>{getRassInterpretation()}</Text>
                        </View>
                    </View>
                );

            case 'camIcu':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>🔍 ESCALA CAM-ICU</Text>
                        <Text style={styles.formDescription}>
                            Avaliação de delirium em UTI
                        </Text>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                O paciente teve flutuação do estado mental nas últimas 24 horas?
                            </Text>
                            <UnifiedPicker
                                selectedValue={inicioAgudo}
                                onValueChange={(itemValue) => setInicioAgudo(itemValue)}
                                style={styles.picker}
                            >
                                <UnifiedPicker.Item label="1 - Não" value={0} />
                                <UnifiedPicker.Item label="2 - Sim" value={1} />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Leia em voz alta as seguintes letras: "S, A, V, E, A, H, A, A, R, T".
                            </Text>
                            <Text style={styles.sectionTitle}>
                                O paciente deve apertar sua mão apenas ao ouvir a letra 'A'.
                            </Text>
                            <Text style={styles.sectionTitle}>
                                Quantos erros o paciente cometeu durante o teste?
                            </Text>
                            <UnifiedPicker
                                selectedValue={inatencao}
                                onValueChange={(itemValue) => setInatencao(itemValue)}
                                style={styles.picker}
                            >
                                <UnifiedPicker.Item label="1 - Cometeu menos que 3 erros" value={0} />
                                <UnifiedPicker.Item label="2 - Cometeu 3 ou mais erros" value={1} />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Qual o Estado Atual Na escala de RASS (Richmond Agitation-Sedation Scale) do paciente.
                            </Text>
                            <UnifiedPicker
                                selectedValue={rassscore}
                                onValueChange={(itemValue) => setRassscore(itemValue)}
                                style={styles.picker}
                            >
                                <UnifiedPicker.Item label="1 - Agressivo" value={4} />
                                <UnifiedPicker.Item label="2 - Muito Agitado" value={3} />
                                <UnifiedPicker.Item label="3 - Agitado" value={2} />
                                <UnifiedPicker.Item label="4 - Inquieto" value={1} />
                                <UnifiedPicker.Item label="5 - Tranquilo" value={0} />
                                <UnifiedPicker.Item label="6 - Sonolento" value={-1} />
                                <UnifiedPicker.Item label="7 - Acorda ao Estímulo leve" value={-2} />
                                <UnifiedPicker.Item label="8 - Sem Contato Visual" value={-3} />
                                <UnifiedPicker.Item label="9 - Acorda por Dor" value={-4} />
                                <UnifiedPicker.Item label="10 - Irresponsivo" value={-5} />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Realize as seguintes perguntas ao paciente:
                            </Text>
                            <Text style={styles.sectionTitle}>
                                1. Uma pedra flutua na água? (ou: uma folha flutua na água?)
                            </Text>
                            <Text style={styles.sectionTitle}>
                                2. No mar tem peixes? (ou: no mar tem elefantes?)
                            </Text>
                            <Text style={styles.sectionTitle}>
                                3. Um 1kg pesa mais que 2kg? (ou: 2kg pesam mais que 1kg?)
                            </Text>
                            <Text style={styles.sectionTitle}>
                                4. Você pode usar um martelo para bater um prego? (ou: você pode usar um martelo para cortar madeira?)
                            </Text>
                            <Text style={styles.sectionTitle}>
                                Comando: Diga ao paciente: "Levante estes dedos" Em seguida: "Agora faça a mesma coisa com a outra mão"
                            </Text>
                            <UnifiedPicker
                                selectedValue={pensamentodesorganizado}
                                onValueChange={(itemValue) => setPensamentodesorganizado(itemValue)}
                                style={styles.picker}
                            >
                                <UnifiedPicker.Item label="1 - Cometeu menos que 2 erros" value={0} />
                                <UnifiedPicker.Item label="2 - Cometeu 2 ou mais erros" value={1} />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.resultContainer}>
                            <Text style={styles.finalScore}>RESULTADO:</Text>
                            <Text style={styles.interpretationText}>{getCamIcuInterpretation()}</Text>
                        </View>
                    </View>
                );

            case 'ashworth':
                const ashworthOptions = [
                    { id: 0, label: "0 - Tônus normal" },
                    { id: 1, label: "1 - Aumento leve no final do arco de movimento" },
                    { id: 2, label: "1+ - Aumento em menos da metade do arco de movimento" },
                    { id: 3, label: "2 - Aumento significativo do tônus muscular" },
                    { id: 4, label: "3 - Movimento difícil por aumento do tônus" },
                    { id: 5, label: "4 - Rigidez total da parte examinada" },
                ];

                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>💪 ESCALA DE ASHWORTH</Text>
                        <Text style={styles.formDescription}>
                            Avaliação de espasticidade muscular
                        </Text>

                        {ashworthOptions.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                style={[
                                    styles.option,
                                    ashworthSelected === option.id ? styles.selectedOption : null,
                                ]}
                                onPress={() => setAshworthSelected(option.id)}
                            >
                                <Text style={styles.optionText}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}

                        {ashworthSelected !== null && (
                            <Text style={styles.result}>
                                Você selecionou: {ashworthOptions[ashworthSelected].label}
                            </Text>
                        )}
                    </View>
                );

            case 'ramsay':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>😴 ESCALA DE RAMSAY</Text>
                        <Text style={styles.formDescription}>
                            Avaliação do nível de sedação
                        </Text>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Nível de Sedação</Text>
                            <UnifiedPicker
                                selectedValue={ramsayScore}
                                onValueChange={(itemValue) => setRamsayScore(Number(itemValue))}
                                style={styles.picker}
                            >
                                <UnifiedPicker.Item label="1 - Ansioso, agitado ou inquieto" value={1} />
                                <UnifiedPicker.Item label="2 - Cooperativo, orientado e tranquilo" value={2} />
                                <UnifiedPicker.Item label="3 - Responde apenas a comandos verbais" value={3} />
                                <UnifiedPicker.Item label="4 - Resposta rápida a estímulo tátil ou auditivo" value={4} />
                                <UnifiedPicker.Item label="5 - Resposta lenta a estímulo doloroso" value={5} />
                                <UnifiedPicker.Item label="6 - Sem resposta a qualquer estímulo" value={6} />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.resultContainer}>
                            <Text style={styles.finalScore}>ESCALA RAMSAY: {ramsayScore}</Text>
                            <Text style={styles.interpretationText}>{getRamsayInterpretation()}</Text>
                        </View>
                    </View>
                );

            case 'avpu':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>👁️ ESCALA AVPU</Text>
                        <Text style={styles.formDescription}>
                            Avaliação rápida do nível de consciência
                        </Text>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Selecione o nível:</Text>
                            <UnifiedPicker
                                selectedValue={avpuLevel}
                                onValueChange={(itemValue) => setAvpuLevel(itemValue)}
                                style={styles.picker}
                            >
                                <UnifiedPicker.Item label="Escolha uma opção" value="" />
                                <UnifiedPicker.Item label="A - Alerta" value="A" />
                                <UnifiedPicker.Item label="V - Verbal" value="V" />
                                <UnifiedPicker.Item label="P - Dor" value="P" />
                                <UnifiedPicker.Item label="U - Não responsivo" value="U" />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.resultContainer}>
                            <Text style={styles.resultLabel}>Resultado:</Text>
                            <Text style={styles.interpretationText}>{getAvpuInterpretation()}</Text>
                        </View>
                    </View>
                );

            case 'mrc':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>💪 ESCALA MRC</Text>
                        <Text style={styles.formDescription}>
                            Avaliação da força muscular
                        </Text>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Flexão de Ombro (Esquerdo)</Text>
                            <UnifiedPicker
                                selectedValue={flexaoOmbroEsq}
                                onValueChange={(itemValue) => setFlexaoOmbroEsq(itemValue)}
                                style={styles.picker}
                            >
                                <UnifiedPicker.Item label="5 - consegue flexionar e vence grande resistencia" value={5} />
                                <UnifiedPicker.Item label="4 - consegue flexionar e vence pouca resistencia" value={4} />
                                <UnifiedPicker.Item label="3 - consegue flexionar sem resistencia" value={3} />
                                <UnifiedPicker.Item label="2 - não consegue flexionar por completo" value={2} />
                                <UnifiedPicker.Item label="1 - Não Testável" value={1} />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Flexão de Ombro (Direito)</Text>
                            <UnifiedPicker
                                selectedValue={flexaoOmbroDir}
                                onValueChange={(itemValue) => setFlexaoOmbroDir(itemValue)}
                                style={styles.picker}
                            >
                                <UnifiedPicker.Item label="5 - consegue flexionar e vence grande resistencia" value={5} />
                                <UnifiedPicker.Item label="4 - consegue flexionar e vence pouca resistencia" value={4} />
                                <UnifiedPicker.Item label="3 - consegue flexionar sem resistencia" value={3} />
                                <UnifiedPicker.Item label="2 - não consegue flexionar por completo" value={2} />
                                <UnifiedPicker.Item label="1 - Não Testável" value={1} />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.resultContainer}>
                            <Text style={styles.finalScore}>SCORE FINAL: {MRCScore}</Text>
                            <Text style={styles.interpretationText}>{getMRCInterpretation()}</Text>
                        </View>
                    </View>
                );

            case 'rankin':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>📊 ESCALA DE RANKIN</Text>
                        <Text style={styles.formDescription}>
                            Avaliação de incapacidade funcional pós-AVC
                        </Text>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Selecione o nível:</Text>
                            <UnifiedPicker
                                selectedValue={rankinLevel}
                                onValueChange={(itemValue) => setRankinLevel(itemValue)}
                                style={styles.picker}
                            >
                                <UnifiedPicker.Item label="Escolha uma opção" value="" />
                                <UnifiedPicker.Item label="0 – Sem sintomas" value="0" />
                                <UnifiedPicker.Item label="1 – Sem incapacidade significativa" value="1" />
                                <UnifiedPicker.Item label="2 – Incapacidade leve" value="2" />
                                <UnifiedPicker.Item label="3 – Incapacidade moderada" value="3" />
                                <UnifiedPicker.Item label="4 – Incapacidade moderadamente grave" value="4" />
                                <UnifiedPicker.Item label="5 – Incapacidade grave" value="5" />
                                <UnifiedPicker.Item label="6 – Óbito" value="6" />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.resultContainer}>
                            <Text style={styles.resultLabel}>Resultado:</Text>
                            <Text style={styles.interpretationText}>{getRankinInterpretation()}</Text>
                        </View>
                    </View>
                );

            case 'cincinnati':
                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>🚨 ESCALA DE CINCINNATI</Text>
                        <Text style={styles.formDescription}>
                            Identificação de sinais de AVC
                        </Text>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>1. Paralisia Facial</Text>
                            <UnifiedPicker selectedValue={face} onValueChange={(v) => setFace(v)} style={styles.picker}>
                                <UnifiedPicker.Item label="Normal" value="normal" />
                                <UnifiedPicker.Item label="Anormal" value="abnormal" />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>2. Fraqueza em um dos Braços</Text>
                            <UnifiedPicker selectedValue={arm} onValueChange={(v) => setArm(v)} style={styles.picker}>
                                <UnifiedPicker.Item label="Normal" value="normal" />
                                <UnifiedPicker.Item label="Anormal" value="anormal" />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>3. Alteração da Fala</Text>
                            <UnifiedPicker selectedValue={speech} onValueChange={(v) => setSpeech(v)} style={styles.picker}>
                                <UnifiedPicker.Item label="Normal" value="normal" />
                                <UnifiedPicker.Item label="Anormal" value="abnormal" />
                            </UnifiedPicker>
                        </View>

                        <View style={styles.resultContainer}>
                            <Text style={styles.resultText}>{getCincinnatiResult()}</Text>
                        </View>
                    </View>
                );

            case 'wexler':
                const wexlerOptions = [
                    { id: 0, label: "0 - Ausente - Sem resposta visível e palpável" },
                    { id: 1, label: "+1 - Hiporreflexia - Pequena contração muscular, sem movimento" },
                    { id: 2, label: "+2 - Normal - Pequena contração e pequeno movimento" },
                    { id: 3, label: "+3 - Hiperreflexia - Contração brusca e movimento articular moderado" },
                    { id: 4, label: "+4 - Hiperreflexia com clônus transitório - Forte contração, com 1 a 3 clônus. Possível irradiação contralateral" },
                    { id: 5, label: "+5 - Hiperreflexia com clônus sustentado - Forte contração e clônus sustentado." },
                ];

                return (
                    <View style={styles.formContent}>
                        <Text style={styles.sectionSubtitle}>🦵 ESCALA DE WEXLER</Text>
                        <Text style={styles.formDescription}>
                            Avaliação de reflexos tendinosos
                        </Text>

                        {wexlerOptions.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                style={[
                                    styles.option,
                                    wexlerSelected === option.id ? styles.selectedOption : null,
                                ]}
                                onPress={() => setWexlerSelected(option.id)}
                            >
                                <Text style={styles.optionText}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}

                        {wexlerSelected !== null && (
                            <Text style={styles.result}>
                                Você selecionou: {wexlerOptions[wexlerSelected].label}
                            </Text>
                        )}
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
    section: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#495057',
        marginBottom: 10,
    },
    picker: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ced4da',
    },
    resultContainer: {
        backgroundColor: '#e3f2fd',
        padding: 15,
        borderRadius: 8,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#2196f3',
    },
    scoreText: {
        fontSize: 14,
        color: '#1976d2',
        marginBottom: 5,
    },
    finalScore: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1976d2',
        textAlign: 'center',
        marginBottom: 10,
    },
    interpretationText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1976d2',
        textAlign: 'center',
    },
    resultLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1976d2',
        marginBottom: 10,
    },
    resultText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1976d2',
        textAlign: 'center',
    },
    option: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ced4da',
    },
    selectedOption: {
        backgroundColor: '#e3f2fd',
        borderColor: '#2196f3',
        borderWidth: 2,
    },
    optionText: {
        fontSize: 14,
        color: '#495057',
    },
    selectedText: {
        color: '#1976d2',
        fontWeight: 'bold',
    },
    result: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1976d2',
        textAlign: 'center',
        marginTop: 15,
        padding: 10,
        backgroundColor: '#e3f2fd',
        borderRadius: 8,
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
