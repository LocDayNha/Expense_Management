import { FlatList, SafeAreaView, Dimensions, StyleSheet, Text, TouchableOpacity, View, Image, RefreshControl, ScrollView } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { ICON, COLOR } from '../../constants/Themes'
import { AppContext } from '../../utils/AppContext';
import AxiosInstance from '../../constants/AxiosInstance';
import ItemInfoUser from '../../component/ItemInfoUser';
import { TextInput } from 'react-native-paper';
const windowWIdth = Dimensions.get('window').width;

const ListUser = (props) => {
    const { navigation } = props
    const [isLoading, setIsLoading] = useState(true)
    const [users, setUsers] = useState([])

    const { idUser, infoUser, currentDay } = useContext(AppContext);
    const [stateList, setStateList] = useState(0)
    let timeOut = null;

    const [refreshControl, setRefreshControl] = useState(false)
    const countdownSearch = (searchText) => {
        if (timeOut) {
            clearTimeout(timeOut);
        }
        timeOut = setTimeout(() => {
            // console.log("======>", searchText);
            handleSearch(searchText);
        }, 1000);
    }
    const handleSearch = async (searchText) => {
        try {
            // console.log("======<", searchText);
            const response = await AxiosInstance().get("user/api/search?email=" + searchText);
            // console.log(response);
            if (response.result) 
            {
                setUsers(response.user)
                setIsLoading(false);
            } else {
                ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const getAllUser = async () => {
        try {
            const response = await AxiosInstance().get("/user/api/list");
            console.log("All  User: ", response.users);
            if (response.result) {
                setUsers(response.users);
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllUser();
        return () => {

        }
    }, [stateList])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.boxTop}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Image style={[styles.iconBack, { tintColor: COLOR.white }]} source={require('../../asset/icon/icon_back.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.title}>Danh sách người dùng</Text>
                    <Text></Text>
                </View>
                <View style={styles.boxSearch}>
                    <TextInput placeholder='Tìm kiếm email'
                        onChangeText={(searchText) => countdownSearch(searchText)}
                        style={styles.inputSearch}></TextInput>
                    <TouchableOpacity>
                        <Image style={styles.iconSearch} source={require('../../asset/icon/icon_search.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.boxContent}>
                <ScrollView>

                <FlatList
                    style={{ height: 1000, width: '100%'}}
                    data={users}
                    renderItem={({ item }) => <ItemInfoUser users={item} navigation={navigation} />}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshControl} onRefresh={() => {
                            setRefreshControl(true)
                            console.log("Refresh")
                            setStateList(stateList + 1)
                            console.log(stateList)

                            setRefreshControl(false)
                        }} colors={['green']} />
                    }
                />
                </ScrollView>

            </View>
        </SafeAreaView>

    )
}

export default ListUser

const styles = StyleSheet.create({
    container: {

    },
    header: {
        backgroundColor: COLOR.background2,
        height: 135,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,

    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        fontStyle: 'italic',
        color: COLOR.white,
    },
    iconBack: {
        width: 25,
        height: 25,

    },
    boxContent: {
        marginHorizontal: 10,
        marginTop: 10,

    },
    boxTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    boxSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        // borderWidth:1,borderColor:'black',
    },
    iconSearch: {
        height: 25,
        width: 25,
        left: -40,
        tintColor: COLOR.primary,
        marginTop: 10,
    },
    inputSearch: {
        borderWidth: 1.3,
        borderColor: COLOR.gray,
        backgroundColor: COLOR.white,
        paddingLeft: 10,
        marginLeft: 15,
        borderRadius: 20,
        marginTop: 15,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        width: windowWIdth - 30,
    }
})