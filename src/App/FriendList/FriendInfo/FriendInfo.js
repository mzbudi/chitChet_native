import React, { Component, Fragment } from 'react';
import { View, ActivityIndicator, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
// import FriendBox from '../../Public/components/FriendBox';

class FriendInfo extends Component {
  render() {
    const { navigation } = this.props;
    const data = navigation.state.params.data;
    return (
      <View style={styles.container}>
        <Image source={{ uri: data.photoURL }} style={styles.imgLogo} />
        <ListItem
          containerStyle={styles.whiteColor}
          key={1}
          title={<Text style={styles.name}>{data.name}</Text>}
          bottomDivider
        />
        <ListItem
          containerStyle={styles.whiteColor}
          key={1}
          title={<Text style={styles.textData}>{data.email}</Text>}
          bottomDivider
        />
        <ListItem
          containerStyle={styles.whiteColor}
          key={1}
          title={<Text style={styles.textData}>{data.userStatus}</Text>}
          bottomDivider
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff'
  },
  button: {
    marginTop: 16,
    padding: 16
  },
  buttonLogin: {
    marginTop: 24,
    padding: 16
  },
  imgLogo: {
    width: 200,
    height: 200,
    borderRadius: 180,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 0
  },
  name: { alignSelf: 'center', fontWeight: 'bold' },
  textData: { alignSelf: 'center' }
};

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(FriendInfo);
