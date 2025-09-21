import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const Footer = ({ navigation, currentScreen }) => {
    const { logout, currentUser } = useAuth();

    const handleInicio = () => {
        if (currentScreen !== 'ListaPacientes') {
            navigation.navigate('ListaPacientes');
        }
    };

    const handleVoltar = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            // Se não pode voltar, navegar para ListaPacientes
            navigation.navigate('ListaPacientes');
        }
    };

    const handleConfiguracao = () => {
        Alert.alert(
            'Configurações',
            `Profissional: ${currentUser?.nome || 'Usuário'}\n\nFuncionalidade em desenvolvimento.`,
            [
                { text: 'OK', style: 'default' }
            ]
        );
    };

    const handleSair = () => {
        Alert.alert(
            'Sair',
            'Deseja realmente sair do sistema?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Sair',
                    onPress: () => {
                        logout();
                        navigation.navigate('Login');
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.footer}>
            <TouchableOpacity 
                style={[styles.footerButton, currentScreen === 'ListaPacientes' && styles.activeButton]} 
                onPress={handleInicio}
            >
                <Text style={styles.footerIcon}>🏠</Text>
                <Text style={[styles.footerText, currentScreen === 'ListaPacientes' && styles.activeText]}>
                    Início
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.footerButton} 
                onPress={handleVoltar}
            >
                <Text style={styles.footerIcon}>⬅️</Text>
                <Text style={styles.footerText}>Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.footerButton} 
                onPress={handleConfiguracao}
            >
                <Text style={styles.footerIcon}>⚙️</Text>
                <Text style={styles.footerText}>Config</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.footerButton} 
                onPress={handleSair}
            >
                <Text style={styles.footerIcon}>🚪</Text>
                <Text style={styles.footerText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingVertical: 25,
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    footerButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 8,
        marginHorizontal: 2,
    },
    activeButton: {
        backgroundColor: '#e3f2fd',
    },
    footerIcon: {
        fontSize: 20,
        marginBottom: 4,
    },
    footerText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
        textAlign: 'center',
    },
    activeText: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});

export default Footer;
