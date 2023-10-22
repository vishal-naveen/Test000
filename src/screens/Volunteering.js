/* eslint-disable prettier/prettier */
import React from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function Volunteering({}) {
  const navigation = useNavigation();

    return (
      <KeyboardAvoidingView style={{backgroundColor:'#09172d'}}>
        <TouchableOpacity style={{position:'absolute', top:0, left:0, width:40, zIndex:10}} >
          <Buttons fontS={25} height={50} color='#09172d' textC='white' title={'<'} onPress={()=>navigation.goBack()}/>
        </TouchableOpacity>
        <View style={{alignItems:'center', justifyContent:'center', height:"100%"}}>
          <View style={{alignItems:'center', bottom:145}}>
            <AuthHeader color='#dfd1b8' title={'Volunteer'}/>
            <Text style={{color:'white'}}>Help Collect Food!</Text>
          </View>
          <View style={{width:'60%', alignItems:'center', bottom:100, flexDirection:'row', right:20}}>
          <View style={{height: 100, width: 300}}>
                <GooglePlacesAutocomplete
                  placeholder="Location Of Pickup"
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    // console.log('data',JSON.stringify(data));
                    console.log(JSON.stringify(details?.geometry?.location));
                  }}
                  query={{
                    key: 'AIzaSyDyqDQyayPKhjQPuvwuDAcOkzF8rS5cw28',
                    language: 'en',
                  }}
                  fetchDetails={true}
                  listHoverColor="#09172d"
                  backgroundColor="#09172d"
                  textInputProps={{
                    backgroundColor: 'white',
                  }}
                />
              </View>
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