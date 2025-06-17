import * as SQLite from 'expo-sqlite';
import  _contato  from './contato';

const db = SQLite.openDatabaseSync('contatos.db');

db.execSync(`CREATE TABLE IF NOT EXISTS contatos (
  id INTEGER PRIMARY KEY NOT NULL,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL
);`);

export const buscarContatos = async (): Promise<_contato[]> => {
  return await db.getAllAsync('SELECT * FROM contatos ORDER BY nome ASC') as _contato[];
};

export const buscarContatoPorId = async (id: number): Promise<_contato | undefined> => {
  const resultados = await db.getAllAsync("SELECT * FROM contatos WHERE id = ?", id) as _contato[];
  return resultados[0];
};

export const inserirContato = async (nome: string, telefone: string) => {
  return await db.runAsync('INSERT INTO contatos (nome, telefone) VALUES (?, ?)', nome, telefone);
};

export const excluirContato = async (id: number) => {
  return await db.runAsync('DELETE FROM contatos WHERE id = ?', id);
};

export const atualizarContato = async (id: number, nome: string, telefone: string) => {
  return await db.runAsync('UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?', nome, telefone, id);
};

export default db;
