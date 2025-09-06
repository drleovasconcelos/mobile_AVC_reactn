import React, { useState } from 'react';
import { View, Text, ScrollView,  SafeAreaView, Button} from 'react-native';
import styles from './ramsay_style'
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


export default function RamsayScaleApp() {
  const [ramsayScore, setRamsayScore] = useState(1);

  const getInterpretation = () => {
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
  
      const generatePDF = async () => {
        try {
          const html = `
            <html>
              <body>
                <h1>Escala de Ramsay: Avaliação do Nível de Sedação</h1>
                <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
                <h2>Resultados</h2>
                <p><strong>Resultado:</strong> ${ramsayScore}</p>
                <p><strong>Interpretação:</strong> ${getInterpretation()}</p>
              </body>
            </html>
          `;
      
          const { uri } = await Print.printToFileAsync({ html });
      
          console.log('PDF URI:', uri);
      
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
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Escala de Ramsay</Text>
        <Text style={styles.subtitle}>Avaliação do Nível de Sedação</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nível de Sedação</Text>
          <Picker
            selectedValue={ramsayScore}
            onValueChange={(itemValue) => setRamsayScore(Number(itemValue))}
            style={styles.picker}>
            <Picker.Item label="1 - Ansioso, agitado ou inquieto" value={1} />
            <Picker.Item label="2 - Cooperativo, orientado e tranquilo" value={2} />
            <Picker.Item label="3 - Responde apenas a comandos verbais" value={3} />
            <Picker.Item label="4 - Resposta rápida a estímulo tátil ou auditivo" value={4} />
            <Picker.Item label="5 - Resposta lenta a estímulo doloroso" value={5} />
            <Picker.Item label="6 - Sem resposta a qualquer estímulo" value={6} />
          </Picker>
        </View>

        {/* Resultado */}
        <View style={styles.resultContainer}>
          <Text style={styles.finalScore}>ESCALA RAMSAY: {ramsayScore}</Text>
          <Text style={styles.interpretationText}>{getInterpretation()}</Text>
        </View>

        {/* Informações adicionais */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Como avaliar:</Text>
          <Text style={styles.infoText}>1. Observar o paciente sem interagir.</Text>
          <Text style={styles.infoText}>2. Falar com o paciente com comandos simples.</Text>
          <Text style={styles.infoText}>3. Se não responder, aplicar estímulo tátil ou sonoro.</Text>
          <Text style={styles.infoText}>4. Se ainda sem resposta, aplicar estímulo doloroso leve.</Text>
        </View>

        {/* Botão para gerar PDF */}
        <View style={{ marginTop: 20, padding: 10 }}>
          <Button 
            title="Gerar PDF e Compartilhar" 
            onPress={generatePDF} 
            color="#4CAF50"
          />
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Informações do Teste:</Text>
          <Text style={styles.infoText1}>A escala de Ramsay é um método clínico utilizado para medir o grau de sedação em pacientes, sendo especialmente aplicado em     unidades de terapia intensiva (UTI). A avaliação segue uma classificação de 1 a 6, onde 1 indica um estado de alerta completo e 6 corresponde à ausência de resposta. Por ser baseada na análise do comportamento e na reação do paciente a estímulos, trata-se de um instrumento subjetivo, mas amplamente utilizado na prática médica..</Text>
        </View>

      </SafeAreaView>
    </ScrollView>
  );
}