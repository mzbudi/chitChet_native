import React, { Component } from 'react';
import { View, ToastAndroid, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button, Icon } from 'react-native-elements';
import { appFirebase } from '../../../config/firebase';

class ChangePassword extends Component {
  state = {
    loading: false,
    password: '',
    showPassword: true
  };
  handleChange = text => {
    this.setState({
      password: text
    });
  };

  showPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  handleChangePassword = () => {
    const { password } = this.state;
    const { navigation } = this.props;
    var user = appFirebase.auth().currentUser;
    user
      .updatePassword(password)
      .then(function() {
        navigation.navigate('Profile');
        ToastAndroid.show('Success Change Password', ToastAndroid.SHORT);
      })
      .catch(function(error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      });
  };

  render() {
    const { password, showPassword } = this.state;
    return (
      <View style={styles.container}>
        <Input
          onChangeText={text => {
            this.handleChange(text);
          }}
          placeholder="New Password"
          leftIcon={<Icon name="lock" type="entypo" />}
          secureTextEntry={showPassword}
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                this.showPassword();
              }}>
              <Icon
                name="eye-with-line"
                type="entypo"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          }
          defaultValue={password}
        />
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
