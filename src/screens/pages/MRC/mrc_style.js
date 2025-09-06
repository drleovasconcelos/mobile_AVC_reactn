import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 15,
    marginHorizontal: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginVertical: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2,},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  picker: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dfe6e9',
  },
  resultContainer: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 15,
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 10,
  },
  finalScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,

  },
  interpretationText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '500',
    marginHorizontal: 20,
  },
  pickerItem: {
    fontSize: 14,
  },
    infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0d47a1',
    marginHorizontal: 20,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 100,
    color: '#1976d2',
    padding: 20,
    textAlign: 'justify'
  },
});

export default styles;