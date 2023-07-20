import { StyleSheet, Text, Image, View, Modal } from 'react-native'
import React from 'react'

const Loading = () => {
    return (
        <View style={styles.container}>
            <Modal transparent={false} visible={true}>
                <View style={styles.boxLoading}>
                    <Image style={styles.imageLoading} source={require('../asset/gif/loading_blue.gif')} />
                </View>
            </Modal>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
    },
    boxLoading: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    imageLoading: {
        width: 300,
        height: 300,
    }
})