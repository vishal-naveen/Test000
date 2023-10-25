/* eslint-disable prettier/prettier */
import {React, useState} from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn'

import auth from '@react-native-firebase/auth';

export default function SplashScreen({navigation}) {

    return (
      <KeyboardAvoidingView style={{backgroundColor:'#09172d'}}>
        <View style={{alignItems:'center', justifyContent:'center', height:"100%"}}>
          <View style={{alignItems:'center'}}>
            <Image style={{width:150, height:150}} source={{uri:"https://www.transparentpng.com/thumb/hurricane/through-the-eyes-of-hurricanes-png-0.png"}}/>
            <AuthHeader color='#dfd1b8' title={'HIM'}/>
            <ActivityIndicator style={{marginTop:20}} size='large' color={'#dfd1b8'}/>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}