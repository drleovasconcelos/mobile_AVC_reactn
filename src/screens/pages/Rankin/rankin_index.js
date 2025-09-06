import React, { useState } from 'react';
import {  View,  Text,  SafeAreaView,  ScrollView, Button } from 'react-native';
import styles from './rankin_style'
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


export default function RankinScaleApp() {
  const [rankinLevel, setRankinLevel] = useState('');

  const getInterpretation = () => {
    switch (rankinLevel) {
      case '0':
        return '0 – Sem sintomas.';
      case '1':
        return '1 – Sem incapacidade significativa; consegue realizar todas as atividades habituais, apesar de sintomas.';
      case '2':
        return '2 – Incapacidade leve; incapaz de realizar todas as atividades anteriores, mas é capaz de cuidar de si mesmo sem assistência.';
      case '3':
        return '3 – Incapacidade moderada; requer alguma ajuda, mas consegue andar sem assistência.';
      case '4':
        return '4 – Incapacidade moderadamente grave; incapaz de andar sem assistência e incapaz de atender às próprias necessidades físicas sem ajuda.';
      case '5':
        return '5 – Incapacidade grave; acamado, incontinente e requer cuidados constantes.';
      case '6':
        return '6 – Óbito.';
      default:
        return 'Selecione um nível da Escala de Rankin.';
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
            <p><strong>Resultado:</strong> ${rankinLevel}</p>
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
      <SafeAreaView>
        <Text style={styles.title}>Escala de Rankin</Text>
        <Text style={styles.subtitle}>Avaliação de incapacidade funcional pós-AVC</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecione o nível:</Text>
          <Picker
            selectedValue={rankinLevel}
            onValueChange={(itemValue) => setRankinLevel(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Escolha uma opção" value="" />
            <Picker.Item label="0 – Sem sintomas" value="0" />
            <Picker.Item label="1 – Sem incapacidade significativa" value="1" />
            <Picker.Item label="2 – Incapacidade leve" value="2" />
            <Picker.Item label="3 – Incapacidade moderada" value="3" />
            <Picker.Item label="4 – Incapacidade moderadamente grave" value="4" />
            <Picker.Item label="5 – Incapacidade grave" value="5" />
            <Picker.Item label="6 – Óbito" value="6" />
          </Picker>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Resultado:</Text>
          <Text style={styles.interpretationText}>{getInterpretation()}</Text>
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
          <Text style={styles.infoTitle}>Sobre a escala:</Text>
          <Text style={styles.infoText}>• A Escala de Rankin é um sistema utilizado para medir o grau de incapacidade funcional de um paciente, sendo amplamente empregada na avaliação de pessoas que sofreram um Acidente Vascular Cerebral (AVC). Seu objetivo é classificar o impacto da condição na autonomia do indivíduo, ajudando na definição de estratégias de reabilitação.
          </Text>
          <Text style={styles.infoText}>• Vai de 0 (sem sintomas) até 6 (óbito).</Text>
          <Text style={styles.infoText}>• Essa ferramenta é essencial para avaliar a evolução do paciente após um AVC e orientar decisões médicas sobre reabilitação e suporte necessário. Além disso, é amplamente utilizada em pesquisas clínicas para medir a eficácia de tratamentos.
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
