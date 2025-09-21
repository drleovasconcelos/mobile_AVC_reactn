import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import './src/utils/polyfills'; // Importar polyfills primeiro
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import CadastroUsuario from './src/screens/CadastroUsuario';
import ListaPacientes from './src/screens/ListaPacientes';
import AvaliacaoPaciente from './src/screens/AvaliacaoPaciente';
import Anamnese from './src/screens/Anamnese';
import Dashboard from './src/screens/Dashboard';
import ExameFisico from './src/screens/ExameFisico';
import ExamesComplementares from './src/screens/ExamesComplementares';
import EscalasHospitalares from './src/screens/EscalasHospitalares';
import BuscarAvaliacao from './src/screens/BuscarAvaliacao';
import { PacientesProvider } from './src/context/PacientesContext';
import { AnamneseProvider } from './src/context/AnamneseContext';
import { AuthProvider } from './src/context/AuthContext';
import { AvaliacaoConsolidadaProvider } from './src/context/AvaliacaoConsolidadaContext';
import { ExameFisicoProvider } from './src/context/ExameFisicoContext';
import { ExamesComplementaresProvider } from './src/context/ExamesComplementaresContext';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { useWindowDimensions } from './src/hooks/useWindowDimensions';

const Stack = createStackNavigator();

export default function App() {
  const { width, height } = useWindowDimensions();
  
  // Debug: log das dimensões da tela
  React.useEffect(() => {
    console.log('Dimensões da tela:', { width, height });
  }, [width, height]);

  return (
    <AuthProvider>
      <PacientesProvider>
        <AnamneseProvider>
          <ExameFisicoProvider>
            <ExamesComplementaresProvider>
              <AvaliacaoConsolidadaProvider>
            <NavigationContainer
              onStateChange={(state) => {
                if (Platform.OS === 'web') {
                  console.log('Navigation state changed:', state);
                }
              }}
              onReady={() => {
                if (Platform.OS === 'web') {
                  console.log('NavigationContainer ready');
                }
              }}
            >
          <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#007bff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              gestureEnabled: true,
              ...(Platform.OS === 'web' ? {
                cardStyle: { 
                  backgroundColor: '#f8f9fa',
                  width: width,
                  height: height,
                  minHeight: '100vh',
                  minWidth: '100vw',
                },
                animationEnabled: false,
              } : {
                cardStyle: { 
                  backgroundColor: '#f8f9fa',
                },
              }),
            }}
          >
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="ListaPacientes" 
              component={ListaPacientes} 
              options={{ 
                headerShown: false,
                gestureEnabled: true,
                ...(Platform.OS === 'web' && {
                  animationEnabled: false,
                }),
              }}
            />
            <Stack.Screen 
              name="Cadastro" 
              component={Cadastro} 
              options={{ 
                title: 'Cadastro de Paciente',
                headerBackTitle: 'Voltar'
            }}
            />
            <Stack.Screen 
              name="CadastroUsuario" 
              component={CadastroUsuario} 
              options={{ 
                title: 'Cadastro de Usuário',
                headerBackTitle: 'Voltar'
            }}
            />
                                    <Stack.Screen
                          name="AvaliacaoPaciente"
                          component={AvaliacaoPaciente}
                          options={{
                            title: 'Avaliação do Paciente',
                            headerBackTitle: 'Voltar',
                            gestureEnabled: true,
                            headerShown: true,
                            ...(Platform.OS === 'web' && {
                              animationEnabled: false,
                            }),
                          }}
                        />
                        <Stack.Screen
                          name="Anamnese"
                          component={Anamnese}
                          options={{
                            title: 'Anamnese',
                            headerBackTitle: 'Voltar'
                          }}
                        />
                         <Stack.Screen
                           name="Dashboard"
                           component={Dashboard}
                           options={{
                             title: 'Dashboard Clínico',
                             headerBackTitle: 'Voltar'
                           }}
                         />
                         <Stack.Screen
                             name="ExameFisico"
                             component={ExameFisico}
                             options={{
                                 title: 'Exame Físico',
                                 headerBackTitle: 'Voltar'
                             }}
                         />
                         <Stack.Screen
                             name="ExamesComplementares"
                             component={ExamesComplementares}
                             options={{
                                 title: 'Exames Complementares',
                                 headerBackTitle: 'Voltar'
                             }}
                         />
                         <Stack.Screen
                             name="EscalasHospitalares"
                             component={EscalasHospitalares}
                             options={{
                                 title: 'Escalas Hospitalares',
                                 headerBackTitle: 'Voltar'
                             }}
                         />
                         <Stack.Screen
                             name="BuscarAvaliacao"
                             component={BuscarAvaliacao}
                             options={{
                                 title: 'Buscar Avaliação',
                                 headerBackTitle: 'Voltar'
                             }}
                         />
                    </Stack.Navigator>
            </NavigationContainer>
              </AvaliacaoConsolidadaProvider>
            </ExamesComplementaresProvider>
          </ExameFisicoProvider>
        </AnamneseProvider>
      </PacientesProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});