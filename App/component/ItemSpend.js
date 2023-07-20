import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Themes';
const windowWIdth = Dimensions.get('window').width;

const ItemSpend = () => {
  return (
    <View style={styles.ItemSpend}>
      <Image style={styles.icon} 
      source={require('../asset/icon/item/plane.png')} />
      <Text style={styles.text}>ItemSpend</Text>
    </View>
  )
}

export default ItemSpend

const styles = StyleSheet.create({
  ItemSpend: {
    width: windowWIdth / 2 - 30,
  
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  icon: {
    height: 35,
    width: 35,
    marginHorizontal: 5,

  },
  text: {
    marginLeft: 12,
    color: COLOR.dark,
    letterSpacing: 0.2,
    fontWeight: '400',
    fontSize: 14,
    fontStyle: 'normal'

  }
})