import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as axios from 'axios';


const axios_instance = axios.create(
    {
        headers: {
          
            'Content-Type': 'multipart/form-data; boundary=-------------573cf973d5228',
            'Content-Length': '288'
        }

    }
)


class CameraComponent extends React.Component {
   
    state = {

    }

    takePicture() {
        
        this.setState({
            takeImageText: "... PROCESSING PICTURE ..."
        });

        this.camera.takePictureAsync({ skipProcessing: true }).then((data) => {                
            
            async function makePostRequest() {
                let photo = data.uri;
                let formData = new FormData();        
                formData.append("photo", photo);

                let res = await axios_instance.post('http://192.168.43.202:8000/api/ml/', {
                    photo: formData
                });
            
                console.log(`Status code: ${res.status}`);
                console.log(`Status text: ${res.statusText}`);
                console.log(`Request method: ${res.request.method}`);
                console.log(`Path: ${res.request.path}`);
                console.log(`Date: ${res.headers.date}`);
                console.log(`Data: ${res.data}`);
            }
            makePostRequest();
        }).then(response => {
            return console.log(response)
        })
        
    }
  
    render(){
        return(
           <View style={{flex: 1}}>
                <Camera style={{flex: 1}}
                    ref={ref => { this.camera = ref; }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    type: this.state.type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back,
                                });
                            }}>
                            <Text>
                                Flip
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
                <View>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)} >
                        <Text>Take photo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
            
        
    }
    
}

export default  CameraComponent;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

