import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const CadastroUsuario = ({ navigation }) => {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        nome: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateFields = () => {
        const newErrors = {};
        
        if (!formData.nome.trim()) {
            newErrors.nome = 'Nome é obrigatório';
        }
        
        if (!formData.username.trim()) {
            newErrors.username = 'Nome de usuário é obrigatório';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Nome de usuário deve ter pelo menos 3 caracteres';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }
        
        if (!formData.password) {
            newErrors.password = 'Senha é obrigatória';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Senhas não coincidem';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateFields()) return;

        const userData = {
            nome: formData.nome,
            username: formData.username,
            email: formData.email,
            password: formData.password
        };

        const result = register(userData);

        if (result.success) {
            Alert.alert(
                'Sucesso',
                result.message,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Login')
                    }
                ]
            );
        } else {
            Alert.alert('Erro', result.message);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>← Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cadastro de Usuário</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Criar Nova Conta</Text>
                <Text style={styles.subtitle}>Preencha os dados para se cadastrar</Text>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nome Completo *</Text>
                        <TextInput
                            style={[styles.input, errors.nome && styles.inputError]}
                            placeholder="Digite seu nome completo"
                            value={formData.nome}
                            onChangeText={(text) => handleInputChange('nome', text)}
                        />
                        {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nome de Usuário *</Text>
                        <TextInput
                            style={[styles.input, errors.username && styles.inputError]}
                            placeholder="Digite um nome de usuário"
                            value={formData.username}
                            onChangeText={(text) => handleInputChange('username', text)}
                            autoCapitalize="none"
                        />
                        {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email *</Text>
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            placeholder="Digite seu email"
                            value={formData.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Senha *</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.passwordInput, errors.password && styles.inputError]}
                                placeholder="Digite sua senha"
                                value={formData.password}
                                onChangeText={(text) => handleInputChange('password', text)}
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
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirmar Senha *</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.passwordInput, errors.confirmPassword && styles.inputError]}
                                placeholder="Confirme sua senha"
                                value={formData.confirmPassword}
                                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                                secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity 
                                style={styles.eyeButton}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Text style={styles.eyeIcon}>
                                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Criar Conta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginLink}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.loginLinkText}>
                            Já tem uma conta? Faça login
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#007bff',
    },
    backButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    backText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    placeholder: {
        width: 60,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#343a40',
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6c757d',
        marginBottom: 30,
        textAlign: 'center',
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#495057',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: '#dc3545',
        borderWidth: 2,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    eyeButton: {
        height: 50,
        width: 50,
        backgroundColor: '#f8f9fa',
        borderColor: '#dee2e6',
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
        color: '#dc3545',
        fontSize: 12,
        marginTop: 5,
    },
    submitButton: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginLink: {
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 10,
    },
    loginLinkText: {
        color: '#007bff',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default CadastroUsuario;
