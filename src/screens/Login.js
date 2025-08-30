import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

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

    const handleSubmit = async () => {
        if (!validateFields()) return;
        
        try {
            const response = await axios.post('/api/login', { username, password });
            // Handle successful login (e.g., redirect or store token)
            console.log(response.data);
            Alert.alert('Sucesso', 'Login realizado com sucesso!');
            // Redirecionar para a lista de pacientes
            navigation.navigate('ListaPacientes');
        } catch (err) {
            setErrors({ general: 'Usuário ou senha inválidos' });
        }
    };

    return (
        <View style={styles.container}>
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
            
            <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Senha"
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) setErrors({...errors, password: null});
                }}
                secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate('Cadastro')}
            >
                <Text style={styles.linkText}>Criar nova conta</Text>
            </TouchableOpacity>
        </View>
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
});

export default Login;