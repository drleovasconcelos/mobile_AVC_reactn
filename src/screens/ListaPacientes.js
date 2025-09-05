import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    TextInput, 
    Alert,
    SafeAreaView 
} from 'react-native';
import { usePacientes } from '../context/PacientesContext';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const ListaPacientes = ({ navigation }) => {
    const { pacientes, buscarPacientes } = usePacientes();
    const { logout, currentUser } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPacientes, setFilteredPacientes] = useState(pacientes);

    // Atualizar lista filtrada quando pacientes ou termo de busca mudar
    useEffect(() => {
        setFilteredPacientes(buscarPacientes(searchTerm));
    }, [searchTerm, pacientes, buscarPacientes]);

    // Removido handleLogout pois agora está no Footer

    const handlePacientePress = (paciente) => {
        Alert.alert(
            'Detalhes do Paciente',
            `Nome: ${paciente.nome}\nProntuário: ${paciente.prontuario}\nData de Admissão: ${paciente.dataAdmissao}\nDiagnóstico: ${paciente.diagnostico}\nStatus: ${paciente.status}`,
            [
                { 
                    text: 'Avaliação do Paciente', 
                    onPress: () => navigation.navigate('AvaliacaoPaciente', { paciente }) 
                },
                { text: 'Editar', onPress: () => console.log('Editar paciente:', paciente.id) },
                { 
                    text: 'Buscar Avaliação', 
                    onPress: () => navigation.navigate('BuscarAvaliacao', { paciente }) 
                },
                { text: 'Fechar', style: 'cancel' }
            ]
        );
    };

    const renderPaciente = ({ item }) => (
        <TouchableOpacity 
            style={styles.pacienteCard}
            onPress={() => handlePacientePress(item)}
        >
            <View style={styles.pacienteHeader}>
                <Text style={styles.pacienteNome}>{item.nome}</Text>
                <View style={[
                    styles.statusBadge, 
                    { backgroundColor: item.status === 'Ativo' ? '#28a745' : '#6c757d' }
                ]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>
            
            <View style={styles.pacienteInfo}>
                <Text style={styles.infoText}>
                    <Text style={styles.infoLabel}>Prontuário:</Text> {item.prontuario}
                </Text>
                <Text style={styles.infoText}>
                    <Text style={styles.infoLabel}>Admissão:</Text> {item.dataAdmissao}
                </Text>
                <Text style={styles.infoText}>
                    <Text style={styles.infoLabel}>Diagnóstico:</Text> {item.diagnostico}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Lista de Pacientes</Text>
                    {currentUser && (
                        <Text style={styles.userInfo}>
                            {currentUser.tipo === 'admin' ? '👨‍💼' : currentUser.tipo === 'medico' ? '👨‍⚕️' : '👩‍⚕️'} {currentUser.nome}
                        </Text>
                    )}
                </View>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => navigation.navigate('Cadastro')}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar por nome, prontuário ou diagnóstico..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{pacientes.length}</Text>
                    <Text style={styles.statLabel}>Total</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                        {pacientes.filter(p => p.status === 'Ativo').length}
                    </Text>
                    <Text style={styles.statLabel}>Ativos</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                        {pacientes.filter(p => p.status === 'Alta').length}
                    </Text>
                    <Text style={styles.statLabel}>Altas</Text>
                </View>
            </View>

            <FlatList
                data={filteredPacientes}
                renderItem={renderPaciente}
                keyExtractor={item => item.id}
                style={styles.lista}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado'}
                        </Text>
                    </View>
                }
            />

            <Footer navigation={navigation} currentScreen="ListaPacientes" />
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
    headerLeft: {
        flex: 1,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    userInfo: {
        color: '#fff',
        fontSize: 14,
        marginTop: 5,
        opacity: 0.9,
    },
    addButton: {
        backgroundColor: '#28a745',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#e9ecef',
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#343a40',
    },
    statLabel: {
        fontSize: 14,
        color: '#6c757d',
    },
    lista: {
        flex: 1,
        paddingHorizontal: 20,
    },
    pacienteCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    pacienteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    pacienteNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#343a40',
    },
    statusBadge: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    pacienteInfo: {
        marginTop: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 3,
    },
    infoLabel: {
        fontWeight: 'bold',
        color: '#6c757d',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#6c757d',
        textAlign: 'center',
    },
});

export default ListaPacientes;
