/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import Buttons from '../components/Buttons';
import {
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Alert,
  Button,
  PermissionsAndroid,
  TouchableOpacity,
  Modal
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
import {formatPhoneNumberIntl} from 'react-phone-number-input';
import {SelectList} from 'react-native-dropdown-select-list';




const database = firebase
  .app()
  .database('https://hurricane-help-default-rtdb.firebaseio.com/');

  // database().ref('/HurricaneDatabase/LocationForDrives/Location1').on('value', snapshot => {
  //   console.log('Dataset: ', snapshot.val())
  // });

export default function DonateCopy({navigation}) {
  const [cameraPhoto, setCameraPhoto] = useState();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [text, setText] = useState('Empty');

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [box2, setBox2] = useState('');
  const [box3, setBox3] = useState('');

  const [box1Cat, setbox1Cat] = useState('');
  const [box1Q, setbox1Q] = useState('');
  const [box2Cat, setbox2Cat] = useState('');
  const [box2Q, setbox2Q] = useState('');
  const [box3Cat, setbox3Cat] = useState('');
  const [box3Q, setbox3Q] = useState('');

  const [box1Catt, setbox1Catt] = useState('Quantity');
  const [box1Qs, setbox1Qs] = useState('');
  const [box2Catt, setbox2Catt] = useState('Quantity');
  const [box2Qs, setbox2Qs] = useState('');
  const [box3Catt, setbox3Catt] = useState('Quantity');
  const [box3Qs, setbox3Qs] = useState('');

  

  const [openPickerC1,setOpenPickerC1] = useState(false);
  const [openPickerC2,setOpenPickerC2] = useState(false);
  const [openPickerCat1,setOpenPickerCat1] = useState(false);
  const [openPickerCat2,setOpenPickerCat2] = useState(false);
  const [openPickerCat3,setOpenPickerCat3] = useState(false);


  useEffect(() => {
    getMyStringValue().then(text => {
      if (text?.length > 0) {
        setName(text);
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

  const [selected, setSelected] = React.useState('');
  const [items, setItems] = useState([
      { label: 'Khanna', value: 'Khanna' },
      { label: 'Ludhiana', value: 'Ludhiana' },
      { label: 'Kanpur', value: 'Kanpur' },
      { label: 'Delhi', value: 'Delhi' },
      { label: 'Mohali', value: 'Mohali' },
      { label: 'Goa', value: 'Goa' },
      { label: 'Dubai', value: 'Dubai' },
      { label: 'USA', value: 'USA' },
      { label: 'Russia', value: 'Russia' },
  ]);
  const data = [
    {key: '1', value: 'Canned Foods'},
    {key: '2', value: 'Baked Goods'},
    {key: '3', value: 'Breakfast Items'},
    {key: '4', value: 'Snacks'},
    {key: '5', value: 'Toiletries'},
    {key: '6', value: 'Other'},
  ];

  const showbox2 = () => {
    setBox2('1');
    console.log(box1Cat);
  };
  const showbox3 = () => {
    setBox3('1');
  };

  const [dateQ, setDateQ] = useState('Date')
  const [locationQ, setLocaitonQ] = useState('Location')

  function finishp() {
    //setStringValue(number)

    database
      .ref('/HurricaneDatabase/Donater/' + 'Location/' + 'Date')
      .update({
        box1Cat,
        box2Cat,
        box3Cat,
      })
      .then(() =>
        console.log(console.log('Data set.' + box1Cat + box2Cat + box3Cat)),
      );
  }

  function box1up(Category12) {
    setbox1Cat(Category12);

    database
      .ref('/HurricaneDatabase/Donater/' + 'Date/' + 'Location/Category1/')
      .update({
        Category12,
      })
      .then(() => console.log(console.log('Data set.' + Category12)));
  }
  function box1Quan(Quantity) {
    database
      .ref('/HurricaneDatabase/Donater/' + 'Date/' + 'Location/Category1/')
      .update({
        Quantity,
      })
      .then(() => console.log(console.log('Data set.' + Quantity)));
  }

  function cancelTest(){
    console.log("box1C: " + box1Cat)
    console.log("box1Q: " + box1Q)
    console.log("box2C: " + box2Cat)
    console.log("box2Q: " + box2Q)
    console.log("box3C: " + box3Cat)
    console.log("box3Q: " + box3Q)
  }

  return (
    <KeyboardAvoidingView style={{backgroundColor: '#09172d'}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <View style={{alignItems: 'center', bottom: 670, position: 'absolute'}}>
          <AuthHeader color="#dfd1b8" title={'Donate'} />
        </View>
        <View
          style={{
            right: 5,
            top: 120,
            flexDirection: 'row',
            position: 'absolute',
          }}>
          <View style={{right: -100, width: '50%'}}>
            <TouchableOpacity
              style={{
                width: '75%',
                height: 46,
                backgroundColor: '#09172d',
                borderRadius: 8,
                borderColor: '#dfd1b8',
                borderWidth: 1,
              }}
              onPress={() => setOpenPickerC1(true)}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#dfd1b8',
                  alignSelf: 'baseline',
                  top: 10,
                  left: 10,
                }}>
                {dateQ}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Modal
              animationType={'slide'}
              transparent={true}
              visible={openPickerC1}
              onRequestClose={() => setOpenPickerC1(false)}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#01223770',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    backgroundColor: '#dfd1b8',
                    height: '50%',
                    width: '90%',
                    margin: 20,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 30,
                      marginTop: 20,
                      color: '#09172d',
                      alignSelf: 'center',
                    }}>
                    Select location
                  </Text>

                  <ScrollView
                    style={{width: '90%'}}
                    showsVerticalScrollIndicator={false}>
                    {items.map(i => {
                      return (
                        <TouchableOpacity
                          key={i.label}
                          onPress={() => {
                            setDateQ(i.label);
                            setOpenPickerC1(false);
                          }}
                          style={{flex: 1}}>
                          <Text
                            style={{
                              fontSize: 20,
                              marginTop: 10,
                              color: '#09172d',
                              alignSelf: 'center',
                              fontWeight: dateQ == i.label ? 'bold' : 'normal',
                            }}>
                            {i.label}
                          </Text>
                          <View
                            style={{
                              height: 1,
                              marginTop: 10,
                              width: '100%',
                              backgroundColor: '#09172d',
                            }}
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
          <View style={{right: -100, width: '50%'}}>
            <TouchableOpacity
              style={{
                width: '75%',
                height: 46,
                backgroundColor: '#09172d',
                borderRadius: 8,
                borderColor: '#dfd1b8',
                borderWidth: 1,
              }}
              onPress={() => setOpenPickerC2(true)}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#dfd1b8',
                  alignSelf: 'baseline',
                  top: 10,
                  left: 10,
                }}>
                {locationQ}
              </Text>
            </TouchableOpacity>
            <View>
              <Modal
                animationType={'slide'}
                transparent={true}
                visible={openPickerC2}
                onRequestClose={() => setOpenPickerC2(false)}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#01223770',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      backgroundColor: '#dfd1b8',
                      height: '50%',
                      width: '90%',
                      margin: 20,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 30,
                        marginTop: 20,
                        color: '#09172d',
                        alignSelf: 'center',
                      }}>
                      Select location
                    </Text>

                    <ScrollView
                      style={{width: '90%'}}
                      showsVerticalScrollIndicator={false}>
                      {items.map(i => {
                        return (
                          <TouchableOpacity
                            key={i.label}
                            onPress={() => {
                              setLocaitonQ(i.label);
                              setOpenPickerC2(false);
                            }}
                            style={{flex: 1}}>
                            <Text
                              style={{
                                fontSize: 20,
                                marginTop: 10,
                                color: '#09172d',
                                alignSelf: 'center',
                                fontWeight:
                                  locationQ == i.label ? 'bold' : 'normal',
                              }}>
                              {i.label}
                            </Text>
                            <View
                              style={{
                                height: 1,
                                marginTop: 10,
                                width: '100%',
                                backgroundColor: '#09172d',
                              }}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            margin: 10,
            height: 80,
            width: '85%',
            borderColor: '#1F3F73',
            borderWidth: 0,
            borderRadius: 10,
            bottom: 110,
            left: 15,
          }}>
          <View style={{right: -100, width: '50%'}}>
            <View style={{right: 70, top: 95}}>
              <TouchableOpacity
                style={{
                  width: '75%',
                  height: 46,
                  backgroundColor: '#09172d',
                  borderRadius: 8,
                  borderColor: '#dfd1b8',
                  borderWidth: 1,
                }}
                onPress={() => setOpenPickerCat1(true)}>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#dfd1b8',
                    alignSelf: 'baseline',
                    top: 10,
                    left: 10,
                  }}>
                  {box1Catt}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Modal
                animationType={'slide'}
                transparent={true}
                visible={openPickerCat1}
                onRequestClose={() => setOpenPickerCat1(false)}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#01223770',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      backgroundColor: '#dfd1b8',
                      height: '50%',
                      width: '90%',
                      margin: 20,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 30,
                        marginTop: 20,
                        color: '#09172d',
                        alignSelf: 'center',
                      }}>
                      Select location
                    </Text>

                    <ScrollView
                      style={{width: '90%'}}
                      showsVerticalScrollIndicator={false}>
                      {items.map(i => {
                        return (
                          <TouchableOpacity
                            key={i.label}
                            onPress={() => {
                              setbox1Catt(i.label);
                              setOpenPickerCat1(false);
                            }}
                            style={{flex: 1}}>
                            <Text
                              style={{
                                fontSize: 20,
                                marginTop: 10,
                                color: '#09172d',
                                alignSelf: 'center',
                                fontWeight:
                                  box1Catt == i.label ? 'bold' : 'normal',
                              }}>
                              {i.label}
                            </Text>
                            <View
                              style={{
                                height: 1,
                                marginTop: 10,
                                width: '100%',
                                backgroundColor: '#09172d',
                              }}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              borderWidth: 1,
              borderRadius: 10,
              width: '30%',
              left: 170,
              bottom: -72,
              height: 47.5,
              borderColor: '#dfd1b8',
              color: '#dfd1b8',
            }}>
            <TextInput
              placeholder="Quantity"
              defaultValue="1"
              placeholderTextColor="#dfd1b8"
              style={{
                color: '#dfd1b8',
              }}
              onChangeText={text => setbox1Q(text)}
            />
          </View>
          <View
            style={{
              height: 30,
              color: 'white',
              fontSize: 50,
              left: 375,
              bottom: -63,
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 5,
              marginLeft: -100,
              width: 24,
              position: 'absolute',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 25,
                alignContent: 'center',
                alignItems: 'center',
                bottom: 5,
                left: 3,
              }}
              onPress={showbox2}>
              +
            </Text>
          </View>
        </View>
        {box2?.length > 0 ? (
          <View
            style={{
              padding: 10,
              margin: 10,
              height: 80,
              width: '85%',
              borderColor: '#1F3F73',
              borderWidth: 0,
              borderRadius: 10,
              bottom: 100,
              left: 15,
            }}>
            <View style={{right: -100, width: '50%'}}>
            <View style={{right: 70, top: 51}}>
              <TouchableOpacity
                style={{
                  width: '75%',
                  height: 46,
                  backgroundColor: '#09172d',
                  borderRadius: 8,
                  borderColor: '#dfd1b8',
                  borderWidth: 1,
                }}
                onPress={() => setOpenPickerCat2(true)}>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#dfd1b8',
                    alignSelf: 'baseline',
                    top: 10,
                    left: 10,
                  }}>
                  {box2Catt}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Modal
                animationType={'slide'}
                transparent={true}
                visible={openPickerCat2}
                onRequestClose={() => setOpenPickerCat2(false)}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#01223770',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      backgroundColor: '#dfd1b8',
                      height: '50%',
                      width: '90%',
                      margin: 20,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 30,
                        marginTop: 20,
                        color: '#09172d',
                        alignSelf: 'center',
                      }}>
                      Select location
                    </Text>

                    <ScrollView
                      style={{width: '90%'}}
                      showsVerticalScrollIndicator={false}>
                      {items.map(i => {
                        return (
                          <TouchableOpacity
                            key={i.label}
                            onPress={() => {
                              setbox2Catt(i.label);
                              setOpenPickerCat2(false);
                            }}
                            style={{flex: 1}}>
                            <Text
                              style={{
                                fontSize: 20,
                                marginTop: 10,
                                color: '#09172d',
                                alignSelf: 'center',
                                fontWeight:
                                  box2Catt == i.label ? 'bold' : 'normal',
                              }}>
                              {i.label}
                            </Text>
                            <View
                              style={{
                                height: 1,
                                marginTop: 10,
                                width: '100%',
                                backgroundColor: '#09172d',
                              }}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                width: '30%',
                left: 170,
                bottom: -27,
                height: 47.5,
                borderColor: '#dfd1b8',
                color: '#dfd1b8',
                position: 'absolute',
              }}>
              <TextInput
                defaultValue="1"
                keyboardType="numeric"
                placeholder="Quantity"
                placeholderTextColor="#dfd1b8"
                style={{color: '#dfd1b8'}}
                onChangeText={text => setbox2Q(text)}
              />
            </View>
            <View
              style={{
                height: 30,
                color: 'white',
                fontSize: 50,
                left: 375,
                bottom: -18,
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 5,
                marginLeft: -100,
                width: 24,
                position: 'absolute',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 25,
                  alignContent: 'center',
                  alignItems: 'center',
                  bottom: 5,
                  left: 3,
                }}
                onPress={showbox3}>
                +
              </Text>
            </View>
          </View>
        ) : null}
        {box3?.length > 0 ? (
          <View
            style={{
              padding: 10,
              margin: 10,
              height: 80,
              width: '85%',
              borderColor: '#1F3F73',
              borderWidth: 0,
              borderRadius: 10,
              bottom: 85,
              left: 15,
            }}>
            <View style={{right: -100, width: '50%'}}>
            <View style={{right: 70, top: 0}}>
              <TouchableOpacity
                style={{
                  width: '75%',
                  height: 46, 
                  backgroundColor: '#09172d',
                  borderRadius: 8,
                  borderColor: '#dfd1b8',
                  borderWidth: 1,
                }}
                onPress={() => setOpenPickerCat3(true)}>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#dfd1b8',
                    alignSelf: 'baseline',
                    top: 10,
                    left: 10,
                  }}>
                  {box3Catt}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Modal
                animationType={'slide'}
                transparent={true}
                visible={openPickerCat3}
                onRequestClose={() => setOpenPickerCat3(false)}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#01223770',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      backgroundColor: '#dfd1b8',
                      height: '50%',
                      width: '90%',
                      margin: 20,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 30,
                        marginTop: 20,
                        color: '#09172d',
                        alignSelf: 'center',
                      }}>
                      Select location
                    </Text>

                    <ScrollView
                      style={{width: '90%'}}
                      showsVerticalScrollIndicator={false}>
                      {items.map(i => {
                        return (
                          <TouchableOpacity
                            key={i.label}
                            onPress={() => {
                              setbox3Catt(i.label);
                              setOpenPickerCat3(false);
                            }}
                            style={{flex: 1}}>
                            <Text
                              style={{
                                fontSize: 20,
                                marginTop: 10,
                                color: '#09172d',
                                alignSelf: 'center',
                                fontWeight:
                                  box3Catt == i.label ? 'bold' : 'normal',
                              }}>
                              {i.label}
                            </Text>
                            <View
                              style={{
                                height: 1,
                                marginTop: 10,
                                width: '100%',
                                backgroundColor: '#09172d',
                              }}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                width: '30%',
                left: 170,
                bottom: 23,
                height: 47.5,
                borderColor: '#dfd1b8',
                color: '#dfd1b8',
                position: 'absolute',
              }}>
              <TextInput
                defaultValue="1"
                keyboardType="numeric"
                placeholder="Quantity"
                placeholderTextColor="#dfd1b8"
                style={{color: '#dfd1b8'}}
                onChangeText={text => setbox3Q(text)}
              />
            </View>
            <View
              style={{
                height: 30,
                color: 'white',
                fontSize: 50,
                left: 375,
                bottom: 32,
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 5,
                marginLeft: -100,
                width: 24,
                position: 'absolute',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 25,
                  alignContent: 'center',
                  alignItems: 'center',
                  bottom: 5,
                  left: 3,
                }}>
                +
              </Text>
            </View>
          </View>
        ) : null}
        <View style={{position: 'absolute', width: 200, left: 120, top: 610}}>
          <Buttons
            height={51}
            fontS={15}
            borderRa={8}
            color="black"
            textC="#dfd1b8"
            // onPress={() => {
            //   finishp();
            //   navigation.navigate('DonateCamera');
            // }}
            onPress={() => {
              setOpenPickerC1(true);
            }}
            title={'Add Photos'}
          />
        </View>
        <View
          style={{
            width: '60%',
            flexDirection: 'row',
            right: 137,
            top: 670,
            position: 'absolute',
          }}>
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
              onPressIn={() => cancelTest()}
              title={'Cancel'}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
