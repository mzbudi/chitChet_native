import React, { Component } from 'react';
import { View, ToastAndroid, Image } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button, Icon } from 'react-native-elements';
import { appFirebase } from '../../config/firebase';
// import logo from '../../Public/assets/chitchetLogo.png';

class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false
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
        ToastAndroid.show('Loggin Succes!', ToastAndroid.SHORT);
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

  render() {
    const { loading } = this.state;
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
          secureTextEntry
          placeholder="Password"
          leftIcon={<Icon name="key" type="entypo" size={24} color="black" />}
        />
        <Button
          onPress={() => {
            this.handleLogin();
          }}
          loading={loading}
          buttonStyle={styles.button}
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
    padding: 16
  },
  button: {
    marginTop: 16,
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
