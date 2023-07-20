import { Alert, SafeAreaView, Settings, StyleSheet, Text, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './screens/BeginTabs/Login'
import Register from './screens/BeginTabs/Register'
import ChangePassword from './screens/BeginTabs/ChangePassword'
import SignPassword from './screens/BeginTabs/SignPassword'
import Welcome from './screens/BeginTabs/Welcome'
import SignCode from './screens/BeginTabs/SignCode'
import TabThu from './screens/MainTabs/TabThu';
import TabChi from './screens/MainTabs/TabChi';
import Intro from './screens/BeginTabs/Intro'


import AddNew from './screens/MainTabs/AddNew'
import ListUser from './screens/MainTabs/ListUser'

import BottomTabs from './screens/MainTabs/BottomTabs'
import Chart from './screens/MainTabs/Chart'
import History from './screens/MainTabs/History'
import Home from './screens/MainTabs/Home'

import Setting from './screens/MainTabs/Setting'
import Profile from './screens/MainTabs/Profile'
import ItemTransaction from './component/ItemTransaction'
import Loading from './component/Loading'

import ItemCollect from './component/ItemCollect'
import ItemInfoUser from './component/ItemInfoUser'

import ItemYear from './component/ItemYear'
import TopTabThuChi from './screens/MainTabs/TopTabThuChi';
import TestPicker from './screens/TestTab/TestPicker'
import Test from './screens/TestTab/TestReduxNo2'
import TestAnimation from './screens/TestTab/TestAnimation'

import messaging from '@react-native-firebase/messaging';
import { Provider } from 'react-redux';
import Redux from './redux/store'
import { AppContextProvider } from './utils/AppContext'


const App = () => {

  const getDeviceToken = async () => {
    let token = await messaging().getToken();
    console.log("TOKEN NOTIFICATION",token);
  };
  useEffect(() => {
    getDeviceToken();
    // Lắng nghe sự kiện khi ứng dụng chạy ngầm
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'Chào mừng bạn đến với Money Talk!',
        "Ứng dụng tuyệt vời cho quản lý tài chính!!"
        // ,JSON.stringify(remoteMessage)
      );
    });
    return unsubscribe;
  }, []);
  
  //Kill app vẫn chạy được
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  return (
    <AppContextProvider>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </AppContextProvider>

  )
}

export default App

