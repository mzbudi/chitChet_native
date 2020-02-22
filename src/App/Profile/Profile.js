import React, { Component } from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { appFirebase } from '../../config/firebase';

class Profile extends Component {
  handleLogout = () => {
    appFirebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => {
        console.log('somethings happens');
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <ListItem
          containerStyle={styles.whiteColor}
          key={1}
          leftAvatar={{
            size: 'large',
            showEditButton: true,
            source: {
              uri:
                'https://www.indomeme.id/wp-content/uploads/2020/01/polos.jpg'
            }
          }}
          title={'Budi'}
          subtitle={'Si bgst'}
          bottomDivider
        />
        <ListItem
          containerStyle={styles.whiteColor}
          title={<Text style={styles.midText}>Change Name</Text>}
          leftIcon={<Icon name="edit" type="feather" color="#517fa4" />}
          bottomDivider
        />
        <ListItem
          containerStyle={styles.whiteColor}
          title={<Text style={styles.midText}>Change Status</Text>}
          leftIcon={<Icon name="edit" type="entypo" color="#517fa4" />}
          bottomDivider
        />
        <ListItem
          containerStyle={styles.whiteColor}
          title={<Text style={styles.midText}>Change Password</Text>}
          leftIcon={<Icon name="lock" type="entypo" color="#517fa4" />}
          bottomDivider
        />
        <ListItem containerStyle={styles.dividerbg} title="" bottomDivider />
        <ListItem
          onPress={() => {
            this.handleLogout();
          }}
          containerStyle={styles.whiteColor}
          title={<Text style={styles.midText}>Logout</Text>}
          leftIcon={<Icon name="sc-telegram" type="evilicon" color="#517fa4" />}
          bottomDivider
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  midText: {
    justifyContent: 'center'
  },
  whiteColor: { backgroundColor: '#ffffff' },
  dividerbg: { backgroundColor: '#c9f0f2' }
});

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(Profile);
