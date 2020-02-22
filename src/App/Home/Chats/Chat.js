import React, { Component, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ChatBox from '../../../Public/components/ChatBox';

class Chat extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ChatBox />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  }
});

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Chat);
