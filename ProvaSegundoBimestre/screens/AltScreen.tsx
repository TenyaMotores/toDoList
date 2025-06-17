import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import db, { buscarContatoPorId, atualizarContato } from "../types/db";
import _contato from "../types/contato";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { TextInputMask } from "react-native-masked-text";

type AlterarScreenProps = NativeStackScreenProps<RootStackParamList, "Alterar">;

export default function AlterarScreen({
  navigation,
  route,
}: AlterarScreenProps) {
  const { contato_id } = route.params;

  const [contato, setContato] = useState<_contato | null>(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    async function carregarContato() {
      const c = await buscarContatoPorId(contato_id);
      if (c) {
        setContato(c);
        setNome(c.nome);
        setTelefone(c.telefone);
      } else {
        Alert.alert("Contato não encontrado");
        navigation.goBack();
      }
    }
    carregarContato();
  }, [contato_id]);

  const salvarAlteracao = async () => {
    if (!nome || !telefone) {
      Alert.alert("Preencha nome e telefone!");
      return;
    }

    try {
      await atualizarContato(contato_id, nome, telefone);
      Alert.alert("Contato atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro ao atualizar contato");
    }
  };

  if (!contato) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
      />
      <TextInputMask
        type={"custom"}
        options={{
          mask: "+99 (99) 99999-9999",
        }}
        value={telefone}
        onChangeText={(text) => setTelefone(text)}
        placeholder="+__ (__) _____-____"
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={salvarAlteracao}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    shadowColor: "#34C759",
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
