/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigations from './src/Navigation/StackNavigation';
import {Provider} from 'react-redux';
import store from './src/Store';

function App() {
  return (
    <Provider store={store}>
      <Navigations />
    </Provider>
  );
}

export default App;
