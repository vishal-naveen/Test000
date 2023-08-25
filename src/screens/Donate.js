/* eslint-disable prettier/prettier */
import React from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn'

export default function Donate({navigation}) {

 
    return (
      <KeyboardAvoidingView style={{backgroundColor:'#09172d'}}>
        <View style={{alignItems:'center', justifyContent:'center', height:"100%"}}>
          <View style={{alignItems:'center', bottom:225}}>
            <AuthHeader color='#dfd1b8' title={'Donate'}/>
            <Text style={{color:'white'}}>Thank You For Donating!</Text>
          </View>
          <View style={{width:'90%', bottom:140, alignItems:'center'}}>
            <TInput color='#dfd1b8' onChangeText={(text)=>{console.log(text)}} placer={'Name'} />
          </View>
          <View style={{right:40, bottom:100}}>
            <Text style={{color:'white', fontSize:17}}>Items: Scan</Text>
            <Text style={{color:'white', fontSize:17}}>Pick-up Date: </Text>
            <Text style={{color:'white', fontSize:17}}>Pick-up Time: </Text>
            <Text style={{color:'white', fontSize:17}}>Location Of Pickup: </Text>
          </View>
          <View style={{width:'60%', flexDirection:'row', right:57}}>
            <View style={{right:10, width:'100%'}}>
                <Buttons height={51} fontS={15} borderRa={8} color='black' textC='#dfd1b8' onPress={()=>navigation.navigate('DonationFinish')} title={'Finish'} />
            </View>
            <View style={{right:50, width:'100%'}}>
                <Buttons height={51} fontS={15} borderRa={8} color='black' textC='#dfd1b8' onPress={()=>navigation.navigate('Homeh')} title={'Cancel'} />
            </View>
        <View style={{width:300, alignItems:'center', top:200}}>
            <Text style={{right:450, color:'white'}}>By clicking Finish you are agreeing to our </Text>
            <View style={{right:450}}>
                <Buttons height={51} fontS={15} borderRa={8} color='#09172d' textC='#7e90ac' onPress={()=>navigation.navigate('Homeh')} title={'Terms And Conditions.'} />
            </View>
            
        </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}