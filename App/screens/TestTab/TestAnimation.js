import {
  StyleSheet, Text, View, Image, TouchableOpacity,
  Alert, ToastAndroid, StatusBar, Platform, SafeAreaView, Animated
} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AxiosInstance from '../../constants/AxiosInstance'
import { ProgressBar } from 'react-native-paper';
import { AppContext } from '../../utils/AppContext'

const TestAnimation = (props) => {
  const [totalIncome, setTotalIncome] = useState('');
  const [totalExpense, setTotalExpense] = useState('');
  const [totalMoney, setTotalMoney] = useState('');
  const { idUser, infoUser } = useContext(AppContext);
  console.log("============>",idUser);

  useEffect(() => {
    const getInforTransactionTotal = async () => {
      const respone = await AxiosInstance().get("/transaction/api/get-all-transaction-by-idUser?idUser="+ idUser);
      console.log("All product of a User: ", respone);
      if (respone.result) {
        setTotalIncome(respone.totalIncome);
        console.log('transaction totalIncome: ', respone.totalIncome);
        setTotalExpense(respone.totalExpense);
        console.log('transaction totalExpense: ', respone.totalExpense);
        setTotalMoney(respone.totalMoney);
        console.log('transaction totalMoney: ', respone.totalMoney);
      }
    }
    getInforTransactionTotal();
    return () => {

    }
  }, [])

  const Progress = ({ step, steps, height }) => {

    const [width, setWith] = React.useState(0);
    const animationValue = React.useRef(new Animated.Value(-1000)).current;
    const reactive = React.useRef(new Animated.Value(-1000)).current;

    React.useEffect(() => {
      Animated.timing(animationValue, {
        toValue: reactive,
        duration: 300,
        useNativeDriver: true
      }).start();
    }, []);

    React.useEffect(() => {
      reactive.setValue(-width + (width * step) / steps);
    }, [step, width]);

    return (
      <>

        <Text style={styles.textCount}>{step}/{steps}</Text>

        <View onLayout={e => {
          const newWith = e.nativeEvent.layout.width;
          setWith(newWith);
        }}
          style={{ height, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: height, overflow: 'hidden', }}>
          <Animated.View
            style={{ height, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', left: 0, top: 0, transform: [{ translateX: animationValue }] }} />
        </View>

      </>
    );
  };

  return (
    <View style={styles.showTotal}>
      <StatusBar hidden />
      <Progress step={1000000} steps={10000000} height={20} />
    </View>
  )
}

export default TestAnimation

const styles = StyleSheet.create({
  showTotal: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20
  },
  textCount: {
    fontFamily: 'Menlo',
    fontWeight: '900',
    marginBottom: 5,
    fontSize: 12,
    color: 'black'
  },
})