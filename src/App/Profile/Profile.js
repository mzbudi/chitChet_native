import React, { Component } from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { View, StyleSheet, Text, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { db, appFirebase } from '../../config/firebase';
import ImagePicker from 'react-native-image-picker';
import { currentUser } from '../../Public/redux/action/auth';

class Profile extends Component {
  state = {
    photo: null,
    blobPhoto: null,
    dataProfile: []
  };

  componentDidMount() {
    const user = appFirebase.auth().currentUser;
    this.getUser(user.uid);
  }

  getUser = user_id => {
    try {
      db.ref(`/users/${user_id}`).on('value', snap => {
        let data = snap.val();
        console.log(data);
        this.setState({
          dataProfile: data
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

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
                  db.ref(`users/${user.uid}/photoURL/`).set(user.photoURL);
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
    const { dataProfile } = this.state;
    return (
      <View style={styles.container}>
        {this.state.dataProfile === 0 ? (
          <ListItem
            containerStyle={styles.whiteColor}
            key={1}
            leftAvatar={{
              size: 'large',
              showEditButton: true,
              source: {
                uri:
                  'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
              }
            }}
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
                uri: dataProfile.photoURL
              }
            }}
            title={dataProfile.name}
            subtitle={dataProfile.userStatus}
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
          leftIcon={<Icon name="log-out" type="entypo" color="#517fa4" />}
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
