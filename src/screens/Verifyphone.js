/* eslint-disable prettier/prettier */
import React from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';

export default function VerifyPhone() {
    return (
      <KeyboardAvoidingView style={{backgroundColor:'#09172d'}}>
        <View style={{alignItems:'center', justifyContent:'center', height:"100%"}}>
          <View style={{alignItems:'center', bottom:145}}>
            <Image style={{width:150, height:150}} source={{uri:"https://www.transparentpng.com/thumb/hurricane/through-the-eyes-of-hurricanes-png-0.png"}}/>
          </View>
         <View style={{width: "100%", alignItems:'center', justifyContent:'center', bottom:50}}>
            <Text style={{color:'white', fontSize:16, bottom: 15}}>Phone Number: *******</Text>
            <TInput color='#dfd1b8' placer={'6-digit code'} />
            <Buttons height={41} fontS={15} borderRa={8} color='black' textC='#dfd1b8' onPress={()=>{alert("Hello")}} title={'Verify'} />
          </View>
          <View style={{top:-42, left: 2}}>
            <Buttons height={41} fontS={15} borderRa={8} color='#09172d' textC='#7e90ac' onPress={()=>{alert("Hello")}} title={'Resend Verification code: x seconds'} />
          </View>
          <View style={{}}>
            <Text style={{fontSize:15, right:110, top:205, color:'white'}}>Wrong Phone Number?</Text>
          </View>
          <View style={{top:175, left: 2}}>
            <Buttons height={41} fontS={15} borderRa={8} color='#09172d' textC='#7e90ac' onPress={()=>{alert("Hello")}} title={'Go back'} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}