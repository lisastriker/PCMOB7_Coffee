import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import  {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {Rating, AirbnbRating} from 'react-native-ratings'
import { useState, useEffect } from 'react';



const COFFEE_IMAGE = require('../assets/coffee_bean.png')
export default function createScreen({navigation}){
    const [rate, setRate] = useState()
    const [store, setStore] = useState("")
    const [coffeeBean, setCoffeeBean] = useState("")
    const [flavor, setFlavor] = useState("")

    function removeInputNavigate(){
        navigation.navigate('index', {rate, store, coffeeBean, flavor })
        
    }
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
            <Text>Rate the coffee</Text> 
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
            <TouchableOpacity style={styles.button} onPress={()=>removeInputNavigate()}>
            <Text>Submit</Text>
            </TouchableOpacity> 
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
     width:100,
     height: 40, 
     borderColor: 'gray', 
     borderWidth: 1,
    },
    button:{
        width:100,
        height:30,
        borderColor:"grey",
        color:"black"
    }
  });