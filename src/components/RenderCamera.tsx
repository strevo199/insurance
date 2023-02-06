import React, {useState} from 'react';
import {Box} from './layouts';
import {Text} from './Typography';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {palette} from '../theme/palette';

export const RenderCamera = ({
  setCameraModalVisible,
  setsnappedUri,
  handleCloseCamera,
  snappedUri,
}: any) => {
  const [{cameraRef}, {takePicture}] = useCamera(null);

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      setsnappedUri(data.uri);
    } catch (error) {
    }
  };

  return (
    <Box flex={1}>
      <Box
        position={'absolute'}
        zIndex="overlay"
        right={16}
        justifyContent={'center'}
        alignItems="center">
        <TouchableOpacity
          onPress={() => setCameraModalVisible(false)}
          style={{height: 48, width: 25}}>
          <Text color={'white'} variant={'bold48'}>
            &times;
          </Text>
        </TouchableOpacity>
      </Box>
      {snappedUri ? (
        <ImageBackground
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}
          source={{uri: snappedUri}}>
          <Box marginBottom={'md'}>
            <TouchableOpacity
              onPress={handleCloseCamera}
              style={{
                height: 40,
                elevation: 3,
                marginRight: 20,
                width: 70,
                alignItems: 'center',
                borderRadius: 8,
                backgroundColor: palette.primaryColor,
                justifyContent: 'center',
              }}>
              <Text color={'white'} variant={'bold14'} letterSpacing={2}>
                Done
              </Text>
            </TouchableOpacity>
          </Box>
        </ImageBackground>
      ) : (
        <RNCamera
          ref={cameraRef}
          type={RNCamera.Constants.Type.back}
          style={styles.preview}>
          <Box justifyContent={'center'} alignItems="center">
            <TouchableOpacity onPress={captureHandle} style={styles.camBtn} />
          </Box>
        </RNCamera>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  camBtn: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
});
