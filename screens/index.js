import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import  {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import {AppLoading} from 'expo-app-loading'
import * as SQLite from 'expo-sqlite';
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster'

const db = SQLite.openDatabase("db.db");

export default function indexScreen({navigation, route}){
 
    let [fontsLoaded] = useFonts({
    Lobster_400Regular,
  }) 
  const [arrayCoffee, setArrayCoffee] = useState([])
    function refreshInfo() {
        console.log("inside refreshInfo")
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM coffee GROUP BY store_name",
            null,
            (txObj, { rows: { _array } }) => {console.log(_array), setArrayCoffee(_array)},
            (txObj, error) => console.log(`Error: ${error}`)
          );
        });
      }

      function deleteItem(id) {
        console.log("Deleting " + id);
        db.transaction(
          (tx) => {
            tx.executeSql(`DELETE FROM coffee WHERE id=${id}`);
          },
          null,
          refreshInfo
        );
      }

    useEffect(() => { //Create Database
        db.transaction(tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS coffee
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
                store_name TEXT, rating REAL, coffee_bean TEXT, flavor TEXT);`
          );
        }, null, refreshInfo);
      }, []);

    useEffect(()=>{ //Insert into database. If data comes from new store or comes from specific store
        console.log("Watching params")
        console.log(route.params?.store)
        if(route.params?.store){
            db.transaction((tx)=>{
                tx.executeSql('INSERT into coffee (store_name, coffee_bean, flavor, rating) VALUES (?,?,?,?)', 
                [route.params.store, route.params.coffeeBean, route.params.flavor, route.params.rate]);
            }, console.log("database no insert"), refreshInfo)
        }
        else {
            console.log("Insert not happening")
        }
    }, [route.params?.store])

    
    useEffect(()=>{ //Create header
        navigation.setOptions ({
            headerRight:()=>(
            <Button title="Add store" onPress={()=>navigation.navigate("create")}>
            </Button>)})},[])
    
    function renderItem({ item }) {
      const store1 = item.store_name
      const coffee1 = item.coffee_bean
      const flavor1 = item.flavor
      const rating1 = item.rating
        return (
          <View style={styles.itemView}>
            <View style={styles.rows}>
            <TouchableOpacity style={styles.rowButtonLeft} onPress={()=>navigation.navigate('rank', {store1, coffee1, rating1, flavor1})}>
              <Text style={{fontSize:15}}>{item.store_name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rowButtonRight} onPress={()=>deleteItem(item.id)}>
              <Ionicons name="trash" size={16} color="#ccc" />
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    
    if(!fontsLoaded){
        return <AppLoading />
      }
    else{
      return(
          <View style={styles.container}>
          <View style={styles.headerContainer}>
          <Image style={styles.headerPicture} source={require('../assets/coffee_cup.png')}></Image>
          <Text style={styles.headerText}>Coffee Adventures</Text>
          </View>
          <FlatList
            data={arrayCoffee}
            renderItem={renderItem}
            style={{ width: "100%" }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )
    }
    

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F7',
    },
    rows:{
      alignContent:"center",
      flexDirection:"row",
      paddingTop:8,
      paddingBottom:8,
      marginBottom:3,
    },
    rowButtonLeft:{
      paddingLeft:20,
      width:"100%",
      height:"100%",
      marginRight:"auto",
      alignContent:"flex-start",
    },    
    rowButtonRight:{
      marginLeft:"auto",
      alignContent:"flex-end",
      marginRight:15,
    },
    headerPicture:{
      width:200,
      height:100,
      alignItems:"flex-start",
      paddingLeft:0,
    },
    headerText:{
      fontFamily:"Lobster_400Regular",
      textAlignVertical:"center",
      fontSize:20,
      marginLeft:-15
    },
    headerContainer:{
      flexDirection:"row",
    },
    itemView:{
    flexWrap:"wrap",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    borderBottomWidth:0.5,
    borderBottomColor:"#eee",
  },
});

