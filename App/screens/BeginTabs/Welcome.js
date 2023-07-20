import {
    Pressable, StyleSheet, Text, Alert, TextInput, Dimensions,
    View, Image, ToastAndroid, TouchableOpacity, SafeAreaView,StatusBar,
} from 'react-native'
import React from 'react'
import { ICON, COLOR } from '../../constants/Themes'

const Welcome = (props) => {
    const { navigation } = props;
    const goLogin = () => {
        navigation.navigate("Login")
    }
    const goRegister = () => {
        navigation.navigate("Register")
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.center}>
                <Image style={styles.imageLogin} source={require('../../asset/image/logo.png')}></Image>
            </View>

            <View style={[styles.center, { marginTop: 10 }]}>
                <Text style={styles.text}>Master Your Money, Shape Your Future</Text>
                <Text style={[styles.text, { fontSize: 16, fontWeight: '400', marginTop: 10, }]}>Emphasize the importance</Text>
                <Text style={[styles.text, { fontSize: 16, fontWeight: '400' }]}> of taking control of your  </Text>
                <Text style={[styles.text, { fontSize: 16, fontWeight: '400' }]}>finances to create a better tomorrow.</Text>
            </View>

            <View style={styles.center}>
                <TouchableOpacity style={styles.viewPressable} onPress={() => { goRegister() }}>
                    <Text style={styles.textPressable}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.viewPressable, { marginTop: 10 }]} onPress={() => { goLogin() }}>
                    <Text style={styles.textPressable}>Sign in</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" barStyle="dark-content" backgroundColor={'#75c1e1'} />
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {

    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageLogin: {
        width: '100%',
        height: 400,
    },
    inputEmailAndPass: {
        width: 343,
        height: 48,
        backgroundColor: COLOR.lightGray,
        borderRadius: 10,
        marginTop: 15,
        fontFamily: 'Klarna Text',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        color: COLOR.black,

        paddingLeft: 10
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
    text: {
        fontFamily: 'Klarna Text',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        color: COLOR.brown
    }
})