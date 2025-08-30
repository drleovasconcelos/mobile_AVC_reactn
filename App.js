import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import ListaPacientes from './src/screens/ListaPacientes';
import { PacientesProvider } from './src/context/PacientesContext';
import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PacientesProvider>
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
        </Stack.Navigator>
      </NavigationContainer>
    </PacientesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

