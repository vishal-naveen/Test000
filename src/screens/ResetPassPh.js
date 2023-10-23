/* eslint-disable prettier/prettier */
import React from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';

export default function ResetPassEm({navigation}) {


    return (
      <KeyboardAvoidingView style={{backgroundColor:'#09172d'}}>
        <View style={{alignItems:'center', justifyContent:'center', height:"100%"}}>
          <View style={{alignItems:'center', bottom:145}}>
            <Image style={{width:150, height:150}} source={{uri:"https://www.transparentpng.com/thumb/hurricane/through-the-eyes-of-hurricanes-png-0.png"}}/>
            <AuthHeader color='#dfd1b8' title={'Hurricane Help'}/>
          </View>
         <Text style={{color:'white', fontSize:18}}>Please check your email for futher instructions</Text>
         <View style={{width:'75%', padding:10,left:40, top:10}}>
         <Buttons height={41} fontS={15} borderRa={8} color='black' textC='#dfd1b8' onPress={()=>navigation.navigate('Login')} title={'Login'} />
         </View>
        </View>
      </KeyboardAvoidingView>
    );
}