import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import  {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {Rating, AirbnbRating} from 'react-native-ratings'
import { useState } from 'react';

const COFFEE_IMAGE = require('../assets/coffee_bean.png')
export default function createScreen({navigation}){
    const [rate, setRate] = useState()
    const [store, setStore] = useState("")
    const [coffeeBean, setCoffeeBean] = useState("")
    return(
        <View style={styles.container}> 
            <Text>Create Screen</Text>
            <TextInput 
            style={styles.input}
            placeholder="Shop name" 
            onChangeText={text=>setStore(text)}
            />     
            <TextInput 
            style={styles.input} 
            placeholder="Coffee Bean Type" 
            onChangeText={text=>setCoffeeBean(text)}
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
     height: 40, 
     borderColor: 'gray', 
     borderWidth: 1,
    }
  });