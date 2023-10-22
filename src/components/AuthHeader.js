/* eslint-disable prettier/prettier */
import React from 'react'
import {Text, Image, View} from 'react-native';

export default function AuthHeader(props){
    const {title, color} = props;
    return (
      <View style={{borderRadius:8,}}>
        <Text style={{fontSize: 30, color: color}}>{title}</Text>
        <Image
          source={'../h.jpg'}
        />
      </View>
    );
}
