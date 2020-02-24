import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
// import FriendBox from '../../Public/components/FriendBox';

class FriendInfo extends Component {
  render() {
    return (
      <View style={{ padding: 16 }}>
        <Text>Woi</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(FriendInfo);
