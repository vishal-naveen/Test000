/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn'
import  DateTimePicker from '@react-native-community/datetimepicker';

import { firebase } from '@react-native-firebase/database';

const database = firebase
  .app()
  .database('https://hurricane-help-default-rtdb.firebaseio.com/')



export default function Donate({navigation}) {
  


   
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    const [mode, setMode] = useState("date")
    const [text, setText] = useState('Empty')


    const showMode = (currentmode) => {
      setShow(true)
      setMode(currentmode)
    }

    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };

    const onChangei = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };

    function finishp () {
      
      
        database.ref("/HurricaneDatabase/Donater").set({
          pickupD: date.toLocaleDateString(),
          pickupT: date.toLocaleTimeString(),
        })
        .then(() => console.log('Data set.' + date.toLocaleDateString() + date.toLocaleTimeString()));
        
      
    }


    return (
      <KeyboardAvoidingView style={{backgroundColor:'#09172d'}}>
        <View style={{alignItems:'center', justifyContent:'center', height:"100%"}}>

          <View style={{alignItems:'center', bottom:145}}>
            <AuthHeader color='#dfd1b8' title={'Donatea'}/> 
            <Text style={{color:'white'}}>Thank You For Donating!</Text>
          </View>
          <View style={{width:'90%', bottom:100, alignItems:'center'}}>
            <TInput color='#dfd1b8' onChangeText={(text)=>{console.log(text)}} placer={'Name'} />
            <TInput color='#dfd1b8' onChangeText={(text)=>{console.log(text)}} placer={'Phone Number/Email'} />
          </View>
          <View style={{right:40, bottom:60}}>
            <Text style={{color:'white', fontSize:17}}>Items: Scan</Text>

            <Text style={{color:'white', fontSize:17}} onPress={showDatepicker}>Pick-up Date: </Text>
            <Text style={{color:'white', fontSize:17}} onPress={showTimepicker}>Pick-up Time: </Text>
            <Text style={{color:'white', fontSize:17}}>Location Of Pickup: </Text>
            <Text style={{color:'white'}}>selected: {date.toLocaleDateString()}</Text>
          </View>
          <View style={{width:'60%', flexDirection:'row', right:57, top:20}}>
            <View style={{right:10, width:'100%'}}>
                <Buttons height={51} fontS={15} borderRa={8} color='black' textC='#dfd1b8' onPress={()=>navigation.navigate('DonationFinish')} onPressIn={finishp()} title={'Finish'} />
            </View>
            <View style={{right:50, width:'100%'}}>
            <Buttons height={51} fontS={15} borderRa={8} color='black' textC='#dfd1b8' onPress={() => showMode('time')} title={'Cancel'} />
            </View>
            <View>
              
            </View>
        <View style={{width:300, alignItems:'center', top:180}}>
            <Text style={{right:450, color:'white'}}>By clicking Finish you are agreeing to our </Text>
            <View style={{right:450}}>
                <Buttons height={51} fontS={15} borderRa={8} color='#09172d' textC='#7e90ac' onPress={()=>navigation.navigate('Homeh')} title={'Terms And Conditions.'} />
            </View>
            {show && (
              <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChangei}
              />
            )}
        </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}