/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TextInput, Text, Platform} from 'react-native'

export default function TInput(props) {
    const {placer, onChangeText, color} = props
     return (
       <View
         style={Platform.OS =="android"? {
           borderWidth: 1,
           borderColor: '#dfd1b8',
           width: '80%',
           marginBottom: 20,
           borderRadius:10,
           paddingLeft:10
         }:{
          borderWidth: 1,
          borderColor: '#dfd1b8',
          width: '80%',
          marginBottom: 20,
          borderRadius:10,
          paddingLeft:10,
          height:40,justifyContent:"center"
        }}>
         <TextInput textAlign='left' placeholderTextColor={color} color={color} onChangeText={onChangeText} placeholder={placer} secureTextEntry={true}/>
       </View>
     );
}