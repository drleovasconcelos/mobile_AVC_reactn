import React, { useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import styles from './glasgow_style'; // ✅ Importando os estilos
import { Picker } from '@react-native-picker/picker';
import { Alert, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

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
    } else {
        return (
            <UnifiedPicker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                style={style}
            >
                {children}
            </UnifiedPicker>
        );
    }
};


export default function GlasgowComaScaleApp( navigation ) {
  // Estados para cada componente
  const [eyeResponse, setEyeResponse] = useState(4);
  const [verbalResponse, setVerbalResponse] = useState(5);
  const [motorResponse, setMotorResponse] = useState(6);
  const [pupilResponse, setPupilResponse] = useState(0);

  // Cálculo do score
  
const baseScore = Number(eyeResponse) + Number(verbalResponse) + Number(motorResponse);
const totalScore = baseScore + Number(pupilResponse);

  // Interpretação
  const getInterpretation = () => {
    if (totalScore <= 8) return '🔴 Comprometimento CEREBRAL GRAVE';
    if (totalScore <= 12) return '🟠 Comprometimento CEREBRAL MODERADO';
    if (totalScore <= 15) return '🟢 Comprometimento CEREBRAL LEVE';
    return '❓ Fora da escala';
  };
       
  const generatePDF = async () => {
    try {
      const html = `
        <html>
          <body>
            <h1>Escala de Coma de Glasgow</h1>
            <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
            <h2>Resultados</h2>
            <p><strong>Abertura Ocular (E):</strong> ${eyeResponse}</p>
            <p><strong>Resposta Verbal (V):</strong> ${verbalResponse}</p>
            <p><strong>Resposta Motora (M):</strong> ${motorResponse}</p>
            <p><strong>Resposta Pupilar (P):</strong> ${pupilResponse}</p>
            <p><strong>Score Total:</strong> ${totalScore}</p>
            <p><strong>Interpretação:</strong> ${getInterpretation()}</p>
          </body>
        </html>
      `;
  
      const { uri } = await Print.printToFileAsync({ html });
  
      console.log('PDF URI:', uri); // 👉 Teste: veja no terminal se o arquivo é gerado
  
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Compartilhar PDF',
        });
      } else {
        Alert.alert('Compartilhamento não disponível neste dispositivo');
      }
  
    } catch (error) {
      Alert.alert('Erro', 'Falha ao gerar ou compartilhar o PDF.');
      console.error('Erro ao gerar PDF:', error);
    }
  };  
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Escala de Coma de Glasgow (Revisada 2018)</Text>
      <Text style={styles.subtitle}>"Escala que mede nível de consciência, avaliando a consciência em traumas e mede a gravidade de coma" </Text>

      {/* Seção de Resposta Ocular */}
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

      {/* Seção de Resposta Verbal */}
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

      {/* Seção de Resposta Motora */}
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

      {/* Seção de Resposta Pupilar (SUBTRAI pontos) */}
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

      {/* Resultado */}
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
          {getInterpretation()}
        </Text>
      </View>

      {/* Botão para gerar PDF */}
      <View style={{ marginTop: 20, padding: 10 }}>
        <Button 
          title="Gerar PDF e Compartilhar" 
          onPress={generatePDF} 
          color="#4CAF50"
        />
      </View>

      {/* Legenda */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>📌 Classificação:</Text>
        <Text style={styles.infoText}>
          • 3-8: Comprometimento CEREBRAL GRAVE{'\n'}
          • 9-12: Comprometimento CEREBRAL MODERADO{'\n'}
          • 13-15: Comprometimento CEREBRAL LEVE
        </Text>
      </View>
      
      {/* Instruções do Teste */}
      <View style={[styles.infoBox, { marginBottom: 30 }]}>
        <Text style={styles.infoTitle}>📖 Instruções para Aplicação do Teste:</Text>
        <Text style={styles.infoText}>
          • A **Escala de Coma de Glasgow (ECG)** avalia o nível de consciência de um paciente com base em três respostas: ocular, verbal e motora.{'\n\n'}
          • A pontuação total varia de **3 a 15**, sendo que pontuações mais baixas indicam maior comprometimento neurológico.{'\n\n'}
          • A **resposta pupilar** revisada (2018) é usada para subtrair pontos da pontuação total, aumentando a precisão na avaliação de pacientes com lesões cerebrais.{'\n\n'}
          • Para aplicar o teste:{'\n'}
          → Avalie e selecione a melhor resposta do paciente para cada categoria (E, V, M).{'\n'}
          → Observe a reatividade pupilar (P).{'\n'}
          → O sistema calculará o score automaticamente.{'\n\n'}
          • **Importante:** Use este teste como ferramenta complementar, sempre com julgamento clínico e em conjunto com outros dados do paciente.
        </Text>
      </View>
    </ScrollView>
  );
}
