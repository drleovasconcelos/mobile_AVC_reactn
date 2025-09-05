import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator
} from 'react-native';

const ModalSalvarAvaliacao = ({ 
    visible, 
    onClose, 
    onConfirm, 
    loading = false,
    pontuacaoTotal = 0,
    statusGeral = 'Regular'
}) => {
    const [nomeAvaliacao, setNomeAvaliacao] = useState('');

    const handleConfirm = () => {
        if (!nomeAvaliacao.trim()) {
            Alert.alert('Erro', 'Por favor, digite um nome para a avaliação.');
            return;
        }
        
        onConfirm(nomeAvaliacao.trim());
    };

    const handleClose = () => {
        setNomeAvaliacao('');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>💾 Salvar Avaliação</Text>
                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalContent}>
                        <Text style={styles.modalDescription}>
                            Digite um nome para identificar esta avaliação:
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={nomeAvaliacao}
                            onChangeText={setNomeAvaliacao}
                            placeholder="Ex: Avaliação Neurológica - Paciente João"
                            placeholderTextColor="#6c757d"
                            maxLength={100}
                            editable={!loading}
                        />

                        <View style={styles.resumoContainer}>
                            <Text style={styles.resumoTitle}>📊 Resumo da Avaliação:</Text>
                            <View style={styles.resumoItem}>
                                <Text style={styles.resumoLabel}>Pontuação Total:</Text>
                                <Text style={styles.resumoValue}>{pontuacaoTotal}</Text>
                            </View>
                            <View style={styles.resumoItem}>
                                <Text style={styles.resumoLabel}>Status Geral:</Text>
                                <Text style={[styles.resumoValue, { color: getStatusColor(statusGeral) }]}>
                                    {statusGeral}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={handleClose}
                            disabled={loading}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={handleConfirm}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Text style={styles.confirmButtonText}>Salvar</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'excelente':
            return '#28a745';
        case 'bom':
            return '#17a2b8';
        case 'regular':
            return '#ffc107';
        case 'ruim':
            return '#fd7e14';
        case 'crítico':
            return '#dc3545';
        default:
            return '#6c757d';
    }
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: '100%',
        maxWidth: 400,
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#343a40',
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6c757d',
    },
    modalContent: {
        padding: 20,
    },
    modalDescription: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 15,
        lineHeight: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#343a40',
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    resumoContainer: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 15,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    resumoTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#343a40',
        marginBottom: 10,
    },
    resumoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    resumoLabel: {
        fontSize: 14,
        color: '#6c757d',
    },
    resumoValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#343a40',
    },
    modalFooter: {
        flexDirection: 'row',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 44,
    },
    cancelButton: {
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#ced4da',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6c757d',
    },
    confirmButton: {
        backgroundColor: '#007bff',
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});

export default ModalSalvarAvaliacao;
