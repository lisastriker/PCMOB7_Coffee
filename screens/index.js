import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import  {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';

export default function indexScreen({navigation}){

    useEffect(()=>{
        navigation.setOptions ({
            headerRight:()=>(
            <Button title="create" onPress={()=>navigation.navigate("create")}>
            </Button>
        )})
    },[])
    return(
        <View>
            <Text>Index Screen</Text>
        </View>
    )

}