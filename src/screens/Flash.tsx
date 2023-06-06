import {View, Image, StyleSheet, Alert} from 'react-native';
import React, {useEffect} from 'react';
import Wheather from './Wheather';
import axiosinstance from '../util/axios';
import {useDispatch, useSelector} from 'react-redux';

const FlashApp = ({navigation}) => {
  setTimeout(() => navigation.navigate('Home'), 2000);

  return (
    <View style={styles.MainCntnr}>
      <View style={styles.Cntnr1}>
        <Image
          style={styles.cldIMg}
          source={require('./Icons/suncloudy.png')}
        />
      </View>
      <Image
        style={styles.WeathrImg}
        source={require('./Icons/weatherapi.png')}
      />
    </View>
  );
};

export default FlashApp;

const styles = StyleSheet.create({
  MainCntnr: {
    flex: 1,
    backgroundColor: 'white',
  },
  Cntnr1: {
    height: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cldIMg: {
    height: 120,
    width: 120,
  },
  WeathrImg: {
    height: 80,
    width: 150,
    alignSelf: 'center',
    // backgroundColor: 'blue',
  },
});
