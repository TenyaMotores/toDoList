// screens/ListaScreen.tsx
import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { buscarContatos } from "../types/db";
import Contato from "../components/SQLite";
import { FAB } from "@rneui/themed";

export default function ListaScreen({ navigation }: any) {
  const [contatos, setContatos] = useState<any[]>([]);

  const carregar = async () => {
    const lista = await buscarContatos();
    setContatos(lista);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregar);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {contatos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum contato registrado.</Text>
        </View>
      ) : (
        <FlatList
          data={contatos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Contato
              dados={item}
              navigation={navigation}
              atualizar={carregar}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
      <FAB
        placement="right"
        onPress={() => navigation.navigate("Adicionar")}
        icon={{ name: "add", color: "white" }}
        color="green"
        style={styles.fab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363636",
    padding: 15,
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    fontStyle: "italic",
  },
  fab: {
     position: "absolute",
    bottom: 50,
    right: 10,
    backgroundColor: "#f6c177",
    shadowColor: "#232946",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
