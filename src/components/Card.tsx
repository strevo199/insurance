/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {ItemType} from '../screen';
import {Box} from './layouts';
import {Text} from './Typography';

export const Card = ({item}: ItemType) => {
  return (
    <Box
      elevation={2}
      overflow="hidden"
      margin="sm"
      backgroundColor={'white'}
      // flex={1}
      width={170}
      borderRadius="sm"
      height={250}>
      <Image source={{uri: item.photo}} style={{width: '100%', height: 165}} />
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
