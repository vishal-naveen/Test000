/* eslint-disable prettier/prettier */
import React from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn'

export default function DonationFinish({navigation}) {


    return (
      <KeyboardAvoidingView style={{backgroundColor:'#09172d'}}>
        <View style={{alignItems:'center', justifyContent:'center', height:"100%"}}>
          <View style={{alignItems:'center', bottom:145}}>
            <AuthHeader color='#dfd1b8' title={'Thank You!'}/>
          </View>
          <View style={{bottom:100, right:130}}>
            <Text style={{color:'white', textDecorationLine:'underline', fontSize:25}}>Summary</Text>
          </View>
          <View style={{width:'60%', alignItems:'center', bottom:100, flexDirection:'row', right:20}}>
            <View style={{width:'40%', bottom:10, left:20}}>
                
            </View>
            <View style={{top:10, right:140, justifyContent:'space-between'}}>
                <Text style={{color:'white', fontSize:15}}>Date:</Text>
                <Text style={{color:'white'}}>Time:</Text>
                <Text style={{color:'white'}}>Location</Text>
                <Text style={{color:'white'}}>Items Scanned:</Text>
            </View>
            <View style={{top:140, width:'100%', right:130}}>
                <Buttons height={51} fontS={15} borderRa={8} color='black' textC='#dfd1b8' onPress={()=>navigation.navigate('Homeh')} title={'Send To Email'} />
                <Text style={{color:'white', fontSize:18, left:8}}>--------------or--------------</Text>
                <Buttons height={51} fontS={15} borderRa={8} color='black' textC='#dfd1b8' onPress={()=>navigation.navigate('Homeh')} title={'No Thank You'} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}