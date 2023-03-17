/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TextInput, Text} from 'react-native'

export default function TInput(props) {
    const {placer} = props
     return (
       <View
         style={{
           borderWidth: 1,
           borderColor: '#000',
           width: '80%',
           marginBottom: 20,
         }}>
         <TextInput placeholder={placer} />
       </View>
     );
}