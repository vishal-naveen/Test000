/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import Buttons from '../components/Buttons'
import { Text, View, KeyboardAvoidingView, ScrollView, Image, Alert, StyleSheet, Button, SafeAreaView, TouchableOpacity, Modal } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';
import PasswordIn from '../components/PasswordIn'
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import PieChart from 'react-native-pie-chart';
import BarChartScreen from '../components/BarChart';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default function Summary() {

    const navigation = useNavigation();
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [openPicker, setOpenPicker] = useState(false)

    const [location, setLocation] = useState('')
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
    const [totalCountData, setTotalCountData] = useState(0)
    const widthAndHeight = 250;
    const [pieData, setPieData] = useState([])
    const [xValues, setXvalues] = useState([])
    const [yValues, setYvalues] = useState([])
    const refBar = useRef()

    console.log("Selected Date-=-=-", new Date(date).toISOString().slice(0, 10).toString().split("-").reverse().join("-"))
    console.log("Selected Location-=-=-", location)
    console.log("total count-=-=-", totalCountData)

    useEffect(() => {
        setXvalues(['Khanna', 'Delhi', 'Jagadri', 'Mohali', 'Ahmedgarh'])
        setYvalues([{ y: 125 }, { y: 50 }, { y: 99 }, { y: 12 }, { y: 110 }])
    }, [])

    function calculatePercentage(pieDataResponse) {
        let totalCount = 0
        pieDataResponse.map(i => {
            totalCount += i.count
        })
        console.log("*******************", totalCount);
        setTotalCountData(totalCount)
        setPieData(pieDataResponse.map(i => {
            i.percentage = parseInt((i.count / totalCount) * 100)
            return i
        }))
    }
    console.log("-=-=-", pieData)
    return (
        <SafeAreaView style={styles.parentView}>
            <KeyboardAwareScrollView enableOnAndroid >
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 32, marginTop: 20, color: '#dfd1b8', alignSelf: "center" }}>Dashboard Summary</Text>
                    <Text style={{ fontSize: 20, marginTop: 30, color: '#dfd1b8', alignSelf: "center", textDecorationLine: "underline" }}>Top 5 Donator Locations</Text>

                    {(xValues.length > 0 && yValues.length > 0) ? <View style={{ backgroundColor: "red", marginVertical: 20, height: heightPercentageToDP(35), width: "90%", alignSelf: "center" }}>
                        <BarChartScreen ref={refBar} yValues={yValues} xValues={xValues} />
                    </View> :
                        <View style={{ marginBottom: 20, height: heightPercentageToDP(35), width: "90%", alignSelf: "center" }}>
                            <Text style={{ fontSize: 20, marginTop: 120, color: '#dfd1b8', alignSelf: "center" }}>No data found for graph</Text>
                        </View>}
                    {(xValues.length > 0 && yValues.length > 0) && <View style={{ alignItems: "center",marginBottom:20 }}>{xValues.map((i, index) => {
                        return (
                            <View key={index.toString()} style={{ width: "100%", flexDirection: "row", marginTop: index == 0 ? 20 : 3,}}>
                               <View style={{flex:0.4}}/>
                                <View style={{ flex: 0.6, flexDirection: "row",justifyContent:"flex-start" }}>
                                    <Text style={{ marginLeft: 5, color:'#dfd1b8', textAlign:"left" }}>{i} - {(yValues[index].y).toString()}</Text>
                                </View>  
                                </View>
                        )
                    })}</View>}
                    <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
                        <TouchableOpacity onPress={() => setOpen(true)} style={{ flex: 0.5, paddingVertical: 10, borderColor: "#dfd1b8", borderWidth: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 15, color: '#dfd1b8', alignSelf: "center" }}>{new Date(date).toISOString().slice(0, 10).toString().split("-").reverse().join("-")}
                            </Text>
                            <Image source={require('../../down-arrow.png')} resizeMode="contain" style={{ height: 15, width: 15, tintColor: '#dfd1b8', marginLeft: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setOpenPicker(true)} style={{ marginLeft: 10, flex: 0.5, paddingVertical: 10, borderColor: "#dfd1b8", borderWidth: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 15, maxWidth: "80%", color: '#dfd1b8', alignSelf: "center" }}>{location ? location : 'Select Location'}</Text>
                            <Image source={require('../../down-arrow.png')} resizeMode="contain" style={{ height: 15, width: 15, tintColor: '#dfd1b8', marginLeft: 10 }} />

                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
                        <TouchableOpacity onPress={() => {
                            if (!location)
                                return Alert.alert("Please select location")
                            //after api response
                            let res = [{ type: "Grocery", count: 5, color: "red", percentage: 0 },
                            { type: "Water", count: 5, color: "skyblue", percentage: 0 },
                            { type: "Biscuit", count: 5, color: '#FFEB3B', percentage: 0 },
                            { type: "Cookie", count: 5, color: '#4CAF50', percentage: 0 },
                            { type: "Fruit", count: 20, color: 'pink', percentage: 0 }]

                            calculatePercentage(res)

                        }} style={{ borderRadius: 10, flex: 0.5, paddingVertical: 10, backgroundColor: "#dfd1b8", borderWidth: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                            <Text style={{ color: '#09172d', fontWeight: "bold", fontSize: 18, alignSelf: "center" }}>{"Search"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setDate(new Date())
                            setLocation('')
                            calculatePercentage([])
                        }} style={{ marginLeft: 10, flex: 0.5, borderRadius: 10, paddingVertical: 10, backgroundColor: "#dfd1b8", borderWidth: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 18, color: '#09172d', alignSelf: "center" }}>{"Reset"}</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ marginVertical: 50, alignSelf: "center",width:"100%",alignItems:"center" }}>
                        {totalCountData != 0 && <PieChart
                            widthAndHeight={widthAndHeight}
                            series={pieData.map(i => i.percentage)}
                            sliceColor={pieData.map(i => i.color)}
                        />}
                        {totalCountData != 0 ? <View style={{ alignItems: "center" }}>{pieData.map((i, index) => {
                            return (
                                <View key={index.toString()} style={{ width: "100%", flexDirection: "row", alignSelf: "center", marginTop: index == 0 ? 20 : 3, alignItems: "center" }}>
                                    <View style={{ flex: 0.4, alignItems: "flex-end" }}>
                                        <View style={{ height: 10, width: 10, backgroundColor: i.color }} />
                                    </View>
                                    <View style={{ flex: 0.6 }}>
                                        <Text style={{ marginLeft: 5, color: "white", textAlign: "left" }}>{i.type} ({i.percentage + ' %'})</Text>
                                    </View>
                                </View>
                            )
                        })}</View> :
                            <View style={{ marginBottom: 20, height: heightPercentageToDP(35), width: "90%", alignSelf: "center" }}>
                                <Text style={{ fontSize: 20, marginTop: 120, color: '#dfd1b8', alignSelf: "center" }}>No data found for pie chart</Text>
                            </View>}
                    </View>

                    <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={openPicker}
                        onRequestClose={() => setOpenPicker(false)}
                    >
                        <View style={{ flex: 1, backgroundColor: "#01223770", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ borderWidth: 1, backgroundColor: '#dfd1b8', height: '50%', width: '90%', margin: 20, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 30, marginTop: 20, color: '#09172d', alignSelf: "center" }}>Select location</Text>

                                <ScrollView style={{ width: '90%' }} showsVerticalScrollIndicator={false}>
                                    {items.map(i => {
                                        return (<TouchableOpacity key={i.label} onPress={() => { setLocation(i.label); setOpenPicker(false) }} style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 20, marginTop: 10, color: '#09172d', alignSelf: "center", fontWeight: location == i.label ? "bold" : "normal" }}>{i.label}</Text>
                                            <View style={{ height: 1, marginTop: 10, width: "100%", backgroundColor: '#09172d', }} />
                                        </TouchableOpacity>)
                                    })}
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                    <DatePicker
                        modal
                        open={open}
                        mode="date"
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    parentView: { flex: 1, backgroundColor: '#09172d' }
})
