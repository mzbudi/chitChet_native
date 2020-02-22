import React, { Component, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ChatBox from '../../../Public/components/ChatBox';
import { GiftedChat } from 'react-native-gifted-chat';

class Chat extends Component {
  state = {
    message: []
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any'
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1
        }}
      />
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
