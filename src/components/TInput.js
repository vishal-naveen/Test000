/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TextInput, Text} from 'react-native'

export default function TInput(props) {
    const {placer, onChangeText, color, ...restProps} = props
     return (
       <View
         style={{
           borderWidth: 1,
           borderColor: '#dfd1b8',
           width: '80%',
           marginBottom: 20,
           borderRadius:10,
           paddingLeft:10
         }}>
         <TextInput textAlign='left' placeholderTextColor={color} color={color} onChangeText={onChangeText} placeholder={placer} {...restProps} />
       </View>
     );
}