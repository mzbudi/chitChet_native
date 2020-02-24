import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Icon, Image } from 'react-native-elements';

class FriendBox extends Component {
  handleLocation = () => {
    this.props.navigation.navigate('FriendLocation');
  };

  handleProfile = () => {
    this.props.navigation.navigate('FriendInfo');
  };

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.handleProfile();
          }}>
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
                  this.handleLocation();
                }}>
                <Icon type="foundation" name="marker" />
              </TouchableOpacity>
            }
          />
        </TouchableOpacity>
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

export default FriendBox;
