import React, { Component, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ChatBox from '../../../Public/components/ChatBox';
import { GiftedChat } from 'react-native-gifted-chat';
import { db, appFirebase } from '../../../config/firebase';

class Chat extends Component {
  state = {
    messages: [],
    id_chat: []
  };

  componentDidMount = async () => {
    const { navigation, auth } = this.props;
    const { id_chat } = this.state;
    const key = navigation.state.params.item;
    const chatRoom = navigation.state.params.chatData;

    chatRoom.forEach((element, i) => {
      if (element.uid === key.toString()) {
        this.setState(
          {
            id_chat: element
          },
          () => {
            db.ref(`chat/${this.state.id_chat.id_chat}`).on(
              'child_added',
              snap => {
                const resultVal = snap.val();
                console.log(resultVal);
                this.setState(previousState => ({
                  messages: GiftedChat.append(previousState.messages, {
                    ...resultVal
                  })
                }));
              }
            );
          }
        );
      }
    });
    // this.console.log(element.id_chat);

    console.log(this.state.id_chat);
  };

  getIdChat = () => {
    const { navigation, auth } = this.props;
    const key = navigation.state.params.item;
    const { id_chat } = this.state;
    return new Promise((resolve, reject) => {
      navigation.state.params.chatData.forEach((element, i) => {
        if (element.uid === key.toString()) {
          this.setState({
            id_chat: element
          });
          resolve(id_chat);
        } else {
          reject();
        }
      });
    });
  };

  getDataChat = () => {
    const { auth } = this.props;
    const user_id = auth.data.uid;
    try {
      db.ref(`chatroom/${user_id}`).on('value', snap => {});
    } catch (error) {
      console.log(error);
    }
  };

  onSend(messages = []) {
    const { id_chat } = this.state;
    const { navigation, auth } = this.props;
    const key = navigation.state.params.item;
    const dataKey = navigation.state.params.users[navigation.state.params.item];
    db.ref(`chat/${id_chat.id_chat}`).push({
      _id: key,
      text: messages[0].text,
      createdAt: new Date().getTime(),
      user: {
        _id: auth.data.uid,
        name: dataKey.name,
        avatar: dataKey.photoURL
      }
    });
  }

  render() {
    const { navigation, auth } = this.props;
    const key = navigation.state.params.item;
    const dataKey = navigation.state.params.users[navigation.state.params.item];
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
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
