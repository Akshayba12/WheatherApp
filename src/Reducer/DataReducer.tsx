import {View, Text} from 'react-native';
import React from 'react';

const initialState = {
  weatherData: null,
  error: null,
  user: 'bangalore',
};

const DataReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'SUCCESS':
      return {...state, weatherData: payload};
    case 'user':
      return {...state, user: payload};
    case 'FAIL':
      return {...state, error: payload};
    default:
      return state;
  }
};

export default DataReducer;
