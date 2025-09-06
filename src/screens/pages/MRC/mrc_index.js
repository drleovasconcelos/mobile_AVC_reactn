import React, { useState } from 'react';
import {  View,   Text,  ScrollView, SafeAreaView, Button } from 'react-native';
import styles from './mrc_style'
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function MRCScaleApp() {
  // Estados para cada componente

  // Flexao de Ombro
  const [flexaoOmbroEsq, setflexaoOmbroEsq] = useState(1);
  const [flexaoOmbroDir, setflexaoOmbroDir] = useState(1);

  // Flexao de Cotovelo
  const [cotoveloEsq, setcotoveloEsq] = useState(1);
  const [cotoveloDir, setcotoveloDir] = useState(1);

  // Flexao de Punho
  const [punhoEsq, setpunhoEsq] = useState(1);
  const [punhoDir, setpunhoDir] = useState(1);

  // Flexao de Quadril
  const [quadrilEsq, setquadrilEsq] = useState(1);
  const [quadrilDir, setquadrilDir] = useState(1);

  // Extensão de Joelho
  const [joelhoEsq, setjoelhoEsq] = useState(1);
  const [joelholDir, setjoelhoDir] = useState(1);

  // Flexao de Tornozelo
  const [tornozeloEsq, settornozeloEsq] = useState(1);
  const [tornozeloDir, settornozeloDir] = useState(1);

  // Cálculo do score
  const MRCScore =
    Number(flexaoOmbroEsq) +
    Number(flexaoOmbroDir) +
    Number(cotoveloEsq) +
    Number(cotoveloDir) +
    Number(punhoEsq) +
    Number(punhoDir) +
    Number(quadrilEsq) +
    Number(quadrilDir) +
    Number(joelhoEsq) +
    Number(joelholDir) +
    Number(tornozeloEsq) +
    Number(tornozeloDir);

  //const totalScore = baseScore + Number(pupilResponse);

  // Interpretação
  const getInterpretation = () => {
    if (MRCScore <= 48) return '🔴 Paciente APRESENTA fraqueza muscular';
    if (MRCScore <= 60) return '🟢 Paciente NÃO APRESENTA fraqueza muscular';
    return '❓ Fora da escala';
  };

  
    const generatePDF = async () => {
      try {
        const html = `
          <html>
            <body>
              <h1>Escala de MCR</h1>
              <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
              <h2>Resultados</h2>
              <p><strong>Flexao de Ombro Direito:</strong> ${flexaoOmbroDir}</p>
              <p><strong>Flexao de Ombro Esquerdo:</strong> ${flexaoOmbroEsq}</p>
              <p><strong>Flexao de Cotovelo Direito:</strong> ${cotoveloDir}</p>
              <p><strong>Flexao de Cotovelo Esquerdo:</strong> ${cotoveloEsq}</p>
              <p><strong>Flexao de Punho Direito:</strong> ${punhoDir}</p>
              <p><strong>Flexao de Punho Esquerdo:</strong> ${punhoEsq}</p>
              <p><strong>Flexao de Quadril Direito:</strong> ${quadrilDir}</p>
              <p><strong>Flexao de Quadril Esquerdo:</strong> ${quadrilEsq}</p>
              <p><strong>Extensão de Joelho Direito:</strong> ${joelholDir}</p>
              <p><strong>Extensão de Joelho Esquerdo:</strong> ${joelhoEsq}</p>
              <p><strong>Flexao de Tornozelo Direito:</strong> ${tornozeloDir}</p>
              <p><strong>Flexao de Tornozelo Esquerdo:</strong> ${tornozeloEsq}</p>
              <p><strong>Score Total:</strong> ${MRCScore}</p>
              <p><strong>Interpretação:</strong> ${getInterpretation()}</p>
            </body>
          </html>
        `;
    
        const { uri } = await Print.printToFileAsync({ html }); // função do módulo expo-print, que renderiza HTML e gera um arquivo .pdf. - uri: é o caminho do pdf.
    
        console.log('PDF URI:', uri);
    
        if (await Sharing.isAvailableAsync()) { // verifica se o sistema operacional oferece suporte
          await Sharing.shareAsync(uri, { // Sharing.isAvailableAsync() retorna uma Promise que resulta em true ou false.
            mimeType: 'application/pdf', // define o tipo de arquivo
            dialogTitle: 'Compartilhar PDF', // TÍTULO DA janela
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Escala de MRC</Text>

        {/* Flexão de Ombro */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flexão de Ombro (Direito)</Text>
          <Picker
            selectedValue={flexaoOmbroEsq}
            onValueChange={(itemValue) => setflexaoOmbroEsq(itemValue)}
            style={styles.picker}>
            <Picker.Item
              label="5 - consegue flexionar e vence grande resistencia"
              value={5}
            />
            <Picker.Item
              label="4 - consegue flexionar e vence pouca resistencia"
              value={4}
            />
            <Picker.Item
              label="3 - consegue flexionar sem resistencia"
              value={3}
            />
            <Picker.Item
              label="2 - não consegue flexionar por completo"
              value={2}
            />
            <Picker.Item label="1 - Não Testável" value={1} />
          </Picker>

          <Text style={styles.sectionTitle}>Flexão de Ombro (Esquerdo)</Text>
          <Picker
            selectedValue={flexaoOmbroDir}
            onValueChange={(itemValue) => setflexaoOmbroDir(itemValue)}
            style={styles.picker}>
            <Picker.Item
              label="5 - consegue flexionar e vence grande resistencia"
              value={5}
            />
            <Picker.Item
              label="4 - consegue flexionar e vence pouca resistencia"
              value={4}
            />
            <Picker.Item
              label="3 - consegue flexionar sem resistencia"
              value={3}
            />
            <Picker.Item
              label="2 - não consegue flexionar por completo"
              value={2}
            />
            <Picker.Item label="1 - Não Testável" value={1} />
          </Picker>
        </View>

        {/* Flexão de Cotovelo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flexão de Cotovelo (Esquerdo)</Text>
          <Picker
            selectedValue={cotoveloEsq}
            onValueChange={(itemValue) => setcotoveloEsq(itemValue)}
            style={styles.picker}>
            <Picker.Item
              label="5 - consegue flexionar e vence grande resistencia"
              value={5}
            />
            <Picker.Item
              label="4 - consegue flexionar e vence pouca resistencia"
              value={4}
            />
            <Picker.Item
              label="3 - consegue flexionar sem resistencia"
              value={3}
            />
            <Picker.Item
              label="2 - não consegue flexionar por completo"
              value={2}
            />
            <Picker.Item label="1 - Não Testável" value={1} />
          </Picker>

          <Text style={styles.sectionTitle}>Flexão de Cotovelo (Direito)</Text>
          <Picker
            selectedValue={cotoveloDir}
            onValueChange={(itemValue) => setcotoveloDir(itemValue)}
            style={styles.picker}>
            <Picker.Item
              label="5 - consegue flexionar e vence grande resistencia"
              value={5}
            />
            <Picker.Item
              label="4 - consegue flexionar e vence pouca resistencia"
              value={4}
            />
            <Picker.Item
              label="3 - consegue flexionar sem resistencia"
              value={3}
            />
            <Picker.Item
              label="2 - não consegue flexionar por completo"
              value={2}
            />
            <Picker.Item label="1 - Não Testável" value={1} />
          </Picker>
        </View>

        {/* Flexão de punho */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flexão de Punho (Esquerdo)</Text>
          <Picker
            selectedValue={punhoEsq}
            onValueChange={(itemValue) => setpunhoEsq(itemValue)}
            style={styles.picker}>
            <Picker.Item
              label="5 - consegue flexionar e vence grande resistencia"
              value={5}
            />
            <Picker.Item
              label="4 - consegue flexionar e vence pouca resistencia"
              value={4}
            />
            <Picker.Item
              label="3 - consegue flexionar sem resistencia"
              value={3}
            />
            <Picker.Item
              label="2 - não consegue flexionar por completo"
              value={2}
            />
            <Picker.Item label="1 - Não Testável" value={1} />
          </Picker>

          <Text style={styles.sectionTitle}>Flexão de Punho (Direito)</Text>
          <Picker
            selectedValue={punhoDir}
            onValueChange={(itemValue) => setpunhoDir(itemValue)}
            style={styles.picker}>
            <Picker.Item
              label="5 - consegue flexionar e vence grande resistencia"
              value={5}
            />
            <Picker.Item
              label="4 - consegue flexionar e vence pouca resistencia"
              value={4}
            />
            <Picker.Item
              label="3 - consegue flexionar sem resistencia"
              value={3}
            />
            <Picker.Item
              label="2 - não consegue flexionar por completo"
              value={2}
            />
            <Picker.Item label="1 - Não Testável" value={1} />
          </Picker>
        </View>

        {/* Flexão de Quadril */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flexão de Quadril (Esquerdo)</Text>
          <Picker
            selectedValue={quadrilEsq}
            onValueChange={(itemValue) => setquadrilEsq(itemValue)}
            style={styles.picker}>
            <Picker.Item
              label="5 - consegue flexionar e vence grande resistencia"
              value={5}
            />
            <Picker.Item
              label="4 - consegue flexionar e vence pouca resistencia"
              value={4}
            />
            <Picker.Item
              label="3 - consegue flexionar sem resistencia"
              value={3}
            />
            <Picker.Item
              label="2 - não consegue flexionar por completo"
              value={2}
            />
            <Picker.Item label="1 - Não Testável" value={1} />
          </Picker>

          <Text style={styles.sectionTitle}>Flexão de Quadril (Direito)</Text>
          <Picker
            selectedValue={quadrilDir}
            onValueChange={(itemValue) => setquadrilDir(itemValue)}
            style={styles.picker}>
            <Picker.Item
              label="5 - consegue flexionar e vence grande resistencia"
              value={5}
            />
            <Picker.Item
              label="4 - consegue flexionar e vence pouca resistencia"
              value={4}
            />
            <Picker.Item
              label="3 - consegue flexionar sem resistencia"
              value={3}
            />
            <Picker.Item
              label="2 - não consegue flexionar por completo"
              value={2}
            />
            <Picker.Item label="1 - Não Testável" value={1} />
          </Picker>
        </View>

        {/* Extensão de Joelho */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extensão de Joelho (Esquerdo)</Text>
          <Picker
            selectedValue={joelhoEsq}
            onValueChange={(itemValue) => setjoelhoEsq(itemValue)}
            style={styles.picker}>
            <Picker.Item
              label="5 - consegue flexionar e vence grande resistencia"
              value={5}
            />
            <Picker.Item
              label="4 - consegue flexionar e vence pouca resistencia"
              value={4}
            />
            <Picker.Item
              label="3 - consegue flexionar sem resistencia"
              value={3}
            />
            <Picker.Item
              label="2 - não consegue flexionar por completo"
              value={2}
            />
            <Picker.Item label="1 - Não Testável" value={1} />
          </Picker>

          <Text style={styles.sectionTitle}>Extensão de Joelho (Direito)</Text>
          <Picker
            selectedValue={joelholDir}
            onValueChange={(itemValue) => setjoelhoDir(itemValue)}
            style={styles.picker}>
            <Picker.Item
              label="5 - consegue flexionar e vence grande resistencia"
              value={5}
            />
            <Picker.Item
              label="4 - consegue flexionar e vence pouca resistencia"
              value={4}
            />
            <Picker.Item
              label="3 - consegue flexionar sem resistencia"
              value={3}
            />
            <Picker.Item
              label="2 - não consegue flexionar por completo"
              value={2}
            />
            <Picker.Item label="1 - Não Testável" value={1} />
          </Picker>
        </View>

        {/* Flexão de Tornozelo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flexão de Tornozelo (Esquerdo)</Text>
          <Picker
            selectedValue={tornozeloEsq}
            onValueChange={(itemValue) => settornozeloEsq(itemValue)}
            style={styles.picker}>
            <Picker.Item
              label="5 - consegue flexionar e vence grande resistencia"
              value={5}
            />
            <Picker.Item
              label="4 - consegue flexionar e vence pouca resistencia"
              value={4}
            />
            <Picker.Item
              label="3 - consegue flexionar sem resistencia"
              value={3}
            />
            <Picker.Item
              label="2 - não consegue flexionar por completo"
              value={2}
            />
            <Picker.Item label="1 - Não Testável" value={1} />
          </Picker>

          <Text style={styles.sectionTitle}>Flexão de Tornozelo (Direito)</Text>
          <Picker
            selectedValue={tornozeloDir}
            onValueChange={(itemValue) => settornozeloDir(itemValue)}
            style={styles.picker}>
            <Picker.Item
              label="5 - consegue flexionar e vence grande resistencia"
              value={5}
            />
            <Picker.Item
              label="4 - consegue flexionar e vence pouca resistencia"
              value={4}
            />
            <Picker.Item
              label="3 - consegue flexionar sem resistencia"
              value={3}
            />
            <Picker.Item
              label="2 - não consegue flexionar por completo"
              value={2}
            />
            <Picker.Item label="1 - Não Testável" value={1} />
          </Picker>
        </View>

        {/* Resultado */}
        <View style={styles.resultContainer}>
          <Text style={styles.finalScore}>SCORE FINAL: {MRCScore}</Text>
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

        <View>
        <Text style={styles.infoTitle}>Informações sobre o Teste</Text>
        <Text style={styles.infoText}>
        A Escala MRC (Medical Research Council) é uma ferramenta utilizada para avaliar a força muscular de um paciente, sendo amplamente aplicada na fisioterapia e neurologia. Seu principal objetivo é medir a gravidade da fraqueza muscular, auxiliando no diagnóstico e acompanhamento de condições neuromusculares.{"\n"}
        Como funciona a Escala MRC?{"\n"}
        A pontuação varia de 0 a 5, representando diferentes níveis de força:{"\n"}
        - 0 – Ausência de contração muscular.{"\n"}
        - 1 – Contração perceptível, mas sem movimentação do membro.{"\n"}
        - 2 – Movimento presente, porém sem capacidade de vencer a gravidade.{"\n"}
        - 3 – Movimentação contra a gravidade, sem resistência adicional.{"\n"}
        - 4 – Força suficiente para resistir à pressão moderada.{"\n"}
        - 5 – Força muscular normal, capaz de suportar resistência máxima.{"\n"}
        Se o paciente apresentar valores abaixo de 48, caracteriza que o mesmo apresenta fraqueza muscular, e se for acima está com a força preservada.
        Essa escala é essencial para monitorar alterações na força muscular, permitindo ajustes na reabilitação e nos tratamentos de pacientes com comprometimentos neuromusculares.
        </Text>
      </View>

      </ScrollView>
    </SafeAreaView>
  );
}

