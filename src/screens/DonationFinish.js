/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn'
import { firebase } from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';


const database = firebase
  .app()
  .database('https://hurricane-help-default-rtdb.firebaseio.com/')


export default function DonationFinish({navigation, route}) {


  const {Category1,Category2,Category3,DateQ, location, Quantity1,Quantity2,Quantity3} = route.params;

  const [date, setDate] = useState('')
  const [category1a, setCategory1a] = useState('')
  const [category2a, setCategory2a] = useState('')
  const [category3a, setCategory3a] = useState('')




  useEffect(() => {
    database.ref("/HurricaneDatabase/Donater/").once('value')
        .then(snapshot => {
          console.log('User data: ', snapshot.val());
          const donators = snapshot.val();

          Object.keys(donators).map(item=>{
            console.log(item,donators?.[item])
            })
        });
    getMyStringValue().then((text)=>{
      if (text?.length>0){
        database.ref("/HurricaneDatabase/Donater/"+text).once('value')
        .then(snapshot => {
          console.log('User data: ', snapshot.val());
          setDate(snapshot.val())
        });
      }
    })
  
    return () => {
      
    }
  }, [])
  const getMyStringValue = async () => {
    try {
      return await AsyncStorage.getItem('name')
    } catch(e) {
      // read error
    }
  
    console.log('Done.')
  }


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
                <Text style={{color:'white', fontSize:15}}>Date: {DateQ}</Text>
                <Text style={{color:'white'}}>Location: {location}</Text>
                <Text style={{color:'white'}}>Items and Quantity:</Text>
                {Category1.length>0 && Quantity1.length>0 ? (<Text style={{color:'white'}}>  -{Category1} : {Quantity1}</Text>) : null}
                {Category2.length>0 && Quantity2.length>0 ? (<Text style={{color:'white'}}>  -{Category2} : {Quantity2}</Text>) : null}
                {Category3.length>0 && Quantity3.length>0 ? (<Text style={{color:'white'}}>  -{Category3} : {Quantity3}</Text>) : null}
            </View>
            <View style={{top:140, width:'100%', right:-60,top:160, position:'absolute'}}>
                <Buttons height={51} fontS={15} borderRa={8} color='black' textC='#dfd1b8' onPress={()=>navigation.navigate('Homeh')} title={'Home'} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}