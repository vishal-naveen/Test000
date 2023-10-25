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
          <View style={{alignItems:'center', bottom:145,marginTop:50}}>
            <Image style={{width:130, height:130,marginBottom:20}} source={{uri:"https://www.transparentpng.com/thumb/hurricane/through-the-eyes-of-hurricanes-png-0.png"}}/>
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
            <Text style={{fontSize:15, color:'white'}}>Don't have an account? <Text onPress={()=>navigation.navigate('Homeh')} style={{color:'#7e90ac'}}> Create Account</Text></Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}