import {SQLiteDatabase} from "expo-sqlite"
import _tarefa from "../types/tarefa";
import { Button, Text, View} from "react-native";

type _propsTarefa = {
    dados: _tarefa,
    db : SQLiteDatabase,
    recarregar: any
}
export default function Tarefa(props: _propsTarefa){

    const excluir = async ()=>{
        await props.db.runAsync("DELETE FROM tarefas WHERE id = ?", props.dados.id);
        await props.recarregar();
    }

    const concluir = async () => {
        await props.db.runAsync("UPDATE tarefas SET concluido = ? WHERE id = ?", props.dados.concluido, props.dados.id);
        await props.recarregar();
    }

    const renderStatus = async () => {
        if (props.dados.concluido) {
            return <Text>Concluída</Text>;
        return <Button title="Concluir" onPress={concluir} />
        }

    }

    return <View>
        <Text>{props.dados.texto}</Text>
        {renderStatus()}
        <Button title="Excluir" onPress={excluir} />"
    </View>
}