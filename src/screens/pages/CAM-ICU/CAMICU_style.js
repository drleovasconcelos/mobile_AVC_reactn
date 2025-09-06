import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',

  },
  scrollContainer: {
    flexGrow: 1, // Permite rolagem completa
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
    marginTop: 15
  },
  section: {
    width: '100%',
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#34495e',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#ececec',
    borderRadius: 8,
    marginTop: 8,
    overflow: 'hidden', // Adicionando para evitar problemas em alguns dispositivos
  },
  resultContainer: {
    width: '100%',
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
  },
  finalScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
  },
  interpretationText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#34495e',
  },
  infoSection: {
    width: "100%",
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3, 
    marginBottom: 140 // Ajustado para evitar grandes espaçamentos no final
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2c3e50',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'justify',
    color: '#34495e',
    lineHeight: 22,
  },
});

export default styles;