import React, { Component, Fragment } from 'react';
import { View, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { appFirebase } from '../../config/firebase';
import { Input, Button, Icon } from 'react-native-elements';

class Register extends Component {
  state = {
    email: '',
    password: '',
    loading: false
  };

  handleChange = (text, type) => {
    this.setState({
      [type]: text
    });
    console.log(this.state.email, this.state.password);
  };

  handleRegister = () => {
    const { email, password } = this.state;
    const { navigation } = this.props;
    this.setState({
      loading: true
    });
    appFirebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        ToastAndroid.show('Register Succes', ToastAndroid.SHORT);
        navigation.navigate('Login');
      })
      .catch(function(error) {
        var errorMessage = error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  };
  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Input
          onChangeText={text => {
            this.handleChange(text, 'email');
          }}
          placeholder="Email"
          leftIcon={<Icon name="mail" type="entypo" size={24} color="black" />}
        />
        <Input
          onChangeText={text => {
            this.handleChange(text, 'password');
          }}
          secureTextEntry
          placeholder="Password"
          leftIcon={<Icon name="key" type="entypo" size={24} color="black" />}
        />
        <Button
          onPress={() => {
            this.handleRegister();
          }}
          loading={loading}
          buttonStyle={styles.button}
          title="Register"
        />
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 16
  },
  button: {
    marginTop: 16,
    padding: 16
  }
};

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(Register);
