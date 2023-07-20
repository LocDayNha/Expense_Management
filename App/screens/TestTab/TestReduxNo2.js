import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'

import { useSelector, useDispatch } from "react-redux"

const TestReduxNo2 = () => {
    const transactions = useSelector(state => state.transactionReducer.transactions);

    const dispath = useDispatch();
    console.log("================>transactions", transactions);
   
    useEffect(() => {
        dispath({ type: 'FETCH_ALL_TRANSACTIONS_REQUEST' })

        return () => {
        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.boxComment}>
                <Text>{JSON.stringify(transactions)}</Text>
            </View>
            <TouchableOpacity style={styles.button}
                onPress={() => dispath({ type: 'FETCH_ALL_TRANSACTIONS_REQUEST' })}>
                <Text style={{ color: 'white', fontSize: 18 }}>Get transaction</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TestReduxNo2

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