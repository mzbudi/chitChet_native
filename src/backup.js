import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  ToastAndroid,
  TextInput,
  FlatList
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { db } from './src/config/firebase';

const link =
  'https://scontent.fcgk18-1.fna.fbcdn.net/v/t1.0-9/69612128_2950464841648607_2613556971927764992_n.jpg?_nc_cat=103&_nc_ohc=2DllLbKb1L0AX_wJIP8&_nc_ht=scontent.fcgk18-1.fna&oh=1ee4b610b7be3e50dde3bee0dd4c14f5&oe=5EBB0C9E';
class App extends React.Component {
  state = {
    textChange: '',
    data: []
  };

  componentDidMount() {
    this.getData();
  }

  handleMove = () => {
    this.refs.map.animateToRegion(
      {
        latitude: -6.6409398,
        longitude: 106.8313807,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      },
      2000
    );
  };

  handleSubmit = () => {};

  onChangeText = text => {
    this.setState({
      textChange: text
    });
  };

  getData = () => {
    try {
      db.ref('/name').on('value', result => {
        let data = result.val();
        const objectToArray = Object.values(data);
        this.setState({
          data: objectToArray
        });
        console.log(objectToArray);
      });
    } catch (error) {
      console.log(error);
    }
  };

  addData = name => {
    try {
      db.ref('/name').push({
        name: 'Roni',
        titel: 'Mistaman'
      });
      ToastAndroid.show('Sukses Tambah Data !', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Gagal Tambah Data !', ToastAndroid.SHORT);
    }
  };

  render() {
    return (
      <View>
        <View>
          <TextInput
            style={{ borderRadius: 20, borderBottomColor: 'black' }}
            onChangeText={text => this.onChangeText(text)}
          />
          <Button
            title="Submit"
            onPress={() => {
              this.addData(this.state.textChange);
            }}
          />
        </View>
        <View>
          <Text>{this.state.textChange}</Text>
        </View>
        <View style={styles.container}>
          <MapView
            ref="map"
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            initialRegion={{
              latitude: -6.6186565,
              longitude: 106.8251856,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121
            }}>
            <Marker
              coordinate={{
                latitude: -6.6186565,
                longitude: 106.8251856
              }}>
              <Image
                source={{ uri: link }}
                style={{ height: 60, width: 60, borderRadius: 180 }}
              />
            </Marker>
          </MapView>
          <Button title="Move" onPress={this.handleMove} />
        </View>
        <View>
          <FlatList
            style={{ maxHeight: 100 }}
            data={this.state.data}
            renderItem={({ item }) => <Text>{item.name}</Text>}
            // keyExtractor="1"
          />
        </View>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
