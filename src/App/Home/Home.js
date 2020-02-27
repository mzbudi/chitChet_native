import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Card, ListItem, Badge } from 'react-native-elements';
import { db, appFirebase } from '../../config/firebase';

class Home extends Component {
  state = {
    dataProfile: [],
    users: [],
    usersAdded: [],
    photoUrl: '',
    chatData: []
  };

  static navigationOptions = {
    header: null,
    headerShown: false
  };

  componentDidMount() {
    const user = appFirebase.auth().currentUser;
    this.getUser(user.uid);
    this.getAllUsers();
    this.getUserAdded();
    // this.getChatData();
  }

  getUser = user_id => {
    try {
      db.ref(`/users/${user_id}`).on('value', snap => {
        let data = snap.val();
        if (data !== null) {
          this.setState({
            dataProfile: data
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // getChatData = () => {
  //   const { auth } = this.props;
  //   try {
  //     db.ref(`/chatroom/${auth.data.uid}`).on('value', snap => {
  //       if (snap.val() !== null) {
  //         let data = snap.val();
  //         console.log(data);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  getAllUsers = () => {
    const { auth } = this.props;
    const myKey = auth.data.uid;
    try {
      db.ref('users').on('value', snap => {
        let data = snap.val();
        this.setState({
          users: data
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  getUserAdded = () => {
    const { auth } = this.props;
    const myKey = auth.data.uid;
    try {
      db.ref(`chatroom/${myKey}`).on('value', snap => {
        if (snap.val() !== null) {
          let data = Object.values(snap.val());
          this.setState({
            usersAdded: data
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { dataProfile, usersAdded, users, chatData } = this.state;
    const { auth } = this.props;
    const myKey = auth.data.uid;
    // console.log(usersAdded);
    return (
      <Fragment>
        {dataProfile ? (
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
        ) : (
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
            />
          </View>
        )}
        <View style={styles.container}>
          {users.length !== 0 && usersAdded.length !== 0 ? (
            <FlatList
              style={styles.paddingFlatList}
              data={usersAdded}
              renderItem={({ item }) => (
                <ListItem
                  leftAvatar={{
                    source: {
                      uri: users[item.uid].photoURL || this.state.photoUrl
                    }
                  }}
                  title={users[item.uid].name}
                  subtitle={<Text numberOfLines={1}>{item.lastMessage}</Text>}
                  onPress={() => {
                    db.ref(`chatroom/${myKey}/${item.uid}/unreadMessage`).set(
                      0
                    );
                    this.props.navigation.navigate('Chat', {
                      item,
                      users
                    });
                  }}
                  rightTitle={
                    item.unreadMessage === 0 ? (
                      ''
                    ) : (
                      <Badge value={item.unreadMessage} status="primary" />
                    )
                  }
                />
              )}
              keyExtractor={item => users[item.uid].uid}
            />
          ) : (
            <Text />
          )}
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
