import React, { Component } from 'react';
import {
  View,
  ToastAndroid,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { db, appFirebase } from '../../config/firebase';
import { Input, Button, Icon } from 'react-native-elements';
import { PICLOC } from 'react-native-dotenv';

class Register extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    loading: false,
    showPassword: true
  };

  handleChange = (text, type) => {
    this.setState({
      [type]: text
    });
  };

  showPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
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
        console.log(credentialUser);
        db.ref('/users')
          .child(credentialUser.user.uid)
          .set({ name, email })
          .then(() => {
            appFirebase
              .auth()
              .signOut()
              .then(() => {
                this.props.navigation.navigate('Login');
              })
              .catch(error => {
                console.log('somethings happens');
              });
          });
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
    const { loading, showPassword } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image source={require(PICLOC)} style={styles.imgLogo} />
          <Input
            onChangeText={text => {
              this.handleChange(text, 'email');
            }}
            placeholder="Email"
            leftIcon={
              <Icon name="mail" type="entypo" size={24} color="black" />
            }
          />
          <Input
            onChangeText={text => {
              this.handleChange(text, 'name');
            }}
            placeholder="Username"
            leftIcon={<Icon name="man" type="entypo" size={24} color="black" />}
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
              this.handleRegister();
            }}
            loading={loading}
            buttonStyle={styles.button}
            title="Register"
          />
        </ScrollView>
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
