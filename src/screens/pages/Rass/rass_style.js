import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#7f8c8d',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#34495e',
  },
  section: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  picker: {
    height: 50,
    marginBottom: 5,
    width: '100%',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    alignItems: 'center',
  },
  finalScore: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  interpretationText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#2c3e50',
  },
  infoSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0d47a1',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#1976d2'
  },
  infoText1: {
    fontSize: 14,
    marginBottom: 4,
    color: '#1976d2',
    paddingBottom: 100
  },
});

export default styles;