import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Button } from 'react-native-elements';

class FriendLocation extends Component {
  handleMoveYour = () => {
    const { navigation } = this.props;
    this.refs.map.animateToRegion(
      {
        latitude: navigation.state.params.userLogged.latitude,
        longitude: navigation.state.params.userLogged.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      },
      2000
    );
  };

  handleMoveFriend = () => {
    const { navigation } = this.props;
    this.refs.map.animateToRegion(
      {
        latitude: navigation.state.params.data.latitude,
        longitude: navigation.state.params.data.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      },
      2000
    );
  };
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: navigation.state.params.userLogged.latitude,
            longitude: navigation.state.params.userLogged.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015
          }}>
          <Marker
            coordinate={{
              latitude: navigation.state.params.userLogged.latitude,
              longitude: navigation.state.params.userLogged.longitude
            }}>
            <TouchableOpacity>
              <Image
                source={{ uri: navigation.state.params.userLogged.photoURL }}
                style={{ height: 60, width: 60, borderRadius: 180 }}
              />
            </TouchableOpacity>
          </Marker>
          <Marker
            onPress={() => {
              navigation.navigate('FriendInfo', {
                data: navigation.state.params.data
              });
            }}
            coordinate={{
              latitude: navigation.state.params.data.latitude,
              longitude: navigation.state.params.data.longitude
            }}>
            <Image
              source={{ uri: navigation.state.params.data.photoURL }}
              style={{ height: 60, width: 60, borderRadius: 180 }}
            />
          </Marker>
        </MapView>
        <View style={styles.viewStyle}>
          <Button
            buttonStyle={styles.buttonStyle}
            title="Your Loc"
            onPress={this.handleMoveYour}
          />
          <Button
            buttonStyle={styles.buttonStyle}
            title="Your Friend Loc"
            onPress={this.handleMoveFriend}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(FriendLocation);

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: 400,
    justifyContent: 'flex-end'
    // alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  buttonStyle: {
    marginBottom: 10
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16
  }
});
