import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import _tarefa from './types/_tarefa';
import Tarefa from './components/Tarefa';

export default function App() {
  const [texto, setTexto] = useState<string>('');
  const [tarefas, setTarefas] = useState<_tarefa[]>([]);

  function adicionarTarefa(){
    if(texto == ''){
      alert("Insira um texto!");
      return;
    }
    let tarefa: _tarefa = {
      id: tarefas.length +1,
      texto
    };

    setTarefas([...tarefas, tarefa]);
  }

  function mostrarTarefas(){
    return tarefas.map(t => <Tarefa key={t.id} dados={t} handleDeletePress={excluir}/>);
  }
  
  function excluir(id:number){
    let f = tarefas.filter(t => t.id != id);
    setTarefas(f);
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={texto} onChangeText={setTexto}/>
      <Button title='Adicionar tarefa' onPress={adicionarTarefa}/>
      {mostrarTarefas()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderWidth:1
  }
});
