import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
import BuscarAvaliacao from './src/screens/BuscarAvaliacao';
import { PacientesProvider } from './src/context/PacientesContext';
import { AnamneseProvider } from './src/context/AnamneseContext';
import { AuthProvider } from './src/context/AuthContext';
import { AvaliacaoConsolidadaProvider } from './src/context/AvaliacaoConsolidadaContext';
import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <PacientesProvider>
        <AnamneseProvider>
          <AvaliacaoConsolidadaProvider>
            <NavigationContainer>
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
                gestureEnabled: false
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
                            headerBackTitle: 'Voltar'
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