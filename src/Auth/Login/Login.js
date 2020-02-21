import React, { Component, Fragment } from 'react';
import { Text, Button } from 'react-native';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleRegist = () => {
    this.props.navigation.navigate('Register');
    // console.log('asdsad');
  };
  render() {
    return (
      <Button
        onPress={() => {
          this.props.navigation.navigate('Register');
        }}
        title="submit"
      />
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Login);
