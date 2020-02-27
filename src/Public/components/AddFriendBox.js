import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { db } from '../../config/firebase';

class AddFriendBox extends Component {
  handleAddFriend = (data, _key, myKey) => {
    db.ref(`users/${myKey}`)
      .orderByChild('friend')
      .equalTo(_key)
      .once('value', snap => {
        if (snap.val() === null) {
          db.ref(`users/${myKey}/friend`).push(_key);
          db.ref(`users/${_key}/friend`).push(myKey);
          db.ref('chat')
            .push()
            .then(res => {
              db.ref(`chat/${res.key}`).push({
                _id: _key,
                text: 'Hello New Friend !',
                createdAt: new Date().getTime(),
                user: {
                  _id: myKey,
                  name: data.name,
                  avatar: data.photoURL
                }
              });
              db.ref(`chatroom/${myKey}/${_key}`).set({
                id_chat: res.key,
                lastMessage: 'Hello New Friend',
                lastUpdate: new Date().getTime(),
                unreadMessage: 0,
                uid: _key
              });
              db.ref(`chatroom/${_key}/${myKey}`).set({
                id_chat: res.key,
                lastMessage: 'Hello New Friend',
                lastUpdate: new Date().getTime(),
                unreadMessage: 0,
                uid: myKey
              });
            });

          // .once('value', snap => {
          //   console.log(snap.val());
          //   if (snap.val() === null) {
          //     db.ref(`users/${myKey}/friend`).push(_key);
          //   } else {
          //     db.ref(`users/${myKey}/friend`).push(_key);
          //   }
          // });
          ToastAndroid.show('Add Friend Succes', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Add Friend Failed', ToastAndroid.SHORT);
        }
      });
  };

  handleProfile = () => {
    this.props.navigation.navigate('FriendInfo');
  };

  render() {
    const { data, _key, myKey } = this.props;
    // console.log(myKey)
    return (
      <View style={styles.container}>
        <ListItem
          containerStyle={styles.boxPad}
          key={1}
          leftAvatar={{
            source: {
              uri: data.photoURL
            }
          }}
          title={<Text>{data.name}</Text>}
          subtitle={data.userStatus}
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                this.handleAddFriend(data, _key, myKey);
              }}>
              <Icon type="entypo" name="squared-plus" />
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatBoxContainer: {
    flex: 1,
    padding: 16
  },
  boxPad: {
    marginBottom: 8
  }
});

export default AddFriendBox;
