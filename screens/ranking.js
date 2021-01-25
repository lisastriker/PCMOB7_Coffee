import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View, Button, Image} from 'react-native';
import  {NavigationContainer, useIsFocused} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react/cjs/react.development';
import { getContentUriAsync } from 'expo-file-system';
const db = SQLite.openDatabase("db.db");

export default function rankingScreen({navigation, route}){
    const [arrayCoffee, setArrayCoffee] = useState([])
    const storeName = route.params.store1
    const isFocused = useIsFocused();

    function refreshStore(){
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM coffee WHERE store_name='${storeName}'`,
          null,
          (txObj, { rows: { _array } }) => {console.log(_array), setArrayCoffee(_array)},
          (txObj, error) => console.log(`Error: ${error}`)
        );
      }, console.log("error for tranasc"), console.log("success"));
    }
    
    useEffect(()=>{ //Show data from all stores
            refreshStore()}, [isFocused])
    
    useEffect(()=>{ //Create header
        navigation.setOptions ({
            headerRight:()=>(
            <Button title="Add review" 
            onPress={()=>navigation.navigate("create", {storeName})}>
            </Button>)})},[])

    useEffect(()=>{ //Insert into database. If data comes from specific store
      console.log("Watching params")
      if(route.params?.receiveStore) {
        db.transaction((tx)=>{
          tx.executeSql('INSERT into coffee (store_name, coffee_bean, flavor, rating) VALUES (?,?,?,?)', 
          [route.params.receiveStore, route.params.coffeeBean, route.params.flavor, route.params.rate]);
      }, console.log("database no insert"), refreshStore)
      }       
      else {
          console.log("Insert not happening")
      }
    }, [route.params?.coffeeBean, route.params?.rating, route.params?.flavor])
    function renderItem({item}){
      const storeName1 = item.store_name
      const coffeeBean1 = item.coffee_bean
      const flavor1 = item.flavor
      const rating1 = item.rating
      const id1 = item.id
        return(
        <View style={styles.itemView}>
            <View style={styles.side}>
            <Text>Store Name : {item.store_name}</Text>
            <Text>Coffee Bean: {item.coffee_bean}</Text>
            <Text>Flavor Notes: {item.flavor}</Text>
            <Text>Rating: {item.rating}</Text>
            </View>
            <Button style={styles.buttons} title="update" 
            onPress={()=>navigation.navigate("update", {storeName1, coffeeBean1, flavor1, rating1, id1})}></Button>
            
        </View>
        )
    }
    return(
        <View >
            <Image style={styles.headerPicture} source={require('../assets/coffee_cup.png')}></Image>
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
    headerPicture:{
      width:200,
      height:100,
      alignItems:"flex-start",
    },
      itemView:{
        flexWrap:"wrap",
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth:1,
        borderColor:"#eee",
        flexDirection:"row",
        padding:10,
        margin:5,
        borderRadius:5,
        shadowRadius:5,
        elevation:1,
        shadowColor:"black",
      },
      side:{
        flexDirection:"column",
      },
})