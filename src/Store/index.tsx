import {View, Text} from 'react-native';
import React from 'react';
import {createStore} from 'redux';
import rootReducer from '../Reducer';

const store = createStore(rootReducer);

export default store;
