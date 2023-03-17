/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export default function Buttons(props){
    const{title} = props
    return (
      <TouchableOpacity
        style={{
          width: '75%',
          backgroundColor: 'rgb(230,105,110)',
          paddingVertical: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 15, color: 'gray', top: 15, left: 0}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
}
