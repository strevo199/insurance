/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {Box} from './layouts';
import {Text} from './Typography';
import {RFValue} from 'react-native-responsive-fontsize';

type ItemType = {
  item: {
    name: string;
    description: string;
    purchasePrice: number;
    type: string;
    photo: string;
  };
};

export const Card = ({item}: ItemType) => {
  return (
    <Box
      elevation={2}
      overflow="hidden"
      margin="sm"
      backgroundColor={'white'}
      // flex={1}
      width={RFValue(160)}
      borderRadius="sm"
      height={250}>
      <Image
        source={{uri: item.photo}}
        style={{width: '100%', height: RFValue(165)}}
      />
      <Box height={85} margin="sm" width={'100%'} justifyContent="space-evenly">
        <Box rowGap={'xs'}>
          <Text variant={'bold12'} textTransform="uppercase">
            {item.type}
          </Text>
          <Text variant={'medium12'}>Name: {item.name}</Text>
        </Box>

        <Box>
          <Text variant={'bold10'} color="textTint3">
            ${item.purchasePrice}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
