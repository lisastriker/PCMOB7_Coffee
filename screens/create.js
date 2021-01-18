import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

export default function createScreen({navigation}){
    return(
        <View>
            <Text>Create Screen</Text>
        </View>
    )

}