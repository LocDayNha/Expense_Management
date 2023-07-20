import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import AxiosInstance from '../../constants/AxiosInstance';


const TopTabThuChi = (props) => {
    const {navigation} = props;
    const [data, setData] = useState([]);
    const putDataAddNew = (item) => {
        console.log("item._id",item._id);
        navigation.navigate('AddNew', { _idCategory: item._id, name: item.name, image: item.image })

    }
    useEffect(() => {
        const getAllIncome = async () => {
          const response = await AxiosInstance().get("category/api/search-by-type?type=true");
        //   console.log("aaaaaaaaaaaaaaa", response);
          if (response.result) // lấy dữ liệu thành công
          {
            setData(response.category);
          } else {
            ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT)
          }
        }
        getAllIncome();
      }, []);

    return (
        <View style={{flex : 1}}>
            <FlatList
                data={data}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item, index }) => <View style={{
                    width: Dimensions.get('window').width / 2.2,
                }} >
                    <TouchableOpacity style={styles.itemContainer} 
                    onPress={()=>{putDataAddNew(item)} }>
                        <Image style={styles.image} source={{uri:item.image}} />
                        <Text style={styles.txt}>{item.name}</Text>
                    </TouchableOpacity>
                </View>

                }
            />

        </View>
    );
}

export default TopTabThuChi

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    name: {
        fontSize: 16,
        marginRight: 10,
    },
    image: {
        width: 50,
        height: 50,
    },
    txt: {
        fontSize: 15,
    }
})