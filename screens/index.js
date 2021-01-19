import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import  {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase("db.db");

export default function indexScreen({navigation, route}){
    const [arrayCoffee, setArrayCoffee] = useState([])
    function refreshInfo() {
        console.log("inside refreshInfo")
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM coffee",
            null,
            (txObj, { rows: { _array } }) => {console.log(_array), setArrayCoffee(_array)},
            (txObj, error) => console.log(`Error: ${error}`)
          );
        });
      }
      function deleteDatabase(){
        db.transaction((tx) => {
          tx.executeSql(
            "DROP TABLE IF EXISTS notes",
            null,
            refreshInfo,
            (txObj, error) => console.log(`Error: ${error}`)
          );
        }, console.log("didn't delete"), console.log("deleted database"));
      }

    useEffect(() => { //Create Database
        db.transaction(tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS coffee
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
                store_name TEXT, rating REAL, coffee_bean TEXT, flavor TEXT);`
          );
        }, null, console.log("database created"));
      }, []);

    useEffect(()=>{ //Insert into database
        console.log("Watching params")
        if(route.params?.store){
            console.log(route.params.store)
            console.log(route.params.coffeeBean)
            console.log(route.params.flavor)
            db.transaction((tx)=>{
                tx.executeSql('INSERT into coffee (store_name, coffee_bean, flavor, rating) VALUES (?,?,?,?)', 
                [route.params.store, route.params.coffeeBean, route.params.flavor, route.params.rate]);
            }, console.log("database no insert"), refreshInfo)
        } else {
            console.log("Insert not happening")
        }
    }, [route.params?.store])

    
    useEffect(()=>{ //Create header
        navigation.setOptions ({
            headerRight:()=>(
            <Button title="create" onPress={()=>navigation.navigate("create")}>
            </Button>
        ),
        headerLeft:()=>(
            <Button title="delete" onPress={deleteDatabase}></Button>
        )
        })
    },[])
    
    // function renderItem({ item }) {
    //     return (
    //       <View
    //         style={{
    //           padding: 10,
    //           paddingTop: 20,
    //           paddingBottom: 20,
    //           borderBottomColor: "#ccc",
    //           borderBottomWidth: 1,
    //         }}
    //       >
    //         <Text>{item.store_name}</Text>
    //         <Text>{item.rate}</Text>
    //       </View>
    //     );
    //   }

    return(
        <View style={styles.container}>
            <Text>Index Screen</Text>
        {/* <FlatList
          data={arrayCoffee}
          renderItem={renderItem}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.id.toString()}
        /> */}
      </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
});