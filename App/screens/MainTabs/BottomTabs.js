import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ICON, COLOR } from '../../constants/Themes'
import * as Animatable from 'react-native-animatable';

import Home from './Home'
import AddNew from './AddNew'
import Profile from './Profile'
import Setting from './Setting'
import Chart from './Chart'
import ListUser from './ListUser'

import History from './History';
import TopTabThuChi from '../MainTabs/TopTabThuChi'
import Login from '../BeginTabs/Login'
import Welcome from '../BeginTabs/Welcome'
import Register from '../BeginTabs/Register'
import SignPassword from '../BeginTabs/SignPassword'
import SignCode from '../BeginTabs/SignCode'
import { AppContext } from '../../utils/AppContext'
import ChangeForgotPass from '../BeginTabs/ChangeForgotPass';
import ChangePassword from '../BeginTabs/ChangePassword';

import ForgotPassword from '../BeginTabs/ForgotPassword';
import ForgotPasswordCode from '../BeginTabs/ForgotPasswordCode';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const StackBegin = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SignPassword" component={SignPassword} />
      <Stack.Screen name="SignCode" component={SignCode} />
      <Stack.Screen name="ChangeForgotPass" component={ChangeForgotPass} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ForgotPasswordCode" component={ForgotPasswordCode} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />


    </Stack.Navigator>
  )
}
const StackHome = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Chart" component={Chart} />
      <Stack.Screen name="AddNew" component={AddNew} />

      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TopTabThuChi" component={TopTabThuChi} />
    </Stack.Navigator>
  )
}
const StackHistory = () => {
  return (
    <Stack.Navigator initialRouteName="History" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Chart" component={Chart} />
      <Stack.Screen name="AddNew" component={AddNew} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TopTabThuChi" component={TopTabThuChi} />


    </Stack.Navigator>
  )
}

const StackAddNew = () => {
  return (
    <Stack.Navigator initialRouteName="AddNew" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Chart" component={Chart} />
      <Stack.Screen name="AddNew" component={AddNew} />

      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TopTabThuChi" component={TopTabThuChi} />


    </Stack.Navigator>
  )
}

const StackChart = () => {
  return (
    <Stack.Navigator initialRouteName="Chart" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Chart" component={Chart} />
      <Stack.Screen name="AddNew" component={AddNew} />

      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TopTabThuChi" component={TopTabThuChi} />

    </Stack.Navigator>
  )
}
const StackSetting = () => {
  return (
    <Stack.Navigator initialRouteName="Setting" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Chart" component={Chart} />
      <Stack.Screen name="AddNew" component={AddNew} />

      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="ListUser" component={ListUser} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />

      <Stack.Screen name="TopTabThuChi" component={TopTabThuChi} />

    </Stack.Navigator>
  )
}
const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="StackHome"
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, label, size }) => {

            let iconName = focused
            if (route.name === 'StackHome') {
              iconName = focused ? ICON.home : ICON.home
              label = 'Home'
            } else if (route.name === 'StackHistory') {
              iconName = focused ? ICON.history : ICON.history;
              label = 'History'
            } else if (route.name === 'StackAddNew') {
              iconName = focused ? ICON.plus : ICON.plus;
              label = 'New'
            }
            else if (route.name === 'StackChart') {
              iconName = focused ? ICON.chart : ICON.chart;
              label = 'Chart'
            }
            else if (route.name === 'StackSetting') {
              iconName = focused ? ICON.setting : ICON.setting;
              label = 'Setting'
            }
            // You can return any component that you like here!
            return <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: 60
            }}>

              <Animatable.View
                animation="zoomIn"
                duration={2000}>
                <Image source={iconName}
                  style={{
                    width: focused ? 37 : 27,
                    height: focused ? 37 : 27,

                    resizeMode: 'stretch',
                    tintColor: focused ? COLOR.background2 : COLOR.background2,
                  }} />
              </Animatable.View>
              <Text style={{
                fontSize: focused ? 14 : 0,
                marginTop: 4,
                color: focused ? COLOR.background2 : COLOR.background2,

              }}>{label}</Text>
            </View>;
          },

          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 70,
            position: 'absolute',
            backgroundColor: COLOR.background,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          },
        })}
    >
      <Tab.Screen name="StackHome" component={StackHome} />
      <Tab.Screen name="StackHistory" component={StackHistory} />
      <Tab.Screen name="StackAddNew" component={StackAddNew} />
      <Tab.Screen name="StackChart" component={StackChart} />
      <Tab.Screen name="StackSetting" component={StackSetting} />
    </Tab.Navigator>
  )
}
const BottomTabs = () => {
  const { isLogin, infoUser } = useContext(AppContext);
  // console.log("isLogin Bottom Tabs=================>", isLogin);
  // console.log("infoUser Bottom Tabs=========>", infoUser);

  return (
    <>
      {
        isLogin == false ? <StackBegin /> : <Main />
      }
    </>)
}

export default BottomTabs