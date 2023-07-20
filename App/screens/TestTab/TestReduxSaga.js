import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import Loading from '../../component/Loading'
import { useSelector, useDispatch } from "react-redux"

const TestReduxSaga = () => {
    const darkMode = useSelector(state => state.appReducer.darkMode);
    const nameUser = useSelector(state => state.appReducer.nameUser);

    const isLoading = useSelector(state => state.appReducer.isLoading);
    const comments = useSelector(state => state.demoReducer.comments);

    const dispath = useDispatch();
    console.log("================>comment", comments);
    console.log("darkMode", darkMode);
    console.log("nameUser", nameUser);

    useEffect(() => {
        console.log('isLoading', isLoading);
    }, [isLoading])



    return isLoading ? (<Loading />)
        :
        (
            <View style={styles.container}>
                <View style={styles.boxComment}>
                    <Text>{JSON.stringify(comments)}</Text>
                </View>
                <TouchableOpacity style={styles.button}
                    onPress={() => dispath({ type: 'GET_COMMENTS' })}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Get data</Text>
                </TouchableOpacity>
            </View>
        )
}

export default TestReduxSaga

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxComment: {
        width: '90%',
        height: 460,
        borderWidth: 2,
        borderColor: 'black'
    }
})