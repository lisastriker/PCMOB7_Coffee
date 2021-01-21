import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import  {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react/cjs/react.development';
const db = SQLite.openDatabase("db.db");

export default function rankingScreen({navigation, route}){
    const [arrayCoffee, setArrayCoffee] = useState([])
    const storeName = route.params.store1
    useEffect(()=>{
            db.transaction((tx) => {
              tx.executeSql(
                `SELECT * FROM coffee WHERE store_name='${storeName}'`,
                null,
                (txObj, { rows: { _array } }) => {console.log(_array), setArrayCoffee(_array)},
                (txObj, error) => console.log(`Error: ${error}`)
              );
            }, console.log("error for tranasc"), console.log("success"));
    }, [])
    
    useEffect(()=>{ //Create header
        navigation.setOptions ({
            headerRight:()=>(
            <Button title="Add review" 
            onPress={()=>navigation.navigate("create", {storeName})}>
            </Button>)})},[])

    function renderItem({item}){
        return(
        <View style={styles.itemView}>
            <Button title="update" onPress={()=>navigation.navigate("update", {storeName})}></Button>
            <Text>{item.store_name}</Text>
            <Text>{item.coffee_bean}</Text>
            <Text>{item.flavor}</Text>
            <Text>{item.rating}</Text>
        </View>
        )
    }
    return(
        <View >
            <FlatList
            data={arrayCoffee}
            renderItem={renderItem}
            style={{ width: "100%"}}
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
      itemView:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth:2,
        borderBottomColor:"grey"
      }
})