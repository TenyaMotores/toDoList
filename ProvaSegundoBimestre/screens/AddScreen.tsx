import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { inserirContato } from "../types/db";
import { TextInputMask } from "react-native-masked-text";

export default function AdicionarScreen({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const salvar = async () => {
    if (!nome || !telefone) {
      Alert.alert("Preencha as informações!");
      return;
    }
    await inserirContato(nome, telefone);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInputMask
        type={"custom"}
        options={{
          mask: "(99) 99999-9999",
        }}
        value={telefone}
        onChangeText={(text) => setTelefone(text)}
        placeholder="(__) _____-____"
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={salvar}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1C1C1C",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#007AFF",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});
