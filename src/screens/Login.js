/* eslint-disable prettier/prettier */
import {React, useState} from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn'

import auth from '@react-native-firebase/auth';

export default function Login({navigation}) {


  const [email, setEmail] = useState('Empty');
  const [password, setPassword] = useState('Empty');

  const [loginError, setLoginError] = useState('')

  function loginpro(email,password) {
    auth()
      .signInWithEmailAndPassword(
        email,
        password,
      )
      .then(() => {
        console.log('Logged In!');
        navigation.navigate('Homeh')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-login') {
          console.log('Invalid Login!!!!!!!');
          setLoginError('Invalid Email or Password')
        }

        console.error(error);
      });
  }

    return (
      <KeyboardAvoidingView style={{backgroundColor:'#09172d'}}>
        <View style={{alignItems:'center', justifyContent:'center', height:"100%"}}>
          <View style={{alignItems:'center', bottom:145}}>
            <Image style={{width:150, height:150}} source={{uri:"https://www.transparentpng.com/thumb/hurricane/through-the-eyes-of-hurricanes-png-0.png"}}/>
            <AuthHeader color='#dfd1b8' title={'Hurricane Help'}/>
          </View>
         <View style={{width: "100%", alignItems:'center', justifyContent:'center', bottom:90}}>
            <TInput color='#dfd1b8' onChangeText={(text)=>{setEmail(text)}} placer={'Email'} />
            <PasswordIn color='#dfd1b8' placer={'Password'} onChangeText={(text)=>{setPassword(text)}} />
            <Buttons height={41} fontS={15} borderRa={8} color='black' textC='#dfd1b8' onPress={()=> {loginpro(email,password); setLoginError('')} } title={'Login'} />
            <Buttons height={41} fontS={15} borderRa={8} color='#09172d' textC='#dfd1b8' onPress={()=>navigation.navigate('ResetPassEm')} title={'Reset Password'} />
            <Text style={{color:'white', fontSize:15}}>{loginError}</Text>
          </View>
          <View style={{}}>
            <Text style={{fontSize:15, right:110, top:175, color:'white'}}>Don't have an account?</Text>
          </View>
          <View style={{top:144, left: 25}}>
            <Buttons fontS={15} height={41} color='#09172d' textC='#7e90ac' onPress={()=>navigation.navigate('Homeh')} title={'Create Account'} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}