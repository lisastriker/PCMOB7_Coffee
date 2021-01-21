import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, TouchableOpacity } from 'react-native';
import  {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from "@expo/vector-icons";
import {Rating} from 'react-native-ratings'
const COFFEE_IMAGE = require('../assets/coffee_bean.png')
const db = SQLite.openDatabase("db.db");
export default function updateScreen({navigation, route}){
    const [rate, setRate] = useState()
    const [store, setStore] = useState("")
    const [coffeeBean, setCoffeeBean] = useState("")
    const [flavor, setFlavor] = useState("")
    const storeName = route.params.storeName
   function update(){
            db.transaction((tx)=>{
                tx.executeSql(`UPDATE coffee set coffee_bean='${coffeeBean}' WHERE store_name='${storeName}'`)
        }, console.log("database no update"),navigation.navigate('rank'))
    }
    //UPDATE coffee set store_name='${store}'
    //UPDATE coffee set store_name=? coffee_bean=? flavor=? rating=?', 
    // [route.params.store, route.params.coffeeBean, route.params.flavor, route.params.rate]);
    return(
        <View style={styles.container}> 
            <Text>Create Screen</Text>
            <TextInput 
            style={styles.input}
            placeholder="Shop name"
            value={store} 
            onChangeText={text=>setStore(text)}
            />  
            <TextInput 
            style={styles.input} 
            placeholder="Coffee Bean Type" 
            value={coffeeBean}
            onChangeText={text=>setCoffeeBean(text)}
            />
            <TextInput 
            style={styles.input} 
            placeholder="Flavor/Taste" 
            value={flavor}
            onChangeText={text=>setFlavor(text)}
            />              
            <Text>{store}</Text>
            <Text>{coffeeBean}</Text>
            <Text>Rate the coffee by swiping</Text> 
            <Rating
            type='custom'
            ratingImage={COFFEE_IMAGE}
            ratingColor="#FFCC00"
            ratingCount={5}
            fractions={1}
            imageSize={50}
            onFinishRating={setRate}
            style={{ paddingVertical: 10 }}
            />
            <Text>{rate}</Text>
            <View style={styles.shadow}>
            <TouchableOpacity style={styles.button} onPress={()=>update()}>
            <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity> 
            </View>
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
    input:{
     width:"70%",
     paddingLeft:10,
     height: 40, 
     borderColor: 'gray', 
     borderWidth: 1,
    },
    button:{
        width:100,
        paddingTop:5,
        paddingBottom:5,
        borderColor:"grey",
        borderWidth:1,
        backgroundColor:"black"
    },
    buttonText:{
        textAlign:"center",
        color:"#FFCC00",
    },
    shadow:{
        elevation:5
    }

  });