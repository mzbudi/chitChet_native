import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { connect } from 'react-redux';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

// const link =
//     'https://scontent.fcgk18-1.fna.fbcdn.net/v/t1.0-9/69612128_2950464841648607_2613556971927764992_n.jpg?_nc_cat=103&_nc_ohc=2DllLbKb1L0AX_wJIP8&_nc_ht=scontent.fcgk18-1.fna&oh=1ee4b610b7be3e50dde3bee0dd4c14f5&oe=5EBB0C9E';

class FriendLocation extends Component {
  render() {
    return (
      //             <View style={styles.container}>
      //                 <MapView
      //                     ref="map"
      //                     provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      //                     style={styles.map}
      //                     initialRegion={{
      //                         latitude: -6.6186565,
      //                         longitude: 106.8251856,
      //                         latitudeDelta: 0.015,
      //                         longitudeDelta: 0.0121
      //                     }}>
      //                     <Marker
      //                         coordinate={{
      //                             latitude: -6.6186565,
      //                             longitude: 106.8251856
      //                         }}>
      //                         <Image
      //                             source={{ uri: link }}
      //                             style={{ height: 60, width: 60, borderRadius: 180 }}
      //                         />
      //                     </Marker>
      //                 </MapView>
      //                 {/* <Button title="Move" onPress={this.handleMove} /> */}
      // </View>
      <Text>ini Maps</Text>
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
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
