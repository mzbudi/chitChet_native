import React, { Component } from 'react';
import { View, ToastAndroid, Image } from 'react-native';
import { connect } from 'react-redux';
import { db, appFirebase } from '../../config/firebase';
import { Input, Button, Icon } from 'react-native-elements';

class Register extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    loading: false
  };

  handleChange = (text, type) => {
    this.setState({
      [type]: text
    });
  };

  handleRegister = () => {
    const { email, password, name } = this.state;
    const { navigation } = this.props;
    this.setState({
      loading: true
    });
    appFirebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(credentialUser => {
        db.ref('/users')
          .child(credentialUser.user.uid)
          .set({ name, email });
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
        <Image
          source={require('../../Public/assets/chitchetLogo.png')}
          style={styles.imgLogo}
        />
        <Input
          onChangeText={text => {
            this.handleChange(text, 'email');
          }}
          placeholder="Email"
          leftIcon={<Icon name="mail" type="entypo" size={24} color="black" />}
        />
        <Input
          onChangeText={text => {
            this.handleChange(text, 'name');
          }}
          placeholder="Username"
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
export default connect(mapStateToProps)(Register);
