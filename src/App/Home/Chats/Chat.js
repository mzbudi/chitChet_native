import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import ChatBox from '../../../Public/components/ChatBox';
import { GiftedChat } from 'react-native-gifted-chat';
import { db, appFirebase } from '../../../config/firebase';

class Chat extends Component {
  state = {
    messages: [],
    id_chat: []
  };

  componentDidMount() {
    const { navigation, auth } = this.props;
    // const key = navigation.state.params.item.uid;
    const id_chat = navigation.state.params.item.id_chat;

    // db.ref(`chat/${id_chat}`).on('child_added', snap => {
    //   const resultVal = snap.val();
    //   this.setState(
    //     previousState => ({
    //       messages: GiftedChat.append(previousState.messages, [resultVal])
    //     }),
    //     () => {
    //       console.log(this.state.messages);
    //     }
    //   );
    // });

    db.ref(`chat/${id_chat}`).on('value', snap => {
      const resultVal = Object.values(snap.val());
      this.setState({
        messages: resultVal
      });
    });
  }

  onSend(messages = []) {
    const { navigation, auth } = this.props;
    const id_chat = navigation.state.params.item.id_chat;
    const key = navigation.state.params.item.uid;
    const dataKey =
      navigation.state.params.users[navigation.state.params.item.uid];
    db.ref(`chat/${id_chat}`).push({
      _id: key,
      text: messages[0].text,
      createdAt: new Date().getTime(),
      user: {
        _id: auth.data.uid,
        name: auth.data.displayName,
        avatar: auth.data.photoURL
      }
    });
  }

  render() {
    const { navigation, auth } = this.props;
    // const { messages } = this.state;
    const messageRendered = this.state.messages;
    const key = navigation.state.params.item.uid;
    const dataKey =
      navigation.state.params.users[navigation.state.params.item.uid];
    console.log(key, dataKey);
    return (
      <GiftedChat
        messages={messageRendered}
        onSend={messages => this.onSend(messages)}
        inverted={false}
        user={{
          _id: auth.data.uid
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
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Chat);
