import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useNavigation } from '@react-navigation/native';
const AddGifImage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View >
      <Image style={{ width: windowWidth, height: windowHeight }}
        source={require('../../asset/gif/money.gif')} />
    </View>
  );
}

export default AddGifImage;
