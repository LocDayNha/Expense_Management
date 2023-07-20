import { Pressable, StyleSheet, Text, TextInput, View, Image, ToastAndroid, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { ICON, COLOR } from '../../constants/Themes'
import AxiosInstance from '../../constants/AxiosInstance'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ForgotPassword = (props) => {
  const { navigation } = props;
  const [email, setEmail] = useState('');

  const sendVerifiedEmail = async () => {
    try {
      //http://localhost:3000
      console.log("email  ", email);
      const result = await AxiosInstance().post("user/api/send-verification-code", { email: email });
      console.log(result);
      if (result) {
        ToastAndroid.show("Đã gửi code", ToastAndroid.SHORT);
        navigation.navigate('ForgotPasswordCode', { email: email });
      } else {

      }
    } catch (error) {

    }
  }


  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.textSignIn}>Forgot Password</Text>
        </View>

        <View style={styles.center}>
          <Image style={styles.imageLogin} source={require('../../asset/image/LoginAndRegister/signup.png')}></Image>
        </View>

        <View style={{ marginTop: 7, marginLeft: 5 }}>
          <Text style={styles.textInstruct}>You should fill email for sending code to verifled account ! </Text>
        </View>
        <View style={styles.viewInputPass}>
          <TextInput placeholder='Email' style={styles.inputEmailAndPass} value={email}
            onChangeText={setEmail}
          ></TextInput>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.viewPressable} onPress={() => { sendVerifiedEmail() }}>
            <Text style={styles.textPressable}>Send Code</Text>
          </TouchableOpacity>
        </View>
      </View>

    </KeyboardAwareScrollView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  container: {
    marginStart: 16,
    marginEnd: 16,
    marginTop: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textSignIn: {
    fontFamily: 'Klarna Text',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '700',
    color: COLOR.primary
  },
  imageLogin: {
    width: 347.28,
    height: 331.24,
    marginTop: -5
  },
  textInstruct: {
    fontFamily: 'Klarna Text',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: COLOR.brown,
  },
  inputEmailAndPass: {
    width: 343,
    height: 48,
    backgroundColor: COLOR.lightGray,
    borderRadius: 5,
    marginTop: 15,
    fontFamily: 'Klarna Text',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: COLOR.black,
    paddingLeft: 20
  },
  viewInputPass: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageIcon: {
    width: 24,
    height: 24,
    marginLeft: -33,
    marginTop: 15
  },
  textForgote: {
    fontFamily: 'Klarna Text',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    color: COLOR.background2
  },
  viewPressable: {
    width: 343,
    height: 50,
    borderRadius: 30,
    backgroundColor: COLOR.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  textPressable: {
    fontFamily: 'Klarna Text',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    color: COLOR.white
  },
  textNoneAcc: {
    fontFamily: 'Klarna Text',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: COLOR.black
  }
})