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
import NewDonate from './src/screens/NewDonate';
import { useEffect } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Header } from '@react-navigation/stack';
import Summary from './src/screens/Summary';


const Stack = createNativeStackNavigator();

// https://hurricane-help-default-rtdb.firebaseio.com

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
        {/* <Stack.Screen 
          name="Login"
          component={Login}
        />
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Verifyphone" component={Verifyphone}/>
        <Stack.Screen name="ResetPassEm" component={ResetPassEm}/>
        <Stack.Screen name="ResetPassPh" component={ResetPassPh}/>
        <Stack.Screen name="Homeh" component={Homeh}/>
        <Stack.Screen name="Volunteering" component={Volunteering}/>
        <Stack.Screen name="Donate" component={Donate}/>
        <Stack.Screen name="DonationFinish" component={DonationFinish}/>
        <Stack.Screen name="DonateCamera" component={DonateCamera}/>
        <Stack.Screen name="NewDonate" component={NewDonate}/> */}
        <Stack.Screen name="Summary" component={Summary}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};
