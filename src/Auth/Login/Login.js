import React, { Component } from 'react';
import { View, ToastAndroid, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button, Icon } from 'react-native-elements';
import { appFirebase } from '../../config/firebase';
// import logo from '../../Public/assets/chitchetLogo.png';

class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
    showPassword: true
  };

  handleRegist = () => {
    this.props.navigation.navigate('Register');
  };

  handleChange = (text, type) => {
    this.setState({
      [type]: text
    });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    const { navigation } = this.props;

    this.setState({
      loading: true
    });
    appFirebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        ToastAndroid.show('Login Succes!', ToastAndroid.SHORT);
        navigation.navigate('Home');
      })
      .catch(error => {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  };

  showPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  render() {
    const { loading, showPassword } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={require('../../Public/assets/chitchetLogo.png')}
            style={styles.imgLogo}
          />
        </View>
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
          secureTextEntry={showPassword}
          placeholder="Password"
          leftIcon={<Icon name="key" type="entypo" size={24} color="black" />}
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
        />
        <Button
          onPress={() => {
            this.handleLogin();
          }}
          loading={loading}
          buttonStyle={styles.buttonLogin}
          title="Login"
        />
        <Button
          onPress={() => {
            this.handleRegist();
          }}
          buttonStyle={styles.button}
          title="Register"
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
    marginTop: 16,
    padding: 16
  },
  buttonLogin: {
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

export default connect(mapStateToProps)(Login);
