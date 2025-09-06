import React, { useState } from 'react';
import { View, Text,  ScrollView,  SafeAreaView,  Button } from 'react-native';
import styles from './rass_style'
import { Picker } from '@react-native-picker/picker';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

export default function RASSScaleApp() {
  const [rassScore, setRassScore] = useState(0);

  const getInterpretation = () => {
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

  const generatePDF = async () => {
    try {
      const html = `
        <html>
          <body>
            <h1>Escala RASS - Escala de Agitação-Sedação de Richmond</h1>
            <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
            <h2>Resultados</h2>
            <p><strong>Resultado:</strong> ${rassScore}</p>
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
        <Text style={styles.title}>Escala RASS</Text> 
        <Text style={styles.subtitle}>Escala de Agitação-Sedação de Richmond</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nível de Agitação/Sedação</Text>
          <Picker
            selectedValue={rassScore}
            onValueChange={(itemValue) => setRassScore(itemValue)}
            style={styles.picker}>
            <Picker.Item label="+4 - Combativo" value={+4} />
            <Picker.Item label="+3 - Muito agitado" value={+3} />
            <Picker.Item label="+2 - Agitado" value={+2} />
            <Picker.Item label="+1 - Inquieto" value={+1} />
            <Picker.Item label="0 - Alerta e calmo" value={0} />
            <Picker.Item label="-1 - Sonolento" value={-1} />
            <Picker.Item label="-2 - Sedação leve" value={-2} />
            <Picker.Item label="-3 - Sedação moderada" value={-3} />
            <Picker.Item label="-4 - Sedação profunda" value={-4} />
            <Picker.Item label="-5 - Não despertável" value={-5} />
          </Picker>
        </View>

        {/* Resultado */}
        <View style={styles.resultContainer}>
          <Text style={styles.finalScore}>ESCALA RASS: {rassScore}</Text>
          <Text style={styles.interpretationText}>{getInterpretation()}</Text>
        </View>

        {/* Informações adicionais */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Como avaliar:</Text>
          <Text style={styles.infoText}>1. Observar paciente sem interação</Text>
          <Text style={styles.infoText}>2. Se não responde, chamar pelo nome</Text>
          <Text style={styles.infoText}>3. Se não responde, estimular fisicamente</Text>
          <Text style={styles.infoText}>4. Se não responde, estimulo doloroso</Text>
        </View>

        {/* Botão para gerar PDF */}
        <View style={{ marginTop: 20, padding: 10 }}>
          <Button 
            title="Gerar PDF e Compartilhar" 
            onPress={generatePDF} 
            color="#4CAF50"
          />
        </View>

        <View>
          <Text style={styles.infoTitle}>Informações sobre o Teste</Text>
          <Text style={styles.infoText1}>
            A Escala RASS é um método clínico usado para avaliar o estado de sedação e agitação de pacientes em terapia intensiva. {"\n"}
            O sistema classifica o paciente em um intervalo de -5 a +4, onde: {"\n"}
            - Níveis negativos (-1 a -5) indicam graus de sedação, variando de sonolência leve à ausência total de resposta. {"\n"}
            - Zero (0) representa um paciente alerta e calmo. {"\n"}
            - Níveis positivos (+1 a +4) demonstram agitação, indo de inquietação discreta até comportamento combativo. {"\n"}
            Essa escala é fundamental para garantir um equilíbrio na administração de sedativos, evitando tanto a sedação excessiva, que pode prolongar a internação, quanto a insuficiente, que pode expor o paciente a riscos.
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
