/* eslint-disable prettier/prettier */
import React from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn'

export default function Volunteering({navigation}) {


    return (
      <KeyboardAvoidingView style={{backgroundColor:'#09172d'}}>
        <View style={{alignItems:'center', justifyContent:'center', height:"100%"}}>
          <View style={{alignItems:'center', bottom:145}}>
            <AuthHeader color='#dfd1b8' title={'Volunteer'}/>
            <Text style={{color:'white'}}>Help Collect Food!</Text>
          </View>
          <View style={{width:'60%', alignItems:'center', bottom:100, flexDirection:'row', right:20}}>
            <TInput color='#dfd1b8' onChangeText={(text)=>{console.log(text)}} placer={'Location'} />
            <View style={{width:'40%', bottom:10, left:20}}>
                <Buttons height={51} fontS={15} borderRa={8} color='black' textC='#dfd1b8' onPress={()=>navigation.navigate('Homeh')} title={'Search'} />
            </View>
            <View style={{top:85, right:330, justifyContent:'space-between'}}>
                <Text style={{color:'white', fontSize:15}}>Locations found near you:</Text>
                <Text style={{color:'white'}}>Location 1 - 1688 Ave(10 miles)</Text>
                <Text style={{color:'white'}}>Location 2 - </Text>
                <Text style={{color:'white'}}>Location 3 - </Text>
                <Text style={{color:'white'}}>Location 4 - </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}