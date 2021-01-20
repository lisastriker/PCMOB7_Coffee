import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import  {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import indexScreen from './screens/index';
import createScreen from './screens/create';
import rankScreen from './screens/ranking';

export default function App() {
  const Stack = createStackNavigator()
  return ( //You can't put headerLeft inside the indexScreen, so do a useEffect on the screen itself
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen component={indexScreen} name="index"/> 
      <Stack.Screen component={createScreen} name="create"/>
      <Stack.Screen component={rankScreen} name="rank"/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
