import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from 'rn-fetch-blob';
import {
  createStackNavigator,
} from 'react-navigation';


import screen_first from './screens/screen_first';
import screen_two from './screens/screen_two';


const AppStackNavigator = createStackNavigator({
 Home:{
   screen: screen_first
 },
 Profile: { screen: screen_two },

}
)





export default class App extends Component {

  
  
  render() {
    return (
      <AppStackNavigator/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A0A0A0',
  },
  text: {
    fontWeight:'bold',
    fontSize:18,
    textAlign:'center',
    color:'white',
    marginTop:10,
  },  
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#330066',        
    justifyContent: 'center',
    borderRadius: 30,
  },
  image: {
      width: 200,
      height: 200,
      marginTop: 30,
  }
});
