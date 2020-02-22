import React, { Component, Fragment } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { appFirebase } from '../config/firebase';

class Loading extends Component {
  componentDidMount() {
    appFirebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'Login');
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Loading;
