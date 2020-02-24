import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { Card, ListItem } from 'react-native-elements';
import { db, appFirebase } from '../../config/firebase';

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
  state = {
    dataProfile: []
  };

  static navigationOptions = {
    header: null,
    headerShown: false
  };

  componentDidMount() {
    const user = appFirebase.auth().currentUser;
    this.getUser(user.uid);
  }

  getUser = user_id => {
    try {
      db.ref(`/users/${user_id}`).on('value', snap => {
        let data = snap.val();
        this.setState({
          dataProfile: data
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // const { auth } = this.props;
    const { dataProfile } = this.state;
    return (
      <Fragment>
        {dataProfile.length === 0 ? (
          <View style={{ backgroundColor: '#1d949a' }}>
            <ListItem
              containerStyle={{ backgroundColor: '#1d949a' }}
              key={1}
              leftAvatar={{
                source: {
                  uri:
                    'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
                }
              }}
              title={dataProfile.name}
              subtitle={dataProfile.userStatus}
            />
          </View>
        ) : (
          <View style={{ backgroundColor: '#1d949a' }}>
            <ListItem
              containerStyle={{ backgroundColor: '#1d949a' }}
              key={1}
              leftAvatar={{
                source: {
                  uri: dataProfile.photoURL
                }
              }}
              title={dataProfile.name}
              subtitle={dataProfile.userStatus}
            />
          </View>
        )}
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
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  currentUser: payload => dispatch({ payload, type: 'CURRENT_USER_FULFILLED' })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 8
  }
});
