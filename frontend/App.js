import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraComponent from './components/camera/camera';
export default function App() {
  return (
  <View style={{flex: 1}}>
        <View style={{flex: 9}}>
          <CameraComponent/>
        </View>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
  }
});
