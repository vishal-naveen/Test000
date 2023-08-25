/* eslint-disable prettier/prettier */
import React from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn'

export default function SignUp({navigation}) {
    return (
      <KeyboardAvoidingView style={{backgroundColor:'#09172d'}}>
        <View style={{alignItems:'center', justifyContent:'center', height:"100%"}}>
          <View style={{alignItems:'center', bottom:145}}>
            <Image style={{width:150, height:150, right:110, top:90}} source={{uri:"https://www.transparentpng.com/thumb/hurricane/through-the-eyes-of-hurricanes-png-0.png"}}/>
            <View style={{bottom:0, left:50}}>
              <AuthHeader color='#dfd1b8' title={'Hurricane Help'}/>
            </View>
          </View>
         <View style={{width: "100%", alignItems:'center', justifyContent:'center', bottom:50}}>
            <TInput color='#dfd1b8' onChangeText={(text)=>{console.log(text)}} placer={'Username'} />
            <TInput color='#dfd1b8' placer={'Email'} />
            <TInput color='#dfd1b8' placer={'Phone Number'} />
            <PasswordIn color='#dfd1b8' placer={'Password'} />
            <PasswordIn color='#dfd1b8' placer={'Re-enter Password'} />
            <Buttons height={41} fontS={15} borderRa={8} color='black' textC='#dfd1b8' onPress={()=>{alert("Hello")}} title={'Sign Up'} />
          </View>
          <View style={{}}>
            <Text style={{fontSize:15, right:110, top:75, color:'white'}}>Already have an account?</Text>
          </View>
          <View style={{top:44, left: 5}}>
            <Buttons height={41} fontS={15} borderRa={8} color='#09172d' textC='#7e90ac' onPress={()=>navigation.navigate('Login')} title={'Login'} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}