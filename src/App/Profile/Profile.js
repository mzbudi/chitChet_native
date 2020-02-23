import React, { Component } from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { View, StyleSheet, Text, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { appFirebase } from '../../config/firebase';
import ImagePicker from 'react-native-image-picker';
import { currentUser } from '../../Public/redux/action/auth';

class Profile extends Component {
  state = {
    photo: null,
    blobPhoto: null
  };

  componentDidMount() {
    appFirebase.auth().currentUser;
  }

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

  handlePicture = () => {
    const options = {
      storageOptions: {
        quality: 0.8,
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        ToastAndroid.show('Take Image Cancelled', ToastAndroid.SHORT);
      } else if (response.error) {
        ToastAndroid.show('Take Image Error', ToastAndroid.SHORT);
      } else if (response.customButton) {
        ToastAndroid.show('Take Image Cancelled', ToastAndroid.SHORT);
      } else {
        const source = response;

        if (source) {
          const ext = source.uri.split('.').pop(); // Extract image extension
          const filename = `${this.props.auth.data.uid}.${ext}`;
          this.setState({
            photo: source
          });
          this.handleUpload(source.uri, filename)
            .then(snapshot => {
              const { fullPath } = snapshot.metadata;
              appFirebase
                .storage()
                .ref()
                .child(fullPath)
                .getDownloadURL()
                .then(url => {
                  var user = appFirebase.auth().currentUser;
                  user
                    .updateProfile({
                      photoURL: url
                    })
                    .then(function() {
                      // this.props.dispatch(currentUser());
                      ToastAndroid.show(
                        'Success Upload Image',
                        ToastAndroid.SHORT
                      );
                    })
                    .catch(function(error) {
                      ToastAndroid.show(error, ToastAndroid.SHORT);
                    });
                });
            })
            .catch(error => {
              ToastAndroid.show(error, ToastAndroid.SHORT);
            });
        }
      }
    });
  };

  handleUpload = async (uri, image_name) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = appFirebase
      .storage()
      .ref()
      .child(`picture/${image_name}`);

    return ref.put(blob);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.photo !== null ? (
          <ListItem
            containerStyle={styles.whiteColor}
            key={1}
            leftAvatar={{
              size: 'large',
              showEditButton: true,
              source: {
                uri: this.state.photo.uri
              }
            }}
            title={'Budi'}
            subtitle={'Si bgst'}
            bottomDivider
            onPress={() => {
              this.handlePicture();
            }}
          />
        ) : (
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
            onPress={() => {
              this.handlePicture();
            }}
          />
        )}

        <ListItem
          onPress={() => {
            this.props.navigation.navigate('ChangeName');
          }}
          containerStyle={styles.whiteColor}
          title={<Text style={styles.midText}>Change Name</Text>}
          leftIcon={<Icon name="edit" type="feather" color="#517fa4" />}
          bottomDivider
        />
        <ListItem
          onPress={() => {
            this.props.navigation.navigate('ChangeStatus');
          }}
          containerStyle={styles.whiteColor}
          title={<Text style={styles.midText}>Change Status</Text>}
          leftIcon={<Icon name="edit" type="entypo" color="#517fa4" />}
          bottomDivider
        />
        <ListItem
          onPress={() => {
            this.props.navigation.navigate('ChangePassword');
          }}
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
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(Profile);
