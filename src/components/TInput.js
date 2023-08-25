/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TextInput, Text} from 'react-native'

export default function TInput(props) {
    const {placer, onChangeText, color} = props
     return (
       <View
         style={{
           borderWidth: 1,
           borderColor: 'black',
           width: '80%',
           marginBottom: 20,
           borderRadius:10,
         }}>
         <TextInput textAlign='left' placeholderTextColor={color} color={color} onChangeText={onChangeText} placeholder={placer} />
       </View>
     );
}