import styles from "./CAMICU_style"
import React, { useState } from 'react';
import {   View,  Text,  ScrollView,  SafeAreaView, Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function CAMICUScaleApp() {
  // Flexao de Tornozelo
  const [inicioAgudo, setinicioAgudo] = useState(0);
  const [inatencao, setinatencao] = useState(0);
  const [rassscore, setrassscore] = useState(0);
  const [pensamentodesorganizado, setpensamentodesorganizado] = useState(1);

  // Cálculo do score
  //const MRCScore = Number(flexaoOmbroEsq) + Number(flexaoOmbroDir);

  //const totalScore = baseScore + Number(pupilResponse); && rassscore == 0 && pensamentodesorganizado < 2

  // Interpretação

  const getInterpretation = () => {
    if (inicioAgudo == 0) {
      if (inatencao == 0) {
        if (rassscore == 0) {
          if (pensamentodesorganizado < 2)
            return '🟢 Paciente NÃO APRESENTA Delirium';
        }
      }
    }

    if (
      inicioAgudo > 0 ||
      inatencao > 0 ||
      rassscore != 0 ||
      pensamentodesorganizado > 1
    )
      return '🔴 Paciente APRESENTA Delirium';

    return '❓ Fora da escala';
  };

  
    
  const generatePDF = async () => {
    try {
      const html = `
        <html>
          <body>
            <h1>Escala de CAM-ICU</h1>
            <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
            <h2>Resultados</h2>
            <p><strong>O paciente teve flutuação do estado mental nas últimas 24 horas?:</strong> ${inicioAgudo}</p>
            <p><strong>Quantidade de erros apresentados pelos pacientes após Leitura de Letras Específicas:</strong> ${inatencao}</p>
            <p><strong>Qual o Estado Atual Na escala de RASS (Richmond Agitation-Sedation Scale) do paciente:</strong> ${rassscore}</p>
            <p><strong>Quantidade de erros após perguntas realizadas ao paciente:</strong> ${pensamentodesorganizado}</p>
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Escala de CAM-ICU</Text>

        {/* Inicio Agudo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            O paciente teve flutuação do estado mental nas últimas 24 horas?
          </Text>
          <Picker
            selectedValue={inicioAgudo}
            onValueChange={(itemValue) => setinicioAgudo(itemValue)}
            style={styles.picker}>
            <Picker.Item label="1 - Não" value={0} />
            <Picker.Item label="2 - Sim" value={1} />
          </Picker>
        </View>

        {/* Inatenção */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Leia em voz alta as seguintes letras:
          </Text>
          <Text style={styles.sectionTitle}>
            "S, A, V, E, A, H, A, A, R, T".
          </Text>
          <Text style={styles.sectionTitle}>
            O paciente deve apertar sua mão apenas ao ouvir a letra 'A'.
          </Text>
          <Text style={styles.sectionTitle}>
            erros o paciente cometeu durante o teste?
          </Text>
          <Picker
            selectedValue={inatencao}
            onValueChange={(itemValue) => setinatencao(itemValue)}
            style={styles.picker}>
            <Picker.Item label="1 - Cometeu menos que 3 erros" value={0} />
            <Picker.Item label="2 - Cometeu 3 ou mais erros" value={1} />
          </Picker>
        </View>

        {/* Nivel de Consciência Alterado */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Qual o Estado Atual Na escala de RASS (Richmond Agitation-Sedation Scale) do paciente.
          </Text>
          <Picker
            selectedValue={rassscore}
            onValueChange={(itemValue) => setrassscore(itemValue)}
            style={styles.picker}>
            <Picker.Item label="1 - Agressivo" value={4} />
            <Picker.Item label="2 - Muito Agitado" value={3} />
            <Picker.Item label="3 - Agitado" value={2} />
            <Picker.Item label="4 - Inquieto" value={1} />
            <Picker.Item label="5 - Tranquilo" value={0} />
            <Picker.Item label="6 - Sonolento" value={-1} />
            <Picker.Item label="7 - Acorda ao Estímulo leve" value={-2} />
            <Picker.Item label="8 - Sem Contato Visual" value={-3} />
            <Picker.Item label="9 - Acorda por Dor" value={-4} />
            <Picker.Item label="10 - Irresponsivo" value={-5} />
          </Picker>
        </View>

        {/* Pensamento Desogarnizado */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Realize as seguintes perguntas ao paciente
          </Text>
          <Text style={styles.sectionTitle}>
            1.Uma pedra flutua na água? (ou: uma folha flutua na água?)
          </Text>
          <Text style={styles.sectionTitle}>
            2.No mar tem peixes? (ou: no mar tem elefantes?)
          </Text>
          <Text style={styles.sectionTitle}>
            3.Um 1kg pesa mais que 2kg? (ou: 2kg pesam mais que 1kg?)
          </Text>
          <Text style={styles.sectionTitle}>
            4.Você pode usar um martelo para bater um prego? (ou: você pode usar
            um martelo para cortar madeira?)
          </Text>
          <Text style={styles.sectionTitle}></Text>
          <Text style={styles.sectionTitle}>
            Comando: Diga ao paciente: “Levante estes dedos” Em seguida: “Agora
            faça a mesma coisa com a outra mão” (o examinador não deve repetir o
            número de dedos).
          </Text>

          <Picker
            selectedValue={pensamentodesorganizado}
            onValueChange={(itemValue) => setpensamentodesorganizado(itemValue)}
            style={styles.picker}>
            <Picker.Item label="1 - Cometeu menos que 2 erros" value={0} />
            <Picker.Item label="2 - Cometeu 2 ou mais erros" value={1} />
          </Picker>
        </View>

        {/* Resultado */}
        <View style={styles.resultContainer}>
          <Text style={styles.finalScore}>RESULTADO :</Text>
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
          <Text style={styles.infoTitle}>Informações sobre o Teste</Text>
          <Text style={styles.infoText}>
            A Escala CAM-ICU é um método utilizado para identificar delirium em pacientes internados em Unidades de Terapia Intensiva (UTI). Ela permite uma avaliação rápida e objetiva do estado mental, sendo especialmente útil para pacientes sob ventilação mecânica.{"\n"}
            Como funciona?{"\n"}
            A escala é baseada em quatro critérios: {"\n"}
            1. Alteração aguda do estado mental – Mudança súbita na cognição do paciente.{"\n"}
            2. Déficit de atenção – Dificuldade em manter o foco em estímulos simples.{"\n"}
            3. Nível de consciência – Avaliação pela Escala RASS (Richmond Agitation-Sedation Scale).{"\n"}
            4. Pensamento desorganizado – Respostas incoerentes ou dificuldade em seguir comandos.{"\n"}
            Importância:{"\n"}
            A CAM-ICU é essencial para o diagnóstico precoce do delirium, permitindo intervenções rápidas e reduzindo complicações associadas à condição. Seu uso melhora o prognóstico e a qualidade do cuidado em pacientes críticos.
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

