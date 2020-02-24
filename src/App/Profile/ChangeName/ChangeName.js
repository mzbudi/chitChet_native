import React, { Component, Fragment } from 'react';
import { View, Text, Image, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button, Icon } from 'react-native-elements';
import { db, appFirebase } from '../../../config/firebase';

class ChangeName extends Component {
  state = {
    loading: false,
    newName: ''
  };
  handleChange = text => {
    this.setState({
      newName: text
    });
  };

  handleChangeName = () => {
    const user = appFirebase.auth().currentUser;
    user
      .updateProfile({
        displayName: this.state.newName
      })
      .then(function() {
        try {
          db.ref(`users/${user.uid}/name/`).set(user.displayName);
          ToastAndroid.show('Name Has Been Changed', ToastAndroid.SHORT);
        } catch (error) {
          console.log(error);
        }
      })
      .catch(function(error) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          onChangeText={text => {
            this.handleChange(text);
          }}
          placeholder="New Name"
          leftIcon={<Icon name="edit" type="feather" color="#517fa4" />}
        />
        <Button
          onPress={() => {
            this.handleChangeName();
          }}
          buttonStyle={styles.button}
          title="Submit"
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
    marginTop: 24,
    padding: 16
  },
  imgLogo: {
    width: 200,
    height: 200,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 0
  }
};

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(ChangeName);
