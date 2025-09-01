import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { usePacientes } from '../context/PacientesContext';
import Footer from '../components/Footer';

const Cadastro = ({ navigation }) => {
    const { adicionarPaciente } = usePacientes();
    const [nome, setNome] = useState('');
    const [dataAdmissao, setDataAdmissao] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [prontuario, setProntuario] = useState('');
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};
        
        if (!nome.trim()) {
            newErrors.nome = 'Nome é obrigatório';
        }
        if (!dataAdmissao.trim()) {
            newErrors.dataAdmissao = 'Data de admissão é obrigatória';
        }
        if (!diagnostico.trim()) {
            newErrors.diagnostico = 'Diagnóstico é obrigatório';
        }
        if (!prontuario.trim()) {
            newErrors.prontuario = 'Número de prontuário é obrigatório';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCadastro = () => {
        if (validateFields()) {
            const novoPaciente = {
                nome: nome.trim(),
                dataAdmissao: dataAdmissao.trim(),
                diagnostico: diagnostico.trim(),
                prontuario: prontuario.trim()
            };
            
            adicionarPaciente(novoPaciente);
            
            Alert.alert(
                'Sucesso', 
                'Paciente cadastrado com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('ListaPacientes')
                    }
                ]
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Cadastro de Paciente</Text>
            
            <TextInput
                style={[styles.input, errors.nome && styles.inputError]}
                placeholder="Nome completo"
                value={nome}
                onChangeText={(text) => {
                    setNome(text);
                    if (errors.nome) setErrors({...errors, nome: null});
                }}
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
            
            <TextInput
                style={[styles.input, errors.dataAdmissao && styles.inputError]}
                placeholder="Data de Admissão (DD/MM/AAAA)"
                value={dataAdmissao}
                onChangeText={(text) => {
                    setDataAdmissao(text);
                    if (errors.dataAdmissao) setErrors({...errors, dataAdmissao: null});
                }}
            />
            {errors.dataAdmissao && <Text style={styles.errorText}>{errors.dataAdmissao}</Text>}
            
            <TextInput
                style={[styles.input, errors.diagnostico && styles.inputError]}
                placeholder="Diagnóstico"
                value={diagnostico}
                onChangeText={(text) => {
                    setDiagnostico(text);
                    if (errors.diagnostico) setErrors({...errors, diagnostico: null});
                }}
                multiline
            />
            {errors.diagnostico && <Text style={styles.errorText}>{errors.diagnostico}</Text>}
            
            <TextInput
                style={[styles.input, errors.prontuario && styles.inputError]}
                placeholder="Número de Prontuário"
                value={prontuario}
                onChangeText={(text) => {
                    setProntuario(text);
                    if (errors.prontuario) setErrors({...errors, prontuario: null});
                }}
                keyboardType="numeric"
            />
            {errors.prontuario && <Text style={styles.errorText}>{errors.prontuario}</Text>}
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.buttonSecondary} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonTextSecondary}>Cancelar</Text>
                </TouchableOpacity>
            </View>
            </View>

            <Footer navigation={navigation} currentScreen="Cadastro" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        paddingTop: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
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
    buttonContainer: {
        width: '100%',
        maxWidth: 350,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
    },
    buttonSecondary: {
        backgroundColor: '#6c757d',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonTextSecondary: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Cadastro;