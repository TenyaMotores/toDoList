import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import { excluirContato } from "../types/db";

export default function Contato(props: {
  dados: any;
  navigation: any;
  atualizar: () => void;
}) {
  const ligar = () => {
    Linking.openURL(`tel:${props.dados.telefone}`);
  };

  const excluir = async () => {
    Alert.alert(
      "Excluir",
      "Deseja excluir o contato " + props.dados.nome + "?",
      [
        { text: "Cancelar" },
        {
          text: "OK",
          onPress: async () => {
            await excluirContato(props.dados.id);
            props.atualizar();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.nome}>{props.dados.nome}</Text>
        <Text>{props.dados.telefone}</Text>
      </View>
      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botaoLigar} onPress={ligar}>
          <Text style={styles.textoBotao}>Ligar ao contato</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoAlterar}
          onPress={() =>
            props.navigation.navigate("Alterar", { contato_id: props.dados.id })
          }
        >
          <Text style={styles.textoBotao}>Atualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoExcluir} onPress={excluir}>
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#DCDCDC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nome: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
  },
  telefone: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 14,
    gap: 10, 
  },
  botaoLigar: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  botaoAlterar: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  textoBotao: {
    color: "white",
    fontWeight: "600",
  },
  botaoExcluir: {
    backgroundColor: "#FF3B30", 
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
