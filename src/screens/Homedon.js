/* eslint-disable prettier/prettier */
import React,{useState} from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert, StyleSheet, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn'

import { useNavigation } from '@react-navigation/native';
import {firebase} from '@react-native-firebase/database';



const database = firebase
  .app()
  .database('https://hurricane-help-default-rtdb.firebaseio.com/');




export default function Homedon({navigation}) {

  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [location3, setLocation3] = useState('');
  const [location4, setLocation4] = useState('');
  const [location5, setLocation5] = useState('');
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState('');
  const [date4, setDate4] = useState('');
  const [date5, setDate5] = useState('');

  const [off, setOff] = useState(true);


  if (off == true){
    database
    .ref('/HurricaneDatabase/LocationForDrives/Location1')
    .once('value')
    .then(snapshot => {
      setLocation1(snapshot.val())
      console.log(location1)
    });
    database
    .ref('/HurricaneDatabase/LocationForDrives/Location2')
    .once('value')
    .then(snapshot => {
      setLocation2(snapshot.val())
      console.log(location2)
    });
    database
    .ref('/HurricaneDatabase/LocationForDrives/Location3')
    .once('value')
    .then(snapshot => {
      setLocation3(snapshot.val())
      console.log(location3)
    });
    database
    .ref('/HurricaneDatabase/LocationForDrives/Location4')
    .once('value')
    .then(snapshot => {
      setLocation4(snapshot.val())
      console.log(location4)
    });
    database
    .ref('/HurricaneDatabase/LocationForDrives/Location5')
    .once('value')
    .then(snapshot => {
      setLocation5(snapshot.val())
      console.log(location5)
    });
    database
    .ref('/HurricaneDatabase/LocationForDrives/Date1')
    .once('value')
    .then(snapshot => {
      setDate1(snapshot.val())
      console.log(date1)
    });
    database
    .ref('/HurricaneDatabase/LocationForDrives/Date2')
    .once('value')
    .then(snapshot => {
      setDate2(snapshot.val())
      console.log(date2)
    });
    database
    .ref('/HurricaneDatabase/LocationForDrives/Date3')
    .once('value')
    .then(snapshot => {
      setDate3(snapshot.val())
      console.log(date3)
    });
    database
    .ref('/HurricaneDatabase/LocationForDrives/Date4')
    .once('value')
    .then(snapshot => {
      setDate4(snapshot.val())
      console.log(date4)
    });
    database
    .ref('/HurricaneDatabase/LocationForDrives/Date5')
    .once('value')
    .then(snapshot => {
      setDate5(snapshot.val())
      console.log(date5)
    });

    setOff(false)
  }

    return (
      <KeyboardAvoidingView style={{backgroundColor: '#09172d'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <View style={{alignItems: 'center', bottom: 5}}>
            <Text style={{fontSize: 37, color: '#dfd1b8'}}>Hurrican Help</Text>
          </View>
          <View style={{bottom: -15}}>
            <Text
              style={{
                fontSize: 40,
                color: '#7e90ac',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              1,000
              <Text
                style={{
                  fontSize: 40,
                  color: '#7e90ac',
                  fontWeight: 'normal',
                  textAlign: 'center',
                }}>
                {' '}
                packeges donated
              </Text>
            </Text>
          </View>
          <View style={{top:40}}>
          <View >
            <Text style={{fontSize: 27, color: 'white', left:85, bottom: 0}} onPress={console.log(location5)}>
              How you can help
            </Text>
            <Text style={{fontSize: 17, color: 'white', left: 75, bottom: 0}}>
              Come to the food drives below
            </Text>
          </View>
          <View style={{borderWidth:2, borderColor:'white', right:0, top:10, width:'95%'}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{color:'white', borderColor:'white', borderWidth:0, padding:10}}>Date</Text>
              <Text style={{height: '100%',width: 2,backgroundColor: 'white',left:50}}></Text>
              <Text style={{left:17, color:'white', borderColor:'white', borderWidth:0, marginLeft:30, marginRight:220, padding:10}}>Location</Text>
            </View>
            <View style={{borderBottomColor:'white',height:1, borderBottomWidth:1}}></View>
            <View style={{flexDirection:'row'}}>
            <Text style={{color:'white', borderColor:'white', borderWidth:0, padding:10}}>{date1}</Text>
              <Text style={{height: '100%',width: 2,backgroundColor: 'white',left:12}}></Text>
              <Text style={{left:-17, color:'white', borderColor:'white', borderWidth:0, marginLeft:30, padding:10}}>{location1}</Text>
            </View>
            <View style={{borderBottomColor:'white',height:1, borderBottomWidth:1}}></View>
            <View style={{flexDirection:'row'}}>
            <Text style={{color:'white', borderColor:'white', borderWidth:0, padding:10}}>{date2}</Text>
              <Text style={{height: '100%',width: 2,backgroundColor: 'white',left:4}}></Text>
              <Text style={{left:-24, color:'white', borderColor:'white', borderWidth:0, marginLeft:30, padding:10}}>{location2}</Text>
            </View>
            <View style={{borderBottomColor:'white',height:1, borderBottomWidth:1}}></View>
            <View style={{flexDirection:'row'}}>
            <Text style={{color:'white', borderColor:'white', borderWidth:0, padding:10}}>{date3}</Text>
              <Text style={{height: '100%',width: 2,backgroundColor: 'white',left:12}}></Text>
              <Text style={{left:-16, color:'white', borderColor:'white', borderWidth:0, marginLeft:30, padding:10}}>{location3}</Text>
            </View>
            <View style={{borderBottomColor:'white',height:1, borderBottomWidth:1}}></View>
            <View style={{flexDirection:'row'}}>
            <Text style={{color:'white', borderColor:'white', borderWidth:0, padding:10}}>{date4}</Text>
              <Text style={{height: '100%',width: 2,backgroundColor: 'white',left:4}}></Text>
              <Text style={{left:-22, color:'white', borderColor:'white', borderWidth:0, marginLeft:30, padding:10}}>{location4}</Text>
            </View>
            <View style={{borderBottomColor:'white',height:1, borderBottomWidth:1}}></View>
            <View style={{flexDirection:'row'}}>
            <Text style={{color:'white', borderColor:'white', borderWidth:0, padding:10}}>{date5}</Text>
              <Text style={{height: '100%',width: 2,backgroundColor: 'white',left:4}}></Text>
              <Text style={{left:-22, color:'white', borderColor:'white', borderWidth:0, marginLeft:30, padding:10}}>{location5}</Text>
            </View>
          </View>
          </View>
          <View style={{bottom: -75, right: 0}}>
            <Text style={{color: '#dfd1b8', fontSize: 30, left: 134}}>
              About Us
            </Text>
            <Text style={{color: '#dfd1b8', fontSize: 17}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. 
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
}
