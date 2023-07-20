import { Pressable, StyleSheet, Text, TextInput, View, Image, ToastAndroid, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { ICON, COLOR } from '../../constants/Themes'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AxiosInstance from '../../constants/AxiosInstance';
import { AppContext } from '../../utils/AppContext';

const ChangePassword = (props) => {
  const { navigation } = props;
  const [verifiedPass, setVerifiedPass] = useState(false);
  const [verifiedPassNew, setVerifiedPassNew] = useState(false);
  const [verifiedCfPass, setVerifiedCfPass] = useState(false);
  const [getOldPassVisible, setOldPassVisible] = useState(false)
  const [getNewPassVisible, setNewPassVisible] = useState(false)
  const [getConfirmPassVisible, setConfirmPassVisible] = useState(false)
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('')
  const [password, setpassword] = useState('');
  const [confirmPass, setconfirmPass] = useState('')

  const { idUser, infoUser, setIsLogin } = useContext(AppContext);
  const getInfoUser = async () => {
    try {
      const response = await AxiosInstance().get("user/api/get-by-id?id=" + idUser);
      console.log(response.user);
      if (response.result) {
        setEmail(response.user.email);
        console.log(email);
      } else {
        console.log("Failed to get info User");
      }
    } catch (error) {
      console.log("=========>", error);
    }
  }
  useEffect(() => {
    getInfoUser()
  }, [])
  const checkPass = (setOldPassVisible) => {
    let passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passreg.test(setOldPassVisible) === true) {
      setVerifiedPass({ passreg: setOldPassVisible });
      console.log("password hợp lệ");
      setVerifiedPass(true);
      setOldPassword(setOldPassVisible);
      return true;
    }
    else {
      setVerifiedPass({ passreg: setOldPassVisible });
      console.log("pass ko hợp lệ");
    }
  }
  const checkNewPass = (setNewPassVisible) => {
    let passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passreg.test(setNewPassVisible) === true) {
      setVerifiedPassNew({ passreg: setNewPassVisible });
      setVerifiedPassNew(true);
      setpassword(setNewPassVisible);
      console.log("password hợp lệ");
      return true;
    }
    else {
      setVerifiedPassNew({ passreg: setNewPassVisible });
      console.log("pass ko hợp lệ");
    }
  }
  const checkCfPass = (setConfirmPassVisible) => {
    let passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passreg.test(setConfirmPassVisible) === true) {
      setVerifiedCfPass({ passreg: setConfirmPassVisible });
      setVerifiedCfPass(true);
      setconfirmPass(setConfirmPassVisible);
      console.log("password hợp lệ");
      return true;
    }
    else {
      setVerifiedCfPass({ passreg: setConfirmPassVisible });
      console.log("pass ko hợp lệ");
    }
  }
  const checkAll = () => {
    if (verifiedPass == true && verifiedCfPass == true && verifiedPassNew == true && password === confirmPass) {
      ToastAndroid.show("Nhập đúng", ToastAndroid.SHORT);
      //  navigation.navigate('Resigter');
    }
    else {
      Alert.alert('Error', 'Password của bạn đã sai! vui lòng kiểm tra lại.');
    }
  }
  const changePassword = async () => {
    try {
      console.log(email);
      console.log(oldPassword);
      console.log(confirmPass);
      const response = await AxiosInstance().put("user/api/change-password", { email: email, oldPassword: oldPassword, newPassword: confirmPass });
      console.log(response);
      if (response.result === true) {
        ToastAndroid.show("Đổi mật khẩu thành công", ToastAndroid.SHORT);
        setIsLogin(false)
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
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Image source={require('../../asset/icon/icon_back.png')} style={styles.imageBack}></Image>
        </TouchableOpacity>
        <View style={styles.center}>
          <Text style={styles.textSignIn}>Đổi mật khẩu</Text>
        </View>

        <View style={styles.viewInputOldPass}>
          <TextInput style={styles.inputPassword} placeholder='Mât khẩu cũ'
            secureTextEntry={getOldPassVisible ? false : true}
            //onChangeText={(setOldPassVisible) => checkPass(setOldPassVisible)} value={verifiedPass} 
            onChangeText={setOldPassword} value={oldPassword}
          />
          <TouchableOpacity style={styles.visible}
            onPress={() => {
              setOldPassVisible(!getOldPassVisible)
            }}>
            {
              getOldPassVisible ?
                <Image source={require('../../asset/icon/icon_visible.png')} style={styles.imageIconEye}></Image>
                :
                <Image source={require('../../asset/icon/icon_invisible.png')} style={styles.imageIconEye}></Image>
            }
          </TouchableOpacity>
          <Image source={require('../../asset/icon/icon_padlock.png')} style={styles.imageIconPadlock}></Image>
        </View>

        <View style={styles.viewInputNewPass}>
          <TextInput style={styles.inputPassword} placeholder='Mật khẩu mới'
            secureTextEntry={getNewPassVisible ? false : true}
            onChangeText={(setNewPassVisible) => checkNewPass(setNewPassVisible)} value={verifiedPassNew} />
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
          <TextInput style={styles.inputPassword} placeholder='Mật khẩu mới'
            secureTextEntry={getConfirmPassVisible ? false : true}
            //onChangeText={(setConfirmPassVisible) => checkCfPass(setConfirmPassVisible)} value={verifiedCfPass}
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
            <Text style={styles.textPressable}>Thay đổi</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default ChangePassword

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