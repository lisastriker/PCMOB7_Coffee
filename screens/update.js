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
    const [rate, setRate] = useState(route.params?.rating1)
    const [store, setStore] = useState("")
    const [coffeeBean, setCoffeeBean] = useState(route.params?.coffeeBean1)
    const [flavor, setFlavor] = useState(route.params?.flavor1)
    const storeName1 = route.params.storeName1 //All these variable come from update. ranking screen
    const id1 = route.params.id1
   function update(){
            db.transaction((tx)=>{
                console.log('inside update statement')
                tx.executeSql(`UPDATE coffee set coffee_bean='${coffeeBean}', flavor='${flavor}', rating='${rate}' WHERE 
                id=${id1}`)
        }, console.log("database no update"), navigation.goBack())
    }
    //store_name='${storeName1}' AND coffee_bean='${coffeeBean1}' AND flavor='${flavor1}' AND rating=${rating1}
    
    return(
        <View style={styles.container}> 
            <Text>Update Screen</Text>
            <Text style={styles.textInBox}>{storeName1}</Text>
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
            <Text style={styles.buttonText}>Update</Text>
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
    },
    textInBox:{
        width:"70%",
        paddingLeft:10,
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        textAlign:"left",
        textAlignVertical:"center",
        backgroundColor:"#ccc",
        
    }

  });