import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import  {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react/cjs/react.development';
const db = SQLite.openDatabase("db.db");

export default function rankingScreen({navigation, route}){
    const [arrayCoffee, setArrayCoffee] = useState([])
    
    useEffect(()=>{
            const storeName = route.params.store1
            console.log("insided useEffect")
            console.log(storeName)
            db.transaction((tx) => {
              tx.executeSql(
                `SELECT * FROM coffee WHERE store_name='${storeName}'`,
                null,
                (txObj, { rows: { _array } }) => {console.log(_array), setArrayCoffee(_array)},
                (txObj, error) => console.log(`Error: ${error}`)
              );
            }, console.log("error for tranasc"), console.log("success"));
    }, [])
    
    function renderItem({item}){
        return(
        <View>
            <Text>{item.store_name}</Text>
            <Text>{item.coffee_bean}</Text>
        </View>
        )
    }
    return(
        <View style={styles.container}>
            <Text>ranking Screen</Text>
            <FlatList
            data={arrayCoffee}
            renderItem={renderItem}
            style={{ width: "100%" }}
            keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})