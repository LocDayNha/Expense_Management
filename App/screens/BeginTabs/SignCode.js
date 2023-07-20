import {
    Pressable, StyleSheet, Text, Alert, TextInput, Dimensions,
    View, Image, ToastAndroid, TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import { ICON, COLOR } from '../../constants/Themes'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import AxiosInstance from '../../constants/AxiosInstance'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SignCode = (props) => {
    const { route, navigation } = props;
    const email = route.params.email;
    const name = route.params.name;
    const [errorCode, setErrorCode] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const verifiedEmail = async () => {
        try {
            console.log(name);
            console.log(email);
            console.log(otpCode);
            const response = await AxiosInstance().post("user/api/verify-email-new", { email: email, verifyCode: otpCode });
            console.log(response);
            if (response.result === true) {
                ToastAndroid.show("Xác thực thành công", ToastAndroid.SHORT);
                navigation.navigate('SignPassword', { email: email, name: name });
            }
            else {
                ToastAndroid.show("Xác thực thất bại ! False Code", ToastAndroid.SHORT);
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

                <View style={styles.center}>
                    <Image style={styles.imageBackground} source={require('../../asset/image/LoginAndRegister/backgroundsign.png')}></Image>
                    <Image style={styles.imagePhone} source={require('../../asset/image/LoginAndRegister/signcode.png')}></Image>
                </View>

                <Text style={styles.textEnter}>Enter Verification Code</Text>
                <Text style={styles.textOPT}>We have sent OPT to:</Text>
                <Text style={styles.textOPT}>{email}</Text>

                <View style={styles.center}>
                    <OTPInputView
                        style={{ width: '80%', height: 50 }}
                        pinCount={5}
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        // onCodeChanged = {code => { this.setState({code})}}
                        autoFocusOnLoad
                        codeInputFieldStyle={{
                            width: 30,
                            height: 45,
                            borderWidth: 0,
                            borderBottomWidth: 2,
                            fontSize: 20,
                            fontWeight: '600',
                            color: COLOR.primary,
                            borderBottomColor: '#7F4E1D',
                        }}
                        codeInputHighlightStyle={{
                            borderBottomColor: COLOR.primary,
                            borderBottomWidth: 3,
                        }}
                        placeholderTextColor={{ backgroundColor: 'red' }}
                        onCodeFilled={(otpCode) => {
                            console.log(`Code is ${otpCode}, you are good to go!`);
                            setOtpCode(otpCode)
                            // if (isValidEmpty(otpCode) == false) {
                            //     setErrorCode('Không được để trống')
                            // } else {
                            //     setErrorCode('')
                            // }
                        }}
                    />
                </View>

                <Text style={{ color: 'red', textAlign: 'left' }}>
                    {errorCode}
                </Text>

                <View style={styles.center}>
                    <TouchableOpacity style={styles.viewPressable} onPress={verifiedEmail}>
                        <Text style={styles.textPressable}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default SignCode

const styles = StyleSheet.create({
    container: {
        marginStart: 16,
        marginEnd: 16,
        marginTop: 10
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
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
    imagePhone: {
        width: 199.91,
        height: 236.38,
        marginTop: -130,
        marginBottom: 10
    },
    imageBackground: {
        width: 315,
        height: 211,
        marginTop: 30
    },
    textEnter: {
        fontFamily: 'Klarna Text',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        color: COLOR.brown,
        marginBottom: 10
    },
    textOPT: {
        fontFamily: 'Klarna Text',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
        color: COLOR.brown
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
})