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

const dbStorage = 
  storage().ref('gs://hurricane-help.appspot.com');
const database = firebase
  .app()
  .database('https://hurricane-help-default-rtdb.firebaseio.com/');

export default function DonateCamera({navigation}) {
  const [cameraPhoto, setCameraPhoto] = useState();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [text, setText] = useState('Empty');

  const [name, setName] = useState('');

  const [camera1photo, setcamera1photo] = useState(false);
  const [camera2, setcamera2] = useState(false);
  const [camera2photo, setcamera2photo] = useState(false);
  const [camera3, setcamera3] = useState(false);
  const [camera3photo, setcamera3photo] = useState(false);

  useEffect(() => {
    getMyStringValue().then(text => {
      if (text?.length > 0) {
        setName(text);
        console.log('Username ==>>',text)
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

  const showMode = currentmode => {
    setShow(true);
    setMode(currentmode);
  };

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

  let camOptions = {
    saveToPhotos: true,
    mediaType: 'photo',
    maxWidth: 250,
    maxHeight: 250,
  };

  const openCamera1 = async () => {
    openCamera1img();
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(camOptions);
      setCameraPhoto(result.assets[0].uri);
      console.log(result);
    }
  };

  const openCamera1img = () => {
    const timeout = setTimeout(() => {
      setcamera2(true);
    }, 3000);
    const timeout1 = setTimeout(() => {
      setcamera1photo(true);
    }, 2000);
  };

  const openCamera2 = async () => {
    openCamera2img();
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(camOptions);
      setCameraPhoto(result.assets[0].uri);
      console.log(result);
    }
  };

  const openCamera2img = () => {
    const timeout = setTimeout(() => {
      setcamera3(true);
    }, 3000);
    const timeout1 = setTimeout(() => {
      setcamera2photo(true);
    }, 2000);
  };

  const openCamera3 = async () => {
    openCamera3img();
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(camOptions);
      setCameraPhoto(result.assets[0].uri);
      console.log(result);
    }
  };

  const openCamera3img = () => {
    const timeout = setTimeout(() => {
      setcamera3photo(true);
    }, 2000);
  };

  function finishp() {
    setStringValue(name);

    database
      .ref('/HurricaneDatabase/Donater/' + name)
      .set({
        pickupD: date.toLocaleDateString(),
        pickupT: date.toLocaleTimeString(),
      })
      .then(() =>
        console.log(
          'Data set.' + date.toLocaleDateString() + date.toLocaleTimeString(),
        ),
      );
  }

  const setStringValue = async value => {
    try {
      AsyncStorage.setItem('name', value);
    } catch (e) {
      // save error
    }

    console.log('Done.');
  };

  const upload = async () => {
    //cameraPhoto
    const filename = cameraPhoto.substring(cameraPhoto.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? cameraPhoto.replace('file://', '') : cameraPhoto;
    const metaData = {contentType: 'image/jpeg'};
    const task = dbStorage.putFile(uploadUri, metaData);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    task.then(() => {
      console.log('Image uploaded to the bucket!');
    //   const data = {
    //     filename: filename,
    //     photo: res.downloadURL, // retrieve image URL
    //   };
    //    database
    // .ref('/HurricaneDatabase/Donater/' + name)
    // .set(
    //   data
    // )
    // .then(() =>
    //   {
      alert('file 1 is saved successfully')
    // }
    // );
    });
    // const res = await dbStorage
    //   .putFile(uploadUri, metaData); // put image file to GCS
    // return res;
  };
  // const userId = firebase.auth().currentUser.uid;
  // const res = await upload(`absolute/path/to/image.JPG`, `image.JPG`, `image/jpeg`); // function in step 1
  // const data = {
  //     name: 'User Name'
  //     photo: res.downloadURL, // retrieve image URL
  // };
  // firebase.database().ref('users/' + userId).set(data);
  // const filename = uri.substring(uri.lastIndexOf('/') + 1);
  //   const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  //   setUploading(true);
  //   setTransferred(0);
  //   const task = storage()
  //     .ref(filename)
  //     .putFile(uploadUri);

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
          {camera1photo ? (
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
                source={{uri: cameraPhoto}}
              />
            </TouchableOpacity>
          ) : null}
          <View>
            {camera2 ? (
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
                {camera2photo ? (
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
                      source={{uri: cameraPhoto}}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
          </View>
          <View>
            {camera3 ? (
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
                {camera3photo ? (
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
                      source={{uri: cameraPhoto}}
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
          onPress={() =>{ 
            upload();

            // navigation.navigate('DonationFinish')
          }}
            title={'Save Images'}
        />
      </View>
    </View>
  );
}
