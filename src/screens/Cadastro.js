import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Cadastro = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [dataAdmissao, setDataAdmissao] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [prontuario, setProntuario] = useState('');

    const handleCadastro = () => {
        // Lógica para cadastrar o paciente
        console.log({ nome, dataAdmissao, diagnostico, prontuario });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Data de Admissão"
                value={dataAdmissao}
                onChangeText={setDataAdmissao}
            />
            <TextInput
                style={styles.input}
                placeholder="Diagnóstico"
                value={diagnostico}
                onChangeText={setDiagnostico}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de Prontuário"
                value={prontuario}
                onChangeText={setProntuario}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
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
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        width: '100%',
        maxWidth: 300,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Cadastro;