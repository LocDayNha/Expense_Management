import { StyleSheet, Text, View, Dimensions, SafeAreaView,StatusBar } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ItemYear from '../../component/ItemYear';
import ItemMonth from '../../component/ItemMonth';
import { ICON, COLOR } from '../../constants/Themes'
import { PieChart } from 'react-native-charts-wrapper';
const Tab = createMaterialTopTabNavigator();

const windowWidth = Dimensions.get('window').width;

const Chart = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxTitle}>
        <Text style={styles.title}>Phân tích chi tiêu</Text>
      </View>

      <Tab.Navigator
        tabBarShowLabel
        // tabBarPressColor='white'

        tabBarActiveTintColor='red'
        tabBarShowIcon={true}
        keyboardDismissMode='interactive'
        backBehavior='initialRoute'
        screenOptions={{
          tabBarItemStyle: { width: windowWidth / 2 },
          tabBarStyle: { backgroundColor: COLOR.background2 },
          swipeEnabled: true,
          tabBarLabelStyle: { fontSize: 16, fontWeight: '400' },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarIndicatorStyle: {
            backgroundColor: 'white',
          },
        }}
        initialRouteName="ItemMonth"
      >
        <Tab.Screen name="Theo Tháng" component={ItemMonth} />
        <Tab.Screen name="Theo Năm" component={ItemYear} />
      </Tab.Navigator>
    </SafeAreaView>

  )
}

export default Chart

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxTitle: {
    height: '7%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: COLOR.background2,

  },
  title: {
    marginLeft: 15,
    color: COLOR.white,
    fontWeight: '500',
    fontSize: 20,
    fontStyle: 'normal'

  }
})