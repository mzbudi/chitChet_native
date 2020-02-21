import React, { Component, Fragment } from 'react';
import { Text } from 'native-base';
import { connect } from 'react-redux';

class Register extends Component {
  render() {
    return <Text>ini Register</Text>;
  }
}

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(Register);
