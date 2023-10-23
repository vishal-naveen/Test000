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
         <View style={{width: "100%", alignItems:'center', justifyContent:'center', bottom:40}}>
            <TInput color='#dfd1b8' onChangeText={(text)=>{console.log(text)}} placer={'Email'} />
            <Buttons height={41} fontS={15} borderRa={8} color='black' textC='#dfd1b8' onPress={()=>navigation.navigate('ResetPassPh')} title={'Submit'} />
            <Buttons height={41} fontS={15} borderRa={8} color='#09172d' textC='#7e90ac' title={'Cancel'} onPress={()=>navigation.navigate('ResetPassPh')}/>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}