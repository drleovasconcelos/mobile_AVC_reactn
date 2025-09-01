import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';

const Login = ({ navigation }) => {
    const { login, usuarios } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showCredentials, setShowCredentials] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateFields = () => {
        const newErrors = {};
        
        if (!username.trim()) {
            newErrors.username = 'Usuário é obrigatório';
        }
        if (!password.trim()) {
            newErrors.password = 'Senha é obrigatória';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateFields()) return;
        
        const result = login(username, password);
        
        if (result.success) {
            Alert.alert(
                'Sucesso', 
                `Bem-vindo, ${result.user.nome}!`,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('ListaPacientes')
                    }
                ]
            );
        } else {
            setErrors({ general: result.message });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Sistema AVC</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>
            
            {errors.general && <Text style={styles.error}>{errors.general}</Text>}
            
            <TextInput
                style={[styles.input, errors.username && styles.inputError]}
                placeholder="Nome de usuário"
                value={username}
                onChangeText={(text) => {
                    setUsername(text);
                    if (errors.username) setErrors({...errors, username: null});
                }}
                autoCapitalize="none"
            />
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
            
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.passwordInput, errors.password && styles.inputError]}
                    placeholder="Senha"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        if (errors.password) setErrors({...errors, password: null});
                    }}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Text style={styles.eyeIcon}>
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate('CadastroUsuario')}
            >
                <Text style={styles.linkText}>Criar nova conta</Text>
            </TouchableOpacity>

            {/* Seção de credenciais para demonstração */}
            <TouchableOpacity
                style={styles.credentialsButton}
                onPress={() => setShowCredentials(!showCredentials)}
            >
                <Text style={styles.credentialsText}>
                    {showCredentials ? 'Ocultar' : 'Mostrar'} Credenciais de Teste
                </Text>
            </TouchableOpacity>

            {showCredentials && (
                <View style={styles.credentialsContainer}>
                    <Text style={styles.credentialsTitle}>Usuários de Teste:</Text>
                    {usuarios.map((user, index) => (
                        <View key={user.id} style={styles.credentialItem}>
                            <Text style={styles.credentialLabel}>
                                {user.tipo === 'admin' ? '👨‍💼' : user.tipo === 'medico' ? '👨‍⚕️' : '👩‍⚕️'} {user.nome}
                            </Text>
                            <Text style={styles.credentialText}>Usuário: {user.username}</Text>
                            <Text style={styles.credentialText}>Senha: {user.password}</Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        maxWidth: 350,
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    inputError: {
        borderColor: '#ff6b6b',
        borderWidth: 2,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        maxWidth: 350,
        marginBottom: 8,
    },
    passwordInput: {
        flex: 1,
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    eyeButton: {
        height: 45,
        width: 45,
        backgroundColor: '#f8f9fa',
        borderColor: '#ddd',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRadius: 8,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eyeIcon: {
        fontSize: 18,
    },
    errorText: {
        color: '#ff6b6b',
        fontSize: 12,
        marginBottom: 8,
        alignSelf: 'flex-start',
        marginLeft: 25,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        maxWidth: 350,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: '#ff6b6b',
        marginBottom: 20,
        fontSize: 14,
        textAlign: 'center',
        backgroundColor: '#ffe6e6',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        maxWidth: 350,
    },
    linkButton: {
        paddingVertical: 10,
    },
    linkText: {
        color: '#007bff',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    credentialsButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    credentialsText: {
        color: '#6c757d',
        fontSize: 14,
        textAlign: 'center',
    },
    credentialsContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dee2e6',
        width: '100%',
        maxWidth: 350,
    },
    credentialsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#495057',
        marginBottom: 10,
        textAlign: 'center',
    },
    credentialItem: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    credentialLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 5,
    },
    credentialText: {
        fontSize: 12,
        color: '#6c757d',
        marginBottom: 2,
    },
});

export default Login;