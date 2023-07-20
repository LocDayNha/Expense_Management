import { StyleSheet, Text, View, Image, Switch, TouchableOpacity, ScrollView, Alert, ToastAndroid, StatusBar } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { ICON, COLOR } from '../../constants/Themes'
import ToggleSwitch from 'toggle-switch-react-native'
import { useSelector, useDispatch } from "react-redux"
import { AppContext } from '../../utils/AppContext'
import AxiosInstance from '../../constants/AxiosInstance';

const Setting = (props) => {
  const { navigation } = props;
  const [isEnabled, setIsEnabled] = useState(false);
  const { idUser, infoUser } = useContext(AppContext);
  const [user, setUser] = useState([])
  const getInfoUser = async () => {
    try {
      const response = await AxiosInstance().get("user/api/get-by-id?id=" + idUser);
      // console.log("USER ", response);
      if (response.result) {
        setUser(response.user)
      } else {
        console.log("Failed to get info User");
      }
    } catch (error) {
      console.log("=========>", error);
    }
  }
  useEffect(() => {
    getInfoUser()
  }, [])

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const version = '1.0.0.0';
  const showVersion = () => {
    return Alert.alert(
      "Phiên Bản",
      "Version :" + version,

    );
  }
  const showNotification = () => {
    return ToastAndroid.showWithGravity(
      'Chức năng sẽ được cập nhật trong các phiên bản tiếp theo!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
  const goListUsers = () => {
    navigation.navigate('ListUser')
  }
  const goChangePassword = () => {
    navigation.navigate('ChangePassword')
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.boxTitle} >
          <Text style={styles.title}>Cài đặt</Text>
        </View>

        <View style={styles.view1}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image style={styles.imageProfile} source={{ uri: user.avatar }}></Image>
            </TouchableOpacity>
          </View>

          <View >
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image style={styles.imageEdit} source={require('../../asset/icon/icon_edit.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View >
        <Text style={styles.text2}>Cài đặt chung</Text>
        <View style={styles.view2}>
          <View style={styles.allignview1}>
            <View>
              <Text style={styles.text5}>Nhắc nhở hàng ngày</Text>
              <Text style={styles.text5}>10:00</Text>
            </View>
            <Switch
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], marginRight: 10, }}
              thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
              ios_backgroundColor="#3e3e3e"

              value={isEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>

          <View style={styles.line}></View>
          <TouchableOpacity style={styles.allignview1} onPress={showNotification}>
            <Text style={styles.text4}>Đơn vị tiền tệ</Text>
            <Image source={require('../../asset/icon/icon_sort.png')} style={styles.ImageStyle} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.allignview1} onPress={goChangePassword}>
            <Text style={styles.text4}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View >
        <Text style={styles.text2}>Thông tin ứng dụng</Text>
        <View style={styles.view3}>
          <Text style={styles.text4} onPress={showNotification}>Điều khoản</Text>
          <View style={styles.line}></View>
          <TouchableOpacity onPress={showVersion}>
            <Text style={styles.text4}>Phiên bản</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <Text style={styles.text4} onPress={showNotification}>Chính sách bảo mật</Text>
          <View style={styles.line}></View>
          <Text style={styles.text4}>Người phát triển: Nhóm 4</Text>
        </View>
      </View>

      <View style={styles.bottomItem} >
        <Text style={styles.text2}>Hỗ trợ chúng tôi</Text>
        <View style={styles.view4}>
          <Text style={styles.text4} onPress={showNotification}>Đánh giá</Text>
          <View style={styles.line}></View>
          <Text style={styles.text4} onPress={showNotification}>Phản hồi</Text>
          <View style={styles.line}></View>
          <Text style={styles.text4} onPress={showNotification}>Chia sẽ ứng dụng</Text>
          {
            user.role >= 100 ?
              (
                <>
                  <View style={styles.line}></View>
                  <TouchableOpacity onPress={goListUsers}>
                    <Text style={styles.text4}>Quản lý người dùng</Text>
                  </TouchableOpacity>
                </>
              ) :
              (<View />)
          }

        </View>
      </View>
      <StatusBar style="auto" barStyle="dark-content" backgroundColor={COLOR.background2} />
    </ScrollView>
  )
}

export default Setting

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.grey,
    width: '100%',
    height: '100%'
  },
  text: {
    fontSize: 22,
    color: COLOR.white,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20
  },
  header: {
    backgroundColor: COLOR.background2,
    height: 150,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageSetting: {
    height: 30,
    width: 30,
    left: -170,
    top: 10,
    alignSelf: 'center',

  },
  imageProfile: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    left: 20,
    borderRadius: 100


  },
  view1: {
    flexDirection: 'row'
  },
  imageEdit: {
    width: 40,
    height: 40,
    top: 50,
    right: 10
  },
  text1: {
    color: COLOR.white,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 18
  }
  ,
  text2: {
    fontSize: 22,
    color: COLOR.black,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 30
  },
  view2: {
    backgroundColor: COLOR.white,
    width: '95%',
    height: 170,
    right: 10,
    left: 10,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 9.22,
    elevation: 12
  },
  view3: {
    backgroundColor: COLOR.white,
    width: '95%',
    height: 200,
    right: 10,
    left: 10,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 9.22,
    elevation: 12
  },
  view4: {
    backgroundColor: COLOR.white,
    width: '95%',
    height: 200,
    right: 10,
    left: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 9.22,
    elevation: 12
  },
  line: {
    backgroundColor: COLOR.gray,
    height: 1,
    width: '94%',
    alignSelf: 'center'
  },
  text4: {
    fontSize: 17,
    color: COLOR.darkGray,
    margin: 13
  },
  text5: {
    fontSize: 17,
    color: COLOR.darkGray,
    margin: 5,
    marginLeft: 13
  },
  ImageStyle: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginRight: 20,
  },
  allignview1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomItem: {
    marginBottom: 70,
  },
  title: {
    fontWeight: 'bold',
    color: COLOR.white,
    fontSize: 20,
    marginTop:10
  },
  boxTitle: {
    justifyContent: 'flex-start',
    marginLeft: 25,
    width: '100%',
  }
})