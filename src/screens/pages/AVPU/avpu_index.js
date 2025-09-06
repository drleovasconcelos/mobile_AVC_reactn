import styles from './avpu_style'
import React, { useState } from 'react';
import {  View, Text, SafeAreaView, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


export default function AVPUScaleApp() {
  const [avpuLevel, setAvpuLevel] = useState('');

  const getInterpretation = () => {
    switch (avpuLevel) {
      case 'A':
        return ' Alerta: paciente desperto, responde espontaneamente.';
      case 'V':
        return ' Responde ao estímulo verbal: reage quando chamado.';
      case 'P':
        return ' Responde ao estímulo doloroso: sem resposta verbal, mas reage à dor.';
      case 'U':
        return ' Não responde: inconsciente, sem resposta a qualquer estímulo.';
      default:
        return 'Selecione um nível da escala AVPU.';
    }
  };

  
    const generatePDF = async () => {
      try {
        const html = `
          <html>
            <body>
              <h1>escala AVPU (Alerta, Verbal, Dor, Sem Resposta)</h1>
              <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
              <h2>Resultados</h2>
              <p><strong>Resultado:</strong> ${avpuLevel}</p>
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
        <Text style={styles.title}>Escala AVPU</Text>
        <Text style={styles.subtitle}>Avaliação rápida do nível de consciência</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecione o nível:</Text>
          <Picker
            selectedValue={avpuLevel}
            onValueChange={(itemValue) => setAvpuLevel(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Escolha uma opção" value="" />
            <Picker.Item label="A - Alerta" value="A" />
            <Picker.Item label="V - Verbal" value="V" />
            <Picker.Item label="P - Dor" value="P" />
            <Picker.Item label="U - Não responsivo" value="U" />
          </Picker>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Resultado:</Text>
          <Text style={styles.interpretationText}>{getInterpretation()}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Como aplicar:</Text>
          <Text style={styles.infoText}>1. Verifique se o paciente está alerta sem estímulo.</Text>
          <Text style={styles.infoText}>2. Chame pelo nome e observe a resposta.</Text>
          <Text style={styles.infoText}>3. Se não responder, aplique estímulo doloroso (como pressão no trapézio).</Text>
          <Text style={styles.infoText}>4. Se não houver resposta, classifique como "U".</Text>
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
          <Text style={styles.infoTitle}>Informações sobre o Teste</Text>
          <Text style={styles.infoText1}>
             Escala AVPU avalia rapidamente o nível de consciência de um paciente, classificando-o em quatro categorias: Alerta (responde normalmente), Resposta verbal (reage apenas a estímulos sonoros), Resposta à dor (responde apenas a estímulos dolorosos) e Inconsciente (sem reação a qualquer estímulo). Essa escala é essencial para identificar alterações neurológicas e orientar decisões médicas em emergências.
          </Text>
        </View>
        
      </SafeAreaView>
    </ScrollView>
  );
}