import React, { Component, Fragment } from 'react';
import { Text } from 'native-base';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    return <Text>ini Profile</Text>;
  }
}

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(Profile);
