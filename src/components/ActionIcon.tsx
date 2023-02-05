import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import { ImageIconType } from '../assets/images';

type ImageIconeType = {
  name: ImageIconType;
};

export const ActionIcon = ({
  name="add"
}: ImageIconeType) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: 25,
          width: 25,
          tintColor: palette.white,
        }}
        source={name}
      />
    </TouchableOpacity>
  );
};
