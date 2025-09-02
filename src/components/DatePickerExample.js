import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Alert
} from 'react-native';
import DatePicker from './DatePicker';

const DatePickerExample = () => {
    const [formData, setFormData] = useState({
        dataAvaliacao: '',
        dataNascimento: '',
        dataInicioTratamento: '',
        dataAlta: '',
        dataConsulta: ''
    });

    const handleDataAvaliacaoChange = (formattedDate) => {
        setFormData(prev => ({
            ...prev,
            dataAvaliacao: formattedDate
        }));
        Alert.alert('Data Selecionada', `Data de avaliação: ${formattedDate}`);
    };

    const handleDataNascimentoChange = (formattedDate) => {
        setFormData(prev => ({
            ...prev,
            dataNascimento: formattedDate
        }));
        Alert.alert('Data Selecionada', `Data de nascimento: ${formattedDate}`);
    };

    const handleDataInicioTratamentoChange = (formattedDate) => {
        setFormData(prev => ({
            ...prev,
            dataInicioTratamento: formattedDate
        }));
        Alert.alert('Data Selecionada', `Data de início do tratamento: ${formattedDate}`);
    };

    const handleDataAltaChange = (formattedDate) => {
        setFormData(prev => ({
            ...prev,
            dataAlta: formattedDate
        }));
        Alert.alert('Data Selecionada', `Data de alta: ${formattedDate}`);
    };

    const handleDataConsultaChange = (formattedDate) => {
        setFormData(prev => ({
            ...prev,
            dataConsulta: formattedDate
        }));
        Alert.alert('Data Selecionada', `Data de consulta: ${formattedDate}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Exemplos de Uso do DatePicker</Text>
                <Text style={styles.subtitle}>
                    Este componente demonstra diferentes configurações do DatePicker
                </Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. Data de Avaliação</Text>
                    <Text style={styles.description}>
                        Não permite datas futuras (maximumDate = hoje)
                    </Text>
                    <DatePicker
                        label="Data da avaliação:"
                        value={formData.dataAvaliacao}
                        onDateChange={handleDataAvaliacaoChange}
                        maximumDate={new Date()}
                        minimumDate={new Date(1900, 0, 1)}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2. Data de Nascimento</Text>
                    <Text style={styles.description}>
                        Permite qualquer data passada (sem maximumDate)
                    </Text>
                    <DatePicker
                        label="Data de nascimento:"
                        value={formData.dataNascimento}
                        onDateChange={handleDataNascimentoChange}
                        minimumDate={new Date(1900, 0, 1)}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. Data com Limites Específicos</Text>
                    <Text style={styles.description}>
                        Permite datas entre 2020 e hoje
                    </Text>
                    <DatePicker
                        label="Data de início do tratamento:"
                        value={formData.dataInicioTratamento}
                        onDateChange={handleDataInicioTratamentoChange}
                        maximumDate={new Date()}
                        minimumDate={new Date(2020, 0, 1)}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>4. Componente Desabilitado</Text>
                    <Text style={styles.description}>
                        Exemplo de uso quando o campo não deve ser editável
                    </Text>
                    <DatePicker
                        label="Data de alta:"
                        value={formData.dataAlta}
                        onDateChange={handleDataAltaChange}
                        disabled={true}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>5. Com Estilos Personalizados</Text>
                    <Text style={styles.description}>
                        Demonstra como customizar a aparência
                    </Text>
                    <DatePicker
                        label="Data de consulta:"
                        value={formData.dataConsulta}
                        onDateChange={handleDataConsultaChange}
                        style={{ marginBottom: 20 }}
                        labelStyle={{ color: '#e74c3c', fontWeight: 'bold' }}
                        buttonStyle={{ backgroundColor: '#e74c3c' }}
                        textStyle={{ fontSize: 16 }}
                    />
                </View>

                <View style={styles.summarySection}>
                    <Text style={styles.summaryTitle}>Resumo das Datas Selecionadas</Text>
                    {Object.entries(formData).map(([key, value]) => (
                        <Text key={key} style={styles.summaryText}>
                            {key}: {value || 'Não selecionada'}
                        </Text>
                    ))}
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
    scrollView: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#343a40',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
        marginBottom: 30,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#007bff',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 15,
        fontStyle: 'italic',
    },
    summarySection: {
        backgroundColor: '#e3f2fd',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#2196f3',
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1976d2',
        marginBottom: 15,
    },
    summaryText: {
        fontSize: 14,
        color: '#424242',
        marginBottom: 5,
        fontFamily: 'monospace',
    },
});

export default DatePickerExample;
