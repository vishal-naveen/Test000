/* eslint-disable prettier/prettier */
import * as React from 'react';
import Login from './src/screens/Login';
import SignUp from './src/screens/Signup';
import Verifyphone from './src/screens/Verifyphone';
import ResetPassEm from './src/screens/ResetPassEm'
import ResetPassPh from './src/screens/ResetPassPh'
import Homeh from './src/screens/Homeh'
import Volunteering from './src/screens/Volunteering';
import Donate from './src/screens/Donate';
import DonationFinish from './src/screens/DonationFinish';
import DonateCamera from './src/screens/DonateCamera';
import DonateCopy from './src/screens/DonateCopy';
import Homedon from './src/screens/Homedon';
import openScreen from './src/screens/OpenScreen';
import { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from '@react-navigation/stack';
import Summary from './src/screens/Summary';
import SplashScreen from './src/screens/SplashScreen';
import { Platform,SafeAreaView, UIManager } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import SearchScreen from './src/screens/SearchScreen';
const Stack = createNativeStackNavigator();

// https://hurricane-help-default-rtdb.firebaseio.com

export default function App() {
  const [isSplashLoading, setSplashLoading] = React.useState(true)
  useEffect(() => {
    // if(Platform.OS=="ios" ){
    //   console.log("===",firebase.apps)
    //   if(firebase.apps.length==0)
    //   await firebase.initializeApp({});
    // }
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    setTimeout(() => {
      setSplashLoading(false)
    }, 2000);
  }, [])

  if (isSplashLoading)
    return (<SplashScreen />)
  return (
    <SafeAreaView style={{flex:1}}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="OpenScreen" component={openScreen} />
        <Stack.Screen name="Homedon" component={Homedon} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />

        <Stack.Screen name="Homeh" component={Homeh} />

        <Stack.Screen name="Verifyphone" component={Verifyphone} />
        <Stack.Screen name="ResetPassEm" component={ResetPassEm} />
        <Stack.Screen name="ResetPassPh" component={ResetPassPh} />
        <Stack.Screen name="Volunteering" component={Volunteering} />
        <Stack.Screen name="Donate" component={Donate} />
        <Stack.Screen name="DonationFinish" component={DonationFinish} />
        <Stack.Screen name="DonateCamera" component={DonateCamera} />
        <Stack.Screen name="DonateCopy" component={DonateCopy} />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
};