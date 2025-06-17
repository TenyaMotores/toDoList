import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import AddScreen from './screens/AddScreen';
import AltScreen from './screens/AltScreen';
import { View } from 'react-native';

export type RootStackParamList = {
  Lista: undefined;
  Adicionar: undefined;
  Alterar: { contato_id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();



export default function App() {
  return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Lista" component={MainScreen} options={{title: "Lista de Contato", headerTintColor: "white", headerStyle: { backgroundColor: "#1C1C1C" }}} />
          <Stack.Screen name="Adicionar" component={AddScreen} options={{title: "Adicionar Contato", headerTintColor: "white", headerStyle: { backgroundColor: "#1C1C1C" }}} />
          <Stack.Screen name="Alterar" component={AltScreen} options={{title: "Alterar Contato", headerTintColor: "white", headerStyle: { backgroundColor: "#1C1C1C" }}}/>
        </Stack.Navigator>
      </NavigationContainer>

  );
}