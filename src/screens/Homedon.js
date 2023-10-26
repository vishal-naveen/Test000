/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {firebase} from '@react-native-firebase/database';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import Colors, {getDate, getStartTime,getEndTime, getSortedDateList} from './util';

const database = firebase
  .app()
  .database('https://hurricane-help-default-rtdb.firebaseio.com/');

export default function Homedon({}) {
  const navigation = useNavigation();

  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    try {
      database
        .ref('/HurricaneDatabase/SummaryDonation/')
        .once('value')
        .then(snapshot => {
          let dataBaseData = snapshot.val();

          if (dataBaseData) {
            let futureDates = getFutureDates(dataBaseData);

            let arr = [];
            futureDates?.length > 0 &&
              futureDates?.map(item => {
                dataBaseData?.[item] &&
                  Object.keys(dataBaseData?.[item])?.map(locItem => {
                    arr.push({
                      date: item,
                      location: locItem,
                    });
                  });
              });

            arr =
              arr?.length > 0
                ? arr.sort(function (a, b) {
                    var keyA = moment(a.date, 'MM-DD-YYYY HH:mm').toDate(),
                      keyB = moment(b.date, 'MM-DD-YYYY HH:mm').toDate();
                    // Compare the 2 dates
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                  })
                : [];

            setLocationList(arr?.splice(0, 5));
          }
        });
    } catch (error) {}
  }, []);

  function getFutureDates(mainData = null) {
    var dateArray = new Array();
    const list = mainData && Object.keys(mainData);

    const currentDate = moment(
      moment().format('MM-DD-YYYY'),
      'MM-DD-YYYY',
    ).toDate();
    while (list.length > 0) {
      const date = list.shift();
      if (moment(date, 'MM-DD-YYYY').toDate() >= currentDate)
        dateArray.push(date);
    }
    return dateArray;
  }

  return (
    <KeyboardAvoidingView style={{backgroundColor: '#09172d'}}>
      <View
        style={{
          // alignItems: 'center',
          // justifyContent: 'center',
          height: '100%',
          width: '100%',
          paddingHorizontal: 16,
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={{fontSize: 37, color: '#dfd1b8'}}>Hurrican Help</Text>
        </View>

        <View style={{marginTop: 40}}>
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
        <View style={{marginTop: 30, width: '100%'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 27, color: '#dfd1b8'}} onPress={() => {}}>
              How you can help
            </Text>
            <Text style={{fontSize: 17, color: '#dfd1b8'}}>
              Come to the food drives below
            </Text>
          </View>
          <View style={styles.table}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SearchScreen');
              }}
              style={{
                right: 0,
                top: -50,
                position: 'absolute',
                height: 50,
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#dfd1b8',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomWidth: 2,
                borderColor: '#09172d',
                zIndex: 1,
              }}>
              <Text style={{fontSize: 30, color: '#000'}}>
                {' '}
                &#x1F50E;&#xFE0E;
              </Text>
            </TouchableOpacity>
            <View style={[styles.row, {backgroundColor: '#dfd1b8'}]}>
              <Text style={[styles.cell, styles.heading]}>Date</Text>
              <View style={styles.border} />
              <Text style={[styles.cell, styles.heading, {flex: 0.6}]}>
                Start Time
              </Text>
              <View style={styles.border} />
              <Text style={[styles.cell, styles.heading, {flex: 0.6}]}>
                End Time
              </Text>
              <View style={styles.border} />
              <Text style={[styles.cell, styles.heading]}>Location</Text>
            </View>
            <View style={styles.hBorder} />

            {locationList?.map((item, index) => {
              return (
                <View key={index + ''}>
                  <View style={styles.row}>
                    <Text style={styles.cell}>{getDate(item?.date)}</Text>
                    <View style={styles.border} />
                    <Text style={[styles.cell, , {flex: 0.6}]}>
                      {getStartTime(item?.date)}
                    </Text>
                    <View style={styles.border} />
                    <Text style={[styles.cell, , {flex: 0.6}]}>
                      {getEndTime(item?.date)}
                    </Text>
                    <View style={styles.border} />
                    <Text style={[styles.cell]}>{item.location}</Text>
                  </View>
                  <View style={styles.hBorder} />
                </View>
              );
            })}
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text style={{color: '#dfd1b8', fontSize: 30}}>About Us</Text>
          <Text style={{color: '#dfd1b8', fontSize: 16, textAlign: 'center'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  parentView: {flex: 1, backgroundColor: '#09172d'},
  table: {
    borderWidth: 1,
    borderColor: '#09172d',
    marginBottom: 10,
    marginTop: 70,
    width: '100%',
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
