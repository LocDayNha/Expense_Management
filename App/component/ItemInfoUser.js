import { SafeAreaView, StyleSheet, Text, Image, View, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ICON, COLOR } from '../constants/Themes'
import AxiosInstance from '../constants/AxiosInstance';

const ItemInfoUser = (props) => {
    const { users, navigation } = props;
    const [isActive, setIsActive] = useState(users.isActive);

    const handleSetActive = () => {
        if (isActive) {
            // console.log("======>", isActive);
            setIsActive(!isActive)
            onDisable(!isActive)
        } else {
            // console.log(isActive);
            setIsActive(!isActive)
            onDisable(!isActive)
        }
    };

    const onDisable = async (isActive) => {
        try {
            // console.log(users.email);
            // console.log("AFTER", isActive);
            const response = await AxiosInstance().put("user/api/disable", { isActive: isActive, email: users.email });
            // console.log(response);
            if (response.result == true) {//lấy thành công
                ToastAndroid.show("Đã cập nhật thành công", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("cập nhật  thất bại", ToastAndroid.SHORT)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainUser}>
                <Image style={styles.avatarUser} source={{ uri: users.avatar }} />
                <View>
                    <Text style={styles.emailUser}>{users.email}</Text>
                    <Text style={styles.nameUser}>{users.name}</Text>
                    <Text style={[styles.nameUser, { fontSize: 14 }]}>{users.createAt}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.borderIcon,
                    isActive ? styles.greenBackground : styles.redBackground]}
                    onPress={() => { handleSetActive() }} >
                    {/* <Image style={styles.iconDisable} source={require('../asset/icon/icon_note.png')} /> */}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ItemInfoUser

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center'
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.24,
        shadowRadius: 16.41,
        elevation: 20
    },
    mainUser: {
        width: '100%',
        height: 95,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLOR.black,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,

    },
    avatarUser: {
        height: 35,
        width: 35,
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: COLOR.black,
        marginRight: 15,
        marginLeft: 5,

    },
    emailUser: {
        fontWeight: '500',
        fontSize: 16,
        fontStyle: 'italic',
        width: 260,
    },
    nameUser: {
        fontWeight: '500',
        fontSize: 18,
        fontStyle: 'italic',
        width: 260,
        maxHeight: 25
    },
    iconDisable: {
        width: 25,
        height: 25,
        tintColor: COLOR.dark,
        padding: 10,
    },
    borderIcon: {
        borderWidth: 1,
        borderColor: COLOR.black,
        borderRadius: 1000,
        marginLeft: 0,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    greenBackground: {
        backgroundColor: COLOR.green,
    },
    redBackground: {
        backgroundColor: COLOR.darkRed,
    },
})