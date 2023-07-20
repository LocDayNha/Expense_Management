import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ICON, COLOR } from '../../constants/Themes'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const Test = () => {

  useEffect(() => {
    GoogleSignin.configure({ webClientId: '999490167711-v29oh1m4p7u2vf1libthj7m2klog9ttp.apps.googleusercontent.com' });
  }, [])

  //login gg
  const signInGG = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Id: ', userInfo.user.id);
      console.log('Email: ', userInfo.user.email);
      console.log('Name: ', userInfo.user.name);
      console.log('FamilyName: ', userInfo.user.familyName);
      console.log('GivenName: ', userInfo.user.givenName);
      console.log('Photo: ', userInfo.user.photo);
      setInfoUser({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>

      <TouchableOpacity style={styles.center} onPress={() => { signInGG(); }}>
        <View style={styles.viewLoginGG}>
          <Image style={styles.imageLoginGG} source={require('../../asset/image/LoginAndRegister/google.png')}></Image>
        </View>
      </TouchableOpacity>

    </View>
  )
}

export default Test

const styles = StyleSheet.create({
  imageLoginGG: {
    height: 30,
    width: 30
  },
  viewLoginGG: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 40,
    borderRadius: 20,
    marginBottom: 5
  }
})