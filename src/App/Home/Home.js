import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { Card, ListItem } from 'react-native-elements';

const list = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Dayat',
    avatar_url:
      'https://pbs.twimg.com/profile_images/1136553375145742336/d9fpvVXz_400x400.jpg',
    subtitle: 'Harta Tahta Kuota'
  }
];

class Home extends Component {
  static navigationOptions = {
    header: null,
    headerShown: false
  };
  render() {
    return (
      <Fragment>
        <View style={{ backgroundColor: '#1d949a' }}>
          <ListItem
            containerStyle={{ backgroundColor: '#1d949a' }}
            key={1}
            leftAvatar={{
              source: {
                uri:
                  'https://www.indomeme.id/wp-content/uploads/2020/01/polos.jpg'
              }
            }}
            title={'Budi'}
            subtitle={'Si bgst'}
          />
        </View>
        <View style={styles.container}>
          {list.map((l, i) => (
            <Card containerStyle={{ padding: 0 }}>
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.name}
                subtitle={l.subtitle}
                onPress={() => {
                  this.props.navigation.navigate('Chat');
                }}
              />
            </Card>
          ))}
        </View>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 8
  }
});
