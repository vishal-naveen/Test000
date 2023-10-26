/* eslint-disable prettier/prettier */
import { firebase } from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors, {getDate, getStartTime,getEndTime, getSortedDateList} from './util';

const database = firebase
  .app()
  .database('https://hurricane-help-default-rtdb.firebaseio.com/');

export default function SearchScreen() {
  const navigation = useNavigation();

  const [date, setDate] = useState(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [items, setItems] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [mainData, setMainData] = useState({});

  useEffect(() => {
    try {
      database
        .ref('/HurricaneDatabase/SummaryDonation/')
        .once('value')
        .then(snapshot => {
          let dataBaseData = snapshot.val();
          if (dataBaseData) {
            let futureDates = getFutureDates(dataBaseData);
            const mySet1 = new Set();
            futureDates?.map(item => {
              // console.log(dataBaseData?.[item]);
              mySet1.add(getDate(item));
            });

            setItems(getSortedDateList([...mySet1]));

            // setItems(futureDates);
            setMainData({...dataBaseData});
          }
        });
    } catch (error) {}
  }, []);

  function getFutureDates(mainData = null) {
    var dateArray = new Array();

    const list = mainData && Object.keys(mainData);

    const  currentDate = moment(moment().format('MM-DD-YYYY'), 'MM-DD-YYYY').toDate()
    while (list.length > 0) {
      const date = list.shift();
      if (moment(date, 'MM-DD-YYYY').toDate() >= currentDate)
        dateArray.push(date);
    }
    return dateArray;
  }

    // console.log("-=-=-", pieData)
    const getPartiCularDateData = date => {
      let arr = [];
      mainData &&
        Object.keys(mainData)?.map(dateKey => {
          console.log("==>>",dateKey,date,dateKey.includes(date));
          if (dateKey.includes(date) > 0) {
            mainData?.[dateKey] &&
              Object.keys(mainData?.[dateKey])?.map(locKey => {
                arr.push({
                  date: dateKey,
                  location: locKey,
                });
              });
          }
        });
  


        setOpenDatePicker(false);
        setDate(date);
        setLocationList(arr);
    };

  return (
    <SafeAreaView style={styles.parentView}>
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:100}} enableOnAndroid>
        <View style={{padding: 10,alignItems:"center"}}>

        <Text
            style={{
              fontSize: 32,
              marginTop: 10,
              color: '#dfd1b8',
              alignSelf: 'center',
            }}>
            Search Screen
          </Text>

          <TouchableOpacity
            onPress={() => {
              setOpenDatePicker(true);
            }}
            style={{
              padding: 12,
              margin: 10,
              marginTop: 30,
              borderColor: '#dfd1b8',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderRadius: 8,
              width:"90%"
            }}>
            <Text style={{fontSize: 15, color: '#dfd1b8', alignSelf: 'center'}}>
              {!!date ? date : 'Select Date'}
            </Text>
            <Image
              source={require('../../down-arrow.png')}
              resizeMode="contain"
              style={{
                height: 15,
                width: 15,
                tintColor: '#dfd1b8',
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>

          {!!date && (
            <View style={styles.table}>
              <View style={[styles.row, {backgroundColor: '#dfd1b8'}]}>
                <Text style={[styles.cell, styles.heading]}>Date</Text>
                <View style={styles.border} />
                <Text style={[styles.cell, styles.heading,{flex:0.6}]}>Start Time</Text>
                <View style={styles.border} />
                <Text style={[styles.cell, styles.heading,{flex:0.6}]}>End Time</Text>
                <View style={styles.border} />
                <Text style={[styles.cell, styles.heading]}>Location</Text>
              </View>
              <View style={styles.hBorder} />

              {locationList?.map((item,index) => {
                return (
                  <View key={index+""}>
                    <View style={styles.row}>
                      <Text style={styles.cell}>{getDate(item?.date)}</Text>
                      <View style={styles.border} />
                      <Text style={[styles.cell,,{flex:0.6}]}>{getStartTime(item?.date)}</Text>
                      <View style={styles.border} />
                      <Text style={[styles.cell,,{flex:0.6}]}>{getEndTime(item?.date)}</Text>
                      <View style={styles.border} />
                      <Text style={[styles.cell]}>{item.location}</Text>
                    </View>
                    <View style={styles.hBorder} />
                  </View>
                );
              })}
            </View>
          )}

          <Modal
            animationType={'slide'}
            transparent={true}
            visible={openDatePicker}
            onRequestClose={() => {
              setOpenDatePicker(false);
            }}>
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
                  maxHeight: '70%',
                  width: '90%',
                  margin: 10,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 20,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 10,
                    color: '#09172d',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                  }}>
                  Select Date
                </Text>

                {items.length == 0 && (
                  <>
                    <View
                      style={{
                        height: 1,
                        marginTop: 10,
                        width: '100%',
                        backgroundColor: '#09172d',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        marginVertical: 50,
                        color: '#09172d',
                        alignSelf: 'center',
                        fontWeight: 'normal',
                      }}>
                      Sorry, No location found
                    </Text>
                  </>
                )}

                <ScrollView
                  style={{width: '100%'}}
                  showsVerticalScrollIndicator={false}>
                  {items.map(i => {
                    return (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                       getPartiCularDateData(i)
                        }}
                        style={{flex: 1}}>
                        <View
                          style={{
                            height: 1,
                            marginTop: 10,
                            width: '100%',
                            backgroundColor: '#09172d',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            marginTop: 10,
                            color: '#09172d',
                            alignSelf: 'center',
                            fontWeight: date == i ? 'bold' : 'normal',
                          }}>
                          {i}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity
            onPress={() => {
              navigation?.goBack()
            }}
            style={{
              padding: 12,
              marginHorizontal: 20,
              marginTop: 30,
              borderColor: '#09172d',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderRadius: 8,
              width:"90%",
              position:"absolute",
              bottom:50,
              backgroundColor:"#dfd1b8",
              alignSelf:"center"
            }}>
            <Text style={{fontSize: 15, color: '#09172d', alignSelf: 'center'}}>
              Back
            </Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parentView: {flex: 1, backgroundColor: '#09172d'},
  table: {
    borderWidth: 1,
    borderColor: '#09172d',
    marginBottom: 10,
    marginTop: 30,
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#09172d',
    // borderWidth: 1,
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 13,
    color: '#09172d',
    borderColor: '#09172d',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hBorder: {
    width: '100%',
    height: 1,
    backgroundColor: '#09172d',
  },
  border: {
    width: 2,
    height: '100%',
    backgroundColor: '#09172d',
  },
});
