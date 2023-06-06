import {View, Text} from 'react-native';
import React from 'react';
import {combineReducers} from 'redux';
import DataReducer from './DataReducer';

const rootReducer = combineReducers({
  DataReducer,
});

export default rootReducer;
