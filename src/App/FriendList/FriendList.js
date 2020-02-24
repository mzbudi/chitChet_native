import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import FriendBox from '../../Public/components/FriendBox';
import { db, appFirebase } from '../../config/firebase';

class FriendList extends Component {
  state = {
    users: []
  };
  getUsers = () => {
    try {
      db.ref('/users').on('value', snap => {
        let data = snap.val();
        // console.log(data);
        this.setState(
          {
            users: data
          },
          () => {
            console.log(this.state.users);
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getUsers();
  }
  render() {
    const { users } = this.state;
    return (
      <View style={{ padding: 16 }}>
        {Object.keys(users).map((item, i) => {
          return <FriendBox key={item} {...this.props} data={users[item]} />;
        })}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(FriendList);
