import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform
} from 'react-native';

// Import condicional do DateTimePicker apenas para mobile
let DateTimePicker = null;
if (Platform.OS !== 'web') {
    try {
        DateTimePicker = require('@react-native-community/datetimepicker').default;
    } catch (error) {
        console.warn('DateTimePicker não disponível:', error);
    }
}

const DatePicker = ({
    label,
    value,
    onDateChange,
    placeholder = '📅 Selecionar Data',
    maximumDate = null,
    minimumDate = new Date(1900, 0, 1),
    disabled = false,
    style = {},
    labelStyle = {},
    buttonStyle = {},
    textStyle = {}
}) => {
    const [showPicker, setShowPicker] = useState(false);

    // Função auxiliar para converter string de data para Date object
    const parseDateString = useCallback((dateString) => {
        if (!dateString) return new Date();
        try {
            const parts = dateString.split('/');
            if (parts.length === 3) {
                const day = parseInt(parts[0]);
                const month = parseInt(parts[1]) - 1; // Mês começa em 0
                const year = parseInt(parts[2]);
                
                // Validar se os valores são válidos
                if (day >= 1 && day <= 31 && month >= 0 && month <= 11 && year >= 1900 && year <= new Date().getFullYear()) {
                    return new Date(year, month, day);
                }
            }
        } catch (error) {
            console.log('Erro ao converter data:', error);
        }
        return new Date();
    }, []);

    // Função para lidar com a seleção da data
    const handleDateChange = useCallback((event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate && event.type !== 'dismissed') {
            const formattedDate = selectedDate.toLocaleDateString('pt-BR');
            onDateChange(formattedDate);
        }
    }, [onDateChange]);

    // Função para abrir o picker
    const handleOpenPicker = useCallback(() => {
        if (!disabled) {
            if (Platform.OS === 'web') {
                // Na web, usar input type="date" nativo
                const input = document.createElement('input');
                input.type = 'date';
                input.value = parseDateString(value).toISOString().split('T')[0];
                input.min = minimumDate ? minimumDate.toISOString().split('T')[0] : undefined;
                input.max = maximumDate ? maximumDate.toISOString().split('T')[0] : undefined;
                
                input.onchange = (e) => {
                    if (e.target.value) {
                        const selectedDate = new Date(e.target.value);
                        const formattedDate = selectedDate.toLocaleDateString('pt-BR');
                        onDateChange(formattedDate);
                    }
                };
                
                input.click();
            } else {
                setShowPicker(true);
            }
        }
    }, [disabled, value, minimumDate, maximumDate, onDateChange, parseDateString]);

    return (
        <View style={[styles.container, style]}>
            {label && (
                <Text style={[styles.label, labelStyle]}>
                    {label}
                </Text>
            )}
            
            <TouchableOpacity
                style={[
                    styles.dateButton,
                    buttonStyle,
                    disabled && styles.dateButtonDisabled
                ]}
                onPress={handleOpenPicker}
                disabled={disabled}
            >
                <Text style={[
                    styles.dateButtonText,
                    textStyle,
                    disabled && styles.dateButtonTextDisabled
                ]}>
                    {value ? value : placeholder}
                </Text>
            </TouchableOpacity>

            {showPicker && DateTimePicker && (
                <DateTimePicker
                    value={parseDateString(value)}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    maximumDate={maximumDate}
                    minimumDate={minimumDate}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#343a40',
        marginBottom: 8,
    },
    dateButton: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    dateButtonDisabled: {
        backgroundColor: '#6c757d',
        opacity: 0.6,
    },
    dateButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    dateButtonTextDisabled: {
        color: '#adb5bd',
    },
});

export default DatePicker;
