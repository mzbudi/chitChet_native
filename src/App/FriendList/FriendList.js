import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import FriendBox from '../../Public/components/FriendBox';
import { db, appFirebase } from '../../config/firebase';

class FriendList extends Component {
  state = {
    users: [],
    usersAdded: [],
    userLogged: []
  };

  componentDidMount() {
    const user = appFirebase.auth().currentUser;
    this.getUser(user.uid);
    this.getUsers();
    this.getUsersAdded();
  }

  getUsersAdded = () => {
    const myid = this.props.auth.data.uid;
    try {
      db.ref(`/users/${myid}/friend`).on('value', snap => {
        if (snap.val() !== null) {
          let data = Object.values(snap.val());
          // console.log(data);
          this.setState({
            usersAdded: data
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  getUsers = () => {
    try {
      db.ref('/users').on('value', snap => {
        let data = snap.val();
        // console.log(data);
        this.setState({
          users: data
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  getUser = user_id => {
    try {
      db.ref(`/users/${user_id}`).on('value', snap => {
        let data = snap.val();
        if (data !== null) {
          this.setState({
            userLogged: data
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { users, usersAdded, userLogged } = this.state;
    // console.log(users, usersAdded, userLogged);
    return (
      <View style={{ padding: 16 }}>
        {usersAdded.map((item, i) => {
          return (
            <FriendBox
              key={item}
              {...this.props}
              userLogged={userLogged}
              data={users[item]}
            />
          );
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
export default connect(mapStateToProps)(FriendList);
