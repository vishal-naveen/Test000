/* eslint-disable prettier/prettier */
import { firebase } from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  LayoutAnimation,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PieChart from 'react-native-pie-chart';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import BarChartScreen from '../components/BarChart';
import Colors, { getDate, getSortedDateList } from './util';

const database = firebase
  .app()
  .database('https://hurricane-help-default-rtdb.firebaseio.com/');

export default function Summary() {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openLocationPicker, setOpenLocationPicker] = useState(false);

  const [date, setDate] = useState(null);
  const [dateList, setdateList] = useState([]);

  const [location, setLocation] = useState('');
  const [locationList, setLocationList] = useState([]);

  const [availableLocationsData, setAvailableLocationsData] = useState({});

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

            let locationArr = {};
            const mySet1 = new Set();
            Object.keys(dataBaseData)?.map(item => {
              // console.log(dataBaseData?.[item]);
              mySet1.add(getDate(item));
            });

            setdateList(getSortedDateList([...mySet1]));

            pastDatesList?.length > 0 &&
              pastDatesList?.map(item => {
                // console.log(dataBaseData?.[item]);
                dataBaseData?.[item] &&
                  Object.keys(dataBaseData?.[item])?.map(locItem => {
                    const categoryList = dataBaseData?.[item]?.[locItem];
                    // let totalCount = 0;
                    categoryList &&
                      Object.keys(categoryList)?.map(catItem => {
                        locationArr[locItem] =
                          (locationArr[locItem] ?? 0) + +categoryList[catItem];
                      });
                  });
              });

            const sortable = [];
            for (const key in locationArr) {
              sortable.push({[key]: locationArr[key]});
            }

            sortable.sort(function (a, b) {
              if (!a || !b) return 0;
              return b[Object.keys(b)?.[0]] - a[Object.keys(a)?.[0]];
            });

            const xValues = [];
            const yValues = [];
            // console.log('===>>>', sortable);

            const top5 = [];

            sortable?.slice(0, 5)?.map(item => {
              if (item) {
                const loc = Object.keys(item)?.[0] ?? '';
                yValues.push(item?.[loc]);
                xValues.push("");

                top5.push({
                  location: loc,
                  totalCount: item?.[loc],
                });
              }
            });

            settop5List(top5);
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

  function getPastDates(mainData = null) {
    var dateArray = new Array();

    const list = mainData && Object.keys(mainData);
    const currentDate = moment(
      moment().format('MM-DD-YYYY'),
      'MM-DD-YYYY',
    ).toDate();
    while (list.length > 0) {
      const date = list.shift();

      if (moment(date, 'MM-DD-YYYY').toDate() <= currentDate)
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
        i.percentage = ((i.count / totalCount) * 100).toFixed(2);
        return i;
      }),
    );
  }
  // console.log("-=-=-", pieData)
  const getPartiCularDateData = date => {
    let locationArrSet = new Set();
    let locData = {};
    mainData &&
      Object.keys(mainData)?.map(dateKey => {
        if (dateKey.includes(date) > 0) {
          mainData?.[dateKey] &&
            Object.keys(mainData?.[dateKey])?.map(locKey => {
              locationArrSet.add(locKey);
              locData[locKey] = {...locData?.[locKey]};
              mainData?.[dateKey]?.[locKey] &&
                Object.keys(mainData?.[dateKey]?.[locKey])?.map(catKey => {
                  locData[locKey][catKey] =
                    (locData?.[locKey]?.[catKey] ?? 0) +
                    +mainData?.[dateKey]?.[locKey]?.[catKey];
                });
            });
        }
      });

    setAvailableLocationsData({...locData});
    setLocationList([...locationArrSet]);
    setOpenDatePicker(false);
    setDate(date);
    setLocation('');
    setTotalCountData(0);
    setPieData([]);
  };

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

  const locationData = availableLocationsData?.[location];

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
              }}>
              <Text
                style={{fontSize: 15, color: '#dfd1b8', alignSelf: 'center'}}>
                {!!date ? getDate(date) : 'Select Date'}
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
                    borderRadius: 8,
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

                      const locationData = availableLocationsData?.[location];

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
                    right: -107,
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
                        <View key={item}>
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
                        </View>
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
                    <Text style={[styles.cell, styles.heading]}>Location</Text>
                    <View style={styles.border} />

                    <Text style={[styles.cell, styles.heading, {flex: 0.6}]}>
                      Total Qty
                    </Text>
                  </View>
                  <View style={styles.hBorder} />

                  {top5List?.map(item => {
                    return (
                      <>
                        <View style={styles.row}>
                          {/* <Text style={styles.cell}>{getDate(item?.date)}</Text>
                          <View style={styles.border} />
                          <Text style={[styles.cell,{flex:0.6}]}>{getStartTime(item?.date)}</Text>
                          <View style={styles.border} /> */}
                          <Text style={[styles.cell]}>{item.location}</Text>
                          <View style={styles.border} />
                          <Text style={[styles.cell, {flex: 0.6}]}>
                            {item.totalCount}
                          </Text>
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

                {dateList.length == 0 && (
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
                      Sorry, No dates found
                    </Text>
                  </>
                )}

                <ScrollView
                  indicatorStyle="black"
                  style={{width: '100%'}}
                  showsVerticalScrollIndicator={true}>
                  {dateList.map(i => {
                    return (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          getPartiCularDateData(i);
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
                {locationList.length == 0 && (
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
                      Sorry, No locations found
                    </Text>
                  </>
                )}
                <ScrollView
                  style={{width: '100%'}}
                  indicatorStyle="black"
                  showsVerticalScrollIndicator={true}>
                  {locationList.map(i => {
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
