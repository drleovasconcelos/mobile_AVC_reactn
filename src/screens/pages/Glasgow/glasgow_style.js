import { StyleSheet } from 'react-native';
// Estilos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    paddingBottom: 120
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#d32f2f',
    fontWeight: '500',
  },
  section: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#34495e',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  resultContainer: {
    backgroundColor: '#1565c0',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
  },
  scoreText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  finalScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
    marginBottom: 8,
  },
  interpretationText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#0d47a1',
  },
  infoText: {
    fontSize: 14,
    color: '#1a237e',
  },
});

export default styles;
