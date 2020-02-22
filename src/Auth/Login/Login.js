import React, { Component, Fragment } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button, Icon } from 'react-native-elements';

class Login extends Component {
  state = {
    email: '',
    phone: '',
    password: ''
  };

  // static navigationOptions = (...props) => {
  //   headerRight: (...props) => (
  //     <Text onPress={() => console.log(props)}>Skip</Text>
  //   );
  // };

  handleRegist = () => {
    this.props.navigation.navigate('Register');
    // console.log('asdsad');
  };

  handleChange = (text, type) => {
    this.setState({
      [type]: text
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          onChangeText={text => {
            this.handleChange(text, 'phone');
          }}
          placeholder="Phone Number"
          leftIcon={<Icon name="phone" type="entypo" size={24} color="black" />}
        />
        <Input
          onChangeText={text => {
            this.handleChange(text, 'email');
          }}
          placeholder="Password"
          leftIcon={<Icon name="key" type="entypo" size={24} color="black" />}
        />

        <Button
          // onPress={() => {
          //   this.props.navigation.navigate('Register');
          // }}
          buttonStyle={styles.button}
          title="Login"
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate('Home');
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
  }
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Login);
