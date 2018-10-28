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

const options = {
  title: 'Select a photo',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality: 1	
};



export default class App extends Component {

  constructor(){
      super();
      this.state = {
        imageSource: null,
        data: null
      }
  }

  selectPhoto(){
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };    
        this.setState({
          imageSource: source,
          data: response.data
        });
      }
    });
  }

  uploadPhoto(){
    RNFetchBlob.fetch('POST', 'http://178.128.0.183:8080/api/Upload/', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [        
        { name: 'upimg', filename: 'image.png', type: 'image/png', data: this.state.data },
        
      ]).then((resp) => {
        // ...
      }).catch((err) => {
        // ...
      })
  }


  data = new FormData();

  state = {
    pickedImage: null
  }

  reset = () => {
    this.setState({
      pickedImage: null
    });
  }

  /**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
 

  
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image}
                source={this.state.imageSource != null ? this.state.imageSource : require('./images/not_available.jpg')}        
        />
        <TouchableOpacity style='styles.button'  onPress= {this.selectPhoto.bind(this)}>
          <Text style={styles.text}>Select</Text>
        </TouchableOpacity>
        <TouchableOpacity style='styles.button' onPress= {this.uploadPhoto.bind(this)}>
          <Text style={styles.text}>Upload</Text>
        </TouchableOpacity>
      </View>
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
