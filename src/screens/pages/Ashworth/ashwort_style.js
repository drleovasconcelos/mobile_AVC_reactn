import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    paddingBottom: 80, 
    padding: 20 
    },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 20 
    },
  option: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  selectedOption: { 
    backgroundColor: "#6200ee",
    color: "#fff" }, // Cor diferente para opção selecionada
  optionText: { 
    fontSize: 16 },
  result: { 
    marginTop: 20, 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#333" },
  infoSection: {
    width: "100%",
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3, 
    marginBottom: 100
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
  scrollContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default styles;