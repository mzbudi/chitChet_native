import React, { Component, Fragment } from 'react';
import { Text, ToastAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
// import {Toast} from './src/Public/component/Toast';
import Navigator from './src/Public/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppState } from 'react-native';
import { persistor, store } from './src/Public/redux/store';

class App extends Component {
  state = {
    appstate: AppState.currentState
  };

  componentDidMount() {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        ToastAndroid.show('No Connection Available', ToastAndroid.SHORT);
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
