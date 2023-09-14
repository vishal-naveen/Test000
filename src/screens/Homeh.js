/* eslint-disable prettier/prettier */
import React from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert, StyleSheet, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn'

import { useNavigation } from '@react-navigation/native';

export default function Homeh({}) {

  const navigation = useNavigation();

    return (
      <KeyboardAvoidingView style={{backgroundColor:'#09172d'}}>
        <View style={{alignItems:'center', justifyContent:'center', height:"100%"}}>
          <View style={{alignItems:'center', bottom:95}}>
            <Text style={{fontSize:37, color:'#dfd1b8'}}>Hurrican Help</Text>
          </View>
          <View style={{bottom:40}}>
            <Text style={{fontSize:40, color:'#7e90ac', fontWeight:'bold', textAlign:'center'}}>
             1,000 
              <Text style={{fontSize:40, color:'#7e90ac', fontWeight:'normal', textAlign:'center'}}> packeges donated</Text>
            </Text>
          </View>
          <View>
            <Text style={{fontSize:27, color:'white', right:0, bottom:0}}>How you can help</Text>
          </View>
          <View style={{width:225, height:100, flexDirection:'row', bottom:-20, right:70}}>
            <Buttons height={61} onPress={()=>navigation.navigate('Volunteering')} fontS={15} borderRa={8} color='black' textC='#7e90ac' title="Start Volunteering"/>
            <View style={{width:225, height:100, left:20}}>
              <Buttons height={61} fontS={15} borderRa={8} color='black' textC='#7e90ac' title="Donate" onPress={()=>navigation.navigate('Donate')}/>
            </View>
          </View>
          <View style={{bottom:-75, right:0}}>
            <Text style={{color:'#dfd1b8', fontSize:30, left:134}}>About Us</Text>
            <Text style={{color:'#dfd1b8', fontSize:17, }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}
