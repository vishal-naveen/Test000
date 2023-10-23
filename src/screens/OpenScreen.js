/* eslint-disable prettier/prettier */
import {React, useState} from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn'

import auth from '@react-native-firebase/auth';

export default function openScreen({navigation}) {

    return (
      <KeyboardAvoidingView style={{backgroundColor:'#09172d'}}>
        <View style={{alignItems:'center', justifyContent:'center', height:"100%"}}>
          <View style={{alignItems:'center', bottom:145}}>
            <Image style={{width:150, height:150}} source={{uri:"https://www.transparentpng.com/thumb/hurricane/through-the-eyes-of-hurricanes-png-0.png"}}/>
            <AuthHeader color='#dfd1b8' title={'HIM'}/>
            <Text style={{color:'#dfd1b8', fontSize:15}}>Hurricane Inventory Management</Text>
          </View>
         <View style={{width: "85%", alignItems:'center', justifyContent:'center', bottom:90}}>
            <Buttons height={55} fontS={17} borderRa={8} color='black' textC='#dfd1b8' title={'Donate'} onPress={()=>navigation.navigate('Homedon')}/>
            <View style={{width: "100%", alignItems:'center', justifyContent:'center', bottom:90,top:20}}>
            <Buttons height={55} fontS={17} borderRa={8} color='black' textC='#dfd1b8' title={'Volunteer'} onPress={()=>navigation.navigate('Login')}/>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}