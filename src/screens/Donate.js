/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert, Button, PermissionsAndroid, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn'
import  DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { firebase } from '@react-native-firebase/database';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

const database = firebase
  .app()
  .database('https://hurricane-help-default-rtdb.firebaseio.com/')



export default function Donate({navigation}) {
  

    const [cameraPhoto, setCameraPhoto] = useState()
   
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    const [mode, setMode] = useState("date")
    const [text, setText] = useState('Empty')

    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    useEffect(() => {
      getMyStringValue().then((text)=>{
        if (text?.length>0){
          setName(text)
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
        setStringValue(name)
        //setStringValue(number)
      
        database.ref("/HurricaneDatabase/Donater/"+name).update({
          pickupD: date.toLocaleDateString(),
          pickupT: date.toLocaleTimeString(),
        })
        .then(() => console.log('Data set.' + date.toLocaleDateString() + date.toLocaleTimeString()));
        
      
    }

    const setStringValue = async (value) => {
      try {
        AsyncStorage.setItem('name', value)
      } catch(e) {
        // save error
      }
    
      console.log('Done.')
    }

    return (
      <KeyboardAvoidingView style={{backgroundColor: '#09172d'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <View style={{alignItems: 'center', bottom: 145}}>
            <AuthHeader color="#dfd1b8" title={'Donate'} />
            <Text style={{color: 'white'}}>Thank You For Donating!</Text>
          </View>
          <View style={{width: '90%', bottom: 100, alignItems: 'center'}}>
            <TInput
              color="#dfd1b8"
              onChangeText={text => {
                setName(text);
                // setStringValue(text)
              }}
              placer={'Name'}
              value={name}
            />
            <TInput
              color="#dfd1b8"
              onChangeText={text => {
                setNumber(text);
              }}
              placer={'Phone Number'}
            />
          </View>
          <View style={{right: 40, bottom: 60}}>
            <Text
              style={{color: 'white', fontSize: 17}}
              onPress={() => {
                finishp();
                navigation.navigate('DonateCamera');
              }}>
              Items: Scan
            </Text>
            {/* <Buttons
              height={51}
              fontS={15}
              borderRa={8}
              color="black"
              textC="#dfd1b8"
              onPress={openCamera}
              title={'Camera'}
            />
            {cameraPhoto?.length > 0 && (
              <TouchableOpacity>
                <Image
                  style={{height: 200, width: 200, backgroundColor: 'white'}}
                  source={{uri: cameraPhoto}}
                />
              </TouchableOpacity>
            )} */}
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{color: 'white', fontSize: 17}}
                onPress={showDatepicker}>
                Pick-up Date:{' '}
              </Text>
              <Text style={{color: 'white'}}>{date.toLocaleDateString()}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{color: 'white', fontSize: 17}}
                onPress={showTimepicker}>
                Pick-up Time:{' '}
              </Text>
              <Text style={{color: 'white'}}>{date.toLocaleTimeString()}</Text>
            </View>
            <View>
              <View style={{height: 100, width: 300}}>
                <GooglePlacesAutocomplete
                  placeholder="Location Of Pickup"
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log('data',JSON.stringify(data));
                    console.log('details',JSON.stringify(details.description));
                  }}
                  query={{
                    key: 'AIzaSyDyqDQyayPKhjQPuvwuDAcOkzF8rS5cw28',
                    language: 'en',
                  }}
                  listHoverColor="#09172d"
                  backgroundColor="#09172d"
                  textInputProps={{
                    backgroundColor: 'white',
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{width: '60%', flexDirection: 'row', right: 57, top: 20}}>
            <View style={{right: 10, width: '100%'}}>
              <Buttons
                height={51}
                fontS={15}
                borderRa={8}
                color="black"
                textC="#dfd1b8"
                onPress={() => navigation.navigate('DonationFinish')}
                onPressIn={() => finishp()}
                title={'Finish'}
              />
            </View>
            <View style={{right: 50, width: '100%'}}>
              <Buttons
                height={51}
                fontS={15}
                borderRa={8}
                color="black"
                textC="#dfd1b8"
                onPress={() => navigation.navigate('Homeh')}
                title={'Cancel'}
              />
            </View>
            <View></View>
            <View style={{width: 300, alignItems: 'center', top: 180}}>
              <Text style={{right: 450, color: 'white'}}>
                By clicking Finish you are agreeing to our{' '}
              </Text>
              <View style={{right: 450}}>
                <Buttons
                  height={51}
                  fontS={15}
                  borderRa={8}
                  color="#09172d"
                  textC="#7e90ac"
                  onPress={() => navigation.navigate('Homeh')}
                  title={'Terms And Conditions.'}
                />
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
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