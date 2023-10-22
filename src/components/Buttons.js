/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {constants} from "../constants"

export default function Buttons(props){
    const{title, onPress, color , textC, fontS, borderRa, height, onPressIn, width='75%'} = props
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={onPressIn}
        style={{
          width: width,
          height:height,
          backgroundColor: color,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical:10,
          borderRadius:borderRa,
          

        }}>
        <Text style={{fontSize: fontS, color:textC}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
}
