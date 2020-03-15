import React, { Component } from 'react';
import { ActivityIndicator, Button, Clipboard, Image, ImageBackground, Share, StatusBar, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Constants } from 'expo';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as axios from 'axios';
//import backgroundImage from './assets/8473e1deca3ceae75a8b5c18f2002d24.svg';



export default class App extends Component {
  state = {
    image: null,
    uploading: false,
  };

  render() {
    const resizeMode = 'center';
    let {
      image
    } = this.state;

    return (
      <ImageBackground
      source={require('./assets/back.jpg')}
      style={{
        flex: 1,
        
        alignItems: 'center',
        justifyContent: 'center',
      
      }}>
        
      <View style={styles.container}>
        <StatusBar barStyle="default" />

        <Text
          style={styles.exampleText}>
          React-альный сыр
        </Text>

        <Button
          onPress={this._pickImage}
          title="Upload your image"
        />

        <Button onPress={this._takePhoto} title="Take a photo" />

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
      </View>
      </ImageBackground>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    return (
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
          Ваше блюдо
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri });
      }

      this.uploadImageAsync(pickerResult.uri);
    }
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
      });


      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri});
      }

      this.uploadImageAsync(pickerResult.uri);
    }
  };

 uploadImageAsync(pictureuri) {
  let apiUrl = 'http://192.168.43.202:8000/api/ml/';



    var data = new FormData();  
    data.append('file', {  
      uri: pictureuri,
      name: 'file2',
      type: 'image/jpg'
    })
    
    axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then(
      response => {
        console.log('succ ')
        console.log(response)
      }
      ).catch(err => {
      console.log('err ')
      console.log(err)
  


    // fetch(apiUrl, {  
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   method: 'POST',
    //   body: data
    // }).then(
    //   response => {
    //     console.log('succ ')
    //     console.log('hi!')
    //   }
    //   ).catch(err => {
    //   console.log('err ')
    //   console.log(err)
    } )




  }

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowRadius: 5,
    width: 450,
  },
  maybeRenderImageContainer: {
    flex:1,
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 450,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 450,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});