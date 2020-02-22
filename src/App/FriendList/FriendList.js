import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import FriendBox from '../../Public/components/FriendBox';

class FriendList extends Component {
  render() {
    return (
      <View style={{ padding: 16 }}>
        <FriendBox />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(FriendList);
