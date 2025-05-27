import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import _tarefa  from './types/tarefa';
import Tarefa from './components/Tarefa';


const db = SQLite.openDatabaseSync('to-do.sqlite');

export default function App() {

  const[novaTarefa, setNovaTarefa] = useState<string>('');
  const[tarefas, setTarefas] = useState<_tarefa[]>([]);


useEffect(() => {
  db.execSync('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER DEFAULT 0)');
  //exec é usado para executar comandos SQL diretamente
  //enquanto o run é usado para executar comandos SQL de forma assíncrona
  recarregar();
}, []);

const recarregar = async () => {
  let temp: _tarefa[] = await db.getAllAsync('SELECT * FROM tarefas');
  //getAllAsync é usado para obter todos os registros de uma tabela
  setTarefas(temp);
}

const adicionar = async () => {
  if (novaTarefa == ""){
    Alert.alert("Insira um texto!");
    return;
  }

    await db.runAsync('INSERT INTO tarefas (texto) VALUES (?)', novaTarefa);

    setNovaTarefa('');
    await recarregar();
}


const renderLista = () => {
  let lista = tarefas.map(t => <Tarefa dados={t} db={db} recarregar={recarregar} key={t.id}  />);
  return lista;
}
  return (
    <View>
      <TextInput style={styles.input} value={novaTarefa} onChangeText={setNovaTarefa}/> 
    <Button title="Adicionar" onPress={adicionar} />

    <View>
      {renderLista()}
    </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
