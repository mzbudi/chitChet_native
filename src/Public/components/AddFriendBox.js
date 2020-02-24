import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { ListItem, Icon, Image } from 'react-native-elements';
import { db, appFirebase } from '../../config/firebase'

class AddFriendBox extends Component {
  handleAddFriend = (_key, myKey) => {
    db.ref(`users/${myKey}`).orderByChild('friend').equalTo(_key).once('value', snap => {
      if (snap.val() === null) {
        db.ref(`users/${myKey}/friend`).once('value', snap => {
          console.log(snap.val())
          if (snap.val() === null) {
            db.ref(`users/${myKey}/friend`).push(_key)
          } else {
            db.ref(`users/${myKey}/friend`).push(_key)
          }
        })
        ToastAndroid.show('Add Friend Succes', ToastAndroid.SHORT)
      } else {
        ToastAndroid.show('Add Friend Failed', ToastAndroid.SHORT)
      }
    })
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
                this.handleAddFriend(_key, myKey);
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
