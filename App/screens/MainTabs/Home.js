import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, FlatList, RefreshControl, Animated } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { ICON, COLOR } from '../../constants/Themes'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace'
import { useSelector, useDispatch } from "react-redux"
import ItemTransaction from '../../component/ItemTransaction';
import AxiosInstance from '../../constants/AxiosInstance';
import { AppContext } from '../../utils/AppContext';
import { ProgressBar } from 'react-native-paper';

const Home = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)
  const [stateList, setStateList] = useState(0)
  const [isShow, setIsShow] = useState(true);
  const [refreshControl, setRefreshControl] = useState(false)
  const [totalIncome, setTotalIncome] = useState('');
  const [totalExpensee, setTotalExpense] = useState('');
  const [totalMoney, setTotalMoney] = useState('');
  const [limit, setLimit] = useState('');

  // console.log("==============>", infoUser);
  const getTotalMoney = async () => {
    try {
      const response = await AxiosInstance().get("/transaction/api/get-total-money?idUser=" + idUser);
      // console.log("Total Money: ", response);
      if (response.result) {
        // console.log('transaction totalExpense: ', response.transaction.totalExpense);
        // console.log('transaction Limit: ', response.transaction.limit);

        setLimit(response.transaction.limit);
        setTotalExpense(response.transaction.totalExpense);
        setTotalIncome(response.transaction.totalIncome);
        setTotalMoney(response.transaction.totalMoney);
        // setIsLoading(false);
      } else {
        console.log('FAILED TO GET TOTAL',);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getAllTransaction = async () => {
    try {
      // console.log("===================================>", isLoading);
      const response = await AxiosInstance().get("/transaction/api/search-by-current-date?idUser=" + idUser + '&date=' + currentDay);
      if (response.result) {
        // console.log("===================================response", response);
        // console.log("===================================response", isLoading);
        setData(response.transaction);
        setIsLoading(false)
      } else {
        setIsLoading(true)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log("INFOR ", infoUser);
    getAllTransaction();
    getTotalMoney()

    return () => {

    }
  }, [stateList, appState])

  const goAddNew = () => {
    navigation.navigate('AddNew');
  }
  const Progress = ({ step, steps, height }) => {
    console.log('dang chay show nhaaaaaaaaaa');

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
            style={{ height, width: '100%', backgroundColor: COLOR.background2, position: 'absolute', left: 0, top: 0, transform: [{ translateX: animationValue }] }} />
        </View>

      </>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.background}></View>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={styles.viewAvatarAndText}>
          <Image source={
            // require('../../asset/image/logo.png')
            { uri: infoUser.avatar }
          } style={styles.imageProfile}></Image>
          <Text style={styles.textHello}>Xin chào {infoUser.name}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.viewMenu}>
        <View style={styles.viewIn4Menu}>
          <View style={styles.viewIn4Menu1}>
            <View style={[styles.flex, { alignItems: 'center' }]}>
              <Image style={styles.image} source={require('../../asset/icon/icon_calender.png')}></Image>
              <Text style={styles.textDate}>{currentDay}</Text>
            </View>
            <TouchableOpacity onPress={() => setIsShow(!isShow)}>
              {isShow ?
                <Image style={styles.imageInvisible} source={require('../../asset/icon/icon_invisible.png')}></Image>
                :
                <Image style={styles.imageInvisible} source={require('../../asset/icon/icon_visible.png')}></Image>}
            </TouchableOpacity>
          </View>

          <View style={styles.viewIn4Menu2}>
            <Text style={styles.textPrice}>Tổng: </Text>
            {isShow ? <Text style={styles.textPrice}>********</Text> : <Text style={styles.textPrice}>{totalMoney} VND</Text>}
          </View>

          <View style={styles.viewIn4Menu3}>
            <View style={[styles.flex, { alignItems: 'center' }]}>
              <Text style={styles.textGiveAndPay}>Thu Nhập:</Text>
              {isShow ? <Text style={styles.textGiveAndPay}>********</Text> : <Text style={styles.textGiveAndPay}>{totalIncome} VND</Text>}
            </View>
            <View style={[styles.flex, { alignItems: 'center' }]}>
              <Text style={styles.textGiveAndPay}>Chi Tiêu:</Text>
              {isShow ? <Text style={styles.textGiveAndPay}>********</Text> : <Text style={styles.textGiveAndPay}>{totalExpensee}VND</Text>}
            </View>
          </View>

          {isLoading ? (<View />) : (
            <View style={styles.showTotal}>
              {/* <StatusBar hidden /> */}
              {/* <Progress step={totalExpensee} steps={limit} height={15} /> */}
            </View>
          )}

        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
        <Text>{totalExpensee}</Text>
        <Text>/</Text>
        <Text>{limit}</Text>
      </View>

      <Text style={styles.textToday}>Hôm nay:</Text>
      {isLoading ?
        (<ScrollView>
          <View style={styles.viewListGiveAndPay}>
            <TouchableOpacity onPress={() => { goAddNew() }}>
              <Image style={{ height: 250, width: 250 }} source={require('../../asset/gif/statistic.gif')}></Image>
              <View style={{ marginTop: 30 }} >
                <Text style={styles.textGif}>Hãy thêm chi tiêu hôm nay. Chạm vào đây dể thêm.</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>)
        :

        (<View style={{ height:420, width: '100%', marginBottom: 1000 }}>
          <ScrollView>
            <FlatList
              data={data}
              renderItem={({ item }) => <ItemTransaction data={item} navigation={navigation} />}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshControl} onRefresh={() => {
                  setRefreshControl(true)
                  console.log("Refresh")
                  setStateList(stateList + 1)
                  // console.log(stateList)

                  setRefreshControl(false)
                }} colors={['green']} />
              }
            />
          </ScrollView>
          {/* // data.map((item)=><ItemTransaction data={item} key={item._id} navigation={navigation} />) */}
        </View>)
      }
      <StatusBar style="auto" barStyle="dark-content" backgroundColor={COLOR.background2} />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row'
  },
  jusCenter: {
    justifyContent: 'center'
  },
  itemCenter: {
    alignItems: 'center'
  },
  background: {
    backgroundColor: COLOR.background2,
    height: 180,
    borderRadius: 20,
    marginTop: -40
  },
  viewAvatarAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -125,
    marginLeft: 17
  },
  imageProfile: {
    height: 50,
    width: 50,
    marginRight: 13,
    borderRadius: 100,
  },
  textHello: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    color: COLOR.white
  },
  viewMenu: {
    alignItems: 'center',
    marginTop: 10
  },
  viewIn4Menu: {
    backgroundColor: COLOR.secondary,
    height: 120,
    width: 310,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLOR.gray,
    marginTop: -70
  },
  viewIn4Menu1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
    marginBottom: 5,
    marginLeft: 12,
    marginRight: 12
  },
  viewIn4Menu2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3
  },
  viewIn4Menu3: {
    flexDirection: 'row',
    marginTop: 2,
    marginLeft: 12,
    marginRight: 12,
    justifyContent: 'space-between'
  },
  image: {
    height: 30,
    width: 30
  },
  textDate: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    marginLeft: 10,
    color: COLOR.black
  },
  imageInvisible: {
    height: 30,
    width: 30
  },
  textPrice: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    marginLeft: 10,
    color: COLOR.black
  },
  textGiveAndPay: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    color: COLOR.black
  },
  textTotalManager: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    right: 200,
    color: COLOR.black
  },
  textToday: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '400',
    color: COLOR.black,
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 5
  },
  viewListGiveAndPay: {
    width: 400,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGif: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  textCount: {
    fontFamily: 'Menlo',
    fontWeight: '900',
    marginBottom: 5,
    fontSize: 12,
    color: COLOR.black
  },
  showTotal: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginTop: 20
  },
})