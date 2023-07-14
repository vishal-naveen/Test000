/* eslint-disable prettier/prettier */
import React from 'react';
import Buttons from '../components/Buttons'
import { View } from 'react-native'
import TInput from '../components/TInput';
import AuthHeader from '../components/AuthHeader';

export default function Login() {
    return (
      <View style={{alignContent:'center', justifyContent:'center'}}>
        <AuthHeader title={'Hurricane Help'}/>
        <TInput placer={'Email/Username'} />
        <TInput placer={'Password'} /> 
        <Buttons title={'Login.'} />
      </View>
    );
}

