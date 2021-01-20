import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';


export default function rankingScreen({navigation, route}){
    return(
        <View>
            <Text>ranking Screen</Text>
            <Text>{route.params.store1}</Text>
            <Text>{route.params.coffee1}</Text>
            <Text>{route.params.rating1}</Text>
            <Text>{route.params.flavor1}</Text>
        </View>
    )

}