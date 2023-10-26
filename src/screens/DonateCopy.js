/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Buttons from '../components/Buttons';

import {firebase} from '@react-native-firebase/database';
import moment from 'moment';
import { getDate, getEndTime, getSortedDateList, getStartTime } from './util';

const database = firebase
  .app()
  .database('https://hurricane-help-default-rtdb.firebaseio.com/');

database
  .ref('/HurricaneDatabase/LocationForDrives/Location1')
  .once('value')
  .then(snapshot => {
    console.log('User data: ', snapshot.val());
  });

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
  const [box1Q, setbox1Q] = useState('1');
  const [box2Cat, setbox2Cat] = useState('');
  const [box2Q, setbox2Q] = useState('1');
  const [box3Cat, setbox3Cat] = useState('');
  const [box3Q, setbox3Q] = useState('1');

  const [box1Catt, setbox1Catt] = useState('');
  const [box1Qs, setbox1Qs] = useState('');
  const [box2Catt, setbox2Catt] = useState('');
  const [box2Qs, setbox2Qs] = useState('');
  const [box3Catt, setbox3Catt] = useState('');
  const [box3Qs, setbox3Qs] = useState('');

  const [openPickerC1, setOpenPickerC1] = useState(false);
  const [openPickerC2, setOpenPickerC2] = useState(false);
  const [openPickerCat1, setOpenPickerCat1] = useState(false);
  const [openPickerCat2, setOpenPickerCat2] = useState(false);
  const [openPickerCat3, setOpenPickerCat3] = useState(false);

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
  const [items, setItems] = useState([]);
  const [driveDate, setDriveDate] = useState([]);
  const [driveLocation, setDriveLocation] = useState([]);

  useEffect(() => {
    try {
      database
        .ref('/HurricaneDatabase/HardCodedData/')
        .once('value')
        .then(snapshot => {
          let dataBaseData = snapshot.val();
          if (dataBaseData) {
            let futureDates = getFutureDates(dataBaseData.dates);
            const mySet1 = new Set();
            futureDates?.map(item => {
              mySet1.add(item);
            });

            setDriveDate(getSortedDateList([...mySet1]));
            setDriveLocation(dataBaseData.locations);
            setItems(dataBaseData.categoryItems);
          }
        });
    } catch (error) {}
  }, []);

  function getFutureDates(list = []) {
    var dateArray = new Array();
    const currentDate = moment(
      moment().format('MM-DD-YYYY'),
      'MM-DD-YYYY',
    ).toDate();
    while (list.length > 0) {
      const date = list.shift();
      // console.log("======>>>>>>", moment(date, 'MM-DD-YYYY').toDate() , moment().toDate() );
      if (moment(date, 'MM-DD-YYYY').toDate() >= currentDate)
        dateArray.push(date);
    }
    return dateArray;
  }

  const showbox2 = () => {
    setBox2('1');
    console.log(box1Cat);
  };
  const showbox3 = () => {
    setBox3('1');
  };

  const [dateQ, setDateQ] = useState('Date');
  const [locationQ, setLocaitonQ] = useState('Location');

  function finishp(date, location, box1c, box2c, box3c, box1q, box2q, box3q) {
    //setStringValue(number)

    // database
    //   .ref('/HurricaneDatabase/SummaryDonation/' +date +'/' +location)
    //   .once('value')
    //   .then(snapshot => {
    //     console.log('User data1abc: ', snapshot.val());
    //   });

    // database
    //   .ref(
    //     '/HurricaneDatabase/SummaryDonation/' +date +'/' +location,
    //   )
    //   .update({
    //     ...(box1c.length>0 && {[box1c]:box1q}),
    //     ...(box2c.length>0 && {[box2c]:box2q}),
    //     ...(box3c.length>0 && {[box3c]:box3q}),
    //   })
    //   .then(() => console.log('Data set. 1'));

    database
      .ref('/HurricaneDatabase/SummaryDonation/' + date + '/' + location)
      .once('value')
      .then(snapshot => {
        const dataBaseData = snapshot.val();
        const box1TotalQuantity = dataBaseData?.[box1c] ?? 0;
        const box2TotalQuantity = dataBaseData?.[box2c] ?? 0;
        const box3TotalQuantity = dataBaseData?.[box2c] ?? 0;

        database
          .ref('/HurricaneDatabase/SummaryDonation/' + date + '/' + location)
          .update({
            ...(box1c.length > 0 && {[box1c]: +box1TotalQuantity + +box1q}),
            ...(box2c.length > 0 && {[box2c]: +box2TotalQuantity + +box2q}),
            ...(box3c.length > 0 && {[box3c]: +box3TotalQuantity + +box3q}),
          })
          .then(() => console.log('Data set. 1'));
      });
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

  function cancelTest() {
    console.log('box1C: ' + box1Cat);
    console.log('box1Q: ' + box1Q);
    console.log('box2C: ' + box2Cat);
    console.log('box2Q: ' + box2Q);
    console.log('box3C: ' + box3Cat);
    console.log('box3Q: ' + box3Q);
  }

  return (
    <KeyboardAvoidingView style={{backgroundColor: '#09172d'}}>
      <View style={{alignItems: 'center', marginTop: 30}}>
        <Text style={{fontSize: 25, color: '#dfd1b8'}}>
          Add Donation Details
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <View
          style={{
            right: 5,
            top: 120,
            flexDirection: 'row',
            position: 'absolute',
          }}>
          <View style={{right: -35, width: '50%'}}>
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
                      marginVertical: 20,
                      color: '#09172d',
                      alignSelf: 'center',
                    }}>
                    Select Date
                  </Text>

                  <ScrollView
                    style={{width: '90%'}}
                    contentContainerStyle={{paddingBottom:16}}
                    showsVerticalScrollIndicator={false}>
                    {driveDate.map(i => {
                      return (
                        <View key={i+""}>
                               <View
                            style={{
                              height: 1,
                              marginBottom:10,
                              width: '100%',
                              backgroundColor: '#09172d',
                            }}
                          />
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            setDateQ(i);
                            setOpenPickerC1(false);
                          }}
                          style={{flex: 1,marginBottom:10}}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: '#09172d',
                              alignSelf: 'center',
                              fontWeight: dateQ == i ? 'bold' : 'normal',
                            }}>
                            {getDate(i)}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#09172d',
                              alignSelf: 'center',
                              fontWeight: dateQ == i ? 'bold' : 'normal',
                            }}>
                            Start Time : {getStartTime(i)+'\n'}  End Time : {getEndTime(i)}
                          </Text>
                     
                        </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
          <View style={{right: -30, width: '50%'}}>
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
                      {driveLocation.map(i => {
                        return (
                          <TouchableOpacity
                            key={i.label}
                            onPress={() => {
                              setLocaitonQ(i);
                              setOpenPickerC2(false);
                            }}
                            style={{flex: 1}}>
                            <Text
                              style={{
                                fontSize: 20,
                                marginTop: 10,
                                color: '#09172d',
                                alignSelf: 'center',
                                fontWeight: locationQ == i ? 'bold' : 'normal',
                              }}>
                              {i}
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
            <View style={{right: 100, top: 95, marginRight: 10}}>
              <TouchableOpacity
                style={{
                  width: '95%',
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
                  {box1Catt.length > 0 ? box1Catt : 'Quantity'}
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
                      Select Category
                    </Text>

                    <ScrollView
                      style={{width: '90%'}}
                      showsVerticalScrollIndicator={false}>
                      {items.map(i => {
                        return (
                          <TouchableOpacity
                            key={i}
                            onPress={() => {
                              setbox1Catt(i);
                              console.log(box1Q);
                              setOpenPickerCat1(false);
                            }}
                            style={{flex: 1}}>
                            <Text
                              style={{
                                fontSize: 20,
                                marginTop: 10,
                                color: '#09172d',
                                alignSelf: 'center',
                                fontWeight: box1Catt == i ? 'bold' : 'normal',
                              }}>
                              {i}
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
              keyboardType="numeric"
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
              <View style={{right: 100, top: 51}}>
                <TouchableOpacity
                  style={{
                    width: '95%',
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
                    {box2Catt.length > 0 ? box2Catt : 'Quantity'}
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
                        Select Category
                      </Text>

                      <ScrollView
                        style={{width: '90%'}}
                        showsVerticalScrollIndicator={false}>
                        {items.map(i => {
                          return (
                            <TouchableOpacity
                              key={i}
                              onPress={() => {
                                setbox2Catt(i);
                                console.log(box2Q);
                                setOpenPickerCat2(false);
                              }}
                              style={{flex: 1}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  marginTop: 10,
                                  color: '#09172d',
                                  alignSelf: 'center',
                                  fontWeight: box2Catt == i ? 'bold' : 'normal',
                                }}>
                                {i}
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
              <View style={{right: 100, top: 0}}>
                <TouchableOpacity
                  style={{
                    width: '95%',
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
                    {box3Catt.length > 0 ? box3Catt : 'Quantity'}
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
                        Select Category
                      </Text>

                      <ScrollView
                        style={{width: '90%'}}
                        showsVerticalScrollIndicator={false}>
                        {items.map(i => {
                          return (
                            <TouchableOpacity
                              key={i}
                              onPress={() => {
                                setbox3Catt(i);
                                console.log(box3Q);
                                setOpenPickerCat3(false);
                              }}
                              style={{flex: 1}}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  marginTop: 10,
                                  color: '#09172d',
                                  alignSelf: 'center',
                                  fontWeight: box3Catt == i ? 'bold' : 'normal',
                                }}>
                                {i}
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
        <View
          style={{
            position: 'absolute',
            width: 200,
            top: 610,
            alignItems: 'center',
          }}>
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
              onPress={() =>
                navigation.navigate('DonationFinish', {
                  Quantity3: box3Q,
                  Quantity2: box2Q,
                  Quantity1: box1Q,
                  location: locationQ,
                  DateQ: dateQ,
                  Category1: box1Catt,
                  Category2: box2Catt,
                  Category3: box3Catt,
                })
              }
              onPressIn={() =>
                finishp(
                  dateQ,
                  locationQ,
                  box1Catt,
                  box2Catt,
                  box3Catt,
                  box1Q,
                  box2Q,
                  box3Q,
                )
              }
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
