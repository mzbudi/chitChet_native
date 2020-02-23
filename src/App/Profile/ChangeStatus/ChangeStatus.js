import React, { Component, Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button, Icon } from 'react-native-elements';

class ChangeStatus extends Component {
  state = {
    loading: false,
    newName: ''
  };
  handleChange = text => {
    this.setState({
      newName: text
    });
  };

  handleChangeStatus = () => {};

  render() {
    return (
      <View style={styles.container}>
        {/* <Image
          source={require('../../../Public/assets/chitchetLogo.png')}
          style={styles.imgLogo}
        /> */}
        <Input
          onChangeText={text => {
            this.handleChange(text);
          }}
          placeholder="New Status"
          leftIcon={<Icon name="edit" type="entypo" color="#517fa4" />}
        />
        <Button
          onPress={() => {
            this.handleChangeStatus();
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
export default connect(mapStateToProps)(ChangeStatus);
