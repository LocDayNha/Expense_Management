import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import MonthPicker from 'react-native-month-year-picker';
import { ICON, COLOR } from '../constants/Themes';
import AxiosInstance from '../constants/AxiosInstance';
import { AppContext } from '../utils/AppContext';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { set } from 'mongoose';

const ItemMonth = (props) => {

  const { navigate } = props;
  const [show, setShow] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const [date, setDate] = useState('');
  const [totalIncome, setTotalIncome] = useState('');
  const [totalExpense, setTotalExpense] = useState('');
  const [percentIncome, setPercentIncome] = useState('');
  const [percentExpense, setPercentExpense] = useState('')
  const [totalMoney, setTotalMoney] = useState('');
  const [limit, setLimit] = useState('');
  const { idUser, infoUser, appState, currentDay } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const showPicker = useCallback((value) => setShow(value), []);

  const data = [
    {
      name: "%  Income",
      population: Math.ceil(percentIncome),
      color: "#A7ECEE",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "%  Expense",
      population: Math.floor(percentExpense),
      color: "#F99B7D",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      fontSize: 20,
      fontWeight: '900'
    },
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const getTotalMoney = async () => {
    try {
      const response = await AxiosInstance().get("/transaction/api/get-total-money?idUser=" + idUser);
      console.log("Total Money, item money: ", response);
      if (response.result) {
        // Math.floor(setTotalExpense((response.transaction.totalExpense/(response.transaction.totalExpense + response.transaction.totalIncome))*100));
        // Math.ceil(setTotalIncome((response.transaction.totalIncome/(response.transaction.totalExpense + response.transaction.totalIncome))*100));
        setTotalExpense(response.transaction.totalExpense)
        setTotalIncome(response.transaction.totalIncome)
        setTotalMoney(response.transaction.totalMoney);

        setPercentExpense((response.transaction.totalExpense / (response.transaction.totalExpense + response.transaction.totalIncome)) * 100);
        setPercentIncome((response.transaction.totalIncome / (response.transaction.totalExpense + response.transaction.totalIncome)) * 100);
        setIsLoading(false);
      } else {
        console.log('FAILED TO GET TOTAL',);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTotalMoney()
    return () => {

    }
  }, [appState])
  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      //setDate(selectedDate);
      const formattedDate = moment(selectedDate).format('YYYY-MM');
      setDate(formattedDate);
      setSelectedMonthYear(formattedDate);
      const formattedYear = moment(selectedDate).format('YYYY');
      setYear(formattedYear)
      console.log(formattedDate);
      console.log(formattedYear);
      console.log(currentDate);
    },
    [date, showPicker],
  );
  return (
    <View>
      <TouchableOpacity style={styles.boxMonth}>
        <Image style={styles.icon} source={require('../asset/icon/icon_calender.png')} />
        <Text style={styles.textMonthYear}>Tháng 6, năm 2023</Text>

        {/* <MonthPicker
          modal
          open={show}
          onChange={onValueChange}
          value={date}
          minimumDate={new Date()}
          maximumDate={new Date(2030, 12)}
          locale="vn"
          onConfirm={() => {
            
          }}
          onCancel={() => {
            false
          }}
        />
  */}
      </TouchableOpacity>
      {isLoading ?
        (<View />) :
        (
          <View>
            <View >
              <PieChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[5, 0]}
                absolute
              />
            </View>

            <View style={styles.boxTotal}>
              <Text style={[styles.titleTotal, { alignSelf: 'center' }]}>Tổng kết tháng 6 { } </Text>
              <View style={styles.boxText}>
                <Text style={styles.textTotal}>Tổng tiền đã chi: </Text>
                <Text style={styles.textTotal}>{totalExpense} VNĐ</Text>
              </View>
              <View style={styles.boxText}>
                <Text style={styles.textTotal}>Tổng tiền đã thu: </Text>
                <Text style={styles.textTotal}>{totalIncome} VNĐ</Text>
              </View>
              <View style={styles.boxText}>
                <Text style={styles.textTotal}>Tổng số tiền còn lại: </Text>
                <Text style={styles.textTotal}>{totalMoney} VNĐ</Text>
              </View>
            </View>
          </View >
        )}
    </View>
  )
}

export default ItemMonth

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white
  },
  boxChart: {
    // borderColor: 'red', borderWidth: 2,
    flex: 1,

  },
  chart: {
    // borderColor: 'red', borderWidth: 2,
    flex: 0.8,


  },
  boxMonth: {
    height: 40,
    width: "100%",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: COLOR.white,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',

  },
  icon: {
    width: 30,
    height: 30,
  },
  textMonthYear: {
    fontWeight: '400',
    fontSize: 17,
    marginHorizontal: 7,
    letterSpacing: 0.3,
    color: COLOR.black,

  },
  boxTotal: {
    borderColor: COLOR.black, borderWidth: 2,
    marginHorizontal: 10,
    borderRadius: 20,
    marginTop: 20,

  },
  boxText: {
    flexDirection: 'row',
    padding: 10,
  },
  textTotal: {
    fontWeight: '500',
    fontSize: 20,
  },
  titleTotal: {
    fontWeight: 'bold',
    fontSize: 24,
    color: COLOR.primary,
    marginTop: 10,
  }
})