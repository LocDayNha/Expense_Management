import {
    Pressable, StyleSheet, Text, Alert, TextInput, Dimensions,
    View, Image, ToastAndroid, TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import { ICON, COLOR } from '../../constants/Themes'
import AxiosInstance from '../../constants/AxiosInstance';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignPassword = (props) => {
    const { route, navigation } = props;
    const email = route.params.email;
    const name = route.params.name;
    const [verifiedPassNew, setVerifiedPassNew] = useState(false);
    const [verifiedCfPass, setVerifiedCfPass] = useState(false);
    const [getNewPassVisible, setNewPassVisible] = useState(false)
    const [getConfirmPassVisible, setConfirmPassVisible] = useState(false)
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const checkNewPass = (password) => {
        let passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (passreg.test(password) === true) {
            setVerifiedPassNew({ passreg: password });
            setVerifiedPassNew(true);
            setPassword(password);
            console.log("password hợp lệ");
            return true;
        }
        else {
            setVerifiedPassNew({ passreg: password });
            console.log("pass ko hợp lệ");
        }
    }
    const checkConFirmPass = (text1) => {
        let passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (passreg.test(text1) === true) {
            setVerifiedCfPass({ passreg: text1 });
            setVerifiedCfPass(true);
            setConfirmPass(text1);
            console.log("password hợp lệ");
            return true;
        }
        else {
            setVerifiedPassNew({ passreg: text1 });
            console.log("pass ko hợp lệ");
        }
    }
    const checkAll = () => {
        if (verifiedCfPass == true && verifiedPassNew == true && password === confirmPass) {
            ToastAndroid.show("Nhập đúng", ToastAndroid.SHORT);
            //  navigation.navigate('Resigter');
        }
        else {
            Alert.alert('Error', 'Password của bạn đã sai! vui lòng kiểm tra lại.');
        }
    }

    const goLogin = async () => {
        // if (verifiedCfPass == true && verifiedPassNew == true && password === confirmPass) {
        //     ToastAndroid.show("Nhập đúng", ToastAndroid.SHORT);
        //     navigation.navigate('Welcome');
        // }
        // else {
        //     Alert.alert('Error', 'Password của bạn đã sai! vui lòng kiểm tra lại.');
        // }
        try {
            if (password === confirmPass) {
                console.log(email);
                console.log(name);
                console.log(password);
                ToastAndroid.show("Nhập đúng", ToastAndroid.SHORT);
                //http://localhost:3000/
                const response = await AxiosInstance().post("user/api/register", { name: name, email: email, password: password });
                console.log(response);
                if (response.result === true) {
                    ToastAndroid.show("Đăng kí tài khoản thành công", ToastAndroid.SHORT);
                    navigation.navigate('Welcome');
                }
                else {
                    ToastAndroid.show("Đăng kí tài khoản thất bại", ToastAndroid.SHORT);
                    navigation.navigate('Register');
                }
            }
            else {
                Alert.alert('Error', 'Password của bạn đã sai! vui lòng kiểm tra lại.');
            }
        } catch (error) {
        }
    }
    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.textSignIn}>Sign Up</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Image style={styles.imageBackground} source={require('../../asset/image/LoginAndRegister/backgroundsign.png')}></Image>
                    <Image style={styles.imagePhone} source={require('../../asset/image/LoginAndRegister/signpass.png')}></Image>
                </View>

                <View style={{ marginTop: 5 }}>
                    <Text style={styles.textInstruct}>Enter the password</Text>
                    <Text style={[styles.textInstruct, { fontSize: 16, fontWeight: '400', marginTop: 5 }]}>For the security & safety please choose a password</Text>
                </View>

                <View style={styles.viewInputEmailAndPass}>


                    <TextInput placeholder='Password' style={styles.inputEmailAndPass} 
                    //onChangeText={(password) => checkNewPass(password)}
                    onChangeText={setPassword} value={password}
                    >

                    </TextInput>
                    
                    <Image source={require('../../asset/icon/icon_eye.png')} style={styles.imageIconEye}></Image>
                    <Image source={require('../../asset/icon/icon_padlock.png')} style={styles.imageIconPadlock}></Image>
                </View>

                <View style={styles.viewInputEmailAndPass}>
                    <TextInput placeholder='Confirm Password' style={styles.inputEmailAndPass} 
                    //onChangeText={(text1) => checkConFirmPass(text1)}
                    onChangeText={setConfirmPass} value={confirmPass}
                    >

                    </TextInput>
                    <Image source={require('../../asset/icon/icon_eye.png')} style={styles.imageIconEye}></Image>
                    <Image source={require('../../asset/icon/icon_padlock.png')} style={styles.imageIconPadlock}></Image>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Pressable style={styles.viewPressable} onPress={goLogin}>
                        <Text style={styles.textPressable}>Next</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default SignPassword

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
        width: 300,
        height: 300,
        marginTop: -5
    },
    textInstruct: {
        fontFamily: 'Klarna Text',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
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
        paddingLeft: 35
    },
    viewInputEmailAndPass: {
        flexDirection: 'row',
        alignItems: 'center',
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