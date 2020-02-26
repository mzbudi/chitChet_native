import React, { Component, Fragment } from 'react';
import { View, Text, Image, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button, Icon } from 'react-native-elements';
import { appFirebase } from '../../../config/firebase';

class ChangePassword extends Component {
  state = {
    loading: false,
    password: ''
  };
  handleChange = text => {
    this.setState({
      password: text
    });
  };

  handleChangePassword = () => {
    var user = appFirebase.auth().currentUser;
    user
      .updatePassword('Budi')
      .then(function() {
        // this.props.dispatch(currentUser());
        ToastAndroid.show('Success Change Password', ToastAndroid.SHORT);
      })
      .catch(function(error) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Image
          source={require('../../../Public/assets/chitchetLogo.png')}
          style={styles.imgLogo}
        /> */}
        {/* <Input
          onChangeText={text => {
            this.handleChange(text);
          }}
          placeholder="Old Password"
          leftIcon={<Icon name="lock" type="entypo" color="#517fa4" />}
        /> */}
        <Input
          onChangeText={text => {
            this.handleChange(text);
          }}
          placeholder="New Password"
          leftIcon={<Icon name="lock" type="entypo" />}
        />
        {/* <Input
          onChangeText={text => {
            this.handleChange(text);
          }}
          placeholder="Re-Type Password"
          leftIcon={<Icon name="lock" type="entypo" />}
        /> */}
        <Button
          onPress={() => {
            this.handleChangePassword();
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
export default connect(mapStateToProps)(ChangePassword);
