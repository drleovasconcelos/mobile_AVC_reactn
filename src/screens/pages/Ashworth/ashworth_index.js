import React, { useState } from 'react'; // Importa React e o hook useState para gerenciar o estado
import { View, Text, ScrollView, Button, SafeAreaView, TouchableOpacity } from 'react-native'; // Importa componentes básicos do React Native
import styles from './ashwort_style'; // Importa o arquivo de estilos externo para aplicar no layout
import { Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


export default function AshworthScale() {
  // Cria um estado para armazenar o item selecionado pelo usuário
  const [selectedValue, setSelectedValue] = useState(null);

  // Lista de opções da escala de Ashworth, com identificadores e descrições
  const options = [
    { id: 0, label: "0 - Tônus normal" },
    { id: 1, label: "1 - Aumento leve no final do arco de movimento" },
    { id: 2, label: "1+ - Aumento em menos da metade do arco de movimento" },
    { id: 3, label: "2 - Aumento significativo do tônus muscular" },
    { id: 4, label: "3 - Movimento difícil por aumento do tônus" },
    { id: 5, label: "4 - Rigidez total da parte examinada" },
  ];

  
    const generatePDF = async () => {
      try {
        const html = `
          <html>
            <body>
              <h1>Escala de Ashwort</h1>
              <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
              <h2>Resultados</h2>
              <p><strong>Resultado da Escala:</strong> ${options[selectedValue].label}</p>
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
    
      <View style={styles.container}>
        {/* Título da tela */}
        <Text style={styles.title}>Escala de Ashworth Modificada</Text>

        {/* Mapeia a lista de opções para criar botões interativos */}
        {options.map((option) => (
          <TouchableOpacity
            key={option.id} // Define uma chave única para cada item na lista
            style={[
              styles.option, 
              selectedValue === option.id ? styles.selectedOption : null, // Destaca opção selecionada
            ]}
            onPress={() => setSelectedValue(option.id)} // Atualiza o estado ao clicar no botão
          >
            {/* Exibe o texto da opção */}
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Exibe a opção selecionada apenas se selectedValue não for nulo */}
        {selectedValue !== null && (
          <Text style={styles.result}>Você selecionou: {options[selectedValue].label}</Text>
        )}
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
          <Text style={styles.infoText}>
            A Escala de Ashworth Modificada avalia o grau de espasticidade muscular, comum em condições neurológicas como AVC e paralisia cerebral. A classificação varia de 0 a 4, indo de tônus normal até rigidez extrema, dificultando ou impedindo o movimento passivo. Essa escala é fundamental para acompanhar a evolução da espasticidade e ajustar estratégias de reabilitação e tratamento conforme a necessidade do paciente.

          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}