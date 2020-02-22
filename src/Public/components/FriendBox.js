import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

class FriendBox extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ListItem
          containerStyle={styles.boxPad}
          key={1}
          leftAvatar={{
            source: {
              uri:
                'https://www.indomeme.id/wp-content/uploads/2020/01/polos.jpg'
            }
          }}
          title={<Text>Woi</Text>}
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

export default FriendBox;
