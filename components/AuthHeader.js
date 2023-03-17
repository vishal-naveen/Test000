/* eslint-disable prettier/prettier */
import React from 'react'
import {Text, Image, View} from 'react-native';

export default function AuthHeader(props){
    const {title} = props;
    return (
      <View>
        <Text style={{fontSize: 30, color: 'black'}}>{title}</Text>
        <Image
          source={'../h.jpg'}
        />
      </View>
    );
}
