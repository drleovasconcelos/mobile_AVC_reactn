import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#2c3e50',
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
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
    marginTop: 20,
    padding: 16,
    backgroundColor: '#dfe6e9',
    borderRadius: 8,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  infoSection: {
    width: "100%",
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3, 
    marginBottom: 140 
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    textAlign: "justify",
  },
});


export default styles;