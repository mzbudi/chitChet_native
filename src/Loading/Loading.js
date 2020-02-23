import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { appFirebase } from '../config/firebase';
import { connect } from 'react-redux';

class Loading extends Component {
  componentDidMount() {
    const { loginRequest } = this.props;
    appFirebase.auth().onAuthStateChanged(user => {
      console.log(user);
      loginRequest(user);
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

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
const mapDispatchToProps = dispatch => ({
  loginRequest: payload =>
    dispatch({ payload, type: 'LOGIN_REQUEST_FULFILLED' })
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);
