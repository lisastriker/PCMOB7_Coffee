import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import  {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {Rating} from 'react-native-ratings'
import { useState, useEffect } from 'react';



const COFFEE_IMAGE = require('../assets/coffee_bean.png')
export default function createScreen({navigation, route}){
    const [rate, setRate] = useState()
    const [store, setStore] = useState("")
    const [coffeeBean, setCoffeeBean] = useState("")
    const [flavor, setFlavor] = useState("")
    const receiveStore = route.params?.storeName
    console.log(receiveStore)
    function navigateFromScratch(){
        navigation.navigate('index', {rate, store, coffeeBean, flavor })
        
    }

    function navigateFromStore(){
        navigation.navigate('rank', {receiveStore, coffeeBean, rate, flavor})
    }
    return(
        <View style={styles.container}> 
            <Text>Create Screen</Text>
            {receiveStore ?            
             <TextInput 
            style={styles.input}
            placeholder="Shop name" 
            value={receiveStore}
            onChangeText={text=>setStore(text)}
            />  :
            <TextInput 
            style={styles.input}
            placeholder="Shop name"
            value={store} 
            onChangeText={text=>setStore(text)}
            />  }  
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
            <TouchableOpacity style={styles.button} onPress={receiveStore? ()=>{navigateFromStore() 
                    console.log("store")}: ()=>{navigateFromScratch() 
                        console.log("scratch")}}>
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