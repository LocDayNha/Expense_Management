import { Pressable, StyleSheet, Text, TextInput, View, Image, ToastAndroid, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { ICON, COLOR } from '../../constants/Themes'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AxiosInstance from '../../constants/AxiosInstance';


const ChangeForgotPass = (props) => {
  const { route, navigation } = props;
  const email = route.params.email;
  //const email = 'quochuy3232@gmail.com'
  const [getNewPassVisible, setNewPassVisible] = useState(false)
  const [getConfirmPassVisible, setConfirmPassVisible] = useState(false)
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setconfirmPass] = useState('')
  const goBackSignIn = () => {
    navigation.navigate('Login');
  }
  useEffect(() => {
    console.log(email);
  }, [])
  const changePassword = async () => {
    try {
      console.log(email);
      console.log(newPassword);
      console.log(confirmPass);
      // if (newPassword) {

      // } else {

      // }
      const response = await AxiosInstance().put("user/api/change-forgot-password", { email: email, newPassword: confirmPass });
      console.log(response);
      if (response.result === true) {
        ToastAndroid.show("Đổi mật khẩu thành công", ToastAndroid.SHORT);
      }
      else {
        ToastAndroid.show("Đổi mật khẩu thất bại", ToastAndroid.SHORT);
      }
    } catch (error) {

    }
  }

  return (
    <KeyboardAwareScrollView>

      <View style={styles.container}>
        <View>
          <Image source={require('../../asset/icon/icon_back.png')} style={styles.imageBack}></Image>
        </View>
        <View style={styles.center}>
          <Text style={styles.textSignIn}>Change Forgot Password</Text>
        </View>
        <View style={styles.viewInputNewPass}>
          <TextInput style={styles.inputPassword} placeholder='New Password'
            secureTextEntry={getNewPassVisible ? false : true}
            onChangeText={setNewPassword} value={newPassword}
          />
          <TouchableOpacity style={styles.visible}
            onPress={() => {
              setNewPassVisible(!getNewPassVisible)
            }}>
            {
              getNewPassVisible ?
                <Image source={require('../../asset/icon/icon_visible.png')} style={styles.imageIconEye}></Image>
                :
                <Image source={require('../../asset/icon/icon_invisible.png')} style={styles.imageIconEye}></Image>
            }
          </TouchableOpacity>
          <Image source={require('../../asset/icon/icon_padlock.png')} style={styles.imageIconPadlock}></Image>
        </View>

        <View style={styles.viewInputNewPass}>
          <TextInput style={styles.inputPassword} placeholder='Confirm Password'
            secureTextEntry={getConfirmPassVisible ? false : true}
            onChangeText={setconfirmPass} value={confirmPass}
          />
          <TouchableOpacity style={styles.visible}
            onPress={() => {
              setConfirmPassVisible(!getConfirmPassVisible)
            }}>
            {
              getConfirmPassVisible ?
                <Image source={require('../../asset/icon/icon_visible.png')} style={styles.imageIconEye}></Image>
                :
                <Image source={require('../../asset/icon/icon_invisible.png')} style={styles.imageIconEye}></Image>
            }
          </TouchableOpacity>
          <Image source={require('../../asset/icon/icon_padlock.png')} style={styles.imageIconPadlock}></Image>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Pressable style={styles.viewPressable} onPress={changePassword}>
            <Text style={styles.textPressable}>Change Password</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default ChangeForgotPass

const styles = StyleSheet.create({
  container: {
    marginStart: 16,
    marginEnd: 16,
    marginTop: 10
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
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    color: COLOR.brown,
  },
  inputPassword: {
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
    paddingLeft: 35
  },
  viewInputOldPass: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30
  },
  viewInputNewPass: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBack: {
    width: 20,
    height: 20,
    marginLeft: -10,
    marginTop: 15,
  },
  imageIconEye: {
    width: 24,
    height: 24,
    marginLeft: -33,
    marginTop: 15
  },
  imageIconPadlock: {
    width: 13,
    height: 17,
    marginLeft: -330,
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
    marginTop: 20,
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
  },
  imagePhone: {
    width: 92.53,
    height: 188.14,
    marginTop: -130,
    marginBottom: 20
  },
  imageBackground: {
    width: 315,
    height: 211,
    marginTop: 30
  }
})