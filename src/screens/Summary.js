/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import Buttons from '../components/Buttons';
import {
  Text,
  View,
  LayoutAnimation,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import PieChart from 'react-native-pie-chart';
import BarChartScreen from '../components/BarChart';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {firebase} from '@react-native-firebase/database';
import moment from 'moment';
import Colors from './util';

const database = firebase
  .app()
  .database('https://hurricane-help-default-rtdb.firebaseio.com/');

export default function Summary() {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);

  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openLocationPicker, setOpenLocationPicker] = useState(false);

  const [location, setLocation] = useState('');
  const [items, setItems] = useState([]);
  const [totalCountData, setTotalCountData] = useState(0);
  const widthAndHeight = 250;
  const [pieData, setPieData] = useState([]);
  const [xValues, setXvalues] = useState([]);
  const [yValues, setYvalues] = useState([]);

  const [mainData, setMainData] = useState({});
  const [top5List, settop5List] = useState([]);

  const refBar = useRef();

  // console.log("Selected Date-=-=-", new Date(date).toISOString().slice(0, 10).toString().split("-").reverse().join("-"))
  // console.log("Selected Location-=-=-", location)
  // console.log("total count-=-=-", totalCountData)

  useEffect(() => {
    // setXvalues(['Khanna', 'Delhi', 'Jagadri', 'Mohali', 'Ahmedgarh']);
    // setYvalues([{y: 125}, {y: 50}, {y: 99}, {y: 12}, {y: 110}]);
    setLoader(true);
    try {
      database
        .ref('/HurricaneDatabase/SummaryDonation/')
        .once('value')
        .then(snapshot => {
          let dataBaseData = snapshot.val();
          //   console.log("==>>>",dataBaseData);

          if (dataBaseData) {
            setMainData({...dataBaseData});

            let pastDatesList = getPastDates(dataBaseData);

            let arr = [];
            pastDatesList?.length > 0 &&
              pastDatesList?.map(item => {
                // console.log(dataBaseData?.[item]);

                dataBaseData?.[item] &&
                  Object.keys(dataBaseData?.[item])?.map(locItem => {
                    const categoryList = dataBaseData?.[item]?.[locItem];
                    let totalCount = 0;
                    categoryList &&
                      Object.keys(categoryList)?.map(catItem => {
                        totalCount = +totalCount + +categoryList[catItem];
                        // categoryList.totalCount = totalCount;
                      });
                    arr.push({
                      totalCount,
                      date: item,
                      location: locItem,
                    });
                  });
              });

            arr =
              arr?.length > 0
                ? arr.sort(function (a, b) {
                    var keyA = a.totalCount,
                      keyB = b.totalCount;
                    // Compare the 2 dates
                    if (keyA > keyB) return -1;
                    if (keyA < keyB) return 1;
                    return 0;
                  })
                : [];

            const xValues = [];
            const yValues = [];
            const top5 = arr?.slice(0, 5);
            settop5List(top5);
            top5?.map(item => {
              xValues.push(item?.date);
              yValues.push(item?.totalCount);
            });

            console.log(xValues);
            console.log(yValues);
            setXvalues(xValues);
            setYvalues(yValues);
          }
          setLoader(false);
        });
    } catch (error) {
      setLoader(false);
    }
  }, []);

  try {
  } catch (error) {}

  function getPastDates(mainData = null, currentDate = moment().toDate()) {
    var dateArray = new Array();

    const list = mainData && Object.keys(mainData);

    while (list.length > 0) {
      const date = list.shift();
      // console.log("======>>>>>>", moment(date, 'MM-DD-YYYY').toDate() , moment().toDate() );

      if (moment(date, 'MM-DD-YYYY HH:mm').toDate() < currentDate)
        dateArray.push(date);
    }
    return dateArray;
  }

  function calculatePercentage(pieDataResponse) {
    let totalCount = 0;
    pieDataResponse.map(i => {
      totalCount += +i.count;
    });
    console.log('*******************', totalCount);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTotalCountData(totalCount);
    setPieData(
      pieDataResponse.map(i => {
        i.percentage = parseInt((i.count / totalCount) * 100);
        return i;
      }),
    );
  }
  // console.log("-=-=-", pieData)

  const locationData = mainData?.[date]?.[location];
  if (loader)
    return (
      <>
        <View
          style={[
            styles.parentView,
            {
              position: 'absolute',
              left: 0,
              bottom: 0,
              top: 0,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            },
          ]}>
          <ActivityIndicator size="large" color="white" />
        </View>
        <Text
          style={{
            fontSize: 32,
            marginTop: 20,
            color: '#dfd1b8',
            alignSelf: 'center',
          }}>
          Dashboard Summary
        </Text>
      </>
    );

  return (
    <SafeAreaView style={styles.parentView}>
      <KeyboardAwareScrollView enableOnAndroid>
        <View style={{padding: 10}}>
          <Text
            style={{
              fontSize: 32,
              marginTop: 10,
              color: '#dfd1b8',
              alignSelf: 'center',
            }}>
            Dashboard Summary
          </Text>

          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                const dList = getPastDates(mainData);
                setItems([...dList]);
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
                borderRadius:8
              }}>
              <Text
                style={{fontSize: 15, color: '#dfd1b8', alignSelf: 'center'}}>
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
              <>
                <TouchableOpacity
                  onPress={() => {
                    const lList =
                      mainData?.[date] && Object.keys(mainData?.[date]);
                    setItems([...lList]);
                    setOpenLocationPicker(true);
                  }}
                  style={{
                    padding: 12,
                    margin: 10,
                    borderColor: '#dfd1b8',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    borderRadius:8
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      maxWidth: '80%',
                      color: '#dfd1b8',
                      alignSelf: 'center',
                    }}>
                    {!!location ? location : 'Select Location'}
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
                <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!location)
                        return Alert.alert('Please select date and location');

                      const locationData = mainData?.[date]?.[location];

                      let res = [];
                      locationData &&
                        Object.keys(locationData)?.map(item => {
                          res.push({
                            type: item,
                            count: +locationData?.[item],
                            color: Colors.random(),
                            percentage: 0,
                          });
                        });

                      calculatePercentage(res);
                    }}
                    style={{
                      borderRadius: 10,
                      flex: 0.5,
                      paddingVertical: 10,
                      backgroundColor: '#dfd1b8',
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: '#09172d',
                        fontWeight: 'bold',
                        fontSize: 18,
                        alignSelf: 'center',
                      }}>
                      {'Search'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDate(null);
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      calculatePercentage([]);
                      setLocation('');
                    }}
                    style={{
                      marginLeft: 10,
                      flex: 0.5,
                      borderRadius: 10,
                      paddingVertical: 10,
                      backgroundColor: '#dfd1b8',
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: '#09172d',
                        alignSelf: 'center',
                      }}>
                      {'Reset'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

          <View
            style={{
              marginVertical: 20,
              alignSelf: 'center',
              width: '100%',
            }}>
            {!!location && totalCountData != 0 && (
              <View style={{width: '100%'}}>
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={pieData.map(i => i.percentage)}
                  sliceColor={pieData.map(i => i.color)}
                />
                <View
                  style={{
                    width: '100%',
                    position: 'absolute',
                    transform: [{scale: 0.6}],
                    right: -120,
                    top: 100,
                  }}>
                  {pieData.map((i, index) => {
                    return (
                      <View
                        key={index.toString()}
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignSelf: 'center',
                          marginTop: index == 0 ? 20 : 3,
                          alignItems: 'center',
                        }}>
                        <View style={{flex: 0.4, alignItems: 'flex-end'}}>
                          <View
                            style={{
                              height: 15,
                              width: 15,
                              backgroundColor: i.color,
                              borderColor: 'white',
                              borderWidth: 0.5,
                            }}
                          />
                        </View>
                        <View style={{flex: 0.6}}>
                          <Text
                            style={{
                              marginLeft: 5,
                              color: 'white',
                              textAlign: 'left',
                            }}>
                            {i.type} ({i.percentage + ' %'})
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            {!!location && totalCountData != 0 ? (
              <View style={{flex: 1, alignItems: 'center'}}>
                <View style={styles.table}>
                  <View style={[styles.row, {backgroundColor: '#dfd1b8'}]}>
                    <Text style={[styles.cell, styles.heading]}>Category</Text>
                    <View style={styles.border} />
                    <Text style={[styles.cell, styles.heading]}>Quantity</Text>
                  </View>
                  <View style={styles.hBorder} />

                  {locationData &&
                    Object.keys(locationData)?.map(item => {
                      const isLast = item == 'totalCount';
                      return (
                        <>
                          <View style={styles.row}>
                            <Text
                              style={[styles.cell, isLast && styles.heading]}>
                              {isLast ? 'Total Count' : item}
                            </Text>
                            <View style={styles.border} />
                            <Text
                              style={[styles.cell, isLast && styles.heading]}>
                              {locationData?.[item]}
                            </Text>
                          </View>
                          <View style={styles.hBorder} />
                        </>
                      );
                    })}
                </View>
              </View>
            ) : xValues.length > 0 && yValues.length > 0 ? (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#dfd1b8',
                    alignSelf: 'center',
                    textDecorationLine: 'underline',
                  }}>
                  Top 5 Donator Locations
                </Text>

                <View
                  style={{
                    backgroundColor: 'red',
                    marginVertical: 20,
                    height: heightPercentageToDP(35),
                    width: '90%',
                    alignSelf: 'center',
                  }}>
                  <BarChartScreen
                    ref={refBar}
                    yValues={yValues}
                    xValues={xValues}
                  />
                </View>
                <View style={styles.table}>
                  <View style={[styles.row, {backgroundColor: '#dfd1b8'}]}>
                    <Text style={[styles.cell, styles.heading]}>Date</Text>
                    <View style={styles.border} />

                    <Text style={[styles.cell, styles.heading]}>Location</Text>
                    <View style={styles.border} />

                    <Text style={[styles.cell, styles.heading]}>
                      Total Quantity
                    </Text>
                  </View>
                  <View style={styles.hBorder} />

                  {top5List?.map(item => {
                    return (
                      <>
                        <View style={styles.row}>
                          <Text style={styles.cell}>{item?.date}</Text>
                          <View style={styles.border} />
                          <Text style={[styles.cell]}>{item.location}</Text>
                          <View style={styles.border} />
                          <Text style={styles.cell}>{item.totalCount}</Text>
                        </View>
                        <View style={styles.hBorder} />
                      </>
                    );
                  })}
                </View>
              </View>
            ) : (
              <View
                style={{
                  marginBottom: 20,
                  height: heightPercentageToDP(35),
                  width: '90%',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 120,
                    color: '#dfd1b8',
                    alignSelf: 'center',
                  }}>
                  No data found for graph
                </Text>
              </View>
            )}
          </View>

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
                          setOpenDatePicker(false);
                          setDate(i);
                          setLocation('');
                          setTotalCountData(0);
                          setPieData([]);
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

          <Modal
            animationType={'slide'}
            transparent={true}
            visible={openLocationPicker}
            onRequestClose={() => {
              setOpenLocationPicker(false);
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
                  Select location
                </Text>

                <ScrollView
                  style={{width: '100%'}}
                  showsVerticalScrollIndicator={false}>
                  {items.map(i => {
                    return (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          setLocation(i);
                          setOpenLocationPicker(false);
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
                            fontWeight: location == i ? 'bold' : 'normal',
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
