import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AddFriendBox from '../../Public/components/AddFriendBox';
import { db, appFirebase } from '../../config/firebase';

class AddFriend extends Component {
  state = {
    usersAdded: [],
    users: [],
    keyUser: []
  };

  componentDidMount = async () => {
    const user = appFirebase.auth().currentUser;
    await this.getUserAdded(user.uid);
    await this.getUser(user.uid);
  };

  getUserAdded = user => {
    try {
      db.ref(`users/${user}/friend`).on('value', snap => {
        let data;
        if (snap.val() !== null) {
          data = Object.values(snap.val());
        }
        console.log(snap.val());
        console.log(data);
        if (data) {
          this.setState({
            usersAdded: data
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  getUser = user => {
    const { usersAdded } = this.state;
    try {
      db.ref('users').on('value', snap => {
        let arrPush = [];
        let data = snap.val();
        Object.keys(data).map((item, i) => {
          if (usersAdded.includes(item)) {
            delete data[item];
          } else {
            arrPush.push(item);
          }
        });
        console.log(usersAdded, data);
        this.setState({
          users: data,
          keyUser: arrPush
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { users, keyUser } = this.state;
    const { auth } = this.props;
    return (
      <View style={{ padding: 16 }}>
        {keyUser.map((item, i) => {
          if (item !== auth.data.uid) {
            return (
              <AddFriendBox
                _key={item}
                {...this.props}
                data={users[item]}
                myKey={auth.data.uid}
              />
            );
          }
        })}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(AddFriend);
