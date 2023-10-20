/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import Buttons from '../components/Buttons';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Alert,
  Button,
  PermissionsAndroid,
  TouchableOpacity,
  ViewBase,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {firebase} from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

const dbStorage = storage().ref('gs://camera1');
const database = firebase
  .app()
  .database('https://hurricane-help-default-rtdb.firebaseio.com/');

export default function DonateCamera({navigation}) {
  const [loader, setLoader] = useState(false);
  const [cameraPhoto1, setCameraPhoto1] = useState('');
  const [cameraPhoto2, setCameraPhoto2] = useState('');
  const [cameraPhoto3, setCameraPhoto3] = useState('');

  const [name, setName] = useState('');

  useEffect(() => {
    getMyStringValue().then(text => {
      if (text?.length > 0) {
        setName(text);
        console.log('Username ==>>', text);
        database.ref("/HurricaneDatabase/Donater/"+text).once('value')
        .then(snapshot => {
          const data = snapshot?.val();
          // setCameraPhoto1(data?.camera1)
          // setCameraPhoto2(data?.camera2)
          // setCameraPhoto3(data?.camera3)
        });
      }
    });


    return () => {};
  }, []);


  const getMyStringValue = async () => {
    try {
      return await AsyncStorage.getItem('name');
    } catch (e) {
      // read error
    }

    console.log('Done.');
  };

  let camOptions = {
    saveToPhotos: true,
    mediaType: 'photo',
    maxWidth: 250,
    maxHeight: 250,
  };

  const openCamera1 = async () => {
    //openCamera1img();
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(camOptions);
      setCameraPhoto1(result.assets[0].uri);
      console.log(result);
    }
  };


  const openCamera2 = async () => {
    //openCamera2img();
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(camOptions);
      setCameraPhoto2(result.assets[0].uri);
      console.log(result);
    }
  };


  const openCamera3 = async () => {
    //openCamera3img();
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(camOptions);
      setCameraPhoto3(result.assets[0].uri);
      console.log(result);
    }
  };




  const getCloudStorageRef = filename => {
    const dbStorage = storage().ref('gs://' + name + '/' + filename);
    return dbStorage;
  };

  const upload = async (cameraPhoto, filename) => {
    return new Promise((res, reject) => {
      //cameraPhoto
      if (cameraPhoto?.length <= 0 && cameraPhoto?.includes("firebase")) {
        return res('');
      }
      const uploadUri =
        Platform.OS === 'ios'
          ? cameraPhoto.replace('file://', '')
          : cameraPhoto;
      const metaData = {contentType: 'image/jpeg'};
      const task = getCloudStorageRef(filename).putFile(uploadUri, metaData);

      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      task.then(async () => {
        const url = await getCloudStorageRef(filename).getDownloadURL();
        database
          .ref('/HurricaneDatabase/Donater/' + name + '/' + filename)
          .set(url)
          .then(() => {
            return res(filename + 'is uploaded successfully');
          });
      });
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#09172d'}}>
      <ScrollView contentContainerStyle={{paddingBottom: 90}}>
        <View
          style={{
            height: '100%',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginBottom: 10,
            }}>
            <AuthHeader color="#dfd1b8" title={'Donator Images'} />
            <Text style={{color: 'white'}}>Thank You For Donating!</Text>
          </View>
          <Buttons
            height={51}
            width={150}
            fontS={15}
            borderRa={8}
            color="black"
            textC="#dfd1b8"
            onPress={openCamera1}
            title={'Camera 1'}
          />
          {cameraPhoto1?.length>0 ? (
            <TouchableOpacity>
              <Image
                style={{
                  height: 200,
                  width: 200,
                  backgroundColor: 'white',
                  borderColor: 'white',
                  borderWidth: 5,
                  marginVertical: 10,
                }}
                source={{uri: cameraPhoto1}}
              />
            </TouchableOpacity>
          ) : null}
          <View>
          {cameraPhoto1?.length>0 ? (
              <View>
                <Buttons
                  height={51}
                  fontS={15}
                  width={150}
                  borderRa={8}
                  color="black"
                  textC="#dfd1b8"
                  onPress={openCamera2}
                  title={'Camera 2'}
                />
                {cameraPhoto2?.length>0 ? (
                  <TouchableOpacity>
                    <Image
                      style={{
                        height: 200,
                        width: 200,
                        backgroundColor: 'white',
                        borderColor: 'white',
                        borderWidth: 5,
                        marginVertical: 10,
                      }}
                      source={{uri: cameraPhoto2}}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
          </View>
          <View>
          {cameraPhoto2?.length>0 ? (
              <View>
                <Buttons
                  height={51}
                  fontS={15}
                  borderRa={8}
                  color="black"
                  width={150}
                  textC="#dfd1b8"
                  onPress={openCamera3}
                  title={'Camera 3'}
                />
                {cameraPhoto3?.length>0 ? (
                  <TouchableOpacity>
                    <Image
                      style={{
                        height: 200,
                        width: 200,
                        backgroundColor: 'white',
                        borderColor: 'white',
                        borderWidth: 5,
                        marginVertical: 10,
                      }}
                      source={{uri: cameraPhoto3}}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 20,
          alignItems: 'center',
        }}>
        <Buttons
          height={51}
          fontS={15}
          borderRa={8}
          color="black"
          textC="#dfd1b8"
          onPress={async () => {
            setLoader(true);
            await upload(cameraPhoto1, 'camera1');
            await upload(cameraPhoto2, 'camera2');
            await upload(cameraPhoto3, 'camera3');
            setLoader(false);
            alert('images uploaded successfully');
            // navigation.navigate('DonationFinish')
          }}
          title={'Finish'}
        />
      </View>
      {loader && (
        <View
          style={{
            backgroundColor: '#0009',
            position: 'absolute',
            left: 0,
            bottom: 0,
            top: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="white" />
          <Text style={{color: 'white', fontSize: 16}}>
            Image Uploading In-progress
          </Text>
        </View>
      )}
    </View>
  );
}
