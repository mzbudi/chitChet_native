import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import FriendBox from '../../Public/components/FriendBox';
import { db, appFirebase } from '../../config/firebase';

class FriendList extends Component {
  state = {
    users: [],
    usersAdded: []
  };
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
  componentDidMount() {
    this.getUsers();
    this.getUsersAdded();
  }
  render() {
    const { users, usersAdded } = this.state;
    return (
      <View style={{ padding: 16 }}>
        {usersAdded.map((item, i) => {
          return <FriendBox key={item} {...this.props} data={users[item]} />;
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
