import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

class ChatBox extends Component {
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
        <ListItem
          containerStyle={styles.boxPad}
          key={1}
          rightAvatar={{
            source: {
              uri:
                'https://pbs.twimg.com/profile_images/1136553375145742336/d9fpvVXz_400x400.jpg'
            }
          }}
          title={<Text>Lapo cuk?</Text>}
        />
        <ListItem
          containerStyle={styles.boxPad}
          key={1}
          leftAvatar={{
            source: {
              uri:
                'https://www.indomeme.id/wp-content/uploads/2020/01/polos.jpg'
            }
          }}
          title={<Text>Mabar Cok !</Text>}
        />
        <ListItem
          containerStyle={styles.boxPad}
          key={1}
          rightAvatar={{
            source: {
              uri:
                'https://pbs.twimg.com/profile_images/1136553375145742336/d9fpvVXz_400x400.jpg'
            }
          }}
          title={<Text>Kasar nemen lambemu cok, yo uwes ayo !</Text>}
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

export default ChatBox;
